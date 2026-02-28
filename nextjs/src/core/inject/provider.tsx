"use client";

import { createContext, useContext, ReactNode } from 'react';

interface InjectSlot {
  head?: ReactNode[];
  header?: ReactNode[];
  footer?: ReactNode[];
  sidebar?: ReactNode[];
  before?: ReactNode[];
  after?: ReactNode[];
}

interface InjectContextValue {
  slots: InjectSlot;
  register: (slot: keyof InjectSlot, content: ReactNode) => void;
}

const InjectContext = createContext<InjectContextValue | null>(null);

export function InjectProvider({ children }: { children: ReactNode }) {
  const slots: InjectSlot = {
    head: [],
    header: [],
    footer: [],
    sidebar: [],
    before: [],
    after: [],
  };

  const register = (slot: keyof InjectSlot, content: ReactNode) => {
    if (!slots[slot]) slots[slot] = [];
    slots[slot]!.push(content);
  };

  return (
    <InjectContext.Provider value={{ slots, register }}>
      {children}
    </InjectContext.Provider>
  );
}

export function useInject() {
  const context = useContext(InjectContext);
  if (!context) throw new Error('useInject must be used within InjectProvider');
  return context;
}
