import { type JSX } from 'react';
import type { FooterNewsletter as FooterNewsletterType } from '@/types/linecheck';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';

type FooterNewsletterProps = {
  newsletter: FooterNewsletterType;
};

export default function FooterNewsletter({
  newsletter,
}: FooterNewsletterProps): JSX.Element {
  return (
    <section className='footer-newsletter border-accent lg:pt-xl pt-lg pb-lg border-b'>
      <div className='gap-md flex flex-col'>
        <h3 className='font-arial-narrow-regular text-[20px] leading-[18px] tracking-[-0.6px] text-white uppercase'>
          {newsletter.label}
        </h3>
        <a
          href={newsletter.url}
          className='group inline-block w-full transition-all duration-500 sm:w-fit'
          target='_blank'
          rel='noopener noreferrer'
        >
          <span className='font-davinci-regular text-[35px] leading-[38.5px] tracking-[-1.05px] text-white sm:text-[70px] sm:leading-[77px] sm:tracking-[-2.1px]'>
            {newsletter.cta}
            <ArrowRightIcon className='footer-newsletter-cta-arrow text-accent-contrast sm:ml-md mb-1 ml-[15px] h-[13px] w-[30px] transition-all duration-500 group-hover:text-white sm:mb-2 sm:h-[25px] sm:w-[57px] sm:group-hover:translate-x-4' />
          </span>
        </a>
      </div>
    </section>
  );
}
