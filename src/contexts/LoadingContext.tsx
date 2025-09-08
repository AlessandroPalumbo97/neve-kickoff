import {
  type JSX,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

type LoadingContextType = {
  isOverlayGone: boolean;
  setOverlayGone: (gone: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

type LoadingProviderProps = {
  children: JSX.Element;
  overlayVisible: boolean;
  overlayFadeOut: boolean;
};

export function LoadingProvider({
  children,
  overlayVisible,
  overlayFadeOut,
}: LoadingProviderProps): JSX.Element {
  const [isOverlayGone, setIsOverlayGone] = useState(false);

  useEffect(() => {
    if (overlayFadeOut) {
      // Start animations during the fade-out phase (after 200ms of the 700ms transition)
      const timeout = setTimeout(() => {
        setIsOverlayGone(true);
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [overlayFadeOut]);

  // Reset when overlay becomes visible again
  useEffect(() => {
    if (overlayVisible && !overlayFadeOut) {
      setIsOverlayGone(false);
    }
  }, [overlayVisible, overlayFadeOut]);

  return (
    <LoadingContext.Provider
      value={{ isOverlayGone, setOverlayGone: setIsOverlayGone }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading(): LoadingContextType {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
