import React, { useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { toast } from 'sonner';

export function AuthPages() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp, signInAsGuest } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, fullName);
        toast.success('Account created! Welcome to CareerOS.');
      } else {
        await signIn(email, password);
        toast.success('Signed in successfully.');
      }
    } catch (err: any) {
      toast.error(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090A] flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 z-10">
        {/* Brand */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="h-16 w-16 rounded-2xl overflow-hidden border border-amber-500/30 bg-[#0E1013] shadow-[0_0_25px_rgba(245,158,11,0.2)] flex items-center justify-center p-1">
            <img src="/logo.png" alt="CareerOS Logo" className="h-full w-full object-cover rounded-xl" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono">
            career<span className="text-amber-400">.os</span>
          </h1>
          <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
            The developer operating system for software engineers preparing for tier-1 technical interviews.
          </p>
        </div>

        {/* Card */}
        <div className="p-7 rounded-2xl bg-[#0E1013] border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.6)] space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-300">Full Name</label>
                <Input
                  type="text"
                  placeholder="Alex Rivera"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-[#08090A] border-zinc-800 text-xs"
                  required
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-300">Email Address</label>
              <Input
                type="email"
                placeholder="engineer@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#08090A] border-zinc-800 text-xs font-mono"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-300">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#08090A] border-zinc-800 text-xs"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold font-mono transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              {loading ? 'Processing...' : isSignUp ? 'Create Engineer Account' : 'Sign In'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-mono">
              <span className="bg-[#0E1013] px-2 text-zinc-500 text-[10px]">Or instant access</span>
            </div>
          </div>

          {/* 1-Click Guest Login */}
          <button
            onClick={() => {
              signInAsGuest();
              toast.success('Signed in as Demo Engineer!');
            }}
            className="w-full py-2.5 rounded-xl border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 text-xs font-mono transition-all flex items-center justify-center gap-2"
          >
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>Launch 1-Click Demo Mode</span>
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-zinc-400 hover:text-amber-300 transition-colors font-mono"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
