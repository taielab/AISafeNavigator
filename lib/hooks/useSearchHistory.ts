import { useState, useEffect } from "react";

const SEARCH_HISTORY_KEY = "search_history";
const MAX_HISTORY_ITEMS = 10;

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

  // 加载历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 添加搜索记录
  const addToHistory = (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setHistory(prev => {
      const newHistory = [
        trimmedQuery,
        ...prev.filter(item => item !== trimmedQuery)
      ].slice(0, MAX_HISTORY_ITEMS);
      
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  // 删除单个记录
  const removeFromHistory = (query: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(item => item !== query);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  // 清空历史记��
  const clearHistory = () => {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    setHistory([]);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
} 