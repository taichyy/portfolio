# heytai.dev Design & Engineering Guidelines

This document records the decisions behind the 2026 redesign (commits
`6947d66` and `73c8abe`). It exists so that future changes, by people or AI
agents, keep the site moving forward instead of drifting back to the old look.

**Read this before changing anything visual, any copy, or the page structure.**
If a request conflicts with a rule here, point out the conflict and ask before
breaking the rule. If a rule changes on purpose, update this file in the same
change.

---

## 1. What this site is

- **Tai's professional portfolio as a software engineer.** The audience is
  recruiters, hiring managers, interviewers and potential collaborators.
- **It is not a studio or freelance site.** Taiche Technology (太馳科技) is a
  separate business and is kept out of this site: no studio branding, no
  "hire us", no service lists, no links to taiche.dev (including in JSON-LD).
- Every page should answer, quickly and factually, three things:
  - What Tai builds.
  - What he was responsible for.
  - How to contact him.

## 2. Non-negotiables

1. White paper, near-black ink, and **one** brand colour: yellow `#FEFF0D`.
2. Yellow is only ever a **fill behind ink**. Never yellow text, never a thin
   yellow line, never a yellow icon on white.
3. Flat and editorial: no shadows, no decorative gradients, no rounded cards,
   no glassmorphism, no emoji.
4. Typography does the work: heavy display type, mono labels, generous space.
5. Copy is first person, factual and specific. Never invent facts.
6. Every piece of content exists in both Traditional Chinese and English.
7. Server components by default. Content data never ships to the browser.
8. Every page stays statically generated.
9. Motion is subtle and always respects `prefers-reduced-motion`.

---

## 3. Colour

All colours are CSS variables in `app/globals.css`, exposed through Tailwind in
`tailwind.config.js`. Never hard-code hex values in components.

| Token | Light | Dark | Use |
|---|---|---|---|
| `background` | `#FFFFFF` | `#171717` | Page |
| `foreground` | `#171717` | `#F5F5F5` | Body text, strong rules |
| `muted-foreground` | `#5C5C5C` | `#B3B3B3` | Secondary text (6.7:1 on white) |
| `subtle` | `#737373` | `#999999` | Metadata and labels (4.7:1 on white) |
| `line` | `#E8E8E8` | `#333333` | Hairlines |
| `brand` | `#FEFF0D` | `#FEFF0D` | Highlighter fill only |
| `brand-ink` | `#171717` | `#171717` | Text on brand yellow |

Rules:

- **The brand yellow is exactly `#FEFF0D`.** It is stored as RGB channels
  (`--brand: 254 255 13`) so it renders exactly. Do not "adjust" it.
- **Yellow never carries meaning on its own.** Against white it is about
  1.1:1, so anything yellow must also be readable without the colour: ink
  text on top, an underline, or a label.
- **The logos use the same `#FEFF0D`.** If a logo is replaced, match it. The
  logo files are:
  - `public/logo-dark.png`
  - `public/logo-white.png`
  - `public/images/contact/logo-whitebg.png`
  - `app/favicon.ico`
- **Dark mode is the same design in reverse, not a different look.** It
  follows the system (`defaultTheme="system"`), and the yellow does not
  change.

## 4. Typography

| Role | Font | Notes |
|---|---|---|
| Latin display and body | Bricolage Grotesque (`--font-latin`) | Variable `opsz` and `wdth` axes |
| Chinese display headings | Noto Sans TC 800, local subset (`--font-cjk-display`) | Loaded only on Chinese pages |
| Chinese body | System fonts | PingFang TC, Microsoft JhengHei, Noto Sans CJK TC |
| Labels, metadata, numbers | JetBrains Mono (`--font-mono`) | Uppercase, wide tracking |

- **Display headings** use `.font-display` with `font-extrabold` (800).
- **Display sizes** use the fluid tokens `text-display-hero`,
  `text-display-xl`, `text-display-lg` and `text-display-md`. Do not add
  one-off `clamp()` values.
- **Tracking:** Latin display is tight (`-0.035em`) and Chinese is slightly
  open (`0.01em`). `--display-tracking` handles this; do not override it.
- **Small metadata** uses `.label-mono`.
- **The Chinese display font is a subset.**
  - `scripts/subset-display-font.mjs` runs on `prebuild` and collects every
    CJK character in `app/`, `components/` and `lib/`.
  - After adding new Chinese headings, run `node scripts/subset-display-font.mjs`
    so the new characters use the display font in development too.
