import Link from 'next/link';
import type { Route } from 'next';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Divider } from '@/components/ui/divider';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { CaseSummary } from '@/components/official-review/case-summary';
import { WorkflowTask } from '@/components/official-review/workflow-task';
import { ProvenancePanel } from '@/components/official-review/provenance-panel';
import { EntityMatchCard } from '@/components/official-review/entity-match-card';
import { AuditTimeline } from '@/components/official-review/audit-timeline';
import { officialReviewCaseData } from '@/lib/official-case-review-data';

interface OfficialCaseReviewPageProps {
  params: { caseId: string };
}

const officialNavItems = [
  { label: 'Overview', href: '/official' },
  { label: 'Cases', href: '/official/cases/GOV-2026-000184' },
  { label: 'Exceptions', href: '/official/exceptions' },
  { label: 'Entity Reviews', href: '/official/entity-reviews' },
  { label: 'Audit', href: '/official/audit' },
];

const caseIdRoute = '/official/cases/GOV-2026-000184' as Route;

export default function OfficialCaseReviewPage({ params }: OfficialCaseReviewPageProps) {
  if (params.caseId !== officialReviewCaseData.summary.caseId) {
    notFound();
  }

  const { summary, provenance, dataRequests, consentContext, entityMatch, documents, auditHistory, workflowActions } = officialReviewCaseData;

  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={officialNavItems}
      mobileNavItems={officialNavItems}
      secondaryActions={[{ label: 'Back to official console', href: '/official' }]}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Official', href: '/official' },
        { label: summary.caseId, href: caseIdRoute },
      ]}
      footerLinks={[
        { label: 'Overview', href: '/official' },
        { label: 'Cases', href: '/official/cases/GOV-2026-000184' },
        { label: 'Exceptions', href: '/official/exceptions' },
        { label: 'Audit Log', href: '/official/audit' },
        { label: 'Support', href: '/support' },
      ]}
      footerNote="Official case review provides richer context without exposing sensitive raw payloads."
    >
      <Container className="py-8 sm:py-12">
        <div className="space-y-8">
          <PageHeader
            eyebrow="Official case review"
            title={summary.caseId}
            description={summary.serviceName}
          />

          <CaseSummary caseData={summary} />

          <section className="space-y-4">
            <SectionLabel>2. Applicant context</SectionLabel>
            <Card className="p-5 sm:p-6">
              <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Applicant</dt>
                  <dd className="mt-1 text-sm text-foreground">{summary.applicantName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Current state</dt>
                  <dd className="mt-1 text-sm text-foreground">{summary.currentState}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Owner</dt>
                  <dd className="mt-1 text-sm text-foreground">{summary.owner}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Last updated</dt>
                  <dd className="mt-1 text-sm text-foreground">{new Date(summary.lastUpdated).toLocaleString('en-IN')}</dd>
                </div>
              </dl>
            </Card>
          </section>

          <section className="space-y-4">
            <SectionLabel>3. Service</SectionLabel>
            <Card className="p-5 sm:p-6">
              <p className="text-sm leading-6 text-muted-foreground">
                Service: <span className="font-medium text-foreground">{summary.serviceName}</span>
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                The official view keeps the service context narrow: it shows the operational review scope and avoids exposing citizen-sensitive payloads.
              </p>
            </Card>
          </section>

          <section className="space-y-4">
            <SectionLabel>4. Current workflow</SectionLabel>
            <WorkflowTask actions={workflowActions} />
          </section>

          <section className="space-y-4">
            <SectionLabel>5. Source / provenance</SectionLabel>
            <ProvenancePanel provenance={provenance} />
          </section>

          <section className="space-y-4">
            <SectionLabel>6. Data requests</SectionLabel>
            <Card className="p-5 sm:p-6">
              <ul className="space-y-3 text-sm leading-6 text-foreground">
                {dataRequests.map((request) => (
                  <li key={request} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-accent" />
                    <span>{request}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          <section className="space-y-4">
            <SectionLabel>7. Consent context</SectionLabel>
            <Card className="p-5 sm:p-6">
              <p className="text-sm leading-6 text-muted-foreground">{consentContext}</p>
            </Card>
          </section>

          <section className="space-y-4">
            <SectionLabel>8. Entity resolution</SectionLabel>
            <EntityMatchCard entityMatch={entityMatch} />
          </section>

          <section className="space-y-4">
            <SectionLabel>9. Documents</SectionLabel>
            <div className="grid gap-4 lg:grid-cols-3">
              {documents.map((document) => (
                <Card key={document.title} className="p-5 sm:p-6">
                  <p className="text-sm font-semibold text-foreground">{document.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{document.status}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{document.note}</p>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <SectionLabel>10. Audit history</SectionLabel>
            <AuditTimeline events={auditHistory} />
          </section>

          <Divider />

          <section>
            <Card className="p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Operational note
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-foreground">No silent merges, no hidden credentials</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                    The review flow surfaces enough context for an official decision while keeping the system safe for citizens and operators alike.
                  </p>
                </div>
                <Link
                  href={`/official/cases/${summary.caseId}` as Route}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9b7310] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                >
                  Review again
                </Link>
              </div>
            </Card>
          </section>
        </div>
      </Container>
    </AppShell>
  );
}
