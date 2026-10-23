# Lumen

A modern SaaS landing page for an AI analytics tool called "Lumen". Dark glassmorphism look, scroll animations and interactive demo blocks, available in English and Ukrainian.

## Tech stack

- [Vue 3](https://vuejs.org/) (`<script setup>`, TypeScript)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [vue-i18n](https://vue-i18n.intlify.dev/) for EN / UA
- [Lucide](https://lucide.dev/) icons
- [`@zaosoula/liquid-glass-vue`](https://www.npmjs.com/package/@zaosoula/liquid-glass-vue) for the glass effects

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check (vue-tsc -b) and build to dist/
npm run preview   # preview the production build
```

`npm run build` is what CI runs, and `vue-tsc -b` is stricter than `vue-tsc --noEmit`, so use the full build to check types before pushing.

## Sections

| Section | What it does |
| --- | --- |
| Navbar | Anchor links; on mobile a burger menu that also holds the language switch |
| Hero, preview, search | Intro, product screenshot with a trace border, glass search |
| Data teams, feature cards | Floating chips, auto-scrolling cards with click-to-flip |
| Just ask | Live chat demo with a click-triggered mascot popup |
| Reports that write themselves | Animated report being written and delivered to Slack |
| How it works | Clickable steps with a detail panel and auto-advance |
| Stats | Count-up tiles with a cursor spotlight |
| Testimonials | Swipeable 3D orbit of reviews (drag, arrows, dots, keyboard) |
| Pricing | Monthly / yearly toggle with animated prices |
| FAQ | Search, category filter and a fixed-height scrolling list |
| CTA | Email form with validation and success states, floating data chips |
| Footer | Socials, subscribe form, compact layout on mobile |

## Project structure

```
src/
  components/
    sections/   page blocks (one file per section)
    ui/         reusable pieces (CountUp, KpiTile, TypingDots, LumenLogo, ...)
  directives/   v-reveal: scroll-reveal via a shared IntersectionObserver
  i18n/locales/ en.json, ua.json
  layout/       Navbar, Footer
  assets/       images (webp), avatars
  style.css     Tailwind import, glass utility and shared animations
```

## Notes

- **Translations.** All visible text lives in `src/i18n/locales/en.json` and `ua.json`. When you add a key, add it to both files.
- **Scroll reveal.** Add `v-reveal` (optionally `v-reveal="150"` for a delay in ms) to fade an element in when it enters the viewport.
- **Accessibility.** Animations respect `prefers-reduced-motion`.
- **Placeholder content.** Testimonials, ratings, stats, pricing numbers, FAQ answers and the avatar photos (from randomuser.me) are demo data. Forms (CTA, footer) have no backend yet and only simulate success.
