import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { DsaProblem, DsaTopic } from '@/types';

const LOCAL_STORAGE_KEY_PROBLEMS = 'careeros_dsa_problems';
const LOCAL_STORAGE_KEY_TOPICS = 'careeros_dsa_topics';

const DEFAULT_TOPICS: DsaTopic[] = [
  { id: '1', name: 'Arrays & Two Pointers', category: 'Data Structures', order_index: 1 },
  { id: '2', name: 'Sliding Window', category: 'Algorithms', order_index: 2 },
  { id: '3', name: 'Stack & Monotonic Stack', category: 'Data Structures', order_index: 3 },
  { id: '4', name: 'Binary Search', category: 'Algorithms', order_index: 4 },
  { id: '5', name: 'Linked Lists', category: 'Data Structures', order_index: 5 },
  { id: '6', name: 'Binary Trees & BST', category: 'Data Structures', order_index: 6 },
  { id: '7', name: 'Graphs & BFS/DFS', category: 'Algorithms', order_index: 7 },
  { id: '8', name: 'Dynamic Programming', category: 'Algorithms', order_index: 8 },
  { id: '9', name: 'Heap & Priority Queue', category: 'Data Structures', order_index: 9 },
];

const DEFAULT_PROBLEMS: DsaProblem[] = [
  {
    id: 'p1',
    topic_id: '1',
    title: 'Two Sum II - Input Array Is Sorted',
    platform: 'LeetCode',
    difficulty: 'Medium',
    status: 'Mastered',
    confidence_score: 5,
    next_revision_at: '2026-09-04',
    revision_count: 3,
    url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
  },
  {
    id: 'p2',
    topic_id: '8',
    title: '0/1 Knapsack Problem',
    platform: 'GeeksforGeeks',
    difficulty: 'Medium',
    status: 'Solved',
    confidence_score: 3,
    next_revision_at: '2026-08-29',
    revision_count: 1,
    url: 'https://practice.geeksforgeeks.org',
  },
  {
    id: 'p3',
    topic_id: '6',
    title: 'Lowest Common Ancestor of a Binary Tree',
    platform: 'LeetCode',
    difficulty: 'Medium',
    status: 'Solved',
    confidence_score: 4,
    next_revision_at: '2026-09-01',
    revision_count: 2,
    url: 'https://leetcode.com',
  },
];

export const dsaService = {
  async getTopics(): Promise<DsaTopic[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('dsa_topics').select('*').order('order_index');
      if (!error && data && data.length > 0) return data;
    }
    const local = localStorage.getItem(LOCAL_STORAGE_KEY_TOPICS);
    if (local) return JSON.parse(local);
    localStorage.setItem(LOCAL_STORAGE_KEY_TOPICS, JSON.stringify(DEFAULT_TOPICS));
    return DEFAULT_TOPICS;
  },

  async getProblems(): Promise<DsaProblem[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('dsa_problems').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    const local = localStorage.getItem(LOCAL_STORAGE_KEY_PROBLEMS);
    if (local) return JSON.parse(local);
    localStorage.setItem(LOCAL_STORAGE_KEY_PROBLEMS, JSON.stringify(DEFAULT_PROBLEMS));
    return DEFAULT_PROBLEMS;
  },

  async addProblem(problem: Omit<DsaProblem, 'id'>): Promise<DsaProblem> {
    const newProblem: DsaProblem = {
      ...problem,
      id: isSupabaseConfigured ? undefined as any : `prob_${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('dsa_problems').insert(newProblem).select().single();
      if (!error && data) return data;
    }

    const current = await this.getProblems();
    const updated = [newProblem, ...current];
    localStorage.setItem(LOCAL_STORAGE_KEY_PROBLEMS, JSON.stringify(updated));
    return newProblem;
  },

  async updateProblem(id: string, updates: Partial<DsaProblem>): Promise<DsaProblem> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('dsa_problems').update(updates).eq('id', id).select().single();
      if (!error && data) return data;
    }

    const current = await this.getProblems();
    const updated = current.map((p) => (p.id === id ? { ...p, ...updates } : p));
    localStorage.setItem(LOCAL_STORAGE_KEY_PROBLEMS, JSON.stringify(updated));
    return updated.find((p) => p.id === id)!;
  },

  async deleteProblem(id: string): Promise<void> {
    if (isSupabaseConfigured) {
      await supabase.from('dsa_problems').delete().eq('id', id);
    }
    const current = await this.getProblems();
    const updated = current.filter((p) => p.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY_PROBLEMS, JSON.stringify(updated));
  },

  calculateNextRevisionDate(currentRevisionCount: number): string {
    const intervals = [1, 3, 7, 14, 30, 60];
    const daysToAdd = intervals[Math.min(currentRevisionCount, intervals.length - 1)];
    const d = new Date();
    d.setDate(d.getDate() + daysToAdd);
    return d.toISOString().split('T')[0];
  },
};
