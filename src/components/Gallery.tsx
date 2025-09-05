import { type JSX } from 'react';
import { getGalleryData } from '../utils/linecheck';
import clsx from 'clsx';

export default function Gallery(): JSX.Element {
  const galleryData = getGalleryData();

  if (!galleryData || !galleryData.items || galleryData.items.length === 0) {
    return <></>;
  }

  const items = galleryData.items;
  const totalItems = items.length;
  const itemsPerRow = 3; // 3 columns on sm+ screens
  const fullRows = Math.floor(totalItems / itemsPerRow);
  const itemsInLastRow = totalItems % itemsPerRow;

  return (
    <div className='gap-sm grid grid-cols-1 sm:grid-cols-6'>
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
              sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
              alt={item.caption || `Gallery image ${index + 1}`}
              className='gallery-image'
            />
          </div>
        );
      })}
    </div>
  );
}
