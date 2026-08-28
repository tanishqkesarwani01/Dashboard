import React from 'react';
import { Link } from 'wouter';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUIStore } from '@/stores/useUIStore';
import {
  Code2,
  Sparkles,
  Search,
  Check,
  Flame,
  Clock,
  Briefcase,
  History,
  Layers,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

export function DashboardOverview() {
  const { profile } = useAuthStore();
  const { setAiDrawerOpen } = useUIStore();

  const handleMarkDone = (title: string) => {
    toast.success(`Marked "${title}" reviewed! Interval updated.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Executive Action Required Banner */}
      <div className="w-full rounded-2xl bg-[#15181D] border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/5 to-transparent pointer-events-none" />

        <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between relative z-10 gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-mono text-[11px] text-amber-400 tracking-widest uppercase font-semibold">
                Action Required
              </span>
            </div>
            <h2 className="text-xl md:text-2xl text-white font-bold tracking-tight">
              4 Algorithmic Revisions Due Today
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              OS Concurrency & Binary Search spaced repetition block recommended for peak retention.
            </p>
          </div>

          <Link href="/dsa">
            <button className="px-6 py-2.5 bg-white hover:bg-zinc-100 text-zinc-950 font-mono text-xs font-bold rounded-xl shadow-lg shadow-white/10 transition-all">
              Begin Session &rarr;
            </button>
          </Link>
        </div>
      </div>

      {/* Horizontal Scroll Stat Cards (Stitch Design) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Card 1: DSA Mastery */}
        <div className="p-5 rounded-2xl bg-[#0E1013] border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-[#15181D] transition-all flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              DSA Mastery
            </span>
            <Code2 className="h-4 w-4 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl text-white font-bold font-mono">142</span>
            <span className="font-mono text-xs text-zinc-500">/ 210</span>
          </div>
          <div className="w-full bg-[#1b1c1d] rounded-full overflow-hidden h-1">
            <div className="h-full bg-cyan-400 rounded-full transition-all duration-500" style={{ width: '67%' }} />
          </div>
        </div>

        {/* Stat Card 2: Study Velocity */}
        <div className="p-5 rounded-2xl bg-[#0E1013] border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-[#15181D] transition-all flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              Study Velocity
            </span>
            <Clock className="h-4 w-4 text-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl text-white font-bold font-mono">26.5h</span>
            <span className="font-mono text-xs text-zinc-500">/ 30h target</span>
          </div>
          <div className="w-full bg-[#1b1c1d] rounded-full overflow-hidden h-1">
            <div className="h-full bg-purple-400 rounded-full transition-all duration-500" style={{ width: '88%' }} />
          </div>
        </div>

        {/* Stat Card 3: Momentum Streak */}
        <div className="p-5 rounded-2xl bg-[#0E1013] border border-amber-500/30 shadow-[inset_0_1px_0_rgba(245,158,11,0.15)] hover:bg-[#15181D] transition-all flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[11px] text-amber-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              Momentum Streak <Flame className="h-3.5 w-3.5 text-amber-400" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl text-amber-300 font-bold font-mono">7</span>
            <span className="font-mono text-xs text-amber-400/80">Days Active</span>
          </div>
          <div className="w-full bg-amber-500/10 rounded-full overflow-hidden h-1">
            <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Stat Card 4: Spaced Reviews */}
        <div className="p-5 rounded-2xl bg-[#0E1013] border border-rose-500/20 shadow-[inset_0_1px_0_rgba(244,63,94,0.15)] hover:bg-[#15181D] transition-all flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[11px] text-rose-400 uppercase tracking-wider font-semibold">
              Spaced Reviews
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300">TODAY</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl text-rose-400 font-bold font-mono">4</span>
            <span className="font-mono text-xs text-zinc-400">Cards Due</span>
          </div>
          <div className="flex gap-1">
            <div className="h-1 w-full bg-rose-500 rounded-full" />
            <div className="h-1 w-full bg-rose-500 rounded-full" />
            <div className="h-1 w-full bg-rose-500 rounded-full" />
            <div className="h-1 w-full bg-rose-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Feed: Spaced Repetition Queue (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 font-mono">
              <span className="text-amber-400">⚡</span> Spaced Repetition Queue
            </h3>
            <Link href="/dsa" className="text-xs font-mono text-zinc-400 hover:text-white transition-colors">
              View Catalog &rarr;
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {/* Task Card 1 (Medium) */}
            <div className="bg-[#0E1013] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center justify-between hover:bg-[#15181D] transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                    Binary Search in Rotated Sorted Array
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-xs font-mono">
                    <span className="text-[11px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 font-semibold">
                      Medium
                    </span>
                    <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                      <History className="h-3.5 w-3.5 text-zinc-500" /> 2 days ago • 7-day interval
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleMarkDone('Binary Search in Rotated Array')}
                className="px-3.5 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] text-zinc-400 hover:text-emerald-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all flex items-center gap-1.5 font-mono text-xs"
              >
                <Check className="h-3.5 w-3.5" /> <span>Done</span>
              </button>
            </div>

            {/* Task Card 2 (Hard) */}
            <div className="bg-[#0E1013] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center justify-between hover:bg-[#15181D] transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                    0/1 Knapsack & Dynamic Programming
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-xs font-mono">
                    <span className="text-[11px] text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20 font-semibold">
                      Hard
                    </span>
                    <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                      <History className="h-3.5 w-3.5 text-zinc-500" /> 5 days ago • 14-day interval
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleMarkDone('0/1 Knapsack Pattern')}
                className="px-3.5 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] text-zinc-400 hover:text-emerald-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all flex items-center gap-1.5 font-mono text-xs"
              >
                <Check className="h-3.5 w-3.5" /> <span>Done</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Study Momentum Matrix (Heatmap) */}
          <div className="bg-[#0E1013] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                Momentum Matrix
              </h3>
              <span className="font-mono text-xs text-emerald-400 font-bold">● Active</span>
            </div>

            <div className="grid grid-cols-14 gap-1 p-1 bg-[#08090A] rounded-xl border border-zinc-900 overflow-x-auto">
              {Array.from({ length: 14 * 4 }).map((_, i) => {
                const intensities = [
                  'bg-[#1b1c1d]',
                  'bg-emerald-950/60',
                  'bg-emerald-700/80',
                  'bg-emerald-500',
                ];
                const color =
                  i % 3 === 0 || i % 7 === 0
                    ? intensities[(i % 3) + 1]
                    : intensities[0];
                return (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-[2px] ${color} transition-colors`}
                    title={`Study Day ${i + 1}`}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-2 mt-3 font-mono text-[10px] text-zinc-500">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-[2px] bg-[#1b1c1d]" />
                <div className="w-2 h-2 rounded-[2px] bg-emerald-950/60" />
                <div className="w-2 h-2 rounded-[2px] bg-emerald-700/80" />
                <div className="w-2 h-2 rounded-[2px] bg-emerald-500" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Pillars Completion */}
          <div className="bg-[#0E1013] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] space-y-4">
            <h3 className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              Pillars Completion
            </h3>

            <div className="flex flex-col gap-3.5">
              {/* DSA */}
              <div>
                <div className="flex justify-between items-center mb-1 text-xs font-mono">
                  <span className="text-zinc-300 font-medium">Data Structures & Algo</span>
                  <span className="text-cyan-400 font-bold">68%</span>
                </div>
                <div className="w-full bg-[#1b1c1d] rounded-full overflow-hidden h-1">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>

              {/* Web Dev */}
              <div>
                <div className="flex justify-between items-center mb-1 text-xs font-mono">
                  <span className="text-zinc-300 font-medium">Web Engineering</span>
                  <span className="text-emerald-400 font-bold">84%</span>
                </div>
                <div className="w-full bg-[#1b1c1d] rounded-full overflow-hidden h-1">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '84%' }} />
                </div>
              </div>

              {/* Core CS */}
              <div>
                <div className="flex justify-between items-center mb-1 text-xs font-mono">
                  <span className="text-zinc-300 font-medium">Core CS Concepts</span>
                  <span className="text-amber-400 font-bold">52%</span>
                </div>
                <div className="w-full bg-[#1b1c1d] rounded-full overflow-hidden h-1">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '52%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button (FAB) - Gemini Socratic Copilot */}
      <button
        onClick={() => setAiDrawerOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-tr from-purple-900 to-purple-600 border border-purple-400/50 shadow-[0_0_25px_rgba(139,92,246,0.4)] flex items-center justify-center text-white z-40 hover:scale-110 active:scale-95 transition-all duration-200"
        title="Open Gemini Socratic Copilot"
      >
        <Sparkles className="h-6 w-6 text-purple-200" />
      </button>
    </div>
  );
}
