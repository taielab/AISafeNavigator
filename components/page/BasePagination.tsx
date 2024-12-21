"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  total: number;
  pageSize: number;
  route: string;
  subRoute?: string;
  className?: string;
}

export default function BasePagination({ currentPage, total, pageSize, route, subRoute = "", className }: PaginationProps) {
  const t = useTranslations("Common");
  const totalPages = Math.ceil(total / pageSize);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const PageLink = ({ page, children }: { page: number; children: React.ReactNode }) => (
    <Link
      href={page === 1 ? route : `${route}${subRoute}/${page}`}
      className={cn(
        "flex h-9 min-w-9 items-center justify-center rounded-md px-3",
        "text-sm font-medium transition-colors",
        page === currentPage
          ? "bg-primary text-white hover:bg-primary/90"
          : "text-gray-500 hover:bg-gray-100",
        "focus:outline-none focus:ring-2 focus:ring-primary/20"
      )}
    >
      {children}
    </Link>
  );

  if (totalPages <= 1) return null;

  return (
    <nav className={cn("flex items-center space-x-2", className)} aria-label={t("pagination")}>
      <PageLink page={Math.max(1, currentPage - 1)}>
        <span className="sr-only">{t("pagination.previous")}</span>
        <ChevronLeft className={cn("size-4", isFirstPage ? "text-gray-300" : "text-gray-500")} aria-hidden="true" />
      </PageLink>

      {pageNumbers.map((pageNumber) => (
        <PageLink key={pageNumber} page={pageNumber}>
          {pageNumber}
        </PageLink>
      ))}

      <PageLink page={Math.min(totalPages, currentPage + 1)}>
        <span className="sr-only">{t("pagination.next")}</span>
        <ChevronRight className={cn("size-4", isLastPage ? "text-gray-300" : "text-gray-500")} aria-hidden="true" />
      </PageLink>
    </nav>
  );
}
