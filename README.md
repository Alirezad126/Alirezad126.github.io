# Machine Learning Portfolio

A professional dark-theme Machine Learning portfolio built with React, Vite, and Tailwind CSS. The design uses a research-lab/hacker-terminal aesthetic with glass cards, electric teal accents, smooth scroll, animated section reveals, project filters, and responsive layouts.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Build for production

```bash
npm run build
npm run preview
```

## Customize your content

Edit this file:

```bash
src/data/portfolio.js
```

It is the single source of truth for the website content. Update:

- `name`, `tagline`, `bio`, `avatar`, and `cvUrl`
- `skills`
- `projects`
- `experience`
- `publications`
- `contact`

## Avatar and CV

The template includes:

```bash
public/avatar.svg
public/cv.pdf
```

Replace these with your own files. Keep the same names, or update `avatar` and `cvUrl` in `src/data/portfolio.js`.

## Project filters

Project filter tabs are generated automatically from the `tags` inside `portfolio.projects`. Add or remove tags in the data file and the UI updates automatically.

## Publications section

The publications section is conditional. If this array is empty, the section will not render:

```js
publications: []
```

## Main files

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── ProjectCard.jsx
│   ├── Skills.jsx
│   ├── Experience.jsx
│   ├── Publications.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── data/
│   └── portfolio.js
├── hooks/
│   └── useInView.js
├── App.jsx
├── main.jsx
└── index.css
```
