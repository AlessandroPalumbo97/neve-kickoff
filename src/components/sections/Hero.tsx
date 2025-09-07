import { type JSX } from 'react';
import { getHeroData } from '@/utils/linecheck';

export default function Hero(): JSX.Element {
  const heroData = getHeroData();

  if (!heroData) {
    return <></>;
  }

  return (
    <section className='relative h-screen w-full overflow-hidden pt-[44px]'>
      {/* Background Image */}
      <div className='px-sm pb-sm absolute inset-0'>
        <img
          src={heroData.images.desktop.src}
          srcSet={heroData.images.desktop.srcset.join(', ')}
          alt=''
          className='h-full w-full object-cover object-center'
        />
      </div>

      {/* Content Overlay */}
      <div className='px-sm pb-sm relative z-10 flex h-full items-center justify-center'>
        <div className='text-center text-white'>
          <h1 className='hero-section-title'>{heroData.title}</h1>
          <p className='hero-section-subtitle'>{heroData.subtitle}</p>
        </div>
      </div>
    </section>
  );
}
