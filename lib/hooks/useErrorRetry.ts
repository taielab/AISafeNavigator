import { useState, useCallback } from 'react';
import { retry } from '@/lib/utils/error';

interface UseErrorRetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  onRetry?: (error: Error, attempt: number) => void;
}

export function useErrorRetry<T>({
  maxRetries = 3,
  initialDelay = 1000,
  onRetry,
}: UseErrorRetryOptions = {}) {
  const [isRetrying, setIsRetrying] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const execute = useCallback(async (fn: () => Promise<T>): Promise<T> => {
    setIsRetrying(true);
    setError(null);
    
    try {
      const result = await retry(
        fn,
        maxRetries,
        initialDelay,
        (err, attempt) => {
          setRetryCount(maxRetries - attempt + 1);
          onRetry?.(err, attempt);
        }
      );
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      setIsRetrying(false);
      setRetryCount(0);
    }
  }, [maxRetries, initialDelay, onRetry]);

  const reset = useCallback(() => {
    setIsRetrying(false);
    setError(null);
    setRetryCount(0);
  }, []);

  return {
    execute,
    reset,
    isRetrying,
    error,
    retryCount,
  };
} 