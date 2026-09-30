import type {
  ApiRequestConfig,
  ApiResource,
  ApiResult,
  GovBridgeAuditRecord,
  GovBridgeCase,
  GovBridgeConsent,
  GovBridgeConnector,
  GovBridgeDataRequest,
  GovBridgeEntityMatch,
  GovBridgeEntityReview,
  GovBridgeEvent,
  GovBridgeException,
  GovBridgeHealthStatus,
  GovBridgeReadyState,
  GovBridgeService,
  GovBridgeSystemHealth,
  GovBridgeTask,
  GovBridgeUser,
  QueryParams,
  StandardApiError,
} from '@/lib/api/contracts';
import {
  GovBridgeAuthBoundary,
  GovBridgeClient,
  GovBridgeApiAdapter,
  HttpGovBridgeApiAdapter,
} from '@/lib/api/client';

const demoUsers: GovBridgeUser[] = [
  {
    id: 'usr-1001',
    display_name: 'Aisha Khan',
    email: 'aisha.khan@govbridge.local',
    role: 'admin',
    department: 'Platform operations',
    is_active: true,
  },
];

const demoServices: GovBridgeService[] = [
  { id: 'svc-001', name: 'Scholarship eligibility', department: 'Education Services', status: 'active', version: 'v3.2', last_updated: '2026-09-09T09:42:00Z' },
  { id: 'svc-002', name: 'Business registration', department: 'Revenue & Taxation', status: 'active', version: 'v2.9', last_updated: '2026-09-08T15:11:00Z' },
  { id: 'svc-003', name: 'Public health subsidy', department: 'Public Health', status: 'draft', version: 'v1.8', last_updated: '2026-09-04T12:08:00Z' },
];

const demoCases: GovBridgeCase[] = [
  { id: 'GOV-2026-000184', service_id: 'svc-001', applicant_name: 'Maya Singh', current_state: 'Department review', owner: 'Officer', updated_at: '2026-09-02T12:00:00Z', sla_status: 'On Track' },
  { id: 'GOV-2026-000219', service_id: 'svc-003', applicant_name: 'Rafi Ahmed', current_state: 'Clarification requested', owner: 'Officer', updated_at: '2026-09-02T10:18:00Z', sla_status: 'At Risk' },
];

const demoConsents: GovBridgeConsent[] = [
  { id: 'CONS-8121', case_id: 'GOV-2026-000184', subject: 'Maya Singh', status: 'active', granted_at: '2026-08-26T10:05:00Z', expires_at: '2027-08-26T10:05:00Z' },
];

const demoDataRequests: GovBridgeDataRequest[] = [
  { id: 'DR-401', case_id: 'GOV-2026-000184', department: 'Education Services', purpose: 'Education records verification', status: 'approved', requested_at: '2026-09-01T09:12:00Z' },
];

const demoConnectors: GovBridgeConnector[] = [
  { id: 'CN-101', department: 'Revenue & Taxation', protocol: 'REST', version: 'v3.2', health: 'Healthy', owner: 'A. Nair', last_checked: '2026-09-09T09:42:00Z' },
  { id: 'CN-356', department: 'Education Services', protocol: 'CSV/SFTP', version: 'v1.6', health: 'Degraded', owner: 'T. Shah', last_checked: '2026-09-09T08:56:00Z' },
];

const demoTasks: GovBridgeTask[] = [
  { id: 'TSK-991', case_id: 'GOV-2026-000184', title: 'Approve scholarship eligibility decision', assignee: 'Officer', due_at: '2026-09-09T17:00:00Z', status: 'In Review' },
];

const demoEntityMatches: GovBridgeEntityMatch[] = [
  { id: 'ENT-2049', case_id: 'GOV-2026-000184', confidence: 0.94, match_type: 'High-confidence', suggestion: 'Maya Singh / Person record 2049', status: 'Pending review' },
];

const demoEntityReviews: GovBridgeEntityReview[] = [
  { id: 'ER-920', case_id: 'GOV-2026-000184', reviewer: 'Identity officer', confidence: 0.94, status: 'Pending', match_type: 'High-confidence' },
];

const demoEvents: GovBridgeEvent[] = [
  { id: 'EVT-501', source: 'Official console', event_type: 'case_review_completed', occurred_at: '2026-09-02T12:00:00Z', correlation_id: '9d2e1c7a-64d2-4f85-9baa-12f09cacda92', status: 'processed' },
];

const demoExceptions: GovBridgeException[] = [
  { id: 'EXC-2026-0042', case_id: 'GOV-2026-000184', department: 'Education Services', operation: 'CSV/SFTP sync', state: 'Retry', occurred_at: '2026-09-02T11:47:00Z', retry_count: 2, correlation_id: '88a6dc71-c5b5-4495-9f4a-3b44d7e568ff', assigned_operator: 'Department admin' },
];

