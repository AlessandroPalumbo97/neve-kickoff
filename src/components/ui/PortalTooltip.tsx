import { type JSX, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';

type PortalTooltipProps = {
  children: React.ReactNode;
  content: string;
  place?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
};

export default function PortalTooltip({
  children,
  content,
  place = 'bottom',
  className,
}: PortalTooltipProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({
    left: '50%',
    top: 'auto',
  });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;

    switch (place) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - 10;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + 10;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - 10;
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + 10;
        break;
    }

    // Calculate arrow position to always point to the trigger center
    let arrowLeft = '50%';
    let arrowTop = 'auto';

    switch (place) {
      case 'bottom':
        // Calculate where the trigger center is relative to the tooltip
        const triggerCenterX = triggerRect.left + triggerRect.width / 2;
        const arrowX = triggerCenterX - left;
        // Keep arrow within tooltip bounds but prioritize pointing to trigger
        arrowLeft = `${Math.max(8, Math.min(arrowX, tooltipRect.width - 8))}px`;
        break;
      case 'top':
        const triggerCenterXTop = triggerRect.left + triggerRect.width / 2;
        const arrowXTop = triggerCenterXTop - left;
        arrowLeft = `${Math.max(8, Math.min(arrowXTop, tooltipRect.width - 8))}px`;
        break;
      case 'left':
        const triggerCenterY = triggerRect.top + triggerRect.height / 2;
        const arrowY = triggerCenterY - top;
        arrowTop = `${Math.max(8, Math.min(arrowY, tooltipRect.height - 8))}px`;
        arrowLeft = 'auto';
        break;
      case 'right':
        const triggerCenterYRight = triggerRect.top + triggerRect.height / 2;
        const arrowYRight = triggerCenterYRight - top;
        arrowTop = `${Math.max(8, Math.min(arrowYRight, tooltipRect.height - 8))}px`;
        arrowLeft = 'auto';
        break;
    }

    // Store original position for arrow calculation
    const originalLeft = left;
    const originalTop = top;

    // Ensure tooltip stays within viewport bounds
    if (left < 10) left = 10;
    if (left + tooltipRect.width > viewportWidth - 10) {
      left = viewportWidth - tooltipRect.width - 10;
    }
    if (top < 10) top = 10;
    if (top + tooltipRect.height > viewportHeight - 10) {
      top = viewportHeight - tooltipRect.height - 10;
    }

    // Recalculate arrow position after viewport adjustments
    const leftOffset = left - originalLeft;
    const topOffset = top - originalTop;

    switch (place) {
      case 'bottom':
      case 'top':
        const adjustedArrowX = parseFloat(arrowLeft) - leftOffset;
        arrowLeft = `${Math.max(8, Math.min(adjustedArrowX, tooltipRect.width - 8))}px`;
        break;
      case 'left':
      case 'right':
        const adjustedArrowY = parseFloat(arrowTop) - topOffset;
        arrowTop = `${Math.max(8, Math.min(adjustedArrowY, tooltipRect.height - 8))}px`;
        break;
    }

    setPosition({ top, left });
    setArrowPosition({ left: arrowLeft, top: arrowTop });
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleResize = () => updatePosition();
      const handleScroll = () => {
        updatePosition();
        // Close tooltip on scroll
        setIsOpen(false);
      };

      // Close tooltip on various events that might indicate carousel movement
      const handleTouchStart = () => setIsOpen(false);
      const handleTouchMove = () => setIsOpen(false);
      const handleMouseDown = () => setIsOpen(false);

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mousedown', handleMouseDown);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('mousedown', handleMouseDown);
      };
    }
  }, [isOpen, place]);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    // For mobile devices, toggle tooltip on click
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={clsx('cursor-pointer', className)}
      >
        {children}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={tooltipRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="bg-tooltip-body fixed z-[9999] w-[35vw] max-w-[300px] min-w-[200px] rounded-none p-3 font-['Arial_Narrow',sans-serif] text-[15px] leading-[15px] tracking-[-0.6px] text-white"
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            {content}
            {/* Arrow pointing to trigger */}
            <div
              className='absolute h-0 w-0'
              style={{
                ...(place === 'bottom' && {
                  top: '-8px',
                  left: arrowPosition.left,
                  transform: 'translateX(-50%)',
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderBottom: '8px solid #333333',
                }),
                ...(place === 'top' && {
                  bottom: '-8px',
                  left: arrowPosition.left,
                  transform: 'translateX(-50%)',
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '8px solid #333333',
                }),
                ...(place === 'left' && {
                  right: '-8px',
                  top: arrowPosition.top,
                  transform: 'translateY(-50%)',
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderLeft: '8px solid #333333',
                }),
                ...(place === 'right' && {
                  left: '-8px',
                  top: arrowPosition.top,
                  transform: 'translateY(-50%)',
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderRight: '8px solid #333333',
                }),
              }}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
