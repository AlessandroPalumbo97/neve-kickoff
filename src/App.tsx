import { type JSX, useEffect, useState, useRef } from 'react';
import { clsx } from 'clsx';
import { loadLinecheckData } from '@/utils/linecheck';
import Header from '@/components/layout/Header';
import Menu from '@/components/layout/Menu';
import SiteContent from '@/components/layout/SiteContent';
import { LoadingProvider } from '@/contexts/LoadingContext';

function App(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [overlayFadeOut, setOverlayFadeOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const savedScrollPosition = useRef<number>(0);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    let alive = true;
    loadLinecheckData()
      .then(() => {
        if (!alive) return;
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

  // Restore scroll position on page load
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }
  }, [loading]);

  // Save scroll position before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (!loading) {
      // Start fade-out, then unmount overlay after the transition
      setOverlayFadeOut(true);
      const timeout = setTimeout(() => setOverlayVisible(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  // Block scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      // Save current scroll position
      savedScrollPosition.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollPosition.current}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      // Use requestAnimationFrame to ensure DOM has updated before restoring scroll
      requestAnimationFrame(() => {
        window.scrollTo(0, savedScrollPosition.current);
      });
    }

    // Cleanup function to ensure styles are reset if component unmounts
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [menuOpen]);

  return (
    <LoadingProvider
      overlayVisible={overlayVisible}
      overlayFadeOut={overlayFadeOut}
    >
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
    </LoadingProvider>
  );
}

export default App;
