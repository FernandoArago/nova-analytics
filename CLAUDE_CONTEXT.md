# Nova Analytics — AI Agent Engineer Trial Project
# Last updated: 2026-06-02
# Purpose: Living context file for Claude Code (terminal) and VS Code Claude extension.
#          Update this file after every major step completed.

---

## 1. PROJECT BRIEF

**Client:** Dot Com Media (trial assignment for AI Agent Engineer role)
**Fictional client to build for:** Nova Analytics
**Goal:** Fork an open-source dashboard, whitelabel it under Nova Analytics identity,
build a public-facing landing page with functional auth, and deploy it live.

**Key constraint:** All development must be driven using Claude Code (Anthropic CLI tool).
The reviewers evaluate both the final product AND how effectively AI-assisted development was used.

---

## 2. REPOSITORY

| Field | Value |
|-------|-------|
| Original repo | https://github.com/satnaing/shadcn-admin |
| Stack | Vite + React + TypeScript + shadcn/ui + Tailwind CSS v4 |
| License | MIT |
| Fork URL | https://github.com/FernandoArago/nova-analytics |
| Live URL | https://nova-analytics.onrender.com |
| Test user | admin@novaanalytics.io / Admin1234! |

---

## 3. TECHNICAL DECISIONS

| Decision | Choice | Reason |
|----------|--------|--------|
| Base repo | satnaing/shadcn-admin | Most polished shadcn dashboard, 11k stars, MIT, production-ready UI |
| Auth | Supabase Auth | Developer already knows it, free tier, email/password + JWT out of the box |
| Landing page | Inside same Vite project (route `/`) | Single repo, single deploy, simpler architecture |
| Deploy | Render Static Site | Developer already uses Render, free tier, auto-deploy from GitHub |
| CI/CD | GitHub Actions (npm) | Lint + test + build on every push to main |
| Domain | nova-analytics.onrender.com | Free, no extra setup |
| Dashboard data | Mock/hardcoded data | Assignment does not require real data pipeline |
| Backend | None (Supabase handles all auth logic) | No custom API needed |
| Analytics | PostHog (free tier) | Script tag integration in index.html, no backend required |

---

## 4. NOVA ANALYTICS BRAND

| Element | Value |
|---------|-------|
| Company name | Nova Analytics |
| Tagline | "Turn Your Data Into Decisions" |
| Primary color | Indigo/violet — `oklch(0.51 0.24 277)` / `#6366f1` |
| Secondary color | Soft indigo — `oklch(0.95 0.025 277)` |
| Logo | Custom SVG — rising bar chart + nova spark (`src/assets/logo.tsx`) |
| Favicon | Custom SVG — indigo background, white bars, cyan spark (`public/images/`) |
| Sample user | admin@novaanalytics.io / Admin1234! |

---

## 5. PROGRESS TRACKER

### Phase 1 — Setup ✅
- [x] Fork `satnaing/shadcn-admin` to GitHub account
- [x] Clone fork locally
- [x] Run `npm install` and verify project boots on `localhost:5173`
- [x] Create `CLAUDE_CONTEXT.md` in root and commit

### Phase 2 — Supabase Auth ✅
- [x] Create Supabase project for Nova Analytics
- [x] Enable Email/Password auth — email confirmation disabled for frictionless demo
- [x] Create test user: `admin@novaanalytics.io`
- [x] Add Supabase env vars to `.env.local`
- [x] Install `@supabase/supabase-js`
- [x] Create `src/lib/supabase.ts` client
- [x] Wire login form to Supabase (`signInWithPassword`)
- [x] Wire signup form to Supabase (`signUp`)
- [x] Protect dashboard routes (redirect to `/sign-in` if no session)
- [x] Redirect to `/dashboard` on successful login
- [x] Update `auth-store.ts` — replaced mock token with Supabase `Session` type
- [x] Update test suite — rewrote `auth-store.test.ts` and `user-auth-form.test.tsx` for Supabase API
- [x] Update `.env.example` — replaced Clerk key with Supabase vars

