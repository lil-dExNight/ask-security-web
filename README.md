# ASK Security — Website

Landing page for ASK Security, a web3 security audit company: code audits, infrastructure audits, security research, and post-deployment monitoring.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- Motion (`motion/react`) for scroll and entrance animations
- Lenis for smooth scrolling
- lucide-react icons, shadcn/ui button

## Commands

```bash
npm run dev    # start dev server
npm run build  # production build
npm run lint   # eslint
```

## Structure

- `src/app/` — root layout, landing page, global styles (dark theme tokens and effects live at the end of `globals.css`)
- `src/components/landing/` — page sections (header, hero, services, stats band, cases, testimonials, contact, footer)
- `src/components/ui/` — shadcn/ui primitives
- `public/logo.png` — brand mark (inverted via CSS filter for the dark theme)

## Blog & Admin

Posts are Markdown files with frontmatter (`title`, `date`, `excerpt`, `tags`, `draft`) stored in `content/blog/`.

- Public blog: `/blog` (published posts only, drafts are hidden).
- Admin panel: `/admin` — list, create, edit and delete posts with a live Markdown preview.

Set the admin password before using the panel:

```bash
# .env.local
ADMIN_PASSWORD=your-strong-password
```

Without `ADMIN_PASSWORD`, `/admin` shows a setup notice and login stays disabled. Sessions use a signed, httpOnly `ask_admin` cookie with a 7-day expiry. Admin routes are disallowed in `robots.txt` and require no extra dependencies — auth is built on `node:crypto` (HMAC-SHA256).
