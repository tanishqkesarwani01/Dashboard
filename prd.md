# Product Requirements Document (PRD): CareerOS

---

## 1. Executive Summary & Vision

**CareerOS** is an all-in-one personal operating system and career accelerator tailored for software engineering students, self-taught developers, and tech job seekers. It unites structured curriculum mastery, algorithmic problem-solving with spaced repetition, daily habit tracking with GitHub-style visual heatmaps, project portfolio management, extensible custom modules (Notion-style), and an embedded AI Career Copilot powered by Google Gemini.

### 1.1 Problem Statement
- **Fragmented Tooling**: Aspiring engineers scatter their study journey across LeetCode, Notion, GitHub, Excel sheets, and to-do apps, leading to fragmented context and lost momentum.
- **Lack of Spaced Repetition in DSA**: Students solve hundreds of problems but forget key patterns within weeks due to the absence of scheduled revision triggers.
- **Inconsistent Daily Habits**: Without visual accountability (streaks, study heatmaps, daily logs), motivation wanes during prolonged interview prep cycles.
- **Rigid Tracking Tools**: Pre-built trackers rarely adapt when a learner wants to study niche topics (e.g., Rust, Web3, DevOps) without creating messy spreadsheets.

### 1.2 Value Proposition & Resume Impact
- A centralized, responsive, keyboard-driven developer dashboard.
- Demonstrates advanced full-stack proficiency: PostgreSQL schemas with Row-Level Security (RLS), custom dynamic JSON schema engines, secure backend proxy, AI integration, and state-of-the-art UI/UX.

---

## 2. User Personas & Core Journeys

```
 ┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
 │  Persona A: The CS Undergrad         │     │  Persona B: The Self-Taught Dev      │
 ├──────────────────────────────────────┤     ├──────────────────────────────────────┤
 │ • Goal: Crack top-tier campus hiring │     │ • Goal: Break into tech / switch job │
 │ • Pain: Juggling DSA, OS/DBMS, Dev   │     │ • Pain: Overwhelmed by massive road- │
 │ • Key Need: Spaced repetition DSA +  │     │   maps & keeping daily consistency   │
 │   Core CS trackers + Mock interview  │     │ • Key Need: Clear curriculum tracks +│
 │   copilot                            │     │   project showcase + daily heatmap   │
 └──────────────────────────────────────┘     └──────────────────────────────────────┘
```

### Core User Journey
1. **Onboarding & Auth**: User signs up via Supabase Auth (Email or GitHub OAuth), selects their target roles (e.g., Full-Stack Engineer, Backend Engineer), and initializes default study tracks.
2. **Daily Execution Cycle**:
   - Check Dashboard $\rightarrow$ View spaced repetition reviews due today.
   - Solve DSA problem $\rightarrow$ Log difficulty, time taken, revision interval.
   - Study Web Dev / Core CS track $\rightarrow$ Mark items completed, add notes.
   - Fill Daily Study Log $\rightarrow$ Increment streak, update GitHub-style heatmap.
3. **Deepening & Portfolio**:
   - Manage side projects $\rightarrow$ Log tech stack, development milestones, live demo links.
   - Build Custom Modules $\rightarrow$ Create custom databases (e.g., "System Design Case Studies" or "Company Applications").
4. **AI Assistance**:
   - Ask AI Copilot for algorithmic hints without spoiling solutions, conduct mock technical interviews, or generate weekly study plans.

---

## 3. Detailed Functional Requirements

### 3.1 Authentication & Profile Management
- **Supabase Authentication**: Secure email/password login, GitHub OAuth, token refresh, and persistent sessions.
- **User Profile**: Custom avatar, target job roles, bio, social links (GitHub, LinkedIn, LeetCode, Portfolio), and timezone.
- **Preferences**: Theme selection (Tokyo Night Dark / Modern Clean), notification settings, default landing view.

