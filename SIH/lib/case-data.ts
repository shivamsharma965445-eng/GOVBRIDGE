export type UnifiedCaseStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'IDENTITY_VERIFIED'
  | 'DOCUMENTS_VALIDATED'
  | 'DEPARTMENT_REVIEW'
  | 'FIELD_VERIFICATION'
  | 'APPROVED'
  | 'PAYMENT_PENDING'
  | 'COMPLETED';

export interface CaseTimelineEvent {
  status: UnifiedCaseStatus;
  title: string;
  description: string;
  timestamp: string;
  sourceCategory?: string;
}

export interface ConnectedApplicationReference {
  label: string;
  referenceId: string;
  description: string;
}

export interface UnifiedCaseData {
  caseId: string;
  serviceName: string;
  currentStatus: UnifiedCaseStatus;
  nextAction: string;
  summary: string;
  timeline: CaseTimelineEvent[];
  connectedApplications: ConnectedApplicationReference[];
  statusExplanation: string;
}

export const unifiedCaseData: UnifiedCaseData = {
  caseId: 'GOV-2026-000184',
  serviceName: 'Scholarship & Welfare',
  currentStatus: 'DEPARTMENT_REVIEW',
  nextAction: 'No action required',
  summary:
    'GovBridge gives you one citizen-friendly view of this scholarship case while participating systems complete their work in the background.',
  statusExplanation:
    'Department review means the application has passed initial checks and is now being reviewed by the scholarship office. You do not need to take any action at this stage.',
  timeline: [
    {
      status: 'SUBMITTED',
      title: 'Application submitted',
      description: 'Your scholarship application was received and saved as a unified case.',
      timestamp: '2026-08-15T09:12:00Z',
      sourceCategory: 'Citizen submission',
    },
    {
      status: 'IDENTITY_VERIFIED',
      title: 'Identity verified',
      description: 'Identity verification completed successfully for this case.',
      timestamp: '2026-08-16T10:20:00Z',
      sourceCategory: 'Identity service',
    },
    {
      status: 'DOCUMENTS_VALIDATED',
      title: 'Income information verified',
      description: 'Eligibility-related income details were checked through the participating department.',
      timestamp: '2026-08-21T13:45:00Z',
      sourceCategory: 'Income verification',
    },
    {
      status: 'DEPARTMENT_REVIEW',
      title: 'Department review started',
      description: 'The scholarship department is reviewing the case details and supporting information.',
      timestamp: '2026-09-05T11:30:00Z',
      sourceCategory: 'Scholarship Department',
    },
  ],
  connectedApplications: [
    {
      label: 'Scholarship',
      referenceId: 'SCH-88342',
      description: 'Scholarship Department case reference',
    },
    {
      label: 'Income verification',
      referenceId: 'INC-21903',
      description: 'Participating system reference for income status',
    },
    {
      label: 'Payment',
      referenceId: 'PAY-77182',
      description: 'Payment workflow reference used when the case moves ahead',
    },
  ],
};

export const unifiedCaseStatusStyles: Record<
  UnifiedCaseStatus,
  { tone: 'active' | 'pending' | 'inactive'; label: string }
> = {
  DRAFT: { tone: 'pending', label: 'Draft' },
  SUBMITTED: { tone: 'pending', label: 'Submitted' },
  IDENTITY_VERIFIED: { tone: 'active', label: 'Identity verified' },
  DOCUMENTS_VALIDATED: { tone: 'active', label: 'Documents validated' },
  DEPARTMENT_REVIEW: { tone: 'pending', label: 'Department review' },
  FIELD_VERIFICATION: { tone: 'pending', label: 'Field verification' },
  APPROVED: { tone: 'active', label: 'Approved' },
  PAYMENT_PENDING: { tone: 'pending', label: 'Payment pending' },
  COMPLETED: { tone: 'active', label: 'Completed' },
};

export const unifiedCaseTimelineOrder: UnifiedCaseStatus[] = [
  'DRAFT',
  'SUBMITTED',
  'IDENTITY_VERIFIED',
  'DOCUMENTS_VALIDATED',
  'DEPARTMENT_REVIEW',
  'FIELD_VERIFICATION',
  'APPROVED',
  'PAYMENT_PENDING',
  'COMPLETED',
];

export const getUnifiedCaseTimelineIndex = (status: UnifiedCaseStatus): number =>
  unifiedCaseTimelineOrder.indexOf(status);

export const formatUnifiedCaseDate = (timestamp: string): string =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));
