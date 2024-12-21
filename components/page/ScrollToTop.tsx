/*
 * @Author: taielab 52345183+taielab@users.noreply.github.com
 * @Date: 2024-12-19 15:51:34
 * @LastEditors: taielab 52345183+taielab@users.noreply.github.com
 * @LastEditTime: 2024-12-21 15:55:07
 * @FilePath: /AISafeNavigator/components/page/ScrollToTop.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client';

import { useEffect, useState, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useThrottle } from '@/lib/hooks/useThrottle';

export default function ScrollToTop() {
  const t = useTranslations('Common');
  const [isVisible, setIsVisible] = useState(false);

  const checkScroll = useCallback(() => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const throttledCheckScroll = useThrottle(checkScroll, 200);

  useEffect(() => {
    window.addEventListener('scroll', throttledCheckScroll);
    return () => window.removeEventListener('scroll', throttledCheckScroll);
  }, [throttledCheckScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type='button'
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 z-50',
        'flex h-10 w-10 items-center justify-center',
        'rounded-full bg-white shadow-lg',
        'text-gray-600 transition-all duration-200',
        'hover:bg-gray-50 hover:text-primary',
        'focus:outline-none focus:ring-2 focus:ring-primary/20'
      )}
      aria-label={t('scrollToTop')}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
