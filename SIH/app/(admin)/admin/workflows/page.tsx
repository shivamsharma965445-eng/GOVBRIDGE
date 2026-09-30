import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { adminWorkflows } from '@/lib/admin-demo-data';

const statusStyles: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200',
  Draft: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200',
  Monitoring: 'bg-sky-100 text-sky-800 ring-1 ring-inset ring-sky-200',
};

export default function AdminWorkflowsPage() {
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
        { label: 'Workflows' },
      ]}
      footerLinks={[
        { label: 'Overview', href: '/admin' },
        { label: 'Workflows', href: '/admin/workflows' },
        { label: 'System Health', href: '/admin/system-health' },
        { label: 'Audit', href: '/admin/audit' },
      ]}
      footerNote="Workflow definitions show the sequence of operational steps that keep each service journey accountable and traceable."
    >
      <Container className="py-8 sm:py-12">
        <PageHeader
          eyebrow="Admin workflows"
          title="Service workflows"
          description="Review the configured trigger, step list and lifecycle status for each operational workflow in the GovBridge platform."
        />

        <section className="mt-8 space-y-4">
          <SectionLabel>Workflows</SectionLabel>
          <div className="space-y-4">
            {adminWorkflows.map((workflow) => (
              <Card key={workflow.workflow} className="p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xl font-semibold text-foreground">{workflow.workflow}</p>
                    <p className="mt-2 text-sm text-muted-foreground">Version {workflow.version}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${statusStyles[workflow.status]}`}>
                    {workflow.status}
                  </span>
                </div>

                <dl className="mt-5 grid gap-4 sm:grid-cols-2 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Trigger</dt>
                    <dd className="mt-1 text-foreground">{workflow.trigger}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Status</dt>
                    <dd className="mt-1 text-foreground">{workflow.status}</dd>
                  </div>
                </dl>

                <div className="mt-5">
                  <p className="text-sm font-medium text-foreground">Steps</p>
                  <ul className="mt-3 space-y-2">
                    {workflow.steps.map((step) => (
                      <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span aria-hidden="true" className="mt-1.5 h-2 w-2 rounded-full bg-accent" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </AppShell>
  );
}
