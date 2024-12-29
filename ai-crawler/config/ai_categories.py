# AI工具分类定义
CATEGORIES = {
    "image": {
        "name": "image",
        "title": "Image AI",
        "tags": ["image-generation", "image-editing", "text-to-image", "image-to-text", "style-transfer"]
    },
    "text": {
        "name": "text",
        "title": "Text AI",
        "tags": ["text-writing", "translation", "summarization", "code-generation"]
    },
    "audio": {
        "name": "audio",
        "title": "Audio AI",
        "tags": ["text-to-speech", "speech-to-text", "music-generation", "voice-cloning"]
    },
    "video": {
        "name": "video", 
        "title": "Video AI",
        "tags": ["video-generation", "video-editing", "animation"]
    },
    "chat": {
        "name": "chat",
        "title": "Chat AI",
        "tags": ["chatbot", "customer-service", "virtual-assistant"]
    },
    "productivity": {
        "name": "productivity",
        "title": "Productivity AI",
        "tags": ["automation", "workflow", "project-management", "note-taking"]
    },
    "security": {
        "name": "security",
        "title": "AI Security",
        "tags": [
            "vulnerability-detection",    # 漏洞检测
            "threat-detection",          # 威胁检测
            "malware-analysis",          # 恶意软件分析
            "code-security",             # 代码安全
            "pentest",                   # 渗透测试
            "security-monitoring",        # 安全监控
            "incident-response",         # 事件响应
            "deception-detection",       # 欺骗检测
            "privacy-protection"         # 隐私保护
        ]
    },
    "security-defense": {
        "name": "security-defense",
        "title": "AI Defense",
        "tags": [
            "vulnerability-detection",     # 漏洞检测
            "threat-detection",           # 威胁检测
            "malware-analysis",           # 恶意软件分析
            "security-monitoring",         # 安全监控
            "incident-response",          # 事件响应
            "security-hardening",         # 安全加固
            "attack-prevention",          # 攻击防御
            "zero-day-protection"         # 零日防护
        ]
    },
    "security-offensive": {
        "name": "security-offensive",
        "title": "AI Offensive",
        "tags": [
            "pentest",                    # 渗透测试
            "red-teaming",                # 红队评估
            "exploit-development",        # 漏洞利用开发
            "attack-simulation",          # 攻击模拟
            "vulnerability-research",      # 漏洞研究
            "bug-bounty",                 # 漏洞赏金
            "security-assessment",        # 安全评估
            "reverse-engineering",        # 逆向工程
            "security-assessment",        # 安全评估
            "vulnerability-research"      # 漏洞研究
        ]
    },
    "security-privacy": {
        "name": "security-privacy",
        "title": "AI Privacy",
        "tags": [
            "privacy-protection",         # 隐私保护
            "data-encryption",            # 数据加密
            "anonymization",              # 数据匿名化
            "secure-computation",         # 安全计算
            "data-masking",              # 数据脱敏
            "privacy-compliance"          # 隐私合规
        ]
    },
    "security-code": {
        "name": "security-code",
        "title": "Code Security",
        "tags": [
            "code-security",              # 代码安全
            "secure-coding",              # 安全编码
            "code-review",                # 代码审计
            "dependency-scanning",        # 依赖扫描
            "sast",                       # 静态分析
            "dast",                       # 动态分析
            "iast"                        # 交互式分析
        ]
    },
    "security-deception": {
        "name": "security-deception",
        "title": "Deception Security",
        "tags": [
            "deception-detection",        # 欺骗检测
            "deepfake-detection",         # 深伪检测
            "phishing-detection",         # 钓鱼检测
            "fraud-detection",            # 欺诈检测
            "social-engineering",         # 社会工程学
            "honeypot"                    # 蜜罐技术
        ]
    },
    "security-intelligence": {
        "name": "security-intelligence",
        "title": "Security Intelligence",
        "tags": [
            "threat-intelligence",        # 威胁情报
            "osint",                      # 开源情报
            "dark-web-monitoring",        # 暗网监控
            "apt-detection",              # APT检测
            "attribution-analysis",       # 归因分析
            "intel-sharing"               # 情报共享
        ]
    },
    "data-science": {
        "name": "data-science",
        "title": "Data Science",
        "tags": [
            "data-analysis",            # 数据分析
            "data-visualization",       # 数据可视化
            "machine-learning",         # 机器学习
            "predictive-analytics",     # 预测分析
            "statistical-analysis",     # 统计分析
            "data-mining"              # 数据挖掘
        ]
    },
    "research": {
        "name": "research",
        "title": "Research AI",
        "tags": [
            "paper-research",           # 论文研究
            "literature-review",        # 文献综述
            "academic-writing",         # 学术写作
            "citation-analysis",        # 引文分析
            "research-assistant",       # 研究助手
            "experiment-design"         # 实验设计
        ]
    },
    "business": {
        "name": "business",
        "title": "Business AI",
        "tags": [
            "market-analysis",          # 市场分析
            "financial-analysis",       # 金融分析
            "business-intelligence",    # 商业智能
            "customer-analytics",       # 客户分析
            "sales-prediction",         # 销售预测
            "risk-assessment"          # 风险评估
        ]
    },
    "healthcare": {
        "name": "healthcare",
        "title": "Healthcare AI",
        "tags": [
            "medical-diagnosis",        # 医疗诊断
            "health-monitoring",        # 健康监测
            "drug-discovery",           # 药物发现
            "medical-imaging",          # 医学影像
            "patient-care",             # 患者护理
            "clinical-trials"           # 临床试验
        ]
    },
    "education": {
        "name": "education",
        "title": "Education AI",
        "tags": [
            "learning-assistant",       # 学习助手
            "course-generation",        # 课程生成
            "knowledge-testing",        # 知识测试
            "personalized-learning",    # 个性化学习
            "educational-content",      # 教育内容
            "student-assessment"        # 学生评估
        ]
    },
    "developer": {
        "name": "developer",
        "title": "Developer AI",
        "tags": [
            "code-generation",          # 代码生成
            "code-completion",          # 代码补全
            "debugging-assistant",      # 调试助手
            "api-development",          # API开发
            "testing-automation",       # 测试自动化
            "documentation",            # 文档生成
            "code-explanation"          # 代码解释
        ]
    },
    "design": {
        "name": "design",
        "title": "Design AI",
        "tags": [
            "ui-design",                # UI设计
            "ux-design",                # UX设计
            "graphic-design",           # 平面设计
            "3d-modeling",              # 3D建模
            "prototyping",              # 原型设计
            "design-generation"         # 设计生成
        ]
    },
    "marketing": {
        "name": "marketing",
        "title": "Marketing AI",
        "tags": [
            "content-creation",         # 内容创作
            "seo-optimization",         # SEO优化
            "social-media",             # 社交媒体
            "email-marketing",          # 邮件营销
            "ad-generation",            # 广告生成
            "marketing-analytics"       # 营销分析
        ]
    },
    "prompt-engineering": {
        "name": "prompt-engineering",
        "title": "Prompt Engineering",
        "tags": [
            "prompt-collection",      # 提示词集合
            "prompt-template",        # 提示词模板
            "prompt-optimization",    # 提示词优化
            "prompt-security",        # 提示词安全
            "prompt-injection",       # 提示词注入
            "prompt-library",         # 提示词库
            "gpt-prompt",            # GPT提示词
            "system-prompt",          # 系统提示词
            "prompt-technique"        # 提示词技术
        ]
    }
}

