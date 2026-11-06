import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const artworks = [
  {
    slug: 'adnoc',
    title: 'ADNOC Oil & Gas Operations Management',
    tag: 'Enterprise Confidential • NDA Protected',
    badge: 'Angular 16 • RxJS • Real-time Telemetry',
    color1: '#0f172a',
    color2: '#0284c7',
    accent: '#38bdf8',
    icon: '🛡️',
    details: 'Mission-critical SCADA telemetry, automated incident escalation & RBAC authorization'
  },
  {
    slug: 'tori',
    title: 'Tori AI Assistant for SAP ERP',
    tag: 'Enterprise AI & Workflow Automation',
    badge: 'React • Material-UI • Streaming LLM',
    color1: '#090d16',
    color2: '#6366f1',
    accent: '#818cf8',
    icon: '⚡',
    details: 'Natural language interface dispatching structured inventory and procurement queries'
  },
  {
    slug: 'iceman',
    title: 'Iceman Performance Sportswear',
    tag: 'Custom Athletic Apparel & 2D Configurator',
    badge: 'React • Canvas 2D • Redux Toolkit',
    color1: '#0a0f1d',
    color2: '#059669',
    accent: '#34d399',
    icon: '❄️',
    details: 'Interactive jersey customizer, dynamic color palette picker & 3-step streamlined checkout'
  }
];

async function generate() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu']
  });

  const publicDir = path.resolve(__dirname, '../public/projects');

  for (const art of artworks) {
    const projDir = path.join(publicDir, art.slug);
    if (!fs.existsSync(projDir)) {
      fs.mkdirSync(projDir, { recursive: true });
    }

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 750 });

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 1200px;
            height: 750px;
            background: linear-gradient(135deg, ${art.color1} 0%, #030712 100%);
            font-family: 'Plus Jakarta Sans', sans-serif;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
          }
          .grid-bg {
            position: absolute;
            inset: 0;
            background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
            background-size: 32px 32px;
          }
          .glow {
            position: absolute;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, ${art.color2}44 0%, transparent 70%);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            filter: blur(60px);
          }
          .card {
            position: relative;
            z-index: 10;
            width: 900px;
            padding: 56px 64px;
            background: rgba(15, 23, 42, 0.75);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 28px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          }
          .tag {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 14px;
            border-radius: 9999px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            font-size: 14px;
            color: ${art.accent};
            font-family: 'JetBrains Mono', monospace;
            margin-bottom: 24px;
          }
          h1 {
            font-size: 44px;
            font-weight: 800;
            line-height: 1.15;
            margin-bottom: 20px;
            background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          p {
            font-size: 20px;
            color: #94a3b8;
            line-height: 1.5;
            margin-bottom: 36px;
            max-width: 760px;
          }
          .footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 24px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }
          .badge {
            font-family: 'JetBrains Mono', monospace;
            font-size: 15px;
            color: #38bdf8;
            background: rgba(56, 189, 248, 0.1);
            padding: 8px 16px;
            border-radius: 10px;
            border: 1px solid rgba(56, 189, 248, 0.25);
          }
          .icon {
            font-size: 40px;
          }
        </style>
      </head>
      <body>
        <div class="grid-bg"></div>
        <div class="glow"></div>
        <div class="card">
          <div class="tag"><span>${art.icon}</span> ${art.tag}</div>
          <h1>${art.title}</h1>
          <p>${art.details}</p>
          <div class="footer">
            <span class="badge">${art.badge}</span>
            <span style="color: #64748b; font-size: 14px; font-family: 'JetBrains Mono';">AMEER HAMZA • ARCHITECTURE</span>
          </div>
        </div>
      </body>
    </html>
    `;

    await page.setContent(html, { waitUntil: 'networkidle0' });
    const targetPath = path.join(projDir, 'desktop.webp');
    await page.screenshot({ path: targetPath, type: 'webp', quality: 90 });
    console.log(`Generated graphic for ${art.slug} -> ${targetPath}`);
    await page.close();
  }

  await browser.close();
}

generate().catch(console.error);

