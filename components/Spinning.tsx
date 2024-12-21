"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SpinningProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "white";
  thickness?: "thin" | "normal" | "thick";
}

const sizeClasses = {
  xs: "size-3",
  sm: "size-4",
  md: "size-8",
  lg: "size-12",
  xl: "size-16"
};

const colorClasses = {
  primary: "border-blue-500 border-t-transparent",
  secondary: "border-gray-500 border-t-transparent",
  white: "border-white border-t-transparent"
};

const thicknessClasses = {
  thin: "border",
  normal: "border-2",
  thick: "border-4"
};

const Spinning = React.memo(({ 
  className,
  size = "md",
  color = "white",
  thickness = "normal"
}: SpinningProps) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full",
        sizeClasses[size],
        colorClasses[color],
        thicknessClasses[thickness],
        className
      )}
      role="progressbar"
      aria-label="Loading"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
});

Spinning.displayName = "Spinning";

export default Spinning;
