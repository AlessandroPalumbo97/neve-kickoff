import { type JSX } from 'react';
import { clsx } from 'clsx';
import { getHeaderData } from '@/utils/linecheck';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { useAnimateOnView } from '@/hooks/useAnimateOnView';

type HeaderProps = {
  onMenuToggle: () => void;
  menuOpen: boolean;
};

export default function Header({
  onMenuToggle,
  menuOpen,
}: HeaderProps): JSX.Element {
  const headerData = getHeaderData();
  const { ref, shouldAnimate, animationClass } =
    useAnimateOnView<HTMLDivElement>('blur');

  if (!headerData) {
    return <></>;
  }

  return (
    <header
      className={clsx(
        'p-sm fixed top-0 z-50 w-full transition-colors duration-300',
        menuOpen ? 'bg-black' : 'bg-white',
      )}
    >
      {/* Animated Content Wrapper */}
      <div
        ref={ref}
        className={clsx(
          `grid w-full grid-cols-2 items-center justify-between lg:grid-cols-3 ${animationClass}`,
          shouldAnimate && 'animate-in',
        )}
      >
        {/* CTA Button */}
        <div className='hidden w-full justify-start lg:flex'>
          <a
            href={headerData.cta.url}
            className={clsx(
              menuOpen
                ? 'pointer-events-none text-transparent'
                : 'header-link pointer-events-auto hidden text-black lg:block',
            )}
          >
            {headerData.cta.label}
          </a>
        </div>

        {/* Logo */}
        <div className='flex w-full justify-start lg:justify-center'>
          <AnimatedLogo menuOpen={menuOpen} />
        </div>

        {/* Menu Button */}
        <div className='flex w-full justify-end'>
          <button
            onClick={onMenuToggle}
            className={clsx(
              'header-link',
              menuOpen ? 'text-white' : 'text-black',
            )}
          >
            {menuOpen ? 'close menu' : 'menu'}
          </button>
        </div>
      </div>
    </header>
  );
}
