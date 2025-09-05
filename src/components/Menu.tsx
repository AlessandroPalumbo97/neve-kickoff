import { type JSX, useState } from 'react';
import { clsx } from 'clsx';
import { getHeaderData } from '../utils/linecheck';
import type { MenuItem } from '../types/linecheck';

// Inline SVG components for plus and minus icons
const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 32 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M14.922 26.828v-8.344q0-1.406-1.406-1.406H4.375c-.234 0-.375-.094-.375-.234s0-.282.047-.328l.375-.985c.14-.422.375-.61.75-.61h8.344q1.406 0 1.406-1.405V4.375c0-.234.094-.375.234-.375s.281 0 .328.047l.985.375c.422.14.61.375.61.75v8.344q0 1.406 1.405 1.406h9.141c.234 0 .375.094.375.281 0 0 0 .047-.047.047 0 .094-.047.14-.047.234l-.328 1.032c-.14.375-.375.562-.75.562h-8.344q-1.406 0-1.406 1.406v9.141c0 .234-.094.375-.281.375 0 0-.047 0-.047-.047-.094 0-.14-.047-.234-.047l-1.032-.328c-.375-.14-.562-.375-.562-.75'
      fill='currentColor'
    />
  </svg>
);

const MinusIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 32 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='m4.047 16.478.375-.913c.14-.391.375-.565.75-.565h22.453c.234 0 .375.087.375.26 0 0 0 .044-.047.044 0 .087-.047.13-.047.218l-.328.956c-.14.348-.375.522-.75.522H4.375C4.141 17 4 16.913 4 16.783s0-.261.047-.305'
      fill='currentColor'
    />
  </svg>
);

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
        'fixed top-[40px] right-0 bottom-0 left-0 z-40 bg-black transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      {/* Menu items */}
      <div className='flex h-full items-center justify-center'>
        <ul className='-mt-[40px] flex flex-col items-center justify-center gap-[10px] text-center lg:gap-0'>
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
                      className='menu-link group items-center gap-4'
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
                    {isOpen && <MenuChildren children={item.children!} />}
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
