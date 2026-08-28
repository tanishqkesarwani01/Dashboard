import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Code2, Plus, Search, ExternalLink, RotateCcw, Check, Sparkles } from 'lucide-react';
import { DsaTopic, DsaProblem, Difficulty } from '@/types';
import { dsaService } from '@/services/dsaService';
import { AddProblemModal } from './AddProblemModal';
import { toast } from 'sonner';

export function DsaPage() {
  const [topics, setTopics] = useState<DsaTopic[]>([]);
  const [problems, setProblems] = useState<DsaProblem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [loadedTopics, loadedProblems] = await Promise.all([
          dsaService.getTopics(),
          dsaService.getProblems(),
        ]);
        setTopics(loadedTopics);
        setProblems(loadedProblems);
      } catch (err: any) {
        toast.error('Failed to load DSA data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleProblemAdded = (newProblem: DsaProblem) => {
    setProblems((prev) => [newProblem, ...prev]);
  };

  const handleMarkRevision = async (problemId: string, currentCount: number) => {
    const nextDate = dsaService.calculateNextRevisionDate(currentCount + 1);
    try {
      const updated = await dsaService.updateProblem(problemId, {
        revision_count: currentCount + 1,
        next_revision_at: nextDate,
        status: 'Mastered',
      });
      setProblems((prev) => prev.map((p) => (p.id === problemId ? updated : p)));
      toast.success(`Revision recorded! Next review scheduled on ${nextDate}`);
    } catch (err: any) {
      toast.error('Failed to record revision');
    }
  };

  const filteredProblems = problems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === 'All' || p.topic_id === selectedTopic;
    return matchesSearch && matchesDiff && matchesTopic;
  });

  const dueTodayProblems = problems.filter((p) => {
    if (!p.next_revision_at) return false;
    const today = new Date().toISOString().split('T')[0];
    return p.next_revision_at <= today;
  });

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">Core Mastery Engine</span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs font-mono text-zinc-400">{problems.length} Total Tracked</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            DSA Spaced Repetition Engine
          </h1>
          <p className="text-xs text-zinc-400">
            Log algorithmic patterns, track topic confidence, and review cards based on the Ebbinghaus forgetting curve.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 w-max"
        >
          <Plus className="h-4 w-4" /> Add Problem Card
        </button>
      </div>

      {/* Due Today Spaced Review Alert */}
      {dueTodayProblems.length > 0 && (
        <div className="p-4 rounded-xl hairline-card border-amber-500/30 bg-amber-500/[0.03] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <RotateCcw className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-amber-300 font-mono">
                {dueTodayProblems.length} Problems Due for Revision Today
              </div>
              <div className="text-[11px] text-zinc-400">
                Solidify these patterns today to guarantee recall during technical interviews.
              </div>
            </div>
          </div>
          <span className="text-xs font-mono text-amber-400 font-bold">INTERVAL DUE</span>
        </div>
      )}

      {/* Topic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {topics.slice(0, 6).map((topic) => {
          const topicProbs = problems.filter((p) => p.topic_id === topic.id);
          const solved = topicProbs.filter((p) => p.status !== 'Todo').length;
          const pct = topicProbs.length > 0 ? Math.round((solved / topicProbs.length) * 100) : 0;

          return (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(selectedTopic === topic.id ? 'All' : topic.id)}
              className={`p-4 rounded-xl hairline-card cursor-pointer transition-all space-y-3 ${
                selectedTopic === topic.id ? 'border-amber-500/50 bg-amber-500/[0.04]' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">{topic.category}</span>
                  <div className="text-xs font-semibold text-zinc-100">{topic.name}</div>
                </div>
                <span className="text-xs font-mono text-zinc-400">{solved} solved</span>
              </div>
              <div className="w-full h-1 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter & Catalog Table */}
      <div className="p-6 rounded-2xl hairline-card space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-zinc-500" />
              <Input
                placeholder="Search problem or platform..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-8 text-xs bg-[#090A0D] border-zinc-800 font-mono"
              />
            </div>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="h-8 rounded-lg border border-zinc-800 bg-[#090A0D] px-2.5 text-xs text-zinc-300 font-mono"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="text-xs font-mono text-zinc-500">
            Showing <strong className="text-zinc-200">{filteredProblems.length}</strong> catalog items
          </div>
        </div>

        {/* Problems Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[rgba(255,255,255,0.06)] text-zinc-500 font-mono text-[10px] uppercase">
              <tr>
                <th className="pb-3 font-semibold">Problem</th>
                <th className="pb-3 font-semibold">Platform</th>
                <th className="pb-3 font-semibold">Difficulty</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Next Scheduled Revision</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-zinc-300">
              {filteredProblems.map((prob) => (
                <tr key={prob.id} className="hover:bg-[#111418] transition-colors group">
                  <td className="py-3 font-medium text-zinc-100 flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${prob.difficulty === 'Hard' ? 'bg-rose-400' : prob.difficulty === 'Medium' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    <span>{prob.title}</span>
                  </td>
                  <td className="py-3 font-mono text-zinc-400">{prob.platform}</td>
                  <td className="py-3 font-mono">
                    <span className={`text-[11px] font-semibold ${prob.difficulty === 'Hard' ? 'text-rose-400' : prob.difficulty === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {prob.difficulty}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-zinc-400">
                    <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[10px]">
                      {prob.status}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-zinc-400">
                    {prob.next_revision_at || 'Not scheduled'}
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {prob.url && (
                        <a
                          href={prob.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 rounded text-zinc-500 hover:text-amber-400"
                          title="Open problem link"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => handleMarkRevision(prob.id, prob.revision_count || 0)}
                        className="px-2 py-0.5 rounded border border-zinc-700 bg-zinc-900 hover:bg-emerald-950/40 hover:border-emerald-500/40 hover:text-emerald-300 text-[11px] font-mono text-zinc-400 transition-all flex items-center gap-1"
                        title="Mark reviewed and schedule next interval"
                      >
                        <Check className="h-3 w-3" /> Reviewed
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddProblemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        topics={topics}
        onProblemAdded={handleProblemAdded}
      />
    </div>
  );
}
