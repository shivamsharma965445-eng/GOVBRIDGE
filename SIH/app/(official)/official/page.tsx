"use client";

import Link from 'next/link';
import type { Route } from 'next';
import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Divider } from '@/components/ui/divider';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { DataTable } from '@/components/official/data-table';
import { FilterBar } from '@/components/official/filter-bar';
import { MetricCard } from '@/components/official/metric-card';
import { SLAIndicator } from '@/components/official/sla-indicator';
import { StatusBadge } from '@/components/official/status-badge';
import {
  formatOfficialTimestamp,
  officialActivities,
  officialCases,
  officialFilterOptions,
  officialMetrics,
  officialSidebarItems,
} from '@/lib/official-console-data';

const activityItems = officialActivities.slice(0, 4);

const summaryCounts = {
  onTrack: officialCases.filter((item) => item.sla === 'On Track').length,
  atRisk: officialCases.filter((item) => item.sla === 'At Risk').length,
  breached: officialCases.filter((item) => item.sla === 'Breached').length,
};

const normalise = (value: string) => value.toLowerCase();

export default function OfficialPage() {
  const [stateFilter, setStateFilter] = useState('all');
  const [slaFilter, setSlaFilter] = useState('all');

  const filteredCases = useMemo(() => {
    return officialCases.filter((row) => {
      const matchesState = stateFilter === 'all' || normalise(row.currentState) === normalise(stateFilter);
      const matchesSla = slaFilter === 'all' || row.sla === slaFilter;
      return matchesState && matchesSla;
    });
  }, [stateFilter, slaFilter]);

  return (
    <Container className="py-8 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(220px,260px)_minmax(0,1fr)]">
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card className="p-5 sm:p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Official console
            </p>
            <h1 className="mt-2 font-display text-3xl tracking-[-0.04em] text-foreground">
              Overview
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Information-dense case operations for official users, with the same GovBridge visual language.
            </p>
          </Card>

          <nav aria-label="Official console sidebar" className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm font-medium text-foreground">Sidebar</p>
            <ul className="mt-3 space-y-1">
              {officialSidebarItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href as Route}
                    className="flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="space-y-10">
          <section id="overview" className="space-y-5">
            <PageHeader
              eyebrow="Official console"
              title="Case operations and public service coordination"
              description="Monitor workloads, review exceptions, and keep service delivery aligned with policy and public accountability."
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {officialMetrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>

            <Card className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <SectionLabel>Operational stance</SectionLabel>
                  <h2 className="mt-2 text-2xl font-semibold text-foreground">A restrained, accountable view</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                    The console shows the work queue, but keeps citizen data limited to what officials need to coordinate action.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <StatusBadge status="Department review" label="Review focus" />
                  <StatusBadge status="Approved" label="Escalation tracked" />
                </div>
              </div>
            </Card>
          </section>

          <section id="cases" className="space-y-4">
            <div>
              <SectionLabel>Cases</SectionLabel>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Queue with SLA awareness</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                Case rows stay focused on service name, applicant, owner, and SLA state—nothing unnecessary.
              </p>
            </div>

            <FilterBar
              state={stateFilter}
              sla={slaFilter}
              onStateChange={setStateFilter}
              onSlaChange={setSlaFilter}
              stateOptions={officialFilterOptions.state}
              slaOptions={officialFilterOptions.sla}
            />

            <DataTable rows={filteredCases} />
          </section>

          <section id="tasks" className="space-y-4">
            <div>
              <SectionLabel>Tasks</SectionLabel>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Tasks due today</h2>
            </div>
            <Card className="p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Due today</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">14</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">SLA risks</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">9</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Exceptions</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">6</p>
                </div>
              </div>
            </Card>
          </section>

          <section id="exceptions" className="space-y-4">
            <div>
              <SectionLabel>Exceptions</SectionLabel>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Items needing attention</h2>
            </div>
            <Card className="p-5 sm:p-6">
              <p className="text-sm leading-6 text-muted-foreground">
                Exceptions are presented as case-level issues that need manual review. The console avoids internal identifiers or technical payload details.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <SLAIndicator status="At Risk" />
                <SLAIndicator status="Breached" />
              </div>
            </Card>
          </section>

          <section id="data-requests" className="space-y-4">
            <div>
              <SectionLabel>Data Requests</SectionLabel>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Recent data sharing requests</h2>
            </div>
            <Card className="p-5 sm:p-6">
              <p className="text-sm leading-6 text-muted-foreground">
                Officials can see which participating systems were asked for data, while the citizen-facing case view remains the source of truth.
              </p>
            </Card>
          </section>

          <section id="entity-reviews" className="space-y-4">
            <div>
              <SectionLabel>Entity Reviews</SectionLabel>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Participating entity checks</h2>
            </div>
            <Card className="p-5 sm:p-6">
              <p className="text-sm leading-6 text-muted-foreground">
                Entity reviews are kept intentionally simple in this demo and track only the operational status needed by officials.
              </p>
            </Card>
          </section>

          <section id="audit" className="space-y-4">
            <div>
              <SectionLabel>Audit</SectionLabel>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Recent activity trail</h2>
            </div>
            <div className="space-y-3">
              {activityItems.map((activity) => (
                <Card key={`${activity.title}-${activity.timestamp}`} className="p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{activity.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{activity.description}</p>
                      <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        {activity.category}
                      </p>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      {formatOfficialTimestamp(activity.timestamp)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="analytics" className="space-y-4">
            <div>
              <SectionLabel>Analytics</SectionLabel>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">SLA distribution</h2>
            </div>
            <Card className="p-5 sm:p-6">
              <div className="space-y-4">
                {[
                  { label: 'On Track', value: summaryCounts.onTrack, width: 72 },
                  { label: 'At Risk', value: summaryCounts.atRisk, width: 42 },
                  { label: 'Breached', value: summaryCounts.breached, width: 18 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="font-medium text-foreground">{item.label}</span>
                      <span className="font-mono text-muted-foreground">{item.value}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted" aria-hidden="true">
                      <div className="h-2 rounded-full bg-accent" style={{ width: `${item.width}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Divider />

          <section aria-label="Operational summary">
            <Card className="p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Summary
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-foreground">
                    Operations stay focused on the case, not the infrastructure
                  </h2>
                </div>
                <Link
                  href={'/official/cases/GOV-2026-000184' as Route}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9b7310] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                >
                  Open demo case
                </Link>
              </div>
            </Card>
          </section>
        </main>
      </div>
    </Container>
  );
}
