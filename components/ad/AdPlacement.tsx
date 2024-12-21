"use client";

import React from "react";
import Script from "next/script";

interface AdPlacementProps {
  className?: string;
}

const AdPlacement: React.FC<AdPlacementProps> = ({ className }) => {
  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_URL}
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      <div className={className}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-4887666022411265"
          data-ad-slot="auto"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </>
  );
};

export default AdPlacement; 