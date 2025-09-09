import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { getNewsData } from '@/utils/linecheck';
import NewsCarouselItem from './NewsCarouselItem';
// https://www.npmjs.com/package/flickity
import Flickity from 'flickity';

type NewsCarouselProps = {
  onScrollStateChange?: (
    canScrollLeft: boolean,
    canScrollRight: boolean,
  ) => void;
};

export type NewsCarouselRef = {
  scrollCarousel: (direction: 'left' | 'right') => void;
};

const NewsCarousel = forwardRef<NewsCarouselRef, NewsCarouselProps>(
  ({ onScrollStateChange }, ref) => {
    const newsData = getNewsData();
    const carouselRef = useRef<HTMLDivElement>(null);
    const flickityRef = useRef<Flickity | null>(null);

    if (!newsData) {
      return <></>;
    }

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
        <div ref={carouselRef} className='news-carousel-flickity'>
          {newsData.items.map((item, index) => (
            <div key={index} className='news-carousel-flickity-item'>
              <NewsCarouselItem
                dateLabel={item.dateLabel}
                categories={item.categories}
                title={item.title}
                url={item.url}
                image={item.image}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
);

NewsCarousel.displayName = 'NewsCarousel';

export default NewsCarousel;
