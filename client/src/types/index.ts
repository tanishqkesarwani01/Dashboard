export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Platform = 'LeetCode' | 'GeeksforGeeks' | 'Codeforces' | 'HackerRank' | 'CodeStudio' | 'Other';
export type ProblemStatus = 'Todo' | 'Solved' | 'Mastered';

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  target_role?: string;
  bio?: string;
  github_url?: string;
  linkedin_url?: string;
  leetcode_url?: string;
  created_at: string;
}

export interface DsaTopic {
  id: string;
  user_id?: string;
  name: string;
  category: string;
  order_index: number;
  problem_count?: number;
  solved_count?: number;
}

export interface DsaProblem {
  id: string;
  user_id?: string;
  topic_id: string;
  title: string;
  url?: string;
  platform: Platform;
  difficulty: Difficulty;
  status: ProblemStatus;
  notes?: string;
  confidence_score: number; // 1 - 5
  next_revision_at?: string;
  revision_count: number;
  solved_at?: string;
  created_at?: string;
}

export type TrackCategory = 'Skill Track' | 'Core CS' | 'Language';

export interface CurriculumTrack {
  id: string;
  user_id?: string;
  title: string;
  category: TrackCategory;
  icon: string;
  color: string;
  description?: string;
  items_count?: number;
  completed_count?: number;
}

export type CurriculumItemStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface CurriculumItem {
  id: string;
  track_id: string;
  user_id?: string;
  title: string;
  description?: string;
  status: CurriculumItemStatus;
  notes?: string;
  resource_url?: string;
  order_index: number;
}

export interface DailyLog {
  id: string;
  user_id?: string;
  date: string; // YYYY-MM-DD
  total_hours: number;
  dsa_hours: number;
  dev_hours: number;
  core_cs_hours: number;
  problems_solved_count: number;
  summary: string;
  mood_or_rating?: number; // 1 - 5
}

export type ProjectStatus = 'Planning' | 'In Progress' | 'Completed' | 'Archived';

export interface ProjectMilestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface Project {
  id: string;
  user_id?: string;
  title: string;
  tagline: string;
  description: string;
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
  status: ProjectStatus;
  milestones: ProjectMilestone[];
  architecture_notes?: string;
  created_at: string;
}

export type CustomFieldType = 'text' | 'number' | 'select' | 'multi-select' | 'date' | 'checkbox' | 'url';

export interface CustomFieldDefinition {
  id: string;
  name: string;
  type: CustomFieldType;
  options?: string[]; // For select & multi-select
  defaultValue?: any;
}

export interface CustomModule {
  id: string;
  user_id?: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
  schema: CustomFieldDefinition[];
  is_pinned?: boolean;
  is_archived?: boolean;
  record_count?: number;
  created_at: string;
}

export interface CustomRecord {
  id: string;
  module_id: string;
  user_id?: string;
  data: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export type AiMode = 'socratic' | 'mock-interview' | 'resume-review' | 'study-planner' | 'general';

export interface AiMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}
