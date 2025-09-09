import { type JSX, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import Flickity from 'flickity';
import type { GalleryItem } from '@/types/linecheck';

type GalleryLightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  initialIndex: number;
};

export default function GalleryLightbox({
  isOpen,
  onClose,
  items,
  initialIndex,
}: GalleryLightboxProps): JSX.Element {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);
  const flickityRef = useRef<Flickity | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && carouselRef.current) {
      // Initialize Flickity
      flickityRef.current = new Flickity(carouselRef.current, {
        cellAlign: 'center',
        contain: true,
        draggable: true,
        freeScroll: false,
        wrapAround: true,
        pageDots: false,
        prevNextButtons: false,
        initialIndex: initialIndex,
      });

      // Update scroll state
      const updateScrollState = () => {
        if (flickityRef.current) {
          const selectedIndex = flickityRef.current.selectedIndex;
          setCurrentImageIndex(selectedIndex);
        }
      };

      // Listen for Flickity events
      flickityRef.current.on('change', updateScrollState);
      flickityRef.current.on('select', updateScrollState);

      // Initial state
      updateScrollState();
    }

    return () => {
      if (flickityRef.current) {
        flickityRef.current.destroy();
        flickityRef.current = null;
      }
    };
  }, [isOpen, initialIndex, items.length]);

  useEffect(() => {
    if (flickityRef.current && isOpen) {
      flickityRef.current.select(initialIndex, false, true);
    }
  }, [initialIndex, isOpen]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (flickityRef.current) {
      if (direction === 'left') {
        flickityRef.current.previous();
      } else {
        flickityRef.current.next();
      }
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3)); // Max 300% zoom
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 1)); // Min 100% zoom
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        scrollCarousel('left');
        break;
      case 'ArrowRight':
        scrollCarousel('right');
        break;
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setZoomLevel(1); // Reset zoom when opening
      setCurrentImageIndex(initialIndex); // Reset current image index
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex]);

  if (!isOpen) return <></>;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      style={{ backgroundColor: 'rgba(26, 11, 1, 0.98)' }}
      onClick={handleBackdropClick}
    >
      {/* Bottom Controls Row */}
      <div className='lg:gap-md absolute right-4 bottom-4 left-4 z-10 flex items-center justify-between lg:justify-center'>
        {/* Left Arrow - Hidden on lg+ screens */}
        <button
          onClick={() => scrollCarousel('left')}
          className={clsx(
            'flex h-12 w-12 items-center justify-center bg-white text-black transition-colors hover:bg-black hover:text-white',
            'cursor-pointer lg:hidden',
          )}
          aria-label='Previous image'
        >
          <svg
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>

        {/* Desktop Left Arrow - Only visible on lg+ screens */}
        <button
          onClick={() => scrollCarousel('left')}
          className={clsx(
            'hidden h-12 w-12 items-center justify-center bg-white text-black transition-colors hover:bg-black hover:text-white lg:flex',
            'cursor-pointer',
          )}
          aria-label='Previous image'
        >
          <svg
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className='bg-accent hover:bg-accent-contrast h-12 w-12 cursor-pointer text-black'
          aria-label='Close gallery'
        >
          <svg
            className='mx-auto h-6 w-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        {/* Right Arrow - Hidden on lg+ screens */}
        <button
          onClick={() => scrollCarousel('right')}
          className={clsx(
            'flex h-12 w-12 items-center justify-center bg-white text-black transition-colors hover:bg-black hover:text-white',
            'cursor-pointer lg:hidden',
          )}
          aria-label='Next image'
        >
          <svg
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>

        {/* Desktop Right Arrow - Only visible on lg+ screens */}
        <button
          onClick={() => scrollCarousel('right')}
          className={clsx(
            'hidden h-12 w-12 items-center justify-center bg-white text-black transition-colors hover:bg-black hover:text-white lg:flex',
            'cursor-pointer',
          )}
          aria-label='Next image'
        >
          <svg
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      </div>

      {/* Zoom Controls - Hidden on lg+ screens */}
      <div className='absolute top-4 left-4 z-10 lg:hidden'>
        <button
          onClick={handleZoomOut}
          disabled={zoomLevel <= 1}
          className={clsx(
            'flex h-12 w-12 items-center justify-center bg-white text-black',
            zoomLevel <= 1
              ? 'cursor-not-allowed'
              : 'cursor-pointer transition-colors hover:bg-black hover:text-white',
          )}
          aria-label='Zoom out'
        >
          <svg
            className={clsx('h-6 w-6', zoomLevel <= 1 && 'opacity-50')}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <circle cx='11' cy='11' r='8' strokeWidth={2} />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-4.35-4.35'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8 11h6'
            />
          </svg>
        </button>
      </div>

      <div className='absolute top-4 right-4 z-10 lg:hidden'>
        <button
          onClick={handleZoomIn}
          disabled={zoomLevel >= 3}
          className={clsx(
            'flex h-12 w-12 items-center justify-center bg-white text-black',
            zoomLevel >= 3
              ? 'cursor-not-allowed'
              : 'cursor-pointer transition-colors hover:bg-black hover:text-white',
          )}
          aria-label='Zoom in'
        >
          <svg
            className={clsx('h-6 w-6', zoomLevel >= 3 && 'opacity-50')}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <circle cx='11' cy='11' r='8' strokeWidth={2} />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-4.35-4.35'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11 8v6M8 11h6'
            />
          </svg>
        </button>
      </div>

      {/* Carousel */}
      <div className='h-full w-full p-4'>
        <div ref={carouselRef} className='gallery-lightbox-flickity h-full'>
          {items.map((item, index) => (
            <div key={index} className='gallery-lightbox-flickity-item h-full'>
              <img
                src={item.thumb}
                srcSet={item.srcset.join(', ')}
                sizes='100vw'
                alt={item.caption || `Gallery image ${index + 1}`}
                className='h-auto w-auto object-contain transition-transform duration-200'
                style={{
                  maxHeight: `calc(100vh - 3rem)`,
                  maxWidth: `calc(100vw - 3rem)`,
                  transform:
                    index === currentImageIndex
                      ? `scale(${zoomLevel})`
                      : 'scale(1)',
                }}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
