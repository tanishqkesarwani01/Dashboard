# CareerOS: Detailed Engineering Implementation Plan

A comprehensive, phase-by-phase blueprint for building the **CareerOS** full-stack developer operating system.

---

## 1. Project Directory Structure

```
Educational DASHBOARD/
├── client/                     # Frontend Application (React + Vite + TypeScript)
│   ├── public/                 # Static assets, favicon, manifest
│   ├── src/
│   │   ├── app/                # App entry, router, provider wrappers, layout shells
│   │   │   ├── layout/         # AppShell, Sidebar, TopNavbar, CommandPalette
│   │   │   └── routes/         # Wouter / React Router path mappings & lazy loaders
│   │   ├── components/         # Reusable design system (Stitch / Tailwind / Radix)
│   │   │   ├── ui/             # Button, Card, Dialog, Input, Dropdown, Table, Toast, etc.
│   │   │   └── common/          # EmptyState, ErrorBoundary, StatCard, ProgressBar
│   │   ├── features/           # Modular domain-driven features
│   │   │   ├── auth/           # Login, Register, ProtectedRoute, Profile
│   │   │   ├── dsa/            # DSA Tracker, Spaced Repetition engine, ProblemModal
│   │   │   ├── curriculum/     # Web Dev & Core CS subject tracks
│   │   │   ├── habits-logs/    # Daily logs, 365-day Activity Heatmap, Streak counter
│   │   │   ├── projects/       # Portfolio project cards, milestone trackers
│   │   │   ├── custom-modules/ # Notion-style dynamic schema builder & table viewer
│   │   │   ├── ai-copilot/     # AI assistant page & floating copilot drawer
│   │   │   └── analytics/      # Mastery charts, study distribution, progress KPIs
│   │   ├── lib/                # Supabase client, API client, date helpers, cn utility
│   │   ├── stores/             # Zustand stores (useAuthStore, useAppStore, useUIStore)
│   │   ├── types/              # Global TypeScript type definitions
│   │   ├── index.css           # Tailwind directives & Stitch design theme variables
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                     # Backend API (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── config/             # Environment variables, Supabase admin client, Gemini config
│   │   ├── controllers/        # Route controllers (AI controller, Analytics controller)
│   │   ├── middleware/         # Auth verification, rate limiter, error handler, logger
│   │   ├── routes/             # Express route declarations (/api/ai, /api/analytics, /api/health)
│   │   ├── services/           # Gemini AI service, Analytics aggregation service
│   │   ├── types/              # Server-side TypeScript interfaces
│   │   └── app.ts              # Express application configuration
│   ├── src/index.ts            # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── render.yaml             # Render deployment configuration
│
├── supabase/                   # Database Schemas & Migrations
│   ├── migrations/
│   │   └── 001_initial_schema.sql  # Complete tables, RLS policies, triggers, indexes
│   └── seed.sql                # Default DSA topics, Web Dev & Core CS syllabus data
│
├── package.json                # Root package for workspace orchestration
└── README.md                   # Project documentation & architecture diagram
```

---

## 2. Phase-by-Phase Implementation Roadmap

### Phase 1: Workspace Scaffolding & Environment Setup
- **Goal**: Initialize clean root workspace, `client/` and `server/` directories with strict TypeScript, Vite, Tailwind CSS, and dev dependencies.
- **Tasks**:
  1. Initialize root `package.json` with workspace scripts (`npm run dev`, `npm run build`, `npm run typecheck`).
  2. Scaffold `client/` with Vite (React 18/19, TypeScript), install Tailwind CSS, Lucide icons, `@radix-ui` primitives, `@supabase/supabase-js`, `zustand`, `@tanstack/react-query`, `wouter`, `sonner`, `clsx`, `tailwind-merge`.
  3. Scaffold `server/` with Express, TypeScript, `cors`, `dotenv`, `@supabase/supabase-js`, `@google/genai`, `zod`, `express-rate-limit`.
  4. Create `.env.example` templates in both `client/` and `server/`.
