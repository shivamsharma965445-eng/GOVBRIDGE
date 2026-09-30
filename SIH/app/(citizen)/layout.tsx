import { AppShell } from '@/components/layout/app-shell';

export const metadata = {
  title: 'Citizen Portal',
  description: 'Citizen-facing Government service access and case tracking with clear consent and accountability.',
};

const citizenNavItems = [
  { label: 'Services', href: '/services' },
  { label: 'My Applications', href: '/applications' },
  { label: 'Track Case', href: '/track' },
  { label: 'Help', href: '/support' },
];

const citizenSecondaryActions = [
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Login', href: '/login' },
];

export default function CitizenLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={citizenNavItems}
      secondaryActions={citizenSecondaryActions}
      mobileNavItems={citizenNavItems}
      footerLinks={[
        { label: 'Services', href: '/services' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Help', href: '/support' },
      ]}
      footerNote="Citizen services designed for clarity, dignity, and trust."
    >
      {children}
    </AppShell>
  );
}
