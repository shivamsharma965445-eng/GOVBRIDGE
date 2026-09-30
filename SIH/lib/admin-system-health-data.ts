
export type HealthStatus = 'Healthy' | 'Watch' | 'Degraded' | 'Critical';

export interface HealthSummaryItem {
  label: string;
  value: string;
  status: HealthStatus;
  description: string;
}

export interface ConnectorHealthRow {
  id: string;
  department: string;
  protocol: 'REST' | 'SOAP/XML' | 'CSV/SFTP' | 'Database' | 'Webhook/Event';
  health: HealthStatus;
  latency: string;
  errors: string;
  retries: string;
  owner: string;
  checked: string;
}

export interface OperationalMetric {
  label: string;
  value: string;
  target: string;
  status: HealthStatus;
  visual: number;
}

export interface IncidentItem {
  id: string;
  title: string;
  department: string;
  status: HealthStatus;
  summary: string;
  time: string;
}

export interface SlaIndicator {
  service: string;
  current: string;
  target: string;
  status: HealthStatus;
  note: string;
}

export const adminSystemHealthDemoData = {
  summary: [
    {
      label: 'Platform health',
      value: '94.2%',
      status: 'Healthy',
      description: 'Core platform services remain stable with no material service interruptions.',
    },
    {
      label: 'API availability',
      value: '98.7%',
      status: 'Healthy',
      description: 'Shared API endpoints remain within the expected availability threshold.',
    },
    {
      label: 'Connector health',
      value: '82%',
      status: 'Watch',
      description: 'Most connectors are healthy, with a small group under review for retries.',
    },
    {
      label: 'Latency',
      value: '712 ms',
      status: 'Watch',
      description: 'Average request latency is above the preferred baseline but below critical failure levels.',
    },
    {
      label: 'Errors',
      value: '1.2%',
      status: 'Healthy',
      description: 'Error rate remains low and within the agreed service envelope.',
    },
    {
      label: 'Retries',
      value: '11',
      status: 'Watch',
      description: 'Automatic retry volume remains manageable but elevated for two departments.',
    },
    {
      label: 'Queue depth',
      value: '468',
      status: 'Watch',
      description: 'Queue depth remains stable, with temporary backlog in grant and licensing flows.',
    },
    {
      label: 'DLQ',
      value: '6',
      status: 'Degraded',
      description: 'Dead-letter volume requires operator review for a subset of outbound events.',
    },
    {
      label: 'SLA breaches',
      value: '3',
      status: 'Degraded',
      description: 'Three operational queues are breaching their forecasted completion targets.',
    },
    {
      label: 'Case processing time',
      value: '4.8 hrs',
      status: 'Healthy',
      description: 'Median case cycle time is within the long-term operational target.',
    },
    {
      label: 'Data-quality failures',
      value: '4',
      status: 'Watch',
      description: 'A small number of schema validation exceptions are being remediated.',
    },
    {
      label: 'Consent requests',
      value: '19',
      status: 'Healthy',
      description: 'Consent workflow activity is trending normally and within expected volume.',
    },
    {
      label: 'Exceptions',
      value: '7',
      status: 'Degraded',
      description: 'Operational exceptions require triage in the next cycle to prevent escalation.',
    },
  ] as HealthSummaryItem[],

  connectorHealth: [
    {
      id: 'CN-101',
      department: 'Revenue & Taxation',
      protocol: 'REST',
      health: 'Healthy',
      latency: '420 ms',
      errors: '0.4%',
      retries: '2',
      owner: 'A. Nair',
      checked: '09:42',
    },
    {
      id: 'CN-214',
      department: 'Public Health',
      protocol: 'SOAP/XML',
      health: 'Healthy',
      latency: '540 ms',
      errors: '0.6%',
      retries: '3',
      owner: 'M. Singh',
      checked: '09:31',
    },
    {
      id: 'CN-356',
      department: 'Education Services',
      protocol: 'CSV/SFTP',
      health: 'Degraded',
      latency: '910 ms',
      errors: '2.6%',
      retries: '9',
      owner: 'T. Shah',
      checked: '08:56',
    },
    {
      id: 'CN-478',
      department: 'Transport Authority',
      protocol: 'Database',
      health: 'Healthy',
      latency: '610 ms',
      errors: '0.9%',
      retries: '4',
      owner: 'J. Fernandez',
      checked: '09:24',
    },
    {
      id: 'CN-512',
      department: 'Housing & Urban Affairs',
      protocol: 'Webhook/Event',
      health: 'Watch',
      latency: '860 ms',
      errors: '1.8%',
      retries: '7',
      owner: 'L. Bose',
      checked: '08:44',
    },
    {
      id: 'CN-611',
      department: 'Labour & Employment',
      protocol: 'REST',
      health: 'Healthy',
      latency: '495 ms',
      errors: '0.5%',
      retries: '2',
      owner: 'R. Das',
      checked: '09:15',
    },
  ] as ConnectorHealthRow[],

  operationalMetrics: [
    { label: 'API availability', value: '98.7%', target: '≥ 99%', status: 'Healthy', visual: 87 },
    { label: 'Connector health', value: '82%', target: '≥ 90%', status: 'Watch', visual: 70 },
    { label: 'Queue depth', value: '468', target: '≤ 400', status: 'Watch', visual: 62 },
    { label: 'DLQ', value: '6', target: '≤ 3', status: 'Degraded', visual: 46 },
    { label: 'SLA breaches', value: '3', target: '≤ 2', status: 'Degraded', visual: 40 },
    { label: 'Case processing time', value: '4.8 hrs', target: '≤ 4 hrs', status: 'Healthy', visual: 81 },
  ] as OperationalMetric[],

  recentIncidents: [
    {
      id: 'INC-2041',
      title: 'Education Services sync backlog',
      department: 'Education Services',
      status: 'Degraded',
      summary: 'CSV/SFTP batch transfer is retrying after a delayed upstream acknowledgement window.',
      time: '08:56',
    },
    {
      id: 'INC-2047',
      title: 'Housing event queue elevated',
      department: 'Housing & Urban Affairs',
      status: 'Watch',
      summary: 'Webhook processing delays increased during a short burst of application updates.',
      time: '08:44',
    },
    {
      id: 'INC-2052',
      title: 'Case schema validation exceptions',
      department: 'Integrated Services',
      status: 'Watch',
      summary: 'Three payloads failed canonical validation and were moved to the review queue.',
      time: '07:31',
    },
    {
      id: 'INC-2059',
      title: 'Consent request spike',
      department: 'Public Health',
      status: 'Healthy',
      summary: 'Consent activity remained within expected volume after routing adjustments.',
      time: '06:49',
    },
  ] as IncidentItem[],

  slaIndicators: [
    {
      service: 'Eligibility review',
      current: '96%',
      target: '98%',
      status: 'Healthy',
      note: 'Within expected SLA band this cycle.',
    },
    {
      service: 'Case status updates',
      current: '92%',
      target: '98%',
      status: 'Watch',
      note: 'Two departments are trending below target.',
    },
    {
      service: 'Grant application intake',
      current: '84%',
      target: '95%',
      status: 'Degraded',
      note: 'Backlog is forcing manual intervention.',
    },
    {
      service: 'Document workflow sync',
      current: '78%',
      target: '90%',
      status: 'Critical',
      note: 'Recovery work is active and under direct review.',
    },
  ] as SlaIndicator[],
};
