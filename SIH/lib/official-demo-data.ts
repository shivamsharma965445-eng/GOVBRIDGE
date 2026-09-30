export interface OfficialTaskRow {
  id: string;
  title: string;
  assignedTo: string;
  caseId: string;
  department: string;
  priority: 'High' | 'Medium' | 'Low';
  due: string;
  status: 'Pending' | 'In review' | 'Escalated';
}

export interface OfficialDataRequestRow {
  id: string;
  caseId: string;
  requester: string;
  provider: string;
  purpose: string;
  status: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'DENIED';
  created: string;
}

export interface OfficialPolicyRecord {
  id: string;
  purpose: string;
  resource: string;
  action: string;
  status: 'Active' | 'Draft' | 'Review';
  lastUpdated: string;
}

export const officialTaskRows: OfficialTaskRow[] = [
  {
    id: 'TSK-2041',
    title: 'Review scholarship intake supporting documents',
    assignedTo: 'A. Sam',
    caseId: 'GOV-2026-000184',
    department: 'Scholarship Desk',
    priority: 'High',
    due: 'Today, 16:00',
    status: 'Pending',
  },
  {
    id: 'TSK-2045',
    title: 'Verify income declaration against records',
    assignedTo: 'R. Mehta',
    caseId: 'GOV-2026-000175',
    department: 'Income Verification',
    priority: 'High',
    due: 'Today, 18:30',
    status: 'In review',
  },
  {
    id: 'TSK-2053',
    title: 'Confirm institution verification evidence',
    assignedTo: 'S. Nair',
    caseId: 'GOV-2026-000188',
    department: 'Institution Verification',
    priority: 'Medium',
    due: 'Tomorrow, 09:00',
    status: 'Pending',
  },
  {
    id: 'TSK-2064',
    title: 'Resolve exception for duplicate citizen record',
    assignedTo: 'T. Das',
    caseId: 'GOV-2026-000199',
    department: 'Identity Governance',
    priority: 'High',
    due: 'Today, 13:45',
    status: 'Escalated',
  },
];

export const officialDataRequests: OfficialDataRequestRow[] = [
  {
    id: 'DR-2026-00421',
    caseId: 'GOV-2026-000184',
    requester: 'Scholarship Desk',
    provider: 'Income Department',
    purpose: 'Confirm annual household income for eligibility calculation',
    status: 'PENDING',
    created: '2026-09-08',
  },
  {
    id: 'DR-2026-00429',
    caseId: 'GOV-2026-000175',
    requester: 'Department of Revenue',
    provider: 'Citizen records registry',
    purpose: 'Cross-check declared income against official tax records',
    status: 'APPROVED',
    created: '2026-09-07',
  },
  {
    id: 'DR-2026-00431',
    caseId: 'GOV-2026-000205',
    requester: 'Education Services',
    provider: 'Institution Verification Unit',
    purpose: 'Confirm academic enrolment and attendance status',
    status: 'COMPLETED',
    created: '2026-09-05',
  },
  {
    id: 'DR-2026-00438',
    caseId: 'GOV-2026-000216',
    requester: 'Public Health Office',
    provider: 'Social welfare records',
    purpose: 'Review eligibility and dependent status for support program',
    status: 'DENIED',
    created: '2026-09-04',
  },
];

export const officialAnalyticsSummary = {
  processedCases: '2,184',
  avgProcessingTime: '4.6 days',
  slaCompliance: '96.4%',
  exceptions: '18',
  successfulDataRequests: '1,438',
};

export const officialPolicyRecords: OfficialPolicyRecord[] = [
  {
    id: 'POL-441',
    purpose: 'Limit data sharing to minimum necessary records for eligibility review',
    resource: 'Citizen income records',
    action: 'Read only',
    status: 'Active',
    lastUpdated: '2026-09-02',
  },
  {
    id: 'POL-522',
    purpose: 'Require human approval for ambiguous entity matches',
    resource: 'Identity matching service',
    action: 'Review and confirm',
    status: 'Active',
    lastUpdated: '2026-09-01',
  },
  {
    id: 'POL-610',
    purpose: 'Escalate unhandled exceptions after two retry attempts',
    resource: 'Workflow exception queue',
    action: 'Escalate',
    status: 'Review',
    lastUpdated: '2026-08-29',
  },
  {
    id: 'POL-717',
    purpose: 'Ensure log retention for official review and audit records',
    resource: 'Audit history',
    action: 'Store and index',
    status: 'Draft',
    lastUpdated: '2026-08-20',
  },
];
