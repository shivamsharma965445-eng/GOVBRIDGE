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

export const API_BASE_PATH = '/api/v1';

const DEFAULT_RETRIES = 2;

export class GovBridgeAuthBoundary {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  getHeaders(): Record<string, string> {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }
}

function generateCorrelationId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `govbridge-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function sanitizeDetails(value: unknown): unknown {
  if (!value || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeDetails(item));
  }

  const entries = Object.entries(value as Record<string, unknown>).reduce<Record<string, unknown>>((acc, [key, item]) => {
    const lowerKey = key.toLowerCase();

    if (
      lowerKey.includes('secret') ||
      lowerKey.includes('password') ||
      lowerKey.includes('token') ||
      lowerKey.includes('authorization') ||
      lowerKey.includes('cookie') ||
      lowerKey.includes('key')
    ) {
      acc[key] = '[redacted]';
      return acc;
    }

    acc[key] = sanitizeDetails(item);
    return acc;
  }, {});

  return entries;
}

function normaliseError(response: Response, fallbackMessage: string, correlationId: string, payload?: unknown): StandardApiError {
  const details = payload && typeof payload === 'object' ? sanitizeDetails(payload) : undefined;

  if (payload && typeof payload === 'object') {
    const candidate = payload as Record<string, unknown>;
    const candidateDetails = candidate.details;
    const safeDetails = candidateDetails && typeof candidateDetails === 'object'
      ? (sanitizeDetails(candidateDetails) as Record<string, unknown>)
      : (details as Record<string, unknown> | undefined);

    return {
      error_code: typeof candidate.error_code === 'string' ? candidate.error_code : 'API_ERROR',
      message: typeof candidate.message === 'string' ? candidate.message : fallbackMessage,
      correlation_id: typeof candidate.correlation_id === 'string' ? candidate.correlation_id : correlationId,
      details: safeDetails,
    };
  }

  return {
    error_code: 'API_ERROR',
    message: fallbackMessage,
    correlation_id: correlationId,
    details: details ? { response_status: response.status } : { response_status: response.status },
  };
}

export interface GovBridgeApiAdapter {
  request<T>(resource: ApiResource, options?: ApiRequestConfig): Promise<ApiResult<T>>;
}

export class HttpGovBridgeApiAdapter implements GovBridgeApiAdapter {
  constructor(
    private readonly auth: GovBridgeAuthBoundary,
    private readonly basePath = API_BASE_PATH,
  ) {}

  async request<T>(resource: ApiResource, options: ApiRequestConfig = {}): Promise<ApiResult<T>> {
    const method = options.method ?? 'GET';
    const retryCount = options.retry ?? DEFAULT_RETRIES;
    const correlationId = generateCorrelationId();

    const buildUrl = (path: string, params?: QueryParams) => {
      if (!params || Object.keys(params).length === 0) {
        return `${path}`;
      }

      const search = new URLSearchParams();
      if (params.page) search.set('page', String(params.page));
      if (params.limit) search.set('limit', String(params.limit));
      if (params.sort) search.set('sort', params.sort);
      if (params.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (typeof value !== 'undefined') {
            search.set(key, String(value));
          }
        });
      }

      const suffix = search.toString();
      return suffix ? `${path}?${suffix}` : path;
    };

    const url = `${this.basePath}/${resource}${buildUrl('', options.params)}`.replace(/\/\?/, '?');

    for (let attempt = 0; attempt <= retryCount; attempt += 1) {
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'X-Correlation-ID': correlationId,
          ...(this.auth.getHeaders()),
        };

        const response = await fetch(url, {
          method,
          headers,
          body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
          signal: options.signal,
        });

        const payload = response.headers.get('content-type')?.includes('application/json')
          ? await response.json()
          : null;

        if (!response.ok) {
          const error = normaliseError(response, 'Request failed.', correlationId, payload);
          if ((response.status === 429 || response.status >= 500) && attempt < retryCount) {
            continue;
          }

          return { data: null, error, status: response.status, correlation_id: correlationId };
        }

        return {
          data: (payload ?? null) as T,
          error: null,
          status: response.status,
          correlation_id: response.headers.get('x-correlation-id') ?? correlationId,
        };
      } catch (error) {
        if (attempt < retryCount) {
          continue;
        }

        const message = error instanceof Error ? error.message : 'Network request failed.';
        return {
          data: null,
          error: {
            error_code: 'NETWORK_ERROR',
            message,
            correlation_id: correlationId,
            details: { retry_count: attempt + 1 },
          },
          status: 0,
          correlation_id: correlationId,
        };
      }
    }

    return {
      data: null,
      error: {
        error_code: 'UNKNOWN_ERROR',
        message: 'Unknown API request failure.',
        correlation_id: correlationId,
        details: {},
      },
      status: 0,
      correlation_id: correlationId,
    };
  }
}

export interface GovBridgeApiClient {
  auth: GovBridgeAuthBoundary;
  getMe(): Promise<ApiResult<GovBridgeUser>>;
  listServices(params?: QueryParams): Promise<ApiResult<GovBridgeService[]>>;
  getService(serviceId: string): Promise<ApiResult<GovBridgeService>>;
  listCases(params?: QueryParams): Promise<ApiResult<GovBridgeCase[]>>;
  getCase(caseId: string): Promise<ApiResult<GovBridgeCase>>;
  listConsents(params?: QueryParams): Promise<ApiResult<GovBridgeConsent[]>>;
  getConsent(consentId: string): Promise<ApiResult<GovBridgeConsent>>;
  listDataRequests(params?: QueryParams): Promise<ApiResult<GovBridgeDataRequest[]>>;
  getDataRequest(requestId: string): Promise<ApiResult<GovBridgeDataRequest>>;
  listConnectors(params?: QueryParams): Promise<ApiResult<GovBridgeConnector[]>>;
  getConnector(connectorId: string): Promise<ApiResult<GovBridgeConnector>>;
  listTasks(params?: QueryParams): Promise<ApiResult<GovBridgeTask[]>>;
  getTask(taskId: string): Promise<ApiResult<GovBridgeTask>>;
  listEntityMatches(params?: QueryParams): Promise<ApiResult<GovBridgeEntityMatch[]>>;
  getEntityMatch(matchId: string): Promise<ApiResult<GovBridgeEntityMatch>>;
  listEntityReviews(params?: QueryParams): Promise<ApiResult<GovBridgeEntityReview[]>>;
  getEntityReview(reviewId: string): Promise<ApiResult<GovBridgeEntityReview>>;
  listEvents(params?: QueryParams): Promise<ApiResult<GovBridgeEvent[]>>;
  getEvent(eventId: string): Promise<ApiResult<GovBridgeEvent>>;
  listExceptions(params?: QueryParams): Promise<ApiResult<GovBridgeException[]>>;
  getException(exceptionId: string): Promise<ApiResult<GovBridgeException>>;
  listAuditRecords(params?: QueryParams): Promise<ApiResult<GovBridgeAuditRecord[]>>;
  getAuditRecord(recordId: string): Promise<ApiResult<GovBridgeAuditRecord>>;
  getHealth(): Promise<ApiResult<GovBridgeHealthStatus>>;
  getReady(): Promise<ApiResult<GovBridgeReadyState>>;
  getSystemHealth(): Promise<ApiResult<GovBridgeSystemHealth>>;
}

export class GovBridgeClient implements GovBridgeApiClient {
  constructor(private readonly adapter: GovBridgeApiAdapter, public readonly auth = new GovBridgeAuthBoundary()) {}

  private async request<T>(resource: ApiResource, options: ApiRequestConfig = {}): Promise<ApiResult<T>> {
    return this.adapter.request<T>(resource, options);
  }

  getMe(): Promise<ApiResult<GovBridgeUser>> {
    return this.request<GovBridgeUser>('me');
  }

  listServices(params?: QueryParams): Promise<ApiResult<GovBridgeService[]>> {
    return this.request<GovBridgeService[]>('services', { params });
  }

  getService(serviceId: string): Promise<ApiResult<GovBridgeService>> {
    return this.request<GovBridgeService>(`services/${serviceId}` as ApiResource, { method: 'GET' });
  }

  listCases(params?: QueryParams): Promise<ApiResult<GovBridgeCase[]>> {
    return this.request<GovBridgeCase[]>('cases', { params });
  }

  getCase(caseId: string): Promise<ApiResult<GovBridgeCase>> {
    return this.request<GovBridgeCase>(`cases/${caseId}` as ApiResource, { method: 'GET' });
  }

  listConsents(params?: QueryParams): Promise<ApiResult<GovBridgeConsent[]>> {
    return this.request<GovBridgeConsent[]>('consents', { params });
  }

  getConsent(consentId: string): Promise<ApiResult<GovBridgeConsent>> {
    return this.request<GovBridgeConsent>(`consents/${consentId}` as ApiResource, { method: 'GET' });
  }

  listDataRequests(params?: QueryParams): Promise<ApiResult<GovBridgeDataRequest[]>> {
    return this.request<GovBridgeDataRequest[]>('data-requests', { params });
  }

  getDataRequest(requestId: string): Promise<ApiResult<GovBridgeDataRequest>> {
    return this.request<GovBridgeDataRequest>(`data-requests/${requestId}` as ApiResource, { method: 'GET' });
  }

  listConnectors(params?: QueryParams): Promise<ApiResult<GovBridgeConnector[]>> {
    return this.request<GovBridgeConnector[]>('connectors', { params });
  }

  getConnector(connectorId: string): Promise<ApiResult<GovBridgeConnector>> {
    return this.request<GovBridgeConnector>(`connectors/${connectorId}` as ApiResource, { method: 'GET' });
  }

  listTasks(params?: QueryParams): Promise<ApiResult<GovBridgeTask[]>> {
    return this.request<GovBridgeTask[]>('tasks', { params });
  }

  getTask(taskId: string): Promise<ApiResult<GovBridgeTask>> {
    return this.request<GovBridgeTask>(`tasks/${taskId}` as ApiResource, { method: 'GET' });
  }

  listEntityMatches(params?: QueryParams): Promise<ApiResult<GovBridgeEntityMatch[]>> {
    return this.request<GovBridgeEntityMatch[]>('entity-matches', { params });
  }

  getEntityMatch(matchId: string): Promise<ApiResult<GovBridgeEntityMatch>> {
    return this.request<GovBridgeEntityMatch>(`entity-matches/${matchId}` as ApiResource, { method: 'GET' });
  }

  listEntityReviews(params?: QueryParams): Promise<ApiResult<GovBridgeEntityReview[]>> {
    return this.request<GovBridgeEntityReview[]>('entity-reviews', { params });
  }

  getEntityReview(reviewId: string): Promise<ApiResult<GovBridgeEntityReview>> {
    return this.request<GovBridgeEntityReview>(`entity-reviews/${reviewId}` as ApiResource, { method: 'GET' });
  }

  listEvents(params?: QueryParams): Promise<ApiResult<GovBridgeEvent[]>> {
    return this.request<GovBridgeEvent[]>('events', { params });
  }

  getEvent(eventId: string): Promise<ApiResult<GovBridgeEvent>> {
    return this.request<GovBridgeEvent>(`events/${eventId}` as ApiResource, { method: 'GET' });
  }

  listExceptions(params?: QueryParams): Promise<ApiResult<GovBridgeException[]>> {
    return this.request<GovBridgeException[]>('exceptions', { params });
  }

  getException(exceptionId: string): Promise<ApiResult<GovBridgeException>> {
    return this.request<GovBridgeException>(`exceptions/${exceptionId}` as ApiResource, { method: 'GET' });
  }

  listAuditRecords(params?: QueryParams): Promise<ApiResult<GovBridgeAuditRecord[]>> {
    return this.request<GovBridgeAuditRecord[]>('audit', { params });
  }

  getAuditRecord(recordId: string): Promise<ApiResult<GovBridgeAuditRecord>> {
    return this.request<GovBridgeAuditRecord>(`audit/${recordId}` as ApiResource, { method: 'GET' });
  }

  getHealth(): Promise<ApiResult<GovBridgeHealthStatus>> {
    return this.request<GovBridgeHealthStatus>('health');
  }

  getReady(): Promise<ApiResult<GovBridgeReadyState>> {
    return this.request<GovBridgeReadyState>('ready');
  }

  getSystemHealth(): Promise<ApiResult<GovBridgeSystemHealth>> {
    return this.request<GovBridgeSystemHealth>('system-health');
  }
}
