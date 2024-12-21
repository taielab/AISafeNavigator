import { createClient } from "@/db/supabase/client";

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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const url = new URL(request.url);
  const locale = url.pathname.startsWith("/cn") ? "cn" : "en";

  const title = locale === "cn" 
    ? "AISecKit - AI 安全与渗透测试工具目录"
    : "AISecKit - AI Security and Penetration Testing Tools Directory";
    
  const description = locale === "cn"
    ? "发现最佳的 AI 安全和渗透测试工具。探索面向网络安全专业人士的教程、评论和顶级工具。"
    : "Discover the best AI security and penetration testing tools. Explore tutorials, reviews, and top-rated tools for cybersecurity professionals.";

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(title)}</title>
  <link>${escapeXml(baseUrl)}/${locale}</link>
  <description>${escapeXml(description)}</description>
  <language>${locale === "cn" ? "zh-CN" : "en"}</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${escapeXml(baseUrl)}/${locale}/feed.xml" rel="self" type="application/rss+xml"/>
  ${tools?.map((tool) => `
    <item>
      <title><![CDATA[${escapeXml(tool.title)}]]></title>
      <link>${escapeXml(baseUrl)}/${locale}/ai/${escapeXml(tool.name)}</link>
      <guid isPermaLink="true">${escapeXml(baseUrl)}/${locale}/ai/${escapeXml(tool.name)}</guid>
      <description><![CDATA[${escapeXml(tool.content)}]]></description>
      <pubDate>${new Date(tool.collection_time).toUTCString()}</pubDate>
      ${tool.category_name ? `<category>${escapeXml(tool.category_name)}</category>` : ""}
      ${tool.tag_name ? `<category>${escapeXml(tool.tag_name)}</category>` : ""}
    </item>
  `).join("")}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
} 