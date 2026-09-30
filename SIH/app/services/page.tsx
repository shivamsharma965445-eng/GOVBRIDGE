import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/ui/page-header';
import { ServiceDiscovery } from '@/components/services/service-discovery';

export default function ServicesPage() {
  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={[
        { label: 'Services', href: '/services' },
        { label: 'My Applications', href: '/applications' },
        { label: 'Track Case', href: '/track' },
        { label: 'Help', href: '/support' },
      ]}
      secondaryActions={[
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Login', href: '/login' },
      ]}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services' },
      ]}
      footerLinks={[
        { label: 'Services', href: '/services' },
        { label: 'My Applications', href: '/applications' },
        { label: 'Track Case', href: '/track' },
        { label: 'Help', href: '/support' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Privacy', href: '/privacy' },
      ]}
      footerNote="Unified discovery for citizen-facing government services."
    >
      <section className="pt-4 sm:pt-8">
        <PageHeader
          eyebrow="SERVICES"
          title="Find the service you need."
          description="GovBridge offers a unified way to discover supported public services and understand the journey before you begin."
          className="max-w-3xl"
        />
      </section>

      <ServiceDiscovery />
    </AppShell>
  );
}
