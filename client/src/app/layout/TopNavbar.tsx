import React, { useState, useEffect } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { Search, Command, Sparkles } from 'lucide-react';
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
    <header className="h-14 border-b border-[rgba(255,255,255,0.06)] bg-[#08090A]/90 backdrop-blur-xl sticky top-0 z-20 px-8 flex items-center justify-between">
      {/* Breadcrumbs & Search Trigger */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-500">
          <span>workspace</span>
          <span>/</span>
          <span className="text-zinc-200 font-medium">engineering-dashboard</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#121418] text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-all cursor-pointer w-64 md:w-72 justify-between"
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-zinc-500" />
            <span className="text-zinc-500">Find command or topic...</span>
          </div>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400">⌘K</kbd>
        </div>

        <div className="h-4 w-[1px] bg-zinc-800 mx-1 hidden sm:block"></div>

        {/* Streak Minimalist Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-amber-500/20 bg-amber-500/5 text-amber-300 text-xs font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          <span>7d streak</span>
        </div>

        {/* AI Quick Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAiDrawerOpen(true)}
          className="border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 text-xs gap-1.5 h-8"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span className="hidden md:inline">Gemini AI</span>
        </Button>
      </div>
    </header>
  );
}
