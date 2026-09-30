import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { adminServices } from '@/lib/admin-demo-data';

const statusStyles: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200',
  Draft: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200',
  Maintenance: 'bg-slate-200 text-slate-700 ring-1 ring-inset ring-slate-300',
};

export default function AdminServicesPage() {
  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={[
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
      secondaryActions={[{ label: 'Back to admin console', href: '/admin' }]}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Admin', href: '/admin' },
        { label: 'Services' },
      ]}
      footerLinks={[
        { label: 'Overview', href: '/admin' },
        { label: 'Services', href: '/admin/services' },
        { label: 'System Health', href: '/admin/system-health' },
        { label: 'Audit', href: '/admin/audit' },
      ]}
      footerNote="Service status is kept clear, visible and aligned with the connected department model."
    >
      <Container className="py-8 sm:py-12">
        <PageHeader
          eyebrow="Admin services"
          title="Connected service registry"
          description="Monitor service ownership, release version, health, and which departments are connected to each public service."
        />

        <section className="mt-8 space-y-4">
          <SectionLabel>Services</SectionLabel>
          <div className="grid gap-4 lg:grid-cols-2">
            {adminServices.map((service) => (
              <Card key={service.serviceId} className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xl font-semibold text-foreground">{service.service}</p>
                    <p className="mt-2 font-mono text-xs text-muted-foreground">{service.serviceId}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${statusStyles[service.status]}`}>
                    {service.status}
                  </span>
                </div>

                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">Owner</dt>
                    <dd className="text-foreground">{service.owner}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">Version</dt>
                    <dd className="font-mono text-foreground">{service.version}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">Connected departments</dt>
                    <dd className="text-right text-foreground">{service.connectedDepartments}</dd>
                  </div>
                </dl>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </AppShell>
  );
}
