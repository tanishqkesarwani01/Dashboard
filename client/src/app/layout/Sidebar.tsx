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
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon: any;
  kbd?: string;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export function Sidebar() {
  const [location] = useLocation();
  const { isSidebarCollapsed, toggleSidebar, setAiDrawerOpen } = useUIStore();
  const { profile, signOut } = useAuthStore();

  const navGroups: NavGroup[] = [
    {
      title: 'Workspace',
      items: [
        { label: 'Command Center', path: '/', icon: LayoutDashboard, kbd: '⌘1' },
        { label: 'Velocity & Analytics', path: '/analytics', icon: BarChart3, kbd: '⌘2' },
      ],
    },
    {
      title: 'Mastery Engines',
      items: [
        { label: 'DSA Spaced Repetition', path: '/dsa', icon: Code2, badge: '4 due' },
        { label: 'Full-Stack Roadmap', path: '/curriculum/webdev', icon: BookOpen },
        { label: 'Core CS Systems', path: '/curriculum/corecs', icon: Database },
      ],
    },
    {
      title: 'Consistency',
      items: [
        { label: 'Daily Study Matrix', path: '/habits', icon: CalendarCheck },
        { label: 'Project Artifacts', path: '/projects', icon: FolderGit2 },
        { label: 'Custom Schemas', path: '/custom-modules', icon: Database },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-30 h-screen border-r border-[rgba(255,255,255,0.06)] bg-[#0A0B0D] flex flex-col justify-between transition-all duration-200 select-none',
        isSidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div>
        {/* Workspace Brand */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-[rgba(255,255,255,0.06)]">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-900 border border-zinc-600/50 flex items-center justify-center text-white font-mono text-xs font-semibold shadow-inner flex-shrink-0">
              ⌘
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-semibold text-xs tracking-tight text-white font-mono">
                  career<span className="text-amber-400 font-bold">.os</span>
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={toggleSidebar}
            className="h-6 w-6 rounded-md border border-[rgba(255,255,255,0.08)] bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 flex items-center justify-center transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Navigation */}
        <div className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-130px)]">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-2 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
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
                        'flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 group relative',
                        isActive
                          ? 'pill-active font-semibold text-white'
                          : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-4 w-4 flex-shrink-0 transition-colors',
                          isActive ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'
                        )}
                      />
                      {!isSidebarCollapsed && (
                        <span className="truncate flex-1">{item.label}</span>
                      )}
                      {!isSidebarCollapsed && item.kbd && (
                        <kbd className="text-[9px] font-mono text-zinc-600 group-hover:text-zinc-400">
                          {item.kbd}
                        </kbd>
                      )}
                      {!isSidebarCollapsed && item.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* AI Copilot Quick Launcher */}
          <div className="pt-1">
            <button
              onClick={() => setAiDrawerOpen(true)}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-700/60 bg-gradient-to-b from-[#13161C] to-[#0D0F12] hover:border-zinc-500 transition-all text-xs font-medium text-zinc-200 group',
                isSidebarCollapsed && 'justify-center px-2'
              )}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400 flex-shrink-0 group-hover:rotate-12 transition-transform" />
              {!isSidebarCollapsed && (
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-semibold text-white">Gemini Socratic</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Interview & Hints</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-[rgba(255,255,255,0.06)] bg-[#0A0B0D]">
        <div className={cn('flex items-center gap-2.5', isSidebarCollapsed && 'justify-center')}>
          <div className="h-7 w-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono text-[11px] font-bold text-zinc-200 flex-shrink-0">
            {profile?.full_name ? profile.full_name.charAt(0) : <User className="h-3.5 w-3.5" />}
          </div>
          {!isSidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-zinc-200 truncate">
                {profile?.full_name || 'Engineering Student'}
              </div>
              <div className="text-[10px] text-zinc-500 font-mono truncate">
                {profile?.target_role || 'Software Engineer'}
              </div>
            </div>
          )}
          {!isSidebarCollapsed && (
            <button
              onClick={() => signOut()}
              className="text-zinc-500 hover:text-rose-400 transition-colors p-1 rounded hover:bg-zinc-800"
              title="Sign out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
