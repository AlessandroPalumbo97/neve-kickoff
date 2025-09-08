import { type JSX } from 'react';
import { clsx } from 'clsx';
import { getNewsData } from '@/utils/linecheck';
import { useAnimateOnView } from '@/hooks/useAnimateOnView';
import NewsCarouselFlickity from './NewsCarouselFlickity';
import ReadMore from '../ui/ReadMore';

export default function News(): JSX.Element {
  const newsData = getNewsData();
  const { ref, shouldAnimate, animationClass } =
    useAnimateOnView<HTMLDivElement>('blur-slide');

  if (!newsData) {
    return <></>;
  }

  return (
    <section className='section-padding'>
      <div
        ref={ref}
        className={clsx(
          `gap-md flex flex-col ${animationClass}`,
          shouldAnimate && 'animate-in',
        )}
      >
        <div className='gap-sm flex flex-col'>
          <h2 className='news-title'>{newsData.title}</h2>
          <ReadMore
            text={newsData.description}
            textClass='news-rich-text pb-[6px]'
            maxLines={5}
          />
        </div>

        <NewsCarouselFlickity />
      </div>
    </section>
  );
}
