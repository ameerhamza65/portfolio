import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function generateOG() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1200px;
          height: 630px;
          background: #05070c;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 80px;
          position: relative;
          overflow: hidden;
        }
        .grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px);
          background-size: 36px 36px;
        }
        .glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(16, 185, 129, 0.12) 50%, transparent 70%);
          top: -100px;
          right: -100px;
          filter: blur(80px);
        }
        .content {
          position: relative;
          z-index: 10;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          border-radius: 9999px;
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.3);
          color: #22d3ee;
          font-family: 'JetBrains Mono', monospace;
          font-size: 15px;
          margin-bottom: 28px;
        }
        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
        }
        h1 {
          font-size: 64px;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.08;
          margin-bottom: 20px;
          background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          font-family: 'Inter', sans-serif;
          font-size: 24px;
          color: #94a3b8;
          max-width: 800px;
          line-height: 1.45;
        }
        .footer {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .pills {
          display: flex;
          gap: 12px;
        }
        .pill {
          padding: 8px 16px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 15px;
          font-family: 'JetBrains Mono', monospace;
          color: #cbd5e1;
        }
        .contact {
          font-family: 'JetBrains Mono', monospace;
          color: #22d3ee;
          font-size: 16px;
        }
      </style>
    </head>
    <body>
      <div class="grid"></div>
      <div class="glow"></div>
      <div class="content">
        <div class="badge"><span class="badge-dot"></span> Available for Contract & Freelance Work</div>
        <h1>Ameer Hamza</h1>
        <p>Front-End Developer specializing in React.js, Next.js, and Angular with 3+ years delivering 7-portal government platforms, enterprise systems, and real-time apps.</p>
      </div>
      <div class="footer">
        <div class="pills">
          <span class="pill">React.js</span>
          <span class="pill">Next.js</span>
          <span class="pill">Angular</span>
          <span class="pill">TypeScript</span>
          <span class="pill">Tailwind CSS</span>
        </div>
        <div class="contact">hamxa9403@gmail.com</div>
      </div>
    </body>
  </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  const ogPath = path.resolve(__dirname, '../public/og-image.png');
  await page.screenshot({ path: ogPath, type: 'png' });
  console.log('og-image.png successfully generated at', ogPath);
  await browser.close();
}

generateOG().catch(console.error);

