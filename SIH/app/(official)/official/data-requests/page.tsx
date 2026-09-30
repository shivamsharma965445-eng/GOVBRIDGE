import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { officialDataRequests } from '@/lib/official-demo-data';

const statusStyles: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200',
  APPROVED: 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200',
  COMPLETED: 'bg-sky-100 text-sky-800 ring-1 ring-inset ring-sky-200',
  DENIED: 'bg-rose-100 text-rose-800 ring-1 ring-inset ring-rose-200',
};

export default function OfficialDataRequestsPage() {
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
        { label: 'Data Requests' },
      ]}
      footerLinks={[
        { label: 'Overview', href: '/official' },
        { label: 'Data Requests', href: '/official/data-requests' },
        { label: 'Audit Log', href: '/official/audit' },
        { label: 'Support', href: '/support' },
      ]}
      footerNote="A data request remains traceable and reviewable before any record is shared."
    >
      <Container className="py-8 sm:py-12">
        <PageHeader
          eyebrow="Official data sharing"
          title="Data Requests"
          description="Review and act on requests for citizen record access, service validation, and cross-department data checks."
        />

        <section className="mt-8 space-y-4">
          <SectionLabel>Request queue</SectionLabel>
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-muted/60">
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Data Request ID</th>
                    <th className="px-4 py-3 font-medium">Case ID</th>
                    <th className="px-4 py-3 font-medium">Requester</th>
                    <th className="px-4 py-3 font-medium">Provider</th>
                    <th className="px-4 py-3 font-medium">Purpose</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {officialDataRequests.map((request) => (
                    <tr key={request.id} className="border-b border-border last:border-none align-top">
                      <td className="px-4 py-3 font-mono text-foreground">{request.id}</td>
                      <td className="px-4 py-3 font-mono text-foreground">
                        <Link href={`/official/cases/${request.caseId}`} className="hover:text-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2">
                          {request.caseId}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-foreground">{request.requester}</td>
                      <td className="px-4 py-3 text-foreground">{request.provider}</td>
                      <td className="px-4 py-3 text-foreground">{request.purpose}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${statusStyles[request.status]}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{request.created}</td>
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
