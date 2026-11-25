# heytai.dev

Tai's professional portfolio as a software engineer, in Traditional Chinese
and English.

Built with Next.js 16 (App Router), React 19 and Tailwind CSS 3. Every page is
statically generated.

## Development

Requires Node.js 22 (see `.nvmrc`).

```bash
npm install
npm run dev
```

Open http://localhost:3000. Bare paths redirect to a locale (`/zh-TW` or
`/en`).

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` | Production build. `prebuild` first regenerates the Chinese display font subset. |
| `npm run start` | Serves the production build. |
| `npm run lint` | Runs ESLint. |

## Where things live

| Path | Contents |
|---|---|
| `lib/profile.js` | Profile, experience, education, about copy (`t(zh, en)` pairs) |
| `lib/data.js` | Projects and case studies (`t(zh, en)` pairs) |
| `lib/i18n/dictionaries.js` | UI strings |
| `lib/site.js` | Email and social links |
| `app/[locale]/` | Routes, layout, OG image |
| `components/` | Shared components |
| `scripts/subset-display-font.mjs` | Builds the Chinese display font subset |

## Guidelines

Read [DESIGN.md](DESIGN.md) before changing the design, copy or page structure.
It records the decisions behind the current design so the site does not drift
back to its old look.
