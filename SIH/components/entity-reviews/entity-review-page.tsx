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
import { ReviewQueueTable } from './review-queue-table';
import { ReviewDetailPanel } from './review-detail-panel';
import { entityReviewQueue } from '@/lib/entity-review-data';

const officialNavItems = [
  { label: 'Overview', href: '/official' },
  { label: 'Cases', href: '/official/cases/GOV-2026-000184' },
  { label: 'Exceptions', href: '/official/exceptions' },
  { label: 'Entity Reviews', href: '/official/entity-reviews' },
  { label: 'Audit', href: '/official/audit' },
];

const sidebarSummary = [
  { label: 'Queue size', value: String(entityReviewQueue.length) },
  { label: 'Ambiguous', value: String(entityReviewQueue.filter((row) => row.matchType === 'Ambiguous').length) },
  { label: 'Unresolved', value: String(entityReviewQueue.filter((row) => row.matchType === 'Unresolved').length) },
];

export function EntityReviewPage() {
  const [activeReviewId, setActiveReviewId] = useState(entityReviewQueue[0].reviewId);
  const activeReview = useMemo(
    () => entityReviewQueue.find((review) => review.reviewId === activeReviewId) ?? entityReviewQueue[0],
    [activeReviewId],
  );

  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={officialNavItems}
      mobileNavItems={officialNavItems}
      secondaryActions={[{ label: 'Back to official console', href: '/official' }]}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Official', href: '/official' },
        { label: 'Entity Reviews', href: '/official/entity-reviews' },
      ]}
      footerLinks={[
        { label: 'Overview', href: '/official' },
        { label: 'Cases', href: '/official/cases/GOV-2026-000184' },
        { label: 'Exceptions', href: '/official/exceptions' },
        { label: 'Audit Log', href: '/official/audit' },
        { label: 'Support', href: '/support' },
      ]}
      footerNote="Entity resolution keeps human accountability explicit and avoids silent merges."
    >
      <Container className="py-8 sm:py-12">
        <div className="space-y-8">
          <PageHeader
            eyebrow="Entity resolution review"
            title="Review queue"
            description="Inspect AI suggestions, evidence, and human decisions before any record linkage is confirmed."
          />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <main className="space-y-6">
              <section className="space-y-4">
                <SectionLabel>Queue</SectionLabel>
                <ReviewQueueTable
                  rows={entityReviewQueue}
                  activeReviewId={activeReviewId}
                  onSelectReview={setActiveReviewId}
                />
              </section>

              <section className="space-y-4">
                <SectionLabel>Selected review</SectionLabel>
                <ReviewDetailPanel review={activeReview} />
              </section>
            </main>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Card className="p-5 sm:p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Human accountability
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">Every merge decision stays visible</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  The queue only exposes AI suggestion, confidence, evidence, and the human decision path.
                </p>
              </Card>

              <Card className="p-5 sm:p-6">
                <p className="text-sm font-medium text-foreground">Queue summary</p>
                <dl className="mt-4 space-y-3">
                  {sidebarSummary.map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
                      <dt className="text-muted-foreground">{item.label}</dt>
                      <dd className="font-mono text-foreground">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Card>

              <Card className="p-5 sm:p-6">
                <p className="text-sm font-medium text-foreground">Use case</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Deterministic and high-confidence matches can be confirmed only after a reviewer acknowledges the decision. Ambiguous and unresolved items always remain open for human review.
                </p>
              </Card>

              <Link
                href={'/official/cases/GOV-2026-000184' as Route}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9b7310] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                Open review case
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
                  <h2 className="mt-2 text-2xl font-semibold text-foreground">Do not auto-merge uncertain identities</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                    The queue makes the AI suggestion visible, but the final decision always belongs to the human reviewer.
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