- **Verification**: Run `npm run typecheck` and test both client and server boot cleanly.

---

### Phase 2: Supabase Database Schema, RLS & Seed Data
- **Goal**: Define the production PostgreSQL schema with Row-Level Security (RLS) policies and seed datasets.
- **Tasks**:
  1. Write `supabase/migrations/001_initial_schema.sql`:
     - `profiles` table linked to Supabase `auth.users` with automated profile creation trigger.
     - `dsa_topics` & `dsa_problems` tables with indexed revision columns.
     - `curriculum_tracks` & `curriculum_items` tables.
     - `daily_logs` table with unique constraint on `(user_id, date)`.
     - `projects` table with `tech_stack` array and JSONB `milestones`.
     - `custom_modules` and `custom_records` tables with JSONB schemas.
     - `ai_chat_sessions` and `ai_messages` tables.
     - Apply Row Level Security (RLS) `auth.uid() = user_id` on all tables.
  2. Write `supabase/seed.sql` with rich default curricula:
     - 15 DSA topics (Two Pointers, Slidinig Window, Binary Trees, Graphs, DP, etc.).
     - Complete Web Development roadmap (HTML, CSS, JS, React, Node, Express, SQL).
     - Complete Core CS syllabi (Operating Systems, DBMS, Computer Networks, System Design).
- **Verification**: Verify SQL syntax, foreign key constraints, and RLS rules.

---

### Phase 3: Authentication & Protected App Shell (Stitch UI Theme)
- **Goal**: Build bulletproof Supabase Auth flow, session management, and responsive App Shell.
- **Tasks**:
  1. **Supabase Client & Auth Store**: Set up `client/src/lib/supabase.ts` and `client/src/stores/useAuthStore.ts`.
  2. **Auth UI**: Modern Sign In, Sign Up, and Forgot Password pages with responsive cards, loading spinners, and error alerts.
  3. **App Shell**:
     - Modern dark-themed Sidebar with collapsible state, active route indicator, user profile chip.
     - Top Navigation with search trigger, date badge, quick-action "+ New" dropdown, and logout.
     - Global Command Palette (`Ctrl+K`) for jumping to any track, problem, or project in 1 keystroke.
  4. **Protected Route Wrapper**: Seamless redirection for unauthenticated visitors.
- **Verification**: Test sign-up, sign-in, token refresh, and protected page transitions.

---

### Phase 4: DSA Tracker & Spaced Repetition Engine
- **Goal**: Deliver a comprehensive algorithmic problem tracker with automatic revision scheduling.
- **Tasks**:
  1. **DSA Store & Queries**: TanStack Query hooks for fetching, adding, editing, and deleting DSA problems.
  2. **Spaced Repetition Logic**:
     - Intervals: 1 Day, 3 Days, 7 Days, 14 Days, 30 Days.
     - Automatically compute `next_revision_at` on problem solve or revision log.
  3. **DSA Dashboard UI**:
     - Summary KPIs: Total Solved, Easy/Medium/Hard breakdown, Mastered count.
     - "Due for Revision Today" action banner.
     - Topic Accordion with progress bars and "+ Add Problem" modal.
     - Problem Table with filtering by difficulty, platform, and confidence level.
- **Verification**: Add problems across difficulty tiers, trigger revision dates, and test filtering.

---

### Phase 5: Daily Study Logs & 365-Day Activity Heatmap
- **Goal**: Deliver a habit-tracking system with GitHub-style visual consistency heatmaps.
- **Tasks**:
  1. **Daily Log Modal / Drawer**: Form to log study hours (split by DSA, Dev, Core CS), problem count, and daily summary notes.
  2. **Activity Heatmap Component**: Custom responsive SVG heatmap rendering 52 weeks of activity squares colored by study hours.
  3. **Streak Calculation**: Real-time calculation of current active streak and longest streak based on `daily_logs` dates.
  4. **Weekly Target Widget**: Visual circular/bar progress towards weekly study hour goals.
