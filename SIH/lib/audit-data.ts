export type AuditOutcome = 'Success' | 'Warning' | 'Rejected' | 'Escalated' | 'Needs review';
export type AuditAction =
  | 'Approved workflow task'
  | 'Rejected workflow task'
  | 'Assigned exception'
  | 'Revoked consent'
  | 'Updated policy'
  | 'Escalated case'
  | 'Confirmed entity match';

export interface AuditRecord {
  id: string;
  actor: string;
  action: AuditAction;
  resource: string;
  purpose: string;
  policyContext: string;
  timestamp: string;
  outcome: AuditOutcome;
  source: string;
  correlationId: string;
}

export const auditRecords: AuditRecord[] = [
  {
    id: 'AUD-1001',
    actor: 'Officer',
    action: 'Approved workflow task',
    resource: 'GOV-2026-000184',
    purpose: 'Scholarship eligibility',
    policyContext: 'Policy: eligibility-review v3.2 • Consent verified for education data access',
    timestamp: '2026-09-02 12:00',
    outcome: 'Success',
    source: 'Official console',
    correlationId: '9d2e1c7a-64d2-4f85-9baa-12f09cacda92',
  },
  {
    id: 'AUD-1002',
    actor: 'Department admin',
    action: 'Assigned exception',
    resource: 'EXC-2026-0042',
    purpose: 'Connector timeout recovery',
    policyContext: 'Policy: exception-routing v2.1 • Department callback allowed after retry threshold',
    timestamp: '2026-09-02 11:47',
    outcome: 'Warning',
    source: 'Operations queue',
    correlationId: '88a6dc71-c5b5-4495-9f4a-3b44d7e568ff',
  },
  {
    id: 'AUD-1003',
    actor: 'Policy analyst',
    action: 'Updated policy',
    resource: 'Data minimisation',
    purpose: 'Tightened retention thresholds for verification documents',
    policyContext: 'Policy: data-minimisation v4.1 • Review date 2026-09-14',
    timestamp: '2026-09-02 10:58',
    outcome: 'Success',
    source: 'Policy service',
    correlationId: '70d92f4d-7b88-4f8d-b6c2-7d1c0a749c4d',
  },
  {
    id: 'AUD-1004',
    actor: 'Officer',
    action: 'Rejected workflow task',
    resource: 'GOV-2026-000219',
    purpose: 'Public health subsidy review',
    policyContext: 'Policy: verification-required v2.6 • No explicit consent for shared income data',
    timestamp: '2026-09-02 10:18',
    outcome: 'Rejected',
    source: 'Case review',
    correlationId: 'be350b72-5f86-4f98-b0ce-8c75f59d0b3b',
  },
  {
    id: 'AUD-1005',
    actor: 'Identity officer',
    action: 'Confirmed entity match',
    resource: 'ENT-2049',
    purpose: 'Resolve duplicate person record',
    policyContext: 'Consent: identity resolution approved • Human review recorded under policy guardrail',
    timestamp: '2026-09-02 09:42',
    outcome: 'Success',
    source: 'Entity review queue',
    correlationId: 'f11b0c0d-430c-4033-a356-17d05d061b54',
  },
  {
    id: 'AUD-1006',
    actor: 'Data steward',
    action: 'Revoked consent',
    resource: 'CONS-8121',
    purpose: 'Withdraw granular data access for legacy partner',
    policyContext: 'Consent: withdrawn • Audit notice sent to department and partner provider',
    timestamp: '2026-09-01 20:16',
    outcome: 'Success',
    source: 'Consent service',
    correlationId: '2c97dbe0-6d13-4ef0-a84b-d8f6da2d3fb4',
  },
  {
    id: 'AUD-1007',
    actor: 'Operations lead',
    action: 'Escalated case',
    resource: 'GOV-2026-000361',
    purpose: 'Document verification escalation',
    policyContext: 'Policy: urgent-escalation v1.9 • Human review required before final disposition',
    timestamp: '2026-09-01 18:33',
    outcome: 'Escalated',
    source: 'Task queue',
    correlationId: 'c8addc4e-75d7-4eb8-9d0c-3750084d9b0d',
  },
  {
    id: 'AUD-1008',
    actor: 'Officer',
    action: 'Approved workflow task',
    resource: 'GOV-2026-000572',
    purpose: 'Business registration review',
    policyContext: 'Policy: business-eligibility-check v2.4 • Consent retained for audit trail only',
    timestamp: '2026-09-01 16:07',
    outcome: 'Success',
    source: 'Official console',
    correlationId: 'd7b92d55-3122-4cb9-b7ed-47f2b4746f5f',
  },
  {
    id: 'AUD-1009',
    actor: 'System integration',
    action: 'Assigned exception',
    resource: 'EXC-2026-0028',
    purpose: 'Schema mismatch on departmental payload',
    policyContext: 'Policy: schema-validation v3.1 • Retry attempt scheduled with manual operator review',
    timestamp: '2026-09-01 15:12',
    outcome: 'Needs review',
    source: 'Connector monitor',
    correlationId: 'a9e49e6e-e3bf-4e89-ad9b-cd5c885e4ada',
  },
  {
    id: 'AUD-1010',
    actor: 'Compliance team',
    action: 'Updated policy',
    resource: 'Identity resolution',
    purpose: 'Clarified ambiguous-match review threshold',
    policyContext: 'Policy: identity-resolution v2.7 • Effective from next scheduled review cycle',
    timestamp: '2026-09-01 13:40',
    outcome: 'Success',
    source: 'Policy service',
    correlationId: '1a4096bf-0835-4ea2-a7a5-a3ba0d4e6d52',
  },
  {
    id: 'AUD-1011',
    actor: 'Officer',
    action: 'Rejected workflow task',
    resource: 'GOV-2026-000433',
    purpose: 'School fee assistance',
    policyContext: 'Policy: income-verification v2.0 • Consent not provided for household income',
    timestamp: '2026-09-01 11:28',
    outcome: 'Rejected',
    source: 'Case review',
    correlationId: '9630991d-b9b5-40c3-a28f-b72d59fbf2b8',
  },
  {
    id: 'AUD-1012',
    actor: 'Department admin',
    action: 'Approved workflow task',
    resource: 'GOV-2026-000618',
    purpose: 'Housing assistance eligibility',
    policyContext: 'Policy: housing-eligibility-check v1.8 • Consent confirmed under standard case access rules',
    timestamp: '2026-08-31 17:08',
    outcome: 'Success',
    source: 'Official console',
    correlationId: '3d130fb8-6f34-42c1-9fba-2d8ea8f8bfe8',
  },
];

export const auditFilters = {
  actors: ['All actors', 'Officer', 'Department admin', 'Policy analyst', 'Identity officer', 'Data steward', 'Operations lead', 'System integration', 'Compliance team'],
  actions: ['All actions', 'Approved workflow task', 'Rejected workflow task', 'Assigned exception', 'Revoked consent', 'Updated policy', 'Escalated case', 'Confirmed entity match'],
  resources: ['All resources', 'GOV-2026-000184', 'EXC-2026-0042', 'Data minimisation', 'GOV-2026-000219', 'ENT-2049', 'CONS-8121', 'GOV-2026-000361', 'GOV-2026-000572', 'EXC-2026-0028', 'Identity resolution', 'GOV-2026-000433', 'GOV-2026-000618'],
  outcomes: ['All outcomes', 'Success', 'Warning', 'Rejected', 'Escalated', 'Needs review'],
};
