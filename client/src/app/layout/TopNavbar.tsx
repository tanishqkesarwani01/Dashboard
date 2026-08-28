import React, { useState, useEffect } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { Search, Command, Plus, Bell, Flame, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TopNavbar() {
  const { setCommandPaletteOpen, setAiDrawerOpen } = useUIStore();
  const { profile } = useAuthStore();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    setCurrentDate(today);
  }, []);

  return (
    <header className="h-16 border-b border-[#1F293D] bg-[#0E131F]/80 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
      {/* Search Bar / Command Palette Trigger */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl border border-[#1F293D] bg-[#111827]/90 text-slate-400 hover:text-slate-200 hover:border-blue-500/40 text-xs transition-all shadow-inner group"
        >
          <span className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
            <span>Search syllabus, problems, custom records...</span>
          </span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#1A2333] text-slate-400 border border-slate-700">
            <Command className="h-3 w-3" /> K
          </kbd>
        </button>
      </div>

      {/* Right Action Icons & Badges */}
      <div className="flex items-center gap-3">
        {/* Streak Counter Chip */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold">
          <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
          <span>7 Day Streak</span>
        </div>

        {/* Date Display */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 font-medium px-2 py-1 bg-[#161F30] rounded-lg border border-[#1F293D]">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          <span>{currentDate}</span>
        </div>

        {/* AI Quick Button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setAiDrawerOpen(true)}
          className="bg-purple-950/30 border-purple-500/30 text-purple-300 hover:bg-purple-900/40 text-xs gap-1.5"
        >
          <Sparkles className="h-3.5 w-3.5 text-purple-400" />
          <span className="hidden sm:inline">Ask AI</span>
        </Button>

        {/* User Target Role Pill */}
        <div className="h-8 px-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium flex items-center">
          {profile?.target_role || 'Candidate'}
        </div>
      </div>
    </header>
  );
}
