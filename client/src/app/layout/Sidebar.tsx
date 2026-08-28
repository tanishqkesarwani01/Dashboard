import React from 'react';
import { useLocation, Link } from 'wouter';
import { useUIStore } from '@/stores/useUIStore';
import { useAuthStore } from '@/stores/useAuthStore';
import {
  LayoutDashboard,
  Code2,
  BookOpen,
  CalendarCheck,
  FolderGit2,
  Sparkles,
  Database,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const [location] = useLocation();
  const { isSidebarCollapsed, toggleSidebar, setAiDrawerOpen } = useUIStore();
  const { profile, signOut } = useAuthStore();

  const navGroups = [
    {
      title: 'Navigate',
      items: [
        { label: 'Dashboard', path: '/', icon: LayoutDashboard },
        { label: 'Analytics', path: '/analytics', icon: BarChart3 },
      ],
    },
    {
      title: 'Learn & Master',
      items: [
        { label: 'DSA Spaced Repetition', path: '/dsa', icon: Code2, badge: 'Revision' },
        { label: 'Web Development', path: '/curriculum/webdev', icon: BookOpen },
        { label: 'Core CS (OS & DBMS)', path: '/curriculum/corecs', icon: Database },
      ],
    },
    {
      title: 'Consistency & Habits',
      items: [
        { label: 'Daily Logs & Heatmap', path: '/habits', icon: CalendarCheck },
      ],
    },
    {
      title: 'Career & Portfolio',
      items: [
        { label: 'Projects & Hub', path: '/projects', icon: FolderGit2 },
        { label: 'Custom Modules', path: '/custom-modules', icon: Database, badge: 'Dynamic' },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-30 h-screen border-r border-[#1F293D] bg-[#0E131F]/95 backdrop-blur-md flex flex-col justify-between transition-all duration-300 select-none',
        isSidebarCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div>
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#1F293D]">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 flex-shrink-0">
              <Zap className="h-5 w-5 text-white fill-white" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5 font-mono">
                  Career<span className="text-blue-400">OS</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                  Developer Engine
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={toggleSidebar}
            className="h-7 w-7 rounded-lg border border-[#1F293D] bg-[#161F30] hover:bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors"
            title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  {group.title}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = location === item.path || (item.path !== '/' && location.startsWith(item.path));
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 group relative',
                        isActive
                          ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-[#161F30]/70'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-4 w-4 flex-shrink-0 transition-colors',
                          isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
                        )}
                      />
                      {!isSidebarCollapsed && (
                        <span className="truncate flex-1">{item.label}</span>
                      )}
                      {!isSidebarCollapsed && item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-medium">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* AI Copilot Quick Launcher Button */}
          <div className="pt-2">
            <button
              onClick={() => setAiDrawerOpen(true)}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-blue-900/40 border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-500/60 transition-all text-xs font-semibold shadow-lg shadow-purple-950/40 group',
                isSidebarCollapsed && 'justify-center px-2'
              )}
            >
              <Sparkles className="h-4 w-4 text-purple-400 animate-pulse flex-shrink-0 group-hover:scale-110 transition-transform" />
              {!isSidebarCollapsed && (
                <div className="flex flex-col items-start text-left">
                  <span>AI Copilot</span>
                  <span className="text-[10px] text-purple-400/80 font-normal">Gemini Engine</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-[#1F293D] bg-[#0B0F17]/80">
        <div className={cn('flex items-center gap-3', isSidebarCollapsed && 'justify-center')}>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0 shadow-inner">
            {profile?.full_name ? profile.full_name.charAt(0) : <User className="h-4 w-4" />}
          </div>
          {!isSidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-slate-200 truncate">
                {profile?.full_name || 'Engineering Student'}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {profile?.target_role || 'Software Engineer'}
              </div>
            </div>
          )}
          {!isSidebarCollapsed && (
            <button
              onClick={() => signOut()}
              className="text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-rose-500/10"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
