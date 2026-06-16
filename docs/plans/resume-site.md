# Plan — animated résumé site (mridul-sahu.github.io)

Bespoke personal résumé site matching the **research.rudrite.com** visual language
(monochrome ink-on-paper, Geist / Geist Mono / Instrument Serif, `cubic-bezier(.22,1,.36,1)`
motion, `Reveal` scroll entrances) — NOT stamped with Rudrite's brand-bound marks
(no VT323 wordmark, no voxel elephant). This is Mridul's own surface.

## Stack
- [x] Vite + React 19 + TypeScript
- [x] `motion/react` (Framer Motion) for scroll reveals + progress
- [x] Plain-CSS design tokens (mirrors research `index.css` `:root`)
- [x] Google Fonts: Geist, Geist Mono, Instrument Serif
- [x] Deploy: GitHub Actions → Pages (build `dist/`), `base: '/'` (user-pages root)
- [x] Legacy single-file résumé preserved as `legacy-index.html`
- [x] PDF résumé shipped in `public/` for download

## Sections
- [x] Sticky header + scroll-progress bar (ink→graphite)
- [x] Hero — kicker (mono), oversized name, role, summary lede w/ Instrument Serif accent, CTAs
- [x] Career timeline — vertical spine, one station per role, bullets reveal on scroll
- [x] Selected Work — bespoke cards w/ animated SVG micro-visuals (shard load, save, broadcast, tick)
- [x] Publications (Orbax paper, EvoCut)
- [x] Projects (research.rudrite.com)
- [x] Footer — contact + links + résumé PDF
- [x] `prefers-reduced-motion` respected throughout

## Follow-ups (next passes)
- [ ] Richer per-role bespoke visuals (per research's "unique visual per item" rule)
- [ ] FocusText line-focus on the summary
- [ ] Side rail TOC at ≥1440px
- [ ] OG image + SEO meta + favicon
- [ ] Lighthouse + reduced-motion + mobile QA pass
