import { type JSX, useState, useRef } from 'react';
import clsx from 'clsx';

type MobileCarouselProps = {
  children: React.ReactNode;
  onDragStateChange?: (hasDragged: boolean) => void;
};

export default function MobileCarousel({
  children,
  onDragStateChange,
}: MobileCarouselProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [mouseEnd, setMouseEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSliderDragging, setIsSliderDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Get the number of children
  const totalItems = Array.isArray(children) ? children.length : 1;

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
    onDragStateChange?.(true); // Notify parent
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
    // Reset drag state after a short delay to allow link clicks
    setTimeout(() => {
      onDragStateChange?.(false);
    }, 100);
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
      {/* Mobile Carousel */}
      <div>
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
          onDragStart={(e) => e.preventDefault()}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div
            className='flex transition-transform duration-300 ease-in-out'
            style={{
              transform: `translateX(-${currentIndex === totalItems - 1 ? (currentIndex - 1) * 90 + 80 : currentIndex * 90}%)`,
            }}
          >
            {Array.isArray(children) ? (
              children.map((child, index) => {
                const isLastItem = index === totalItems - 1;
                return (
                  <div
                    key={index}
                    className={clsx(
                      'w-[90%] flex-shrink-0',
                      !isLastItem && 'pr-sm',
                    )}
                  >
                    {child}
                  </div>
                );
              })
            ) : (
              <div className='w-[90%] flex-shrink-0'>{children}</div>
            )}
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
