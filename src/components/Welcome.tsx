import { type JSX, useState } from 'react';
import parse from 'html-react-parser';
import { getWelcomeData } from '../utils/linecheck';
import PlusIcon from '../assets/icons/PlusIcon';
import MinusIcon from '../assets/icons/MinusIcon';

export default function Welcome(): JSX.Element {
  const welcomeData = getWelcomeData();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!welcomeData) {
    return <></>;
  }

  return (
    <section className='section-padding flex flex-col gap-[10px]'>
      <h2 className='welcome-title'>{welcomeData.title}</h2>
      <div className='welcome-rich-text-container'>
        <div
          className={`welcome-rich-text sm:!block ${
            !isExpanded ? 'line-clamp-5' : 'line-clamp-none'
          }`}
        >
          {parse(welcomeData.richText)}
        </div>
        <button
          className='welcome-read-more-btn'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Read less' : 'Read more'}
          {isExpanded ? (
            <MinusIcon className='ml-2 h-[35px] w-auto' />
          ) : (
            <PlusIcon className='ml-2 h-[35px] w-auto' />
          )}
        </button>
      </div>
      <div className='flex flex-col gap-[10px] sm:flex-row'>
        {welcomeData.ctas.map((cta, index) => (
          <a
            key={index}
            href={cta.url}
            className={`welcome-cta-${cta.style}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {cta.label}
          </a>
        ))}
      </div>
    </section>
  );
}
