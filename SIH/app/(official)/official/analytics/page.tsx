import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { officialAnalyticsSummary } from '@/lib/official-demo-data';

const metricCards = [
  { label: 'Cases processed', value: officialAnalyticsSummary.processedCases, description: 'Cases completed during the current reporting period.' },
  { label: 'Average processing time', value: officialAnalyticsSummary.avgProcessingTime, description: 'Average time from case submission to official decision.' },
  { label: 'SLA compliance', value: officialAnalyticsSummary.slaCompliance, description: 'Share of cases meeting their defined service target.' },
  { label: 'Exceptions', value: officialAnalyticsSummary.exceptions, description: 'Cases requiring operator intervention or recovery.' },
  { label: 'Successful data requests', value: officialAnalyticsSummary.successfulDataRequests, description: 'Requests completed without manual escalation.' },
];

export default function OfficialAnalyticsPage() {
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
        { label: 'Analytics' },
      ]}
      footerLinks={[
        { label: 'Overview', href: '/official' },
        { label: 'Analytics', href: '/official/analytics' },
        { label: 'Audit Log', href: '/official/audit' },
        { label: 'Support', href: '/support' },
      ]}
      footerNote="Operational analytics keep service delays and success rates visible without exposing sensitive citizen data."
    >
      <Container className="py-8 sm:py-12">
        <PageHeader
          eyebrow="Official analytics"
          title="Operational metrics"
          description="Review the service-level health, review throughput and completion patterns across GovBridge case handling."
        />

        <section className="mt-8 space-y-4">
          <SectionLabel>Current overview</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {metricCards.map((metric) => (
              <Card key={metric.label} className="p-5 sm:p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{metric.label}</p>
                <p className="mt-4 font-display text-3xl tracking-[-0.04em] text-foreground">{metric.value}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{metric.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionLabel>Text summary</SectionLabel>
          <Card className="mt-4 p-5 sm:p-6">
            <p className="text-sm leading-7 text-muted-foreground" aria-live="polite">
              GovBridge is processing over {officialAnalyticsSummary.processedCases} cases with an average turnaround time of {officialAnalyticsSummary.avgProcessingTime}. SLA compliance currently sits at {officialAnalyticsSummary.slaCompliance}, while {officialAnalyticsSummary.exceptions} exceptions and {officialAnalyticsSummary.successfulDataRequests} successful data requests show continued operational throughput across the connected system network.
            </p>
          </Card>
        </section>
      </Container>
    </AppShell>
  );
}
