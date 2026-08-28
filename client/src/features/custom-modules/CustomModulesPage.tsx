import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Plus } from 'lucide-react';

export function CustomModulesPage() {
  const templates = [
    { title: 'Internship Applications', desc: 'Company, role, status, salary, application date, referral', count: '6 columns' },
    { title: 'System Design Case Studies', desc: 'Architecture name, trade-offs, bottleneck, key tech', count: '5 columns' },
    { title: 'LeetCode Contest Log', desc: 'Contest number, rank, rating change, problems solved', count: '4 columns' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="cyan" className="font-mono">EXTENSIBILITY</Badge>
            <span className="text-xs text-slate-400">Notion-Style Engine</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Custom Modules & Schema Engine
          </h1>
          <p className="text-xs text-slate-400">
            Build your own flexible custom databases with dynamic columns, types, and tables.
          </p>
        </div>

        <Button variant="primary" className="gap-2">
          <Plus className="h-4 w-4" /> Create Custom Module
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((tpl, idx) => (
          <Card key={idx} className="bg-[#111827] hover:border-blue-500/40 transition-all flex flex-col justify-between">
            <CardHeader>
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-2">
                <Database className="h-4 w-4" />
              </div>
              <CardTitle className="text-sm text-white">{tpl.title}</CardTitle>
              <CardDescription>{tpl.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Use Template ({tpl.count})
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
