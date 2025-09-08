import { type JSX } from 'react';
import { clsx } from 'clsx';
import parse from 'html-react-parser';
import { getNewsData } from '@/utils/linecheck';
import { useAnimateOnView } from '@/hooks/useAnimateOnView';
import NewsCarousel from './NewsCarousel';

export default function News(): JSX.Element {
  const newsData = getNewsData();
  const { ref, shouldAnimate, animationClass } =
    useAnimateOnView<HTMLDivElement>('blur-slide');

  if (!newsData) {
    return <></>;
  }

  // we will need to remove the mb-120 class when we have the carousel
  return (
    <section className='section-padding mb-120'>
      <div
        ref={ref}
        className={clsx(
          `gap-md flex flex-col ${animationClass}`,
          shouldAnimate && 'animate-in',
        )}
      >
        <div className='gap-sm flex flex-col'>
          <h2 className='news-title'>{newsData.title}</h2>
          <div className='news-rich-text-container'>
            <div className='news-rich-text'>{parse(newsData.description)}</div>
          </div>
        </div>

        {/* NewsCarousel will be added here later */}
        <NewsCarousel />
      </div>
    </section>
  );
}
