import { type JSX, useState } from 'react';
import { clsx } from 'clsx';
import { useAnimateOnView } from '@/hooks/useAnimateOnView';
import InfoIcon from '@/assets/icons/InfoIcon';
import type { TicketItem } from '@/types/linecheck';

type TicketItemCardProps = TicketItem & {
  hasDragged?: boolean;
};

export default function TicketItemCard({
  venue,
  date,
  title,
  tooltip,
  prices,
  buyUrl,
}: TicketItemCardProps): JSX.Element {
  const [showTooltip, setShowTooltip] = useState(false);
  const { ref, shouldAnimate, animationClass } =
    useAnimateOnView<HTMLDivElement>('blur');

  // Format date from "2025-11-19" to "19.11"
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  };

  // Convert currency code to symbol
  const getCurrencySymbol = (currency: string): string => {
    const symbols: Record<string, string> = {
      EUR: '€',
      USD: '$',
      GBP: '£',
    };
    return symbols[currency] || currency;
  };

  // Format price with 2 decimal places
  const formatPrice = (price: number): string => {
    return price.toFixed(2);
  };

  return (
    <div
      ref={ref}
      className={clsx(
        'p-md bg-light-gray gap-md relative flex flex-col',
        animationClass,
        shouldAnimate && 'animate-in',
      )}
    >
      <div className='gap-sm flex flex-col'>
        {/* Top Row: Venue | Date | Info Icon */}
        <div className='gap-md flex items-center'>
          <span className='font-arial-narrow-regular text-[15px] leading-[15px] tracking-[-0.15px] uppercase'>
            {venue}
          </span>
          <span className='text-accent text-lg'>|</span>
          <span className='font-arial-narrow-regular text-[15px] leading-[15px] tracking-[-0.15px] uppercase'>
            {formatDate(date || '')}
          </span>
          <span className='text-accent text-lg'>|</span>
          <div className='relative'>
            <button
              type='button'
              className='flex items-center justify-center'
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <InfoIcon className='h-[20px] w-[20px] cursor-pointer text-black' />
            </button>
            {showTooltip && (
              <div className='absolute top-10 left-1/2 z-10 w-64 -translate-x-1/2 bg-[var(--color-tooltip-bg)] p-3 shadow-lg'>
                {/* Triangle pointer */}
                <div className='absolute -top-[20px] left-1/2 h-0 w-0 -translate-x-1/2 border-r-[24px] border-b-[20px] border-l-[24px] border-r-transparent border-b-[var(--color-tooltip-bg)] border-l-transparent' />
                <p className='text-sm text-white'>{tooltip}</p>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className='welcome-rich-text'>{title}</h3>
      </div>

      {/* Pricing Section */}
      <div className='gap-md flex flex-col'>
        {prices.map((price, index) => (
          <div key={index} className='flex w-full flex-col gap-[5px]'>
            <div className='font-arial-narrow-regular py-[6px] text-[15px] leading-[15px] tracking-[-0.15px] uppercase'>
              <span className={clsx(price.soldOut && 'opacity-50')}>
                {price.release}
              </span>
              {price.soldOut && (
                <span className='bg-accent px-sm font-arial-narrow-regular ml-2 py-[5px] text-[15px] leading-[15px] tracking-[-0.15px] text-black uppercase'>
                  SOLD OUT
                </span>
              )}
            </div>
            <div
              className={clsx(
                'flex items-center gap-1',
                price.soldOut && 'opacity-50',
              )}
            >
              <span className='font-arial-narrow-regular text-[15px] leading-[15px] tracking-[-0.15px] uppercase'>
                {getCurrencySymbol(price.currency)}
              </span>
              <span
                className={clsx(
                  price.soldOut
                    ? 'font-davinci-regular text-[20px] leading-[22px] tracking-[-0.6px]'
                    : 'welcome-rich-text',
                )}
              >
                {formatPrice(price.price)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href={buyUrl}
        className='welcome-cta-primary w-full tracking-[0.15px]'
        target='_blank'
        rel='noopener noreferrer'
      >
        Get tickets
      </a>
    </div>
  );
}
