import { type JSX, useState, useRef } from 'react';
import { getGalleryData } from '@/utils/linecheck';
import clsx from 'clsx';

export default function Gallery(): JSX.Element {
  const galleryData = getGalleryData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [mouseEnd, setMouseEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSliderDragging, setIsSliderDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!galleryData || !galleryData.items || galleryData.items.length === 0) {
    return <></>;
  }

  const items = galleryData.items;
  const totalItems = items.length;
  const itemsPerRow = 3; // 3 columns on sm+ screens
  const fullRows = Math.floor(totalItems / itemsPerRow);
  const itemsInLastRow = totalItems % itemsPerRow;

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Calculate line width and position
  const lineWidth = `calc((100vw - 20px) / ${totalItems})`;
  const linePosition = (currentIndex / (totalItems - 1)) * 100;
  const lineLeft = Math.max(
    0,
    Math.min(linePosition - 100 / totalItems / 2, 100 - 100 / totalItems),
  );

  // Mouse event handlers for desktop drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMouseEnd(null);
    setMouseStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMouseEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging || !mouseStart || !mouseEnd) {
      setIsDragging(false);
      return;
    }

    const distance = mouseStart - mouseEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Slider event handlers
  const handleSliderMouseDown = (e: React.MouseEvent) => {
    setIsSliderDragging(true);
    handleSliderClick(e);
  };

  const handleSliderClick = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const sliderWidth = rect.width;
    const percentage = clickX / sliderWidth;
    const newIndex = Math.round(percentage * (totalItems - 1));

    setCurrentIndex(Math.max(0, Math.min(newIndex, totalItems - 1)));
  };

  const handleSliderMouseMove = (e: React.MouseEvent) => {
    if (!isSliderDragging) return;
    handleSliderClick(e);
  };

  const handleSliderMouseUp = () => {
    setIsSliderDragging(false);
  };

  return (
    <div>
      {/* Desktop Grid - Hidden on mobile */}
      <div className='gap-sm hidden sm:grid sm:grid-cols-6'>
        {items.map((item, index) => {
          const isInLastRow = index >= fullRows * itemsPerRow;

          return (
            <div
              key={index}
              className={clsx(
                'relative col-span-2 overflow-hidden',
                isInLastRow && itemsInLastRow <= 1 && 'col-span-6',
                isInLastRow && itemsInLastRow === 2 && 'col-span-3',
              )}
            >
              <img
                src={item.thumb}
                srcSet={item.srcset.join(', ')}
                sizes='(max-width: 1024px) 50vw, 33vw'
                alt={item.caption || `Gallery image ${index + 1}`}
                className='gallery-image'
              />
            </div>
          );
        })}
      </div>

      {/* Mobile Carousel - Hidden on desktop */}
      <div className='sm:hidden'>
        <div
          ref={carouselRef}
          className='relative overflow-hidden select-none'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div
            className='flex transition-transform duration-300 ease-in-out'
            style={{
              transform: `translateX(-${currentIndex === totalItems - 1 ? (currentIndex - 1) * 90 + 80 : currentIndex * 90}%)`,
            }}
          >
            {items.map((item, index) => {
              const isLastImage = index === totalItems - 1;
              return (
                <div
                  key={index}
                  className={clsx(
                    'w-[90%] flex-shrink-0',
                    !isLastImage && 'pr-sm',
                  )}
                >
                  <img
                    src={item.thumb}
                    srcSet={item.srcset.join(', ')}
                    sizes='100vw'
                    alt={item.caption || `Gallery image ${index + 1}`}
                    className='gallery-image aspect-square'
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Slider */}
        <div className='mt-4 w-full'>
          <div
            ref={sliderRef}
            className='relative h-[2px] w-full cursor-pointer rounded-full bg-black'
            onMouseDown={handleSliderMouseDown}
            onMouseMove={handleSliderMouseMove}
            onMouseUp={handleSliderMouseUp}
            onMouseLeave={handleSliderMouseUp}
          >
            {/* Thumb - Horizontal line indicator */}
            <div
              className='bg-accent absolute top-1/2 h-[2px] -translate-y-1/2 transform transition-all duration-200'
              style={{
                width: lineWidth,
                left: `${lineLeft}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
