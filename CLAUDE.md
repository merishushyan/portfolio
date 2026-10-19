# Meri Shushyan — portfolio site

UX / Product Designer, Nuremberg. Vanilla HTML/CSS/JS, hosted on GitHub Pages. No framework, no build step.

## Pages
- `index.html` — one scrolling page: loader intro, hero, Work (5-project hover list), About (bio, experience scrubber, skills hover list, then three story rows: Numbers first / Then people / Now also AI), Contact, footer.
- `case-ambulance.html`, `case-ai-thesis.html`, `case-b2b-landing.html`, `case-rehat-travel.html`, `case-cinematic.html` — one case page per project.
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

## Site decisions (Oct 2026)
- Work list order: "Mobile App for Ambulance Crews in Armenia" (sub: Emergency Response Data System), "Rapid Prototyping. AI vs Human Approach." (sub: A Comparative Usability Study) (names match Behance), Multi-market B2B Landing Pages, Cinematic Movie App, REHat Travel Redesign. Each row has method tags under the title, details under company and year on the right, and the screenshot appears below the hovered row.
- Hero: "Hey, I'm Meri." (DM Serif Display, Meri in clay italic), static tagline, no animation on the tagline.
- No impact stat tiles (she finds counters childish). Impact lives in the story text, method tags and the "In use nationwide in Armenia today" pill.
- Copy: no em dashes in new copy, personal tone, not AI-sounding. Location written "Nuremberg, Germany".
- Hover sound: soft wood tap (Web Audio, no files) on Work rows and Methods/Tools/Fields rows, behind a "Sound off/on" toggle in the Work header.
- Case pages: nav has a "← All projects" pill, and each page ends with a "Next project" row.

## Open items
- CV rewrite is waiting for real numbers (Visable conversion/time saved, thesis headline result, survey percentages). Deliver as .docx.
- Prototype screen recordings for REHat, B2B, Cinematic, thesis (smoother than the Figma embed).
- Thesis page uses her static "04 prototypes" screens (thesis-sp images), NOT the Figma embed. Do not add the prototype back.
- In her thesis Figma export, the section 04 heading reads "thre different levels of AI involvement" (typo in the image); fix in Figma and re-export.
- Her German is A2, English fluent; site copy is English.

## Update (Oct 19, later)
- About section label is "Toolkit" (not "Skills"); its three rows are Methods / Tools / Fields.
- Work rows show an always-visible thumbnail (230x105, from assets/work/hover/*.jpg) on the left; on phones it becomes a full-width image above the title (only preview on touch). The big cursor-following hover preview stays on desktop. Project titles are smaller (clamp 22px-36px) to give the thumbnails room.
- Hovering a project row: its small thumbnail fades to ~6% opacity while the big cursor-following preview shows (no duplicate image).
- Custom circle cursor (desktop with a mouse only, `(hover:hover) and (pointer:fine)`): 10px dot, 34px over links/buttons/hover rows, 58px orange circle with "View" over Work rows. State is re-checked on scroll via elementFromPoint. Native cursor hidden via `html.has-cur`. Code at the end of main.js; styles `.cur*` at the end of styles.css.
