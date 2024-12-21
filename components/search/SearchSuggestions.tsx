"use client";

import React from "react";
import { Search, Tag } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import Spinning from "../Spinning";

interface Suggestion {
  id: string;
  title: string;
  tag_name?: string;
}

interface SearchSuggestionsProps {
  suggestions: Suggestion[];
  isLoading: boolean;
  onSelect: (suggestion: Suggestion) => void;
  className?: string;
}

const SearchSuggestions = React.memo(({
  suggestions,
  isLoading,
  onSelect,
  className,
}: SearchSuggestionsProps) => {
  const t = useTranslations("Search");

  if (isLoading) {
    return (
      <div className={cn("mt-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm", className)}>
        <div className="flex items-center justify-center py-2">
          <Spinning size="sm" color="primary" />
        </div>
      </div>
    );
  }

  if (!suggestions.length) {
    return null;
  }

  return (
    <div className={cn("mt-2 rounded-xl border border-gray-100 bg-white shadow-sm", className)}>
      <div className="flex flex-col divide-y divide-gray-100">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSelect(suggestion)}
            className="flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
          >
            <Search className="size-4 text-gray-400" />
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-sm text-gray-900">
                {suggestion.title}
              </span>
              {suggestion.tag_name && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Tag className="size-3" />
                  {suggestion.tag_name}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
});

SearchSuggestions.displayName = "SearchSuggestions";

export default SearchSuggestions; 