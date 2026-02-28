"use client";

import { createContext, useContext, ReactNode, useState } from 'react';
import { ThemeConfig, defaultTheme } from './config';

interface ThemeContextValue {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ 
  children,
  initialTheme = defaultTheme 
}: { 
  children: ReactNode;
  initialTheme?: ThemeConfig;
}) {
  const [theme, setTheme] = useState<ThemeConfig>(initialTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
