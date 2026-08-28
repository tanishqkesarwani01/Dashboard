import React from 'react';
import { Link } from 'wouter';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUIStore } from '@/stores/useUIStore';
import {
  Code2,
  BookOpen,
  CalendarCheck,
  Flame,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DashboardOverview() {
  const { profile } = useAuthStore();
  const { setAiDrawerOpen } = useUIStore();

  const dueReviews = [
    { id: '1', title: 'Binary Search in Rotated Sorted Array', tag: 'LeetCode #33', difficulty: 'Medium', interval: 'Day 7 Revision', diffColor: 'text-amber-400', dotColor: 'bg-amber-400' },
    { id: '2', title: '0/1 Knapsack & Subset Sum Pattern', tag: 'Dynamic Programming', difficulty: 'Hard', interval: 'Day 14 Revision', diffColor: 'text-rose-400', dotColor: 'bg-rose-400' },
    { id: '3', title: 'Database Indexing & B-Tree Node Balancing', tag: 'PostgreSQL Core CS', difficulty: 'Concept', interval: 'Day 3 Revision', diffColor: 'text-emerald-400', dotColor: 'bg-emerald-400' },
  ];

  return (
    <div className="space-y-7">
      {/* Executive Overview Banner */}
      <div className="p-6 rounded-2xl hairline-card flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">System Ready • Revision Due</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Daily Focus: <span className="text-amber-400">4 Algorithmic Revisions</span> & <span className="text-zinc-300">OS Concurrency</span>
          </h1>
          <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
            Your spaced repetition curve requires 4 problem revisions today to lock Binary Search and Knapsack patterns into permanent memory.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <Link href="/dsa">
            <button className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/20">
              Open Revision Queue
            </button>
          </Link>
          <button
            onClick={() => setAiDrawerOpen(true)}
            className="px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 text-xs font-medium transition-all"
          >
            Consult Gemini Socratic
          </button>
        </div>

        <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Linear Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl hairline-card flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] font-mono uppercase tracking-wider">
            <span>DSA Catalog</span>
            <span className="text-zinc-400">Mastery</span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-white font-mono tracking-tight">142 <span className="text-xs text-zinc-500 font-normal">/ 210</span></div>
            <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
              <span>↑ 67.6%</span> <span className="text-zinc-500">syllabus coverage</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl hairline-card flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] font-mono uppercase tracking-wider">
            <span>Study Velocity</span>
            <span className="text-zinc-400">Weekly</span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-white font-mono tracking-tight">26.5 <span className="text-xs text-zinc-500 font-normal">hrs</span></div>
            <div className="text-[11px] text-zinc-400 font-mono">
              Target: 30.0 hrs <span className="text-amber-400 font-semibold">(88%)</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl hairline-card flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] font-mono uppercase tracking-wider">
            <span>Active Momentum</span>
            <span className="text-amber-400 font-bold">● LIVE</span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-white font-mono tracking-tight">7 <span className="text-xs text-zinc-500 font-normal">Days</span></div>
            <div className="text-[11px] text-zinc-500 font-mono">
              Personal Record: <strong className="text-zinc-300">14 Days</strong>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl hairline-card flex flex-col justify-between space-y-3 border-amber-500/20 bg-amber-500/[0.02]">
          <div className="flex items-center justify-between text-amber-400/80 text-[11px] font-mono uppercase tracking-wider">
            <span>Spaced Reviews</span>
            <span className="text-amber-400">Today</span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-amber-300 font-mono tracking-tight">4 <span className="text-xs text-zinc-500 font-normal">Cards</span></div>
            <div className="text-[11px] text-amber-400/90 font-mono">
              Next trigger: in 6 hours
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Spaced Repetition Due Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl hairline-card space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-white">Spaced Repetition Queue (Scheduled for Today)</h3>
                <p className="text-xs text-zinc-400">Reviewing at calculated intervals increases memory retention by over 300%.</p>
              </div>
              <Link href="/dsa" className="text-xs font-mono text-zinc-400 hover:text-white transition-colors">
                View All &rarr;
              </Link>
            </div>

            <div className="space-y-2">
              {dueReviews.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0C0E11] hover:border-zinc-700 hover:bg-[#111418] transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`h-2 w-2 rounded-full ${item.dotColor}`}></div>
                    <div>
                      <div className="text-xs font-medium text-zinc-100 group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-2 mt-0.5">
                        <span className="text-zinc-400">{item.tag}</span>
                        <span>•</span>
                        <span className={item.diffColor}>{item.difficulty}</span>
                        <span>•</span>
                        <span className="text-zinc-400">{item.interval}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href="/dsa">
                      <button className="px-2.5 py-1 rounded-md border border-zinc-700 hover:bg-zinc-800 text-[11px] font-mono text-zinc-300">
                        Review
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 365-Day Heatmap Preview */}
          <div className="p-6 rounded-2xl hairline-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-tight">365-Day Study Momentum Matrix</h3>
                <p className="text-xs text-zinc-400">Visualizing 52 weeks of engineering practice consistency.</p>
              </div>
              <Link href="/habits" className="text-xs font-mono text-emerald-400 hover:underline">
                184.5 Total Hours &rarr;
              </Link>
            </div>

            <div className="p-3 bg-[#090A0D] rounded-xl border border-[rgba(255,255,255,0.06)] overflow-x-auto">
              <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
                {Array.from({ length: 52 * 7 }).map((_, i) => {
                  const intensities = ['bg-[#15181E]', 'bg-zinc-800', 'bg-zinc-600', 'bg-amber-600/80', 'bg-amber-400'];
                  const color = (i % 3 === 0 || i % 7 === 0) ? intensities[(i % 4) + 1] : intensities[0];
                  return (
                    <div key={i} className={`h-2 w-2 rounded-[2px] ${color}`} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Socratic AI & Curriculum Ratios */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl hairline-card border-zinc-700/60 bg-gradient-to-b from-[#13161C] to-[#0D0F12] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-amber-400">✦</span>
                <span className="text-xs font-semibold text-white tracking-tight">Gemini Socratic Copilot</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">LIVE</span>
            </div>

            <div className="p-3 rounded-xl bg-[#090A0D] border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-mono">
              <div className="text-[10px] text-zinc-500 mb-1">PROMPT SUGGESTION:</div>
              "How does two-pointer technique reduce $O(N^2)$ to $O(N)$ on sorted arrays?"
            </div>

            <button
              onClick={() => setAiDrawerOpen(true)}
              className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-all"
            >
              Launch Interview Assistant &rarr;
            </button>
          </div>

          <div className="p-5 rounded-2xl hairline-card space-y-4">
            <h3 className="text-xs font-semibold font-mono uppercase tracking-wider text-zinc-400">Pillars Completion</h3>

            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">Data Structures & Algo</span>
                  <span className="text-zinc-400">142/210 (68%)</span>
                </div>
                <div className="w-full h-1 rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">Web Architecture & Node</span>
                  <span className="text-zinc-400">38/45 (84%)</span>
                </div>
                <div className="w-full h-1 rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '84%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">Core CS (OS, DBMS, CN)</span>
                  <span className="text-zinc-400">16/30 (52%)</span>
                </div>
                <div className="w-full h-1 rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-zinc-400 rounded-full" style={{ width: '52%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
