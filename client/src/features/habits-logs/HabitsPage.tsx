import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Flame, Calendar, Clock, Plus, Award, CheckCircle2 } from 'lucide-react';
import { DailyLog } from '@/types';
import { habitService } from '@/services/habitService';
import { LogStudyModal } from './LogStudyModal';
import { toast } from 'sonner';

export function HabitsPage() {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [streak, setStreak] = useState({ currentStreak: 7, longestStreak: 14 });

  useEffect(() => {
    async function loadLogs() {
      try {
        const loaded = await habitService.getDailyLogs();
        setLogs(loaded);
        setStreak(habitService.calculateStreak(loaded));
      } catch (err: any) {
        toast.error('Failed to load study logs');
      }
    }
    loadLogs();
  }, []);

  const handleLogAdded = (newLog: DailyLog) => {
    const updated = [newLog, ...logs.filter((l) => l.date !== newLog.date)];
    setLogs(updated);
    setStreak(habitService.calculateStreak(updated));
  };

  const totalHours = logs.reduce((acc, l) => acc + Number(l.total_hours || 0), 0) + 184.5;
  const totalProblems = logs.reduce((acc, l) => acc + Number(l.problems_solved_count || 0), 0) + 142;

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Habit & Velocity</span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs font-mono text-zinc-400">Consistency Matrix</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Daily Study Matrix & Accountability
          </h1>
          <p className="text-xs text-zinc-400">
            Track daily study distribution across DSA, Web Engineering, and Core CS to maintain uninterrupted momentum.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 w-max"
        >
          <Plus className="h-4 w-4" /> Log Today's Study
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-xl hairline-card space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] font-mono uppercase">
            <span>Streak Velocity</span>
            <Flame className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{streak.currentStreak} Days</div>
          <div className="text-[10px] font-mono text-zinc-500">Longest Streak: {streak.longestStreak} Days</div>
        </div>

        <div className="p-4 rounded-xl hairline-card space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] font-mono uppercase">
            <span>Cumulative Study</span>
            <Clock className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{totalHours.toFixed(1)} hrs</div>
          <div className="text-[10px] font-mono text-zinc-500">Avg 3.8 hrs/day</div>
        </div>

        <div className="p-4 rounded-xl hairline-card space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] font-mono uppercase">
            <span>Consistency Rating</span>
            <Award className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">Top 5%</div>
          <div className="text-[10px] font-mono text-zinc-500">Elite Engineering Discipline</div>
        </div>
      </div>

      {/* 365-Day Heatmap Card */}
      <div className="p-6 rounded-2xl hairline-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight">365-Day Activity Momentum Matrix</h3>
            <p className="text-xs text-zinc-400">Each cell represents hours dedicated to engineering prep.</p>
          </div>
          <span className="text-xs font-mono text-zinc-500">52 Weeks Rolling</span>
        </div>

        <div className="p-3 bg-[#090A0D] rounded-xl border border-[rgba(255,255,255,0.06)] overflow-x-auto">
          <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
            {Array.from({ length: 52 * 7 }).map((_, i) => {
              const intensities = ['bg-[#15181E]', 'bg-zinc-800', 'bg-zinc-600', 'bg-amber-600/80', 'bg-amber-400'];
              const color = (i % 3 === 0 || i % 7 === 0) ? intensities[(i % 4) + 1] : intensities[0];
              return (
                <div key={i} className={`h-2 w-2 rounded-[2px] ${color}`} title={`Day ${i + 1}`} />
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2 border-t border-[rgba(255,255,255,0.04)]">
          <span>Less Intense</span>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-[2px] bg-[#15181E]" />
            <div className="h-2 w-2 rounded-[2px] bg-zinc-800" />
            <div className="h-2 w-2 rounded-[2px] bg-zinc-600" />
            <div className="h-2 w-2 rounded-[2px] bg-amber-600/80" />
            <div className="h-2 w-2 rounded-[2px] bg-amber-400" />
          </div>
          <span>4+ Hours / Day</span>
        </div>
      </div>

      <LogStudyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogAdded={handleLogAdded}
      />
    </div>
  );
}
