import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Github, ExternalLink, CheckCircle2, Circle, FolderGit2 } from 'lucide-react';
import { Project } from '@/types';
import { projectService } from '@/services/projectService';
import { AddProjectModal } from './AddProjectModal';
import { toast } from 'sonner';

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      try {
        const loaded = await projectService.getProjects();
        setProjects(loaded);
      } catch (err: any) {
        toast.error('Failed to load projects');
      }
    }
    loadProjects();
  }, []);

  const handleProjectAdded = (newProj: Project) => {
    setProjects((prev) => [newProj, ...prev]);
  };

  const handleToggleMilestone = (projectId: string, milestoneId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const updatedMilestones = proj.milestones.map((m) =>
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        const allCompleted = updatedMilestones.every((m) => m.completed);
        return {
          ...proj,
          milestones: updatedMilestones,
          status: allCompleted ? 'Completed' : 'In Progress',
        };
      })
    );
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Engineering Portfolio</span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs font-mono text-zinc-400">{projects.length} Repositories Tracked</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Project Artifacts & Architecture Hub
          </h1>
          <p className="text-xs text-zinc-400">
            Showcase production-grade side projects, milestones, tech stacks, and live deployments for tech recruiters.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 w-max"
        >
          <Plus className="h-4 w-4" /> Add Project Artifact
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((proj) => {
          const completedCount = proj.milestones.filter((m) => m.completed).length;
          const pct = proj.milestones.length > 0 ? Math.round((completedCount / proj.milestones.length) * 100) : 0;

          return (
            <div key={proj.id} className="p-6 rounded-2xl hairline-card space-y-5 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    proj.status === 'Completed'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                  }`}>
                    {proj.status}
                  </span>

                  <div className="flex items-center gap-2">
                    {proj.github_url && (
                      <a href={proj.github_url} target="_blank" rel="noreferrer" className="p-1 rounded text-zinc-500 hover:text-white" title="GitHub Repo">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {proj.live_url && (
                      <a href={proj.live_url} target="_blank" rel="noreferrer" className="p-1 rounded text-zinc-500 hover:text-cyan-400" title="Live Preview">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {proj.title}
                  </h3>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5">{proj.tagline}</div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">{proj.description}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.tech_stack.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#090A0D] border border-zinc-800 text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Milestones Checklist */}
              <div className="space-y-2.5 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Milestone Velocity</span>
                  <span className="text-zinc-300">{completedCount}/{proj.milestones.length} ({pct}%)</span>
                </div>
                <div className="w-full h-1 rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
                </div>

                <div className="space-y-1 pt-1">
                  {proj.milestones.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => handleToggleMilestone(proj.id, m.id)}
                      className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 cursor-pointer select-none py-0.5"
                    >
                      {m.completed ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Circle className="h-3.5 w-3.5 text-zinc-600 flex-shrink-0" />
                      )}
                      <span className={m.completed ? 'line-through text-zinc-600 font-mono text-[11px]' : 'text-zinc-300'}>
                        {m.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectAdded={handleProjectAdded}
      />
    </div>
  );
}
