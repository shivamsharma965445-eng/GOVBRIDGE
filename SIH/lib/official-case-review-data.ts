export type ReviewAction = 'Approve' | 'Reject' | 'Request clarification' | 'Escalate';
export type ReviewSlaState = 'On Track' | 'At Risk' | 'Breached';
export type MatchConfidenceState = 'High' | 'Medium' | 'Low';

export interface OfficialCaseSummaryData {
  caseId: string;
  serviceName: string;
  applicantName: string;
  currentState: string;
  nextAction: string;
  owner: string;
  sla: ReviewSlaState;
  lastUpdated: string;
  overview: string;
}

export interface WorkflowActionOption {
  label: ReviewAction;
  requiresReason: boolean;
  requiresConfirmation: boolean;
  description: string;
}

export interface ProvenanceItem {
  sourceSystem: string;
  sourceIdentifier: string;
  timestamp: string;
  schemaVersion: string;
  transformationContext: string;
}

export interface EntityEvidenceItem {
  label: string;
  value: string;
}

export interface EntityMatchData {
  confidence: number;
  confidenceState: MatchConfidenceState;
  summary: string;
  decisionGuidance: string;
  evidence: EntityEvidenceItem[];
}

export interface DocumentReference {
  title: string;
  status: string;
  note: string;
}

export interface AuditEvent {
  title: string;
  description: string;
  timestamp: string;
  source: string;
}

export interface ReviewCaseData {
  summary: OfficialCaseSummaryData;
  workflowActions: WorkflowActionOption[];
  provenance: ProvenanceItem;
  dataRequests: string[];
  consentContext: string;
  entityMatch: EntityMatchData;
  documents: DocumentReference[];
  auditHistory: AuditEvent[];
}

export const officialReviewCaseData: ReviewCaseData = {
  summary: {
    caseId: 'GOV-2026-000184',
    serviceName: 'Scholarship & Welfare',
    applicantName: 'Priya S.',
    currentState: 'DEPARTMENT_REVIEW',
    nextAction: 'Department review in progress',
    owner: 'Scholarship Desk',
    sla: 'On Track',
    lastUpdated: '2026-09-05T11:30:00Z',
    overview:
      'This review view shows the official operational record for the scholarship case, with enough context to make a clear decision and no unnecessary sensitive details.',
  },
  workflowActions: [
    {
      label: 'Approve',
      requiresReason: false,
      requiresConfirmation: true,
      description: 'Move the case forward when all review criteria are satisfied.',
    },
    {
      label: 'Reject',
      requiresReason: true,
      requiresConfirmation: true,
      description: 'Close the review with a recorded reason and citation.',
    },
    {
      label: 'Request clarification',
      requiresReason: true,
      requiresConfirmation: false,
      description: 'Ask for additional information from the responsible team.',
    },
    {
      label: 'Escalate',
      requiresReason: true,
      requiresConfirmation: true,
      description: 'Move the case to a higher review level due to exceptions or risk.',
    },
  ],
  provenance: {
    sourceSystem: 'Scholarship service ledger',
    sourceIdentifier: 'SCH-88342',
    timestamp: '2026-09-05T11:30:00Z',
    schemaVersion: 'v3.2',
    transformationContext:
      'Canonical case record assembled from participating systems and normalized for the official console.',
  },
  dataRequests: [
    'Income eligibility status from the participating income service',
    'Institution verification status from the education service',
    'Payment readiness flag from the finance service',
  ],
  consentContext:
    'Consent has been recorded for the required data sharing scope. The official view shows the result and supporting metadata, not the raw citizen-facing consent payload.',
  entityMatch: {
    confidence: 92,
    confidenceState: 'High',
    summary: 'The record appears to match the applicant with strong evidence alignment across name, institution, and demographic checks.',
    decisionGuidance:
      'Human review required before any merge because the console never silently merges uncertain identities.',
    evidence: [
      { label: 'Name match', value: 'Strong match with approved alias set' },
      { label: 'Institution match', value: 'Exact match on registered institution' },
      { label: 'Address alignment', value: 'Consistent district and pincode mapping' },
      { label: 'Case history', value: 'Aligned with prior scholarship submissions' },
    ],
  },
  documents: [
    { title: 'Application summary', status: 'Available', note: 'Operational review copy only' },
    { title: 'Income verification', status: 'Available', note: 'Reference validated by the participating service' },
    { title: 'Institution verification', status: 'Pending', note: 'Awaiting final confirmation from the institution' },
  ],
  auditHistory: [
    {
      title: 'Department review started',
      description: 'The scholarship case moved into the active review queue.',
      timestamp: '2026-09-05T11:30:00Z',
      source: 'Scholarship Desk',
    },
    {
      title: 'Consent confirmed',
      description: 'The requested data sharing scope was confirmed for review purposes.',
      timestamp: '2026-09-05T10:48:00Z',
      source: 'Consent workflow',
    },
    {
      title: 'Documents validated',
      description: 'Supporting documents were checked against the operational record.',
      timestamp: '2026-08-21T13:45:00Z',
      source: 'Verification unit',
    },
    {
      title: 'Application submitted',
      description: 'Citizen submission was converted into a unified case record.',
      timestamp: '2026-08-15T09:12:00Z',
      source: 'Citizen portal',
    },
  ],
};

export const formatReviewDate = (timestamp: string): string =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));