### Phase 3 — Whitelabeling ✅
- [x] Replace app name ("shadcn-admin" → "Nova Analytics") everywhere
- [x] Replace favicon — custom SVG in `public/images/` (light + dark mode variants)
- [x] Replace logo — custom analytics SVG in `src/assets/logo.tsx`
- [x] Remove Clerk branding from sidebar nav and all source files
- [x] Remove Pages/demo nav section — sidebar shows only real app routes
- [x] Apply Nova Analytics color palette (`theme.css` — indigo/violet, light + dark)
- [x] Update sidebar header — AppTitle with Nova Analytics logo, name, tagline
- [x] Update nav-user — shows real Supabase user email and initials from session
- [x] Update profile-dropdown — shows real Supabase user data
- [x] Sign out calls `supabase.auth.signOut()` before resetting store
- [x] Update `index.html` — Nova Analytics title, description, OG tags, theme-color #6366f1
- [x] Update `package.json` name to `nova-analytics`
- [x] Update `README.md` — rewritten for Nova Analytics (setup, stack, deploy instructions)
- [x] Full branding audit — 27 references found and corrected across src/, .github/, README
- [x] TypeScript check passed, grep confirmed zero remaining shadcn/Clerk/satnaing strings

### Phase 4 — Landing Page ✅
- [x] Create `/` route — `src/routes/index.tsx` + `src/features/landing/index.tsx` (public, no auth required)
- [x] Move dashboard from `/_authenticated/` → `/_authenticated/dashboard/`
- [x] Build Navbar — smart scroll-aware (transparent → frosted glass on scroll), logo hover scale, shadow transition
- [x] Build Hero section — animated gradient blobs, floating decorative dots, staggered slide-up text, animated gradient headline, "● Live" badge on mock dashboard
- [x] Build animated mock dashboard — bars update every 2s simulating live data, stat cards with hover scale
- [x] Build Stats section — animated counters (0 → real number) triggered by Intersection Observer on scroll
- [x] Build Features section — 6 cards with scroll-triggered staggered reveal, icon hover rotate + color flip
- [x] Build "Why Nova" section — progress bars animate from 0% on scroll, elements slide in from sides
- [x] Build CTA section — animated gradient background, floating decorative circles, button hover scale
- [x] Build Footer — Nova Analytics branding + links
- [x] Responsive on mobile (sm: and md: breakpoints throughout)
- [x] Update sidebar Dashboard link: `/` → `/dashboard`
- [x] Update sign-in/sign-up redirects: `/` → `/dashboard`
- [x] Add "← Back to home" link in auth layout (sign-in, sign-up, forgot-password)
- [x] Remove TopNav (Overview / Customers / Products / Settings) from dashboard header — buttons served no purpose

### Phase 5 — Deploy ✅
- [x] Push final code to GitHub (`FernandoArago/nova-analytics`)
- [x] Create Render Static Site — build: `npm install && npm run build`, publish: `dist`
- [x] Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Render dashboard
- [x] Fix deploy: removed `pnpm-lock.yaml` from repo (Render was forcing pnpm, ignoring build command)
- [x] Add `public/_redirects` for SPA client-side routing on Render
- [x] Live URL confirmed: https://nova-analytics.onrender.com
- [x] HTTPS active (Render provides it automatically)
- [x] Full flow tested: landing → sign-up → sign-in → dashboard → sign-out

### Phase 6 — Extra Credit ✅
- [x] Claude Code prompts documented (Section 7 of this file)
- [x] Development process evidence — this file tracks every decision and step
- [x] CI/CD pipeline — `.github/workflows/ci.yml` runs lint + tests + build on every push to `main` (migrated from pnpm to npm)
- [x] Meaningful tests — auth store, sign-in form, sign-up form, users delete dialog all updated for Supabase API and Nova Analytics domain
- [x] PostHog analytics — script injected via `index.html`, tracks page views automatically
- [x] Dashboard functional improvements — connect/disconnect app integrations, functional chat messages, CSV export from Download button

---

## 6. EXTRA CREDIT EVIDENCE

### 6.1 Development Process & Prompts
All Claude Code prompts are documented verbatim in Section 7. This file itself is the primary
evidence of AI-assisted development — updated after every major step in real time using
Claude Code in the VS Code extension. Every architectural decision is documented with its rationale.

