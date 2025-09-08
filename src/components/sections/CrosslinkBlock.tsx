import { type JSX } from 'react';
import { clsx } from 'clsx';
import type { CrosslinksSection } from '@/types/linecheck';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import { useAnimateOnView } from '@/hooks/useAnimateOnView';

type CrosslinkBlockProps = {
  crosslink: CrosslinksSection;
};

export default function CrosslinkBlock({
  crosslink,
}: CrosslinkBlockProps): JSX.Element {
  const isTicketsBlock = crosslink.url.includes('/tickets/');
  const { ref, shouldAnimate, animationClass } =
    useAnimateOnView<HTMLDivElement>('blur-slide');

  return (
    <a
      href={crosslink.url}
      className={clsx(
        'crosslink-block group flex flex-col transition-all duration-500',
        isTicketsBlock
          ? 'bg-accent hover:bg-accent-contrast text-black'
          : 'hover:bg-accent-contrast bg-black text-white hover:text-black',
      )}
    >
      <div
        ref={ref}
        className={clsx(
          `gap-md flex flex-col items-start justify-start ${animationClass}`,
          shouldAnimate && 'animate-in',
        )}
      >
        <span className='crosslink-label font-arial-narrow-regular text-[15px] leading-[15px] uppercase'>
          {crosslink.label}
        </span>
        <div className='gap-sm flex flex-row items-center justify-start sm:flex-col sm:items-start'>
          <h3 className='crosslink-title font-davinci-italic text-[35px] leading-[38.5px] tracking-[-1.05px]'>
            {crosslink.title}
          </h3>
          <ArrowRightIcon
            className={clsx(
              'crosslink-arrow translate-x-0 transition-all duration-500',
              isTicketsBlock
                ? 'text-black sm:group-hover:translate-x-[30px]'
                : 'text-accent-contrast group-hover:text-black sm:group-hover:translate-x-[30px]',
            )}
          />
        </div>
      </div>
    </a>
  );
}
