export type CitizenNotificationType = 'info' | 'success' | 'warning' | 'alert';
export type CitizenNotificationReadState = 'read' | 'unread';

export interface CitizenNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  relatedCase: string;
  readState: CitizenNotificationReadState;
  type: CitizenNotificationType;
}

export const citizenNotifications: CitizenNotification[] = [
  {
    id: 'notif-001',
    title: 'Application submitted',
    message: 'Your Scholarship & Welfare application was received and added to your unified case.',
    timestamp: '2026-08-15T09:12:00Z',
    relatedCase: 'GOV-2026-000184',
    readState: 'read',
    type: 'info',
  },
  {
    id: 'notif-002',
    title: 'Consent recorded',
    message: 'Your data sharing permission for income verification has been recorded.',
    timestamp: '2026-08-16T10:30:00Z',
    relatedCase: 'GOV-2026-000184',
    readState: 'read',
    type: 'success',
  },
  {
    id: 'notif-003',
    title: 'Verification completed',
    message: 'Eligibility checks are complete and the case has moved forward.',
    timestamp: '2026-08-21T13:45:00Z',
    relatedCase: 'GOV-2026-000184',
    readState: 'read',
    type: 'success',
  },
  {
    id: 'notif-004',
    title: 'Review started',
    message: 'The scholarship department has started reviewing your case.',
    timestamp: '2026-09-05T11:30:00Z',
    relatedCase: 'GOV-2026-000184',
    readState: 'unread',
    type: 'warning',
  },
  {
    id: 'notif-005',
    title: 'Approval update',
    message: 'A prior application was approved and is waiting for the next processing step.',
    timestamp: '2026-08-30T08:15:00Z',
    relatedCase: 'GOV-2026-000175',
    readState: 'read',
    type: 'success',
  },
  {
    id: 'notif-006',
    title: 'Payment update',
    message: 'Payment preparation is underway for an approved application.',
    timestamp: '2026-08-31T14:05:00Z',
    relatedCase: 'GOV-2026-000175',
    readState: 'read',
    type: 'info',
  },
  {
    id: 'notif-007',
    title: 'Action needed',
    message: 'Please review one missing supporting detail to keep your case moving.',
    timestamp: '2026-09-06T07:50:00Z',
    relatedCase: 'GOV-2026-000184',
    readState: 'unread',
    type: 'alert',
  },
];

export const formatCitizenNotificationDate = (timestamp: string): string =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));
