# Alireza Daneshvar — Portfolio

A small, fast, multi-page portfolio built with React, Vite, and Tailwind CSS.
Light and dark themes, no animation libraries, no runtime CSS-in-JS.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content

`src/data/portfolio.js` is the single source of truth for every page. It holds:

| Key | Used by |
| --- | --- |
| `name`, `fullName`, `role`, `bio`, `avatar`, `cvUrl` | Hero, Navbar, Footer |
| `contact` | Hero, Contact page, Footer |
| `news` | Home (latest 3) and `/news` |
| `experience`, `education`, `skills` | `/experience` |
| `projects` | Home (featured 3) and `/projects` |
| `publications` | `/publications` |

### Adding a news item

Put the newest entry first. `date` is `YYYY-MM` and renders as "Mon YYYY";
`tag`, `body`, and `href` are optional.

```js
{
  date: '2026-11',
  tag: 'Talk',
  title: 'Invited talk at …',
  body: 'One or two sentences.',
  href: 'https://example.com'
}
```

### Adding a project

Set `detail: true` only when the project has a write-up page under
`src/pages/projects/` and a matching route in `src/App.jsx`. Set
`imageFit: 'contain'` for diagrams and schematics, which must be letterboxed
on white rather than cropped to the card's 16:9 frame. A project with no
`image` at all falls back to a typographic tile built from its first tag.

Write-ups are built from the shared primitives in `src/components/`:
`ProjectLayout` (back link, title block, tags, links) with its `Section`,
`InfoGrid`, and `Figure` exports, `DataTable` for results tables (a row may set
`highlight: true`), and `Math` for `Equation`, `EquationGroup`, and
`InlineMath`.

## Routes

```text
/                       Hero, latest news, featured projects
/news                   Full news timeline
/experience             Work history, education, skills
/projects               All projects, filterable by tag
/publications           Papers and preprints
/contact                Contact details
/projects/<slug>        Individual project write-ups (code-split)
                        sd-dpc-sparse-dictionary-control
                        safe-rl-energy-hub
                        building-safe-rl-dpc
                        dompark-energy-optimization
                        ahu-fault-detection
                        rag-gpt-document-chatbot
                        personal-ai-chatbot
                        snake-dqn-agent
```

## Performance notes

- Project write-ups are loaded with `React.lazy`, and all math goes through
  `src/components/Math.jsx`, so KaTeX (~266 kB) is one shared chunk fetched
  only by the pages that render equations.
- One webfont family (Inter), applied through the Tailwind `sans` stack.
- No backdrop blur on cards, no animated background layers, no scroll-reveal
  observers — the page paints once and stays cheap to scroll.

## Structure

```text
src/
├── components/   Reusable sections (Hero, News, Projects, …)
├── pages/        One file per route
│   └── projects/ Long-form project write-ups
├── data/
│   └── portfolio.js
├── App.jsx
├── main.jsx
└── index.css     Theme tokens and component classes
```
