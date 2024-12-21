import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

import BaseImage from "./BaseImage";

interface IconProps {
  src: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const Icon = React.memo(({
  src,
  className,
  title = "",
  width = 16,
  height = 16,
  priority = false,
}: IconProps) => {
  const t = useTranslations("Common");
  const defaultText = t("image.icon");
  
  return (
    <BaseImage
      src={src}
      className={cn("h-4 w-4 object-contain", className)}
      width={width}
      height={height}
      alt={title || defaultText}
      title={title || defaultText}
      priority={priority}
      fallbackSrc="/icons/default-icon.svg"
    />
  );
});

Icon.displayName = "Icon";

export default Icon;
