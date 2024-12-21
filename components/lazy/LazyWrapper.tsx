'use client';

import React from 'react';
import { useLazyComponent } from '@/lib/hooks/useLazyComponent';

interface LazyWrapperProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

const LazyWrapper = React.memo(({
  children,
  threshold,
  rootMargin,
}: LazyWrapperProps) => {
  const { ref, shouldRender } = useLazyComponent({
    threshold,
    rootMargin,
  });

  return (
    <div ref={ref}>
      {shouldRender && children}
    </div>
  );
});

LazyWrapper.displayName = 'LazyWrapper';

export default LazyWrapper; 