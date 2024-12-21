import { useState, useCallback, useRef } from "react";
import { useDebounce } from "./useDebounce";

interface SearchResult {
  id: string;
  title: string;
  content: string;
  url: string;
}

interface UseSearchOptions {
  debounceTime?: number;
  cacheTime?: number;
}

interface CacheItem {
  results: SearchResult[];
  timestamp: number;
}

export function useSearch({ debounceTime = 300, cacheTime = 5 * 60 * 1000 }: UseSearchOptions = {}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // 搜索结果缓存
  const cache = useRef<Record<string, CacheItem>>({});

  // 检查缓存是否有效
  const isCacheValid = useCallback((cacheItem: CacheItem) => {
    return Date.now() - cacheItem.timestamp < cacheTime;
  }, [cacheTime]);

  // 执行搜索
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    // 检查缓存
    const cachedResult = cache.current[searchQuery];
    if (cachedResult && isCacheValid(cachedResult)) {
      setResults(cachedResult.results);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 这里替换为实际的搜索API调用
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      setResults(data);

      // 更新缓存
      cache.current[searchQuery] = {
        results: data,
        timestamp: Date.now(),
      };
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Search failed"));
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [isCacheValid]);

  // 防抖处理
  const debouncedSearch = useDebounce(performSearch, debounceTime);

  // 处理搜索输入
  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    debouncedSearch(searchQuery);
  }, [debouncedSearch]);

  // 清除搜索
  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setError(null);
  }, []);

  // 清除缓存
  const clearCache = useCallback(() => {
    cache.current = {};
  }, []);

  return {
    query,
    results,
    isLoading,
    error,
    handleSearch,
    clearSearch,
    clearCache,
  };
} 