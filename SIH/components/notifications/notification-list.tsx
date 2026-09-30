import Link from 'next/link';
import type { Route } from 'next';
import { Card } from '@/components/ui/card';
import { type CitizenNotification } from '@/lib/notifications-data';
import { NotificationItem } from '@/components/dashboard/notification-item';

export interface NotificationListProps {
  notifications: CitizenNotification[];
}

export function NotificationList({ notifications }: NotificationListProps) {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card key={notification.id} className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <NotificationItem
                notification={{
                  id: notification.id,
                  title: notification.title,
                  message: notification.message,
                  timestamp: notification.timestamp,
                  type: notification.type,
                  isRead: notification.readState === 'read',
                }}
              />
              <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
                <p>
                  Related case:{' '}
                  <Link
                    href={`/cases/${notification.relatedCase}` as Route}
                    className="font-mono text-accent underline underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                  >
                    {notification.relatedCase}
                  </Link>
                </p>
                <p>
                  State:{' '}
                  <span className="font-medium text-foreground">
                    {notification.readState === 'read' ? 'Read' : 'Unread'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
