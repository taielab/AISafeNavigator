"use client";

import React, { useEffect, useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { useSearchHistory } from "@/lib/hooks/useSearchHistory";
import { useSearchSuggestions } from "@/lib/hooks/useSearchSuggestions";
import { useOnClickOutside } from "@/lib/hooks/useOnClickOutside";
import Spinning from "../Spinning";
import SearchHistory from "./SearchHistory";
import SearchSuggestions from "./SearchSuggestions";

interface SearchInputProps {
  defaultValue?: string;
  className?: string;
  onSubmit?: (query: string) => void;
}

const SearchInput = React.memo(({
  defaultValue = "",
  className,
  onSubmit,
}: SearchInputProps) => {
  const t = useTranslations("Search");
  const [query, setQuery] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mode, setMode] = useState<"history" | "suggestions">("history");
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToHistory } = useSearchHistory();
  const { suggestions, isLoading: isSuggestionsLoading } = useSearchSuggestions(query);

  // 处理默认值
  useEffect(() => {
    if (defaultValue) {
      setQuery(defaultValue);
    }
  }, [defaultValue]);

  // 处理点击外部关闭下拉框
  useOnClickOutside(containerRef, () => setShowDropdown(false));

  const handleSubmit = () => {
    if (query.trim()) {
      setIsLoading(true);
      setShowDropdown(false);
      addToHistory(query.trim());
      onSubmit?.(query.trim());
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setShowDropdown(false);
  };

  const handleHistorySelect = (selectedQuery: string) => {
    setQuery(selectedQuery);
    setShowDropdown(false);
    onSubmit?.(selectedQuery);
  };

  const handleSuggestionSelect = (suggestion: { title: string }) => {
    setQuery(suggestion.title);
    setShowDropdown(false);
    onSubmit?.(suggestion.title);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(true);
    setMode(value.trim() ? "suggestions" : "history");
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          onFocus={() => {
            setShowDropdown(true);
            setMode(query.trim() ? "suggestions" : "history");
          }}
          placeholder={t("placeholder")}
          className={cn(
            "h-10 sm:h-12 w-full rounded-lg sm:rounded-xl bg-white pl-10 sm:pl-12 pr-10 sm:pr-12",
            "text-sm sm:text-base text-gray-900 placeholder:text-gray-400",
            "border border-gray-200",
            "transition-shadow duration-200",
            "hover:shadow-md",
            "focus:outline-none focus:ring-2 focus:ring-primary/20"
          )}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className={cn(
            "absolute left-3 sm:left-4 top-1/2 -translate-y-1/2",
            "text-gray-400 transition-colors duration-200",
            "hover:text-gray-600"
          )}
          aria-label={t("search")}
        >
          <Search className="size-4 sm:size-5" aria-hidden="true" />
        </button>
        {isLoading ? (
          <Spinning
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2"
            size="sm"
            color="primary"
          />
        ) : query && (
          <button
            type="button"
            onClick={clearSearch}
            className={cn(
              "absolute right-3 sm:right-4 top-1/2 -translate-y-1/2",
              "text-gray-400 transition-colors duration-200",
              "hover:text-gray-500"
            )}
            aria-label={t("clear")}
          >
            <X className="size-4 sm:size-5" />
          </button>
        )}
      </div>
      {showDropdown && (
        mode === "history" ? (
          <SearchHistory
            onSelect={handleHistorySelect}
            className="absolute left-0 right-0 z-10"
          />
        ) : (
          <SearchSuggestions
            suggestions={suggestions}
            isLoading={isSuggestionsLoading}
            onSelect={handleSuggestionSelect}
            className="absolute left-0 right-0 z-10"
          />
        )
      )}
    </div>
  );
});

SearchInput.displayName = "SearchInput";

export default SearchInput; 