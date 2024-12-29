import os
import time
from dotenv import load_dotenv
from groq import Groq
from openai import OpenAI
import logging
from transformers import LlamaTokenizer
from util.common_util import CommonUtil
from config.ai_categories import CATEGORIES, TAG_TO_CATEGORY, ALL_TAGS, CategorySystem
import asyncio
import openai

# 设置日志记录
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(filename)s - %(funcName)s - %(lineno)d - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
util = CommonUtil()
# 使用更轻量级的tokenizer或在初始化时处理异常
try:
    # 使用缓存目录
    cache_dir = os.path.join(os.path.dirname(__file__), "../cache/tokenizer")
    os.makedirs(cache_dir, exist_ok=True)
    
    tokenizer = LlamaTokenizer.from_pretrained(
        "huggyllama/llama-7b",  # 使用较小的模型
        cache_dir=cache_dir,
        use_fast=True
    )
except Exception as e:
    logger.warning(f"Failed to load LlamaTokenizer: {e}")
    # 使用简单的长度检查作为后备方案
    tokenizer = None

class LLMUtil:
    # 使用 Groq API 处理文本:
    # - 生���网站详细描述
    # - 处理标签
    # - 多语言翻译
    def __init__(self):
        self.cache = {}
        self.cache_ttl = 3600  # 1小时缓存
        self._init_config()
        self._init_client()
        self.category_system = CategorySystem()
        
        logger.info(f"使用 LLM 服务: {self.llm_service}")

    def _init_config(self):
        load_dotenv()
        self.llm_service = os.getenv('LLM_SERVICE', 'groq')
        # 将配置集中管理
        self.config = {
            'groq': {
                'api_key': os.getenv('GROQ_API_KEY'),
                'model': os.getenv('GROQ_MODEL'),
                'max_tokens': int(os.getenv('GROQ_MAX_TOKENS', 5000))
            },
            'openai': {
                'api_key': os.getenv('OPENAI_API_KEY'),
                'base_url': os.getenv('OPENAI_BASE_URL'),
                'model': os.getenv('OPENAI_MODEL')
            }
        }
        # 加载提示词配置
        self.detail_sys_prompt = os.getenv('DETAIL_SYS_PROMPT')
        # 构建标签选择器提示词
        self.tag_selector_sys_prompt = """You are an AI & Security Tool Classification Expert.

 Task: Analyze the content and select the most appropriate tags that accurately categorize the tool's capabilities and purpose.

 Available tags: {available_tags}

 Classification Rules:
 1. ONLY select tags from the provided list
 2. Select 2-3 most relevant tags that best describe the core functionality
 3. Prioritize specific tags over general ones
 4. Consider both primary and secondary features
 5. For security tools:
    - If it's mainly for offensive security (pentesting, bug bounty, etc.), prioritize offensive tags
    - If it's mainly for defensive security (monitoring, protection, etc.), prioritize defensive tags
    - If it serves both purposes, include both types of tags
 6. Tag Selection Priority:
    - First, identify the main category (security, AI, development, etc.)
    - Then, select specific capability tags within that category
    - Finally, add any relevant cross-category tags

 Content to analyze: {content}

 Response Format:
 - Return ONLY comma-separated tags
 - No additional text or explanation
 - Example: "pentest,vulnerability-detection,security-assessment"
 """
        self.language_sys_prompt = os.getenv('LANGUAGE_SYS_PROMPT')

    def _get_cache_key(self, prompt_type, content):
        """生成缓存键"""
        return f"{prompt_type}:{hash(content)}"

    def process_with_cache(self, prompt_type, content):
        """带缓存的处理"""
        cache_key = self._get_cache_key(prompt_type, content)
        if cache_key in self.cache:
            cached_result = self.cache[cache_key]
            if time.time() - cached_result['timestamp'] < self.cache_ttl:
                logger.info(f"命中缓存: {prompt_type}")
                return cached_result['result']
        return None

    def _init_client(self):
        """初始化 LLM 客户端"""
        if self.llm_service == 'groq':
            self.client = Groq(api_key=self.config['groq']['api_key'])
        else:
            self.client = OpenAI(
                api_key=self.config['openai']['api_key'],
                base_url=self.config['openai']['base_url']
            )

    def process_detail(self, user_prompt):
        logger.info("正在处理Detail...")
        if not self.detail_sys_prompt:
            logger.error("未找到 DETAIL_SYS_PROMPT 配置")
            return None
        
        # 添加内容hash缓存
        cache_key = f"detail:{hash(user_prompt)}"
        if cache_key in self.cache:
            logger.info("使用缓存的详情内容")
            return self.cache[cache_key]
        
        result = util.detail_handle(self.process_prompt(self.detail_sys_prompt, user_prompt))
        
        # 保存到缓存
        if result:
            self.cache[self._get_cache_key('detail', user_prompt)] = {
                'result': result,
                'timestamp': time.time()
            }
        
        return result

    def process_tags(self, user_prompt):
        """处理标签并推断分类"""
        logger.info(f"开始处理标签，输入内容: {user_prompt[:100]}...")
        
        # 检查是否包含 GPT/Prompt 相关关键词
        gpt_keywords = ['gpt', 'prompt', 'chatgpt', 'llm', 'system prompt']
        content_lower = user_prompt.lower()
        
        if any(keyword in content_lower for keyword in gpt_keywords):
            # 使用 Prompt 工程相关标签
            prompt = f"""
            Content to analyze: {user_prompt}
            
            You are a tag selector for GPT/Prompt related content.
            
            Available tags:
            prompt-collection, prompt-template, prompt-optimization, prompt-security,
            prompt-library, gpt-prompt, system-prompt, prompt-technique
            
            Rules:
            1. ONLY use tags from the provided list
            2. Return ONLY comma-separated tags, no other text
            3. Select 2-3 most relevant tags
            
            Example response: "prompt-collection,gpt-prompt,prompt-template"
            """
        else:
            # 使用常规标签
            prompt = self.tag_selector_sys_prompt.format(
                available_tags=', '.join(ALL_TAGS),
                content=user_prompt
            )
        
        result = self.process_prompt(
            prompt,
            user_prompt
        )
        
        if result:
            # 清理和验证标签
            result = result.strip().strip('"').strip("'")
            tags = [tag.strip() for tag in result.split(',')]
            # 移除空标签和无效格式
            tags = [tag for tag in tags if tag and not tag.startswith('-') and not tag.startswith('Based')]
            logger.info(f"LLM返回的原始标签: {tags}")
            valid_tags = [tag for tag in tags if tag in ALL_TAGS]
            logger.info(f"有效标签: {valid_tags}")
            
            # 使用CategorySystem进行智能分类
            primary_category = self.category_system.get_primary_category(valid_tags)
            logger.info(f"最终选择的主分类: {primary_category}")
            
            return {
                "tags": valid_tags,
                "category": primary_category
            }
        else:
            logger.info("未能获取有效标签，用默认分类: other")
            return {
                "tags": [],
                "category": "other"
            }

    def process_language(self, language, user_prompt):
        logger.info(f"正在处理多语言:{language}, user_prompt:{user_prompt}")
        # 如果language 包含 English字符，则直接返回
        if 'english'.lower() in language.lower():
            result = user_prompt
        else:
            result = self.process_prompt(self.language_sys_prompt.replace("{language}", language), user_prompt)
            if result and not user_prompt.startswith("#"):
                # 如果原始输入没有包含###开头的markdown标记，则去掉markdown标记
                result = result.replace("### ", "").replace("## ", "").replace("# ", "").replace("**", "")
        logger.info(f"多语言:{language}, 处理结果:{result}")
        return result

    def process_prompt(self, sys_prompt, user_prompt):
        if not sys_prompt or not user_prompt:
            return None

        logger.info("LLM正在处理")
        try:
            max_retries = 3
            retry_delay = 1
            last_error = None
            
            for attempt in range(max_retries):
                try:
                    # 准备消息
                    messages = [
                        {"role": "system", "content": sys_prompt},
                        {"role": "user", "content": user_prompt}
                    ]

                    if self.llm_service == 'groq':
                        chat_completion = self.client.chat.completions.create(
                            messages=messages,
                            model=self.config['groq']['model'],
                            temperature=0.2,
                        )
                    else:
                        chat_completion = self.client.chat.completions.create(
                            messages=messages,
                            model=self.config['openai']['model'],
                            temperature=0.2,
                        )

                    if chat_completion.choices[0] and chat_completion.choices[0].message:
                        logger.info(f"LLM完成处理，成功响应!")
                        return chat_completion.choices[0].message.content
                    
                    break  # 成功则跳出重试循环
                    
                except openai.RateLimitError as e:
                    last_error = e
                    if attempt < max_retries - 1:
                        wait_time = retry_delay * (2 ** attempt)
                        logger.warning(f"遇到限流，等待 {wait_time} 秒后重试 (尝试 {attempt + 1}/{max_retries})")
                        time.sleep(wait_time)
                        continue
                    logger.error(f"达到最大重试次数，限流错误: {str(e)}")
                    raise
                except Exception as e:
                    last_error = e
                    logger.error(f"LLM处理失败 (尝试 {attempt + 1}/{max_retries}): {str(e)}")
                    if attempt < max_retries - 1:
                        time.sleep(retry_delay)
                        continue
                    break
            
            if last_error:
                logger.error(f"所有重试都失败了，最后的错误: {str(last_error)}")
            return None

        except Exception as e:
            logger.error(f"LLM处理失败 - 服务: {self.llm_service}", exc_info=True)
            return None