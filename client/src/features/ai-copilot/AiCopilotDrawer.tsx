import React, { useState } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { Sparkles, X, Send, Bot, User, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AiMessage, AiMode } from '@/types';

export function AiCopilotDrawer() {
  const { isAiDrawerOpen, setAiDrawerOpen } = useUIStore();
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<AiMode>('socratic');
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: '1',
      role: 'model',
      content: "👋 Hello! I am your **CareerOS AI Copilot** powered by Google Gemini. I can help you with DSA algorithmic hints, conduct mock technical interviews, or analyze your resume bullet points. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isAiDrawerOpen) return null;

  const handleSend = async () => {
    if (!prompt.trim() || isTyping) return;

    const userMsg: AiMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = '';
      if (mode === 'socratic') {
        botReply = "💡 **Socratic Hint**: Think about how sorting the array changes the problem structure. If you maintain two pointers at `left = 0` and `right = n - 1`, can you eliminate half of the search space on each comparison?";
      } else if (mode === 'mock-interview') {
        botReply = "🎙️ **Mock Interviewer**: That's a solid start! Can you now explain the trade-offs of using a B-Tree index versus a Hash Index in a PostgreSQL database?";
      } else {
        botReply = "🚀 **Career Advice**: Emphasize the quantifiable impact in your project bullet points (e.g., 'Reduced query latency by 40%' rather than 'Worked on queries').";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: botReply,
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#0E131F] border-l border-[#1F293D] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      <div className="h-16 px-5 border-b border-[#1F293D] flex items-center justify-between bg-[#111827]/80">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>CareerOS AI Copilot</span>
              <Badge variant="purple" className="text-[9px] px-1 py-0">Gemini</Badge>
            </div>
            <div className="text-[10px] text-slate-400">Interview & Socratic Mentor</div>
          </div>
        </div>

        <button
          onClick={() => setAiDrawerOpen(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-3 border-b border-[#1F293D] bg-[#0B0F17] flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setMode('socratic')}
          className={cn(
            'px-2.5 py-1 rounded-md text-[11px] font-medium transition-all whitespace-nowrap',
            mode === 'socratic' ? 'bg-blue-600 text-white' : 'bg-[#161F30] text-slate-400 hover:text-white'
          )}
        >
          DSA Socratic Hints
        </button>
        <button
          onClick={() => setMode('mock-interview')}
          className={cn(
            'px-2.5 py-1 rounded-md text-[11px] font-medium transition-all whitespace-nowrap',
            mode === 'mock-interview' ? 'bg-purple-600 text-white' : 'bg-[#161F30] text-slate-400 hover:text-white'
          )}
        >
          Mock Interview
        </button>
        <button
          onClick={() => setMode('resume-review')}
          className={cn(
            'px-2.5 py-1 rounded-md text-[11px] font-medium transition-all whitespace-nowrap',
            mode === 'resume-review' ? 'bg-indigo-600 text-white' : 'bg-[#161F30] text-slate-400 hover:text-white'
          )}
        >
          Resume Review
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn('flex gap-3 text-xs leading-relaxed', msg.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            {msg.role === 'model' && (
              <div className="h-7 w-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0 mt-0.5">
                <Bot className="h-4 w-4" />
              </div>
            )}
            <div
              className={cn(
                'p-3.5 rounded-2xl max-w-[85%]',
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-[#161F30] border border-[#1F293D] text-slate-200 rounded-tl-none'
              )}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
            {msg.role === 'user' && (
              <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-purple-400 animate-pulse pl-10">
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            <span>Gemini AI is thinking...</span>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-[#1F293D] bg-[#111827]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask a question or request a hint..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-[#0B0F17] border border-[#1F293D] rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
          <Button size="sm" onClick={handleSend} className="bg-purple-600 hover:bg-purple-500 text-white h-9 px-3">
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
