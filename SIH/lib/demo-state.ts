import type { UnifiedCaseStatus } from '@/lib/case-data';

export type ApplicationWorkflowState =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'CONSENT_REQUIRED'
  | 'CONSENT_GRANTED'
  | 'UNDER_REVIEW'
  | 'INFORMATION_REQUIRED'
  | 'APPROVED'
  | 'REJECTED'
  | 'COMPLETED';

export type DemoCaseStatus = UnifiedCaseStatus | 'CONSENT_REQUIRED' | 'CONSENT_GRANTED' | 'INFORMATION_REQUIRED';

export interface DemoTimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: DemoCaseStatus;
  source: string;
}

export interface DemoCase {
  caseId: string;
  citizenId: string;
  serviceId: string;
  serviceName: string;
  department: string;
  status: DemoCaseStatus;
  workflowState: ApplicationWorkflowState;
  submittedAt: string;
  lastUpdated: string;
  nextAction: string;
  summary: string;
  slaStatus: 'On Track' | 'At Risk' | 'Breached';
  documentsRequired: string[];
  consentState: 'Pending' | 'Approved' | 'Denied';
  consentPurpose: string;
  connectedSystems: Array<{ label: string; referenceId: string; description: string }>;
  timeline: DemoTimelineEvent[];
}

export interface DemoNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  relatedCase: string;
  readState: 'read' | 'unread';
  type: 'info' | 'success' | 'warning' | 'alert';
}

export interface DemoGrievance {
  grievanceId: string;
  caseId: string;
  category: string;
  description: string;
  supportingInformation: string;
  status: 'Created' | 'Under Review' | 'Resolved';
  createdDate: string;
  resolution: string;
}

export interface DemoException {
  exceptionId: string;
  caseId: string;
  department: string;
  operation: string;
  exceptionType: string;
  currentState: 'Open' | 'Retrying' | 'Assigned' | 'Resolved';
  occurredAt: string;
  retryCount: number;
  correlationId: string;
  assignedOperator: string;
  summary: string;
}

export interface DemoEntityReview {
  reviewId: string;
  caseId: string;
  entity: string;
  issue: string;
  status: 'Open' | 'In Review' | 'Resolved';
  updatedAt: string;
}

export interface DemoAuditRecord {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  entityId: string;
  result: 'Success' | 'Warning' | 'Rejected' | 'Escalated' | 'Needs review';
  detail: string;
}

export interface DemoConnector {
  name: string;
  status: 'Healthy' | 'Degraded' | 'Monitoring';
  latency: string;
  lastChecked: string;
  uptime: string;
  recentError: string;
}

export interface DemoState {
  citizens: Array<{ id: string; name: string; role: 'citizen'; demographic: string }>;
  services: Array<{
    id: string;
    name: string;
    description: string;
    department: string;
    eligibility: string[];
    requiredDocuments: string[];
    processingTime: string;
    status: 'Available' | 'Limited' | 'Coming Soon';
    category: string;
  }>;
  applications: DemoCase[];
  notifications: DemoNotification[];
  grievances: DemoGrievance[];
  exceptions: DemoException[];
  entityReviews: DemoEntityReview[];
  auditEvents: DemoAuditRecord[];
  connectors: DemoConnector[];
}

export const STORAGE_KEY = 'govbridge-demo-state-v1';

const initialTimeline: DemoTimelineEvent[] = [
  {
    id: 'evt-1',
    title: 'Application submitted',
    description: 'Citizen submitted the scholarship application through GovBridge.',
    timestamp: '2026-08-15T09:12:00Z',
    status: 'SUBMITTED',
    source: 'Citizen portal',
  },
  {
    id: 'evt-2',
    title: 'Identity information verified',
    description: 'Identity verification completed successfully across the connected profile service.',
    timestamp: '2026-08-16T10:20:00Z',
    status: 'IDENTITY_VERIFIED',
    source: 'Identity service',
  },
  {
    id: 'evt-3',
    title: 'Consent requested',
    description: 'Income eligibility data was requested to support the scholarship review.',
    timestamp: '2026-08-20T14:45:00Z',
    status: 'CONSENT_REQUIRED',
    source: 'Consent workflow',
  },
  {
    id: 'evt-4',
    title: 'Consent granted',
    description: 'The citizen approved the required data sharing for income verification.',
    timestamp: '2026-08-21T11:00:00Z',
    status: 'CONSENT_GRANTED',
    source: 'Citizen consent',
  },
  {
    id: 'evt-5',
    title: 'Information shared with department',
    description: 'Approved income attributes were shared with the scholarship department.',
    timestamp: '2026-08-22T09:35:00Z',
    status: 'DOCUMENTS_VALIDATED',
    source: 'Department connector',
  },
  {
    id: 'evt-6',
    title: 'Application assigned for review',
    description: 'The case was assigned to the department review queue.',
    timestamp: '2026-09-05T11:30:00Z',
    status: 'DEPARTMENT_REVIEW',
    source: 'Department queue',
  },
];

