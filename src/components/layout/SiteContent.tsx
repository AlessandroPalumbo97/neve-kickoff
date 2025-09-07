import { type JSX } from 'react';
import Hero from '@/components/sections/Hero';
import WelcomeGallery from '@/components/sections/WelcomeGallery';
import Crosslinks from '@/components/sections/Crosslinks';

export default function SiteContent(): JSX.Element {
  return (
    <div>
      <Hero />
      <WelcomeGallery />
      <Crosslinks />
    </div>
  );
}
