import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { officialPolicyRecords } from '@/lib/official-demo-data';

const statusStyles: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200',
  Review: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200',
  Draft: 'bg-slate-200 text-slate-700 ring-1 ring-inset ring-slate-300',
};

export default function OfficialPoliciesPage() {
  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={[
        { label: 'Overview', href: '/official' },
        { label: 'Cases', href: '/official/cases/GOV-2026-000184' },
        { label: 'Tasks', href: '/official/tasks' },
        { label: 'Exceptions', href: '/official/exceptions' },
        { label: 'Data Requests', href: '/official/data-requests' },
        { label: 'Entity Reviews', href: '/official/entity-reviews' },
        { label: 'Audit', href: '/official/audit' },
        { label: 'Analytics', href: '/official/analytics' },
      ]}
      secondaryActions={[{ label: 'Back to official console', href: '/official' }]}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Official', href: '/official' },
        { label: 'Policies' },
      ]}
      footerLinks={[
        { label: 'Overview', href: '/official' },
        { label: 'Policies', href: '/official/policies' },
        { label: 'Help', href: '/official/help' },
        { label: 'Support', href: '/support' },
      ]}
      footerNote="Demo policy records show the governance and review controls used in the GovBridge operating model."
    >
      <Container className="py-8 sm:py-12">
        <PageHeader
          eyebrow="Official policies"
          title="Demo policy configurations"
          description="These records represent the governance rules and operational constraints used for data sharing, case resolution and review controls."
        />

        <section className="mt-8 space-y-4">
          <SectionLabel>Policy records</SectionLabel>
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-muted/60">
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Policy ID</th>
                    <th className="px-4 py-3 font-medium">Purpose</th>
                    <th className="px-4 py-3 font-medium">Resource</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Last updated</th>
                  </tr>
                </thead>
                <tbody>
                  {officialPolicyRecords.map((policy) => (
                    <tr key={policy.id} className="border-b border-border last:border-none align-top">
                      <td className="px-4 py-3 font-mono text-foreground">{policy.id}</td>
                      <td className="px-4 py-3 text-foreground">{policy.purpose}</td>
                      <td className="px-4 py-3 text-foreground">{policy.resource}</td>
                      <td className="px-4 py-3 text-foreground">{policy.action}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${statusStyles[policy.status]}`}>
                          {policy.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{policy.lastUpdated}</td>
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
