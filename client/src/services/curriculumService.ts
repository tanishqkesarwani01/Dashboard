import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { CurriculumTrack, CurriculumItem } from '@/types';

const LOCAL_STORAGE_KEY_TRACKS = 'careeros_curriculum_tracks';
const LOCAL_STORAGE_KEY_ITEMS = 'careeros_curriculum_items';

export const curriculumService = {
  async getTracks(): Promise<CurriculumTrack[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('curriculum_tracks').select('*');
      if (!error && data && data.length > 0) return data;
    }
    const local = localStorage.getItem(LOCAL_STORAGE_KEY_TRACKS);
    if (local) return JSON.parse(local);
    return [];
  },

  async getItems(trackId?: string): Promise<CurriculumItem[]> {
    if (isSupabaseConfigured) {
      let query = supabase.from('curriculum_items').select('*').order('order_index');
      if (trackId) query = query.eq('track_id', trackId);
      const { data, error } = await query;
      if (!error && data) return data;
    }
    const local = localStorage.getItem(LOCAL_STORAGE_KEY_ITEMS);
    if (local) {
      const parsed: CurriculumItem[] = JSON.parse(local);
      return trackId ? parsed.filter((i) => i.track_id === trackId) : parsed;
    }
    return [];
  },

  async toggleItemStatus(id: string, currentStatus: string): Promise<string> {
    const nextStatus = currentStatus === 'Completed' ? 'Not Started' : currentStatus === 'Not Started' ? 'In Progress' : 'Completed';
    if (isSupabaseConfigured) {
      await supabase.from('curriculum_items').update({
        status: nextStatus,
        completed_at: nextStatus === 'Completed' ? new Date().toISOString() : null,
      }).eq('id', id);
    }
    return nextStatus;
  },
};
