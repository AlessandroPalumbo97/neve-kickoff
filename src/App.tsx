import './App.css';
import { type JSX, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { loadLinecheckData } from './utils/linecheck';
import Layout from './components/Layout';

function App(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [overlayFadeOut, setOverlayFadeOut] = useState(false);

  useEffect(() => {
    let alive = true;
    loadLinecheckData()
      .then((d) => {
        if (!alive) return;
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      // Start fade-out, then unmount overlay after the transition
      setOverlayFadeOut(true);
      const timeout = setTimeout(() => setOverlayVisible(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  console.log(data);

  return (
    <>
      {overlayVisible && (
        <div
          className={clsx(
            'bg-accent fixed inset-0 z-50 transition-opacity duration-900 ease-out',
            overlayFadeOut ? 'opacity-0' : 'opacity-100',
          )}
        />
      )}

      <Layout>
        <div className='bg-accent-contrast flex min-h-screen w-full flex-row items-center justify-center'>
          <h1 className='text-accent font-davinci text-4xl'>Neve Kickoff</h1>
        </div>
        <div className='bg-accent-contrast flex min-h-screen w-full flex-row items-center justify-center'>
          <h1 className='text-accent font-davinci text-4xl'>Neve Kickoff</h1>
        </div>
      </Layout>
    </>
  );
}

export default App;
