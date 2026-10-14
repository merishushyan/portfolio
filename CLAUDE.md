# Meri Shushyan — portfolio site

UX / Product Designer, Nuremberg. Vanilla HTML/CSS/JS, hosted on GitHub Pages. No framework, no build step.

## Pages
- `index.html` — one scrolling page: loader intro, hero, Work (5-project hover list), About (bio, experience scrubber, skills hover list, impact stats), Contact, footer.
- `case-ambulance.html`, `case-ai-thesis.html`, `case-b2b-landing.html`, `case-rehat-travel.html`, `case-cinematic.html` — one case page per project.
- The thesis page's "04 prototypes" section is static screens (`assets/cases/thesis-sp-*.webp`).
- `styles.css`, `main.js` (site), `anim.js` (case-page animations).

## Hard rules
- Case pages show Meri's Behance/Figma screens EXACTLY as designed: untouched full-width images stacked in order. Never crop, filter, restyle or "improve" them. Only the nav and "← All projects" go around them.
- Animated sections are rebuilt as live HTML on top of her images (thesis: tool selection, testing process, results, per-prototype findings; ambulance: hero phones, research bars, IA chips, design decisions, user flow, outcome). They must match her original text sizes, colors and layout. Sizes are in "design px" scaled with `--u`.
- Slow animation only for thesis results and ambulance research bars. Everything else is fast.
- Hover previews on the Work list are 1600x732 (`assets/work/hover/*.jpg`).
- Design tokens: bg #0A0A0A, ink #F2F2F0, soft #8F8F8D, clay #C1684D. Font Inter (site), DM Sans / DM Serif Display / JetBrains Mono / Syne (case-page sections, bundled in `assets/fonts`).

## Assets
- `assets/cases/*.webp` — case-page images, sliced from her Figma exports (PNG @3x) into chunks of max 2400px height at 2x display width. Chunks stack with no gaps.
- `assets/ambulance/*` — screen recordings: `screen-walkthrough-full` (replaces the "Screen walkthrough" section), `hero-big` / `hero-small` (play inside the two hero phones).
- To add or replace a project: export from Figma (PNG @3x, whole frame), slice losslessly at the divider lines, add a case page, a hover image and one row in the Work list.

## Open items
- CV rewrite is waiting for real numbers (Visable conversion/time saved, thesis headline result, survey percentages). Deliver as .docx.
- Prototype screen recordings for REHat, B2B, Cinematic, thesis.
- Her German is A2, English fluent; site copy is English.
