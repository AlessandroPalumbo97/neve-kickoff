import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
// https://www.npmjs.com/package/flickity
import Flickity from 'flickity';

type DesktopCarouselProps = {
  children: React.ReactNode;
  onScrollStateChange?: (
    canScrollLeft: boolean,
    canScrollRight: boolean,
  ) => void;
  className?: string;
  itemClassName?: string;
};

export type DesktopCarouselRef = {
  scrollCarousel: (direction: 'left' | 'right') => void;
};

const DesktopCarousel = forwardRef<DesktopCarouselRef, DesktopCarouselProps>(
  (
    { children, onScrollStateChange, className = '', itemClassName = '' },
    ref,
  ) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
      // Get current screen width to determine visible items
      const getVisibleItems = () => {
        const width = window.innerWidth;
        if (width >= 1280) return 4; // xl: 4 items visible
        if (width >= 1024) return 3; // lg: 3 items visible
        if (width >= 768) return 2; // md: 2 items visible
        return 2; // sm: 2 items visible
      };

      // Update button states when Flickity changes
      const updateButtonStates = () => {
        if (flickityRef.current) {
          const visibleItems = getVisibleItems();
          const totalItems = flickityRef.current.slides.length;
          const currentIndex = flickityRef.current.selectedIndex;

          const newCanScrollLeft = currentIndex > 0;
          const newCanScrollRight = currentIndex < totalItems - visibleItems;

          // Notify parent component
          onScrollStateChange?.(newCanScrollLeft, newCanScrollRight);
        }
      };

      // Handle resize to update button states
      const handleResize = () => {
        if (flickityRef.current) {
          updateButtonStates();
        }
      };

      if (carouselRef.current && !flickityRef.current) {
        // Initialize Flickity
        flickityRef.current = new Flickity(carouselRef.current, {
          cellAlign: 'left',
          contain: true,
          wrapAround: false,
          pageDots: false,
          prevNextButtons: false, // We'll use our custom buttons
          draggable: false, // Disable drag to prevent conflicts with our scroll prevention
          freeScroll: false,
          groupCells: 1, // Always scroll 1 item at a time
          autoPlay: false,
        });

        // Listen for Flickity events
        flickityRef.current.on('change', updateButtonStates);
        flickityRef.current.on('select', updateButtonStates);

        // Initial state
        updateButtonStates();

        window.addEventListener('resize', handleResize);
      }

      return () => {
        if (flickityRef.current) {
          flickityRef.current.destroy();
          flickityRef.current = null;
        }
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const scrollCarousel = (direction: 'left' | 'right') => {
      if (flickityRef.current) {
        if (direction === 'left') {
          flickityRef.current.previous();
        } else {
          flickityRef.current.next();
        }
      }
    };

    // Expose scrollCarousel method to parent
    useImperativeHandle(ref, () => ({
      scrollCarousel,
    }));

    return (
      <div>
        {/* Flickity Carousel */}
        <div ref={carouselRef} className={className}>
          {Array.isArray(children) ? (
            children.map((child, index) => (
              <div key={index} className={itemClassName}>
                {child}
              </div>
            ))
          ) : (
            <div className={itemClassName}>{children}</div>
          )}
        </div>
      </div>
    );
  },
);

DesktopCarousel.displayName = 'DesktopCarousel';

export default DesktopCarousel;
