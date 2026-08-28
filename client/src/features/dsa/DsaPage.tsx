import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Code2, Plus, Search, Filter, ExternalLink, Calendar, CheckCircle2, RotateCcw } from 'lucide-react';
import { DsaTopic, DsaProblem } from '@/types';

export function DsaPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const mockTopics: DsaTopic[] = [
    { id: '1', name: 'Arrays & Two Pointers', category: 'Data Structures', order_index: 1, problem_count: 25, solved_count: 18 },
    { id: '2', name: 'Sliding Window', category: 'Algorithms', order_index: 2, problem_count: 14, solved_count: 10 },
    { id: '3', name: 'Binary Trees & BST', category: 'Data Structures', order_index: 3, problem_count: 30, solved_count: 22 },
    { id: '4', name: 'Dynamic Programming', category: 'Algorithms', order_index: 4, problem_count: 40, solved_count: 15 },
    { id: '5', name: 'Graph Algorithms', category: 'Algorithms', order_index: 5, problem_count: 28, solved_count: 12 },
  ];

  const mockProblems: DsaProblem[] = [
    {
      id: 'p1',
      topic_id: '1',
      title: 'Two Sum II - Input Array Is Sorted',
      platform: 'LeetCode',
      difficulty: 'Medium',
      status: 'Mastered',
      confidence_score: 5,
      next_revision_at: '2026-09-04',
      revision_count: 3,
      url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
    },
    {
      id: 'p2',
      topic_id: '4',
      title: '0/1 Knapsack Problem',
      platform: 'GeeksforGeeks',
      difficulty: 'Medium',
      status: 'Solved',
      confidence_score: 3,
      next_revision_at: '2026-08-29',
      revision_count: 1,
      url: 'https://practice.geeksforgeeks.org',
    },
    {
      id: 'p3',
      topic_id: '3',
      title: 'Lowest Common Ancestor of a Binary Tree',
      platform: 'LeetCode',
      difficulty: 'Medium',
      status: 'Solved',
      confidence_score: 4,
      next_revision_at: '2026-09-01',
      revision_count: 2,
      url: 'https://leetcode.com',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="font-mono">MODULE</Badge>
            <span className="text-xs text-slate-400">DSA & Algorithms</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Data Structures & Algorithms Tracker
          </h1>
          <p className="text-xs text-slate-400">
            Track topic mastery, log problem solutions, and schedule spaced repetition revisions.
          </p>
        </div>

        <Button variant="primary" className="gap-2">
          <Plus className="h-4 w-4" /> Add Problem
        </Button>
      </div>

      <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <RotateCcw className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-rose-200">Spaced Repetition Trigger Active</div>
            <div className="text-[11px] text-slate-300">
              Problems are automatically scheduled for 1, 3, 7, 14, and 30-day review cycles.
            </div>
          </div>
        </div>
        <Badge variant="danger">Auto-Interval Engine</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockTopics.map((topic) => {
          const pct = Math.round(((topic.solved_count || 0) / (topic.problem_count || 1)) * 100);
          return (
            <Card key={topic.id} className="hover:border-blue-500/40 transition-all bg-[#111827]">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-500">{topic.category}</span>
                    <h3 className="text-sm font-semibold text-slate-100">{topic.name}</h3>
                  </div>
                  <Badge variant="secondary">{pct}%</Badge>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{topic.solved_count} solved</span>
                  <span>{topic.problem_count} total</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-[#111827]">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-base text-white">Logged Problem Catalog</CardTitle>
            <CardDescription>All tracked algorithmic problems and their next revision dates</CardDescription>
          </div>
          <div className="relative w-48">
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-slate-500" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-8 text-xs bg-[#0B0F17]"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#1F293D] text-slate-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="pb-2.5 font-semibold">Problem Title</th>
                  <th className="pb-2.5 font-semibold">Platform</th>
                  <th className="pb-2.5 font-semibold">Difficulty</th>
                  <th className="pb-2.5 font-semibold">Status</th>
                  <th className="pb-2.5 font-semibold">Next Revision</th>
                  <th className="pb-2.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F293D]/60 text-slate-300">
                {mockProblems.map((prob) => (
                  <tr key={prob.id} className="hover:bg-[#161F30]/40 transition-colors">
                    <td className="py-3 font-medium text-slate-100 flex items-center gap-2">
                      <Code2 className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                      <span>{prob.title}</span>
                    </td>
                    <td className="py-3 text-slate-400">{prob.platform}</td>
                    <td className="py-3">
                      <Badge variant={prob.difficulty === 'Easy' ? 'success' : prob.difficulty === 'Medium' ? 'warning' : 'danger'}>
                        {prob.difficulty}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge variant={prob.status === 'Mastered' ? 'cyan' : 'secondary'}>
                        {prob.status}
                      </Badge>
                    </td>
                    <td className="py-3 font-mono text-slate-400">{prob.next_revision_at}</td>
                    <td className="py-3 text-right">
                      {prob.url && (
                        <a
                          href={prob.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium"
                        >
                          Solve <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
