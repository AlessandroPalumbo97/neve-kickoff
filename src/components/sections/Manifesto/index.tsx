import { type JSX } from 'react';
import parse from 'html-react-parser';
import { getManifestoData } from '@/utils/linecheck';
import { useAnimateOnView } from '@/hooks/useAnimateOnView';
import ReadMore from '../../ui/ReadMore';

export default function Manifesto(): JSX.Element {
  const manifestoData = getManifestoData();
  const { ref, shouldAnimate, animationClass } =
    useAnimateOnView<HTMLDivElement>('blur-slide');

  if (!manifestoData) {
    return <></>;
  }

  return (
    <section className='section-padding'>
      <div className='gap-md grid grid-cols-1 flex-col items-end sm:grid-cols-2'>
        {/* Left Column - Image */}
        <div className='w-full'>
          <figure>
            <img
              src={manifestoData.image.src}
              srcSet={manifestoData.image.srcset.join(', ')}
              sizes='(max-width: 640px) 100vw, 50vw'
              alt={manifestoData.title}
              className='aspect-square h-auto w-full object-cover lg:aspect-auto'
            />
          </figure>
        </div>

        {/* Right Column - Content */}
        <div
          ref={ref}
          className={`gap-md flex w-full flex-col ${animationClass} ${
            shouldAnimate && 'animate-in'
          }`}
        >
          {/* Title */}
          <div className='gap-sm flex w-full flex-col'>
            <h2 className='font-arial-narrow-regular text-[20px] leading-[18px] tracking-[-0.6px] uppercase'>
              {manifestoData.title}
            </h2>

            {/* Excerpt with ReadMore */}
            <div className='welcome-rich-text-container'>
              <ReadMore
                text={parse(manifestoData.excerpt)}
                textClass='welcome-rich-text pb-[3px]'
                maxLines={5}
              />
            </div>
          </div>

          {/* CTA Button */}
          <a
            href={manifestoData.cta.url}
            className='cta-btn-primary w-full sm:w-fit'
            target='_blank'
            rel='noopener noreferrer'
          >
            {manifestoData.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
