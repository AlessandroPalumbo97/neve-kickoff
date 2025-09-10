import { type JSX } from 'react';
import { clsx } from 'clsx';
import { useAnimateOnView } from '@/hooks/useAnimateOnView';
import InfoIcon from '@/assets/icons/InfoIcon';
import PortalTooltip from '@/components/ui/PortalTooltip';
import type { TicketItem } from '@/types/linecheck';

type TicketItemCardProps = TicketItem & {
  hasDragged?: boolean;
};

export default function TicketItemCard({
  venue,
  date,
  dateRange,
  title,
  tooltip,
  prices,
  buyUrl,
}: TicketItemCardProps): JSX.Element {
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

  // Format date range or single date
  const formatDateDisplay = (): string => {
    if (dateRange && dateRange.length > 0) {
      if (dateRange.length === 1) {
        return formatDate(dateRange[0]);
      } else {
        const startDate = formatDate(dateRange[0]);
        const endDate = formatDate(dateRange[dateRange.length - 1]);
        return `${startDate} - ${endDate}`;
      }
    } else if (date) {
      return formatDate(date);
    }
    return '';
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
        <div className='gap-md relative flex items-center'>
          <span className='font-arial-narrow-regular text-body-sm uppercase'>
            {venue}
          </span>
          <span className='text-accent text-lg'>|</span>
          <span className='font-arial-narrow-regular text-body-sm uppercase'>
            {formatDateDisplay()}
          </span>
          <span className='text-accent text-lg'>|</span>
          <PortalTooltip content={tooltip} place='bottom'>
            <button type='button' className='flex items-center justify-center'>
              <InfoIcon className='h-[20px] w-[20px] cursor-pointer text-black' />
            </button>
          </PortalTooltip>
        </div>

        {/* Title */}
        <h3 className='welcome-rich-text'>{title}</h3>
      </div>

      {/* Pricing Section */}
      <div className='gap-md flex flex-col'>
        {prices.map((price, index) => (
          <div key={index} className='gap-5px flex w-full flex-col'>
            <div className='font-arial-narrow-regular py-6px text-body-sm uppercase'>
              <span className={clsx(price.soldOut && 'opacity-50')}>
                {price.release}
              </span>
              {price.soldOut && (
                <span className='bg-accent px-sm font-arial-narrow-regular ticket-sold-out-label text-body-sm ml-2 text-black uppercase'>
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
              <span className='font-arial-narrow-regular text-body-sm uppercase'>
                {getCurrencySymbol(price.currency)}
              </span>
              <span
                className={clsx(
                  price.soldOut
                    ? 'font-davinci-regular text-ticket-price'
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
