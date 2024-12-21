"use client";

import React, { Component, ErrorInfo } from "react";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  t: (key: string) => string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundaryBase extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // 这里可以添加错误上报逻辑
    // reportError(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  public render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[400px] w-full flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            {this.props.t("title")}
          </h2>
          <p className="max-w-[500px] text-sm text-muted-foreground">
            {this.state.error?.message || this.props.t("message")}
          </p>
          <button
            onClick={this.handleRetry}
            className="text-sm text-primary hover:text-primary/90"
          >
            {this.props.t("retry")}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function ErrorBoundary(props: Omit<Props, "t">) {
  const t = useTranslations("error");
  return <ErrorBoundaryBase {...props} t={t} />;
} 