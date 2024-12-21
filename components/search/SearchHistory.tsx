'use client';

import React from 'react';
import { Clock, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { useSearchHistory } from '@/lib/hooks/useSearchHistory';

interface SearchHistoryProps {
  onSelect: (query: string) => void;
  className?: string;
}

const SearchHistory = React.memo(({ onSelect, className }: SearchHistoryProps) => {
  const t = useTranslations('Search');
  const { history, removeFromHistory, clearHistory } = useSearchHistory();

  if (!history.length) return null;

  return (
    <div className={cn('mt-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm', className)}>
      <div className='mb-3 flex items-center justify-between'>
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <Clock className='size-4' />
          {t('searchHistory')}
        </div>
        <button
          onClick={clearHistory}
          className='text-sm text-gray-400 transition-colors hover:text-gray-600'
        >
          {t('clearHistory')}
        </button>
      </div>
      <div className='flex flex-wrap gap-2'>
        {history.map((query) => (
          <div
            key={query}
            className='group flex items-center gap-1 rounded-full bg-gray-50 px-3 py-1.5'
          >
            <button
              onClick={() => onSelect(query)}
              className='text-sm text-gray-600 transition-colors group-hover:text-gray-900'
            >
              {query}
            </button>
            <button
              onClick={() => removeFromHistory(query)}
              className='ml-1 rounded-full p-0.5 text-gray-400 opacity-0 transition-all group-hover:opacity-100'
              aria-label={t('removeFromHistory')}
            >
              <X className='size-3' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

SearchHistory.displayName = 'SearchHistory';

export default SearchHistory; 