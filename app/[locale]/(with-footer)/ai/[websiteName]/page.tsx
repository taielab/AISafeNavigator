import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CircleArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { cn } from "@/lib/utils";
import { createClient } from "@/db/supabase/client";
import { generateMetadata as generateSeoMetadata, generateToolStructuredData } from "@/lib/utils/seo";
import { Separator } from "@/components/ui/separator";
import BaseImage from "@/components/image/BaseImage";
import MarkdownProse from "@/components/MarkdownProse";
import AdPlacement from "@/components/ad/AdPlacement";
import StructuredData from "@/components/seo/StructuredData";
import TagItem from "@/app/[locale]/(with-footer)/startup/TagItem";
import ShareButtons from "@/components/share/ShareButtons";

export async function generateMetadata({ params: { locale, websiteName } }: { params: { locale: string; websiteName: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "Metadata.ai",
  });

  const supabase = createClient();
  const { data: website } = await supabase
    .from("web_navigation")
    .select("title, content")
    .eq("name", websiteName)
    .single();

  if (!website) {
    return {
      title: t("title"),
    };
  }

  return generateSeoMetadata({
    title: `${website.title} - ${t("title")}`,
    description: website.content,
    keywords: [website.title],
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/ai/${websiteName}`,
    type: "article",
    locale,
  });
}

export default async function Page({ params: { locale, websiteName } }: { params: { locale: string; websiteName: string } }) {
  const t = await getTranslations({
    locale,
    namespace: "Startup.detail",
  });

  const supabase = createClient();
  const { data: website } = await supabase
    .from("web_navigation")
    .select("*")
    .eq("name", websiteName)
    .single();

  if (!website) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aiseckit.com";
  const shareUrl = `${baseUrl}/ai/${websiteName}`;
  
  const structuredData = generateToolStructuredData({
    title: website.title,
    description: website.content,
    url: shareUrl,
    image: website.thumbnail_url,
    category: website.category_name,
    rating: website.star_rating,
  });

  return (
    <div className="w-full">
      <StructuredData data={structuredData} />
      <div className="flex flex-col gap-8 px-6 py-12 lg:flex-row lg:items-start lg:justify-between lg:px-0 lg:py-16">
        <div className="flex flex-1 flex-col items-center lg:items-start">
          <div className="space-y-4 text-balance">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 lg:text-4xl">
              {website.title}
            </h1>
            <p className="text-base text-gray-600 lg:text-lg">
              {website.content}
            </p>
            {website.tag_name && <TagItem name={website.tag_name} />}
          </div>
          <div className="mt-10 w-full lg:mt-8">
            <a
              href={website.url}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "group inline-flex w-full items-center justify-center gap-2 lg:w-auto",
                "rounded-lg bg-primary px-6 py-2.5",
                "text-sm font-medium text-white",
                "transition-all duration-300 ease-in-out",
                "hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20",
                "hover:translate-y-[-2px]",
                "active:translate-y-[0px]",
                "focus:outline-none focus:ring-2 focus:ring-primary/20"
              )}
            >
              {t("visitWebsite")}
              <CircleArrowRight className={cn(
                "size-4 transition-transform duration-300 ease-in-out",
                "group-hover:translate-x-0.5"
              )} />
            </a>
          </div>
          <ShareButtons
            url={shareUrl}
            title={website.title}
            description={website.content}
            image={website.thumbnail_url}
            className="mt-6"
          />
        </div>
        <div className="w-full lg:w-[466px]">
          <a
            href={website.url}
            target="_blank"
            rel="noreferrer"
            className="group relative block aspect-[466/234] w-full"
          >
            <BaseImage
              title={website.title}
              alt={website.title}
              fill
              src={website.thumbnail_url || ""}
              className="rounded-xl border border-gray-200 bg-gray-100 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className={cn(
              "absolute inset-0 flex items-center justify-center gap-2",
              "rounded-xl bg-gray-900/60 text-lg font-medium text-white opacity-0",
              "transition-opacity duration-200 group-hover:opacity-100"
            )}>
              {t("visitWebsite")} <CircleArrowRight className="size-5" />
            </div>
          </a>
        </div>
      </div>
      <AdPlacement className="mx-6 mb-8 lg:mx-0" />
      <Separator className="bg-gray-100" />
      <div className="px-6 py-12 lg:px-0 lg:py-16">
        <h2 className="mb-8 text-2xl font-semibold text-gray-900">
          {t("introduction")}
        </h2>
        <MarkdownProse markdown={website?.detail || ""} />
        <AdPlacement className="mt-12" />
      </div>
    </div>
  );
}
