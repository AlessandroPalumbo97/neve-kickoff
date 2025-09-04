import { type JSX } from 'react';
import { clsx } from 'clsx';

type AnimatedLogoProps = {
  menuOpen: boolean;
};

export default function AnimatedLogo({
  menuOpen,
}: AnimatedLogoProps): JSX.Element {
  return (
    <figure className='flex h-6 items-center'>
      <span
        className={clsx(
          'font-arial-narrow-bold uppercase transition-colors duration-300',
          menuOpen ? 'text-white' : 'text-black',
        )}
        style={{
          transform: 'scaleY(1.2)', // Stretch on Y axis
          lineHeight: '1',
        }}
      >
        linecheck
      </span>
    </figure>
  );
}
