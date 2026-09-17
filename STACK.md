# Tech Stack

Chosen stack for the ASK Security website.

## Core

- **Framework**: Next.js (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Animations**: Motion + Lenis

## Future growth

- **Blog**: MDX or headless CMS (ISR, RSS via Next.js)
- **Backend features** (auth, forms, API): native Next.js capabilities

## Hosting

- Railway: native Node.js server (Dockerfile, `output: "standalone"`), persistent volume for blog posts

## Rationale

- Industry standard: largest ecosystem, easy hiring
- Landing page now (SSG, SEO), blog and app features later without changing the stack
