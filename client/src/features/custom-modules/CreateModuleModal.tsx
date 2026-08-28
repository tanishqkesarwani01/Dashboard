import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { X, Database, Plus, Trash2 } from 'lucide-react';
import { CustomModule, CustomFieldDefinition, CustomFieldType } from '@/types';
import { customModuleService } from '@/services/customModuleService';
import { toast } from 'sonner';

interface CreateModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onModuleCreated: (mod: CustomModule) => void;
}

export function CreateModuleModal({ isOpen, onClose, onModuleCreated }: CreateModuleModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState<CustomFieldDefinition[]>([
    { id: 'f1', name: 'Title', type: 'text' },
    { id: 'f2', name: 'Status', type: 'select', options: ['Planned', 'Active', 'Done'] },
    { id: 'f3', name: 'Date', type: 'date' },
  ]);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState<CustomFieldType>('text');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAddField = () => {
    if (!newFieldName.trim()) return;
    const newField: CustomFieldDefinition = {
      id: `f_${Date.now()}`,
      name: newFieldName.trim(),
      type: newFieldType,
      options: newFieldType === 'select' ? ['Option 1', 'Option 2'] : undefined,
    };
    setFields((prev) => [...prev, newField]);
    setNewFieldName('');
  };

  const handleRemoveField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Module name is required');
      return;
    }

    setLoading(true);
    try {
      const created = await customModuleService.createModule({
        name: name.trim(),
        description: description.trim() || undefined,
        icon: 'Database',
        color: 'amber',
        schema: fields,
      });

      toast.success(`Custom module "${created.name}" created!`);
      onModuleCreated(created);
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to create custom module');
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
              <Database className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Create Custom Notion-Style Module</h3>
              <p className="text-[11px] text-zinc-400 font-mono">Define custom schema with dynamic column types</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-300">Module Name *</label>
            <Input
              placeholder="e.g. Internship Application Tracker or System Design Cases"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#090A0D] border-zinc-800 text-xs font-mono"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-300">Description</label>
            <Input
              placeholder="e.g. Track company recruiters, compensation, interview dates"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-[#090A0D] border-zinc-800 text-xs"
            />
          </div>

          {/* Schema Column Builder */}
          <div className="space-y-2 pt-2 border-t border-[rgba(255,255,255,0.06)]">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-300">
              <span>Dynamic Column Schema ({fields.length})</span>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {fields.map((f) => (
                <div key={f.id} className="flex items-center justify-between p-2.5 rounded-lg bg-[#090A0D] border border-zinc-800 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{f.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 uppercase">{f.type}</span>
                  </div>
                  <button type="button" onClick={() => handleRemoveField(f.id)} className="text-zinc-500 hover:text-rose-400">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <Input
                placeholder="Column name (e.g. Salary, Link)..."
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                className="bg-[#090A0D] border-zinc-800 text-xs font-mono"
              />
              <select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value as CustomFieldType)}
                className="h-9 rounded-lg border border-zinc-800 bg-[#090A0D] px-2 text-xs text-zinc-200 font-mono"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="select">Select</option>
                <option value="date">Date</option>
                <option value="checkbox">Checkbox</option>
                <option value="url">URL Link</option>
              </select>
              <button
                type="button"
                onClick={handleAddField}
                className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 text-xs font-mono text-zinc-200 whitespace-nowrap"
              >
                + Add Column
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
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
            >
              {loading ? 'Creating...' : 'Create Schema'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
