import { type JSX } from 'react';
import type {
  FooterMenus as FooterMenusType,
  SocialLink,
} from '@/types/linecheck';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa';

type FooterNavProps = {
  menus: FooterMenusType;
  social: SocialLink[];
};

export default function FooterNav({
  menus,
  social,
}: FooterNavProps): JSX.Element {
  return (
    <section className='footer-menus pt-lg pb-md lg:pb-xl'>
      <div className='gap-lg lg:gap-sm grid grid-cols-1 sm:grid-cols-4 sm:gap-y-[120px] lg:grid-cols-6'>
        {/* Primary Menu */}
        <div className='gap-md flex flex-col'>
          <nav className='gap-md flex flex-col'>
            {menus.primary.map((item, index) =>
              item.disabled ? (
                <span
                  key={index}
                  className='footer-nav-style-a footer-nav-label-gray'
                >
                  {item.label}
                </span>
              ) : (
                <a
                  key={index}
                  href={item.url}
                  className='hover:text-accent-contrast footer-nav-style-a text-white transition-colors'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>

        {/* Meeting & Festival Menu */}
        <div className='gap-md flex flex-col'>
          <h4 className='footer-nav-style-a footer-nav-label-gray'>
            {menus.meetingFestival.label}
          </h4>
          <nav className='gap-md flex flex-col'>
            {menus.meetingFestival.items.map((item, index) => (
              <div key={index} className='gap-sm flex flex-col'>
                {item.disabled ? (
                  <span className='footer-nav-style-a footer-nav-label-gray'>
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.url}
                    className='hover:text-accent-contrast footer-nav-style-a text-white transition-colors'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {item.label}
                  </a>
                )}
                {item.children && (
                  <div className='gap-sm flex flex-col'>
                    {item.children.map((child, childIndex) =>
                      child.disabled ? (
                        <span
                          key={childIndex}
                          className='footer-nav-style-b footer-nav-label-gray'
                        >
                          {child.label}
                        </span>
                      ) : (
                        <a
                          key={childIndex}
                          href={child.url}
                          className='hover:text-accent-contrast footer-nav-style-b text-white transition-colors'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {child.label}
                        </a>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Info Menu */}
        <div className='gap-md flex flex-col'>
          <h4 className='footer-nav-style-a footer-nav-label-gray'>
            {menus.info.label}
          </h4>
          <nav className='gap-sm flex flex-col'>
            {menus.info.items.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className='hover:text-accent-contrast footer-nav-style-b text-white transition-colors'
                target='_blank'
                rel='noopener noreferrer'
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Legal Menu */}
        <div className='gap-md flex flex-col'>
          <h4 className='footer-nav-style-a footer-nav-label-gray'>
            {menus.legal.label}
          </h4>
          <nav className='gap-sm flex flex-col'>
            {menus.legal.items.map((item, index) =>
              item.disabled ? (
                <span
                  key={index}
                  className='footer-nav-style-b footer-nav-label-gray'
                >
                  {item.label}
                </span>
              ) : (
                <a
                  key={index}
                  href={item.url}
                  className='hover:text-accent-contrast footer-nav-style-b text-white transition-colors'
                  target={item.target || '_blank'}
                  rel='noopener noreferrer'
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>

        {/* Empty Column - Only on lg+ screens */}
        <div className='hidden lg:block'></div>

        {/* Social Links */}
        <div className='gap-md flex w-full flex-col sm:col-span-4 lg:col-span-1'>
          <h4 className='font-arial-narrow-regular text-[20px] leading-[18px] tracking-[-0.6px] text-white uppercase'>
            Follow us
          </h4>
          <nav className='gap-md flex flex-wrap'>
            {social.map((item, index) => {
              const getSocialIcon = (label: string) => {
                switch (label.toLowerCase()) {
                  case 'facebook':
                    return <FaFacebook className='h-6 w-6' />;
                  case 'instagram':
                    return <FaInstagram className='h-6 w-6' />;
                  case 'linkedin':
                    return <FaLinkedin className='h-6 w-6' />;
                  case 'tiktok':
                    return <FaTiktok className='h-6 w-6' />;
                  default:
                    return <span className='text-sm'>{item.label}</span>;
                }
              };

              return (
                <a
                  key={index}
                  href={item.url}
                  className='hover:text-accent-contrast w-fit text-white transition-colors'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={item.label}
                >
                  {getSocialIcon(item.label)}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
