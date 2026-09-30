import * as React from 'react';
import { Footer, type FooterLink } from './footer';
import { Header, type HeaderAction } from './header';
import { type NavItem } from './navigation';
import { Breadcrumbs, type BreadcrumbItem } from './breadcrumbs';
import { PageContainer } from './page-container';
import { SkipToContentLink } from './skip-to-content';

export interface AppShellProps {
  brand?: string;
  navItems: NavItem[];
  secondaryActions?: HeaderAction[];
  breadcrumbs?: BreadcrumbItem[];
  pageTitle?: string;
  pageDescription?: string;
  children: React.ReactNode;
  footerLinks?: FooterLink[];
  footerNote?: string;
  mobileNavItems?: NavItem[];
  showDesktopNav?: boolean;
}

export function AppShell({
  brand = 'GOVBRIDGE',
  navItems,
  secondaryActions = [],
  breadcrumbs,
  children,
  footerLinks,
  footerNote,
  mobileNavItems = navItems,
  showDesktopNav = true,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipToContentLink />
      <Header
        brand={brand}
        navItems={navItems}
        secondaryActions={secondaryActions}
        mobileNavItems={mobileNavItems}
        showDesktopNav={showDesktopNav}
      />

      <main id="main-content" className="min-h-[calc(100vh-13rem)]">
        <PageContainer>
          {breadcrumbs && breadcrumbs.length > 0 ? <Breadcrumbs items={breadcrumbs} /> : null}
          <div className="space-y-8">{children}</div>
        </PageContainer>
      </main>

      <Footer links={footerLinks} note={footerNote} />
    </div>
  );
}