### 3.2 DSA Tracker & Spaced Repetition Engine
- **Hierarchical Syllabus**: Structured DSA topics (Arrays, Two Pointers, Trees, Graphs, DP, Backtracking, Tries, etc.).
- **Problem Logging**: Track problem title, platform (LeetCode, GFG, Codeforces, HackerRank), difficulty (Easy, Medium, Hard), problem URL, and personal notes/solution approach.
- **Spaced Repetition Algorithm**:
  - Automatically calculates next review date based on selected confidence interval ($1\text{ day} \rightarrow 3\text{ days} \rightarrow 7\text{ days} \rightarrow 14\text{ days} \rightarrow 30\text{ days}$).
  - "Reviews Due Today" badge and dedicated revision queue on the dashboard.
- **Metrics**: Total solved, difficulty breakdown bar, topic completion percentages.

### 3.3 Structured Curriculum Tracks (Web Dev & Core CS)
- **Pre-loaded Curriculums**:
  - *Full-Stack*: HTML5, CSS3, JavaScript (ES6+), React.js, Node.js, Express.js, PostgreSQL.
  - *Core Computer Science*: Operating Systems, Database Management Systems (DBMS), Computer Networks, System Design Fundamentals, Object-Oriented Programming (OOPs).
- **Interactive Checklist**: Multi-level subtopics, status toggles (Not Started, In Progress, Completed), external resource links, and code snippet notes.
- **Progress Tracking**: Dynamic progress bars per subject and overall track mastery score.

### 3.4 Habits, Daily Logs & Activity Heatmap
- **Daily Study Log**:
  - Date picker, total study hours, topics covered, qualitative notes on wins/blockers.
  - Categorized time distribution (e.g., 2h DSA, 3h Web Dev, 1h Core CS).
- **Interactive Activity Heatmap**:
  - 365-day SVG/Canvas commit-style heatmap colored by daily study intensity.
  - Streak tracking: Current continuous streak, longest streak, total active study days.
- **Weekly Retrospectives**: Weekly summary widget for setting weekly goals and reviewing completed tasks.

### 3.5 Projects & Portfolio Command Center
- **Project Cards**: Title, tagline, description, tech stack tags (e.g., React, TypeScript, Node.js, Supabase), GitHub repo link, live deployment link, status badge (Planning, In Progress, Live, Archived).
- **Milestone Checklists**: Subtasks/milestones for each project (e.g., "DB Schema Design", "Auth Flow", "Deployment").
- **Architecture Notes**: Markdown-supported field to document architecture decisions and trade-offs.

### 3.6 Notion-Style Extensible Custom Module Engine
- **Custom Entities**: Users can create custom modules (e.g., "Internship Applications", "DevOps Tools", "Book Notes").
- **Dynamic Schema Builder**: Custom fields with strong typing:
  - Text / Multiline Text
  - Number / Currency
  - Select / Status / Dropdown (with custom color tags)
  - Multi-Select
  - Date
  - Checkbox / Boolean
  - URL / Link
- **Views**: Interactive Sortable & Filterable Table view with instant column editing and record deletion/cloning.
- **Module Management**: Pinning, archiving, moving to trash, soft delete, and duplicate template capability.

### 3.7 AI Career Copilot & Mock Interviewer (Google Gemini)
- **Interactive Chat Interface**: Dedicated full-page AI workspace + Floating Assistant drawer accessible anywhere in the app.
- **Preset Context Modes**:
  1. *DSA Socratic Hint Mode*: Provides hints, time/space complexity analysis, and edge-case clues without giving away the direct code.
  2. *Mock Technical Interviewer*: Conducts structured Q&A on Core CS (OS, DBMS, CN) or System Design based on user's selected topic.
  3. *Resume & Project Pitch Review*: Analyzes project descriptions and generates bullet points formatted for tech resumes.
  4. *Study Planner*: Generates tailored 30-day or 60-day roadmaps based on weak areas.
- **Prompt Guardrails & Markdown Rendering**: Rich syntax highlighting for code blocks and math rendering for complexity analysis.

### 3.8 Analytics & Progress Dashboard
- **Aggregate KPIs**: Total problems solved, study hours this week, active streak, curriculum completion %.
- **Visual Charts**:
  - Topic mastery radar chart or horizontal bar charts.
  - Weekly study time distribution (Bar Chart).
  - DSA Difficulty distribution (Donut Chart).
