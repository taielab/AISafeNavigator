class LLMError(Exception):
    """LLM处理相关错误"""
    pass

class RetryableError(LLMError):
    """可重试的错误"""
    pass

class RateLimitError(RetryableError):
    """限流错误"""
    pass

async def with_retry(func, max_retries=3, initial_delay=1):
    """通用重试装饰器"""
    for attempt in range(max_retries):
        try:
            return await func()
        except RetryableError as e:
            if attempt == max_retries - 1:
                raise
            delay = initial_delay * (2 ** attempt)
            logger.warning(f"Retrying after {delay}s due to {str(e)}")
            await asyncio.sleep(delay) 