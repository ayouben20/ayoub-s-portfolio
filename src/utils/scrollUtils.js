import { useEffect } from 'react';

/**
 * Custom hook that scrolls to top when component mounts
 * This should be used in all page components to ensure consistent behavior
 */
export const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}; 