### 6.2 CI/CD Pipeline — GitHub Actions
`.github/workflows/ci.yml` triggers on every push to `main` and every pull request:
- Sets up Node.js 20 with npm cache
- Runs `npm install`
- Runs ESLint (`npm run lint`)
- Runs Prettier check (`npm run format:check`)
- Installs Playwright browsers
- Runs the full Vitest test suite
- Runs `npm run build` (TypeScript compile + Vite bundle)
- Supabase env vars injected via GitHub repository secrets

### 6.3 Meaningful Tests
The base repo included Vitest + Playwright browser tests. The following were updated or added:
- `src/stores/auth-store.test.ts` — rewritten for Supabase `Session` API (4 tests)
- `src/features/auth/sign-in/components/user-auth-form.test.tsx` — mocks `supabase.auth.signInWithPassword`, validates session storage and navigation
- `src/features/auth/sign-up/components/sign-up-form.test.tsx` — form validation tests preserved
- `src/features/users/components/users-delete-dialog.test.tsx` — test data updated to `@novaanalytics.io` domain

### 6.4 Analytics — PostHog
PostHog free cloud tier integrated via script tag in `index.html`:
- Automatically tracks page views and navigation events
- No backend or npm package required for basic tracking
- Can be upgraded to track custom events (`user_signed_in`, `user_signed_up`) via `posthog.capture()`

### 6.5 Dashboard Functional Improvements (Beyond Requirements)
Three non-functional UI areas were made interactive without a backend:
- **App Integrations** — Connect/disconnect buttons toggle state via `useState`, with toast confirmation. Hover on connected apps shows disconnect intent via color change.
- **Chats** — Message input is fully wired: type + Enter or Send button appends messages to local state in real time. Video/phone/attachment buttons show informative "coming soon" toasts.
- **Dashboard Download** — Exports current metrics as a `nova-analytics-dashboard.csv` file via Blob API.

---

## 7. CLAUDE CODE PROMPTS LOG

> All significant prompts used with Claude Code are documented here.
> This section is required for the "share your prompts" extra credit deliverable.
> Format: **[Step]** → Prompt → What it produced.

---

**[Phase 2 — Supabase Auth Integration]**

> Prompt: "Replace the existing mock auth (sleep + fake token) with real Supabase Auth. Install @supabase/supabase-js, create the typed client in src/lib/supabase.ts, replace the Zustand auth store to hold a Supabase Session instead of a cookie-based token, wire signInWithPassword to the login form, signUp to the registration form, and add a beforeLoad route guard on the _authenticated layout that redirects to /sign-in if no active session exists. Update the test suite to mock supabase.auth instead of the old store API. Keep the CLAUDE_CONTEXT.md updated in English after each step."

