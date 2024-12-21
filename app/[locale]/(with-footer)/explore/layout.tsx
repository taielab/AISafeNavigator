import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import Faq from "@/components/Faq";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "Metadata.explore",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Explore");

  return (
    <div className="mx-auto w-full max-w-pc px-3">
      <div className="flex flex-col items-center py-12 lg:py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-base text-gray-600 lg:text-lg">
            {t("subTitle")}
          </p>
        </div>
      </div>
      {children}
      <Faq />
    </div>
  );
}
