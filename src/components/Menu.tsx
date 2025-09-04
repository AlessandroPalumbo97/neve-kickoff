import { type JSX } from 'react';
import { clsx } from 'clsx';
import { getHeaderData } from '../utils/linecheck';

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Menu({ isOpen, onClose }: MenuProps): JSX.Element {
  const headerData = getHeaderData();

  if (!headerData) {
    return <></>;
  }

  return (
    <div
      className={clsx(
        'fixed top-[40px] right-0 bottom-0 left-0 z-40 bg-black transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      {/* Menu items */}
      <div className='flex h-full items-center justify-center'>
        <nav className='text-center'>
          {headerData.menu.map((item, index) => (
            <div key={index}>
              <a
                href={item.url || '#'}
                className={clsx(
                  'menu-link hover:text-accent-contrast text-white',
                )}
                onClick={item.disabled ? (e) => e.preventDefault() : undefined}
              >
                {item.label}
              </a>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
