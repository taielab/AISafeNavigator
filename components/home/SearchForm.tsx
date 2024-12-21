'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import SearchInput from '../search/SearchInput';

interface SearchFormProps {
  defaultSearch?: string;
  className?: string;
}

const SearchForm = React.memo(({ defaultSearch = '', className }: SearchFormProps) => {
  const router = useRouter();

  const handleSearch = useCallback((query: string) => {
    if (query.trim()) {
      router.push(`/query/${encodeURIComponent(query.trim())}`);
    }
  }, [router]);

  return (
    <form 
      className={cn('w-full', className)}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.querySelector('input') as HTMLInputElement;
        handleSearch(input.value);
      }}
    >
      <SearchInput
        defaultValue={defaultSearch}
        onSubmit={handleSearch}
      />
    </form>
  );
});

SearchForm.displayName = 'SearchForm';

export default SearchForm;
