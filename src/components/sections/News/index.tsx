import { type JSX, useState, useRef } from 'react';
import { clsx } from 'clsx';
import { getNewsData } from '@/utils/linecheck';
import { useAnimateOnView } from '@/hooks/useAnimateOnView';
import DesktopCarousel, {
  type DesktopCarouselRef,
} from '../../ui/DesktopCarousel';
import NewsItemCard from './NewsItemCard';
import MobileCarousel from '../../ui/MobileCarousel';
import ReadMore from '../../ui/ReadMore';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';

export default function News(): JSX.Element {
  const newsData = getNewsData();
  const { ref, shouldAnimate, animationClass } =
    useAnimateOnView<HTMLDivElement>('blur-slide');
  const [hasDragged, setHasDragged] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const desktopCarouselRef = useRef<DesktopCarouselRef>(null);

  if (!newsData) {
    return <></>;
  }

  const handleScrollStateChange = (
    canScrollLeft: boolean,
    canScrollRight: boolean,
  ) => {
    setCanScrollLeft(canScrollLeft);
    setCanScrollRight(canScrollRight);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    desktopCarouselRef.current?.scrollCarousel(direction);
  };

  return (
    <section className='section-padding'>
      <div
        ref={ref}
        className={clsx(
          `gap-md flex flex-col ${animationClass}`,
          shouldAnimate && 'animate-in',
        )}
      >
        <div className='gap-sm flex flex-col'>
          <h2 className='news-title'>{newsData.title}</h2>
          <ReadMore
            text={newsData.description}
            textClass='news-rich-text pb-[6px]'
            maxLines={5}
          />
        </div>

        {/* CTA Button and Arrows */}
        <div className='flex items-center justify-between'>
          {/* CTA Button */}
          <a
            href={newsData.cta.url}
            className='welcome-cta-primary w-full sm:w-auto'
            target='_blank'
            rel='noopener noreferrer'
          >
            {newsData.cta.label}
          </a>

          {/* Arrow Controls - Only show on larger screens */}
          <div className='hidden gap-[1px] sm:flex'>
            <button
              onClick={() => scrollCarousel('left')}
              disabled={!canScrollLeft}
              className={clsx(
                'welcome-cta-primary flex cursor-pointer items-center justify-center p-0 disabled:pointer-events-none disabled:cursor-default disabled:opacity-50',
              )}
            >
              <ArrowRightIcon className='h-[16px] w-[35px] rotate-180' />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              disabled={!canScrollRight}
              className={clsx(
                'welcome-cta-primary flex cursor-pointer items-center justify-center p-0 disabled:pointer-events-none disabled:cursor-default disabled:opacity-50',
              )}
            >
              <ArrowRightIcon className='h-[16px] w-[35px]' />
            </button>
          </div>
        </div>

        {/* Desktop/Tablet Carousel - Hidden on XS */}
        <div className='hidden sm:block'>
          <DesktopCarousel
            ref={desktopCarouselRef}
            onScrollStateChange={handleScrollStateChange}
            className='news-carousel-flickity'
            itemClassName='news-carousel-flickity-item'
          >
            {newsData.items.map((item, index) => (
              <NewsItemCard
                key={index}
                dateLabel={item.dateLabel}
                categories={item.categories}
                title={item.title}
                url={item.url}
                image={item.image}
              />
            ))}
          </DesktopCarousel>
        </div>

        {/* Mobile Carousel - Only on XS */}
        <div className='block sm:hidden'>
          <MobileCarousel onDragStateChange={setHasDragged}>
            {newsData.items.map((item, index) => (
              <NewsItemCard
                key={index}
                dateLabel={item.dateLabel}
                categories={item.categories}
                title={item.title}
                url={item.url}
                image={item.image}
                hasDragged={hasDragged}
              />
            ))}
          </MobileCarousel>
        </div>
      </div>
    </section>
  );
}
