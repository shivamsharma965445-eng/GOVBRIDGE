import { AuthProvider } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { AppShell, type AppShellProps } from '@/components/layout/app-shell';

const dashboardNavItems: AppShellProps['navItems'] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Services', href: '/services' },
  { label: 'My Applications', href: '/applications' },
  { label: 'Support', href: '/support' },
];

const dashboardSecondaryActions: AppShellProps['secondaryActions'] = [
  { label: 'Settings', href: '/settings' },
  { label: 'Logout', href: '/logout' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AppShell
          brand="GOVBRIDGE"
          navItems={dashboardNavItems}
          secondaryActions={dashboardSecondaryActions}
          mobileNavItems={dashboardNavItems}
          footerLinks={[
            { label: 'Privacy', href: '/privacy' },
            { label: 'Accessibility', href: '/accessibility' },
            { label: 'Contact', href: '/support' },
          ]}
          footerNote="Secure government services at your fingertips."
        >
          {children}
        </AppShell>
      </ProtectedRoute>
    </AuthProvider>
  );
}
