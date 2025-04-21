import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook that scrolls to top when component mounts or route changes
 * This should be used in all page components to ensure consistent behavior
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    };

    // Execute scroll immediately
    scrollToTop();

    // Also add it to the next frame to ensure it works with transitions
    requestAnimationFrame(scrollToTop);

    // And a small timeout as a fallback
    const timeoutId = setTimeout(scrollToTop, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]); // Re-run when pathname changes
}; 