import { create } from 'zustand';
import { Profile } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthState {
  user: any | null;
  profile: Profile | null;
  isLoading: boolean;
  setUser: (user: any) => void;
  setProfile: (profile: Profile | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'demo-user-123',
    email: 'engineer@careeros.dev',
  },
  profile: {
    id: 'demo-user-123',
    email: 'engineer@careeros.dev',
    full_name: 'Alex Rivera',
    target_role: 'Full-Stack Software Engineer',
    bio: 'Building full-stack systems and mastering DSA patterns.',
    github_url: 'https://github.com',
    leetcode_url: 'https://leetcode.com',
    linkedin_url: 'https://linkedin.com',
    created_at: new Date().toISOString(),
  },
  isLoading: false,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  signOut: async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    set({ user: null, profile: null });
  },
}));
