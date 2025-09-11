import { type JSX } from 'react';
import { clsx } from 'clsx';
import parse from 'html-react-parser';
import { getWelcomeData } from '@/utils/linecheck';
import { useAnimateOnView } from '@/hooks/useAnimateOnView';
import ReadMore from '@/components/ui/ReadMore';

export default function Welcome(): JSX.Element {
  const welcomeData = getWelcomeData();
  const { ref, shouldAnimate, animationClass } =
    useAnimateOnView<HTMLDivElement>('blur-slide');

  if (!welcomeData) {
    return <></>;
  }

  return (
    <div
      ref={ref}
      className={clsx(
        `gap-md flex flex-col ${animationClass}`,
        shouldAnimate && 'animate-in',
      )}
    >
      <div className='gap-sm flex flex-col'>
        <h2 className='welcome-title'>{welcomeData.title}</h2>
        <div className='rich-text-container'>
          <ReadMore
            text={parse(welcomeData.richText)}
            textClass='rich-text'
            maxLines={5}
          />
        </div>
      </div>
      <div className='gap-sm flex flex-col sm:flex-row'>
        {welcomeData.ctas.map((cta, index) => (
          <a
            key={index}
            href={cta.url}
            className={`cta-btn-${cta.style}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {cta.label}
          </a>
        ))}
      </div>
    </div>
  );
}
