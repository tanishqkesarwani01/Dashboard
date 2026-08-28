import React from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { CommandPalette } from './CommandPalette';
import { useUIStore } from '@/stores/useUIStore';
import { cn } from '@/lib/utils';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-[#08090A] text-[#EDEDED] flex font-sans">
      <Sidebar />
      <div
        className={cn(
          'flex-1 flex flex-col min-h-screen transition-all duration-200',
          isSidebarCollapsed ? 'pl-16' : 'pl-64'
        )}
      >
        <TopNavbar />
        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full mx-auto animate-in fade-in duration-200">
          {children}
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
