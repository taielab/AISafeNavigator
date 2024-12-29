'''
Author: taielab 52345183+taielab@users.noreply.github.com
Date: 2024-12-23 11:26:34
LastEditors: taielab 52345183+taielab@users.noreply.github.com
LastEditTime: 2024-12-23 14:16:55
FilePath: /tap4-ai-crawler/test_crawler.py
Description: 测试爬虫功能
'''
import asyncio
import logging
from main_api import scrape, URLRequest
from website_crawler import WebsiteCrawler
import os

# 设置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(filename)s - %(funcName)s - %(lineno)d - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

async def process_url_file(file_path):
    """处理包含URL的文本文件"""
    try:
        if not os.path.exists(file_path):
            logger.error(f"文件不存在: {file_path}")
            return
        
        # 读取文件内容
        with open(file_path, 'r', encoding='utf-8') as f:
            urls = [line.strip() for line in f.readlines() if line.strip()]
        
        logger.info(f"从文件中读取到 {len(urls)} 个URL")
        
        # 初始化爬虫和浏览器
        crawler = WebsiteCrawler()
        await crawler.initialize()
        
        # 初始化统计
        success_count = 0
        fail_count = 0
        
        try:
            # 处理每个URL
            for url in urls:
                try:
                    logger.info(f"\n=== 处理URL: {url} ===")
                    request = URLRequest(url=url, languages=None)
                    result = await scrape(request, authorization="Bearer OIaTtaIBAmQDRyR6Ecrc1jdJay5czJsT")
                    
                    if result:
                        success_count += 1
                        logger.info(f"成功处理: {url}")
                    else:
                        fail_count += 1
                        logger.error(f"处理失败: {url}")
                    
                    # 每处理5个URL后等待一下，避免过快
                    if (success_count + fail_count) % 5 == 0:
                        await asyncio.sleep(2)
                except Exception as e:
                    fail_count += 1
                    logger.error(f"处理URL失败 {url}: {str(e)}")
        finally:
            # 清理浏览器资源
            await crawler.cleanup()
        
        logger.info(f"\n=== 处理完成 ===")
        logger.info(f"成功: {success_count}")
        logger.info(f"失败: {fail_count}")
        logger.info(f"总计: {len(urls)}")
        
    except Exception as e:
        logger.error(f"处理文件失败: {str(e)}")

async def test_url(url: str, crawler=None):
    """测试单个URL的爬取"""
    should_cleanup = False
    try:
        if not crawler:
            crawler = WebsiteCrawler()
            retry_count = 3
            for attempt in range(retry_count):
                try:
                    await crawler.initialize()
                    break
                except Exception as e:
                    if attempt == retry_count - 1:
                        raise
                    logger.warning(f"浏览器初始化失败，重试 ({attempt + 1}/{retry_count})")
                    await asyncio.sleep(2)
            should_cleanup = True
        
        # 构建请求
        request = URLRequest(
            url=url,
            languages=None  # 不进行翻译，保持原始语言
        )
        
        # 调用处理函数
        result = await scrape(request, authorization="Bearer OIaTtaIBAmQDRyR6Ecrc1jdJay5czJsT")
        
        # 打印关键信息
        if result and result.get('data'):
            data = result['data']
            logger.info("=== 爬取结果 ===")
            logger.info(f"网站: {data.get('url')}")
            logger.info(f"标题: {data.get('title')}")
            
            # 安全地获取嵌套数据
            tags_info = data.get('tags_info', {})
            if isinstance(tags_info, dict):
                logger.info(f"分类: {tags_info.get('category', 'N/A')}")
                logger.info(f"标签: {tags_info.get('tags', [])}")
            else:
                logger.info("分类: N/A")
                logger.info("标签: []")
                
            logger.info(f"截图: {data.get('screenshot_data', 'N/A')}")
            
            # 安全地显示详情
            detail = data.get('detail', '')
            if detail and isinstance(detail, str):
                preview = detail[:200] + '...' if len(detail) > 200 else detail
                logger.info(f"详情: {preview}")
            else:
                logger.info("详情: N/A")
                
            return result
        else:
            logger.error("爬取失败或返回数据为空")
            return None
            
    except Exception as e:
        logger.error(f"测试过程中发生错误: {str(e)}", exc_info=True)
        return None
    finally:
        # 只有在这个函数创建的浏览器才需要清理
        if should_cleanup and crawler:
            await asyncio.shield(crawler.cleanup())

def crawl_url(url: str):
    """提供给外部调用的主函数"""
    try:
        result = asyncio.run(test_url(url))
        if result:
            logger.info("测试成功")
            return result
        else:
            logger.info("测试失败")
            return None
    except KeyboardInterrupt:
        logger.info("测试被用户中断")
    except Exception as e:
        logger.error(f"测试失败: {e}")
    return None

def crawl_from_file(file_path: str):
    """从文件批量导入URL"""
    try:
        asyncio.run(process_url_file(file_path))
    except KeyboardInterrupt:
        logger.info("批量导入被用户中断")
    except Exception as e:
        logger.error(f"批量导入失败: {e}")

# 直接运行测试
if __name__ == "__main__":
    import sys
    
    # 解析命令行参数
    import argparse
    parser = argparse.ArgumentParser(description='网站爬虫工具')
    parser.add_argument('--file', '-f', help='包含URL的文本文件路径')
    parser.add_argument('--url', '-u', help='单个URL')
    args = parser.parse_args()
    
    if args.file:
        crawl_from_file(args.file)
    elif args.url:
        logger.info(f"\n=== 测试URL: {args.url} ===")
        crawl_url(args.url)
    else:
        logger.error("请提供 --file 或 --url 参数")