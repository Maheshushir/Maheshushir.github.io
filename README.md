# Mahesh Ushir — Portfolio

Personal portfolio of Mahesh Ushir, Data Analyst & Strategist. Live at
[maheshushir.vercel.app](https://maheshushir.vercel.app).

## Stack

- React 19 + TypeScript, built with Vite
- Tailwind CSS v4 (design tokens in `styles/index.css`)
- Motion for React (`motion/react`) for reveals and transitions
- Two components from [Rare UI](https://rareui.com): `AnimatedCounter` (hero metrics)
  and `GravityLetters` (click the hero to drop glyphs), in `components/ui/`
- Self-hosted Geist, Geist Mono and Instrument Serif via Fontsource

## Structure

| Path | What it holds |
|---|---|
| `lib/content.ts` | Every fact on the site: profile, metrics, projects, case studies, experience |
| `lib/motion.ts` | Shared easing, durations and viewport settings |
| `lib/router.ts` | Minimal router for `/` and `/work/<slug>` |
| `components/primitives.tsx` | `Reveal`, `SplitWords`, `SectionHead`, `Button`, `TextLink` |
| `components/*.tsx` | One file per section, plus `CaseStudy.tsx` |
| `public/work/` | Project screenshots and charts (WebP), taken from the project repos |

To change a number, a project or a job, edit `lib/content.ts` only.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # type-safe production build into dist/
npm run preview
```

The build also writes `dist/work/<slug>/index.html` for each case study (own title,
description and canonical URL for crawlers and link previews) and `dist/sitemap.xml`.
`vercel.json` falls back to `index.html` for client-side routes.

## Adding Rare UI components

`components.json` registers the Rare UI registry:

```bash
npx shadcn@latest add @rare-ui/<component>
```

## Credits

Motion components by [Rare UI](https://rareui.com) © Swami Malode, used under its
MIT + Commons Clause + Attribution license. The credit is also linked in the site footer.
