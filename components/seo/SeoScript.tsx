/*
 * @Author: taielab 52345183+taielab@users.noreply.github.com
 * @Date: 2024-12-19 15:51:34
 * @LastEditors: taielab 52345183+taielab@users.noreply.github.com
 * @LastEditTime: 2024-12-21 16:52:06
 * @FilePath: /AISafeNavigator/components/seo/SeoScript.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
"use client";

import React from "react";
import Script from "next/script";

interface SeoScriptProps {
  googleTrackingId?: string;
  onAnalyticsLoad?: () => void;
}

const SeoScript = React.memo(({ 
  googleTrackingId,
  onAnalyticsLoad,
}: SeoScriptProps) => {
  return (
    <>
      {/* Google Analytics */}
      {googleTrackingId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleTrackingId}`}
            strategy="afterInteractive"
            onLoad={onAnalyticsLoad}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleTrackingId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
    </>
  );
});

SeoScript.displayName = "SeoScript";

export default SeoScript;
