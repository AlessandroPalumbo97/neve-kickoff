import { type JSX } from 'react';
import Hero from './Hero';
import Welcome from './Welcome';

export default function SiteContent(): JSX.Element {
  return (
    <div>
      <Hero />
      <Welcome />
    </div>
  );
}
