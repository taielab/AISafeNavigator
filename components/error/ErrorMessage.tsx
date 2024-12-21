/*
 * @Author: taielab 52345183+taielab@users.noreply.github.com
 * @Date: 2024-12-20 22:12:35
 * @LastEditors: taielab 52345183+taielab@users.noreply.github.com
 * @LastEditTime: 2024-12-21 15:52:45
 * @FilePath: /AISafeNavigator/components/error/ErrorMessage.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
"use client";

import React from "react";
import { AlertTriangle, XCircle, AlertCircle, Ban, ServerCrash } from "lucide-react";
import { ErrorType } from "@/lib/utils/error";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ErrorMessageProps {
  type?: ErrorType;
  title?: string;
  message: string;
  className?: string;
  onRetry?: () => void;
}

const ErrorMessage = React.memo(({
  type = ErrorType.Unknown,
  title,
  message,
  className,
  onRetry,
}: ErrorMessageProps) => {
  const t = useTranslations("error");

  const getIcon = () => {
    switch (type) {
      case ErrorType.Network:
        return <XCircle className="size-5 text-red-500" />;
      case ErrorType.Authentication:
      case ErrorType.Authorization:
        return <Ban className="size-5 text-red-500" />;
      case ErrorType.NotFound:
        return <AlertCircle className="size-5 text-yellow-500" />;
      case ErrorType.Validation:
        return <AlertTriangle className="size-5 text-yellow-500" />;
      case ErrorType.Server:
        return <ServerCrash className="size-5 text-red-500" />;
      default:
        return <AlertTriangle className="size-5 text-yellow-500" />;
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case ErrorType.Network:
        return t("network");
      case ErrorType.Authentication:
        return t("auth");
      case ErrorType.Authorization:
        return t("permission");
      case ErrorType.NotFound:
        return t("notfound");
      case ErrorType.Validation:
        return t("validation");
      case ErrorType.Server:
        return t("server");
      default:
        return t("unknown");
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-red-100 bg-red-50 p-4",
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">
            {title || getDefaultTitle()}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {message}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm font-medium text-primary hover:text-primary/90"
            >
              {t("retry")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

ErrorMessage.displayName = "ErrorMessage";

export default ErrorMessage; 