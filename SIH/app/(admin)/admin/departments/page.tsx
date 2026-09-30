import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { adminDepartments } from '@/lib/admin-demo-data';

const statusStyles: Record<string, string> = {
  Connected: 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200',
  Review: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200',
  Monitoring: 'bg-sky-100 text-sky-800 ring-1 ring-inset ring-sky-200',
};

export default function AdminDepartmentsPage() {
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
        { label: 'Departments' },
      ]}
      footerLinks={[
        { label: 'Overview', href: '/admin' },
        { label: 'Departments', href: '/admin/departments' },
        { label: 'System Health', href: '/admin/system-health' },
        { label: 'Audit', href: '/admin/audit' },
      ]}
      footerNote="Department status tracks integration health, service ownership and operational sync across connected agencies."
    >
      <Container className="py-8 sm:py-12">
        <PageHeader
          eyebrow="Admin departments"
          title="Department integrations"
          description="Monitor departmental connection status, service coverage, and ownership across the connected governance network."
        />

        <section className="mt-8 space-y-4">
          <SectionLabel>Departments</SectionLabel>
          <div className="grid gap-4 lg:grid-cols-2">
            {adminDepartments.map((department) => (
              <Card key={department.departmentId} className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xl font-semibold text-foreground">{department.department}</p>
                    <p className="mt-2 font-mono text-xs text-muted-foreground">{department.departmentId}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${statusStyles[department.integrationStatus]}`}>
                    {department.integrationStatus}
                  </span>
                </div>

                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">Services</dt>
                    <dd className="text-right text-foreground">{department.services}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">Last sync</dt>
                    <dd className="font-mono text-foreground">{department.lastSync}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">Owner</dt>
                    <dd className="text-foreground">{department.owner}</dd>
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
