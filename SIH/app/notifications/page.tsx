'use client';

import Link from 'next/link';
import * as React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Divider } from '@/components/ui/divider';
import { Card } from '@/components/ui/card';
import { citizenNotifications, formatCitizenNotificationDate } from '@/lib/notifications-data';

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState(citizenNotifications);

  const unreadCount = notifications.filter((notification) => notification.readState === 'unread').length;

  const markAsRead = (notificationId: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId
          ? { ...notification, readState: 'read' }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, readState: 'read' })));
  };

  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Services', href: '/services' },
        { label: 'Applications', href: '/applications' },
        { label: 'Support', href: '/support' },
      ]}
      mobileNavItems={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Services', href: '/services' },
        { label: 'Applications', href: '/applications' },
        { label: 'Support', href: '/support' },
      ]}
      secondaryActions={[{ label: 'Back to dashboard', href: '/dashboard' }]}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Notifications' }]}
      footerLinks={[
        { label: 'Privacy', href: '/privacy' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Support', href: '/support' },
      ]}
      footerNote="Citizen notifications are shown in plain language with no internal event details."
    >
      <Container className="py-8 sm:py-12">
        <div className="space-y-8">
          <PageHeader
            eyebrow="Notifications"
            title="Your case updates"
            description="These updates are written for citizens. They show what happened, which case it belongs to, and whether you still need to read it."
          />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-muted-foreground">
              Updates include application submission, consent, verification, review, approval, payment, and exception messages.
            </p>
            <div className="flex items-center gap-3">
              <p aria-live="polite" className="text-sm leading-6 text-muted-foreground">
                {unreadCount} unread
              </p>
              {unreadCount > 0 ? (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                >
                  Mark all read
                </button>
              ) : null}
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          {notification.type}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-foreground">{notification.title}</h3>
                      </div>
                      {notification.readState === 'unread' ? (
                        <span aria-label="Unread notification" className="inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                      ) : null}
                    </div>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{notification.message}</p>

                    <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
                      <p>
                        Related case:{' '}
                        <Link href={`/cases/${notification.relatedCase}`} className="font-mono text-accent underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2">
                          {notification.relatedCase}
                        </Link>
                      </p>
                      <p>{formatCitizenNotificationDate(notification.timestamp)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Link href={`/cases/${notification.relatedCase}`} className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-accent bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#9b7310] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2">
                    Open case
                  </Link>
                  {notification.readState === 'unread' ? (
                    <button
                      type="button"
                      onClick={() => markAsRead(notification.id)}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                    >
                      Mark as read
                    </button>
                  ) : null}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </AppShell>
  );
}
