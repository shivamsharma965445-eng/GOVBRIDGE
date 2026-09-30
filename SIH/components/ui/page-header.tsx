import { clsx } from 'clsx';
import * as React from 'react';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description, className, ...props }: PageHeaderProps) {
  return (
    <header className={clsx('max-w-3xl', className)} {...props}>
      {eyebrow ? (
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display text-4xl leading-none tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
