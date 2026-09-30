import { AppShell } from '@/components/layout/app-shell';

export const metadata = {
  title: 'Official Console',
  description: 'Official case coordination, workflows, audit and operational oversight for connected public services.',
};

const officialNavItems = [
  { label: 'Overview', href: '/official' },
  { label: 'Cases', href: '/official/cases/GOV-2026-000184' },
  { label: 'Tasks', href: '/official/tasks' },
  { label: 'Exceptions', href: '/official/exceptions' },
  { label: 'Data Requests', href: '/official/data-requests' },
  { label: 'Entity Reviews', href: '/official/entity-reviews' },
  { label: 'Audit', href: '/official/audit' },
  { label: 'Analytics', href: '/official/analytics' },
  { label: 'Help', href: '/official/help' },
  { label: 'Policies', href: '/official/policies' },
];

export default function OfficialLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={officialNavItems}
      mobileNavItems={officialNavItems}
      footerLinks={[
        { label: 'Overview', href: '/official' },
        { label: 'Cases', href: '/official/cases/GOV-2026-000184' },
        { label: 'Tasks', href: '/official/tasks' },
        { label: 'Exceptions', href: '/official/exceptions' },
        { label: 'Data Requests', href: '/official/data-requests' },
        { label: 'Entity Reviews', href: '/official/entity-reviews' },
        { label: 'Audit', href: '/official/audit' },
        { label: 'Analytics', href: '/official/analytics' },
        { label: 'Help', href: '/official/help' },
        { label: 'Policies', href: '/official/policies' },
      ]}
      footerNote="Official console for case coordination and service delivery."
      showDesktopNav={true}
    >
      {children}
    </AppShell>
  );
}
