import { useEffect, useState, useRef, useCallback } from 'react';

interface UseLazyComponentOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useLazyComponent(options: UseLazyComponentOptions = {}) {
  const { threshold = 0.1, rootMargin = '50px' } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    const isComponentVisible = entry.isIntersecting;

    setIsVisible(isComponentVisible);
    if (isComponentVisible && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [hasBeenVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    const currentRef = componentRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleIntersection, threshold, rootMargin]);

  return {
    ref: componentRef,
    isVisible,
    hasBeenVisible,
    shouldRender: isVisible || hasBeenVisible,
  };
} 