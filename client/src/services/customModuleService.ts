import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { CustomModule, CustomRecord } from '@/types';

const LOCAL_STORAGE_KEY_MODULES = 'careeros_custom_modules';
const LOCAL_STORAGE_KEY_RECORDS = 'careeros_custom_records';

export const customModuleService = {
  async getModules(): Promise<CustomModule[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('custom_modules').select('*').eq('is_archived', false);
      if (!error && data) return data;
    }
    const local = localStorage.getItem(LOCAL_STORAGE_KEY_MODULES);
    if (local) return JSON.parse(local);
    return [];
  },

  async createModule(mod: Omit<CustomModule, 'id' | 'created_at'>): Promise<CustomModule> {
    const newModule: CustomModule = {
      ...mod,
      id: isSupabaseConfigured ? undefined as any : `mod_${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('custom_modules').insert(newModule).select().single();
      if (!error && data) return data;
    }

    const current = await this.getModules();
    const updated = [newModule, ...current];
    localStorage.setItem(LOCAL_STORAGE_KEY_MODULES, JSON.stringify(updated));
    return newModule;
  },

  async getRecords(moduleId: string): Promise<CustomRecord[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('custom_records').select('*').eq('module_id', moduleId);
      if (!error && data) return data;
    }
    const local = localStorage.getItem(`${LOCAL_STORAGE_KEY_RECORDS}_${moduleId}`);
    if (local) return JSON.parse(local);
    return [];
  },

  async addRecord(moduleId: string, data: Record<string, any>): Promise<CustomRecord> {
    const newRecord: CustomRecord = {
      id: isSupabaseConfigured ? undefined as any : `rec_${Date.now()}`,
      module_id: moduleId,
      data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      const { data: inserted, error } = await supabase.from('custom_records').insert(newRecord).select().single();
      if (!error && inserted) return inserted;
    }

    const current = await this.getRecords(moduleId);
    const updated = [newRecord, ...current];
    localStorage.setItem(`${LOCAL_STORAGE_KEY_RECORDS}_${moduleId}`, JSON.stringify(updated));
    return newRecord;
  },
};
