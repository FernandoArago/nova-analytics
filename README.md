# Nova Analytics

A modern analytics dashboard built with React, Vite, shadcn/ui, and Supabase Auth. Deployed on Render.

## Live Demo

- **URL:** https://nova-analytics.onrender.com
- **Test credentials:** `admin@novaanalytics.io` / `Admin1234!`

## Features

- Public landing page with product overview
- Supabase email/password authentication (sign up, sign in, sign out)
- Protected dashboard routes — unauthenticated users are redirected to sign in
- Dashboard with charts, tasks, users, apps, chats, and settings pages
- App integrations with connect/disconnect toggle
- Functional chat with real-time message state
- Dashboard CSV export
- Light/dark mode
- Fully responsive (mobile + desktop)
- Nova Analytics branding (indigo/violet color palette)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Routing | TanStack Router v1 (file-based) |
| Data fetching | TanStack Query v5 |
| UI | shadcn/ui + Radix UI + Tailwind CSS v4 |
| State | Zustand v5 |
| Forms | React Hook Form + Zod v4 |
| Auth | Supabase Auth (email/password) |
| Charts | Recharts v3 |
| Testing | Vitest + Playwright |
| Deploy | Render Static Site |
| CI | GitHub Actions |

## Getting Started Locally

### 1. Clone the repo

```bash
git clone https://github.com/FernandoArago/nova-analytics.git
cd nova-analytics
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project: **Settings → API → Project URL & anon key**.

> Never commit `.env.local` to the repository.

### 4. Run the dev server

```bash
npm run dev
```

Visit `http://localhost:5173`.

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Authentication → Providers → Email** and disable "Confirm email" for instant sign-up
3. Create a test user at **Authentication → Users**
4. Copy the **Project URL** and **anon public key** to `.env.local`

## Deployment (Render)

1. Push the repo to GitHub
2. Create a new **Static Site** on [render.com](https://render.com)
3. Set build command: `npm install && npm run build`
4. Set publish directory: `dist`
5. Add environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
6. Deploy — Render auto-deploys on every push to `main`

## CI/CD

GitHub Actions runs on every push to `main`:
- Installs dependencies
- Lints and format-checks the code
- Runs the test suite
- Builds the project

Secrets required in GitHub repository settings: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.

## Project Structure

```
src/
├── features/
│   ├── landing/        ← Public landing page
│   ├── auth/           ← Sign in, sign up, forgot password
│   ├── dashboard/      ← Main dashboard with CSV export
│   ├── users/          ← User management (full CRUD)
│   ├── tasks/          ← Task list (full CRUD)
│   ├── apps/           ← App integrations (connect/disconnect)
│   ├── chats/          ← Chat UI with message state
│   └── settings/       ← Account, appearance, notifications
├── routes/
│   ├── index.tsx           ← / (landing page, public)
│   ├── _authenticated/     ← Protected layout (Supabase session guard)
│   │   └── dashboard/      ← /dashboard
│   └── (auth)/             ← /sign-in, /sign-up
├── lib/
│   └── supabase.ts     ← Supabase client
└── stores/
    └── auth-store.ts   ← Zustand auth state (Supabase Session)
```

## Known Limitations

- **Dashboard data is mocked** — charts, metrics, users, tasks, and chats use hardcoded data. A real implementation would connect to a backend API or Supabase tables.
- **App integrations are local state only** — connect/disconnect toggles reset on page refresh. No persistence layer.
- **Chat messages are session-only** — sent messages exist in React state and are lost on refresh.
- **Clerk routes still present** — `src/routes/clerk/` contains the original template's Clerk auth pages. They are unreachable from the UI but not removed to preserve git history clarity.

## Base Project

This project is a whitelabel fork of [satnaing/shadcn-admin](https://github.com/satnaing/shadcn-admin) (MIT License), customized for Nova Analytics as a trial assignment for Dot Com Media.

## License

MIT
