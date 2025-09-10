import { type JSX, useState, useRef } from 'react';
import parse from 'html-react-parser';
import { clsx } from 'clsx';
import { getTicketsData } from '@/utils/linecheck';
import { useAnimateOnView } from '@/hooks/useAnimateOnView';
import ReadMore from '../../ui/ReadMore';
import DesktopCarousel, {
  type DesktopCarouselRef,
} from '../../ui/DesktopCarousel';
import TicketItemCard from './TicketItemCard';
import MobileCarousel from '../../ui/MobileCarousel';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';

export default function Tickets(): JSX.Element {
  const ticketsData = getTicketsData();
  const { ref, shouldAnimate, animationClass } =
    useAnimateOnView<HTMLDivElement>('blur-slide');
  const [hasDragged, setHasDragged] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const desktopCarouselRef = useRef<DesktopCarouselRef>(null);

  if (!ticketsData) {
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
        className={`gap-lg flex w-full flex-col ${animationClass} ${
          shouldAnimate && 'animate-in'
        }`}
      >
        <div className='gap-md flex flex-col'>
          {/* Title */}
          <div className='gap-sm flex w-full flex-col'>
            <h2 className='font-arial-narrow-regular text-[20px] leading-[18px] tracking-[-0.6px] uppercase'>
              {ticketsData.title}
            </h2>

            {/* Description with ReadMore */}
            <div className='welcome-rich-text-container'>
              <ReadMore
                text={parse(ticketsData.description)}
                textClass='welcome-rich-text pb-[3px]'
                maxLines={5}
              />
            </div>
          </div>
        </div>

        {/* Arrow Controls - Only show on larger screens */}
        <div className='hidden justify-end gap-[1px] sm:flex'>
          <button
            onClick={() => scrollCarousel('left')}
            disabled={!canScrollLeft}
            className={clsx(
              'cta-btn-primary flex cursor-pointer items-center justify-center p-0 disabled:pointer-events-none disabled:cursor-default disabled:opacity-50',
            )}
          >
            <ArrowRightIcon className='carousel-control-arrow rotate-180' />
          </button>
          <button
            onClick={() => scrollCarousel('right')}
            disabled={!canScrollRight}
            className={clsx(
              'cta-btn-primary flex cursor-pointer items-center justify-center p-0 disabled:pointer-events-none disabled:cursor-default disabled:opacity-50',
            )}
          >
            <ArrowRightIcon className='carousel-control-arrow' />
          </button>
        </div>

        {/* Desktop/Tablet Carousel - Hidden on XS */}
        <div className='hidden sm:block'>
          <DesktopCarousel
            ref={desktopCarouselRef}
            onScrollStateChange={handleScrollStateChange}
            className='carousel-flickity'
            itemClassName='carousel-flickity-item'
          >
            {ticketsData.items.map((item, index) => (
              <TicketItemCard
                key={index}
                venue={item.venue}
                date={item.date}
                dateRange={item.dateRange}
                title={item.title}
                tooltip={item.tooltip}
                prices={item.prices}
                buyUrl={item.buyUrl}
              />
            ))}
          </DesktopCarousel>
        </div>

        {/* Mobile Carousel - Hidden on SM+ */}
        <div className='block sm:hidden'>
          <MobileCarousel onDragStateChange={setHasDragged}>
            {ticketsData.items.map((item, index) => (
              <TicketItemCard
                key={index}
                venue={item.venue}
                date={item.date}
                dateRange={item.dateRange}
                title={item.title}
                tooltip={item.tooltip}
                prices={item.prices}
                buyUrl={item.buyUrl}
                hasDragged={hasDragged}
              />
            ))}
          </MobileCarousel>
        </div>
      </div>
    </section>
  );
}
