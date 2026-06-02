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
| Fork URL | https://github.com/AragonRogelio/nova-analytics |
| Local path | C:\Users\ferna\Desktop\CD\nova-analytics |

---

## 3. TECHNICAL DECISIONS

| Decision | Choice | Reason |
|----------|--------|--------|
| Base repo | satnaing/shadcn-admin | Most polished shadcn dashboard, 11k stars, MIT, production-ready UI |
| Auth | Supabase Auth | Developer already knows it, free tier, email/password + JWT out of the box |
| Landing page | Inside same Vite project (route `/`) | Single repo, single deploy, simpler architecture |
| Deploy | Render Static Site | Developer already uses Render, free tier, auto-deploy from GitHub |
| CI/CD | GitHub Actions → Render deploy hook | Auto-deploy on push to main |
| Domain | novaanalytics.onrender.com | Free, no extra setup |
| Dashboard data | Mock/hardcoded data | Assignment does not require real data pipeline |
| Backend | None (Supabase handles all auth logic) | No custom API needed |
| Analytics | PostHog (free tier) | Simple script tag integration, no backend required |

---

## 4. NOVA ANALYTICS BRAND

| Element | Value |
|---------|-------|
| Company name | Nova Analytics |
| Tagline | "Turn Your Data Into Decisions" |
| Primary color | Indigo/violet — `oklch(0.51 0.24 277)` / `#6366f1` |
| Secondary color | Soft indigo — `oklch(0.95 0.025 277)` |
| Logo | Custom SVG — rising bar chart + nova spark (src/assets/logo.tsx) |
| Favicon | Custom SVG — indigo background, white bars, cyan spark (public/images/) |
| Sample user email | admin@novaanalytics.io |

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
- [x] Build Navbar — sticky, frosted-glass backdrop, logo, nav links, Sign In + Get Started
- [x] Build Hero section — headline, subheadline, dual CTA, mock dashboard preview (pure SVG/CSS)
- [x] Build Features section — 6 feature cards with hover animations
- [x] Build "Why Nova" section — checklist + progress bar visual
- [x] Build CTA section — gradient card, "Create Free Account" → `/sign-up`
- [x] Build Footer — Nova Analytics branding + links
- [x] Responsive on mobile (sm: and md: breakpoints throughout)
- [x] Update sidebar Dashboard link: `/` → `/dashboard`
- [x] Update sign-in/sign-up redirects: `/` → `/dashboard`

### Phase 5 — Deploy
- [ ] Push final code to GitHub
- [ ] Create Render Static Site — build: `npm run build`, publish: `dist`
- [ ] Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Render dashboard
- [ ] Verify live URL: `novaanalytics.onrender.com`
- [ ] Verify HTTPS active
- [ ] Test full flow: landing → sign-up → sign-in → dashboard → sign-out

---

## 6. EXTRA CREDIT PLAN & EVIDENCE

### 6.1 Share Development Process & Prompts
All Claude Code prompts are documented in Section 7. This file itself is the evidence of the
AI-assisted development process — it was updated after every major step using Claude Code in
the VS Code extension.

### 6.2 CI/CD Pipeline — GitHub Actions
A `.github/workflows/deploy.yml` will trigger on every push to `main`:
- Runs `npm run build` (fails fast if TypeScript or build errors exist)
- On success, hits the Render deploy hook via `curl`
- Render provides a webhook URL per Static Site service

### 6.3 Meaningful Tests
The base repo included Vitest + Playwright browser tests. Updated tests:
- `src/stores/auth-store.test.ts` — rewritten for Supabase Session API
- `src/features/auth/sign-in/components/user-auth-form.test.tsx` — mocks `supabase.auth.signInWithPassword`, validates navigation and session storage
- `src/features/auth/sign-up/components/sign-up-form.test.tsx` — existing form validation tests preserved
- `src/features/users/components/users-delete-dialog.test.tsx` — updated test data to Nova Analytics domain

### 6.4 Analytics — PostHog
PostHog free cloud tier to be added via script in `index.html`:
- Tracks page views automatically
- Custom events: `user_signed_in`, `user_signed_up`

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

> Prompt: "Create a public marketing landing page at route / (no auth required). The dashboard moves to /authenticated/dashboard. Build: sticky frosted-glass Navbar with logo and sign-in/get-started CTAs; Hero section with gradient headline and a mock dashboard preview built entirely with SVG and CSS (no external images); a 6-card Features grid; a Why Nova section with a checklist and CSS progress bar visual; a CTA section; and a Footer. Make it fully responsive. Update the sidebar Dashboard link and all post-auth redirects from / to /dashboard."

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
│   │   └── auth/
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
├── public/images/
│   ├── favicon.svg                  ← Light mode favicon (indigo bg, white bars)
│   └── favicon_light.svg            ← Dark mode favicon (dark bg, violet bars)
├── .env.local                       ← VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (never commit)
├── .env.example                     ← Template for env vars
├── # CLAUDE_CONTEXT.md.txt          ← This file
└── README.md                        ← English setup guide for submission
```

---

## 9. ENVIRONMENT VARIABLES

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Vite requires the `VITE_` prefix for browser-accessible env vars.
> Never commit `.env.local`. Add these in the Render dashboard under "Environment" when deploying.

---

## 10. KNOWN ISSUES / NOTES

- `netlify.toml` from the original template still exists — deploy target is Render, not Netlify. Safe to ignore.
- Clerk routes (`src/routes/clerk/`) still exist but are unreachable from the UI — they were part of the original template and do not affect the app.
- The `public/images/shadcn-admin.png` file (original screenshot) still exists in `/public` but is not referenced anywhere in the app.

---

*This file is intentionally written in English as it forms part of the submission deliverables.*
