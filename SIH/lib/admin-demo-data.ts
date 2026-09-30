export interface DepartmentRecord {
  department: string;
  departmentId: string;
  services: string;
  integrationStatus: 'Connected' | 'Review' | 'Monitoring';
  lastSync: string;
  owner: string;
}

export interface ServiceRecord {
  service: string;
  serviceId: string;
  owner: string;
  version: string;
  status: 'Active' | 'Draft' | 'Maintenance';
  connectedDepartments: string;
}

export interface ConnectorRecord {
  connectorId: string;
  department: string;
  protocol: 'REST/JSON' | 'SOAP/XML' | 'CSV/SFTP' | 'Database' | 'Webhook/Event';
  health: 'Healthy' | 'Watch' | 'Degraded';
  version: string;
  lastChecked: string;
}

export interface SchemaRecord {
  schemaId: string;
  name: string;
  version: string;
  status: 'Active' | 'Draft' | 'Deprecated';
  lastUpdated: string;
}

export interface MappingRecord {
  mappingId: string;
  source: string;
  target: string;
  version: string;
  status: 'Active' | 'Draft' | 'Review';
}

export interface PolicyRecord {
  policyId: string;
  purpose: string;
  role: string;
  resource: string;
  action: string;
  status: 'Active' | 'Draft' | 'Review';
}

export interface WorkflowRecord {
  workflow: string;
  version: string;
  trigger: string;
  steps: string[];
  status: 'Active' | 'Draft' | 'Monitoring';
}

export const adminDepartments: DepartmentRecord[] = [
  {
    department: 'Revenue & Taxation',
    departmentId: 'DEP-001',
    services: 'Income verification, tax certificate',
    integrationStatus: 'Connected',
    lastSync: '2026-09-09 09:42',
    owner: 'Operations lead',
  },
  {
    department: 'Education Services',
    departmentId: 'DEP-014',
    services: 'Scholarship & Welfare, school validation',
    integrationStatus: 'Connected',
    lastSync: '2026-09-09 09:31',
    owner: 'Data steward',
  },
  {
    department: 'Public Health',
    departmentId: 'DEP-021',
    services: 'Health benefits, eligibility',
    integrationStatus: 'Monitoring',
    lastSync: '2026-09-09 08:56',
    owner: 'Interoperability team',
  },
  {
    department: 'Transport Authority',
    departmentId: 'DEP-033',
    services: 'Permit validation, fleet records',
    integrationStatus: 'Review',
    lastSync: '2026-09-08 16:15',
    owner: 'Integration lead',
  },
];

export const adminServices: ServiceRecord[] = [
  {
    service: 'Scholarship & Welfare',
    serviceId: 'SRV-110',
    owner: 'Education Services',
    version: 'v3.2',
    status: 'Active',
    connectedDepartments: 'Education Services, Revenue & Taxation',
  },
  {
    service: 'Income Verification',
    serviceId: 'SRV-118',
    owner: 'Revenue & Taxation',
    version: 'v2.8',
    status: 'Active',
    connectedDepartments: 'Revenue & Taxation, Public Health',
  },
  {
    service: 'Institution Verification',
    serviceId: 'SRV-126',
    owner: 'Education Services',
    version: 'v1.9',
    status: 'Maintenance',
    connectedDepartments: 'Education Services',
  },
  {
    service: 'Benefit Payment',
    serviceId: 'SRV-135',
    owner: 'Public Health',
    version: 'v4.1',
    status: 'Active',
    connectedDepartments: 'Public Health, Revenue & Taxation',
  },
];

export const adminConnectors: ConnectorRecord[] = [
  {
    connectorId: 'CN-101',
    department: 'Revenue & Taxation',
    protocol: 'REST/JSON',
    health: 'Healthy',
    version: 'v3.2',
    lastChecked: '2026-09-09 09:42',
  },
  {
    connectorId: 'CN-214',
    department: 'Public Health',
    protocol: 'SOAP/XML',
    health: 'Healthy',
    version: 'v2.8',
    lastChecked: '2026-09-09 09:31',
  },
  {
    connectorId: 'CN-356',
    department: 'Education Services',
    protocol: 'CSV/SFTP',
    health: 'Watch',
    version: 'v1.6',
    lastChecked: '2026-09-09 08:54',
  },
  {
    connectorId: 'CN-478',
    department: 'Transport Authority',
    protocol: 'Database',
    health: 'Degraded',
    version: 'v4.1',
    lastChecked: '2026-09-08 16:15',
  },
];

export const adminSchemas: SchemaRecord[] = [
  { schemaId: 'SCH-204', name: 'Citizen Profile', version: 'v2.9', status: 'Active', lastUpdated: '2026-09-06' },
  { schemaId: 'SCH-221', name: 'Business Registration', version: 'v1.8', status: 'Active', lastUpdated: '2026-09-05' },
  { schemaId: 'SCH-312', name: 'Eligibility Assessment', version: 'v3.1', status: 'Draft', lastUpdated: '2026-08-18' },
  { schemaId: 'SCH-401', name: 'Case Decision Record', version: 'v2.5', status: 'Active', lastUpdated: '2026-09-01' },
];

export const adminMappings: MappingRecord[] = [
  {
    mappingId: 'MAP-011',
    source: 'citizen.name.first',
    target: 'person.first_name',
    version: 'v2.9',
    status: 'Active',
  },
  {
    mappingId: 'MAP-029',
    source: 'eligibility.household.income',
    target: 'household.annual_income',
    version: 'v3.1',
    status: 'Active',
  },
  {
    mappingId: 'MAP-042',
    source: 'document.file_reference',
    target: 'document.reference_code',
    version: 'v1.3',
    status: 'Review',
  },
  {
    mappingId: 'MAP-055',
    source: 'case.status_last_updated',
    target: 'case.last_state_change_at',
    version: 'v2.5',
    status: 'Draft',
  },
];

export const adminPolicies: PolicyRecord[] = [
  {
    policyId: 'POL-101',
    purpose: 'Data minimisation in all service workflows',
    role: 'Platform admin',
    resource: 'Personal records',
    action: 'Read, transform',
    status: 'Active',
  },
  {
    policyId: 'POL-117',
    purpose: 'Entity match review for ambiguous cases',
    role: 'Identity governance',
    resource: 'Identity resolution service',
    action: 'Review',
    status: 'Review',
  },
  {
    policyId: 'POL-124',
    purpose: 'Restrict connector access by designated departments',
    role: 'Security admin',
    resource: 'API gateway',
    action: 'Approve',
    status: 'Active',
  },
  {
    policyId: 'POL-133',
    purpose: 'Default to operator review for failed data exchanges',
    role: 'Operations lead',
    resource: 'Workflow exception queue',
    action: 'Escalate',
    status: 'Draft',
  },
];

export const adminWorkflows: WorkflowRecord[] = [
  {
    workflow: 'Scholarship & Welfare',
    version: 'v2.3',
    trigger: 'Application Submitted',
    steps: [
      'Identity Verification',
      'Income Verification',
      'Institution Verification',
      'Eligibility Decision',
      'Payment',
    ],
    status: 'Active',
  },
  {
    workflow: 'Benefit Payment',
    version: 'v1.8',
    trigger: 'Eligibility Approved',
    steps: ['Data Validation', 'Approval Queue', 'Payment Execution', 'Case Closure'],
    status: 'Monitoring',
  },
  {
    workflow: 'Institution Verification',
    version: 'v3.1',
    trigger: 'Document Upload',
    steps: ['Institution Lookup', 'Record Check', 'Approval', 'Notification'],
    status: 'Active',
  },
];
