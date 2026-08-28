import React from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { CommandPalette } from './CommandPalette';
import { useUIStore } from '@/stores/useUIStore';
import { cn } from '@/lib/utils';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex font-sans">
      <Sidebar />
      <div
        className={cn(
          'flex-1 flex flex-col min-h-screen transition-all duration-300',
          isSidebarCollapsed ? 'pl-20' : 'pl-64'
        )}
      >
        <TopNavbar />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {children}
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
