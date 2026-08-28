import { create } from 'zustand';
import { Profile } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthState {
  user: any | null;
  profile: Profile | null;
  isLoading: boolean;
  setUser: (user: any) => void;
  setProfile: (profile: Profile | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signInAsGuest: () => void;
  signOut: () => Promise<void>;
}

const DEFAULT_DEMO_PROFILE: Profile = {
  id: 'demo-user-123',
  email: 'engineer@careeros.dev',
  full_name: 'Alex Rivera',
  target_role: 'Full-Stack Software Engineer',
  bio: 'Building full-stack systems and mastering DSA patterns.',
  github_url: 'https://github.com',
  leetcode_url: 'https://leetcode.com',
  linkedin_url: 'https://linkedin.com',
  created_at: new Date().toISOString(),
};

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'demo-user-123',
    email: 'engineer@careeros.dev',
  },
  profile: DEFAULT_DEMO_PROFILE,
  isLoading: false,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),

  signIn: async (email: string, password: string) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      set({
        user: data.user,
        profile: {
          ...DEFAULT_DEMO_PROFILE,
          id: data.user.id,
          email: data.user.email || email,
        },
      });
    } else {
      set({
        user: { id: 'demo-user-123', email },
        profile: { ...DEFAULT_DEMO_PROFILE, email },
      });
    }
  },

  signUp: async (email: string, password: string, fullName: string) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) throw error;
      set({
        user: data.user,
        profile: {
          ...DEFAULT_DEMO_PROFILE,
          id: data.user?.id || 'new-user',
          email,
          full_name: fullName,
        },
      });
    } else {
      set({
        user: { id: 'demo-user-123', email },
        profile: { ...DEFAULT_DEMO_PROFILE, email, full_name: fullName },
      });
    }
  },

  signInAsGuest: () => {
    set({
      user: { id: 'demo-user-123', email: 'engineer@careeros.dev' },
      profile: DEFAULT_DEMO_PROFILE,
    });
  },

  signOut: async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    set({ user: null, profile: null });
  },
}));
