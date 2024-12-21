"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import Spinning from "./Spinning";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  textColor?: string;
}

const Loading = React.memo(({ 
  className,
  size = "md",
  showText = true,
  textColor = "text-gray-500"
}: LoadingProps) => {
  const t = useTranslations("Common");

  return (
    <div 
      role="status" 
      aria-live="polite"
      className={cn("flex flex-col items-center gap-2", className)}
    >
      <Spinning 
        className={className} 
        size={size}
        color="primary"
      />
      {showText && (
        <span className={cn(
          "text-xs",
          size === "lg" && "text-sm",
          size === "sm" && "text-[10px]",
          textColor
        )}>
          {t("loading")}
        </span>
      )}
    </div>
  );
});

Loading.displayName = "Loading";

export default Loading;
