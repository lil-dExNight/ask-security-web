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
