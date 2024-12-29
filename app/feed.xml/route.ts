import { createClient } from "@/db/supabase/client";
import { BASE_URL } from "@/lib/env";

function escapeXml(unsafe: string | undefined | null): string {
  if (!unsafe) return "";
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case "\"": return "&quot;";
      default: return c;
    }
  });
}

export async function GET(request: Request) {
  const supabase = createClient();
  const { data: tools } = await supabase
    .from("web_navigation")
    .select("*")
    .order("collection_time", { ascending: false })
    .limit(100);

  const url = new URL(request.url);
  const locale = url.pathname.startsWith("/cn") ? "cn" : "en";

  const title = locale === "cn" 
    ? "AISecKit - AI 安全与渗透测试工具目录"
    : "AISecKit - AI Security and Penetration Testing Tools Directory";
    
  const description = locale === "cn"
    ? "发现最佳的 AI 安全和渗透测试工具。探索面向网络安全专业人士的教程、评论和顶级工具。"
    : "Discover the best AI security and penetration testing tools. Explore tutorials, reviews, and top-rated tools for cybersecurity professionals.";

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:media="http://search.yahoo.com/mrss/">
<channel>
  <title>${escapeXml(title)}</title>
  <link>${escapeXml(BASE_URL)}/${locale}</link>
  <description>${escapeXml(description)}</description>
  <language>${locale === "cn" ? "zh-CN" : "en"}</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <generator>AISecKit RSS Generator</generator>
  <docs>https://www.rssboard.org/rss-specification</docs>
  <atom:link href="${escapeXml(BASE_URL)}/${locale}/feed.xml" rel="self" type="application/rss+xml"/>
  <image>
    <url>${escapeXml(BASE_URL)}/images/aiseckit-logo.png</url>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(BASE_URL)}/${locale}</link>
  </image>
  ${tools?.map((tool) => `
    <item>
      <title><![CDATA[${escapeXml(tool.title)}]]></title>
      <link>${escapeXml(BASE_URL)}/${locale}/ai/${escapeXml(tool.name)}</link>
      <guid isPermaLink="true">${escapeXml(BASE_URL)}/${locale}/ai/${escapeXml(tool.name)}</guid>
      <description><![CDATA[${escapeXml(tool.content)}]]></description>
      <content:encoded><![CDATA[${escapeXml(tool.detail || tool.content)}]]></content:encoded>
      <dc:creator>AISecKit</dc:creator>
      <pubDate>${new Date(tool.collection_time).toUTCString()}</pubDate>
      ${tool.category_name ? `<category>${escapeXml(tool.category_name)}</category>` : ""}
      ${tool.tag_name ? `<category>${escapeXml(tool.tag_name)}</category>` : ""}
      ${tool.image_url ? `
      <media:content 
        url="${escapeXml(tool.image_url)}"
        medium="image"
        type="image/jpeg"
      />` : ""}
      ${tool.thumbnail_url ? `
      <media:thumbnail 
        url="${escapeXml(tool.thumbnail_url)}"
      />` : ""}
    </item>
  `).join("")}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
} 