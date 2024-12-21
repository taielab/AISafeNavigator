import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

interface EmptyProps {
  className?: string;
  imageSize?: number;
  imageClassName?: string;
}

const Empty = React.memo(({ 
  className,
  imageSize = 100,
  imageClassName 
}: EmptyProps) => {
  const t = useTranslations('Common');
  
  return (
    <div 
      className={cn('flex flex-col items-center gap-4', className)}
      role="status"
      aria-label={t('empty')}
    >
      <div className={cn('relative', imageClassName)}>
        <Image
          src='/images/search-empty.png'
          alt={t('empty')}
          width={imageSize}
          height={imageSize}
          className='max-w-full object-contain opacity-80'
          priority
        />
      </div>
      <p className='text-center text-sm text-gray-500 lg:text-base'>
        {t('empty')}
      </p>
    </div>
  );
});

Empty.displayName = 'Empty';

export default Empty;
