import { useTranslations } from "next-intl";
import AdPlacement from "@/components/ad/AdPlacement";

export default function Page() {
  const t = useTranslations("FooterNavigation.privacyPolicy");

  return (
    <div className="prose prose-gray mx-auto max-w-4xl p-6">
      <h1 className="text-gray-900">{t("1-h1")}</h1>
      <p className="text-gray-600">{t("1-p")}</p>

      <AdPlacement className="my-8" />

      <h2 className="text-gray-900">{t("2-h2")}</h2>
      <p className="text-gray-600">{t("2-p")}</p>

      <h2 className="text-gray-900">{t("3-h2")}</h2>
      <p className="text-gray-600">{t("3-p")}</p>

      <AdPlacement className="my-8" />

      <h2 className="text-gray-900">{t("4-h2")}</h2>
      <p className="text-gray-600">{t("4-p")}</p>

      <h2 className="text-gray-900">{t("5-h2")}</h2>
      <p className="text-gray-600">{t("5-p-1")}</p>
      <ul className="text-gray-600">
        <li>{t("5-li-1")}</li>
        <li>{t("5-li-2")}</li>
        <li>{t("5-li-3")}</li>
        <li>{t("5-li-4")}</li>
      </ul>
      <p className="text-gray-600">{t("5-p-2")}</p>

      <AdPlacement className="my-8" />

      <h2 className="text-gray-900">{t("6-h2")}</h2>
      <p className="text-gray-600">{t("6-p")}</p>

      <h2 className="text-gray-900">{t("7-h2")}</h2>
      <p className="text-gray-600">{t("7-p")}</p>

      <h2 className="text-gray-900">{t("8-h2")}</h2>
      <p className="text-gray-600">{t("8-p")}</p>

      <AdPlacement className="mt-8" />
    </div>
  );
}
