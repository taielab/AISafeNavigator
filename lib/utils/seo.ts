import { Metadata } from "next";

export type OpenGraphType = "website" | "article" | "book" | "profile";
export type SchemaType = 
  | "WebSite" 
  | "SoftwareApplication" 
  | "BreadcrumbList" 
  | "SearchAction" 
  | "Organization"
  | "FAQPage"
  | "Question"
  | "Answer";
export type ImageType = "image/jpeg" | "image/png" | "image/webp" | "image/gif";
export type PriceType = "Free" | "Freemium" | "Paid";

export interface ImageMetaData {
  url: string;
  width: number;
  height: number;
  alt: string;
  type: ImageType;
}

export interface MetaData {
  title: string;
  description?: string;
  keywords?: string | string[];
  image?: string | ImageMetaData;
  type?: OpenGraphType;
  siteName?: string;
  locale?: string;
  url?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
}

export interface StructuredData {
  "@context": "https://schema.org";
  "@type": SchemaType;
  name?: string;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  [key: string]: any;
}

export type SupportedLocale = 
  | "en"
  | "cn"
  | "tw"
  | "ru"
  | "pt"
  | "jp"
  | "fr"
  | "de"
  | "es";

interface BaseConfig {
  baseUrl: string;
  defaultImage: string;
  defaultDescription: string;
  siteName: string;
  twitterHandle: string;
  shareHashtags: string[];
  locale: string;
  supportedLocales: Record<SupportedLocale, string>;
}

// 缓存基础配置
let baseConfigCache: BaseConfig | null = null;

const getBaseConfig = (): BaseConfig => {
  if (baseConfigCache) return baseConfigCache;

  baseConfigCache = {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL as string,
    defaultImage: process.env.NEXT_PUBLIC_DEFAULT_OG_IMAGE || "/images/og-image.jpg",
    defaultDescription: process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION || "发现最佳的 AI 安全和渗透测试工具。探索面向网络安全专业人士的教程、评论和顶级工具。",
    siteName: process.env.NEXT_PUBLIC_APP_NAME || "AISafeNavigator",
    twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "AISafeNavigator",
    shareHashtags: process.env.NEXT_PUBLIC_SHARE_HASHTAGS?.split(",") || ["AI", "Tools", "Security", "Pentesting"],
    locale: "en",
    supportedLocales: {
      "en": "/en",
      "cn": "/cn",
      "tw": "/tw",
      "ru": "/ru",
      "pt": "/pt",
      "jp": "/jp",
      "fr": "/fr",
      "de": "/de",
      "es": "/es",
    },
  };

  return baseConfigCache;
};

// 清理缓存配置，用于测试或配置更新时
export const clearBaseConfigCache = () => {
  baseConfigCache = null;
};

const getFullUrl = (url: string | undefined, baseUrl: string): string => {
  if (!url) return baseUrl;
  return url.startsWith("http") ? url : `${baseUrl}${url}`;
};

const getImageMetaData = (image: string | ImageMetaData | undefined, config: BaseConfig): ImageMetaData => {
  if (!image) {
    return {
      url: `${config.baseUrl}${config.defaultImage}`,
      width: 1200,
      height: 630,
      alt: config.siteName,
      type: "image/jpeg",
    };
  }

  if (typeof image === "string") {
    return {
      url: getFullUrl(image, config.baseUrl),
      width: 1200,
      height: 630,
      alt: config.siteName,
      type: image.endsWith(".png") ? "image/png" : "image/jpeg",
    };
  }

  return {
    ...image,
    url: getFullUrl(image.url, config.baseUrl),
    alt: image.alt || config.siteName,
    width: image.width || 1200,
    height: image.height || 630,
    type: image.type || (image.url.endsWith(".png") ? "image/png" : "image/jpeg"),
  };
};