- **Spaced Repetition Alert Widget**: Instant list of cards due for review today.

---

## 4. Technical Architecture & Component Interaction

```
┌───────────────────────────────────────────────────────────────────────────┐
│                           Client (React + Vite SPA)                       │
│ ┌───────────────────────────────────────────────────────────────────────┐ │
│ │  App Shell: Sidebar, TopNav, Global Command Palette (Ctrl+K), Toaster  │ │
│ ├───────────────────────────────────────────────────────────────────────┤ │
│ │  Feature Modules: DSA Tracker | Curriculum | Daily Logs | Projects   │ │
│ │                   Custom Module Engine | AI Copilot | Analytics       │ │
│ ├───────────────────────────────────────────────────────────────────────┤ │
│ │  State: Zustand Stores (Auth, App, UI) + TanStack Query (Server State) │ │
│ └───────────────────────────────────┬───────────────────────────────────┘ │
└─────────────────────────────────────┼─────────────────────────────────────┘
                                      │
               ┌──────────────────────┴──────────────────────┐
               ▼                                             ▼
┌───────────────────────────────┐             ┌───────────────────────────────┐
│     Supabase Cloud Engine     │             │    Node/Express Backend API   │
│  (Database & Authentication)  │             │      (Deployed on Render)     │
│ ┌───────────────────────────┐ │             │ ┌───────────────────────────┐ │
│ │ PostgreSQL Database with  │ │             │ │ Secure API Routes:        │ │
│ │ Row Level Security (RLS)  │ │             │ │ • /api/ai/chat (Gemini)   │ │
│ ├───────────────────────────┤ │             │ │ • /api/analytics/summary  │ │
│ │ Supabase Auth (JWT/OAuth) │ │             │ │ • /api/health             │ │
│ ├───────────────────────────┤ │             │ ├───────────────────────────┤ │
│ │ Realtime / Storage API    │ │             │ │ Middleware: Auth verify,  │ │
│ └───────────────────────────┘ │             │ │ Rate limiter, CORS, Logger│ │
└───────────────────────────────┘             └───────────────────────────────┘
```

---

## 5. Database Schema & Entity Relationships (ERD)

### 5.1 Tables & Relations

1. **`profiles`**:
   - `id` (UUID, PK, references `auth.users`)
   - `email` (TEXT, unique)
   - `full_name` (TEXT)
   - `avatar_url` (TEXT)
   - `target_role` (TEXT)
   - `bio` (TEXT)
   - `github_url` (TEXT), `linkedin_url` (TEXT), `leetcode_url` (TEXT)
   - `created_at` (TIMESTAMP), `updated_at` (TIMESTAMP)

2. **`dsa_topics`**:
   - `id` (UUID, PK)
   - `user_id` (UUID, FK $\rightarrow$ `profiles.id`)
   - `name` (TEXT) - e.g., "Binary Search", "Dynamic Programming"
   - `category` (TEXT) - e.g., "Data Structures", "Algorithms"
   - `order_index` (INT)

3. **`dsa_problems`**:
   - `id` (UUID, PK)
   - `user_id` (UUID, FK $\rightarrow$ `profiles.id`)
   - `topic_id` (UUID, FK $\rightarrow$ `dsa_topics.id`)
   - `title` (TEXT)
   - `url` (TEXT)
   - `platform` (TEXT) - "LeetCode", "GFG", "Codeforces", etc.
   - `difficulty` (TEXT) - "Easy", "Medium", "Hard"
   - `status` (TEXT) - "Todo", "Solved", "Mastered"
   - `notes` (TEXT)
   - `confidence_score` (INT) - 1 to 5
   - `next_revision_at` (TIMESTAMP)
   - `revision_count` (INT, default 0)
   - `solved_at` (TIMESTAMP)