- **Do not add more web fonts or more weights.** Font payload is part of the
  design.

### Copy markup

Copy strings use two small markup conventions, rendered by `<Marked>` in
`components/editorial.jsx`:

- **`[[words]]`** puts the yellow highlighter behind those words. Use it for
  the one or two words that carry the sentence, at most one mark per heading.
- **`|`** marks an allowed line break in Chinese display headings. Chinese uses
  `word-break: keep-all`, so it breaks only at punctuation, spaces and `|`.
  Use `displayTitle` on a project when its title needs a break point.

## 5. Layout

- **Content width:** `max-w-[1240px]`, side padding `px-6 md:px-10`.
- **Grid:** desktop grids use 12 columns (`lg:grid-cols-12`).
- **Section spacing:** `mt-24 md:mt-32` between sections, larger before
  Contact.
- **Inner pages** start at `pt-32 md:pt-44` to clear the fixed 4rem header.
- **Structure comes from rules, not boxes:**
  - `border-t border-foreground` opens a major block.
  - `border-line` hairlines separate rows.
- **Corners are square.** `--radius` is `0.125rem`. Round only small controls:
  the theme and locale toggles, and the carousel buttons.

## 6. Signature elements

These make the site recognisable. Reuse them; do not invent parallel versions.

| Element | Where | Rule |
|---|---|---|
| `SectionLabel` | Opens each section | Mono label set in a solid yellow tab |
| `NumberTab` | Projects only (plus the mobile menu) | A project's catalogue number |
| `<Marked>` / `.mark` | Headlines | The highlighter |
| `.link-mark` / `.mark-hover` | Links and titles | On hover, a yellow fill rises from the baseline |
| `FeatureBand` | Homepage, once | The one full-bleed yellow band, for the lead featured project |
| `ProjectRow` | Homepage and `/projects` | Number, title, tagline, metadata, real screenshot |
| `PageHeader` | Inner pages | Mono eyebrow, display title, intro |

- **Only one full-bleed yellow area per page.** Yellow is precious; spread out,
  it stops meaning anything.
- **Catalogue numbers are stable.** A project's number is its rank by
  `priority` (`lib/data.js`) and is shown everywhere that project appears.
- **Links keep an ink underline at rest**, so yellow is never the only cue.
- **On a yellow surface** (`.on-brand`), the hover fill inverts to ink.
- **Images are real screenshots of real work.** No stock photos, no
  illustrations, no mock devices.

## 7. Motion

Motion supports reading; it never performs.

Allowed:

- The highlighter wipe on hover.
- Small arrow nudges.
- Fades on dialogs and the tenure tip.
- Cross-page view transitions: the project screenshot morphs between list and
  detail, and locale switches cross-fade.

Rules:

- Every animation is wrapped in `prefers-reduced-motion: no-preference` or
  disabled under `reduce`.
- Hover styles apply only on devices that can hover
  (`hoverOnlyWhenSupported`), so taps never leave links stuck.

## 8. Removed on purpose — do not bring back

| Removed | Why |
|---|---|
| Full-screen hero image, "scroll down" button | Recruiters should see who Tai is on the first screen |
| Scroll-reveal / AOS fade-ins | Slows scanning, adds JavaScript, hides content from quick readers |
| Typing animation (`react-type-animation`) | A gimmick that delays the actual message |
| Icon font (icomoon), wall of tech logo badges | The technical profile is grouped text backed by real experience |
| Retrospective section ("如果重做") | Removed at Tai's request |
| Notes in the navigation | Not part of the professional story |
| Taiche studio projects, branding and links | The studio and the portfolio are kept separate |
| Shadows, gradients, rounded cards | Conflict with the flat editorial look |
| Embla carousel, Radix dialog | Replaced by a native scroll-snap carousel and a native `<dialog>` |

## 9. Content and copy

- **Voice:** first person, plain and specific, like Tai talking. Say what was
  built, what Tai owned, and what changed as a result.
- **Avoid AI-sounding copy:**
  - "Not just X, but Y" constructions.
  - Stacked em dashes.
  - Lists of three written only for rhythm.
  - Empty verbs: 打造, 賦能, empower, leverage, passionate, seamless.
  - Slogans.
