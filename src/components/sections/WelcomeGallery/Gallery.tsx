import { type JSX } from 'react';
import { getGalleryData } from '@/utils/linecheck';
import GalleryGrid from './GalleryGrid';
import MobileCarousel from '../../ui/MobileCarousel';

export default function Gallery(): JSX.Element {
  const galleryData = getGalleryData();

  if (!galleryData || !galleryData.items || galleryData.items.length === 0) {
    return <></>;
  }

  const items = galleryData.items;

  // Create gallery item components for the mobile carousel
  const galleryItems = items.map((item, index) => (
    <img
      key={index}
      src={item.thumb}
      srcSet={item.srcset.join(', ')}
      sizes='100vw'
      alt={item.caption || `Gallery image ${index + 1}`}
      className='gallery-image aspect-square'
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
    />
  ));

  return (
    <div>
      {/* Desktop Grid - Hidden on mobile */}
      <div className='hidden sm:block'>
        <GalleryGrid items={items} />
      </div>

      {/* Mobile Carousel - Hidden on desktop */}
      <div className='block sm:hidden'>
        <MobileCarousel>{galleryItems}</MobileCarousel>
      </div>
    </div>
  );
}