const demoAudit: GovBridgeAuditRecord[] = [
  {
    id: 'AUD-1001',
    actor: 'Officer',
    action: 'Approved workflow task',
    resource: 'GOV-2026-000184',
    purpose: 'Scholarship eligibility',
    policy_context: 'Policy: eligibility-review v3.2 • Consent verified for education data access',
    timestamp: '2026-09-02 12:00',
    outcome: 'Success',
    source: 'Official console',
    correlation_id: '9d2e1c7a-64d2-4f85-9baa-12f09cacda92',
  },
];

const demoHealth: GovBridgeHealthStatus = {
  platform_health: 94.2,
  api_availability: 98.7,
  connector_health: 82,
  latency_ms: 712,
  errors_pct: 1.2,
  retries: 11,
  queue_depth: 468,
  dlq_count: 6,
  sla_breaches: 3,
  case_processing_hours: 4.8,
  data_quality_failures: 4,
  consent_requests: 19,
  exceptions_open: 7,
  timestamp: '2026-09-09T09:45:00Z',
};

const demoReady: GovBridgeReadyState = {
  status: 'degraded',
  checks: [
    { name: 'API gateway', status: 'pass', detail: 'Gateway is responding within expected limits.' },
    { name: 'Connector health', status: 'warn', detail: 'Two connectors are retrying under elevated latency.' },
    { name: 'Message queue', status: 'warn', detail: 'Queue depth is above target but operationally stable.' },
  ],
  timestamp: '2026-09-09T09:45:00Z',
};

const demoSystemHealth = { ...demoHealth, summary: 'Platform is operational with monitored degradation in a small number of connectors and queued services.' };

function asError(errorCode: string, message: string, correlationId = 'demo-correlation-id', details?: Record<string, unknown>): StandardApiError {
  return {
    error_code: errorCode,
    message,
    correlation_id: correlationId,
    details,
  };
}

function withDelay<T>(value: T, delay = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}

export class DemoGovBridgeApiAdapter implements GovBridgeApiAdapter {
  async request<T>(resource: ApiResource, options: ApiRequestConfig = {}): Promise<ApiResult<T>> {
    const correlationId = 'demo-correlation-id';
    const baseResource = String(resource).split('/')[0] as ApiResource;
    const id = String(resource).split('/')[1];

    const result = (() => {
      switch (baseResource) {
        case 'me':
          return demoUsers[0] as T;
        case 'services':
          return (id ? demoServices.find((item) => item.id === id) : demoServices) as T;
        case 'cases':
          return (id ? demoCases.find((item) => item.id === id) : demoCases) as T;
        case 'consents':
          return (id ? demoConsents.find((item) => item.id === id) : demoConsents) as T;
        case 'data-requests':
          return (id ? demoDataRequests.find((item) => item.id === id) : demoDataRequests) as T;
        case 'connectors':
          return (id ? demoConnectors.find((item) => item.id === id) : demoConnectors) as T;
        case 'tasks':
          return (id ? demoTasks.find((item) => item.id === id) : demoTasks) as T;
        case 'entity-matches':
          return (id ? demoEntityMatches.find((item) => item.id === id) : demoEntityMatches) as T;
        case 'entity-reviews':
          return (id ? demoEntityReviews.find((item) => item.id === id) : demoEntityReviews) as T;
        case 'events':
          return (id ? demoEvents.find((item) => item.id === id) : demoEvents) as T;
        case 'exceptions':
          return (id ? demoExceptions.find((item) => item.id === id) : demoExceptions) as T;
        case 'audit':
          return (id ? demoAudit.find((item) => item.id === id) : demoAudit) as T;
        case 'health':
          return demoHealth as T;
        case 'ready':
          return demoReady as T;
        case 'system-health':
          return demoSystemHealth as T;
        default:
          return null as T;
      }
    })();

    if (result === null || result === undefined) {
      return {
        data: null,
        error: asError('NOT_FOUND', `No data found for ${resource}.`, correlationId, { resource }),
        status: 404,
        correlation_id: correlationId,
      };
    }

    const filtered = (() => {
      if (!options.params?.filters && !options.params?.page && !options.params?.limit) {
        return result;
      }

      if (Array.isArray(result)) {
        const page = Number(options.params?.page ?? 1);
        const limit = Number(options.params?.limit ?? result.length);
        const start = (page - 1) * limit;
        return result.slice(start, start + limit) as T;
      }

      return result;
    })();

    return withDelay({
      data: filtered,
      error: null,
      status: 200,
      correlation_id: correlationId,
    });
  }
}

const apiMode = process.env.NEXT_PUBLIC_GOVBRIDGE_API_MODE ?? 'demo';
const auth = new GovBridgeAuthBoundary();

export const govBridgeApi = new GovBridgeClient(
  apiMode === 'demo'
    ? new DemoGovBridgeApiAdapter()
    : new HttpGovBridgeApiAdapter(auth),
  auth,
);

export function setGovBridgeAuthToken(token: string | null) {
  auth.setToken(token);
}

export function getGovBridgeAuthToken() {
  return auth.getToken();
}
