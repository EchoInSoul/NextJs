import { ReactNode } from 'react';

interface SlotProps {
  name: string;
  children?: ReactNode;
  fallback?: ReactNode;
}

export function Slot({ name, children, fallback }: SlotProps) {
  return (
    <div data-slot={name} className="slot-container">
      {children || fallback}
    </div>
  );
}
