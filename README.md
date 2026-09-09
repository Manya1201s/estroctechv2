# ESTROC

Portfolio site for ESTROC. React 19 + Vite + Tailwind v4, single page.

```bash
npm install
npm run dev        # http://localhost:3001
npm run build      # tsc -b && vite build
```

## Things to fill in

Each of these is a single constant — no other file needs touching.

| What | Where |
| --- | --- |
| Backend URL the frontend calls | `VITE_API_BASE_URL` in `.env` (see `.env.example`) |
| Analytics (optional, off until set) | `VITE_GA_MEASUREMENT_ID` in `.env` (see `.env.example`) |
| Social handles | `socialLinks` in `src/pages/Home.tsx` |
| Client testimonials | `testimonials` in `src/components/estroc/Testimonials.tsx` |
| AUTOMAN project URL (only one still pending) | `projects` in `src/lib/projects.ts` |
| Backend env (OpenAI key, SMTP, CORS) | `backend/.env` (see `backend/.env.example`) |

**The enquiry form and chat widget** both POST to the FastAPI backend
(`backend/main.py`), which emails the brief via Gmail SMTP. If the backend is
unreachable, the form falls back to opening the visitor's mail client with the
brief pre-filled, addressed to `hello@estroc.com` — so leads land somewhere
either way.

**Testimonials and socials** render only when their arrays hold real entries.
Leave them empty and the section and the link column disappear cleanly, rather
than shipping placeholders to visitors.

**Legal pages.** `/privacy` and `/terms` ([src/pages/Privacy.tsx](src/pages/Privacy.tsx),
[src/pages/Terms.tsx](src/pages/Terms.tsx)) ship with standard boilerplate — accurate to
what the site actually does, but written by Claude, not a lawyer. Have someone
review them before this goes fully live, especially the governing-law section.

**Analytics.** Set `VITE_GA_MEASUREMENT_ID` in Vercel's environment variables to
turn on GA4. Until then `src/lib/analytics.ts` is a no-op — no script loads, no
events fire, nothing to disclose that isn't already in the privacy policy.

**Backend rate limiting.** `/api/enquiry` and `/api/chat` are rate-limited
in-memory per IP. That resets on every backend restart and only works correctly
behind a single instance — fine for one long-running process, not for multiple
replicas (swap in Redis if that changes).

## Motion

Reveals, the magnetic cursor and Lenis smooth scrolling all check
`prefers-reduced-motion` and step aside when it is set. Adding a new animation
means honouring that too — `useReducedMotion()` in components, a
`@media (prefers-reduced-motion: reduce)` block for CSS transitions.

## Light theme

`src/index.css` maps the dark palette to light through `html.light [class~="…"]`
overrides. Any *new* hard-coded colour utility (`bg-[#111113]`, `text-zinc-400`)
needs its counterpart added there, or it will stay dark when the theme flips.
