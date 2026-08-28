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
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  FolderGit2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function DashboardOverview() {
  const { profile } = useAuthStore();
  const { setAiDrawerOpen } = useUIStore();

  const kpis = [
    {
      title: 'DSA Solved',
      value: '142',
      change: '+12 this week',
      icon: Code2,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      title: 'Active Streak',
      value: '7 Days',
      change: 'Personal best: 14',
      icon: Flame,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    {
      title: 'Study Hours',
      value: '26.5 hrs',
      change: 'Goal: 30 hrs/wk',
      icon: Clock,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      title: 'Spaced Reviews Due',
      value: '4 Topics',
      change: 'Scheduled today',
      icon: AlertCircle,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
    },
  ];

  const dueReviews = [
    { topic: 'Binary Search (Rotated Array)', interval: 'Day 7 Revision', confidence: 'Medium' },
    { topic: 'Dynamic Programming (Knapsack 0/1)', interval: 'Day 14 Revision', confidence: 'Hard' },
    { topic: 'Graph BFS & Topological Sort', interval: 'Day 3 Revision', confidence: 'Medium' },
    { topic: 'Database Indexing & B-Trees', interval: 'Day 7 Revision', confidence: 'Easy' },
  ];

  const tracks = [
    { title: 'Data Structures & Algorithms', progress: 68, count: '142 / 210 Solved', color: 'bg-blue-500', path: '/dsa' },
    { title: 'Full-Stack Web Development', progress: 84, count: '38 / 45 Topics', color: 'bg-cyan-500', path: '/curriculum/webdev' },
    { title: 'Core Computer Science (OS & DBMS)', progress: 52, count: '16 / 30 Topics', color: 'bg-purple-500', path: '/curriculum/corecs' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-[#10192E] via-[#111827] to-[#151226] p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="cyan" className="font-mono">PHASE 1 ACTIVE</Badge>
              <span className="text-xs text-slate-400">Target Role: <strong className="text-slate-200">{profile?.target_role || 'Full-Stack Engineer'}</strong></span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Engineer'} 👋
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              You have <span className="text-rose-400 font-semibold">4 spaced repetition topics</span> due for revision today. Keep your 7-day momentum going!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dsa">
              <Button variant="primary" className="gap-2">
                <Code2 className="h-4 w-4" /> Start DSA Practice
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => setAiDrawerOpen(true)}
              className="gap-2 border-purple-500/30 text-purple-300 hover:bg-purple-950/40"
            >
              <Sparkles className="h-4 w-4 text-purple-400" /> Ask AI Copilot
            </Button>
          </div>
        </div>

        {/* Decorative Background Glows */}
        <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="border-[#1F293D] bg-[#111827]/90 hover:border-slate-700 transition-all">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-xs font-medium text-slate-400">{kpi.title}</div>
                  <div className="text-2xl font-bold text-white tracking-tight font-mono">{kpi.value}</div>
                  <div className="text-[11px] text-slate-500">{kpi.change}</div>
                </div>
                <div className={`h-11 w-11 rounded-xl ${kpi.bg} ${kpi.border} border flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Spaced Repetition Due & Syllabi Progress */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-[#1F293D] bg-[#111827]">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base flex items-center gap-2 text-white">
                  <AlertCircle className="h-4 w-4 text-rose-400" />
                  Spaced Repetition Reviews Due Today
                </CardTitle>
                <CardDescription>
                  Revise these topics to solidify algorithmic patterns in long-term memory.
                </CardDescription>
              </div>
              <Link href="/dsa">
                <Button variant="ghost" size="sm" className="text-xs text-blue-400 hover:text-blue-300 gap-1">
                  View All <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {dueReviews.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F17] border border-[#1F293D] hover:border-blue-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 text-xs font-mono">
                      #{idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                        {item.topic}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-2">
                        <span>{item.interval}</span>
                        <span>•</span>
                        <span className={item.confidence === 'Hard' ? 'text-rose-400' : 'text-amber-400'}>
                          {item.confidence} Difficulty
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link href="/dsa">
                    <Button size="sm" variant="outline" className="text-xs h-7 px-3 text-slate-300 hover:text-white">
                      Solve & Review
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-[#1F293D] bg-[#111827]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-white">
                <BookOpen className="h-4 w-4 text-cyan-400" />
                Curriculum Tracks & Mastery
              </CardTitle>
              <CardDescription>
                Track completion across technical pillars required for software engineering roles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tracks.map((track, idx) => (
                <div key={idx} className="space-y-2 p-3.5 rounded-xl bg-[#0B0F17] border border-[#1F293D]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{track.title}</span>
                    <span className="font-mono text-slate-400">{track.count} ({track.progress}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full ${track.color} rounded-full transition-all duration-500`}
                      style={{ width: `${track.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: Quick Actions & Pro Tip */}
        <div className="space-y-6">
          <Card className="border-[#1F293D] bg-[#111827]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-white">
                <Zap className="h-4 w-4 text-amber-400" /> Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              <Link href="/habits" className="block">
                <div className="p-3 rounded-xl bg-[#0B0F17] border border-[#1F293D] hover:border-emerald-500/40 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <CalendarCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-emerald-400">Log Daily Study</div>
                      <div className="text-[10px] text-slate-500">Record today's study hours</div>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>

              <Link href="/projects" className="block">
                <div className="p-3 rounded-xl bg-[#0B0F17] border border-[#1F293D] hover:border-blue-500/40 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <FolderGit2 className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-blue-400">Portfolio Projects</div>
                      <div className="text-[10px] text-slate-500">Manage side project milestones</div>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>

              <div
                onClick={() => setAiDrawerOpen(true)}
                className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 hover:border-purple-500/40 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-purple-300 group-hover:text-white">AI Mock Interviewer</div>
                    <div className="text-[10px] text-purple-400/70">Test your CS knowledge</div>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-purple-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </CardContent>
          </Card>

          <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-950/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
              <Award className="h-4 w-4 text-indigo-400" /> Pro Interview Tip
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              When explaining DSA solutions in interviews, always state the brute-force time complexity first before jumping directly to optimal $O(N \log N)$ or $O(N)$ solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
