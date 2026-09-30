export type CaseSlaState = 'On Track' | 'At Risk' | 'Breached';
export type OfficialCaseState =
  | 'Submitted'
  | 'Identity verified'
  | 'Documents validated'
  | 'Department review'
  | 'Field verification'
  | 'Approved';

export interface OfficialCaseRow {
  caseId: string;
  service: string;
  applicant: string;
  currentState: OfficialCaseState;
  owner: string;
  sla: CaseSlaState;
  lastUpdated: string;
}

export interface OfficialMetric {
  label: string;
  value: string;
  description: string;
  tone: 'active' | 'pending' | 'inactive';
}

export interface OfficialActivityItem {
  title: string;
  description: string;
  timestamp: string;
  category: string;
}

export interface OfficialFilterOption {
  label: string;
  value: string;
}

export const officialSidebarItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'Cases', href: '#cases' },
  { label: 'Tasks', href: '#tasks' },
  { label: 'Exceptions', href: '#exceptions' },
  { label: 'Data Requests', href: '#data-requests' },
  { label: 'Entity Reviews', href: '#entity-reviews' },
  { label: 'Audit', href: '#audit' },
  { label: 'Analytics', href: '#analytics' },
];

export const officialMetrics: OfficialMetric[] = [
  {
    label: 'Pending cases',
    value: '128',
    description: 'Cases awaiting review across active services.',
    tone: 'pending',
  },
  {
    label: 'Tasks due today',
    value: '14',
    description: 'Operational follow-ups that need attention today.',
    tone: 'active',
  },
  {
    label: 'SLA risks',
    value: '9',
    description: 'Cases close to or beyond the response target.',
    tone: 'pending',
  },
  {
    label: 'Exceptions',
    value: '6',
    description: 'Items needing manual intervention or policy review.',
    tone: 'inactive',
  },
  {
    label: 'Entity reviews',
    value: '3',
    description: 'Participation checks and entity confirmations in progress.',
    tone: 'active',
  },
  {
    label: 'Recent activity',
    value: '24',
    description: 'Updates recorded over the last 24 hours.',
    tone: 'inactive',
  },
];

export const officialCases: OfficialCaseRow[] = [
  {
    caseId: 'GOV-2026-000184',
    service: 'Scholarship & Welfare',
    applicant: 'Priya S.',
    currentState: 'Department review',
    owner: 'Scholarship Desk',
    sla: 'On Track',
    lastUpdated: '2026-09-05T11:30:00Z',
  },
  {
    caseId: 'GOV-2026-000175',
    service: 'Income Verification',
    applicant: 'Aman K.',
    currentState: 'Documents validated',
    owner: 'Income Unit',
    sla: 'At Risk',
    lastUpdated: '2026-09-07T08:20:00Z',
  },
  {
    caseId: 'GOV-2026-000169',
    service: 'Institution Verification',
    applicant: 'Meera T.',
    currentState: 'Field verification',
    owner: 'Field Team',
    sla: 'Breached',
    lastUpdated: '2026-09-06T15:45:00Z',
  },
  {
    caseId: 'GOV-2026-000162',
    service: 'Benefit Payment',
    applicant: 'Rahul V.',
    currentState: 'Approved',
    owner: 'Payments Cell',
    sla: 'On Track',
    lastUpdated: '2026-09-07T10:10:00Z',
  },
];

export const officialActivities: OfficialActivityItem[] = [
  {
    title: 'Department review started',
    description: 'Scholarship case GOV-2026-000184 moved into review.',
    timestamp: '2026-09-05T11:30:00Z',
    category: 'Cases',
  },
  {
    title: 'SLA risk flagged',
    description: 'Income Verification case GOV-2026-000175 crossed the internal risk threshold.',
    timestamp: '2026-09-07T08:20:00Z',
    category: 'Analytics',
  },
  {
    title: 'Manual exception added',
    description: 'A document mismatch requires follow-up before the next review step.',
    timestamp: '2026-09-07T09:50:00Z',
    category: 'Exceptions',
  },
  {
    title: 'Entity review completed',
    description: 'Verification checks completed for one participating institution.',
    timestamp: '2026-09-06T16:10:00Z',
    category: 'Entity Reviews',
  },
];

export const officialFilterOptions = {
  state: [
    { label: 'All states', value: 'all' },
    { label: 'Department review', value: 'Department review' },
    { label: 'Field verification', value: 'Field verification' },
    { label: 'Approved', value: 'Approved' },
  ] as OfficialFilterOption[],
  sla: [
    { label: 'All SLA states', value: 'all' },
    { label: 'On Track', value: 'On Track' },
    { label: 'At Risk', value: 'At Risk' },
    { label: 'Breached', value: 'Breached' },
  ] as OfficialFilterOption[],
};

export const formatOfficialTimestamp = (timestamp: string): string =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));
