import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { adminSchemas } from '@/lib/admin-demo-data';

const statusStyles: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200',
  Draft: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200',
  Deprecated: 'bg-slate-200 text-slate-700 ring-1 ring-inset ring-slate-300',
};

export default function AdminSchemasPage() {
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
        { label: 'Schemas' },
      ]}
      footerLinks={[
        { label: 'Overview', href: '/admin' },
        { label: 'Schemas', href: '/admin/schemas' },
        { label: 'System Health', href: '/admin/system-health' },
        { label: 'Audit', href: '/admin/audit' },
      ]}
      footerNote="Schema definitions keep the service model consistent and versioned across connected departments."
    >
      <Container className="py-8 sm:py-12">
        <PageHeader
          eyebrow="Admin schemas"
          title="Schema registry"
          description="Track the canonical schema definitions that govern how citizen and service data is normalized across connected systems."
        />

        <section className="mt-8 space-y-4">
          <SectionLabel>Schemas</SectionLabel>
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-muted/60">
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Schema ID</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Version</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Last updated</th>
                  </tr>
                </thead>
                <tbody>
                  {adminSchemas.map((schema) => (
                    <tr key={schema.schemaId} className="border-b border-border last:border-none">
                      <td className="px-4 py-3 font-mono text-foreground">{schema.schemaId}</td>
                      <td className="px-4 py-3 text-foreground">{schema.name}</td>
                      <td className="px-4 py-3 font-mono text-foreground">{schema.version}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${statusStyles[schema.status]}`}>
                          {schema.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{schema.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </Container>
    </AppShell>
  );
}
