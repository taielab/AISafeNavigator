import { useState, useEffect } from 'react';
import { useDebounceValue } from './useDebounceValue';
import { createClient } from '@/db/supabase/client';

interface Suggestion {
  id: string;
  title: string;
  tag_name?: string;
}

export function useSearchSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounceValue(query, 300);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);

      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('web_navigation')
          .select('id, title, tag_name')
          .ilike('title', `%${debouncedQuery}%`)
          .limit(5);

        setSuggestions(data?.map(item => ({
          ...item,
          id: item.id.toString()
        })) || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  return {
    suggestions,
    isLoading,
  };
} 