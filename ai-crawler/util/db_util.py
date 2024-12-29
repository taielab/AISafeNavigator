import os
from datetime import datetime
from datetime import timezone
from dotenv import load_dotenv
from supabase import create_client, Client
import logging
from config.ai_categories import CategorySystem
import asyncio

# 设置日志记录
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(filename)s - %(funcName)s - %(lineno)d - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class DBUtil:
    def __init__(self):
        load_dotenv()
        self.supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
        self.supabase_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
        self.supabase: Client = create_client(self.supabase_url, self.supabase_key)

    async def save_web_navigation(self, data):
        """
        保存爬取结果到 web_navigation 表
        """
        try:
            logger.info(f"准备保存数据到 Supabase: {data.get('name')}")
            # 获取标签和分类信息
            tags_info = data.get("tags_info") or {"tags": [], "category": "other"}
            
            # 确保数据是可序列化的
            if asyncio.iscoroutine(tags_info):
                tags_info = await tags_info
            
            detail = data.get("detail")
            if asyncio.iscoroutine(detail):
                detail = await detail
            
            web_data = {
                "name": data.get("name"),
                "title": data.get("title"),
                "content": data.get("description"),
                "detail": detail,
                "url": data.get("url"),
                "image_url": data.get("screenshot_data", None),
                "thumbnail_url": data.get("screenshot_thumbnail_data", None),
                "collection_time": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S%z"),
                "tag_name": ','.join(tags_info["tags"]) if tags_info["tags"] else None,
                "website_data": None,
                "star_rating": 0,
                "category_name": tags_info["category"]
            }
            result = self.supabase.table('web_navigation').upsert(web_data).execute()
            logger.info(f"数据保存成功: {data.get('name')}")
            return result
        except Exception as e:
            logger.error(f"保存数据到 Supabase 失败 - Name: {data.get('name')}, 错误: {str(e)}")
            return None 