import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Code2, Sparkles, ExternalLink } from 'lucide-react';
import { DsaProblem, DsaTopic, Difficulty, Platform, ProblemStatus } from '@/types';
import { dsaService } from '@/services/dsaService';
import { toast } from 'sonner';

interface AddProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  topics: DsaTopic[];
  onProblemAdded: (problem: DsaProblem) => void;
}

export function AddProblemModal({ isOpen, onClose, topics, onProblemAdded }: AddProblemModalProps) {
  const [title, setTitle] = useState('');
  const [topicId, setTopicId] = useState(topics[0]?.id || '1');
  const [platform, setPlatform] = useState<Platform>('LeetCode');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [status, setStatus] = useState<ProblemStatus>('Solved');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [confidence, setConfidence] = useState(3);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Problem title is required');
      return;
    }

    setLoading(true);
    try {
      const nextRevision = dsaService.calculateNextRevisionDate(0);
      const newProblem = await dsaService.addProblem({
        title: title.trim(),
        topic_id: topicId,
        platform,
        difficulty,
        status,
        url: url.trim() || undefined,
        notes: notes.trim() || undefined,
        confidence_score: confidence,
        next_revision_at: nextRevision,
        revision_count: 0,
        solved_at: status !== 'Todo' ? new Date().toISOString() : undefined,
      });

      toast.success(`Problem added! Scheduled for review on ${nextRevision}`);
      onProblemAdded(newProblem);
      onClose();
      // Reset
      setTitle('');
      setUrl('');
      setNotes('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to add problem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl hairline-card p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Code2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Log Algorithmic Problem</h3>
              <p className="text-[11px] text-zinc-400 font-mono">Spaced repetition interval will be scheduled automatically</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-300">Problem Title *</label>
            <Input
              placeholder="e.g. 3Sum Closest or Course Schedule II"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#090A0D] border-zinc-800 text-xs"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-300">Topic Syllabus</label>
              <select
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                className="w-full h-9 rounded-lg border border-zinc-800 bg-[#090A0D] px-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              >
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-300">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                className="w-full h-9 rounded-lg border border-zinc-800 bg-[#090A0D] px-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              >
                <option value="LeetCode">LeetCode</option>
                <option value="GeeksforGeeks">GeeksforGeeks</option>
                <option value="Codeforces">Codeforces</option>
                <option value="HackerRank">HackerRank</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-300">Difficulty</label>
              <div className="flex gap-1.5">
                {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      difficulty === d
                        ? d === 'Easy'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                          : d === 'Medium'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                        : 'bg-[#090A0D] border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-300">Confidence Rating (1-5)</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setConfidence(score)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono ${
                      confidence >= score ? 'bg-amber-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-300">Problem URL (Optional)</label>
            <Input
              placeholder="https://leetcode.com/problems/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-[#090A0D] border-zinc-800 text-xs font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-300">Key Takeaways & Complexity Notes</label>
            <textarea
              rows={2}
              placeholder="e.g. Optimal approach uses monotonic stack with O(N) time and O(N) auxiliary space..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-[#090A0D] p-2.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[rgba(255,255,255,0.06)]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
            >
              {loading ? 'Saving...' : 'Add to Revision Queue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
