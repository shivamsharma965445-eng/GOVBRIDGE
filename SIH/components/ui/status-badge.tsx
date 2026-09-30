import { clsx } from 'clsx';
import * as React from 'react';

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'active' | 'pending' | 'inactive';
  label?: string;
}

const statusStyles = {
  active: 'border-[#D7E9D7] bg-[#F3FAF4] text-[#1F5B36]',
  pending: 'border-[#F2E7C5] bg-[#FCF6E8] text-[#7C5A12]',
  inactive: 'border-border bg-muted text-muted-foreground',
};

export function StatusBadge({ status, label, className, ...props }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em]',
        statusStyles[status],
        className,
      )}
      {...props}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {label || status}
    </span>
  );
}
