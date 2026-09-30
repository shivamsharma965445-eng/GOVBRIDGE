'use client';

import Link from 'next/link';
import { dashboardData } from '@/lib/dashboard-data';
import { ApplicationSummary } from '@/components/dashboard/application-summary';
import { NotificationItem } from '@/components/dashboard/notification-item';
import { QuickAction } from '@/components/dashboard/quick-action';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { Divider } from '@/components/ui/divider';

export default function CitizenDashboardPage() {
  const { activeApplication, recentApplications, notifications } = dashboardData;

  return (
    <main className="min-h-screen bg-background">
        {/* Header Section */}
        <Container className="py-8 sm:py-12">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Dashboard
              </p>
              <h1 className="mt-3 font-display text-3xl leading-none tracking-[-0.04em] text-foreground sm:text-4xl">
                Good morning.
              </h1>
            </div>
            <Link
              href="/services"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-accent px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#9b7310] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2 whitespace-nowrap"
            >
              Find a service
            </Link>
          </div>
        </Container>

        <Divider />

        {/* Main Content */}
        <Container className="py-8 sm:py-12">
          <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
            {/* Left Column - Applications (2/3 width on large) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Active Application */}
              <section>
                <SectionLabel>Active Application</SectionLabel>
                <div className="mt-4">
                  <ApplicationSummary application={activeApplication} />
                </div>
              </section>

              {/* Recent Applications */}
              <section>
                <SectionLabel>Recent Applications</SectionLabel>
                <div className="mt-4 space-y-3">
                  {recentApplications.map((app) => (
                    <Link
                      key={app.caseId}
                      href={`/applications/${app.caseId}`}
                      className="group block"
                    >
                      <Card className="p-4 transition-all hover:border-accent hover:shadow-md sm:p-5">
                        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                              <span className="font-mono text-sm font-semibold text-foreground">
                                {app.caseId}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {app.serviceName}
                              </span>
                            </div>
                            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                              <p className="text-xs text-muted-foreground">
                                Status: <span className="font-medium text-foreground">{app.status}</span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Last updated:{' '}
                                <span className="font-medium text-foreground">
                                  {new Date(app.lastUpdated).toLocaleDateString('en-IN')}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="text-right text-sm text-accent font-medium opacity-0 transition-opacity group-hover:opacity-100">
                            View →
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Notifications */}
              <section>
                <SectionLabel>Notifications</SectionLabel>
                <div className="mt-4 space-y-3">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                      />
                    ))
                  ) : (
                    <Card className="p-4 text-center text-muted-foreground">
                      No notifications
                    </Card>
                  )}
                </div>
              </section>
            </div>

            {/* Right Column - Quick Actions (1/3 width on large) */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <h2 className="font-display text-lg leading-none tracking-[-0.02em] text-foreground">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1">
                  <QuickAction
                    href="/services"
                    icon="🔍"
                    title="Find a service"
                    description="Browse available government services"
                  />
                  <QuickAction
                    href="/notifications"
                    icon="📋"
                    title="View notifications"
                    description="Read the latest updates for your case"
                  />
                  <QuickAction
                    href="/track"
                    icon="📍"
                    title="Track case"
                    description="Check the latest update for your case"
                  />
                  <QuickAction
                    href="/cases/GOV-2026-000184"
                    icon="📄"
                    title="Open application"
                    description="View the active case timeline and updates"
                  />
                  <QuickAction
                    href="/cases/GOV-2026-000184/grievance"
                    icon="🆘"
                    title="Raise grievance"
                    description="Report issues or concerns"
                  />
                  <QuickAction
                    href="/documents"
                    icon="📄"
                    title="View documents"
                    description="Access your submitted records and certificates"
                  />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </main>
  );
}
