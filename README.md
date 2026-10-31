# Rakshitha A J – Portfolio

Personal portfolio for **Rakshitha A J** — Data Science Student & Machine Learning Enthusiast. Built with React (Vite), GSAP, and Three.js.

## Tech Stack

- **Frontend:** React 19, Vite 7, CSS, GSAP, React Three Fiber (Three.js)
- **Fonts:** Syne, Outfit, Sora (Google Fonts)

## Features

- **Hero:** Photo-led hero with 3D background (floating shapes, particles), animated title, and social links
- **About, Skills, Projects:** Scroll-triggered sections with cards and skill orbs
- **Contact:** Icon-based contact cards (Email, Phone, LinkedIn, GitHub) — no form
- Responsive layout, smooth scroll, magnetic-style link hovers

## Local development

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Production build

```bash
cd frontend
npm run build
npm run preview
```

Output is in `frontend/dist`.

## Deploy on Vercel

1. Push this repo to GitHub (e.g. [swift08/RAKSHA-PORTFOLIO](https://github.com/swift08/RAKSHA-PORTFOLIO)).
2. In [Vercel](https://vercel.com), **Import** the repository.
3. Leave defaults — the root `vercel.json` sets:
   - **Root Directory:** `frontend`
   - **Framework:** Vite
   - **Build:** `npm run build`
   - **Output:** `dist`
4. Click **Deploy**. Your portfolio will be live at `https://<project>.vercel.app`.

No environment variables are required for the current static frontend.

## Repository structure

```
.
├── frontend/          # Vite + React app (deployed to Vercel)
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── backend/           # Optional Node/Express API (not used by Vercel deploy)
├── vercel.json        # Vercel config (rootDirectory: frontend)
└── README.md
```

## License

Private / personal use.