- **Verification**: Log mock days, verify streak incrementing/decrementing, and check heatmap tooltips.

---

### Phase 6: Curriculum Tracks & Project Portfolio Hub
- **Goal**: Implement structured tech roadmaps and project milestone tracking.
- **Tasks**:
  1. **Curriculum Track View**:
     - Tabbed navigation between Web Development, Core CS (OS, DBMS, CN), and Languages.
     - Checklist items with expandable explanation notes, resource links, and status toggles.
     - Overall progress computation with real-time percentage indicators.
  2. **Projects Hub**:
     - Grid of project cards with status badges (Planning, In Progress, Completed).
     - Milestone checklist with progress bar.
     - Tech stack badges, GitHub repo link, and live deployment button.
     - Project Detail modal with architecture notes editor.
- **Verification**: Test updating curriculum items, creating projects, adding milestones, and calculating completion %.

---

### Phase 7: Notion-Style Extensible Custom Module Engine
- **Goal**: Allow users to create custom databases with flexible typed schemas.
- **Tasks**:
  1. **Schema Builder**: Define columns with types: `text`, `number`, `select`, `date`, `checkbox`, `url`.
  2. **Custom Table Viewer**: Dynamic table rendering based on module schema with inline cell editing, sorting, and row deletion.
  3. **Templates**: One-click module creation from pre-made templates (e.g., "Job Applications Tracker", "System Design Notes", "LeetCode Contest Log").
  4. **Sidebar Integration**: Dynamically list user's custom modules with custom icons in the sidebar.
- **Verification**: Create a custom module with 5 diverse field types, insert 3 records, edit inline, and verify JSONB persistence.

---

### Phase 8: AI Career Copilot (Google Gemini API Backend)
- **Goal**: Secure backend proxy communicating with Gemini API for contextual coding & career assistance.
- **Tasks**:
  1. **Express Server Route**: `POST /api/ai/chat` with Supabase JWT validation and rate limiting.
  2. **Gemini Service with Specialized Personas**:
     - *DSA Socratic Mode*: Hint progression without full code answers.
     - *Mock Interviewer*: Q&A for OS, DBMS, System Design with grading feedback.
     - *Resume Bullet Generator*: Quantified impact bullets from project descriptions.
  3. **Frontend AI Workspace & Floating Drawer**:
     - Markdown code rendering with syntax highlighting and copy button.
     - Preset prompt chips ("Explain DP state transition", "Conduct a mock interview on DBMS Indexing").
- **Verification**: Test API calls to `/api/ai/chat`, verify token authentication, and evaluate AI response quality.

---

### Phase 9: Testing, Optimization, Render & Vercel Deployment
- **Goal**: Production readiness, automated checks, and live cloud deployment.
- **Tasks**:
  1. Build checks: `npm run build` for both client and server.
  2. Backend Deployment on **Render**: Configure `render.yaml` or Web Service with environment variables (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, `PORT`).
  3. Frontend Deployment on **Vercel / Render**: Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_URL`.
  4. Write comprehensive `README.md` with architecture diagrams, setup instructions, and resume talking points.
- **Verification**: Live URL health check and end-to-end user workflow test.

---

## 3. Verification Plan

### Automated Checks
- Type safety: `npm run typecheck` across `client` and `server`.
- API health check: `curl http://localhost:5000/api/health` $\rightarrow$ `{ "status": "healthy" }`.

### Manual End-to-End Checklist
- [ ] Sign up new user $\rightarrow$ confirm automatic profile creation in Supabase.
- [ ] Add DSA problem $\rightarrow$ verify next revision schedule calculation.
- [ ] Fill daily study log $\rightarrow$ verify streak and heatmap update.
- [ ] Toggle curriculum topics $\rightarrow$ verify track progress percentage updates.
- [ ] Create custom module with custom columns $\rightarrow$ verify dynamic table view.
- [ ] Send prompt to AI Copilot $\rightarrow$ verify streamed or formatted Gemini response.
