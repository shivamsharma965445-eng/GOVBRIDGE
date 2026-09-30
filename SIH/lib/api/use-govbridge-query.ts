"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ApiResult, StandardApiError } from '@/lib/api/contracts';

export interface UseGovBridgeQueryState<T> {
  data: T | null;
  loading: boolean;
  error: StandardApiError | null;
  isEmpty: boolean;
  retryCount: number;
  refetch: () => Promise<void>;
}

export function useGovBridgeQuery<T>(
  request: () => Promise<ApiResult<T>>,
  _deps: unknown[] = [],
  maxRetries = 2,
): UseGovBridgeQueryState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<StandardApiError | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const mountedRef = useRef(true);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await request();

    if (!mountedRef.current) {
      return;
    }

    if (result.error) {
      setError(result.error);
      if (retryCount < maxRetries && (result.status === 429 || result.status >= 500)) {
        setRetryCount((current) => current + 1);
      }
    } else {
      setData(result.data as T);
      setRetryCount(0);
    }

    setLoading(false);
  }, [maxRetries, request, retryCount]);

  useEffect(() => {
    mountedRef.current = true;
    void run();

    return () => {
      mountedRef.current = false;
    };
  }, [run]);

  const refetch = useCallback(async () => {
    await run();
  }, [run]);

  return {
    data,
    loading,
    error,
    isEmpty: !loading && !error && data !== null && (Array.isArray(data) ? data.length === 0 : false),
    retryCount,
    refetch,
  };
}
