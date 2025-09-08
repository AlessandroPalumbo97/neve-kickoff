import { type JSX, useState, useEffect } from 'react';
import { clsx } from 'clsx';
import Logotype from '@/assets/icons/Logotype';
import Pictogram from '@/assets/icons/Pictogram';
import { useAnimateOnView } from '@/hooks/useAnimateOnView';

type AnimatedLogoProps = {
  menuOpen: boolean;
};

export default function AnimatedLogo({
  menuOpen,
}: AnimatedLogoProps): JSX.Element {
  const [showLogotype, setShowLogotype] = useState(true);
  const {
    ref: logoRef,
    shouldAnimate,
    animationClass,
  } = useAnimateOnView<HTMLElement>('blur-slide');

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogotype((prev) => !prev);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <figure
      ref={logoRef}
      className={clsx(
        `relative flex h-6 w-20 items-center justify-center ${animationClass}`,
        shouldAnimate && 'animate-in',
      )}
    >
      {/* Logotype */}
      <div
        className={clsx(
          'absolute transition-opacity duration-2000',
          showLogotype ? 'opacity-100' : 'opacity-0',
        )}
      >
        <Logotype
          className={clsx(
            'h-6 w-20 transition-colors duration-300',
            menuOpen ? 'text-white' : 'text-black',
          )}
        />
      </div>

      {/* Pictogram */}
      <div
        className={clsx(
          'absolute transition-opacity duration-2000',
          !showLogotype ? 'opacity-100' : 'opacity-0',
        )}
      >
        <Pictogram
          className={clsx(
            'h-6 w-20 transition-colors duration-300',
            menuOpen ? 'text-white' : 'text-black',
          )}
        />
      </div>
    </figure>
  );
}
