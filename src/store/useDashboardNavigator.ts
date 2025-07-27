// stores/useGlobalString.ts
'use client';

import { create } from 'zustand';

interface StringState {
  currentView: string;
  setView: (newView: string) => void;
}

export const useDashboardNavigator = create<StringState>((set) => ({
  currentView: 'dashboard',
  setView: (newView) => set({ currentView: newView }),
}));
