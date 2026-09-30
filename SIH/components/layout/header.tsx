'use client';

import Link from 'next/link';
import * as React from 'react';
import type { Route } from 'next';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Navigation, type NavItem } from './navigation';
import { MobileNavigation } from './mobile-navigation';

export interface HeaderAction {
  label: string;
  href: string;
}

export interface HeaderProps {
  brand: string;
  navItems: NavItem[];
  secondaryActions?: HeaderAction[];
  mobileNavItems?: NavItem[];
  showDesktopNav?: boolean;
}

export function Header({
  brand,
  navItems,
  secondaryActions = [],
  mobileNavItems = navItems,
  showDesktopNav = true,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    if (!mobileOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
        <Container className="flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
            >
              <span className="font-display text-2xl leading-none tracking-[-0.05em] text-foreground">{brand}</span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:inline-block">
                Government Digital Services
              </span>
            </Link>

            {showDesktopNav ? (
              <div className="hidden items-center lg:flex">
                <Navigation items={navItems} className="" />
              </div>
            ) : null}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {secondaryActions.map((action) => (
              <Link
                key={action.href}
                href={action.href as Route}
                className="inline-flex min-h-[44px] items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                {action.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-panel"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMobileOpen((open) => !open)}
              className="min-w-[44px] px-2.5"
            >
              Menu
            </Button>
          </div>
        </Container>
      </header>

      <MobileNavigation items={mobileNavItems} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
