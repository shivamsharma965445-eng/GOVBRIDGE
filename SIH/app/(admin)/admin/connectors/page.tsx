import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { adminConnectors } from '@/lib/admin-demo-data';

const healthStyles: Record<string, string> = {
  Healthy: 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200',
  Watch: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200',
  Degraded: 'bg-rose-100 text-rose-800 ring-1 ring-inset ring-rose-200',
};

export default function AdminConnectorsPage() {
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
        { label: 'Connectors' },
      ]}
      footerLinks={[
        { label: 'Overview', href: '/admin' },
        { label: 'Connectors', href: '/admin/connectors' },
        { label: 'System Health', href: '/admin/system-health' },
        { label: 'Audit', href: '/admin/audit' },
      ]}
      footerNote="Connector status highlights data flow health without exposing sensitive credentials or secrets."
    >
      <Container className="py-8 sm:py-12">
        <PageHeader
          eyebrow="Admin connectors"
          title="Integration health overview"
          description="Monitor the protocols, health state and sync status of each approved integration connection without exposing credentials."
        />

        <section className="mt-8 space-y-4">
          <SectionLabel>Connectors</SectionLabel>
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-muted/60">
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Connector ID</th>
                    <th className="px-4 py-3 font-medium">Department</th>
                    <th className="px-4 py-3 font-medium">Protocol</th>
                    <th className="px-4 py-3 font-medium">Health</th>
                    <th className="px-4 py-3 font-medium">Version</th>
                    <th className="px-4 py-3 font-medium">Last checked</th>
                  </tr>
                </thead>
                <tbody>
                  {adminConnectors.map((connector) => (
                    <tr key={connector.connectorId} className="border-b border-border last:border-none">
                      <td className="px-4 py-3 font-mono text-foreground">{connector.connectorId}</td>
                      <td className="px-4 py-3 text-foreground">{connector.department}</td>
                      <td className="px-4 py-3 text-foreground">{connector.protocol}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${healthStyles[connector.health]}`}>
                          {connector.health}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-foreground">{connector.version}</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">{connector.lastChecked}</td>
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
