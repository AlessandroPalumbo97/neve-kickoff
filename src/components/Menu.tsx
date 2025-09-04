import { type JSX, useState } from 'react';
import { clsx } from 'clsx';
import { getHeaderData } from '../utils/linecheck';

// Inline arrow component that can change color
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 57 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M42.43 24.511c-.758.826-1.517.55-1.241-.412.483-1.376 1.241-2.752 2.069-3.99 2.62-4.196-4.414-6.122-21.517-6.053H1.535c-1.38 0-2.621-3.165 0-3.165h19.93c17.103 0 25.103-1.582 22.62-4.815-1.034-1.513-2.068-3.095-2.827-4.746-.759-1.513.138-1.788 1.38-.55 4.068 4.196 8.689 8.598 13.585 11.075 1.035.481.966.825.207 1.238-4.965 2.545-9.586 6.878-14 11.418'
      fill='currentColor'
    />
  </svg>
);

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Menu({ isOpen, onClose }: MenuProps): JSX.Element {
  const headerData = getHeaderData();
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  if (!headerData) {
    return <></>;
  }

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div
      className={clsx(
        'fixed top-[40px] right-0 bottom-0 left-0 z-40 bg-black transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      {/* Menu items */}
      <div className='flex h-full items-center justify-center'>
        <ul className='text-center'>
          {headerData.menu.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openItems.has(index);

            return (
              <li key={index} className='mb-8 last:mb-0'>
                {hasChildren ? (
                  // Accordion item with children
                  <div>
                    <button
                      onClick={() => toggleItem(index)}
                      className='menu-link hover:text-accent-contrast flex items-center justify-center gap-4 text-white'
                    >
                      <span>{item.label}</span>
                      <span className='text-2xl'>{isOpen ? '−' : '+'}</span>
                    </button>

                    {/* Children items */}
                    {isOpen && (
                      <ul className='mt-4 space-y-2'>
                        {item.children!.map((child, childIndex) => (
                          <li key={childIndex}>
                            <a
                              href={child.url || '#'}
                              className='menu-link hover:text-accent-contrast text-[50px] text-white'
                              onClick={
                                child.disabled
                                  ? (e) => e.preventDefault()
                                  : undefined
                              }
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  // Regular item with arrow on hover
                  <a
                    href={item.url || '#'}
                    className='menu-link group items-center gap-4'
                    onClick={
                      item.disabled ? (e) => e.preventDefault() : undefined
                    }
                  >
                    <span className='group-hover:text-accent-contrast inline-block text-white transition-all duration-300 group-hover:-translate-x-6'>
                      {item.label}
                    </span>
                    <ArrowRightIcon className='group-hover:text-accent-contrast inline-block h-[22px] w-auto flex-shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100' />
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
