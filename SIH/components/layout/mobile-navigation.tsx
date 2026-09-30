'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import type { Route } from 'next';
import { clsx } from 'clsx';

export interface MobileNavItem {
  label: string;
  href: string;
}

export interface MobileNavigationProps {
  items: MobileNavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({ items, isOpen, onClose }: MobileNavigationProps) {
  const pathname = usePathname();
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    const timeoutId = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={clsx(
        'pointer-events-none fixed inset-0 z-50 transition-opacity duration-150 ease-out',
        isOpen ? 'pointer-events-auto opacity-100' : 'opacity-0',
      )}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-foreground/25" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={clsx(
          'absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-border bg-card p-4 shadow-soft transition-transform duration-150 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="mb-6 flex items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <span className="font-display text-2xl text-foreground">GovBridge</span>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Government Digital Services
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-border bg-card text-base text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
          >
            ×
          </button>
        </div>

        <nav aria-label="Mobile primary navigation" className="flex-1">
          <ul className="space-y-1">
            {items.map((item) => {
              const isCurrent = item.href === pathname || (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href as Route}
                    onClick={onClose}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={clsx(
                      'flex min-h-[48px] items-center rounded-md px-3 text-base font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2',
                      isCurrent ? 'bg-muted text-foreground ring-1 ring-border' : 'text-muted-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