4. **`curriculum_tracks`**:
   - `id` (UUID, PK)
   - `user_id` (UUID, FK $\rightarrow$ `profiles.id`)
   - `title` (TEXT) - "Web Development", "Operating Systems", etc.
   - `category` (TEXT) - "Skill Track" | "Core CS"
   - `icon` (TEXT)
   - `color` (TEXT)

5. **`curriculum_items`**:
   - `id` (UUID, PK)
   - `track_id` (UUID, FK $\rightarrow$ `curriculum_tracks.id`)
   - `user_id` (UUID, FK $\rightarrow$ `profiles.id`)
   - `title` (TEXT)
   - `description` (TEXT)
   - `status` (TEXT) - "Not Started" | "In Progress" | "Completed"
   - `notes` (TEXT)
   - `resource_url` (TEXT)
   - `order_index` (INT)

6. **`daily_logs`**:
   - `id` (UUID, PK)
   - `user_id` (UUID, FK $\rightarrow$ `profiles.id`)
   - `date` (DATE, unique per user)
   - `total_hours` (FLOAT)
   - `dsa_hours` (FLOAT)
   - `dev_hours` (FLOAT)
   - `core_cs_hours` (FLOAT)
   - `problems_solved_count` (INT)
   - `summary` (TEXT)
   - `mood_or_rating` (INT) - 1 to 5

7. **`projects`**:
   - `id` (UUID, PK)
   - `user_id` (UUID, FK $\rightarrow$ `profiles.id`)
   - `title` (TEXT)
   - `tagline` (TEXT)
   - `description` (TEXT)
   - `tech_stack` (TEXT[]) - Array of tags
   - `github_url` (TEXT)
   - `live_url` (TEXT)
   - `status` (TEXT) - "Planning" | "In Progress" | "Completed"
   - `milestones` (JSONB)
   - `architecture_notes` (TEXT)

8. **`custom_modules` & `custom_records`**:
   - `custom_modules`: `id` (UUID), `user_id` (UUID), `name` (TEXT), `icon` (TEXT), `color` (TEXT), `description` (TEXT), `schema_definition` (JSONB), `is_pinned` (BOOLEAN), `is_archived` (BOOLEAN).
   - `custom_records`: `id` (UUID), `module_id` (UUID, FK), `user_id` (UUID), `data` (JSONB), `created_at`, `updated_at`.

9. **`ai_chat_sessions` & `ai_messages`**:
   - `ai_chat_sessions`: `id` (UUID), `user_id` (UUID), `title` (TEXT), `mode` (TEXT), `created_at`.
   - `ai_messages`: `id` (UUID), `session_id` (UUID), `role` (TEXT: "user" | "model"), `content` (TEXT), `created_at`.

---

## 6. Non-Functional Requirements

| Category | Requirement | Implementation Strategy |
|---|---|---|
| **Security & Privacy** | Strict user isolation; no user can view or alter another's data | PostgreSQL Row Level Security (RLS) policies on all tables keyed to `auth.uid()` |
| **API Protection** | Protect AI endpoints and prevent abuse / rate limits | Express backend validates Supabase JWTs + express-rate-limit |
| **Performance** | Instant UI responsiveness (<100ms transitions) | Client-side optimistic updates with TanStack Query and Zustand caching |
| **Accessibility (a11y)** | Accessible navigation, WCAG AA compliance | Radix UI primitives, proper ARIA labels, full keyboard shortcut support (`Ctrl+K`) |
| **Code Quality** | Zero TypeScript compilation errors, strict types | `strict: true` in `tsconfig.json`, ESLint, modular domain folder structure |

---

## 7. Success Metrics & Resume Interview Talking Points

1. **Architectural Separation**: Clean multi-tier architecture isolating client-side state, serverless database with RLS, and secure proxy backend.
2. **Advanced Database Design**: Normalized PostgreSQL relational schema with JSONB columns for the dynamic custom module engine.
3. **Spaced Repetition Algorithm**: Implementation of interval-based memory retention logic with scheduled notifications.
4. **GenAI Integration**: Enterprise-grade Google Gemini API prompt engineering for Socratic coding assistance without solution leakage.
5. **Developer Experience**: Modern monorepo layout, full type safety, and zero bloat.
