import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { DailyLog } from '@/types';

const LOCAL_STORAGE_KEY_LOGS = 'careeros_daily_logs';

export const habitService = {
  async getDailyLogs(): Promise<DailyLog[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('daily_logs').select('*').order('date', { ascending: false });
      if (!error && data) return data;
    }
    const local = localStorage.getItem(LOCAL_STORAGE_KEY_LOGS);
    if (local) return JSON.parse(local);
    return [];
  },

  async logDailyStudy(log: Omit<DailyLog, 'id'>): Promise<DailyLog> {
    const newLog: DailyLog = {
      ...log,
      id: isSupabaseConfigured ? undefined as any : `log_${Date.now()}`,
    };

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('daily_logs').upsert(newLog, { onConflict: 'user_id,date' }).select().single();
      if (!error && data) return data;
    }

    const current = await this.getDailyLogs();
    const filtered = current.filter((l) => l.date !== log.date);
    const updated = [newLog, ...filtered];
    localStorage.setItem(LOCAL_STORAGE_KEY_LOGS, JSON.stringify(updated));
    return newLog;
  },

  calculateStreak(logs: DailyLog[]): { currentStreak: number; longestStreak: number } {
    if (!logs || logs.length === 0) return { currentStreak: 0, longestStreak: 0 };
    const dates = Array.from(new Set(logs.map((l) => l.date))).sort().reverse();
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Check if streak is active today or yesterday
    let active = dates.includes(today) || dates.includes(yesterday);
    if (!active) return { currentStreak: 0, longestStreak: dates.length > 0 ? 1 : 0 };

    for (let i = 0; i < dates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prev = new Date(dates[i - 1]);
        const curr = new Date(dates[i]);
        const diff = (prev.getTime() - curr.getTime()) / (1000 * 3600 * 24);
        if (Math.round(diff) === 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    }

    return {
      currentStreak: tempStreak,
      longestStreak: Math.max(longestStreak, tempStreak),
    };
  },
};
