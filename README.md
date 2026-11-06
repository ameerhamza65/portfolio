# Ameer Hamza — Senior Front-End Developer Portfolio

> **Production-ready, conversion-focused personal portfolio website** designed for Ameer Hamza (React.js | Next.js | Angular, 3+ years experience). Built with **React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion**.

---

## 🚀 Key Highlights & Architectural Features

- **30-Second Conversion Architecture**: Positioned to instantly capture recruiters and freelance/contract clients with high-trust proof of work, direct CTAs ("Hire Me / Get in Touch"), and 1-click contact channels.
- **Real Shipped Work Previews**:
  - Live screenshots captured directly from production URLs (`public/projects/<slug>/[desktop|mobile].webp`).
  - Interactive browser frame modal with simulated URL address bar, clipboard copying, and live `<iframe>` fallback mechanism.
  - Truthful role badges: **Solo**, **Team** (e.g. Shortimize), and **Led team** (e.g. Ajman Sewerage 7-portal system).
  - Private / Enterprise NDA badge and security callout for internal platforms like the **ADNOC Oil & Gas Operations Portal**.
- **Dark Theme by Default with Light Mode Toggle**: Persisted automatically via `localStorage` with zero-flash-of-unstyled-content (FOUC).
- **Verified Metrics & Stats**:
  - `3+ Years` | Experience (Building production web apps with React, Next.js & Angular)
  - `Multiple Live Projects` | Shipped Work (Shipped to production for government, AI, social and gaming clients)
  - `4 Domains` | Specialized Verticals (Government municipal, AI assistants, social platforms & gaming)
  - `7 Portals` | Government Platform (Ajman Sewerage municipal platform architected in React)
  - Layout: 4 equal columns on desktop, 2x2 on tablet and mobile, with no empty gap.
- **Production-Ready EmailJS Integration**: Connected directly to EmailJS so submissions deliver directly to `hamxa9403@gmail.com`. Includes field validation on blur and submit, honeypot anti-spam, 30-second rate limiting, accessibility attributes, and direct mail fallback.
- **Zero-Code Content Management**: 100% of data (bio, stats, projects, skills, timeline, testimonials) lives in type-safe files inside `src/data/*.ts`.
- **Accessibility & Performance**: Target 90+ Lighthouse, zero layout shift (CLS < 0.05), semantic HTML5, and strict respect for `prefers-reduced-motion`.
- **SEO & Social Sharing**: Complete Open Graph, Twitter Cards, SVG favicon, `sitemap.xml`, `robots.txt`, and structured `JSON-LD` (`Person` schema).

---

## 🛠️ Tech Stack

- **Core**: React 18 (`react`, `react-dom`), TypeScript 5.6, Vite 5.4
- **Styling**: Tailwind CSS 3.4 (custom design tokens in `tailwind.config.js`)
- **Animation**: Framer Motion 11
- **Email Delivery**: `@emailjs/browser`
- **Icons**: Lucide React
- **Automation / Headless Capture**: Puppeteer Core (using local headless Chrome)
- **Deployment**: Zero-config static output (`dist/`) ready for Vercel, Netlify, or Cloudflare Pages

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+` or `v10+`

### 2. Installation
```bash
git clone <your-repo-url>
cd portfilio
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Your `.env` file structure:
```env
# EmailJS Configuration (Service ID is pre-filled for your Gmail service)
VITE_EMAILJS_SERVICE_ID=service_v0bcrbk
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=

# Portfolio Canonical URL
VITE_SITE_URL=https://ameerhamza.dev
```

> **Note**: `.env` is ignored in git (`.gitignore`). Never commit your public or private keys to source control.

### 4. Run Development Server
```bash
npm run dev
```
The site runs locally at `http://localhost:5173/`.

### 5. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 📧 EmailJS Setup & Configuration Guide

The contact form is connected to EmailJS via `src/lib/sendEmail.ts` and delivers inquiries straight to **hamxa9403@gmail.com**.

### 1. Finding Your Keys in the EmailJS Dashboard

1. **Service ID (`VITE_EMAILJS_SERVICE_ID`)**:
   - Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin) > **Email Services**.
   - Your pre-configured Gmail service ID is `service_v0bcrbk`.
2. **Template ID (`VITE_EMAILJS_TEMPLATE_ID`)**:
   - Go to **Email Templates**.
   - Click on your existing "Contact Us" template.
   - The Template ID is displayed under the template title (e.g. `template_xxxxxxx`) or in the **Settings** tab.
3. **Public Key (`VITE_EMAILJS_PUBLIC_KEY`)**:
   - Go to your profile menu (top right) or **Account** > **General** > **API Keys**.
   - Copy the string labeled **Public Key** (formerly User ID).

