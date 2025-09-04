import { useEffect, useRef, useState } from 'react';

export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit,
  once: boolean = true,
) {
  const elementRef = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const targetElement = elementRef.current;
    if (!targetElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(targetElement);
        } else if (!once) {
          setInView(false);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12,
        ...options,
      },
    );

    observer.observe(targetElement);
    return () => observer.disconnect();
  }, [options, once]);

  return { ref: elementRef, inView } as const;
}
