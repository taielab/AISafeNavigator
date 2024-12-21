/*
 * @Author: taielab 52345183+taielab@users.noreply.github.com
 * @Date: 2024-12-19 15:51:34
 * @LastEditors: taielab 52345183+taielab@users.noreply.github.com
 * @LastEditTime: 2024-12-20 22:19:48
 * @FilePath: /AISafeNavigator/app/[locale]/(with-footer)/(home)/query/[search]/page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { Suspense } from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { createClient } from "@/db/supabase/client";
import { getTranslations } from "next-intl/server";

import { RevalidateOneHour } from "@/lib/constants";
import { generateMetadata as generateSeoMetadata, generateSearchStructuredData } from "@/lib/utils/seo";
import { Separator } from "@/components/ui/separator";
import Empty from "@/components/Empty";
import Faq from "@/components/Faq";
import WebNavCardList from "@/components/webNav/WebNavCardList";
import AdPlacement from "@/components/ad/AdPlacement";
import StructuredData from "@/components/seo/StructuredData";

import { TagList } from "../../Tag";
import Loading from "./loading";

const ScrollToTop = dynamic(() => import("@/components/page/ScrollToTop"), { ssr: false });

export async function generateMetadata({ 
  params: { locale, search } 
}: { 
  params: { locale: string; search: string } 
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "Metadata.search",
  });

  const decodedSearch = decodeURI(search);

  return generateSeoMetadata({
    title: t("title", { query: decodedSearch }),
    description: t("description", { query: decodedSearch }),
    keywords: [decodedSearch, t("keywords")],
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/query/${search}`,
    type: "website",
    locale,
  });
}

export const revalidate = RevalidateOneHour / 2;

export default async function Page({ params }: { params: { search?: string } }) {
  const supabase = createClient();
  const t = await getTranslations("Home");
  const { data: categoryList } = await supabase.from("navigation_category").select();
  
  const searchQuery = decodeURI(params?.search || "").trim();
  const { data: dataList } = await supabase
    .from("web_navigation")
    .select()
    .or(`title.ilike.%${searchQuery}%,detail.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,tag_name.ilike.%${searchQuery}%`)
    .order("collection_time", { ascending: false });

  const structuredData = generateSearchStructuredData({
    query: searchQuery,
    url: process.env.NEXT_PUBLIC_SITE_URL as string,
  });

  return (
    <Suspense fallback={<Loading />}>
      <StructuredData data={structuredData} />

      <AdPlacement className="mb-8" />

      <section className="flex flex-col gap-5">
        {dataList && !!dataList.length && params?.search ? (
          <>
            <h2 className="mb-1 text-2xl font-semibold text-gray-900 lg:text-3xl">
              {t("result")}
            </h2>
            <WebNavCardList dataList={dataList!} />
          </>
        ) : (
          <Empty title={t("empty")} />
        )}
      </section>

      <AdPlacement className="my-10 lg:my-16" />
      
      <Separator className="mx-auto my-10 h-px w-4/5 bg-gray-100 lg:my-16" />
      <Faq />

      <AdPlacement className="mt-10 lg:mt-16" />
      
      <ScrollToTop />
    </Suspense>
  );
}