### 2. Exact Template Variables

The code in `src/lib/sendEmail.ts` sends **EXACTLY** these parameters to match your existing EmailJS template:

| Variable | Description | Example Value |
| :--- | :--- | :--- |
| `{{name}}` | Visitor's full name | `Sarah Jenkins` |
| `{{email}}` | Visitor's email address | `sarah@company.com` |
| `{{title}}` | Selected Inquiry Type | `Freelance / Contract Project` |
| `{{message}}` | Project details & timeline | `We need an expert React engineer for our MVP...` |
| `{{time}}` | Submission timestamp | `11/6/2026, 4:15:00 AM` |

> ⚠️ Do not change these variable names in `sendEmail.ts` as your existing EmailJS template maps directly to them.

### 3. Setting Environment Variables on Vercel & Netlify

Because Vite embeds environment variables with the `VITE_` prefix at build time, **you must trigger a redeployment after saving or updating environment variables**.

#### On Vercel:
1. Open your project in the [Vercel Dashboard](https://vercel.com).
2. Go to **Settings** > **Environment Variables**.
3. Add the following key-value pairs:
   - `VITE_EMAILJS_SERVICE_ID` = `service_v0bcrbk`
   - `VITE_EMAILJS_TEMPLATE_ID` = `your_template_id_here`
   - `VITE_EMAILJS_PUBLIC_KEY` = `your_public_key_here`
4. Click **Save**.
5. Go to **Deployments** > click the three dots on the latest deployment > **Redeploy** (or push a new commit).

#### On Netlify:
1. Open your site in the [Netlify Dashboard](https://app.netlify.com).
2. Go to **Site Configuration** > **Environment Variables**.
3. Click **Add a variable** and add:
   - `VITE_EMAILJS_SERVICE_ID` = `service_v0bcrbk`
   - `VITE_EMAILJS_TEMPLATE_ID` = `your_template_id_here`
   - `VITE_EMAILJS_PUBLIC_KEY` = `your_public_key_here`
4. Click **Create variable**.
5. Go to **Deploys** > **Trigger deploy** > **Clear cache and deploy site**.

### 4. How to Restrict Allowed Domains (Anti-Abuse Security)

To prevent unauthorized parties from using your EmailJS Public Key from other websites:
1. In EmailJS, navigate to **Account** > **Security**.
2. Find the **Allowed Domains** (or Domain Whitelist) setting.
3. Enable domain restrictions and add your domains:
   - `localhost` (for local development testing)
   - `127.0.0.1` (for local development testing)
   - `ameerhamza.dev` (your production custom domain)
   - `your-site.vercel.app` (your Vercel preview domain)
4. Click **Save Changes**.

---

## ✍️ How to Edit Content (Without Touching React Code)

All site data is modularized in `src/data/`:

| File | What It Controls |
| :--- | :--- |
| `src/data/profile.ts` | Name, title, "3+ years" experience text, headline, bio paragraphs, quick stats (3+ Years, Multiple Live Projects, 4 Domains, 7 Portals), phone, email, and social links. |
| `src/data/projects.ts` | Project titles, summaries, live URLs, role badges (`Solo`, `Team`, `Led team`), tech pills, outcomes, and screenshots. |
| `src/data/skills.ts` | Grouped skill domains (Frameworks, State, Languages, Styling, Real-time & APIs, Backend, Cloud). |
| `src/data/experience.ts` | Vertical timeline items (TxLabz, Senarios, PixelEdge, Softhive), dates, key achievements, and tools. |
| `src/data/testimonials.ts` | Client recommendations and quotes. (Set array to `[]` to completely hide the section). |

---

## 📸 How to Refresh or Add Project Previews

A built-in headless browser script captures real desktop and mobile screenshots directly from live URLs:

```bash
# Capture fresh desktop (1440x900) & mobile (375x812) WebP images for all projects:
node scripts/capture-previews.mjs

# Generate customized art graphics for NDA & internal enterprise projects (ADNOC, Tori, Iceman):
node scripts/generate-art-previews.mjs

# Generate the Open Graph 1200x630 social card:
node scripts/generate-og-image.mjs
```

Images are saved automatically as lightweight `.webp` files in `public/projects/<slug>/`.

---

## 🚢 Zero-Config Deployment

### Deploy to Vercel
1. Push your repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com/new), select **Import Project**.
3. Framework Preset: **Vite** (automatically detected).
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Add the 3 `VITE_EMAILJS_*` environment variables.
7. Click **Deploy**.

---

## 📄 License & Attribution
Designed and built for **Ameer Hamza**. Open to freelance, contract, and full-time opportunities.
