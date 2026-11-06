import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verifyBrowser() {
  const screenshotDir = path.resolve(__dirname, '../public/verification');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();

  console.log('Navigating to http://127.0.0.1:5173/ ...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Desktop 1440px - Dark Mode (Default)
  await page.setViewport({ width: 1440, height: 900 });
  await page.screenshot({ path: path.join(screenshotDir, 'desktop-dark-hero.png') });
  console.log('Captured desktop-dark-hero.png');

  // Full page desktop
  await page.screenshot({ path: path.join(screenshotDir, 'desktop-dark-full.png'), fullPage: true });
  console.log('Captured desktop-dark-full.png');

  // Open Project Modal on Desktop
  const projectCards = await page.$$('div[class*="aspect-video"]');
  if (projectCards.length > 0) {
    await projectCards[0].click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(screenshotDir, 'desktop-project-modal.png') });
    console.log('Captured desktop-project-modal.png');
    // Close modal by pressing Escape
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 500));
  }

  // 2. Desktop 1440px - Toggle Light Mode
  const themeToggle = await page.$('button[aria-label*="Switch to light theme"]');
  if (themeToggle) {
    await themeToggle.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(screenshotDir, 'desktop-light-hero.png') });
    console.log('Captured desktop-light-hero.png');
    // Toggle back to dark
    const darkToggle = await page.$('button[aria-label*="Switch to dark theme"]');
    if (darkToggle) await darkToggle.click();
    await new Promise(r => setTimeout(r, 400));
  }

  // 3. Mobile Viewport 375x812 (iPhone X/12/13/14)
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, 'mobile-hero.png') });
  console.log('Captured mobile-hero.png');

  // Open Mobile Drawer Menu
  const mobileMenuBtn = await page.$('button[aria-label="Toggle mobile menu"]');
  if (mobileMenuBtn) {
    await mobileMenuBtn.click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(screenshotDir, 'mobile-menu-drawer.png') });
    console.log('Captured mobile-menu-drawer.png');
    await mobileMenuBtn.click();
    await new Promise(r => setTimeout(r, 300));
  }

  // Mobile Projects Section
  await page.evaluate(() => {
    document.getElementById('projects')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, 'mobile-projects.png') });
  console.log('Captured mobile-projects.png');

  // Full page mobile
  await page.screenshot({ path: path.join(screenshotDir, 'mobile-full.png'), fullPage: true });
  console.log('Captured mobile-full.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

verifyBrowser().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
