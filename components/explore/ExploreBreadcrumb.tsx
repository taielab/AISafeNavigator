"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbLink = React.memo(({ 
  href, 
  label, 
  isLast 
}: {
  href: string;
  label: string;
  isLast: boolean;
}) => (
  <Link
    href={href}
    className={cn(
      "text-sm font-medium transition-colors duration-200",
      isLast 
        ? "text-gray-900 pointer-events-none" 
        : "text-gray-500 hover:text-gray-700",
      "focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-sm"
    )}
    aria-current={isLast ? "page" : undefined}
  >
    {label}
  </Link>
));

BreadcrumbLink.displayName = "BreadcrumbLink";

const ExploreBreadcrumb = React.memo(({ items = [], className }: BreadcrumbProps) => {
  const t = useTranslations("Category");

  const breadcrumbItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.map((item, index) => ({
      ...item,
      isLast: index === items.length - 1
    }));
  }, [items]);

  return (
    <nav 
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2", className)}
    >
      <ol className="flex items-center space-x-2">
        <li>
          <BreadcrumbLink 
            href="/"
            label={t("home")}
            isLast={false}
          />
        </li>
        {breadcrumbItems.map((item) => (
          <React.Fragment key={item.href}>
            <ChevronRight 
              className="size-4 text-gray-400" 
              aria-hidden="true"
            />
            <li>
              <BreadcrumbLink
                href={item.href}
                label={item.label}
                isLast={item.isLast}
              />
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
});

ExploreBreadcrumb.displayName = "ExploreBreadcrumb";

export default ExploreBreadcrumb;