export const defaultDemoState: DemoState = {
  citizens: [
    {
      id: 'citizen-001',
      name: 'Maya Singh',
      role: 'citizen',
      demographic: 'Demo user, resident of District East',
    },
  ],
  services: [
    {
      id: 'scholarship-welfare',
      name: 'Scholarship & Welfare',
      description: 'Apply for education support based on household criteria and verified eligibility records.',
      department: 'Social Welfare Department',
      eligibility: ['Income threshold compliance', 'Enrollment status verified', 'Resident status confirmed'],
      requiredDocuments: ['Identity proof', 'Income certificate', 'Enrollment detail', 'Bank account details'],
      processingTime: '5-7 business days',
      status: 'Available',
      category: 'Education & Welfare',
    },
    {
      id: 'income-certificate',
      name: 'Income Certificate',
      description: 'Request a certificate that reflects household income for public service eligibility.',
      department: 'Revenue Department',
      eligibility: ['Resident status', 'Proof of income source'],
      requiredDocuments: ['Identity proof', 'Residence proof', 'Income declaration'],
      processingTime: '3-5 business days',
      status: 'Available',
      category: 'Certificates',
    },
    {
      id: 'caste-certificate',
      name: 'Caste Certificate',
      description: 'Submit a caste certificate application when official documentary evidence is required.',
      department: 'District Administration',
      eligibility: ['Family record verification', 'Local residence'],
      requiredDocuments: ['Identity proof', 'Family record', 'Residence proof'],
      processingTime: '6-8 business days',
      status: 'Available',
      category: 'Certificates',
    },
    {
      id: 'residence-certificate',
      name: 'Residence Certificate',
      description: 'Register a residence-based certificate for access to local benefits and public services.',
      department: 'Revenue Department',
      eligibility: ['Residential proof', 'Valid identity'],
      requiredDocuments: ['Identity proof', 'Residence proof', 'Support letter'],
      processingTime: '4-6 business days',
      status: 'Available',
      category: 'Certificates',
    },
    {
      id: 'pension-application',
      name: 'Pension Application',
      description: 'Start a pension support application with data flow routed across eligibility and treasury review.',
      department: 'Pension Office',
      eligibility: ['Age criteria', 'Dependent status check'],
      requiredDocuments: ['Identity proof', 'Age proof', 'Bank details'],
      processingTime: '7-10 business days',
      status: 'Limited',
      category: 'Social Security',
    },
    {
      id: 'birth-certificate',
      name: 'Birth Certificate',
      description: 'Apply for a birth record or correction request with traceable department processing.',
      department: 'Civil Registration Office',
      eligibility: ['Parent record verification', 'Identity match'],
      requiredDocuments: ['Hospital record', 'Parent identity', 'Address proof'],
      processingTime: '2-4 business days',
      status: 'Available',
      category: 'Certificates',
    },
    {
      id: 'employment-assistance',
      name: 'Employment Assistance',
      description: 'Track employment support eligibility and associated review checks for job-linked programs.',
      department: 'Labour & Employment Department',
      eligibility: ['Skill registration', 'Residence confirmation'],
      requiredDocuments: ['Identity proof', 'Skill record', 'Residence certificate'],
      processingTime: '5-7 business days',
      status: 'Available',
      category: 'Employment',
    },
    {
      id: 'student-welfare-scheme',
      name: 'Student Welfare Scheme',
      description: 'Apply for student support linked to eligible education and welfare criteria.',
      department: 'Education Services',
      eligibility: ['Enrollment proof', 'Academic status'],
      requiredDocuments: ['Identity proof', 'Institution certificate', 'Academic record'],
      processingTime: '4-6 business days',
      status: 'Available',
      category: 'Education',
    },
  ],
  applications: [
    {
      caseId: 'GOV-2026-000184',
      citizenId: 'citizen-001',
      serviceId: 'scholarship-welfare',
      serviceName: 'Scholarship & Welfare',
      department: 'Social Welfare Department',
      status: 'DEPARTMENT_REVIEW',
      workflowState: 'UNDER_REVIEW',
      submittedAt: '2026-08-15T09:12:00Z',
      lastUpdated: '2026-09-05T11:30:00Z',
      nextAction: 'Awaiting final departmental review',
      summary: 'The scholarship case has passed initial verification and is under review by the department.',
      slaStatus: 'On Track',
      documentsRequired: ['Income certificate', 'Enrollment detail', 'Bank information'],
      consentState: 'Approved',
      consentPurpose: 'Scholarship eligibility verification',
      connectedSystems: [
        { label: 'Scholarship', referenceId: 'SCH-88342', description: 'Department case reference' },
        { label: 'Income verification', referenceId: 'INC-21903', description: 'Eligibility data check' },
        { label: 'Payment', referenceId: 'PAY-77182', description: 'Payment routing when approved' },
      ],
      timeline: initialTimeline,
    },
    {
      caseId: 'GOV-2026-000171',
      citizenId: 'citizen-001',
      serviceId: 'income-certificate',
      serviceName: 'Income Certificate',
      department: 'Revenue Department',
      status: 'APPROVED',
      workflowState: 'APPROVED',
      submittedAt: '2026-07-20T08:00:00Z',
      lastUpdated: '2026-08-30T09:15:00Z',
      nextAction: 'Certificate ready for citizen access',
      summary: 'Income certificate request was approved and is ready for download.',
      slaStatus: 'On Track',
      documentsRequired: ['Identity proof'],
      consentState: 'Approved',
      consentPurpose: 'Income verification and public service access',
      connectedSystems: [
        { label: 'Revenue system', referenceId: 'REV-41091', description: 'Income record verification' },
        { label: 'Certificate registry', referenceId: 'CRT-22871', description: 'Certificate publication' },
      ],
      timeline: [
        { id: 'evt-7', title: 'Application submitted', description: 'Income certificate application received.', timestamp: '2026-07-20T08:00:00Z', status: 'SUBMITTED', source: 'Citizen portal' },
        { id: 'evt-8', title: 'Eligibility verified', description: 'Household income data reviewed.', timestamp: '2026-07-22T10:10:00Z', status: 'DOCUMENTS_VALIDATED', source: 'Revenue department' },
        { id: 'evt-9', title: 'Approved', description: 'Certificate approved and published.', timestamp: '2026-08-30T09:15:00Z', status: 'APPROVED', source: 'Department review' },
      ],
    },
    {
      caseId: 'GOV-2026-000163',
      citizenId: 'citizen-001',
      serviceId: 'student-welfare-scheme',
      serviceName: 'Student Welfare Scheme',
      department: 'Education Services',
      status: 'INFORMATION_REQUIRED',
      workflowState: 'INFORMATION_REQUIRED',
      submittedAt: '2026-08-10T14:20:00Z',
      lastUpdated: '2026-09-06T07:50:00Z',
      nextAction: 'Upload missing academic proof to continue',
      summary: 'The application is waiting for additional academic enrollment details from the citizen.',
      slaStatus: 'At Risk',
      documentsRequired: ['Academic enrollment proof', 'Institution verification details'],
      consentState: 'Approved',
      consentPurpose: 'Academic eligibility verification',
      connectedSystems: [
        { label: 'Institution registry', referenceId: 'EDU-44611', description: 'School verification' },
      ],
      timeline: [
        { id: 'evt-10', title: 'Application submitted', description: 'Application created and routed to Education Services.', timestamp: '2026-08-10T14:20:00Z', status: 'SUBMITTED', source: 'Citizen portal' },
        { id: 'evt-11', title: 'Information required', description: 'The department requested additional enrollment proof.', timestamp: '2026-09-06T07:50:00Z', status: 'INFORMATION_REQUIRED', source: 'Department review' },
      ],
    },
    {
      caseId: 'GOV-2026-000142',
      citizenId: 'citizen-001',
      serviceId: 'birth-certificate',
      serviceName: 'Birth Certificate',
      department: 'Civil Registration Office',
      status: 'COMPLETED',
      workflowState: 'COMPLETED',
      submittedAt: '2026-08-12T09:40:00Z',
      lastUpdated: '2026-08-14T16:00:00Z',
      nextAction: 'Certificate is already available',
      summary: 'This certificate request has completed successfully and is available in the document store.',
      slaStatus: 'On Track',
      documentsRequired: ['Parent identity proof'],
      consentState: 'Approved',
      consentPurpose: 'Birth record validation',
      connectedSystems: [
        { label: 'Civil registry', referenceId: 'REG-80144', description: 'Birth record verification' },
      ],
      timeline: [
        { id: 'evt-12', title: 'Application submitted', description: 'Birth certificate request entered the service queue.', timestamp: '2026-08-12T09:40:00Z', status: 'SUBMITTED', source: 'Citizen portal' },
        { id: 'evt-13', title: 'Documents validated', description: 'Document review completed in the registry service.', timestamp: '2026-08-13T08:30:00Z', status: 'DOCUMENTS_VALIDATED', source: 'Civil registry' },
        { id: 'evt-14', title: 'Completed', description: 'Certificate issued and marked complete.', timestamp: '2026-08-14T16:00:00Z', status: 'COMPLETED', source: 'Registry service' },
      ],
    },
  ],
  notifications: [
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
      title: 'Consent required',
      message: 'Please review the income verification consent before the scholarship case can move forward.',
      timestamp: '2026-08-20T14:45:00Z',
      relatedCase: 'GOV-2026-000184',
      readState: 'unread',
      type: 'warning',
    },
    {
      id: 'notif-003',
      title: 'Consent approved',
      message: 'Your income data sharing approval has been recorded for this case.',
      timestamp: '2026-08-21T11:00:00Z',
      relatedCase: 'GOV-2026-000184',
      readState: 'read',
      type: 'success',
    },
    {
      id: 'notif-004',
      title: 'Department review started',
      message: 'The scholarship department has started review for GOV-2026-000184.',
      timestamp: '2026-09-05T11:30:00Z',
      relatedCase: 'GOV-2026-000184',
      readState: 'unread',
      type: 'info',
    },
    {
      id: 'notif-005',
      title: 'Application approved',
      message: 'Your Income Certificate application was approved and is ready to access.',
      timestamp: '2026-08-30T09:15:00Z',
      relatedCase: 'GOV-2026-000171',
      readState: 'read',
      type: 'success',
    },
  ],
  grievances: [
    {
      grievanceId: 'GRV-1093',
      caseId: 'GOV-2026-000184',
      category: 'Status update',
      description: 'I would like a plain-language explanation of the current case status and what happens next.',
      supportingInformation: 'No supporting files attached in the demo flow.',
      status: 'Under Review',
      createdDate: '2026-09-08T09:00:00Z',
      resolution: 'The grievance has been received and is under active review.',
    },
  ],
  exceptions: [
    {
      exceptionId: 'EXC-2026-0042',
      caseId: 'GOV-2026-000184',
      department: 'Education Services',
      operation: 'Identity sync',
      exceptionType: 'Connector timeout',
      currentState: 'Retrying',
      occurredAt: '2026-09-06T08:15:00Z',
      retryCount: 2,
      correlationId: 'COR-DEC-4498',
      assignedOperator: 'Operations team',
      summary: 'A connector timeout occurred while updating the scholarship eligibility state.',
    },
  ],
  entityReviews: [
    {
      reviewId: 'ER-2281',
      caseId: 'GOV-2026-000184',
      entity: 'Citizen profile',
      issue: 'Minor demographic mismatch under review',
      status: 'In Review',
      updatedAt: '2026-09-07T10:42:00Z',
    },
  ],
  auditEvents: [
    {
      id: 'AUD-0101',
      timestamp: '2026-08-15T09:12:00Z',
      actor: 'Citizen portal',
      action: 'APPLICATION_SUBMITTED',
      entityId: 'GOV-2026-000184',
      result: 'Success',
      detail: 'Scholarship application submitted by citizen through GovBridge.',
    },
    {
      id: 'AUD-0102',
      timestamp: '2026-08-21T11:00:00Z',
      actor: 'Citizen',
      action: 'CONSENT_GRANTED',
      entityId: 'GOV-2026-000184',
      result: 'Success',
      detail: 'Citizen approved the data-sharing request for income verification.',
    },
    {
      id: 'AUD-0103',
      timestamp: '2026-09-05T11:30:00Z',
      actor: 'Department officer',
      action: 'APPLICATION_ASSIGNED',
      entityId: 'GOV-2026-000184',
      result: 'Success',
      detail: 'Case was assigned to the scholarship department review queue.',
    },
  ],
  connectors: [
    { name: 'Identity Service', status: 'Healthy', latency: '210ms', lastChecked: '2026-09-09T09:42:00Z', uptime: '99.94%', recentError: 'None in last 24 hours' },
    { name: 'Scholarship Service', status: 'Healthy', latency: '190ms', lastChecked: '2026-09-09T09:41:00Z', uptime: '99.92%', recentError: 'None in last 24 hours' },
    { name: 'Document Verification', status: 'Degraded', latency: '640ms', lastChecked: '2026-09-09T08:56:00Z', uptime: '98.87%', recentError: 'Schema mismatch on one payload retry' },
    { name: 'Notification Gateway', status: 'Healthy', latency: '165ms', lastChecked: '2026-09-09T09:38:00Z', uptime: '99.96%', recentError: 'None in last 24 hours' },
  ],
};

