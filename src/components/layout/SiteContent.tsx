import { type JSX } from 'react';
import Hero from '@/components/sections/Hero';
import WelcomeGallery from '@/components/sections/WelcomeGallery';

export default function SiteContent(): JSX.Element {
  return (
    <div>
      <Hero />
      <WelcomeGallery />
    </div>
  );
}
