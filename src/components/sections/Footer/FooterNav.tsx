import { type JSX } from 'react';
import type { FooterMenus as FooterMenusType } from '@/types/linecheck';

type FooterNavProps = {
  menus: FooterMenusType;
};

export default function FooterNav({ menus }: FooterNavProps): JSX.Element {
  return (
    <section className='footer-menus'>
      <div className='gap-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
        {/* Primary Menu */}
        <div className='gap-sm flex flex-col'>
          <h4 className='font-arial-narrow-regular text-[15px] leading-[15px] tracking-[-0.15px] text-white uppercase'>
            Menu
          </h4>
          <nav className='gap-xs flex flex-col'>
            {menus.primary.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className={
                  item.disabled
                    ? 'cursor-not-allowed text-gray-500'
                    : 'hover:text-accent text-white transition-colors'
                }
                {...(item.disabled
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Meeting & Festival Menu */}
        <div className='gap-sm flex flex-col'>
          <h4 className='font-arial-narrow-regular text-[15px] leading-[15px] tracking-[-0.15px] text-white uppercase'>
            {menus.meetingFestival.label}
          </h4>
          <nav className='gap-xs flex flex-col'>
            {menus.meetingFestival.items.map((item, index) => (
              <div key={index} className='gap-xs flex flex-col'>
                <a
                  href={item.url}
                  className='hover:text-accent text-white transition-colors'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {item.label}
                </a>
                {item.children && (
                  <div className='gap-xs ml-4 flex flex-col'>
                    {item.children.map((child, childIndex) => (
                      <a
                        key={childIndex}
                        href={child.url}
                        className='hover:text-accent text-sm text-gray-300 transition-colors'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Info Menu */}
        <div className='gap-sm flex flex-col'>
          <h4 className='font-arial-narrow-regular text-[15px] leading-[15px] tracking-[-0.15px] text-white uppercase'>
            {menus.info.label}
          </h4>
          <nav className='gap-xs flex flex-col'>
            {menus.info.items.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className='hover:text-accent text-white transition-colors'
                target='_blank'
                rel='noopener noreferrer'
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Legal Menu */}
        <div className='gap-sm flex flex-col'>
          <h4 className='font-arial-narrow-regular text-[15px] leading-[15px] tracking-[-0.15px] text-white uppercase'>
            {menus.legal.label}
          </h4>
          <nav className='gap-xs flex flex-col'>
            {menus.legal.items.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className={
                  item.disabled
                    ? 'cursor-not-allowed text-gray-500'
                    : 'hover:text-accent text-white transition-colors'
                }
                {...(item.disabled
                  ? {}
                  : {
                      target: item.target || '_blank',
                      rel: 'noopener noreferrer',
                    })}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