export function readDemoState(): DemoState {
  if (typeof window === 'undefined') {
    return defaultDemoState;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDemoState));
      return defaultDemoState;
    }

    const parsed = JSON.parse(stored) as Partial<DemoState>;
    return {
      ...defaultDemoState,
      ...parsed,
      applications: parsed.applications ?? defaultDemoState.applications,
      notifications: parsed.notifications ?? defaultDemoState.notifications,
      grievances: parsed.grievances ?? defaultDemoState.grievances,
      exceptions: parsed.exceptions ?? defaultDemoState.exceptions,
      entityReviews: parsed.entityReviews ?? defaultDemoState.entityReviews,
      auditEvents: parsed.auditEvents ?? defaultDemoState.auditEvents,
      connectors: parsed.connectors ?? defaultDemoState.connectors,
      citizens: parsed.citizens ?? defaultDemoState.citizens,
      services: parsed.services ?? defaultDemoState.services,
    };
  } catch {
    return defaultDemoState;
  }
}

export function writeDemoState(state: DemoState): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetDemoState(): DemoState {
  writeDemoState(defaultDemoState);
  return defaultDemoState;
}

export function addNotification(notification: Omit<DemoNotification, 'id'>): DemoNotification {
  const nextNotification: DemoNotification = {
    ...notification,
    id: `notif-${Math.random().toString(36).slice(2, 10)}`,
  };

  const state = readDemoState();
  const nextState: DemoState = {
    ...state,
    notifications: [nextNotification, ...state.notifications],
  };
  writeDemoState(nextState);
  return nextNotification;
}

