export type ExceptionState = 'Failure' | 'Retry available' | 'Recovery' | 'DLQ / Operator Review' | 'Operator Review';
export type ExceptionAction = 'Retry' | 'Assign' | 'Resolve';
export type ExceptionType =
  | 'Department unavailable'
  | 'Connector timeout'
  | 'Schema mismatch'
  | 'Authentication failure'
  | 'Rate limited'
  | 'Partial response';

export interface OfficialExceptionRow {
  exceptionId: string;
  caseId: string;
  department: string;
  operation: string;
  exceptionType: ExceptionType;
  currentState: ExceptionState;
  occurredAt: string;
  retryCount: number;
  correlationId: string;
  assignedOperator: string;
  recovery: string;
  summary: string;
  lifecycle: Array<{ label: string; description: string; completed: boolean }>;
}

export interface ExceptionActionOption {
  label: ExceptionAction;
  requiresReason: boolean;
  requiresConfirmation: boolean;
  description: string;
}

export const officialExceptions: OfficialExceptionRow[] = [
  {
    exceptionId: 'EXC-2026-0042',
    caseId: 'GOV-2026-000184',
    department: 'Income Department',
    operation: 'Data request',
    exceptionType: 'Connector timeout',
    currentState: 'Retry available',
    occurredAt: '2026-09-07T08:14:00Z',
    retryCount: 2,
    correlationId: 'COR-INC-2026-0042',
    assignedOperator: 'Rajesh K.',
    recovery: 'Retry available',
    summary: 'Income information request timed out while the case was being reviewed.',
    lifecycle: [
      { label: 'Failure', description: 'The request failed while awaiting a response from the department.', completed: true },
      { label: 'Retry', description: 'A retry is available for the assigned operator.', completed: true },
      { label: 'Recovery', description: 'Recovery can proceed if the next attempt succeeds.', completed: false },
      { label: 'DLQ / Operator Review', description: 'If retry fails, the case should go to operator review.', completed: false },
    ],
  },
  {
    exceptionId: 'EXC-2026-0043',
    caseId: 'GOV-2026-000175',
    department: 'Scholarship Department',
    operation: 'Schema validation',
    exceptionType: 'Schema mismatch',
    currentState: 'DLQ / Operator Review',
    occurredAt: '2026-09-06T11:22:00Z',
    retryCount: 3,
    correlationId: 'COR-SCH-2026-0043',
    assignedOperator: 'Anita P.',
    recovery: 'Operator review required',
    summary: 'The incoming response did not match the expected schema and needs review.',
    lifecycle: [
      { label: 'Failure', description: 'A schema mismatch interrupted automated processing.', completed: true },
      { label: 'Retry', description: 'Retry attempts were already exhausted.', completed: true },
      { label: 'Recovery', description: 'No safe automated recovery path is available.', completed: false },
      { label: 'DLQ / Operator Review', description: 'This exception is waiting in operator review.', completed: true },
    ],
  },
  {
    exceptionId: 'EXC-2026-0044',
    caseId: 'GOV-2026-000169',
    department: 'Finance Department',
    operation: 'Approval handoff',
    exceptionType: 'Rate limited',
    currentState: 'Failure',
    occurredAt: '2026-09-07T15:40:00Z',
    retryCount: 1,
    correlationId: 'COR-FIN-2026-0044',
    assignedOperator: 'Meera T.',
    recovery: 'Retry available',
    summary: 'The department limited request volume during a bulk processing window.',
    lifecycle: [
      { label: 'Failure', description: 'The operation stopped because the target service applied a limit.', completed: true },
      { label: 'Retry', description: 'A controlled retry is available after the rate window clears.', completed: false },
      { label: 'Recovery', description: 'Recovery depends on the next retry outcome.', completed: false },
      { label: 'DLQ / Operator Review', description: 'Not yet needed unless the retry fails.', completed: false },
    ],
  },
  {
    exceptionId: 'EXC-2026-0045',
    caseId: 'GOV-2026-000162',
    department: 'Identity Department',
    operation: 'Verification lookup',
    exceptionType: 'Authentication failure',
    currentState: 'Operator Review',
    occurredAt: '2026-09-05T09:05:00Z',
    retryCount: 0,
    correlationId: 'COR-ID-2026-0045',
    assignedOperator: 'Rajesh K.',
    recovery: 'Operator review required',
    summary: 'The verification request could not be authenticated by the participating department.',
    lifecycle: [
      { label: 'Failure', description: 'The request failed before a verified response could be returned.', completed: true },
      { label: 'Retry', description: 'No retry has been attempted yet.', completed: false },
      { label: 'Recovery', description: 'Recovery will require a manual decision.', completed: false },
      { label: 'DLQ / Operator Review', description: 'Operator review is the current path.', completed: true },
    ],
  },
  {
    exceptionId: 'EXC-2026-0046',
    caseId: 'GOV-2026-000184',
    department: 'Education Department',
    operation: 'Document fetch',
    exceptionType: 'Department unavailable',
    currentState: 'Retry available',
    occurredAt: '2026-09-08T07:25:00Z',
    retryCount: 1,
    correlationId: 'COR-EDU-2026-0046',
    assignedOperator: 'Anita P.',
    recovery: 'Retry available',
    summary: 'The department was unavailable during a document fetch request.',
    lifecycle: [
      { label: 'Failure', description: 'The request could not complete because the department was offline.', completed: true },
      { label: 'Retry', description: 'A retry is available after the department becomes reachable.', completed: true },
      { label: 'Recovery', description: 'A successful retry will restore the operation.', completed: false },
      { label: 'DLQ / Operator Review', description: 'Manual review is only needed if the retry fails.', completed: false },
    ],
  },
  {
    exceptionId: 'EXC-2026-0047',
    caseId: 'GOV-2026-000175',
    department: 'Records Department',
    operation: 'Response assembly',
    exceptionType: 'Partial response',
    currentState: 'Failure',
    occurredAt: '2026-09-07T12:30:00Z',
    retryCount: 2,
    correlationId: 'COR-REC-2026-0047',
    assignedOperator: 'Meera T.',
    recovery: 'Retry available',
    summary: 'Only part of the requested response arrived, so the case remains incomplete.',
    lifecycle: [
      { label: 'Failure', description: 'The operation returned an incomplete response.', completed: true },
      { label: 'Retry', description: 'An additional retry can be used to complete the response.', completed: true },
      { label: 'Recovery', description: 'Recovery depends on whether the next response is complete.', completed: false },
      { label: 'DLQ / Operator Review', description: 'Operator review will be required if the response stays partial.', completed: false },
    ],
  },
];

export const exceptionActions: ExceptionActionOption[] = [
  {
    label: 'Retry',
    requiresReason: false,
    requiresConfirmation: true,
    description: 'Attempt the operation again using the same operational context.',
  },
  {
    label: 'Assign',
    requiresReason: true,
    requiresConfirmation: false,
    description: 'Hand the exception to a different operator for follow-up.',
  },
  {
    label: 'Resolve',
    requiresReason: true,
    requiresConfirmation: true,
    description: 'Mark the exception as addressed after a human review.',
  },
];

export const formatExceptionDate = (timestamp: string): string =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));
