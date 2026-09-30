import { AppShell } from '@/components/layout/app-shell';

export const metadata = {
  title: 'Admin Console',
  description: 'Administrative oversight for departments, services, connectors, schemas, workflows, health and audit operations.',
};

const adminNavItems = [
  { label: 'Overview', href: '/admin' },
  { label: 'Departments', href: '/admin/departments' },
  { label: 'Services', href: '/admin/services' },
  { label: 'Connectors', href: '/admin/connectors' },
  { label: 'Schemas', href: '/admin/schemas' },
  { label: 'Mappings', href: '/admin/mappings' },
  { label: 'Policies', href: '/admin/policies' },
  { label: 'Workflows', href: '/admin/workflows' },
  { label: 'System Health', href: '/admin/system-health' },
  { label: 'Audit', href: '/admin/audit' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={adminNavItems}
      mobileNavItems={adminNavItems}
      footerLinks={[
        { label: 'Overview', href: '/admin' },
        { label: 'Departments', href: '/admin/departments' },
        { label: 'Services', href: '/admin/services' },
        { label: 'Connectors', href: '/admin/connectors' },
        { label: 'Schemas', href: '/admin/schemas' },
        { label: 'Mappings', href: '/admin/mappings' },
        { label: 'Policies', href: '/admin/policies' },
        { label: 'Workflows', href: '/admin/workflows' },
        { label: 'System Health', href: '/admin/system-health' },
        { label: 'Audit', href: '/admin/audit' },
      ]}
      footerNote="Administrative controls for integrated government service operations."
      showDesktopNav={true}
    >
      {children}
    </AppShell>
  );
}
