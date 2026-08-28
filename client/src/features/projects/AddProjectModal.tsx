import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { X, FolderGit2, Plus, Trash2 } from 'lucide-react';
import { Project, ProjectStatus } from '@/types';
import { projectService } from '@/services/projectService';
import { toast } from 'sonner';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdded: (proj: Project) => void;
}

export function AddProjectModal({ isOpen, onClose, onProjectAdded }: AddProjectModalProps) {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [techStackInput, setTechStackInput] = useState('React, TypeScript, Node.js, Express, PostgreSQL');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('In Progress');
  const [milestones, setMilestones] = useState<string[]>([
    'Database Schema & RLS Setup',
    'Core Business API Endpoints',
    'Frontend UI & State Integration',
  ]);
  const [newMilestone, setNewMilestone] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAddMilestone = () => {
    if (!newMilestone.trim()) return;
    setMilestones((prev) => [...prev, newMilestone.trim()]);
    setNewMilestone('');
  };

  const handleRemoveMilestone = (index: number) => {
    setMilestones((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Project title is required');
      return;
    }

    setLoading(true);
    try {
      const parsedTech = techStackInput.split(',').map((t) => t.trim()).filter(Boolean);
      const parsedMilestones = milestones.map((m, i) => ({
        id: `m_${i}`,
        title: m,
        completed: false,
      }));

      const newProj = await projectService.createProject({
        title: title.trim(),
        tagline: tagline.trim(),
        description: description.trim(),
        tech_stack: parsedTech,
        github_url: githubUrl.trim() || undefined,
        live_url: liveUrl.trim() || undefined,
        status,
        milestones: parsedMilestones,
      });

      toast.success(`Project "${newProj.title}" created successfully!`);
      onProjectAdded(newProj);
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl hairline-card p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <FolderGit2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Add Portfolio Project</h3>
              <p className="text-[11px] text-zinc-400 font-mono">Showcase milestones, architecture & tech stack</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-300">Project Title *</label>
            <Input
              placeholder="e.g. Distributed Rate Limiter with Redis"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#090A0D] border-zinc-800 text-xs"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-300">Tagline / One-liner</label>
            <Input
              placeholder="e.g. High-throughput Token Bucket API Gateway in Node.js"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="bg-[#090A0D] border-zinc-800 text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-300">Tech Stack (Comma-separated)</label>
            <Input
              placeholder="React, TypeScript, Node.js, PostgreSQL, Docker"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              className="bg-[#090A0D] border-zinc-800 text-xs font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-300">GitHub Repository URL</label>
              <Input
                placeholder="https://github.com/..."
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="bg-[#090A0D] border-zinc-800 text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-300">Live Demo URL</label>
              <Input
                placeholder="https://myproject.vercel.app"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="bg-[#090A0D] border-zinc-800 text-xs font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-300">Project Milestones</label>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {milestones.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#090A0D] border border-zinc-800 text-xs text-zinc-300">
                  <span>{m}</span>
                  <button type="button" onClick={() => handleRemoveMilestone(idx)} className="text-zinc-500 hover:text-rose-400">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="New milestone..."
                value={newMilestone}
                onChange={(e) => setNewMilestone(e.target.value)}
                className="bg-[#090A0D] border-zinc-800 text-xs"
              />
              <button
                type="button"
                onClick={handleAddMilestone}
                className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 text-xs font-mono text-zinc-200"
              >
                + Add
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[rgba(255,255,255,0.06)]">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
