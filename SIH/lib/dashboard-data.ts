// Mock citizen dashboard data
// This data represents active applications and notifications for demo purposes

export type ApplicationStatus = 
  | 'SUBMITTED' 
  | 'DEPARTMENT_REVIEW' 
  | 'VERIFICATION_PENDING' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'AWAITING_ACTION';

export interface Application {
  caseId: string;
  serviceName: string;
  status: ApplicationStatus;
  submittedDate: string;
  lastUpdated: string;
  nextAction: string;
  progress: number; // 0-100
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  timestamp: string;
  isRead: boolean;
  caseId?: string;
}

export interface DashboardData {
  activeApplication: Application;
  recentApplications: Application[];
  notifications: Notification[];
}

// Demo active application - Scholarship & Welfare
const activeApplication: Application = {
  caseId: 'GOV-2026-000184',
  serviceName: 'Scholarship & Welfare',
  status: 'DEPARTMENT_REVIEW',
  submittedDate: '2026-08-15',
  lastUpdated: '2026-09-05',
  nextAction: 'No action required from you',
  progress: 60, // Department review stage
};

// Recent applications history
const recentApplications: Application[] = [
  {
    caseId: 'GOV-2026-000184',
    serviceName: 'Scholarship & Welfare',
    status: 'DEPARTMENT_REVIEW',
    submittedDate: '2026-08-15',
    lastUpdated: '2026-09-05',
    nextAction: 'No action required from you',
    progress: 60,
  },
  {
    caseId: 'GOV-2026-000175',
    serviceName: 'Income Verification',
    status: 'APPROVED',
    submittedDate: '2026-07-20',
    lastUpdated: '2026-08-30',
    nextAction: 'Certificate ready for download',
    progress: 100,
  },
  {
    caseId: 'GOV-2026-000165',
    serviceName: 'Institution Verification',
    status: 'VERIFICATION_PENDING',
    submittedDate: '2026-06-10',
    lastUpdated: '2026-08-28',
    nextAction: 'Waiting for institution response',
    progress: 50,
  },
];

// Notifications for citizen
const notifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'Application under review',
    message: 'Your Scholarship & Welfare application (GOV-2026-000184) is being reviewed by the department. This usually takes 5-7 business days.',
    type: 'info',
    timestamp: '2026-09-05T10:30:00Z',
    isRead: false,
    caseId: 'GOV-2026-000184',
  },
  {
    id: 'notif-002',
    title: 'Document verified',
    message: 'Your income verification document has been successfully verified. You can download the certificate from your applications.',
    type: 'success',
    timestamp: '2026-08-30T14:15:00Z',
    isRead: true,
    caseId: 'GOV-2026-000175',
  },
  {
    id: 'notif-003',
    title: 'New service available',
    message: 'A new emergency assistance service is now available. Check if you&apos;re eligible to apply.',
    type: 'info',
    timestamp: '2026-09-03T09:00:00Z',
    isRead: true,
  },
  {
    id: 'notif-004',
    title: 'Scheduled maintenance',
    message: 'GovBridge will be under scheduled maintenance on Sept 8 from 2 AM to 4 AM for system upgrades.',
    type: 'alert',
    timestamp: '2026-09-01T16:45:00Z',
    isRead: true,
  },
];

export const dashboardData: DashboardData = {
  activeApplication,
  recentApplications,
  notifications,
};

// Helper function to get status label for display
export const getStatusLabel = (status: ApplicationStatus): string => {
  const labels: Record<ApplicationStatus, string> = {
    SUBMITTED: 'Submitted',
    DEPARTMENT_REVIEW: 'Under Review',
    VERIFICATION_PENDING: 'Verification Pending',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
    AWAITING_ACTION: 'Action Required',
  };
  return labels[status];
};

// Helper function to get status color for badge
export const getStatusColor = (
  status: ApplicationStatus
): 'success' | 'warning' | 'info' | 'error' => {
  switch (status) {
    case 'APPROVED':
      return 'success';
    case 'REJECTED':
    case 'AWAITING_ACTION':
      return 'error';
    case 'VERIFICATION_PENDING':
    case 'DEPARTMENT_REVIEW':
      return 'warning';
    case 'SUBMITTED':
    default:
      return 'info';
  }
};

// Helper to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if date is today
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  // Check if date is yesterday
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return 'Yesterday';
  }

  // Return formatted date
  return date.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() === today.getFullYear() ? undefined : 'numeric',
  });
};
