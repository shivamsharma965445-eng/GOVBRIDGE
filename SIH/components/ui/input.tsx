import { clsx } from 'clsx';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        'min-h-[44px] w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground shadow-none outline-none transition-colors duration-150 ease-out placeholder:text-muted-foreground/80 focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)]',
        className,
      )}
      {...props}
    />
  );
}
