import React, { useEffect, useRef, useState } from 'react';
import PlusIcon from '@/assets/icons/PlusIcon';
import MinusIcon from '@/assets/icons/MinusIcon';

interface ReadMoreProps {
  text: string | React.ReactNode;
  textClass: string;
  maxLines: number;
}

export default function ReadMore({
  text,
  textClass,
  maxLines = 3,
}: ReadMoreProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const el = textRef.current as HTMLElement;
      if (el) {
        // Add 5px tolerance to account for line-height/font-size mismatch
        const hasOverflow = el.scrollHeight > el.clientHeight + 5;
        setIsOverflowing(hasOverflow);
        // Reset expanded state on resize to allow re-evaluation
        setExpanded(false);
      }
    };

    // Check on mount and when text/maxLines change
    checkOverflow();

    // Add resize listener
    window.addEventListener('resize', checkOverflow);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [text, maxLines]);

  return (
    <>
      {/* Show the full text on larger screens */}
      <div className='hidden sm:block'>
        <div className={textClass}>{text}</div>
      </div>
      {/* Show the clamped text on smaller screens */}
      <div className='block sm:hidden'>
        <div
          ref={textRef}
          className={textClass}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: expanded ? 'unset' : maxLines,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {text}
        </div>
        {isOverflowing && (
          <button
            className='welcome-read-more-btn'
            type='button'
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Read less' : 'Read more'}
            {expanded ? (
              <MinusIcon className='ml-2 h-[35px] w-auto' />
            ) : (
              <PlusIcon className='ml-2 h-[35px] w-auto' />
            )}
          </button>
        )}
      </div>
    </>
  );
}
