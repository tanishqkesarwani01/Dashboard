import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Circle, Clock, BookOpen, Layers, Award } from 'lucide-react';
import { toast } from 'sonner';

interface TopicItem {
  id: string;
  name: string;
  completed: boolean;
}

interface ModuleSection {
  id: string;
  title: string;
  topics: TopicItem[];
}

export function CurriculumPage({ trackType }: { trackType: 'webdev' | 'corecs' }) {
  const isWebDev = trackType === 'webdev';

  const initialWebDev: ModuleSection[] = [
    {
      id: 'm1',
      title: 'HTML5 Semantic Tags & Web Standards',
      topics: [
        { id: 'w1', name: 'Document Structure & Semantic Elements', completed: true },
        { id: 'w2', name: 'Form Validation & FormData API', completed: true },
        { id: 'w3', name: 'ARIA Accessibility & Screen Readers', completed: true },
        { id: 'w4', name: 'Web Storage (LocalStorage, SessionStorage, IndexedDB)', completed: false },
      ],
    },
    {
      id: 'm2',
      title: 'Modern CSS3, Grid & Tailwind Engine',
      topics: [
        { id: 'w5', name: 'Flexbox Alignment & Justification Rules', completed: true },
        { id: 'w6', name: 'CSS Grid Auto-Fit, MinMax & Layouts', completed: true },
        { id: 'w7', name: 'Responsive Breakpoints & Mobile-First Strategy', completed: false },
        { id: 'w8', name: 'Tailwind Design System Tokens & Transitions', completed: false },
      ],
    },
    {
      id: 'm3',
      title: 'JavaScript Mastery (ES6+ & Async Concurrency)',
      topics: [
        { id: 'w9', name: 'Closures, Lexical Scope & Execution Context', completed: true },
        { id: 'w10', name: 'Event Loop, Microtasks & Macrotasks', completed: false },
        { id: 'w11', name: 'Promises, Async/Await & Error Handling', completed: false },
        { id: 'w12', name: 'Prototypes & Object-Oriented JS', completed: false },
      ],
    },
    {
      id: 'm4',
      title: 'React.js State & Architecture',
      topics: [
        { id: 'w13', name: 'Component Lifecycle & Hooks Rules', completed: true },
        { id: 'w14', name: 'Zustand & Context API Store Patterns', completed: false },
        { id: 'w15', name: 'TanStack Query Server-State Caching', completed: false },
        { id: 'w16', name: 'Performance Memoization (useMemo, useCallback)', completed: false },
      ],
    },
    {
      id: 'm5',
      title: 'Node.js & Scalable Express Architecture',
      topics: [
        { id: 'w17', name: 'RESTful API Routing & Controller Pattern', completed: true },
        { id: 'w18', name: 'JWT & OAuth Authentication Flow', completed: false },
        { id: 'w19', name: 'PostgreSQL Relational Schema & Supabase Integration', completed: false },
        { id: 'w20', name: 'Rate Limiting, Helmet & Security Headers', completed: false },
      ],
    },
  ];

  const initialCoreCs: ModuleSection[] = [
    {
      id: 'c1',
      title: 'Operating Systems (OS)',
      topics: [
        { id: 'cs1', name: 'Process vs Thread, PCB & Context Switching', completed: true },
        { id: 'cs2', name: 'CPU Scheduling Algorithms (Round Robin, SJF)', completed: true },
        { id: 'cs3', name: 'Deadlocks, Mutex & Semaphores', completed: false },
        { id: 'cs4', name: 'Virtual Memory, Paging & Page Replacement (LRU)', completed: false },
      ],
    },
    {
      id: 'c2',
      title: 'Database Management Systems (DBMS)',
      topics: [
        { id: 'cs5', name: 'Relational Model, Keys & Normalization (1NF - BCNF)', completed: true },
        { id: 'cs6', name: 'ACID Properties & Transaction Isolation Levels', completed: false },
        { id: 'cs7', name: 'B-Tree & Hash Indexing Internals', completed: false },
        { id: 'cs8', name: 'Query Execution Plans & Optimization', completed: false },
      ],
    },
    {
      id: 'c3',
      title: 'Computer Networks (CN)',
      topics: [
        { id: 'cs9', name: 'OSI 7-Layer Model & Encapsulation', completed: true },
        { id: 'cs10', name: 'TCP 3-Way Handshake & Flow Control', completed: false },
        { id: 'cs11', name: 'HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)', completed: false },
        { id: 'cs12', name: 'DNS Resolution & CDN Edge Caching', completed: false },
      ],
    },
    {
      id: 'c4',
      title: 'System Design Fundamentals',
      topics: [
        { id: 'cs13', name: 'Horizontal vs Vertical Scaling & Load Balancers', completed: false },
        { id: 'cs14', name: 'Caching Strategies (Cache-Aside, Write-Back)', completed: false },
        { id: 'cs15', name: 'Database Sharding, Replication & CAP Theorem', completed: false },
        { id: 'cs16', name: 'Message Queues (Kafka, RabbitMQ) & Asynchrony', completed: false },
      ],
    },
  ];

  const [modules, setModules] = useState<ModuleSection[]>(isWebDev ? initialWebDev : initialCoreCs);

  const toggleTopic = (modId: string, topicId: string) => {
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id !== modId) return mod;
        const updatedTopics = mod.topics.map((t) =>
          t.id === topicId ? { ...t, completed: !t.completed } : t
        );
        const allDoneNow = updatedTopics.every((t) => t.completed);
        const wasDoneBefore = mod.topics.every((t) => t.completed);

        if (allDoneNow && !wasDoneBefore) {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
          });
          toast.success(`🎉 Module "${mod.title}" Completed!`);
        }

        return { ...mod, topics: updatedTopics };
      })
    );
  };

  const totalTopics = modules.reduce((acc, m) => acc + m.topics.length, 0);
  const completedTopics = modules.reduce(
    (acc, m) => acc + m.topics.filter((t) => t.completed).length,
    0
  );
  const overallPct = Math.round((completedTopics / totalTopics) * 100);

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
              {isWebDev ? 'Engineering Track' : 'Foundational Computer Science'}
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs font-mono text-zinc-400">{completedTopics} of {totalTopics} Completed ({overallPct}%)</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {isWebDev ? 'Full-Stack Web Engineering Roadmap' : 'Core Computer Science Syllabi'}
          </h1>
          <p className="text-xs text-zinc-400">
            Interactive syllabus breakdown structured directly around high-frequency technical interview questions.
          </p>
        </div>

        {/* Global Progress Bar */}
        <div className="w-48 space-y-1.5 p-3 rounded-xl hairline-card">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-zinc-400">Mastery</span>
            <span className="text-amber-400 font-bold">{overallPct}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full transition-all duration-300" style={{ width: `${overallPct}%` }} />
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((mod, idx) => {
          const done = mod.topics.filter((t) => t.completed).length;
          const pct = Math.round((done / mod.topics.length) * 100);

          return (
            <div key={mod.id} className="p-5 rounded-2xl hairline-card space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-6 w-6 rounded-md bg-zinc-800 border border-zinc-700 font-mono text-xs flex items-center justify-center text-zinc-300">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-tight">{mod.title}</h3>
                    <div className="text-[10px] font-mono text-zinc-500">{done}/{mod.topics.length} topics mastered</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400">{pct}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {mod.topics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => toggleTopic(mod.id, topic.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                      topic.completed
                        ? 'border-emerald-500/30 bg-emerald-500/[0.04] text-zinc-300'
                        : 'border-[rgba(255,255,255,0.06)] bg-[#0C0E11] hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {topic.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-zinc-600 flex-shrink-0" />
                      )}
                      <span className={`text-xs ${topic.completed ? 'text-zinc-200 font-medium' : ''}`}>
                        {topic.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-600">
                      {topic.completed ? 'COMPLETED' : 'PENDING'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
