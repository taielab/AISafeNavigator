from prometheus_client import Counter, Histogram
import structlog

# 性能指标
scrape_duration = Histogram('scrape_duration_seconds', 'Time spent scraping website')
llm_requests = Counter('llm_requests_total', 'Total LLM API calls')
cache_hits = Counter('cache_hits_total', 'Cache hit count')

# 结构化日志
logger = structlog.get_logger() 