"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

function BarItem({ className }: { className: string }) {
  return (
    <span
      className={cn(
        "absolute block h-[2px] w-[18px] transform bg-current bg-white transition duration-300 ease-in-out",
        className,
      )}
    />
  );
}

export default function MenuBtn({
  open,
  onClick,
}: {
  open: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const t = useTranslations("Navigation");
  
  return (
    <button 
      type="button" 
      className="relative ml-3" 
      onClick={onClick}
      aria-label={t("menu")}
      aria-expanded={open}
    >
      <div className="absolute block w-5 -translate-x-1/2  -translate-y-1/2 transform">
        <BarItem className={open ? "rotate-45" : "-translate-y-1.5"} />
        <BarItem className={open ? "opacity-0" : ""} />
        <BarItem className={open ? "-rotate-45" : "translate-y-1.5"} />
      </div>
      <span className="sr-only">{t("menu")}</span>
    </button>
  );
}
