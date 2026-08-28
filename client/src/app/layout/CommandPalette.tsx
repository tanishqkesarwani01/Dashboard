import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useUIStore } from '@/stores/useUIStore';
import { Search, Code2, BookOpen, Database, FolderGit2, Sparkles, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CommandPalette() {
  const { isCommandPaletteOpen, setCommandPaletteOpen, setAiDrawerOpen } = useUIStore();
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const quickActions = [
    { label: 'DSA Spaced Repetition Tracker', path: '/dsa', icon: Code2, category: 'Learning' },
    { label: 'Web Development Syllabus', path: '/curriculum/webdev', icon: BookOpen, category: 'Learning' },
    { label: 'Core CS (OS, DBMS, CN)', path: '/curriculum/corecs', icon: Database, category: 'Learning' },
    { label: 'Daily Study Logs & Heatmap', path: '/habits', icon: BookOpen, category: 'Consistency' },
    { label: 'Projects & Portfolio Hub', path: '/projects', icon: FolderGit2, category: 'Portfolio' },
    { label: 'Custom Modules & Schemas', path: '/custom-modules', icon: Database, category: 'Extensibility' },
  ];

  const filtered = quickActions.filter((a) =>
    a.label.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (path: string) => {
    setLocation(path);
    setCommandPaletteOpen(false);
    setSearch('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-2xl border border-[#1F293D] bg-[#111827] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Input bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#1F293D] gap-3">
          <Search className="h-5 w-5 text-blue-400" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search modules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(item.path)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs text-slate-300 hover:text-white hover:bg-blue-600/10 hover:border-blue-500/20 border border-transparent transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#1A2333] border border-[#1F293D] flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/40 transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200 group-hover:text-white">{item.label}</div>
                    <div className="text-[10px] text-slate-500">{item.category}</div>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </button>
            );
          })}

          {/* Ask AI in palette */}
          <button
            onClick={() => {
              setCommandPaletteOpen(false);
              setAiDrawerOpen(true);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-purple-300 hover:bg-purple-900/40 text-xs font-semibold transition-all mt-2"
          >
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span>Ask AI Copilot for hints or concept explanation...</span>
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#0B0F17] border-t border-[#1F293D] flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Navigation Quick Jump</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
