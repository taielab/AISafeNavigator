'use client';

import React, { useMemo } from 'react';
import { WebNavigation } from '@/db/supabase/types';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, Variants } from 'framer-motion';

import { cn } from '@/lib/utils';
import Empty from '../Empty';
import WebNavCard from './WebNavCard';
import AdPlacement from '../ad/AdPlacement';
import LazyWrapper from '../lazy/LazyWrapper';

interface WebNavCardListProps {
  dataList: WebNavigation[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  animate?: boolean;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
};

// 每隔多少个项目插入一个广告
const AD_INTERVAL = 6;

const WebNavCardList = React.memo(({ 
  dataList, 
  className,
  columns = 3,
  animate = true
}: WebNavCardListProps) => {
  const t = useTranslations('Home');

  const Wrapper = animate ? motion.div : 'div';

  const renderItems = useMemo(() => {
    if (!dataList?.length) {
      return <Empty title={t('empty')} />;
    }

    return dataList.map((item, index) => {
      const elements = [];

      // 添加卡片
      elements.push(
        <LazyWrapper key={item.id} rootMargin="100px">
          <motion.div variants={itemAnimation}>
            <WebNavCard
              {...item}
              priority={index < 6} // 只对前6个卡片设置优先加载
            />
          </motion.div>
        </LazyWrapper>
      );

      // 每隔固定数量添加广告
      if ((index + 1) % AD_INTERVAL === 0 && index < dataList.length - 1) {
        elements.push(
          <LazyWrapper key={`ad-${index}`} rootMargin="100px">
            <motion.div variants={itemAnimation}>
              <AdPlacement className="mt-2 sm:mt-0" />
            </motion.div>
          </LazyWrapper>
        );
      }

      return elements;
    });
  }, [dataList, t]);

  return (
    <AnimatePresence>
      <Wrapper
        className={cn(
          `grid gap-4 sm:gap-5 lg:gap-6 ${columnClasses[columns]}`,
          'px-0.5 sm:px-0',  // 添加小边距防止阴影被裁剪
          className
        )}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {renderItems}
      </Wrapper>
    </AnimatePresence>
  );
});

WebNavCardList.displayName = 'WebNavCardList';

export default WebNavCardList;
