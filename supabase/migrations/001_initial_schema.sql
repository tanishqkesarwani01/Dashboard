-- ========================================================================
-- CareerOS: Complete PostgreSQL Database Schema & Security Architecture
-- ========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Linked to Supabase auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  target_role text default 'Software Engineer',
  bio text,
  github_url text,
  linkedin_url text,
  leetcode_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Automated Profile Creation Trigger on Sign Up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. DSA Topics Table
create table if not exists public.dsa_topics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  category text not null, -- 'Data Structures' | 'Algorithms'
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- 3. DSA Problems Table (With Spaced Repetition Logic)
create table if not exists public.dsa_problems (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  topic_id uuid references public.dsa_topics(id) on delete cascade not null,
  title text not null,
  url text,
  platform text not null default 'LeetCode', -- 'LeetCode', 'GeeksforGeeks', 'Codeforces', 'Other'
  difficulty text not null default 'Medium', -- 'Easy', 'Medium', 'Hard'
  status text not null default 'Todo', -- 'Todo', 'Solved', 'Mastered'
  notes text,
  confidence_score integer default 3, -- 1 to 5
  next_revision_at date,
  revision_count integer default 0,
  solved_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- 4. Curriculum Tracks (Web Dev, Core CS, Languages)
create table if not exists public.curriculum_tracks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  category text not null, -- 'Skill Track' | 'Core CS' | 'Language'
  icon text default 'BookOpen',
  color text default 'blue',
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- 5. Curriculum Items / Subtopics
create table if not exists public.curriculum_items (
  id uuid primary key default gen_random_uuid(),
  track_id uuid references public.curriculum_tracks(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  status text not null default 'Not Started', -- 'Not Started', 'In Progress', 'Completed'
  notes text,
  resource_url text,
  order_index integer default 0,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- 6. Daily Study Logs & Consistency (Unique per user + date)
create table if not exists public.daily_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  total_hours numeric(4, 2) not null default 0,
  dsa_hours numeric(4, 2) default 0,
  dev_hours numeric(4, 2) default 0,
  core_cs_hours numeric(4, 2) default 0,
  problems_solved_count integer default 0,
  summary text,
  mood_or_rating integer default 5, -- 1 to 5
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, date)
);


-- 7. Projects & Portfolio Hub
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  tagline text,
  description text,
  tech_stack text[] default '{}',
  github_url text,
  live_url text,
  status text default 'In Progress', -- 'Planning', 'In Progress', 'Completed', 'Archived'
  milestones jsonb default '[]'::jsonb,
  architecture_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- 8. Custom Modules Engine (Notion-Style Dynamic Schemas)
create table if not exists public.custom_modules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  icon text default 'Database',
  color text default 'blue',
  description text,
  schema jsonb not null default '[]'::jsonb,
  is_pinned boolean default false,
  is_archived boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- 9. Custom Records (Dynamic JSONB table rows)
create table if not exists public.custom_records (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references public.custom_modules(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- 10. AI Chat Sessions & Messages
create table if not exists public.ai_chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null default 'New Conversation',
  mode text default 'socratic', -- 'socratic', 'mock-interview', 'resume-review', 'study-planner'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.ai_chat_sessions(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text not null, -- 'user' | 'model'
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- ========================================================================
-- Row Level Security (RLS) Policies (Strict User Isolation)
-- ========================================================================

alter table public.profiles enable row level security;
alter table public.dsa_topics enable row level security;
alter table public.dsa_problems enable row level security;
alter table public.curriculum_tracks enable row level security;
alter table public.curriculum_items enable row level security;
alter table public.daily_logs enable row level security;
alter table public.projects enable row level security;
alter table public.custom_modules enable row level security;
alter table public.custom_records enable row level security;
alter table public.ai_chat_sessions enable row level security;
alter table public.ai_messages enable row level security;

-- Profiles: Users can view & update their own profile
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- DSA Topics: Users manage their own topics or view public/global templates
create policy "Users manage own dsa topics" on public.dsa_topics for all using (auth.uid() = user_id or user_id is null);

-- DSA Problems: Users manage their own problems
create policy "Users manage own dsa problems" on public.dsa_problems for all using (auth.uid() = user_id);

-- Curriculum: Tracks & Items
create policy "Users manage own tracks" on public.curriculum_tracks for all using (auth.uid() = user_id or user_id is null);
create policy "Users manage own curriculum items" on public.curriculum_items for all using (auth.uid() = user_id or user_id is null);

-- Daily Logs: Users manage their own logs
create policy "Users manage own daily logs" on public.daily_logs for all using (auth.uid() = user_id);

-- Projects: Users manage their own projects
create policy "Users manage own projects" on public.projects for all using (auth.uid() = user_id);

-- Custom Modules & Records
create policy "Users manage own custom modules" on public.custom_modules for all using (auth.uid() = user_id);
create policy "Users manage own custom records" on public.custom_records for all using (auth.uid() = user_id);

-- AI Chat
create policy "Users manage own ai sessions" on public.ai_chat_sessions for all using (auth.uid() = user_id);
create policy "Users manage own ai messages" on public.ai_messages for all using (auth.uid() = user_id);

-- Performance Indexes
create index if not exists idx_dsa_problems_user on public.dsa_problems(user_id);
create index if not exists idx_dsa_problems_revision on public.dsa_problems(user_id, next_revision_at);
create index if not exists idx_daily_logs_user_date on public.daily_logs(user_id, date);
create index if not exists idx_custom_records_module on public.custom_records(module_id);