export function addAuditEvent(event: Omit<DemoAuditRecord, 'id'>): DemoAuditRecord {
  const nextEvent: DemoAuditRecord = {
    ...event,
    id: `AUD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
  };

  const state = readDemoState();
  const nextState: DemoState = {
    ...state,
    auditEvents: [nextEvent, ...state.auditEvents],
  };
  writeDemoState(nextState);
  return nextEvent;
}

export function updateApplicationState(
  caseId: string,
  updates: Partial<DemoCase>,
  options?: { addTimelineEvent?: DemoTimelineEvent; addNotification?: Omit<DemoNotification, 'id'>; addAudit?: Omit<DemoAuditRecord, 'id'> },
): DemoCase | null {
  const state = readDemoState();
  const index = state.applications.findIndex((item) => item.caseId === caseId);

  if (index === -1) {
    return null;
  }

  const nextApp: DemoCase = {
    ...state.applications[index],
    ...updates,
    lastUpdated: new Date().toISOString(),
    timeline: options?.addTimelineEvent
      ? [...state.applications[index].timeline, options.addTimelineEvent]
      : state.applications[index].timeline,
  };

  const nextState: DemoState = {
    ...state,
    applications: state.applications.map((item) => (item.caseId === caseId ? nextApp : item)),
  };

  if (options?.addNotification) {
    nextState.notifications = [
      { ...options.addNotification, id: `notif-${Math.random().toString(36).slice(2, 10)}` },
      ...nextState.notifications,
    ];
  }

  if (options?.addAudit) {
    nextState.auditEvents = [
      { ...options.addAudit, id: `AUD-${Math.random().toString(36).slice(2, 8).toUpperCase()}` },
      ...nextState.auditEvents,
    ];
  }

  writeDemoState(nextState);
  return nextApp;
}

export function getCaseById(caseId: string): DemoCase | undefined {
  return readDemoState().applications.find((item) => item.caseId === caseId);
}

export function markNotificationRead(notificationId: string): void {
  const state = readDemoState();
  const nextState: DemoState = {
    ...state,
    notifications: state.notifications.map((notification) =>
      notification.id === notificationId ? { ...notification, readState: 'read' } : notification,
    ),
  };
  writeDemoState(nextState);
}

export function getTrackedCaseResult(caseId: string): DemoCase | undefined {
  const normalized = caseId.trim().toUpperCase();
  return getCaseById(normalized);
}
