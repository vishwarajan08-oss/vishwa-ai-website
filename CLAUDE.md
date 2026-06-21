# Core Consulting — Project Context

## Stack
Next.js 14 App Router, Tailwind CSS, Framer Motion, JavaScript (not TypeScript), Supabase, Vercel

## Brand
| Token | Value |
|---|---|
| Burgundy | #6B1E2E |
| Deep Burgundy | #3D0D18 |
| White | #FAFAFA |
| Off-white | #F5F0EE |
| Charcoal | #1A1A1A |
| Taupe | #C9B8A8 |
| Divider | #E8E0DA |
| Font | Inter 300 + 700 |
| Style | Premium minimalist |

## Repo + Deploy
GitHub: vishwarajan08-oss/vishwa-ai-website
Live: https://vishwa-ai-website.vercel.app
Supabase project: zshfqcoyscxxqfjmueop
Supabase table: contact_submissions

## Pages
/ · /services · /results · /about · /vision · /blog · /faq · /contact

## Key Files
- config/content.js — drives services, stats, nav data
- lib/animations.js — fadeInUp, stagger, staggerMed, viewport
- lib/utils.js — cn helper
- components/Navbar.js
- components/Hero.js — used across pages, do not modify directly

## Rules
- JavaScript only, never TypeScript
- No hooks inside .map() — extract as sub-components
- framer-motion installed, do not reinstall
- clsx and tailwind-merge installed
- Run npm run build before every git push
- Push to GitHub only after build passes
- One component per commit
- Convert all .tsx components to .js before integrating
- dynamic() with ssr:false for any framer-motion drag component
- Restyle all external components to brand tokens before placing on page@AGENTS.md
