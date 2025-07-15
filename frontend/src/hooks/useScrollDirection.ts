import { useState, useEffect, useRef } from 'react';

interface ScrollDirectionHookResult {
  scrollDirection: 'up' | 'down' | 'top';
  isScrolledPastThreshold: boolean; // Whether user scrolled past an initial threshold
}

export const useScrollDirection = (threshold: number = 10, hideThreshold: number = 100): ScrollDirectionHookResult => {
  const lastScrollYRef = useRef(0); // Use ref to store last scroll position
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'top'>('top');
  const [isScrolledPastThreshold, setIsScrolledPastThreshold] = useState(false);

  useEffect(() => {
    console.log('[useScrollDirection] Setting up effect...'); // DEBUG
    let ticking = false; 

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current; // Get value from ref

      const newIsScrolledPastThreshold = currentScrollY > threshold;
      if (newIsScrolledPastThreshold !== isScrolledPastThreshold) {
          setIsScrolledPastThreshold(newIsScrolledPastThreshold);
      }

      let newDirection: 'up' | 'down' | 'top' = scrollDirection;
      if (currentScrollY <= threshold) {
        newDirection = 'top';
      } else if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) {
        newDirection = 'down';
      } else if (currentScrollY < lastScrollY) {
        newDirection = 'up';
      } // Keep current direction otherwise
      
      if (newDirection !== scrollDirection) {
          setScrollDirection(newDirection);
      }

      console.log(`[useScrollDirection] CurrentY: ${currentScrollY}, LastY: ${lastScrollY}, Direction: ${newDirection}, PastThreshold: ${newIsScrolledPastThreshold}`); // DEBUG

      lastScrollYRef.current = currentScrollY; // Update ref value
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    console.log('[useScrollDirection] Listener added.'); // DEBUG

    // Initial check
    updateScrollDir();

    return () => {
      console.log('[useScrollDirection] Cleaning up listener.'); // DEBUG
      window.removeEventListener('scroll', onScroll);
    };

  // Only re-run the effect if the thresholds change
  }, [threshold, hideThreshold, isScrolledPastThreshold, scrollDirection]); 

  return { scrollDirection, isScrolledPastThreshold };
}; 