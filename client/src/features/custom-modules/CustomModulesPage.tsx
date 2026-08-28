import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Database, Plus, Table, Layers, Trash2, CheckSquare, Square, ExternalLink } from 'lucide-react';
import { CustomModule, CustomRecord } from '@/types';
import { customModuleService } from '@/services/customModuleService';
import { CreateModuleModal } from './CreateModuleModal';
import { toast } from 'sonner';

export function CustomModulesPage() {
  const [modules, setModules] = useState<CustomModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<CustomModule | null>(null);
  const [records, setRecords] = useState<CustomRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRowData, setNewRowData] = useState<Record<string, any>>({});

  useEffect(() => {
    async function loadModules() {
      try {
        let loaded = await customModuleService.getModules();
        if (loaded.length === 0) {
          const defaultMod = await customModuleService.createModule({
            name: 'Internship & Job Applications',
            description: 'Track company hiring stages, referrals, and interview timelines',
            icon: 'Database',
            color: 'amber',
            schema: [
              { id: 'c1', name: 'Company', type: 'text' },
              { id: 'c2', name: 'Role', type: 'text' },
              { id: 'c3', name: 'Status', type: 'select', options: ['Applied', 'OA Received', 'Interviewing', 'Offer'] },
              { id: 'c4', name: 'Applied Date', type: 'date' },
              { id: 'c5', name: 'Referral', type: 'checkbox' },
            ],
          });
          loaded = [defaultMod];
        }
        setModules(loaded);
        setSelectedModule(loaded[0]);
      } catch (err: any) {
        toast.error('Failed to load custom modules');
      }
    }
    loadModules();
  }, []);

  useEffect(() => {
    if (selectedModule) {
      customModuleService.getRecords(selectedModule.id).then((recs) => {
        setRecords(recs);
      });
    }
  }, [selectedModule]);

  const handleModuleCreated = (newMod: CustomModule) => {
    setModules((prev) => [...prev, newMod]);
    setSelectedModule(newMod);
  };

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModule) return;

    try {
      const added = await customModuleService.addRecord(selectedModule.id, newRowData);
      setRecords((prev) => [added, ...prev]);
      setNewRowData({});
      toast.success('Record added to table!');
    } catch (err: any) {
      toast.error('Failed to add record');
    }
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">Extensibility Engine</span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs font-mono text-zinc-400">Notion-Grade Schemas</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Custom Database Engine
          </h1>
          <p className="text-xs text-zinc-400">
            Create custom entities, define typed column schemas, and manage records in responsive dynamic tables.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 w-max"
        >
          <Plus className="h-4 w-4" /> Create Custom Module
        </button>
      </div>

      {/* Module Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[rgba(255,255,255,0.06)]">
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedModule(m)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 whitespace-nowrap ${
              selectedModule?.id === m.id
                ? 'pill-active font-semibold text-white'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <Database className="h-3.5 w-3.5 text-amber-400" />
            <span>{m.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Module Table */}
      {selectedModule && (
        <div className="p-6 rounded-2xl hairline-card space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">{selectedModule.name}</h3>
              <p className="text-xs text-zinc-400">{selectedModule.description || 'Dynamic database records'}</p>
            </div>
            <span className="text-xs font-mono text-zinc-500">{records.length} records</span>
          </div>

          {/* Quick Row Insertion Form */}
          <form onSubmit={handleAddRecord} className="p-4 rounded-xl bg-[#090A0D] border border-zinc-800 space-y-3">
            <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5 text-amber-400" />
              <span>Quick Insert Row:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              {selectedModule.schema.map((col) => (
                <div key={col.id} className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase">{col.name}</label>
                  {col.type === 'checkbox' ? (
                    <div className="h-8 flex items-center">
                      <input
                        type="checkbox"
                        checked={Boolean(newRowData[col.name])}
                        onChange={(e) => setNewRowData({ ...newRowData, [col.name]: e.target.checked })}
                        className="h-4 w-4 rounded bg-zinc-800 border-zinc-700 text-amber-500 focus:ring-amber-500"
                      />
                    </div>
                  ) : col.type === 'select' && col.options ? (
                    <select
                      value={newRowData[col.name] || col.options[0]}
                      onChange={(e) => setNewRowData({ ...newRowData, [col.name]: e.target.value })}
                      className="w-full h-8 rounded-lg border border-zinc-800 bg-[#121418] px-2 text-xs text-zinc-200 font-mono"
                    >
                      {col.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      type={col.type === 'number' ? 'number' : col.type === 'date' ? 'date' : 'text'}
                      placeholder={`Enter ${col.name}...`}
                      value={newRowData[col.name] || ''}
                      onChange={(e) => setNewRowData({ ...newRowData, [col.name]: e.target.value })}
                      className="bg-[#121418] border-zinc-800 text-xs font-mono h-8"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-bold"
              >
                + Add Record
              </button>
            </div>
          </form>

          {/* Dynamic Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[rgba(255,255,255,0.06)] text-zinc-500 font-mono text-[10px] uppercase">
                <tr>
                  {selectedModule.schema.map((col) => (
                    <th key={col.id} className="pb-3 font-semibold">{col.name}</th>
                  ))}
                  <th className="pb-3 font-semibold text-right">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-zinc-300">
                {records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-[#111418] transition-colors">
                    {selectedModule.schema.map((col) => (
                      <td key={col.id} className="py-3 font-mono">
                        {col.type === 'checkbox' ? (
                          rec.data?.[col.name] ? (
                            <span className="text-emerald-400">✓ Yes</span>
                          ) : (
                            <span className="text-zinc-600">No</span>
                          )
                        ) : (
                          rec.data?.[col.name] || '—'
                        )}
                      </td>
                    ))}
                    <td className="py-3 font-mono text-zinc-500 text-right">
                      {new Date(rec.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {records.length === 0 && (
                  <tr>
                    <td colSpan={selectedModule.schema.length + 1} className="py-6 text-center text-zinc-500 font-mono">
                      No records logged in this schema yet. Use the form above to add your first record!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <CreateModuleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onModuleCreated={handleModuleCreated}
      />
    </div>
  );
}
