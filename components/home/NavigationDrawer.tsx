"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NavDrawerItem = React.memo(({ isActive, name }: { isActive: boolean; name: string }) => {
  return (
    <li
      className={cn(
        "flex h-[28px] w-full items-center justify-between rounded-lg",
        "transition-colors duration-200",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-gray-600 hover:text-primary"
      )}
    >
      <div className={cn(
        "size-3 rounded-full",
        isActive ? "bg-primary" : "bg-gray-300"
      )} />
      <div className="text-sm">{name}</div>
    </li>
  );
});

NavDrawerItem.displayName = "NavDrawerItem";

interface NavigationDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function NavigationDrawer({ open, setOpen }: NavigationDrawerProps) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(open);
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);

  const onClose = useCallback(() => {
    setOpen(false);
    setIsOpen(false);
  }, [setOpen]);

  const onRoute = useCallback(async (route: string) => {
    try {
      await router.push(route);
    } finally {
      onClose();
    }
  }, [router, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const NavLinks = NAV_LINKS.map((item) => ({
    ...item,
    label: t(`${item.code}`),
  }));

  return (
    <>
      <div
        className={cn(
          "fixed z-50 h-screen w-screen overflow-hidden bg-black/20", 
          isOpen ? "block" : "hidden"
        )}
        onClick={onClose}
      />
      <div
        ref={drawerRef}
        className={cn(
          "fixed right-0 top-16 z-[99999] h-[calc(100%-64px)] w-[276px]",
          "transform bg-white shadow-lg transition-transform duration-300",
          "will-change-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex size-full flex-col gap-3 px-3 py-6">
          {NavLinks.map((item) => (
            <button
              type="button"
              key={item.code}
              onClick={() => onRoute(item.href)}
              className="w-full focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <NavDrawerItem
                name={item.label}
                isActive={pathname === item.href || (pathname.includes(item.href) && item.href !== "/")}
              />
              <span className="sr-only">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
