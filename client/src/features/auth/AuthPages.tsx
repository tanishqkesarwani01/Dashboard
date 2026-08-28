import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Zap, Mail, Lock, ArrowRight, Github, User, CheckCircle2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuthStore } from '@/stores/useAuthStore';
import { toast } from 'sonner';

export function AuthPages() {
  const [, setLocation] = useLocation();
  const { setUser, setProfile } = useAuthStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [targetRole, setTargetRole] = useState('Full-Stack Software Engineer');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        if (isSignUp) {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                target_role: targetRole,
              },
            },
          });
          if (error) throw error;
          toast.success('Account created successfully! Check your email if verification is required.');
          if (data.user) {
            setUser(data.user);
            setLocation('/');
          }
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          toast.success('Welcome back to CareerOS!');
          if (data.user) {
            setUser(data.user);
            setLocation('/');
          }
        }
      } else {
        // Instant Demo / Offline Mode
        setUser({ id: 'demo-user-123', email });
        setProfile({
          id: 'demo-user-123',
          email,
          full_name: fullName || 'Demo Software Engineer',
          target_role: targetRole,
          bio: 'Building production-grade full stack applications.',
          created_at: new Date().toISOString(),
        });
        toast.success(`Logged in as ${fullName || email}`);
        setLocation('/');
      }
    } catch (err: any) {
      toast.error(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setUser({ id: 'demo-engineer-777', email: 'alex.rivera@careeros.dev' });
    setProfile({
      id: 'demo-engineer-777',
      email: 'alex.rivera@careeros.dev',
      full_name: 'Alex Rivera',
      target_role: 'Full-Stack Software Engineer',
      bio: 'Mastering DSA, Distributed Systems, and React Architecture.',
      github_url: 'https://github.com',
      leetcode_url: 'https://leetcode.com',
      linkedin_url: 'https://linkedin.com',
      created_at: new Date().toISOString(),
    });
    toast.success('Logged in with Demo Profile');
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 items-center justify-center text-white shadow-xl shadow-blue-500/25 mb-1">
            <Zap className="h-6 w-6 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono">
            Career<span className="text-blue-400">OS</span>
          </h1>
          <p className="text-xs text-slate-400">
            Developer Career Operating System & Syllabus Tracker
          </p>
        </div>

        {/* Auth Card */}
        <Card className="border-[#1F293D] bg-[#111827]/95 shadow-2xl backdrop-blur-xl">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-white">
                {isSignUp ? 'Create your Account' : 'Sign in to your Dashboard'}
              </CardTitle>
              <Badge variant="cyan" className="font-mono text-[10px]">
                {isSupabaseConfigured ? 'Supabase Auth' : 'Instant Mode'}
              </Badge>
            </div>
            <CardDescription>
              {isSignUp
                ? 'Join thousands of engineers accelerating their technical careers.'
                : 'Enter your credentials to continue your daily momentum.'}
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-3.5">
              {isSignUp && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300">Full Name</label>
                    <div className="relative">
                      <User className="h-4 w-4 absolute left-3 top-2.5 text-slate-500" />
                      <Input
                        placeholder="Alex Rivera"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-9 bg-[#0B0F17]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300">Target Engineering Role</label>
                    <Input
                      placeholder="e.g. Backend Engineer, Full-Stack Developer"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="bg-[#0B0F17]"
                    />
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="h-4 w-4 absolute left-3 top-2.5 text-slate-500" />
                  <Input
                    type="email"
                    placeholder="engineer@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-[#0B0F17]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="h-4 w-4 absolute left-3 top-2.5 text-slate-500" />
                  <Input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 bg-[#0B0F17]"
                    required
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3 pt-2">
              <Button type="submit" variant="primary" className="w-full gap-2" disabled={loading}>
                {loading ? 'Authenticating...' : isSignUp ? 'Create CareerOS Account' : 'Sign In'}
                <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="relative flex py-1 items-center w-full">
                <div className="flex-grow border-t border-[#1F293D]" />
                <span className="flex-shrink mx-3 text-[10px] text-slate-500 uppercase tracking-widest font-mono">OR</span>
                <div className="flex-grow border-t border-[#1F293D]" />
              </div>

              <Button
                type="button"
                variant="secondary"
                onClick={handleDemoLogin}
                className="w-full text-xs text-slate-300 hover:text-white border-slate-700 bg-[#161F30] gap-2"
              >
                <Zap className="h-3.5 w-3.5 text-amber-400" /> Instant Demo Guest Login
              </Button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
