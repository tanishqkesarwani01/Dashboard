import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Github, ExternalLink } from 'lucide-react';
import { Project } from '@/types';

export function ProjectsPage() {
  const mockProjects: Project[] = [
    {
      id: 'proj1',
      title: 'CareerOS Developer Dashboard',
      tagline: 'All-in-one developer career operating system & syllabus tracker',
      description: 'Production-grade full-stack dashboard with spaced repetition DSA, custom schema engine, and Google Gemini AI copilot.',
      tech_stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
      github_url: 'https://github.com/tanishqkesarwani01/CareerOs',
      live_url: 'https://career-os-career-dashboard.vercel.app/',
      status: 'In Progress',
      milestones: [
        { id: 'm1', title: 'Monorepo Architecture Scaffolding', completed: true },
        { id: 'm2', title: 'PostgreSQL Schema & RLS Policies', completed: true },
        { id: 'm3', title: 'DSA Spaced Repetition Engine', completed: true },
        { id: 'm4', title: 'Gemini AI Copilot Integration', completed: false },
      ],
      created_at: new Date().toISOString(),
    },
    {
      id: 'proj2',
      title: 'Distributed Rate Limiter & Token Bucket',
      tagline: 'High-throughput Redis-backed API gateway limiter',
      description: 'Engineered sliding window and token bucket algorithms to prevent API abuse and handle 10,000+ RPS.',
      tech_stack: ['Node.js', 'Redis', 'Docker', 'Express', 'Jest'],
      github_url: 'https://github.com',
      status: 'Completed',
      milestones: [
        { id: 'm1', title: 'Redis Lua Script Implementation', completed: true },
        { id: 'm2', title: 'Benchmark Load Testing', completed: true },
      ],
      created_at: new Date().toISOString(),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="purple" className="font-mono">PORTFOLIO</Badge>
            <span className="text-xs text-slate-400">Engineering Hub</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Projects & Portfolio Hub
          </h1>
          <p className="text-xs text-slate-400">
            Showcase production-grade side projects, milestones, tech stacks, and live deployments.
          </p>
        </div>

        <Button variant="primary" className="gap-2">
          <Plus className="h-4 w-4" /> Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockProjects.map((proj) => {
          const completedCount = proj.milestones.filter((m) => m.completed).length;
          const pct = Math.round((completedCount / proj.milestones.length) * 100);

          return (
            <Card key={proj.id} className="bg-[#111827] flex flex-col justify-between hover:border-blue-500/40 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant={proj.status === 'Completed' ? 'success' : 'cyan'}>
                    {proj.status}
                  </Badge>
                  <div className="flex items-center gap-2">
                    {proj.github_url && (
                      <a href={proj.github_url} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {proj.live_url && (
                      <a href={proj.live_url} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg text-white mt-2">{proj.title}</CardTitle>
                <CardDescription>{proj.tagline}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech_stack.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161F30] border border-[#1F293D] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="space-y-2 pt-2 border-t border-[#1F293D]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-400">Milestones</span>
                    <span className="font-mono text-slate-400">{completedCount}/{proj.milestones.length} ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
