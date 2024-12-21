/*
 * @Author: taielab 52345183+taielab@users.noreply.github.com
 * @Date: 2024-12-19 08:50:40
 * @LastEditors: taielab 52345183+taielab@users.noreply.github.com
 * @LastEditTime: 2024-12-21 16:53:05
 * @FilePath: /AISafeNavigator/app/[locale]/layout.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { NextIntlClientProvider, useMessages } from "next-intl";

import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/home/Navigation";

import "./globals.css";

import { Suspense } from "react";

import SeoScript from "@/components/seo/SeoScript";
import AdPlacement from "@/components/ad/AdPlacement";
import PerformanceMonitor from "@/components/monitoring/PerformanceMonitor";

import Loading from "./loading";

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="dark">
      <body className="relative mx-auto flex min-h-screen flex-col bg-tap4-black text-white">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                error: "bg-red-400",
                success: "text-green-400",
                warning: "text-yellow-400",
                info: "bg-blue-400",
              },
            }}
          />
          <Navigation />
          <AdPlacement className="mt-4 mb-4" />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <PerformanceMonitor />
        </NextIntlClientProvider>
        <SeoScript googleTrackingId={process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID} />
      </body>
    </html>
  );
}
