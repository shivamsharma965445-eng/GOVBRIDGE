'use client';

import { Notification } from '@/lib/dashboard-data';
import { clsx } from 'clsx';

interface NotificationItemProps {
  notification: Notification;
}

const typeStyles = {
  info: 'border-[#D0E8F2] bg-[#EEFBFF] text-[#0B5A7A]',
  success: 'border-[#D7E9D7] bg-[#F3FAF4] text-[#1F5B36]',
  warning: 'border-[#F2E7C5] bg-[#FCF6E8] text-[#7C5A12]',
  alert: 'border-[#F5D7D7] bg-[#FFFBFB] text-[#8B3A3A]',
};

const typeIcons = {
  info: '📋',
  success: '✓',
  warning: '⚠',
  alert: '!',
};

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  return (
    <article
      className={clsx(
        'flex gap-3 rounded-lg border px-4 py-3 sm:px-5 sm:py-4',
        typeStyles[notification.type]
      )}
    >
      {/* Icon */}
      <div
        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center text-sm"
        aria-hidden="true"
      >
        {typeIcons[notification.type]}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-snug">
            {notification.title}
          </h3>
          {!notification.isRead && (
            <span
              className="mt-0.5 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-current"
              aria-label="Unread notification"
            />
          )}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-current opacity-90">
          {notification.message}
        </p>
        <p className="mt-2 text-xs opacity-70">
          {new Date(notification.timestamp).toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </p>
      </div>
    </article>
  );
};
