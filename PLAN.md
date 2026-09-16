# Development Plan

ASK Security landing website. Stack: see STACK.md. Requirements: see BRIEF.md.

## Design decision

- Base: **proto/dark** (terminal aesthetic, emerald accent, heavy motion)
- Borrow from proto/corporate: numbered sections (`01 — Services`), compliance-style badge row ("Methodology aligned with"), bento structure for services/cases, audit-report summary card in hero

## Phase 1 — Core landing

1. Remove `/proto/light` and `/proto/corporate`; promote `proto/dark` to `/`
2. Rework structure with corporate elements (numbered sections, badges, bento, hero report card) keeping the dark visual style
3. Move logo usage to a single component; favicon from the eye mark
4. Verify: `npm run build`, `npm run lint` green

## Phase 2 — Real content

1. Replace placeholder stats with real numbers (owner provides)
2. Replace placeholder cases and testimonials (owner provides)
3. Final copy review (canonical English, concise)

## Phase 3 — SEO & polish

1. Metadata, OpenGraph/Twitter cards, OG image
2. `sitemap.xml`, `robots.txt`, `llms.txt`
3. Performance pass: Lighthouse ≥ 95, image optimization
4. Accessibility pass: keyboard nav, contrast, reduced motion

## Phase 4 — Deploy

1. Static export / OpenNext config for Cloudflare
2. Deploy to Cloudflare Pages
3. Buy domain, attach, TLS
4. Verify production: pages load, contacts work, mobile check

## Phase 5 — Blog (later)

1. MDX-based blog under `/blog` (ISR, RSS)
2. Index + article templates in the same dark style

## Rules

- Placeholders are acceptable until real content is provided
- Build verification runs in GitHub Actions CI/CD
- After each phase: mandatory testing, validation, independent re-check via subagents (per AGENTS.md)
- Commits: owner's name, short conventional messages
