'use client';

import Link from 'next/link';
import type { Route } from 'next';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Divider } from '@/components/ui/divider';
import { AppShell } from '@/components/layout/app-shell';
import { CaseSummary } from './case-summary';
import { CaseTimeline } from './case-timeline';
import { ConnectedApplications } from './connected-applications';
import {
  getUnifiedCaseTimelineIndex,
  unifiedCaseData,
  unifiedCaseTimelineOrder,
  type UnifiedCaseData,
  type UnifiedCaseStatus,
} from '@/lib/case-data';
import { PageHeader } from '@/components/ui/page-header';
import { readDemoState, type DemoCase } from '@/lib/demo-state';

const caseNavItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Services', href: '/services' },
  { label: 'Applications', href: '/applications' },
  { label: 'Support', href: '/support' },
];

const footerLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Consent', href: `/cases/${unifiedCaseData.caseId}/consent` },
];

interface UnifiedCasePageProps {
  caseId: string;
}

const getVisibleStatuses = (caseData: UnifiedCaseData) => {
  const currentIndex = getUnifiedCaseTimelineIndex(caseData.currentStatus);
  return unifiedCaseTimelineOrder.slice(0, currentIndex + 1);
};

const normalizeCaseStatus = (status: DemoCase['status']): UnifiedCaseStatus => {
  switch (status) {
    case 'CONSENT_REQUIRED':
      return 'SUBMITTED';
    case 'CONSENT_GRANTED':
      return 'DOCUMENTS_VALIDATED';
    case 'INFORMATION_REQUIRED':
      return 'FIELD_VERIFICATION';
    default:
      return status as UnifiedCaseStatus;
  }
};

const mapDemoCaseToUnifiedCase = (demoCase: DemoCase): UnifiedCaseData => ({
  caseId: demoCase.caseId,
  serviceName: demoCase.serviceName,
  currentStatus: normalizeCaseStatus(demoCase.status),
  nextAction: demoCase.nextAction,
  summary: demoCase.summary,
  statusExplanation:
    demoCase.status === 'APPROVED'
      ? 'The application has been approved and is ready for the next stage.'
      : demoCase.status === 'INFORMATION_REQUIRED'
        ? 'This case is waiting for the citizen to provide the additional information requested by the department.'
        : 'This case is progressing through the connected government workflow and the most recent official action is visible here.',
  timeline: demoCase.timeline.map((event) => ({
    status: normalizeCaseStatus(event.status),
    title: event.title,
    description: event.description,
    timestamp: event.timestamp,
    sourceCategory: event.source,
  })),
  connectedApplications: demoCase.connectedSystems,
});

export function UnifiedCasePage({ caseId }: UnifiedCasePageProps) {
  const [caseData, setCaseData] = React.useState<UnifiedCaseData | null>(null);

  React.useEffect(() => {
    const demoCase = readDemoState().applications.find((item) => item.caseId === caseId);
    setCaseData(demoCase ? mapDemoCaseToUnifiedCase(demoCase) : null);
  }, [caseId]);

  if (!caseData) {
    return (
      <AppShell
        brand="GOVBRIDGE"
        navItems={caseNavItems}
        mobileNavItems={caseNavItems}
        secondaryActions={[{ label: 'Back to dashboard', href: '/dashboard' }]}
        footerLinks={footerLinks}
      >
        <Container className="py-10 sm:py-14">
          <Card className="p-6">
            <h1 className="text-2xl font-semibold text-foreground">Case not found</h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              The requested case is not available in this demo workspace.
            </p>
          </Card>
        </Container>
      </AppShell>
    );
  }

  const visibleStatuses = getVisibleStatuses(caseData);
  const visibleEvents = caseData.timeline.filter((event) =>
    visibleStatuses.includes(event.status),
  );

  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={caseNavItems}
      mobileNavItems={caseNavItems}
      secondaryActions={[{ label: 'Go to consent', href: `/cases/${caseData.caseId}/consent` }]}
      footerLinks={footerLinks}
      footerNote="One unified case, one citizen view, no technical noise."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Applications', href: '/applications' },
        { label: caseData.caseId },
      ]}
    >
      <Container className="py-8 sm:py-12">
        <div className="space-y-8">
          <PageHeader
            eyebrow="Case overview"
            title={caseData.caseId}
            description={caseData.serviceName}
          />

          <CaseSummary caseData={caseData} />

          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Timeline</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                This view shows the chronological progress of one case. Only stages that make sense for the current demo state are shown.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
              <p className="sr-only">
                Timeline updates for case {caseData.caseId}. Current status is {caseData.currentStatus}.
              </p>
              <CaseTimeline events={visibleEvents} currentStatus={caseData.currentStatus} />
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Connected applications</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                These references belong to participating systems. GovBridge provides the unified case view that brings them together.
              </p>
            </div>
            <ConnectedApplications references={caseData.connectedApplications} />
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Next step</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                You should not take any action right now. You can still review the consent request or return to your dashboard.
              </p>
            </div>
            <Divider />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/cases/${caseData.caseId}/consent`}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9b7310] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                Open consent request
              </Link>
              <Link
                href={`/cases/${caseData.caseId}/grievance` as Route}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                Raise grievance
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                Back to dashboard
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </AppShell>
  );
}
