import { type JSX } from 'react';
import { clsx } from 'clsx';
import { getHeaderData } from '../utils/linecheck';
import AnimatedLogo from './AnimatedLogo';

type HeaderProps = {
  onMenuToggle: () => void;
  menuOpen: boolean;
};

export default function Header({
  onMenuToggle,
  menuOpen,
}: HeaderProps): JSX.Element {
  const headerData = getHeaderData();

  if (!headerData) {
    return <></>;
  }

  return (
    <header
      className={clsx(
        'fixed top-0 z-50 flex w-full items-center justify-between p-[10px] transition-colors duration-300',
        menuOpen ? 'bg-black' : 'bg-white',
      )}
    >
      {/* CTA Button */}
      <a
        href={headerData.cta.url}
        className={clsx(
          menuOpen
            ? 'pointer-events-none text-transparent'
            : 'header-link hover-underline pointer-events-auto text-black',
        )}
      >
        {headerData.cta.label}
      </a>

      {/* Logo - Absolutely centered */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <AnimatedLogo menuOpen={menuOpen} />
      </div>

      {/* Menu Button */}
      <button
        onClick={onMenuToggle}
        className={clsx(
          'header-link hover-underline',
          menuOpen ? 'text-white' : 'text-black',
        )}
      >
        {menuOpen ? 'close menu' : 'menu'}
      </button>
    </header>
  );
}