→ Full Supabase Auth implemented end-to-end:
   - `src/lib/supabase.ts` — typed Supabase client using `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
   - `auth-store.ts` — Zustand store replaced: `accessToken` + cookie logic removed, now holds `Session | null` and `User | null`
   - `user-auth-form.tsx` → `supabase.auth.signInWithPassword`, real error messages from Supabase response
   - `sign-up-form.tsx` → `supabase.auth.signUp`, handles both auto-confirmed and email-confirmation flows
   - `_authenticated/route.tsx` → `beforeLoad` guard: `supabase.auth.getSession()` → redirect if null
   - `auth-store.test.ts` and `user-auth-form.test.tsx` rewritten — mock `@/lib/supabase` directly
   - `.env.example` updated with Supabase vars, Clerk key removed

---

**[Phase 3 — Whitelabeling]**

> Prompt: "Replace all shadcn-admin / Clerk / satnaing branding with Nova Analytics. Specifically: create a custom SVG logo (analytics bar chart + nova spark) in src/assets/logo.tsx, apply an indigo/violet color palette to theme.css (light and dark modes), replace the TeamSwitcher dropdown in the sidebar with a single AppTitle component showing the Nova Analytics brand, update nav-user and profile-dropdown to read email and initials from the live Supabase session, wire supabase.auth.signOut() into the sign-out dialog, and update index.html meta tags and package.json name. Generate SVG favicons for both light and dark mode — no external assets available."

→ Full whitelabel applied across 11 files in one pass.
→ Nova Analytics color palette: `oklch(0.51 0.24 277)` primary (indigo/violet), full light + dark mode.
→ Logo and favicons generated as SVG — no external design assets needed.
→ `supabase.auth.signOut()` called on sign-out before Zustand store reset.
→ TypeScript clean. Zero original branding strings remaining (verified by grep).

---

**[Phase 4 — Public Landing Page]**

> Prompt: "Create a public marketing landing page at route / (no auth required). The dashboard moves to /_authenticated/dashboard. Build: sticky frosted-glass Navbar with logo and sign-in/get-started CTAs; Hero section with gradient headline and a mock dashboard preview built entirely with SVG and CSS (no external images); a 6-card Features grid; a Why Nova section with a checklist and CSS progress bar visual; a CTA section; and a Footer. Make it fully responsive. Update the sidebar Dashboard link and all post-auth redirects from / to /dashboard."

→ `src/features/landing/index.tsx` — 400-line component with 6 sections, all self-contained (no images, no external assets).
→ Mock dashboard preview in Hero: bar chart and line chart rendered with SVG paths and CSS grid — works without any backend data.
→ Route conflict resolved: `_authenticated/index.tsx` deleted; `routes/index.tsx` registered as the new public root.
→ All auth redirects and sidebar links updated to `/dashboard`.

---

**[Pre-deploy — Full Branding Audit]**

> Prompt: "Before deploying, run a complete audit across all file types (.ts, .tsx, .md, .json, .html, .toml, .yaml, .svg) to find any remaining references to the original author (satnaing), original project name (shadcn-admin), Clerk sponsorship, or demo credentials. Report findings grouped by file with line numbers and the required fix for each."

→ Audit run via specialized subagent scanning all file types including `.github/` directory.
→ Found 27 references across 12 files — source code, documentation, GitHub templates, and test fixtures.
→ All 27 corrected: auth layouts, profile dropdown, Clerk route defaults, test data, README rewritten, GitHub templates updated, FUNDING.yml cleared.
→ Final verification: grep returned zero matches. TypeScript check passed.

---

**[Phase 5 — Deploy Debugging]**

> Prompt: "Render is failing with ERR_PNPM_OUTDATED_LOCKFILE even though the build command is set to npm install && npm run build. The pnpm-lock.yaml is out of date because we installed @supabase/supabase-js with npm. Fix the deploy without installing pnpm locally."

→ Identified root cause: Render auto-detects `pnpm-lock.yaml` in the repo and forces pnpm regardless of the build command.
→ Solution: added `pnpm-lock.yaml` to `.gitignore` and removed it from the repo. Render then correctly uses npm.
→ Also added `public/_redirects` with `/* /index.html 200` rule to handle SPA client-side routing on Render.

---

**[Phase 6 — Dashboard Interactivity & Final Polish]**

> Prompt: "Make the non-functional buttons inside the dashboard work without a backend. Specifically: App Integrations connect/disconnect buttons should toggle state and show toast confirmations; the Chat input should send messages and append them to the conversation in real time; attachment/video/phone buttons should show informative toasts; the Dashboard Download button should export the current metrics as a CSV file."

→ Apps: `connectedApps` state (Set) replaces static `connected` flag. Toggle with toast. Hover on connected apps shows disconnect intent via color change.
→ Chats: `messageInput` + `sentMessages` state. Enter key and Send button append to conversation. `useRef` scroll-to-bottom on new message.
→ Dashboard: `handleDownload()` builds a CSV Blob from metric data, triggers download via `URL.createObjectURL`, shows success toast.
→ Auth layout: "← Back to home" link added — appears on sign-in, sign-up, and forgot-password pages.
→ CI workflow migrated from pnpm to npm. README updated with correct URLs, test credentials, and known limitations section.
→ PostHog analytics script added to `index.html`.

---

**[Final Polish — Landing Page Animations & Dashboard Cleanup]**

> Prompt: "Remove the Overview/Customers/Products/Settings top nav buttons from the dashboard header — they serve no purpose. Then enhance the landing page to be more visually impressive with motion and animations, without adding any new npm dependencies."

→ Dashboard `TopNav` removed entirely — import, component usage, and `topNav` data array all deleted.
→ Landing page fully rebuilt with pure CSS keyframe animations and Intersection Observer API:
   - Custom keyframes injected via `<style>` tag: `float`, `pulse-glow`, `slide-up`, `fade-in`, `gradient-x`
   - `useInView` hook (Intersection Observer) triggers reveal animations on scroll for every section
   - `Counter` component animates numbers from 0 to target value on scroll entry
   - Navbar becomes frosted-glass with shadow only after 20px scroll (scroll-aware transition)
   - Hero: 3 pulsing gradient blobs, 6 floating dots, staggered text entry with delays
   - Mock dashboard preview: bars update every 2 seconds simulating live data; "● Live" pulsing badge
   - Stats section: animated counters for 10,000+ users, 99% uptime, 500M+ events, 4ms latency
   - Feature cards: staggered scroll-reveal with `transitionDelay` per index, icon rotate + bg flip on hover
   - Why Nova: progress bars animate width from 0% → value on scroll; list items slide in from left
   - CTA: animated gradient background loop, floating decorative rings
→ Zero new dependencies — all animations use browser-native APIs and CSS.

---

## 8. KEY FILE MAP

```
/
├── src/
│   ├── lib/
│   │   ├── supabase.ts              ← Supabase client
│   │   └── utils.ts                 ← cn(), sleep(), etc.
│   ├── stores/
│   │   └── auth-store.ts            ← Zustand — holds Supabase Session
│   ├── features/
│   │   ├── landing/index.tsx        ← Public landing page (/)
│   │   ├── dashboard/index.tsx      ← Dashboard with CSV export (TopNav removed)
│   │   ├── apps/index.tsx           ← App integrations (connect/disconnect toggle)
│   │   ├── chats/index.tsx          ← Chat with functional message input
│   │   └── auth/
│   │       ├── auth-layout.tsx      ← Auth wrapper with "Back to home" link
│   │       ├── sign-in/components/user-auth-form.tsx   ← signInWithPassword
│   │       └── sign-up/components/sign-up-form.tsx     ← signUp
│   ├── routes/
│   │   ├── index.tsx                ← / landing page (public)
│   │   ├── __root.tsx               ← Root layout
│   │   ├── _authenticated/
│   │   │   ├── route.tsx            ← Session guard (redirects to /sign-in)
│   │   │   └── dashboard/index.tsx  ← /dashboard (protected)
│   │   └── (auth)/
│   │       ├── sign-in.tsx          ← /sign-in
│   │       └── sign-up.tsx          ← /sign-up
│   ├── assets/
│   │   └── logo.tsx                 ← Nova Analytics SVG logo
│   ├── components/layout/
│   │   ├── app-sidebar.tsx          ← Uses AppTitle (no TeamSwitcher)
│   │   ├── app-title.tsx            ← Nova Analytics brand header
│   │   ├── nav-user.tsx             ← Shows Supabase session user
│   │   └── data/sidebar-data.ts     ← Nav items (no Clerk, no demo pages)
│   └── styles/
│       └── theme.css                ← Nova Analytics indigo/violet palette
├── public/
│   ├── images/
│   │   ├── favicon.svg              ← Light mode favicon
│   │   └── favicon_light.svg        ← Dark mode favicon
│   └── _redirects                   ← SPA routing rule for Render
├── .github/workflows/
│   └── ci.yml                       ← GitHub Actions: lint + test + build (npm)
├── .env.local                       ← VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (never commit)
├── .env.example                     ← Template for env vars
├── CLAUDE_CONTEXT.md                ← This file (submission deliverable)
└── README.md                        ← English setup guide + known limitations
```

---

## 9. ENVIRONMENT VARIABLES

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Vite requires the `VITE_` prefix for browser-accessible env vars.
> Never commit `.env.local`. Add these in the Render dashboard under "Environment" when deploying.
> For GitHub Actions CI, add these as repository secrets under Settings → Secrets → Actions.

---

## 10. KNOWN LIMITATIONS

- **Dashboard data is mocked** — charts, metrics, users, tasks, and chats use hardcoded data. A real implementation would connect to Supabase tables or a backend API.
- **App integrations are session-only** — connect/disconnect toggles reset on page refresh. No persistence layer without a backend.
- **Chat messages are session-only** — sent messages live in React state and are lost on refresh.
- **Clerk routes still present** — `src/routes/clerk/` contains the original template's Clerk auth pages. They are unreachable from the UI but were kept to preserve git history clarity.
- **PostHog key is placeholder** — the `phc_placeholder_key` in `index.html` must be replaced with a real PostHog project key to enable actual analytics tracking.

---

