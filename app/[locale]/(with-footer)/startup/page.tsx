/*
 * @Author: taielab 52345183+taielab@users.noreply.github.com
 * @Date: 2024-12-19 15:51:34
 * @LastEditors: taielab 52345183+taielab@users.noreply.github.com
 * @LastEditTime: 2024-12-21 16:47:14
 * @FilePath: /AISafeNavigator/app/[locale]/(with-footer)/startup/page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import React from "react";
import { useTranslations } from "next-intl";

import { formatTime } from "@/lib/utils/timeUtils";
import Faq from "@/components/Faq";

import DesktopTable from "./DesktopTable";
import MobileTable from "./MobileTable";

export default function Page() {
  const t = useTranslations("Startup");

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center py-12 lg:py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-5xl">
            {t("title")}
          </h1>
          <div className="mt-3 space-y-1">
            <p className="text-base text-gray-600 lg:text-lg">
              {t("subTitle")}
            </p>
            <p className="text-base text-gray-600 lg:text-lg">
              {t("updateTime")} {formatTime(new Date().setDate(new Date().getDate() - 1), "YYYY-MM-DD")}
            </p>
          </div>
        </div>
      </div>
      <DesktopTable />
      <MobileTable />
      <Faq />
    </div>
  );
}
