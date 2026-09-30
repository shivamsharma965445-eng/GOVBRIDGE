'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import type { Route } from 'next';
import { clsx } from 'clsx';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationProps {
  items: NavItem[];
  className?: string;
  onNavigate?: () => void;
}

export function Navigation({ items, className, onNavigate }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className={className}>
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const isCurrent =
            item.href === pathname || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <li key={item.href}>
              <Link
                href={item.href as Route}
                onClick={onNavigate}
                aria-current={isCurrent ? 'page' : undefined}
                className={clsx(
                  'inline-flex min-h-[44px] items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2',
                  isCurrent ? 'text-foreground shadow-sm ring-1 ring-border bg-muted' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
