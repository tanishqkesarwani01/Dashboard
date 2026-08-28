import React from 'react';
import { BarChart3, TrendingUp, Award, Clock, PieChart, Code2, Flame } from 'lucide-react';

export function AnalyticsPage() {
  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">Velocity Engine</span>
          <span className="text-zinc-500">•</span>
          <span className="text-xs font-mono text-zinc-400">Retention & Study Analytics</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Performance & Study Velocity Analytics
        </h1>
        <p className="text-xs text-zinc-400">
          In-depth insights into your study distribution, problem-solving velocity, and spaced repetition retention rates.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-xl hairline-card space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] font-mono uppercase">
            <span>Overall Retention Rate</span>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">92.4%</div>
          <div className="text-[10px] font-mono text-emerald-400">Based on 14-day revision intervals</div>
        </div>

        <div className="p-4 rounded-xl hairline-card space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] font-mono uppercase">
            <span>Weekly Study Time</span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">26.5 hrs</div>
          <div className="text-[10px] font-mono text-zinc-500">Target: 30.0 hrs (88%)</div>
        </div>

        <div className="p-4 rounded-xl hairline-card space-y-2">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] font-mono uppercase">
            <span>Algorithmic Velocity</span>
            <Code2 className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">+12 Problems</div>
          <div className="text-[10px] font-mono text-zinc-500">Solved across past 7 days</div>
        </div>
      </div>

      {/* Two-Column Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Difficulty Distribution */}
        <div className="p-6 rounded-2xl hairline-card space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white tracking-tight">DSA Difficulty Breakdown</h3>
            <span className="text-xs font-mono text-zinc-500">142 Total Solved</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-emerald-400 font-semibold">Easy Problems</span>
                <span className="text-zinc-400">54 (38%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '38%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-amber-400 font-semibold">Medium Problems</span>
                <span className="text-zinc-400">72 (51%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '51%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-rose-400 font-semibold">Hard Problems</span>
                <span className="text-zinc-400">16 (11%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full bg-rose-400 rounded-full" style={{ width: '11%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Study Time Breakdown */}
        <div className="p-6 rounded-2xl hairline-card space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white tracking-tight">Domain Time Allocation</h3>
            <span className="text-xs font-mono text-zinc-500">Past 7 Days</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-amber-400 font-semibold">DSA & Spaced Repetition</span>
                <span className="text-zinc-400">14.5 hrs (55%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '55%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-cyan-400 font-semibold">Full-Stack Web Development</span>
                <span className="text-zinc-400">8.0 hrs (30%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: '30%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-300 font-semibold">Core CS (OS & DBMS)</span>
                <span className="text-zinc-400">4.0 hrs (15%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full bg-zinc-400 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
