"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Compass, FolderDot, FolderRoot } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import Icon from "../image/Icon";

interface CategoryItem {
  id: string;
  name: string;
  parent_id?: string | null;
  icon?: string;
  children?: CategoryItem[];
}

interface CategoryTreeProps {
  categories: CategoryItem[];
  className?: string;
}

const CategoryTree = React.memo(({ categories, className }: CategoryTreeProps) => {
  const t = useTranslations("Category");
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const categoryTree = useMemo(() => {
    const tree: Record<string, CategoryItem & { children: CategoryItem[] }> = {};
    const roots: CategoryItem[] = [];

    categories.forEach(category => {
      tree[category.id] = { ...category, children: [] };
    });

    categories.forEach(category => {
      if (category.parent_id && tree[category.parent_id]) {
        tree[category.parent_id].children.push(tree[category.id]);
      } else {
        roots.push(tree[category.id]);
      }
    });

    return roots;
  }, [categories]);

  const toggleExpand = (categoryId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const renderCategory = (category: CategoryItem & { children?: CategoryItem[] }, level = 0) => {
    const href = `/category/${category.name}`;
    const isActive = pathname === href;
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedItems.has(category.id);

    return (
      <li key={category.id}>
        <div className="flex items-center">
          <Link
            href={href}
            className={cn(
              "group flex flex-1 items-center gap-2 rounded-xl px-4 py-3",
              "text-sm font-medium transition-all duration-200",
              "hover:bg-primary/5",
              level > 0 && "ml-3",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-gray-600 hover:text-primary"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {category.icon ? (
              <Icon 
                src={category.icon}
                className={cn(
                  "size-4 transition-colors duration-200",
                  isActive ? "opacity-100" : "opacity-60 group-hover:opacity-80"
                )}
              />
            ) : (
              level === 0 ? (
                <FolderRoot 
                  className={cn(
                    "size-4 transition-colors duration-200",
                    isActive ? "text-primary" : "text-gray-400 group-hover:text-primary"
                  )} 
                />
              ) : (
                <FolderDot 
                  className={cn(
                    "size-4 transition-colors duration-200",
                    isActive ? "text-primary" : "text-gray-400 group-hover:text-primary"
                  )} 
                />
              )
            )}
            <span className="flex-1 truncate">{category.name}</span>
          </Link>
          {hasChildren && (
            <button
              type="button"
              onClick={() => toggleExpand(category.id)}
              className={cn(
                "mr-2 p-1 rounded-md transition-colors duration-200",
                "hover:bg-primary/5",
                "text-gray-400 hover:text-primary"
              )}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? t("collapseCategory") : t("expandCategory")}
            >
              <ChevronRight 
                className={cn(
                  "size-4 transition-transform duration-200",
                  isExpanded && "rotate-90"
                )} 
              />
            </button>
          )}
        </div>
        {hasChildren && category.children && (
          <ul className={cn(
            "overflow-hidden transition-all duration-200",
            isExpanded ? "mt-1 max-h-96 space-y-1" : "max-h-0"
          )}>
            {category.children.map(child => renderCategory(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className={cn(
      "w-[300px] shrink-0",
      "transition-all duration-300",
      className
    )}>
      <div className="sticky top-[80px]">
        <div className="h-[220px]" />
        <div className="rounded-2xl bg-white shadow-soft p-5">
          <div className="max-h-[calc(100vh-320px)] overflow-y-auto scrollbar-custom">
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/"
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-4 py-3",
                    "text-sm font-medium transition-all duration-200",
                    "hover:bg-primary/5",
                    pathname === "/" 
                      ? "bg-primary/10 text-primary" 
                      : "text-gray-600 hover:text-primary"
                  )}
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  <Compass className="size-5" />
                  <span>{t("home")}</span>
                </Link>
              </li>
              <div className="my-3 h-px bg-gray-100" />
              {categoryTree.map(category => renderCategory(category))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
});

CategoryTree.displayName = "CategoryTree";

export default CategoryTree; 