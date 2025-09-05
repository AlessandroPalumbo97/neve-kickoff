import { type JSX } from 'react';
import Welcome from './Welcome';
import Gallery from './Gallery';

export default function WelcomeGallery(): JSX.Element {
  return (
    <section className='section-padding gap-lg flex flex-col'>
      <Welcome />
      <Gallery />
    </section>
  );
}
