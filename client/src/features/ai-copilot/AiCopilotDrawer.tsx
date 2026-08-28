import React, { useState } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import {
  Sparkles,
  X,
  Send,
  Lightbulb,
  Mic,
  Copy,
  Check,
  User,
  RefreshCw,
  Brain,
  Play,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AiMessage, AiMode } from '@/types';
import { apiRequest } from '@/lib/api';
import { toast } from 'sonner';

export function AiCopilotDrawer() {
  const { isAiDrawerOpen, setAiDrawerOpen } = useUIStore();
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<AiMode>('socratic');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: '1',
      role: 'model',
      content:
        "👋 Hello! I am your **CareerOS Socratic Copilot** powered by Google Gemini. How can I help with your algorithms or technical interview prep today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isAiDrawerOpen) return null;

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || prompt.trim();
    if (!textToSend || isTyping) return;

    const userMsg: AiMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setIsTyping(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await apiRequest<{
        success: boolean;
        data: { response: string; mode: string; timestamp: string };
      }>('/api/ai/chat', {
        method: 'POST',
        body: JSON.stringify({
          prompt: textToSend,
          mode,
          history,
        }),
      });

      if (res.success && res.data?.response) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'model',
            content: res.data.response,
            timestamp: res.data.timestamp || new Date().toISOString(),
          },
        ]);
      }
    } catch (err: any) {
      toast.error('AI Note: ' + (err.message || 'Connecting in smart fallback mode'));
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content:
            "💡 **Socratic Hint**: Let's isolate the invariant first. Think about how sorted halves behave and what edge cases (e.g. duplicate elements) might alter your pointer steps.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Code snippet copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <aside className="fixed right-0 top-0 h-screen w-full md:w-96 flex flex-col bg-[#0E1013] border-l border-purple-500/20 shadow-[inset_1px_0_0_rgba(255,255,255,0.05)] shadow-[0_0_30px_rgba(139,92,246,0.15)] z-50 animate-in slide-in-from-right duration-200">
      {/* Header */}
      <header className="p-4 border-b border-[rgba(255,255,255,0.08)] flex flex-col gap-3.5 bg-[#0E1013]/95 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <Sparkles className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <h2 className="font-semibold text-sm text-purple-300 tracking-tight font-mono">
                Socratic Copilot
              </h2>
              <span className="text-[10px] text-zinc-500 font-mono">Gemini 1.5/2.5 Flash Engine</span>
            </div>
          </div>
          <button
            onClick={() => setAiDrawerOpen(false)}
            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Stitch Mode Tabs */}
        <nav className="flex gap-1.5 bg-[#15181D] p-1 rounded-lg border border-[rgba(255,255,255,0.06)]">
          <button
            onClick={() => setMode('socratic')}
            className={cn(
              'flex-1 py-1 px-2 flex items-center justify-center gap-1.5 rounded-md font-mono text-xs transition-all',
              mode === 'socratic'
                ? 'bg-purple-600/20 border border-purple-500/40 text-purple-300 font-semibold shadow-inner'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            )}
          >
            <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
            <span>Hints</span>
          </button>

          <button
            onClick={() => setMode('mock-interview')}
            className={cn(
              'flex-1 py-1 px-2 flex items-center justify-center gap-1.5 rounded-md font-mono text-xs transition-all',
              mode === 'mock-interview'
                ? 'bg-purple-600/20 border border-purple-500/40 text-purple-300 font-semibold shadow-inner'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            )}
          >
            <Brain className="h-3.5 w-3.5 text-cyan-400" />
            <span className="truncate">Mock</span>
          </button>

          <button
            onClick={() => setMode('resume-review')}
            className={cn(
              'flex-1 py-1 px-2 flex items-center justify-center gap-1.5 rounded-md font-mono text-xs transition-all',
              mode === 'resume-review'
                ? 'bg-purple-600/20 border border-purple-500/40 text-purple-300 font-semibold shadow-inner'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            )}
          >
            <FileText className="h-3.5 w-3.5 text-emerald-400" />
            <span className="truncate">Resume</span>
          </button>
        </nav>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn('flex gap-2.5 text-xs', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
          >
            {msg.role === 'model' ? (
              <div className="w-6 h-6 rounded-full bg-purple-500/10 flex-shrink-0 flex items-center justify-center border border-purple-500/30 mt-1">
                <Sparkles className="h-3 w-3 text-purple-400" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center border border-zinc-700 mt-1">
                <User className="h-3 w-3 text-zinc-300" />
              </div>
            )}

            <div
              className={cn(
                'flex flex-col gap-2 max-w-[85%] rounded-xl p-3.5 border border-[rgba(255,255,255,0.06)] shadow-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-[#15181D] text-zinc-100 rounded-tr-none'
                  : 'bg-[#0A0B0D] text-zinc-200 rounded-tl-none border-purple-500/20'
              )}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>

              {msg.role === 'model' && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => copyToClipboard(msg.content, msg.id)}
                    className="text-[10px] font-mono text-zinc-500 hover:text-purple-300 flex items-center gap-1 transition-colors"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-purple-400 animate-pulse pl-8 font-mono">
            <RefreshCw className="h-3 w-3 animate-spin" />
            <span>Gemini Socratic is formulating hints...</span>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.08)] bg-[#0E1013] shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
        {/* Suggestion Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2.5 mb-1 text-[11px] font-mono whitespace-nowrap">
          <button
            onClick={() => handleSend('Give me a Socratic hint on finding the pivot in rotated array')}
            className="px-2.5 py-1 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#15181D] text-zinc-300 hover:bg-zinc-800 hover:border-purple-500/50 transition-all flex items-center gap-1.5"
          >
            <Lightbulb className="h-3 w-3 text-amber-400" />
            <span>Get Hint</span>
          </button>
          <button
            onClick={() => handleSend('Explain the state transition for 0/1 Knapsack')}
            className="px-2.5 py-1 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#15181D] text-zinc-300 hover:bg-zinc-800 hover:border-purple-500/50 transition-all flex items-center gap-1.5"
          >
            <Brain className="h-3 w-3 text-cyan-400" />
            <span>Explain Logic</span>
          </button>
          <button
            onClick={() => handleSend('Ask me a technical interview question on PostgreSQL indexing')}
            className="px-2.5 py-1 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#15181D] text-zinc-300 hover:bg-zinc-800 hover:border-purple-500/50 transition-all flex items-center gap-1.5"
          >
            <Play className="h-3 w-3 text-emerald-400" />
            <span>Dry Run / Mock</span>
          </button>
        </div>

        {/* Input Box */}
        <div className="relative group">
          <div className="absolute inset-0 bg-purple-500/20 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-end bg-[#08090A] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden group-focus-within:border-purple-500 transition-colors">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="w-full bg-transparent border-none text-zinc-100 font-sans text-xs p-3 resize-none focus:outline-none max-h-32 placeholder:text-zinc-600"
              placeholder="Message Gemini Copilot (Press Enter)..."
              rows={1}
            />
            <div className="p-2 flex gap-1 items-center">
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={isTyping || !prompt.trim()}
                className="p-1.5 text-purple-400 hover:text-white hover:bg-purple-500/30 rounded-lg transition-colors bg-purple-500/10 border border-purple-500/30 disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-2.5">
          <span className="font-mono text-[10px] text-zinc-500">
            AI can make mistakes. Consider verifying critical info.
          </span>
        </div>
      </div>
    </aside>
  );
}
