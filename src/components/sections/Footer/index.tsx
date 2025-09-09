import { type JSX } from 'react';
import { getFooterData } from '@/utils/linecheck';
import FooterNewsletter from './FooterNewsletter';
import FooterNav from './FooterNav';
import FooterCredits from './FooterCredits';

export default function Footer(): JSX.Element {
  const footerData = getFooterData();

  if (!footerData) {
    return <></>;
  }

  return (
    <footer className='bg-black px-[10px]'>
      <div className='gap-md flex flex-col'>
        {/* Newsletter Section */}
        <FooterNewsletter newsletter={footerData.newsletter} />

        {/* Navigation Section */}
        <FooterNav menus={footerData.menus} social={footerData.social} />

        {/* Credits Section */}
        <FooterCredits
          credits={footerData.credits}
          partnersLogo={footerData.partnersLogo}
        />
      </div>
    </footer>
  );
}
