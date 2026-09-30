import { clsx } from 'clsx';
import * as React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseClasses =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border text-sm font-medium transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'border-accent bg-accent text-white hover:bg-[#9b7310] active:bg-[#7e5c0f]',
  secondary: 'border-border bg-card text-foreground hover:bg-muted active:bg-[#f1ece7]',
  ghost: 'border-transparent bg-transparent text-foreground hover:bg-muted hover:text-accent active:bg-[#f1ece7]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-2',
  md: 'px-4 py-2.5',
  lg: 'px-5 py-3',
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}
