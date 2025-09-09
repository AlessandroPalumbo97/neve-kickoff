import { type JSX } from 'react';
import type {
  FooterCredits as FooterCreditsType,
  FooterPartnersLogo,
} from '@/types/linecheck';
import { useAnimateOnView } from '@/hooks/useAnimateOnView';
import { clsx } from 'clsx';
import MusicInnovationHubIcon from '@/assets/icons/MusicInnovationHubIcon';

type FooterCreditsProps = {
  credits: FooterCreditsType;
  partnersLogo: FooterPartnersLogo;
};

export default function FooterCredits({
  credits,
  partnersLogo,
}: FooterCreditsProps): JSX.Element {
  const partnersRef = useAnimateOnView<HTMLDivElement>('blur-slide');
  const creditsRef = useAnimateOnView<HTMLDivElement>('blur-slide');

  return (
    <section className='footer-credits pt-md pb-xl sm:pt-lg'>
      <div className='gap-lg grid grid-cols-1 sm:grid-cols-2'>
        {/* Partners Logo Column */}
        <div
          ref={partnersRef.ref}
          className={clsx(
            'gap-md flex flex-col',
            partnersRef.animationClass,
            partnersRef.shouldAnimate && 'animate-in',
          )}
        >
          <h4 className='footer-nav-style-b text-white'>
            {partnersLogo.label}
          </h4>
          <a
            href={partnersLogo.url}
            className='group hover:text-accent-contrast inline-block text-white transition-colors duration-300'
            target='_blank'
            rel='noopener noreferrer'
          >
            <MusicInnovationHubIcon className='h-8 w-auto' />
          </a>
        </div>

        {/* Credits Column */}
        <div
          ref={creditsRef.ref}
          className={clsx(
            'gap-sm flex flex-col',
            creditsRef.animationClass,
            creditsRef.shouldAnimate && 'animate-in',
          )}
        >
          {/* Copyright and Byline Row */}
          <p className='footer-nav-style-b text-white'>
            {credits.copyright}{' '}
            <a
              href={credits.bylineUrl}
              className='hover:text-accent-contrast underline transition-colors'
              target='_blank'
              rel='noopener noreferrer'
            >
              {credits.byline}
            </a>
          </p>

          {/* Design and Code Row */}
          <p className='footer-nav-style-b text-white'>
            <a
              href={credits.design.url}
              className='hover:text-accent-contrast underline transition-colors'
              target='_blank'
              rel='noopener noreferrer'
            >
              {credits.design.label}
            </a>
            {'. '}
            Code by{' '}
            {credits.code.map((item, index) => (
              <span key={index}>
                <a
                  href={item.url}
                  className='hover:text-accent-contrast underline transition-colors'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {item.label}
                </a>
                {index < credits.code.length - 1 && ' + '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
