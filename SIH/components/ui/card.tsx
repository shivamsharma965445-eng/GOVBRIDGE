import { clsx } from 'clsx';
import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg border border-border bg-card p-5 shadow-soft sm:p-6',
        className,
      )}
      {...props}
    />
  );
}
