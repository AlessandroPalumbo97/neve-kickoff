import React, { useState, useRef, useEffect } from 'react';
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
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        // Check if text overflows by comparing scroll height to client height
        const hasOverflow =
          textRef.current.scrollHeight > textRef.current.clientHeight;
        setShowButton(hasOverflow);
      }
    };

    // Check overflow after component mounts
    const timeout = setTimeout(checkOverflow, 100);

    return () => clearTimeout(timeout);
  }, [text, maxLines]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

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
            display: expanded ? 'block' : '-webkit-box',
            WebkitLineClamp: expanded ? 'unset' : maxLines,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {text}
        </div>
        {showButton && (
          <button
            className='welcome-read-more-btn'
            type='button'
            onClick={toggleExpanded}
            onTouchStart={(e) => e.stopPropagation()}
            style={{
              touchAction: 'manipulation',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none',
            }}
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
