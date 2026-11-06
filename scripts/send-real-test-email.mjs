import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const verificationDir = path.resolve(__dirname, '../public/verification');

async function testRealEmail() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();

  // Monitor network responses to track EmailJS response status
  page.on('response', async (res) => {
    if (res.url().includes('emailjs.com')) {
      const status = res.status();
      let body = '';
      try {
        body = await res.text();
      } catch {}
      console.log(`[EmailJS Network Response] Status: ${status}, Body: ${body}`);
    }
  });

  console.log('Navigating to http://127.0.0.1:5173/ ...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView({ block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));

  // Check if setup banner is now gone and button is enabled
  const formStatus = await page.evaluate(() => {
    const banner = document.querySelector('form .bg-amber-500\\/10');
    const submitBtn = document.querySelector('form button[type="submit"]');
    return {
      hasPendingBanner: Boolean(banner),
      btnText: submitBtn?.textContent?.trim(),
      btnDisabled: submitBtn?.hasAttribute('disabled'),
    };
  });

  console.log('Form readiness with live credentials:', formStatus);

  if (formStatus.hasPendingBanner || formStatus.btnDisabled) {
    console.error('Form is still in pending setup state. Check .env variables.');
    await browser.close();
    process.exit(1);
  }

  // Clear any existing rate limit from previous test
  await page.evaluate(() => {
    try {
      localStorage.removeItem('last_email_send_time');
    } catch {}
  });

  // Type form fields
  console.log('\nFilling form fields...');
  await page.type('#name', 'Antigravity Verification Test');
  await page.type('#email', 'hamxa9403@gmail.com');
  await page.type('#message', 'Hello Ameer! This is an automated live verification test confirming that your EmailJS integration is active and delivering to hamxa9403@gmail.com.');

  await new Promise(r => setTimeout(r, 400));

  console.log('Submitting live form to EmailJS...');
  await page.click('form button[type="submit"]');

  // Wait for submission completion
  await new Promise(r => setTimeout(r, 4000));

  const result = await page.evaluate(() => {
    const successHeader = document.querySelector('div h3')?.textContent?.trim();
    const errorMsg = document.querySelector('.bg-rose-500\\/10')?.textContent?.trim();
    return { successHeader, errorMsg };
  });

  console.log('Submission Result:', result);

  await page.screenshot({ path: path.join(verificationDir, 'real-live-email-success.png') });
  console.log('Saved real-live-email-success.png');

  await browser.close();
}

testRealEmail().catch(err => {
  console.error('Real email test failed:', err);
  process.exit(1);
});

