import { type JSX } from 'react';
import Hero from './Hero';
import WelcomeGallery from './WelcomeGallery';

export default function SiteContent(): JSX.Element {
  return (
    <div>
      <Hero />
      <WelcomeGallery />
    </div>
  );
}
