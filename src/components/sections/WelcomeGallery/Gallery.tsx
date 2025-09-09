import { type JSX, useState } from 'react';
import { getGalleryData } from '@/utils/linecheck';
import type { GalleryItem } from '@/types/linecheck';
import GalleryGrid from './GalleryGrid';
import MobileCarousel from '../../ui/MobileCarousel';
import GalleryLightbox from '../../ui/GalleryLightbox';

// Gallery Image Component that handles drag state
type GalleryImageProps = {
  item: GalleryItem;
  index: number;
  onImageClick: (index: number) => void;
  hasDragged?: boolean;
};

function GalleryImage({
  item,
  index,
  onImageClick,
  hasDragged = false,
}: GalleryImageProps): JSX.Element {
  const handleImageClick = (e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault(); // Don't open lightbox if drag occurred
      return;
    }
    onImageClick(index);
  };

  return (
    <img
      src={item.thumb}
      srcSet={item.srcset.join(', ')}
      sizes='100vw'
      alt={item.caption || `Gallery image ${index + 1}`}
      className='gallery-image aspect-square cursor-pointer'
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      onClick={handleImageClick}
    />
  );
}

export default function Gallery(): JSX.Element {
  const galleryData = getGalleryData();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  if (!galleryData || !galleryData.items || galleryData.items.length === 0) {
    return <></>;
  }

  const items = galleryData.items;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Create gallery item components for the mobile carousel
  const galleryItems = items.map((item, index) => (
    <GalleryImage
      key={index}
      item={item}
      index={index}
      onImageClick={handleImageClick}
      hasDragged={hasDragged}
    />
  ));

  return (
    <div>
      {/* Desktop Grid - Hidden on mobile */}
      <div className='hidden sm:block'>
        <GalleryGrid items={items} onImageClick={handleImageClick} />
      </div>

      {/* Mobile Carousel - Hidden on desktop */}
      <div className='block sm:hidden'>
        <MobileCarousel onDragStateChange={setHasDragged}>
          {galleryItems}
        </MobileCarousel>
      </div>

      {/* Gallery Lightbox */}
      <GalleryLightbox
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        items={items}
        initialIndex={selectedImageIndex}
      />
    </div>
  );
}
