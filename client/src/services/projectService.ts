import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Project } from '@/types';

const LOCAL_STORAGE_KEY_PROJECTS = 'careeros_projects';

export const projectService = {
  async getProjects(): Promise<Project[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    const local = localStorage.getItem(LOCAL_STORAGE_KEY_PROJECTS);
    if (local) return JSON.parse(local);
    return [];
  },

  async createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
    const newProject: Project = {
      ...project,
      id: isSupabaseConfigured ? undefined as any : `proj_${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('projects').insert(newProject).select().single();
      if (!error && data) return data;
    }

    const current = await this.getProjects();
    const updated = [newProject, ...current];
    localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTS, JSON.stringify(updated));
    return newProject;
  },
};
