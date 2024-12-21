// 错误类型定义
export enum ErrorType {
  Network = "NETWORK_ERROR",
  Authentication = "AUTH_ERROR",
  Authorization = "AUTHORIZATION_ERROR",
  NotFound = "NOT_FOUND",
  Validation = "VALIDATION_ERROR",
  Server = "SERVER_ERROR",
  Unknown = "UNKNOWN_ERROR",
}

// 自定义错误类
export class AppError extends Error {
  constructor(
    public type: ErrorType,
    message: string,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = "AppError";
  }
}

// 错误处理函数
export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    // 网络错误
    if (error.name === "NetworkError" || error.message.includes("network")) {
      return new AppError(
        ErrorType.Network,
        "网络连接错误，请检查您的网络连接",
        503,
        error
      );
    }

    // 认证错误
    if (error.message.includes("unauthorized") || error.message.includes("unauthenticated")) {
      return new AppError(
        ErrorType.Authentication,
        "请���登录",
        401,
        error
      );
    }

    // 授权错误
    if (error.message.includes("forbidden") || error.message.includes("permission")) {
      return new AppError(
        ErrorType.Authorization,
        "没有权限执行此操作",
        403,
        error
      );
    }

    // 未找到
    if (error.message.includes("not found")) {
      return new AppError(
        ErrorType.NotFound,
        "请求的资源不存在",
        404,
        error
      );
    }

    // 验证错误
    if (error.message.includes("validation")) {
      return new AppError(
        ErrorType.Validation,
        "输入数据验证失败",
        400,
        error
      );
    }

    // 服务器错误
    if (error.message.includes("server")) {
      return new AppError(
        ErrorType.Server,
        "服务器错误，请稍后重试",
        500,
        error
      );
    }
  }

  // 未知错误
  return new AppError(
    ErrorType.Unknown,
    "发生了未知错误",
    500,
    error instanceof Error ? error : new Error(String(error))
  );
}

// 重试函数
export async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000,
  onRetry?: (error: Error, attempt: number) => void
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }

    if (onRetry) {
      onRetry(error instanceof Error ? error : new Error(String(error)), retries);
    }

    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay * 2, onRetry);
  }
}

// 错误消息格式化
export function formatErrorMessage(error: unknown): string {
  const appError = handleError(error);
  return `${appError.message}${
    process.env.NODE_ENV === "development" && appError.originalError
      ? `\n\nOriginal error: ${appError.originalError.message}`
      : ""
  }`;
} 