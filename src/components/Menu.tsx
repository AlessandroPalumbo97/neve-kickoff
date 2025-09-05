import { type JSX, useState } from 'react';
import { clsx } from 'clsx';
import { getHeaderData } from '../utils/linecheck';
import type { MenuItem } from '../types/linecheck';
import PlusIcon from '../assets/icons/PlusIcon';
import MinusIcon from '../assets/icons/MinusIcon';
import ArrowRightIcon from '../assets/icons/ArrowRightIcon';

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

// Recursive component for handling nested children
type MenuChildrenProps = {
  children: MenuItem[];
  level?: number;
};

const MenuChildren = ({
  children,
  level = 0,
}: MenuChildrenProps): JSX.Element => {
  return (
    <ul className={clsx('space-y-2', level === 0 && 'mt-4')}>
      {children.map((child, childIndex) => {
        const hasChildren = child.children && child.children.length > 0;

        return (
          <li
            className={clsx(
              'leading-[18px] tracking-[-0.6px]',
              level === 1 && 'm-0 grid grid-cols-2',
            )}
            key={childIndex}
          >
            {hasChildren ? (
              // Child with its own children - render recursively
              <div className={clsx(level === 1 && 'col-start-2 text-left')}>
                <a
                  href={child.url || '#'}
                  className={clsx(
                    'menu-link-child',
                    child.disabled && 'menu-link-child-disabled',
                  )}
                  onClick={
                    child.disabled ? (e) => e.preventDefault() : undefined
                  }
                >
                  {child.label}
                </a>
                <MenuChildren children={child.children!} level={level + 1} />
              </div>
            ) : (
              // Regular child without children
              <a
                href={child.url || '#'}
                className={clsx(
                  'menu-link-child',
                  child.disabled && 'menu-link-child-disabled',
                  level === 1 && 'col-start-2 text-left',
                )}
                onClick={child.disabled ? (e) => e.preventDefault() : undefined}
              >
                {child.label}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default function Menu({ isOpen }: MenuProps): JSX.Element {
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
        'fixed top-[44px] right-0 bottom-0 left-0 z-40 bg-black transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      {/* Menu items */}
      <div className='flex h-full items-center justify-center'>
        <ul className='gap-sm -mt-[40px] flex flex-col items-center justify-center text-center lg:gap-0'>
          {headerData.menu.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openItems.has(index);

            return (
              <li key={index} className='mb1 last:mb-0'>
                {hasChildren ? (
                  // Accordion item with children
                  <div>
                    <button
                      onClick={() => toggleItem(index)}
                      className='menu-link group gap-sm items-center'
                    >
                      <span className='group-hover:text-accent-contrast inline-block text-white'>
                        {item.label === 'Meeting&Festival' ? (
                          <>
                            Meeting
                            <br className='sm:hidden' />
                            &Festival
                          </>
                        ) : (
                          item.label
                        )}
                      </span>
                      {isOpen ? (
                        <MinusIcon className='group-hover:text-accent-contrast menu-link-icon' />
                      ) : (
                        <PlusIcon className='group-hover:text-accent-contrast menu-link-icon' />
                      )}
                    </button>

                    {/* Children items */}
                    <div
                      className={clsx(
                        'overflow-hidden transition-all duration-300 ease-in-out',
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
                      )}
                    >
                      <MenuChildren children={item.children!} />
                    </div>
                  </div>
                ) : (
                  // Regular item with arrow on hover
                  <a
                    href={item.url || '#'}
                    className='menu-link group items-center'
                    onClick={
                      item.disabled ? (e) => e.preventDefault() : undefined
                    }
                  >
                    <span className='group-hover:text-accent-contrast menu-link-arrow-label inline-block translate-x-0 text-white transition-all duration-300 lg:group-hover:-translate-x-6'>
                      {item.label}
                      <ArrowRightIcon className='group-hover:text-accent-contrast menu-link-arrow' />
                    </span>
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
