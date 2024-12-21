'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { WebNavigation } from '@/db/supabase/types';
import { CircleArrowRight, SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import BaseImage from '../image/BaseImage';
import TagItem from '@/components/tag/TagItem';

interface WebNavCardProps extends WebNavigation {
  className?: string;
  priority?: boolean;
  maxLines?: number;
  maxTitleLength?: number;
  maxContentLength?: number;
}

const WebNavCard = React.memo(({ 
  name, 
  thumbnail_url, 
  title, 
  url, 
  content,
  className,
  priority = false,
  maxLines = 2,
  maxTitleLength = 40,
  maxContentLength = 100
}: WebNavCardProps) => {
  const t = useTranslations('Home');
  const [isHovered, setIsHovered] = useState(false);

  // 处理标题和内容的截断
  const truncatedTitle = useMemo(() => {
    if (!title) return '';
    return title.length > maxTitleLength 
      ? `${title.slice(0, maxTitleLength)}...`
      : title;
  }, [title, maxTitleLength]);

  const truncatedContent = useMemo(() => {
    if (!content) return '';
    return content.length > maxContentLength 
      ? `${content.slice(0, maxContentLength)}...`
      : content;
  }, [content, maxContentLength]);

  // 生成低质量图片URL
  const lowQualityImageUrl = useMemo(() => {
    if (!thumbnail_url) return '';
    // 这里可以根据实际情况生成低质量图片URL
    // 例如: 添加参数来请求较小的图片
    return `${thumbnail_url}?quality=10&size=20`;
  }, [thumbnail_url]);

  return (
    <motion.article 
      className={cn(
        'flex h-auto min-h-[180px] sm:min-h-[210px] flex-col gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-white p-1 shadow-soft lg:min-h-[343px]',
        'transition-all duration-200',
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/ai/${name}`} title={title} className='group relative flex-shrink-0'>
        <BaseImage
          src={thumbnail_url || ''}
          alt={title}
          title={title}
          width={310}
          height={174}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          className={cn(
            'aspect-[16/9] w-full rounded-lg sm:rounded-xl bg-white/40',
            'transition-all duration-300',
            isHovered && 'opacity-70 scale-[1.02]'
          )}
          lowQualitySrc={lowQualityImageUrl}
        />
        <motion.div 
          className='absolute inset-0 z-10 flex items-center justify-center gap-1 rounded-lg sm:rounded-xl bg-black/50 text-base sm:text-xl text-white'
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {t('checkDetail')} <CircleArrowRight className='size-3.5 sm:size-4' />
        </motion.div>
      </Link>
      <div className='flex flex-col flex-grow px-1.5 sm:px-[6px] space-y-1.5 sm:space-y-2'>
        <div className='flex items-start justify-between gap-1.5 sm:gap-2'>
          <a 
            href={url} 
            title={title} 
            target='_blank' 
            rel='nofollow noopener noreferrer' 
            className='group flex-1'
          >
            <h3 
              className={cn(
                'text-xs sm:text-sm font-bold lg:text-base',
                'text-gray-900',
                'transition-colors duration-200 group-hover:text-primary',
                'break-words line-clamp-2'
              )}
            >
              {truncatedTitle}
            </h3>
          </a>
          <a 
            href={url} 
            title={title} 
            target='_blank' 
            rel='nofollow noopener noreferrer' 
            className='text-gray-500 hover:text-primary flex-shrink-0 mt-0.5'
            aria-label={`Visit ${title}`}
          >
            <SquareArrowOutUpRight className='size-4 sm:size-5 transition-transform duration-200 hover:scale-110' />
          </a>
        </div>
        <p 
          className={cn(
            'text-[10px] sm:text-xs text-gray-600 lg:text-sm',
            'break-words',
            `line-clamp-${maxLines}`
          )}
        >
          {truncatedContent}
        </p>
      </div>
    </motion.article>
  );
});

WebNavCard.displayName = 'WebNavCard';

export default WebNavCard;
