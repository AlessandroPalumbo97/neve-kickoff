import './App.css';
import { type JSX, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { loadLinecheckData } from './utils/linecheck';
import Header from './components/Header';
import Menu from './components/Menu';
import SiteContent from './components/SiteContent';

function App(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [overlayFadeOut, setOverlayFadeOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

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

      <main>
        <Header onMenuToggle={toggleMenu} menuOpen={menuOpen} />
        <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <SiteContent />
      </main>
    </>
  );
}

export default App;
