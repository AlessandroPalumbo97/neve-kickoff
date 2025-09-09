import { type JSX } from 'react';
import Hero from '@/components/sections/Hero';
import WelcomeGallery from '@/components/sections/WelcomeGallery';
import Crosslinks from '@/components/sections/Crosslinks';
import News from '@/components/sections/News';
import Manifesto from '@/components/sections/Manifesto';
import Tickets from '@/components/sections/Tickets';

export default function SiteContent(): JSX.Element {
  return (
    <div>
      <Hero />
      <WelcomeGallery />
      <Crosslinks />
      <News />
      <Manifesto />
      <Tickets />
    </div>
  );
}
