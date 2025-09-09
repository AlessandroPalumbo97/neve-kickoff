import { type JSX } from 'react';
import { getCrosslinksData } from '@/utils/linecheck';
import CrosslinkBlock from './CrosslinkBlock';

export default function Crosslinks(): JSX.Element {
  const crosslinksData = getCrosslinksData();

  if (!crosslinksData || !Array.isArray(crosslinksData)) {
    return <></>;
  }

  return (
    <section className='crosslinks-section section-padding'>
      <div className='crosslinks-grid gap-sm grid grid-cols-1 sm:grid-cols-2'>
        {crosslinksData.map((crosslink, index) => (
          <CrosslinkBlock key={index} crosslink={crosslink} />
        ))}
      </div>
    </section>
  );
}
