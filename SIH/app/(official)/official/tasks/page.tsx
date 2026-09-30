'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { officialTaskRows } from '@/lib/official-demo-data';

const priorityOrder = ['High', 'Medium', 'Low'] as const;

const priorityStyles: Record<string, string> = {
  High: 'bg-rose-100 text-rose-800 ring-1 ring-inset ring-rose-200',
  Medium: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200',
  Low: 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200',
};

export default function OfficialTasksPage() {
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedTaskId, setSelectedTaskId] = useState(officialTaskRows[0]?.id ?? '');

  const filteredTasks = useMemo(() => {
    if (priorityFilter === 'All') return officialTaskRows;
    return officialTaskRows.filter((task) => task.priority === priorityFilter);
  }, [priorityFilter]);

  const selectedTask =
    filteredTasks.find((task) => task.id === selectedTaskId) ?? filteredTasks[0] ?? officialTaskRows[0];

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
      mobileNavItems={[
        { label: 'Overview', href: '/official' },
        { label: 'Tasks', href: '/official/tasks' },
        { label: 'Cases', href: '/official/cases/GOV-2026-000184' },
        { label: 'Exceptions', href: '/official/exceptions' },
      ]}
      secondaryActions={[{ label: 'Back to official console', href: '/official' }]}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Official', href: '/official' },
        { label: 'Tasks' },
      ]}
      footerLinks={[
        { label: 'Overview', href: '/official' },
        { label: 'Cases', href: '/official/cases/GOV-2026-000184' },
        { label: 'Tasks', href: '/official/tasks' },
        { label: 'Support', href: '/support' },
      ]}
      footerNote="Task follow-up keeps official review teams aligned to case status and SLA risk."
    >
      <Container className="py-8 sm:py-12">
        <PageHeader
          eyebrow="Official tasks"
          title="Pending Tasks"
          description="Operational follow-ups for staff assigned to service review, exception handling, and policy-sensitive decisions."
        />

        <section className="mt-8 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SectionLabel>Queue</SectionLabel>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Priority</span>
              <select
                aria-label="Filter tasks by priority"
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value)}
                className="min-h-[44px] rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                <option value="All">All</option>
                {priorityOrder.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(240px,0.6fr)]">
            <Card className="overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-muted/60">
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="px-4 py-3 font-medium">Task</th>
                      <th className="px-4 py-3 font-medium">Assigned To</th>
                      <th className="px-4 py-3 font-medium">Case ID</th>
                      <th className="px-4 py-3 font-medium">Department</th>
                      <th className="px-4 py-3 font-medium">Priority</th>
                      <th className="px-4 py-3 font-medium">Due/SLA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="border-b border-border last:border-none">
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => setSelectedTaskId(task.id)}
                            className="text-left font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                          >
                            {task.title}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-foreground">{task.assignedTo}</td>
                        <td className="px-4 py-3 font-mono text-foreground">
                          <Link href={`/official/cases/${task.caseId}`} className="hover:text-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2">
                            {task.caseId}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-foreground">{task.department}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${priorityStyles[task.priority]}`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{task.due}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-5 sm:p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Selected task</p>
              {selectedTask ? (
                <>
                  <h2 className="mt-3 text-xl font-semibold text-foreground">{selectedTask.title}</h2>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-muted-foreground">Task ID</dt>
                      <dd className="font-mono text-foreground">{selectedTask.id}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-muted-foreground">Assigned</dt>
                      <dd className="text-foreground">{selectedTask.assignedTo}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-muted-foreground">Case</dt>
                      <dd className="font-mono text-foreground">{selectedTask.caseId}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-muted-foreground">Priority</dt>
                      <dd>
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${priorityStyles[selectedTask.priority]}`}>
                          {selectedTask.priority}
                        </span>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-muted-foreground">Due</dt>
                      <dd className="text-foreground">{selectedTask.due}</dd>
                    </div>
                  </dl>
                  <Link
                    href={`/official/cases/${selectedTask.caseId}`}
                    className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-md border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9b7310] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                  >
                    Open case
                  </Link>
                </>
              ) : null}
            </Card>
          </div>
        </section>
      </Container>
    </AppShell>
  );
}
