import { type JSX } from 'react';
import { clsx } from 'clsx';
import { useAnimateOnView } from '@/hooks/useAnimateOnView';
import { NewsItem } from '@/types/linecheck';

type NewsItemCardProps = NewsItem & {
  hasDragged?: boolean;
};

export default function NewsItemCard({
  dateLabel,
  categories,
  title,
  url,
  image,
  hasDragged = false,
}: NewsItemCardProps): JSX.Element {
  const categoriesString = categories.join(' ');
  const { ref, shouldAnimate, animationClass } =
    useAnimateOnView<HTMLDivElement>('blur');

  const handleLinkClick = (e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault(); // Don't open link if drag occurred
    }
  };

  return (
    <a
      href={url}
      className='news-carousel-item group gap-md flex flex-col'
      onClick={handleLinkClick}
      onDragStart={(e) => e.preventDefault()}
      draggable={false}
    >
      <div className='relative overflow-hidden'>
        {/* Image with black and white filter */}
        <img
          src={image}
          alt={title}
          className='aspect-[4/3] w-full object-cover grayscale filter transition-all duration-300 group-hover:filter-none'
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />

        {/* Date label in upper-left corner */}
        <div className='font-arial-narrow-regular absolute top-2 left-2 bg-black px-3 py-0 text-[20px] text-white uppercase'>
          {dateLabel}
        </div>
      </div>

      <div
        ref={ref}
        className={clsx(
          'gap-md pl-sm pb-md pr-md flex flex-col',
          animationClass,
          shouldAnimate && 'animate-in',
        )}
      >
        {/* Categories */}
        <div className='mt-2'>
          <span className='font-arial-narrow-regular text-[20px] leading-[24px] text-black uppercase'>
            {categoriesString}
          </span>
        </div>

        {/* Title */}
        <div className='mt-1'>
          <h3 className='font-davinci-regular group-hover:text-accent-focus text-[35px] leading-[38.5px] tracking-[-1.05px] text-black transition-colors duration-300'>
            {title}
          </h3>
        </div>
      </div>
    </a>
  );
}
