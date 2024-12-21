"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  onError?: (error: Error) => void;
  lowQualitySrc?: string;
  aspectRatio?: number;
  priority?: boolean;
  sizes?: string;
  loading?: "lazy" | "eager";
}

type ImageStyle = {
  aspectRatio?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
};

const OptimizedImage = React.memo(({
  src,
  alt,
  className,
  fallbackSrc = "/images/fallback.png",
  onError,
  lowQualitySrc,
  aspectRatio,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  loading = "lazy",
  width,
  height,
  ...props
}: OptimizedImageProps) => {
  const t = useTranslations("Common");
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(!src);
  const [isLoading, setIsLoading] = useState(true);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    if (typeof window === "undefined" || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: "50px",
      }
    );

    const element = document.querySelector(`[data-image-id="${src}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, priority]);

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

  const imageStyle: ImageStyle = {
    aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
    objectFit: props.fill ? "cover" : "contain",
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        props.fill ? "h-full w-full" : "",
        aspectRatio && `aspect-[${aspectRatio}]`
      )}
      data-image-id={src}
    >
      {lowQualitySrc && isLoading && !hasError && (
        <Image
          {...props}
          src={lowQualitySrc}
          alt={alt || t("image.loading")}
          className={cn(
            "absolute inset-0 blur-sm scale-110",
            className
          )}
          style={imageStyle}
          width={width}
          height={height}
        />
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt || t("image.fallback")}
        className={cn(
          "transition-opacity duration-300 ease-in-out",
          isLoading && !hasError ? "opacity-0" : "opacity-100",
          hasError && "opacity-60",
          className
        )}
        style={imageStyle}
        onError={() => handleError(new Error(t("image.loadError")))}
        onLoad={handleLoad}
        loading={loading}
        priority={priority}
        sizes={sizes}
        quality={90}
        width={width}
        height={height}
        unoptimized={hasError}
      />
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage; 