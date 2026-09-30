export type EntityReviewMatchType = 'Deterministic' | 'High-confidence' | 'Ambiguous' | 'Unresolved';
export type EntityReviewState = 'Pending' | 'Under review' | 'Confirmed' | 'Rejected' | 'Unresolved';
export type EntityDecisionAction = 'Review' | 'Confirm match' | 'Reject match' | 'Mark unresolved';

export interface EntityReviewEvidenceItem {
  label: string;
  value: string;
}

export interface EntityReviewRow {
  reviewId: string;
  caseId: string;
  aiSuggestion: string;
  confidence: number;
  matchType: EntityReviewMatchType;
  evidence: EntityReviewEvidenceItem[];
  currentState: EntityReviewState;
  assignedReviewer: string;
  summary: string;
}

export interface EntityReviewActionOption {
  label: EntityDecisionAction;
  requiresReason: boolean;
  requiresConfirmation: boolean;
  description: string;
}

export const entityReviewQueue: EntityReviewRow[] = [
  {
    reviewId: 'ER-2026-0041',
    caseId: 'GOV-2026-000184',
    aiSuggestion: 'Likely same applicant record',
    confidence: 96,
    matchType: 'Deterministic',
    evidence: [
      { label: 'Name alignment', value: 'Exact match to verified applicant record' },
      { label: 'Institution', value: 'Registered institution matches current case' },
      { label: 'Case history', value: 'Previous case references align cleanly' },
    ],
    currentState: 'Confirmed',
    assignedReviewer: 'Anita P.',
    summary: 'Strong deterministic match with aligned identifiers and history.',
  },
  {
    reviewId: 'ER-2026-0042',
    caseId: 'GOV-2026-000175',
    aiSuggestion: 'High-confidence match to the same applicant',
    confidence: 92,
    matchType: 'High-confidence',
    evidence: [
      { label: 'Name similarity', value: 'Strong similarity with verified alias list' },
      { label: 'District', value: 'Same district and service path as prior cases' },
      { label: 'Document pattern', value: 'Supporting files align with previous submission' },
    ],
    currentState: 'Under review',
    assignedReviewer: 'Rajesh K.',
    summary: 'High-confidence match, pending human confirmation before merge or linkage.',
  },
  {
    reviewId: 'ER-2026-0043',
    caseId: 'GOV-2026-000169',
    aiSuggestion: 'Possible match; human review required',
    confidence: 68,
    matchType: 'Ambiguous',
    evidence: [
      { label: 'Name match', value: 'Partial match on first and last name only' },
      { label: 'Address evidence', value: 'Similar region, but different household details' },
      { label: 'Service path', value: 'Shares a service category but not a full identity profile' },
    ],
    currentState: 'Pending',
    assignedReviewer: 'Meera T.',
    summary: 'Ambiguous match that must be explicitly resolved by a reviewer.',
  },
  {
    reviewId: 'ER-2026-0044',
    caseId: 'GOV-2026-000162',
    aiSuggestion: 'No reliable match identified',
    confidence: 41,
    matchType: 'Unresolved',
    evidence: [
      { label: 'Identity overlap', value: 'No stable identifier overlap found' },
      { label: 'Document evidence', value: 'Insufficient support for a confident match' },
      { label: 'Case context', value: 'Review references remain isolated' },
    ],
    currentState: 'Unresolved',
    assignedReviewer: 'Anita P.',
    summary: 'No safe merge recommendation; keep unresolved until stronger evidence arrives.',
  },
];

export const entityReviewActions: EntityReviewActionOption[] = [
  {
    label: 'Review',
    requiresReason: false,
    requiresConfirmation: false,
    description: 'Open the case and examine the supporting evidence.',
  },
  {
    label: 'Confirm match',
    requiresReason: false,
    requiresConfirmation: true,
    description: 'Confirm the identity match and keep the accountability trail explicit.',
  },
  {
    label: 'Reject match',
    requiresReason: true,
    requiresConfirmation: true,
    description: 'Reject the match when the evidence is insufficient or conflicting.',
  },
  {
    label: 'Mark unresolved',
    requiresReason: true,
    requiresConfirmation: false,
    description: 'Keep the case open when the evidence cannot support a safe decision.',
  },
];

export const entityReviewMatchTypeStyles: Record<EntityReviewMatchType, { tone: 'active' | 'pending' | 'inactive'; label: string }> = {
  Deterministic: { tone: 'active', label: 'Deterministic' },
  'High-confidence': { tone: 'active', label: 'High-confidence' },
  Ambiguous: { tone: 'pending', label: 'Ambiguous' },
  Unresolved: { tone: 'inactive', label: 'Unresolved' },
};

export const entityReviewStateStyles: Record<EntityReviewState, { tone: 'active' | 'pending' | 'inactive'; label: string }> = {
  Pending: { tone: 'pending', label: 'Pending' },
  'Under review': { tone: 'pending', label: 'Under review' },
  Confirmed: { tone: 'active', label: 'Confirmed' },
  Rejected: { tone: 'inactive', label: 'Rejected' },
  Unresolved: { tone: 'inactive', label: 'Unresolved' },
};

export const formatEntityReviewDate = (timestamp: string): string =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));
