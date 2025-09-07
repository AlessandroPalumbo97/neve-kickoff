import { useEffect, useState } from 'react';
import { useInView } from './useInView';

export function useAnimateOnView<T extends HTMLElement>(
  options?: IntersectionObserverInit,
) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { ref, inView } = useInView<T>({
    threshold: 0.3,
    rootMargin: '0px 0px 20% 0px',
    ...options,
  });

  // Check if section is already in view on mount (for scroll position restoration)
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInViewport) {
        // This is scroll position restoration - animate immediately
        setTimeout(() => setShouldAnimate(true), 50);
      }
    }
  }, []);

  // Trigger animation when useInView detects the section
  useEffect(() => {
    if (inView) {
      setShouldAnimate(true);
    }
  }, [inView]);

  return { ref, shouldAnimate } as const;
}
