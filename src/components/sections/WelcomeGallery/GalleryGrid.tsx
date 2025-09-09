import { type JSX } from 'react';
import type { GalleryItem } from '@/types/linecheck';
import clsx from 'clsx';

type GalleryGridProps = {
  items: GalleryItem[];
  onImageClick: (index: number) => void;
};

export default function GalleryGrid({
  items,
  onImageClick,
}: GalleryGridProps): JSX.Element {
  if (!items || items.length === 0) {
    return <></>;
  }
  const itemsPerRow = 3; // 3 columns on sm+ screens
  const fullRows = Math.floor(items.length / itemsPerRow);
  const itemsInLastRow = items.length % itemsPerRow;

  return (
    <div className='gap-sm grid grid-cols-6'>
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
              className='gallery-image cursor-pointer'
              onClick={() => onImageClick(index)}
            />
          </div>
        );
      })}
    </div>
  );
}
