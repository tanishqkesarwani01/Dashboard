import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Calendar, Clock, Flame, CheckCircle2 } from 'lucide-react';
import { DailyLog } from '@/types';
import { habitService } from '@/services/habitService';
import { toast } from 'sonner';

interface LogStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogAdded: (log: DailyLog) => void;
}

export function LogStudyModal({ isOpen, onClose, onLogAdded }: LogStudyModalProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dsaHours, setDsaHours] = useState(2.0);
  const [devHours, setDevHours] = useState(1.5);
  const [coreCsHours, setCoreCsHours] = useState(0.5);
  const [problemsCount, setProblemsCount] = useState(3);
  const [summary, setSummary] = useState('');
  const [mood, setMood] = useState(5);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const totalHours = Number((Number(dsaHours) + Number(devHours) + Number(coreCsHours)).toFixed(2));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newLog = await habitService.logDailyStudy({
        date,
        total_hours: totalHours,
        dsa_hours: Number(dsaHours),
        dev_hours: Number(devHours),
        core_cs_hours: Number(coreCsHours),
        problems_solved_count: Number(problemsCount),
        summary: summary.trim() || 'Daily engineering study session',
        mood_or_rating: mood,
      });

      toast.success(`Logged ${totalHours} hours for ${date}! Streak updated.`);
      onLogAdded(newLog);
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to log study');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl hairline-card p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Record Daily Engineering Session</h3>
              <p className="text-[11px] text-zinc-400 font-mono">Updates your 365-day momentum matrix & streak</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-300">Session Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-[#090A0D] border-zinc-800 text-xs font-mono"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-300">Problems Solved Today</label>
              <Input
                type="number"
                min="0"
                value={problemsCount}
                onChange={(e) => setProblemsCount(Number(e.target.value))}
                className="bg-[#090A0D] border-zinc-800 text-xs font-mono"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#090A0D] border border-zinc-800/80 space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-300">Total Hours Tracked:</span>
              <span className="text-emerald-400 font-bold">{totalHours} hrs</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400">DSA Hours</label>
                <Input
                  type="number"
                  step="0.5"
                  min="0"
                  value={dsaHours}
                  onChange={(e) => setDsaHours(Number(e.target.value))}
                  className="bg-[#121418] border-zinc-800 text-xs font-mono h-8"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400">Web Dev Hours</label>
                <Input
                  type="number"
                  step="0.5"
                  min="0"
                  value={devHours}
                  onChange={(e) => setDevHours(Number(e.target.value))}
                  className="bg-[#121418] border-zinc-800 text-xs font-mono h-8"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400">Core CS Hours</label>
                <Input
                  type="number"
                  step="0.5"
                  min="0"
                  value={coreCsHours}
                  onChange={(e) => setCoreCsHours(Number(e.target.value))}
                  className="bg-[#121418] border-zinc-800 text-xs font-mono h-8"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-300">Session Takeaways / Accomplishments</label>
            <textarea
              rows={2}
              placeholder="e.g. Mastered binary search on rotated array, built REST authentication middleware in Express..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-[#090A0D] p-2.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
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
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all"
            >
              {loading ? 'Logging...' : 'Save Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
