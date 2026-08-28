import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

export function CurriculumPage({ trackType }: { trackType: 'webdev' | 'corecs' }) {
  const isWebDev = trackType === 'webdev';

  const webDevModules = [
    { title: 'HTML5 & Semantic Structure', topics: ['Tags & DOM Structure', 'Forms & Validations', 'Web Accessibility (ARIA)', 'Storage (LocalStorage, SessionStorage)'] },
    { title: 'Modern CSS3 & Responsive Design', topics: ['Flexbox & Grid', 'Media Queries', 'Tailwind CSS Utility Systems', 'Animations & Transitions'] },
    { title: 'JavaScript Mastery (ES6+)', topics: ['Closures & Scope', 'Async/Await & Promises', 'Event Loop & Concurrency', 'DOM API & Manipulation'] },
    { title: 'React.js & State Management', topics: ['Component Lifecycle & Hooks', 'Context API & Zustand', 'TanStack Query Data Caching', 'Performance Optimization'] },
    { title: 'Node.js & Backend Architecture', topics: ['Express REST APIs', 'Authentication & JWT/OAuth', 'PostgreSQL & Supabase Integration', 'Rate Limiting & Security'] },
  ];

  const coreCsModules = [
    { title: 'Operating Systems', topics: ['Processes vs Threads', 'CPU Scheduling Algorithms', 'Deadlocks & Synchronization', 'Virtual Memory & Paging'] },
    { title: 'Database Management Systems (DBMS)', topics: ['ACID Properties', 'Indexing & B-Trees', 'SQL vs NoSQL trade-offs', 'Normalization (1NF to 3NF)'] },
    { title: 'Computer Networks', topics: ['OSI & TCP/IP Model', 'HTTP/1.1 vs HTTP/2 vs HTTP/3', 'DNS Resolution & CDN', 'WebSockets & TCP Handshake'] },
    { title: 'System Design Fundamentals', topics: ['Load Balancers & Caching', 'Database Sharding & Replication', 'CAP Theorem', 'Message Queues (Kafka, RabbitMQ)'] },
  ];

  const currentList = isWebDev ? webDevModules : coreCsModules;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="cyan" className="font-mono">CURRICULUM</Badge>
          <span className="text-xs text-slate-400">{isWebDev ? 'Engineering Track' : 'Foundational CS'}</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
          {isWebDev ? 'Full-Stack Web Development Roadmap' : 'Core Computer Science Syllabi'}
        </h1>
        <p className="text-xs text-slate-400">
          Structured syllabus items designed around high-frequency technical interview questions.
        </p>
      </div>

      <div className="space-y-4">
        {currentList.map((mod, idx) => (
          <Card key={idx} className="bg-[#111827]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-slate-100 flex items-center justify-between">
                <span>{mod.title}</span>
                <Badge variant="secondary">Module {idx + 1}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {mod.topics.map((topic, tIdx) => (
                  <div
                    key={tIdx}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#0B0F17] border border-[#1F293D] hover:border-blue-500/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-xs font-medium text-slate-300 group-hover:text-white">{topic}</span>
                    </div>
                    <Badge variant="outline" className="text-[10px]">Ready</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
