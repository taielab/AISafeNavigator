"use client";

import React, { useState, useCallback } from "react";
import Image, { ImageProps } from "next/image";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

interface BaseImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  onError?: (error: Error) => void;
  lowQualitySrc?: string;
}

const BaseImage = React.memo(({
  src,
  alt,
  className,
  fallbackSrc = "/images/fallback.png",
  onError,
  lowQualitySrc,
  ...props
}: BaseImageProps) => {
  const t = useTranslations("Common");
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(!src);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    if (src) {
      setImgSrc(src);
      setHasError(false);
      setIsLoading(true);
    } else {
      setImgSrc(fallbackSrc);
      setHasError(true);
      setIsLoading(false);
    }
  }, [src, fallbackSrc]);

  const handleError = useCallback((error: Error) => {
    console.error(t("image.loadError"), error);
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
      setIsLoading(false);
      onError?.(error);
    }
  }, [fallbackSrc, hasError, onError, t]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className={cn("relative overflow-hidden", props.fill ? "h-full w-full" : "")}>
      {lowQualitySrc && isLoading && !hasError && (
        <Image
          {...props}
          src={lowQualitySrc}
          alt={alt || t("image.loading")}
          className={cn(
            "absolute inset-0 blur-sm scale-110",
            className
          )}
        />
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt || t("image.fallback")}
        className={cn(
          "transition-all duration-300",
          isLoading && !hasError && "scale-110 blur-sm",
          hasError && "opacity-60",
          className
        )}
        onError={() => handleError(new Error(t("image.loadError")))}
        onLoad={handleLoad}
        unoptimized={hasError}
      />
    </div>
  );
});

BaseImage.displayName = "BaseImage";

export default BaseImage;
