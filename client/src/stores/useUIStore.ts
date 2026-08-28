import { create } from 'zustand';

interface UIState {
  isSidebarCollapsed: boolean;
  isCommandPaletteOpen: boolean;
  isAiDrawerOpen: boolean;
  activeTab: string;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setAiDrawerOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarCollapsed: false,
  isCommandPaletteOpen: false,
  isAiDrawerOpen: false,
  activeTab: 'dashboard',
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
  setAiDrawerOpen: (open) => set({ isAiDrawerOpen: open }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
