import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { DATASET_A, DATASET_B, type AppDataset } from '../data/mockData';
import type { ToastItem, Tone } from 'glacia-native';

export type AppToastTone = Tone | 'neutral';

interface AppContextType {
  isDark: boolean;
  toggleDark: () => void;
  dataVersion: number;
  toggleData: () => void;
  dataset: AppDataset;
  toasts: ToastItem[];
  addToast: (message: string, tone?: AppToastTone) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(true); // start in dark mode to highlight liquid glass
  const [dataVersion, setDataVersion] = useState<number>(0);
  const [toasts, setToasts] = useState<ToastItem[]>([
    {
      id: 'init-toast',
      message: 'Liquid Glass Gallery Initialized (iOS 26 / Fallback)',
      tone: 'info',
      duration: 6000,
    },
  ]);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  const toggleData = () => {
    setDataVersion((prev) => {
      const next = prev === 0 ? 1 : 0;
      const nextDataset = next === 0 ? DATASET_A : DATASET_B;
      // Add a toast notification indicating the data swap
      addToast(`Swapped to ${nextDataset.name}`, 'success');
      return next;
    });
  };

  const addToast = (
    message: string,
    tone: AppToastTone = 'neutral',
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [
      ...prev,
      {
        id,
        message,
        tone,
        duration: 5000,
      },
    ]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const dataset = dataVersion === 0 ? DATASET_A : DATASET_B;

  return (
    <AppContext.Provider
      value={{
        isDark,
        toggleDark,
        dataVersion,
        toggleData,
        dataset,
        toasts,
        addToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
}
