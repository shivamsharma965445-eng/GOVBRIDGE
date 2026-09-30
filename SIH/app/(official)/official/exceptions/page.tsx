'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useMemo, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Divider } from '@/components/ui/divider';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { ExceptionQueueTable } from '@/components/exceptions/exception-queue-table';
import { ExceptionDetailCard } from '@/components/exceptions/exception-detail-card';
import { ExceptionLifecycle } from '@/components/exceptions/exception-lifecycle';
import { ExceptionWorkflowPanel } from '@/components/exceptions/exception-workflow-panel';
import { exceptionActions, officialExceptions } from '@/lib/official-exceptions-data';

const officialNavItems = [
  { label: 'Overview', href: '/official' },
  { label: 'Cases', href: '/official/cases/GOV-2026-000184' },
  { label: 'Exceptions', href: '/official/exceptions' },
  { label: 'Entity Reviews', href: '/official/entity-reviews' },
  { label: 'Audit', href: '/official/audit' },
];

export default function OfficialExceptionsPage() {
  const [activeExceptionId, setActiveExceptionId] = useState(officialExceptions[0].exceptionId);

  const activeException = useMemo(
    () => officialExceptions.find((exception) => exception.exceptionId === activeExceptionId) ?? officialExceptions[0],
    [activeExceptionId],
  );

  const counts = {
    failure: officialExceptions.filter((exception) => exception.currentState === 'Failure').length,
    retry: officialExceptions.filter((exception) => exception.currentState === 'Retry available').length,
    dlq: officialExceptions.filter((exception) => exception.currentState === 'DLQ / Operator Review').length,
  };

  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={officialNavItems}
      mobileNavItems={officialNavItems}
      secondaryActions={[{ label: 'Back to official console', href: '/official' }]}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Official', href: '/official' },
        { label: 'Exceptions', href: '/official/exceptions' },
      ]}
      footerLinks={[
        { label: 'Overview', href: '/official' },
        { label: 'Cases', href: '/official/cases/GOV-2026-000184' },
        { label: 'Exceptions', href: '/official/exceptions' },
        { label: 'Audit Log', href: '/official/audit' },
        { label: 'Support', href: '/support' },
      ]}
      footerNote="Operational failures remain visible, actionable, and human-accountable."
    >
      <Container className="py-8 sm:py-12">
        <div className="space-y-8">
          <PageHeader
            eyebrow="Official exceptions"
            title="Recovery queue"
            description="Operational failures are visible in plain language so officials can retry, assign, or resolve them without pretending success has occurred."
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5 sm:p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Failures</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{counts.failure}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Cases in a failed state needing recovery.</p>
            </Card>
            <Card className="p-5 sm:p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Retry available</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{counts.retry}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Exceptions that can be retried by an operator.</p>
            </Card>
            <Card className="p-5 sm:p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">DLQ / Operator Review</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{counts.dlq}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Failures that need manual operator review.</p>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <main className="space-y-6">
              <section className="space-y-4">
                <SectionLabel>Exceptions queue</SectionLabel>
                <ExceptionQueueTable
                  rows={officialExceptions}
                  activeExceptionId={activeExceptionId}
                  onSelectException={setActiveExceptionId}
                />
              </section>

              <section className="space-y-4">
                <SectionLabel>Current record</SectionLabel>
                <ExceptionDetailCard exception={activeException} />
              </section>

              <section className="space-y-4">
                <SectionLabel>Lifecycle</SectionLabel>
                <ExceptionLifecycle exception={activeException} />
              </section>

              <section className="space-y-4">
                <SectionLabel>Recovery controls</SectionLabel>
                <ExceptionWorkflowPanel exception={activeException} actions={exceptionActions} />
              </section>
            </main>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Card className="p-5 sm:p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Human accountability
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">Every exception needs an operator</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  The console shows what failed, how many retries occurred, and whether recovery is available. It never presents a fake success.
                </p>
              </Card>

              <Card className="p-5 sm:p-6">
                <p className="text-sm font-medium text-foreground">Selected exception</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Exception ID</dt>
                    <dd className="font-mono text-foreground">{activeException.exceptionId}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Case ID</dt>
                    <dd className="font-mono text-foreground">{activeException.caseId}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Assigned operator</dt>
                    <dd className="text-foreground">{activeException.assignedOperator}</dd>
                  </div>
                </dl>
              </Card>

              <Card className="p-5 sm:p-6">
                <p className="text-sm font-medium text-foreground">Lifecycle reminder</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Failure → Retry → Recovery or DLQ / Operator Review
                </p>
              </Card>

              <Link
                href={'/official/cases/GOV-2026-000184' as Route}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9b7310] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                Open related case
              </Link>
            </aside>
          </div>

          <Divider />

          <section aria-label="Operational guidance">
            <Card className="p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Guidance
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-foreground">Operational failure stays visible until a human acts</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                    Retry, assign, and resolve controls remain explicit. Uncertain states are not hidden behind color or automation.
                  </p>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </Container>
    </AppShell>
  );
}
