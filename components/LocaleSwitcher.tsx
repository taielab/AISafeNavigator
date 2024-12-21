"use client";

import React, { useState, useCallback, useTransition } from "react";
import { languages } from "@/i18n";
import { useLocale } from "next-intl";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "../app/navigation";
import Icon from "./image/Icon";
import Loading from "./Loading";

interface LocaleSwitcherProps {
  className?: string;
}

const LocaleSwitcher = React.memo(({ className }: LocaleSwitcherProps) => {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isChanging, setIsChanging] = useState(false);

  const onValueChange = useCallback((newLocale: string) => {
    setIsChanging(true);
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
      setIsChanging(false);
    });
  }, [pathname, router]);

  return (
    <div className={cn("relative", className)}>
      <Select 
        value={currentLocale} 
        defaultValue={currentLocale} 
        onValueChange={onValueChange}
        disabled={isChanging}
      >
        <SelectTrigger 
          className={cn(
            "flex h-8 w-[80px] items-center gap-1 rounded-lg",
            "border border-gray-200 bg-transparent px-2",
            "text-gray-600 hover:bg-gray-50",
            "focus:ring-2 focus:ring-primary/20"
          )}
        >
          <Icon 
            src="/icons/global.svg" 
            className="text-gray-400 transition-colors duration-200 group-hover:text-primary"
          />
          <SelectValue placeholder="locale" className="text-gray-700">
            {currentLocale.toUpperCase()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent 
          className="border border-gray-200 bg-white shadow-lg" 
          position="popper"
          sideOffset={4}
        >
          {languages.map((language) => (
            <SelectItem 
              value={language.lang} 
              key={language.code} 
              className={cn(
                "cursor-pointer",
                "text-gray-600 hover:text-gray-900",
                "hover:bg-gray-50 active:bg-gray-100",
                "focus:bg-gray-50 focus:text-gray-900"
              )}
              disabled={isChanging}
            >
              {language.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {(isPending || isChanging) && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/90">
          <Loading size="sm" showText={false} />
        </div>
      )}
    </div>
  );
});

LocaleSwitcher.displayName = "LocaleSwitcher";

export default LocaleSwitcher;