# 标签到分类的映射
TAG_TO_CATEGORY = {
    tag: category["name"]
    for category in CATEGORIES.values()
    for tag in category["tags"]
}

# 所有可用标签列表
ALL_TAGS = list(TAG_TO_CATEGORY.keys()) 

class CategorySystem:
    def __init__(self):
        self.categories = CATEGORIES
        self.tag_to_category = TAG_TO_CATEGORY
        self.priority_map = {
            # Prompt工程优先级
            "prompt-engineering": 95,     # Prompt工程最高优先级
            # 安全类优先级
            "security-offensive": 100,    # 攻击性安全工具最高优先级
            "security-defense": 90,       # 防御性安全工具次优先级
            "security-privacy": 80,       # 隐私安全工具
            "security-code": 75,          # 代码安全工具
            "security": 70,               # 通用安全工具
            
            # AI/ML类优先级
            "data-science": 60,           # 数据科学工具
            "research": 55,               # 研究工具
            
            # 开发类优先级
            "developer": 50,              # 开发工具
            "productivity": 45,           # 生产力工具
            
            # 内容生成类优先级
            "text": 40,                   # 文本处理
            "image": 35,                  # 图像处理
            "video": 30,                  # 视频处理
            "audio": 25,                  # 音频处理
            
            # 应用领域类优先级
            "business": 20,               # 商业应用
            "healthcare": 15,             # 医疗健康
            "education": 10,              # 教育应用
            
            # 其他类别
            "chat": 5,                    # 聊天工具
            "other": 0                    # 未分类
        }
    
    def get_primary_category(self, tags):
        """智能分类选择"""
        categories = set(self.tag_to_category[tag] for tag in tags if tag in self.tag_to_category)
        if not categories:
            return "other"
            
        # 按优先级排序
        return max(categories, key=lambda x: self.priority_map.get(x, 0))