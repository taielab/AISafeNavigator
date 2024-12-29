import { createClient } from "@/db/supabase/client";
import { locales } from "@/i18n";
import { BASE_URL } from "@/lib/env";

export async function GET() {
  const supabase = createClient();

  // 获取所有 AI 工具数据
  const { data: tools } = await supabase
    .from("web_navigation")
    .select("name, collection_time")
    .order("collection_time", { ascending: false });

  // 获取所有分类
  const { data: categories } = await supabase
    .from("navigation_category")
    .select("name, create_time");

  // 基础路由
  const staticRoutes = [
    {
      url: "",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "explore",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "submit",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "startup",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // 生成所有语言版本的静态路由
  const staticUrlSet = staticRoutes.flatMap((route) =>
    locales.map((locale) => {
      const lang = locale === "en" ? "" : `/${locale}`;
      const routeUrl = route.url === "" ? "" : `/${route.url}`;
      return `
        <url>
          <loc>${BASE_URL}${lang}${routeUrl}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>${route.changeFrequency}</changefreq>
          <priority>${route.priority}</priority>
        </url>`;
    }),
  );

  // 生成工具详情页的 URL
  const toolUrlSet = tools?.flatMap((tool) =>
    locales.map((locale) => {
      const lang = locale === "en" ? "" : `/${locale}`;
      return `
        <url>
          <loc>${BASE_URL}${lang}/ai/${tool.name}</loc>
          <lastmod>${new Date(tool.collection_time).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`;
    }),
  ) || [];

  // 生成分类页的 URL
  const categoryUrlSet = categories?.flatMap((category) =>
    locales.map((locale) => {
      const lang = locale === "en" ? "" : `/${locale}`;
      return `
        <url>
          <loc>${BASE_URL}${lang}/category/${category.name}</loc>
          <lastmod>${new Date(category.create_time).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.9</priority>
        </url>`;
    }),
  ) || [];

  // 组合所有 URL 并生成 sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrlSet.join("")}
      ${toolUrlSet.join("")}
      ${categoryUrlSet.join("")}
    </urlset>`;

  // 返回 XML 格式的 sitemap
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
} 