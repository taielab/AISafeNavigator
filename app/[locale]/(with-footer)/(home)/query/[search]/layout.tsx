import { getTranslations } from "next-intl/server";

import SearchForm from "@/components/home/SearchForm";

export default async function Layout({ children, params }: { children: React.ReactNode; params: { search?: string } }) {
  const t = await getTranslations("Home");

  return (
    <div className="relative mx-auto w-full max-w-pc px-3 lg:px-0">
      <div className="flex flex-col items-center py-12 lg:py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-base text-gray-600 lg:text-lg">
            {t("subTitle")}
          </p>
        </div>
        <div className="mt-10 w-full max-w-2xl lg:mt-12">
          <SearchForm defaultSearch={decodeURI(params?.search || "")} />
        </div>
      </div>
      {children}
    </div>
  );
}
