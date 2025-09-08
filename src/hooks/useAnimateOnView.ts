import { useEffect, useState } from 'react';
import { useInView } from './useInView';
import { useLoading } from '@/contexts/LoadingContext';

type AnimationType = 'blur' | 'blur-slide';

export function useAnimateOnView<T extends HTMLElement>(
  animationType: AnimationType = 'blur-slide',
  options?: IntersectionObserverInit,
) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { isOverlayGone } = useLoading();
  const { ref, inView } = useInView<T>({
    threshold: 0.1, // Only need 10% of element visible
    rootMargin: '0px 0px -20% 0px', // Element must be 20% inside viewport
    ...options,
  });

  // Check if section is already in view on mount (for scroll position restoration)
  useEffect(() => {
    if (ref.current && isOverlayGone) {
      const rect = ref.current.getBoundingClientRect();
      // More conservative: element must be actually visible in viewport
      const isInViewport =
        rect.top >= 0 && rect.top < window.innerHeight && rect.bottom > 0;
      if (isInViewport) {
        // This is scroll position restoration - animate immediately after overlay is gone
        setTimeout(() => setShouldAnimate(true), 50);
      }
    }
  }, [isOverlayGone]);

  // Trigger animation when useInView detects the section AND overlay is gone
  useEffect(() => {
    if (inView && isOverlayGone) {
      setShouldAnimate(true);
    }
  }, [inView, isOverlayGone]);

  const animationClass = `animate-${animationType}`;

  return { ref, shouldAnimate, animationClass } as const;
}
