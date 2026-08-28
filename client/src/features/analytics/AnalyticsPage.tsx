import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Award, Clock, PieChart } from 'lucide-react';

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="cyan" className="font-mono">ANALYTICS</Badge>
          <span className="text-xs text-slate-400">Mastery & Velocity</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
          Performance & Study Analytics
        </h1>
        <p className="text-xs text-slate-400">
          In-depth insights into your study distribution, problem-solving velocity, and retention rates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#111827]">
          <CardHeader>
            <CardTitle className="text-base text-white flex items-center gap-2">
              <PieChart className="h-4 w-4 text-blue-400" />
              DSA Difficulty Breakdown
            </CardTitle>
            <CardDescription>Distribution of solved problems by difficulty tier</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="text-emerald-400 font-semibold">Easy</span>
                <span className="font-mono">54 Problems (38%)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '38%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="text-amber-400 font-semibold">Medium</span>
                <span className="font-mono">72 Problems (51%)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '51%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="text-rose-400 font-semibold">Hard</span>
                <span className="font-mono">16 Problems (11%)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '11%' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#111827]">
          <CardHeader>
            <CardTitle className="text-base text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-400" />
              Weekly Study Distribution
            </CardTitle>
            <CardDescription>Time spent across core development domains</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="text-blue-400 font-semibold">DSA & Algorithms</span>
                <span className="font-mono">14.5 hrs (55%)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '55%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="text-cyan-400 font-semibold">Web Development</span>
                <span className="font-mono">8.0 hrs (30%)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '30%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="text-purple-400 font-semibold">Core CS (OS & DBMS)</span>
                <span className="font-mono">4.0 hrs (15%)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
