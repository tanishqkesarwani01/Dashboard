import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Calendar, Clock, Plus, Award } from 'lucide-react';

export function HabitsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="warning" className="font-mono">CONSISTENCY</Badge>
            <span className="text-xs text-slate-400">Daily Habits</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Daily Study Logs & Activity Heatmap
          </h1>
          <p className="text-xs text-slate-400">
            Build unshakeable daily engineering habits and visualize your consistency over time.
          </p>
        </div>

        <Button variant="primary" className="gap-2">
          <Plus className="h-4 w-4" /> Log Today's Study
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#111827]">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Flame className="h-6 w-6 fill-amber-400" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Current Streak</div>
              <div className="text-2xl font-bold text-white font-mono">7 Days</div>
              <div className="text-[10px] text-slate-500">Longest Streak: 14 Days</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#111827]">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Total Hours Tracked</div>
              <div className="text-2xl font-bold text-white font-mono">184.5 hrs</div>
              <div className="text-[10px] text-slate-500">Avg 3.8 hrs/day</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#111827]">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Consistency Level</div>
              <div className="text-2xl font-bold text-white font-mono">Top 5%</div>
              <div className="text-[10px] text-slate-500">Elite Momentum</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-base text-white flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-400" />
            365-Day Study Activity Matrix
          </CardTitle>
          <CardDescription>Each cell represents daily study intensity.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto pb-2">
            <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 p-2 bg-[#0B0F17] rounded-xl border border-[#1F293D]">
              {Array.from({ length: 52 * 7 }).map((_, i) => {
                const intensity = (i % 7 === 0 || i % 5 === 0) ? (i % 4) + 1 : (i % 3 === 0 ? 1 : 0);
                const colors = [
                  'bg-[#161F30]',
                  'bg-blue-950 border border-blue-800/40',
                  'bg-blue-800',
                  'bg-blue-600',
                  'bg-blue-400',
                ];
                return (
                  <div
                    key={i}
                    className={`h-3 w-3 rounded-sm ${colors[intensity]} transition-colors hover:ring-2 hover:ring-white cursor-pointer`}
                    title={`Activity day ${i + 1}`}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3">
            <span>Less</span>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-sm bg-[#161F30]" />
              <div className="h-2.5 w-2.5 rounded-sm bg-blue-950 border border-blue-800/40" />
              <div className="h-2.5 w-2.5 rounded-sm bg-blue-800" />
              <div className="h-2.5 w-2.5 rounded-sm bg-blue-600" />
              <div className="h-2.5 w-2.5 rounded-sm bg-blue-400" />
            </div>
            <span>More Study Time</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