export function generateMetadata(data: MetaData): Metadata {
  const config = getBaseConfig();
  const fullUrl = getFullUrl(data.url, config.baseUrl);
  const imageData = getImageMetaData(data.image, config);

  const metadata: Metadata = {
    title: data.title,
    description: data.description || config.defaultDescription,
    keywords: data.keywords || config.shareHashtags,
    authors: data.authors?.map(author => ({ name: author })),
    metadataBase: new URL(config.baseUrl),
    alternates: {
      canonical: fullUrl,
      languages: config.supportedLocales,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: data.title,
      description: data.description || config.defaultDescription,
      images: [imageData],
      siteName: data.siteName || config.siteName,
      locale: data.locale || config.locale,
      type: data.type || "website",
      url: fullUrl,
      ...(data.publishedTime && { publishedTime: data.publishedTime }),
      ...(data.modifiedTime && { modifiedTime: data.modifiedTime }),
      ...(data.section && { section: data.section }),
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description || config.defaultDescription,
      images: [imageData.url],
      creator: `@${config.twitterHandle}`,
      site: `@${config.twitterHandle}`,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
      other: {
        bing: [process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || ""],
        baidu: [process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION || ""],
      },
    },
    category: data.section,
    classification: data.keywords?.toString(),
  };

  return metadata;
}

export function generateSearchStructuredData({ 
  query = "", 
  url = process.env.NEXT_PUBLIC_SITE_URL as string,
  searchPath = "/query"
}: { 
  query?: string; 
  url?: string;
  searchPath?: string;
}): StructuredData {
  const config = getBaseConfig();
  const fullUrl = getFullUrl(url, config.baseUrl);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.siteName,
    description: config.defaultDescription,
    url: fullUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${fullUrl}${searchPath}/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
  image?: string | ImageMetaData;
}

export function generateBreadcrumbStructuredData(items: BreadcrumbItem[]): StructuredData {
  const config = getBaseConfig();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: config.siteName,
    description: config.defaultDescription,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getFullUrl(item.url, config.baseUrl),
      ...(item.image && { image: getImageMetaData(item.image, config).url }),
    })),
  };
}

export interface ToolMetaData extends MetaData {
  category?: string;
  operatingSystem?: string;
  price?: string;
  priceCurrency?: string;
  priceType?: PriceType;
  applicationSubCategory?: string;
  downloadUrl?: string;
  requirements?: string;
  releaseNotes?: string;
  softwareVersion?: string;
  rating?: number;
  reviewCount?: number;
}

export function generateToolStructuredData(data: ToolMetaData): StructuredData {
  const config = getBaseConfig();
  const fullUrl = getFullUrl(data.url, config.baseUrl);
  const imageData = getImageMetaData(data.image, config);

  // 处理价格信息
  const getOffers = () => {
    const offer = {
      "@type": "Offer" as const,
      price: data.price || "0",
      priceCurrency: data.priceCurrency || "USD",
    };

    if (data.priceType) {
      switch (data.priceType) {
        case "Free":
          return { ...offer, price: "0", availability: "https://schema.org/InStock" };
        case "Freemium":
          return { ...offer, price: "0", availability: "https://schema.org/InStock", description: "Free plan available" };
        case "Paid":
          return { ...offer, availability: "https://schema.org/InStock" };
      }
    }

    return offer;
  };

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    title: data.title,
    name: data.title,
    description: data.description || config.defaultDescription,
    image: imageData.url,
    url: fullUrl,
    applicationCategory: data.category || "Security",
    operatingSystem: data.operatingSystem || "Web",
    offers: getOffers(),
    ...(data.applicationSubCategory && { applicationSubCategory: data.applicationSubCategory }),
    ...(data.downloadUrl && { downloadUrl: getFullUrl(data.downloadUrl, config.baseUrl) }),
    ...(data.requirements && { requirements: data.requirements }),
    ...(data.releaseNotes && { releaseNotes: data.releaseNotes }),
    ...(data.softwareVersion && { softwareVersion: data.softwareVersion }),
    ...(data.rating && { aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: data.rating,
      bestRating: 5,
      worstRating: 1,
      reviewCount: data.reviewCount || 1,
    }}),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function generateFaqStructuredData(items: FaqItem[]): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
} 