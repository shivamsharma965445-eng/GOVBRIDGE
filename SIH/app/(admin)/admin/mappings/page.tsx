import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { adminMappings } from '@/lib/admin-demo-data';

const statusStyles: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200',
  Draft: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200',
  Review: 'bg-sky-100 text-sky-800 ring-1 ring-inset ring-sky-200',
};

export default function AdminMappingsPage() {
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
        { label: 'Mappings' },
      ]}
      footerLinks={[
        { label: 'Overview', href: '/admin' },
        { label: 'Mappings', href: '/admin/mappings' },
        { label: 'Schemas', href: '/admin/schemas' },
        { label: 'Audit', href: '/admin/audit' },
      ]}
      footerNote="Canonical mapping controls standardise meaning across disconnected systems before the case reaches decision-making."
    >
      <Container className="py-8 sm:py-12">
        <PageHeader
          eyebrow="Admin mappings"
          title="Canonical normalization controls"
          description="Review the transformation rules that align source-field values to the GovBridge canonical model."
        />

        <section className="mt-8 space-y-4">
          <SectionLabel>Mappings</SectionLabel>
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-muted/60">
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Mapping ID</th>
                    <th className="px-4 py-3 font-medium">Source</th>
                    <th className="px-4 py-3 font-medium">Target</th>
                    <th className="px-4 py-3 font-medium">Version</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {adminMappings.map((mapping) => (
                    <tr key={mapping.mappingId} className="border-b border-border last:border-none">
                      <td className="px-4 py-3 font-mono text-foreground">{mapping.mappingId}</td>
                      <td className="px-4 py-3 font-mono text-foreground">{mapping.source}</td>
                      <td className="px-4 py-3 font-mono text-foreground">{mapping.target}</td>
                      <td className="px-4 py-3 font-mono text-foreground">{mapping.version}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${statusStyles[mapping.status]}`}>
                          {mapping.status}
                        </span>
                      </td>
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
