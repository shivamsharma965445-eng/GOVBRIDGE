export const API_BASE_PATH = '/api/v1';

export type ApiResource =
  | 'me'
  | 'services'
  | 'cases'
  | 'consents'
  | 'data-requests'
  | 'connectors'
  | 'tasks'
  | 'entity-matches'
  | 'entity-reviews'
  | 'events'
  | 'exceptions'
  | 'audit'
  | 'health'
  | 'ready'
  | 'system-health';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type CorrelationIdSource = 'request' | 'generated';

export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  filters?: Record<string, string | number | boolean | undefined>;
}

export interface StandardApiError {
  error_code: string;
  message: string;
  correlation_id: string;
  details?: Record<string, unknown>;
}

export interface ApiResult<T> {
  data: T | null;
  error: StandardApiError | null;
  status: number;
  correlation_id: string | null;
}

export interface AuthState {
  token: string | null;
  expiresAt: string | null;
}

export interface ApiRequestConfig<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  params?: QueryParams;
  signal?: AbortSignal;
  retry?: number;
}

export interface GovBridgeUser {
  id: string;
  display_name: string;
  email: string;
  role: 'citizen' | 'official' | 'admin';
  department: string | null;
  is_active: boolean;
}

export interface GovBridgeService {
  id: string;
  name: string;
  department: string;
  status: 'active' | 'draft' | 'archived';
  version: string;
  last_updated: string;
}

export interface GovBridgeCase {
  id: string;
  service_id: string;
  applicant_name: string;
  current_state: string;
  owner: string;
  updated_at: string;
  sla_status: 'On Track' | 'At Risk' | 'Breached';
}

export interface GovBridgeConsent {
  id: string;
  case_id: string;
  subject: string;
  status: 'active' | 'revoked' | 'pending';
  granted_at: string;
  expires_at: string | null;
}

export interface GovBridgeDataRequest {
  id: string;
  case_id: string;
  department: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  requested_at: string;
}

export interface GovBridgeConnector {
  id: string;
  department: string;
  protocol: 'REST' | 'SOAP/XML' | 'CSV/SFTP' | 'Database' | 'Webhook/Event';
  version: string;
  health: 'Healthy' | 'Watch' | 'Degraded' | 'Critical';
  owner: string;
  last_checked: string;
}

export interface GovBridgeTask {
  id: string;
  case_id: string;
  title: string;
  assignee: string;
  due_at: string;
  status: 'Open' | 'In Review' | 'Blocked' | 'Completed';
}

export interface GovBridgeEntityMatch {
  id: string;
  case_id: string;
  confidence: number;
  match_type: 'Deterministic' | 'High-confidence' | 'Ambiguous' | 'Unresolved';
  suggestion: string;
  status: 'Pending review' | 'Confirmed' | 'Rejected';
}

export interface GovBridgeEntityReview {
  id: string;
  case_id: string;
  reviewer: string;
  confidence: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  match_type: 'Deterministic' | 'High-confidence' | 'Ambiguous' | 'Unresolved';
}

export interface GovBridgeEvent {
  id: string;
  source: string;
  event_type: string;
  occurred_at: string;
  correlation_id: string;
  status: 'processed' | 'rejected' | 'retrying';
}

export interface GovBridgeException {
  id: string;
  case_id: string;
  department: string;
  operation: string;
  state: 'Failure' | 'Retry' | 'Recovered' | 'Manual review';
  occurred_at: string;
  retry_count: number;
  correlation_id: string;
  assigned_operator: string;
}

export interface GovBridgeAuditRecord {
  id: string;
  actor: string;
  action: string;
  resource: string;
  purpose: string;
  policy_context: string;
  timestamp: string;
  outcome: 'Success' | 'Warning' | 'Rejected' | 'Escalated' | 'Needs review';
  source: string;
  correlation_id: string;
}

export interface GovBridgeHealthStatus {
  platform_health: number;
  api_availability: number;
  connector_health: number;
  latency_ms: number;
  errors_pct: number;
  retries: number;
  queue_depth: number;
  dlq_count: number;
  sla_breaches: number;
  case_processing_hours: number;
  data_quality_failures: number;
  consent_requests: number;
  exceptions_open: number;
  timestamp: string;
}

export interface GovBridgeReadyState {
  status: 'ready' | 'degraded' | 'unavailable';
  checks: Array<{
    name: string;
    status: 'pass' | 'warn' | 'fail';
    detail: string;
  }>;
  timestamp: string;
}

export interface GovBridgeSystemHealth extends GovBridgeHealthStatus {
  summary: string;
}
