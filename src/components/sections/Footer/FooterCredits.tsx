import { type JSX } from 'react';
import type {
  FooterCredits as FooterCreditsType,
  SocialLink,
  FooterPartnersLogo,
} from '@/types/linecheck';

type FooterCreditsProps = {
  credits: FooterCreditsType;
  social: SocialLink[];
  partnersLogo: FooterPartnersLogo;
};

export default function FooterCredits({
  credits,
  social,
  partnersLogo,
}: FooterCreditsProps): JSX.Element {
  return (
    <section className='footer-credits'>
      <div className='gap-md flex flex-col'>
        {/* Social Links */}
        <div className='gap-sm flex flex-col'>
          <h4 className='font-arial-narrow-regular text-[15px] leading-[15px] tracking-[-0.15px] text-white uppercase'>
            Follow us
          </h4>
          <nav className='gap-sm flex flex-wrap'>
            {social.map((item, index) => (
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

        {/* Partners Logo */}
        <div className='gap-sm flex flex-col'>
          <h4 className='font-arial-narrow-regular text-[15px] leading-[15px] tracking-[-0.15px] text-white uppercase'>
            {partnersLogo.label}
          </h4>
          <a
            href={partnersLogo.url}
            className='inline-block'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src={partnersLogo.logoSvg}
              alt='Music Innovation Hub'
              className='h-8 w-auto'
            />
          </a>
        </div>

        {/* Copyright and Credits */}
        <div className='gap-sm flex flex-col'>
          <p className='text-sm text-white'>{credits.copyright}</p>
          <p className='text-sm text-white'>
            <a
              href={credits.bylineUrl}
              className='hover:text-accent transition-colors'
              target='_blank'
              rel='noopener noreferrer'
            >
              {credits.byline}
            </a>
          </p>

          {/* Design Credit */}
          <p className='text-sm text-white'>
            <a
              href={credits.design.url}
              className='hover:text-accent transition-colors'
              target='_blank'
              rel='noopener noreferrer'
            >
              {credits.design.label}
            </a>
          </p>

          {/* Code Credits */}
          <div className='gap-sm flex flex-wrap'>
            {credits.code.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className='hover:text-accent text-sm text-white transition-colors'
                target='_blank'
                rel='noopener noreferrer'
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
