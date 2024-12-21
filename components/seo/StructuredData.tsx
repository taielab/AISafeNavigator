"use client";

import React from "react";
import Script from "next/script";

interface StructuredDataProps {
  data: Record<string, any>;
}

const StructuredData = React.memo(({ data }: StructuredDataProps) => {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
    />
  );
});

StructuredData.displayName = "StructuredData";

export default StructuredData; 