- **Never invent facts.**
  - Company names, dates, numbers (100+ pages, about 80%, TOEIC 795) and
    technical claims must be real.
  - If a fact is unknown, write a visible placeholder, `（待補）` / `(TODO)`,
    and leave it for Tai.
- **Technical claims must match the code.** For example, TaidyPass encrypts
  with AES-256-GCM and derives keys with PBKDF2; SHA-256 is not the
  encryption.
- **Bilingual pairs:**
  - Content lives in `lib/profile.js` and `lib/data.js` as `t(zh, en)`.
  - UI strings live in `lib/i18n/dictionaries.js`.
  - Change both languages together; they must say the same thing. Chinese is
    the source language.
- **Computed values stay computed.** Never hard-code these numbers in copy:
  - **Full-time tenure:** summed from the experience dates, shown in years and
    months.
  - **Freelance tenure:** from `FREELANCE_START` up to the first full-time
    job, shown in whole years.
  - **Total years in web development:** full-time plus freelance, rounded
    down, shown as "N 年以上" / "N+ years".
- **Contact details** (email, GitHub) live in `lib/site.js`. Do not repeat
  them elsewhere.

## 10. Information architecture

**Navigation order:** Projects (`作品` / `Works`), Experience, About, Contact.

**Homepage order:**

1. Identity: headline, intro and facts rail.
2. Feature band: the lead featured project.
3. Profile summary.
4. Selected work.
5. Experience.
6. Technical profile.
7. Contact.

**Project case-study order.** Sections render only when the field exists.

1. Background
2. Overview
3. Why it was needed
4. My role
5. Technical challenge
6. Implementation
7. Engineering decisions
8. Result
9. Details (deep dive)

**Project order** on the homepage comes from `featured` and `priority`. The
lead `featured` project takes the yellow band.

## 11. Engineering rules

**Rendering and bundle size**

- Pages and shared components are **server components** by default.
- Only interactive pieces are client components (`"use client"`):
  - The gallery, lightbox and zoomable image.
  - The navigation, the theme and locale toggles, and the tenure tip.
- **Never import `lib/data.js` or `lib/profile.js` from a client component.**
  That ships every project in both languages to the browser. Resolve content
  on the server and pass plain props down.
- **Prefer native platform features over libraries:** `<dialog>`, `popover`,
  CSS scroll-snap, view transitions, CSS anchor positioning.

**Static generation**

- Every route stays statically generated (`generateStaticParams`).
- Do not call `headers()` or `cookies()` in pages or layouts; that makes every
  route dynamic. This is why the 404 page reads the locale from the URL on the
  client.
- `revalidate = 86400` in the locale layout keeps date-based values fresh.

**i18n**

- Every route lives under `/[locale]` (`zh-TW` is the default, plus `en`).
- `proxy.js` redirects bare paths using a cookie first, then
  `Accept-Language`.
- The locale switch is a plain `<a>`, not `<Link>`, so `<html lang>` and the
  JSON-LD are re-rendered.

**Accessibility**

- Keep the skip link and `main#content`.
- Keep visible focus styles. Keyboard focus gets the same highlight as hover.
- After client navigation, `NavigationReset` scrolls to the top and moves
  focus to the new page's `h1`.
- Modals (the mobile menu and the lightbox) are native `<dialog>` elements, so
  the browser handles the focus trap, Esc and the inert background.
- Keep text contrast at the token values above.

**SEO**

- OG and Twitter images are generated per locale by
  `app/[locale]/opengraph-image.jsx` from the homepage headline.
- The JSON-LD `Person` lives in the locale layout. `sameAs` lists GitHub only.

**Code style**

- 4-space indentation.
- Arrow-function components that take a single `props` argument and
  destructure it in the body.
- Imports ordered: external, blank line, local.
- Page-only components go in a `(components)` folder next to the page.
  `components/` and `lib/` are for shared code.
- Comments explain why, not what. All code text is in English.

## 12. Before you finish a change

1. Did anything become yellow that is not a fill behind ink?
2. Is there still only one full-bleed yellow area on the page?
3. Were both `zh` and `en` updated, and do they say the same thing?
4. Is every new fact real? If not, is it marked `（待補）` / `(TODO)`?
5. Did a client component start importing `lib/data` or `lib/profile`?
6. Does `npm run build` still show every page as static (●)?
7. Does `npm run lint` pass?
8. Does it work at phone width, in dark mode and with reduced motion?
9. If a rule in this file changed on purpose, was this file updated too?
