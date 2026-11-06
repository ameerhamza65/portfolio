import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const projectsToCapture = [
  {
    slug: 'ajman-sewerage',
    url: 'https://www.ajmansewerage.ae/',
    name: 'Ajman Sewerage',
  },
  {
    slug: 'paaq',
    url: 'https://paaq.app/',
    name: 'PAAQ',
  },
  {
    slug: 'canteen-connect',
    url: 'https://www.canteen.com/',
    name: 'Canteen Connect',
  },
  {
    slug: 'winwith-wits',
    url: 'https://wits-tv.vercel.app/',
    name: 'WinWith Wits',
  },
  {
    slug: 'shortimize',
    url: 'https://www.shortimize.com/',
    name: 'Shortimize',
  },
  {
    slug: 'mentority',
    url: 'https://mentority-web.vercel.app/',
    name: 'Mentority',
  },
];

async function captureAll() {
  console.log('Launching headless Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const publicDir = path.resolve(__dirname, '../public/projects');

  for (const proj of projectsToCapture) {
    const projDir = path.join(publicDir, proj.slug);
    if (!fs.existsSync(projDir)) {
      fs.mkdirSync(projDir, { recursive: true });
    }

    const page = await browser.newPage();
    console.log(`\nCapturing [${proj.name}] (${proj.url})...`);

    try {
      // Desktop capture (1440x900)
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await page.goto(proj.url, { waitUntil: 'networkidle2', timeout: 25000 }).catch(err => {
        console.warn(`Navigation warning for ${proj.name}:`, err.message);
      });
      // Short delay for animations to settle
      await new Promise(r => setTimeout(r, 2000));
      const desktopPath = path.join(projDir, 'desktop.webp');
      await page.screenshot({ path: desktopPath, type: 'webp', quality: 85 });
      console.log(`  -> Desktop saved to ${desktopPath}`);

      // Mobile capture (375x812)
      await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
      await new Promise(r => setTimeout(r, 1000));
      const mobilePath = path.join(projDir, 'mobile.webp');
      await page.screenshot({ path: mobilePath, type: 'webp', quality: 85 });
      console.log(`  -> Mobile saved to ${mobilePath}`);
    } catch (err) {
      console.error(`Error capturing ${proj.name}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\nAll project live previews captured successfully!');
}

captureAll().catch(err => {
  console.error('Fatal capture error:', err);
  process.exit(1);
});

