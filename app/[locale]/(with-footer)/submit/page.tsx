import React from "react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import Faq from "@/components/Faq";
import AdPlacement from "@/components/ad/AdPlacement";

import SubmitForm from "./SubmitForm";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "Metadata.submit",
  });

  return {
    title: t("title"),
  };
}

export default function Page() {
  const t = useTranslations("Submit");

  return (
    <div className="mx-auto max-w-pc">
      <div className="flex flex-col items-center py-12 lg:py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-base text-gray-600 lg:text-lg">
            {t("subTitle")}
          </p>
        </div>

        <AdPlacement className="mt-8 mb-10 w-full max-w-2xl lg:mt-10 lg:mb-12" />

        <div className="mt-10 w-full max-w-md lg:mt-12">
          <SubmitForm className="mx-auto" />
        </div>
      </div>

      <AdPlacement className="mb-16 lg:mb-24" />

      <div className="mt-16 lg:mt-24">
        <Faq />
      </div>

      <AdPlacement className="mt-16 lg:mt-24" />
    </div>
  );
}
