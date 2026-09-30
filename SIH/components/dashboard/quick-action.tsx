'use client';

import Link from 'next/link';
import { clsx } from 'clsx';
import * as React from 'react';
import type { Route } from 'next';

export interface QuickActionProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon?: string;
  title: string;
  description?: string;
}

export const QuickAction = React.forwardRef<HTMLAnchorElement, QuickActionProps>(
  ({ href, icon, title, description, className, ...props }, ref) => (
    <Link
      ref={ref}
      href={href as Route}
      className={clsx(
        'group flex flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-all hover:border-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2 sm:p-5',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="text-2xl transition-transform group-hover:scale-110">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <h3 className="font-medium text-foreground transition-colors group-hover:text-accent">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <span className="text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
        →
      </span>
    </Link>
  )
);

QuickAction.displayName = 'QuickAction';
