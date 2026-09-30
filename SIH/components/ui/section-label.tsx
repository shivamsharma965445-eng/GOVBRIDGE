import { clsx } from 'clsx';
import * as React from 'react';

export interface SectionLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function SectionLabel({ className, children, ...props }: SectionLabelProps) {
  return (
    <p
      className={clsx(
        'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
