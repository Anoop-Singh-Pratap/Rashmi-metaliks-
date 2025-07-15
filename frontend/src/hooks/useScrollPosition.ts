import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * Hook that returns true if the target element is scrolled out of view (above the viewport).
 * Requires a Ref to the target element placed just below the area that should trigger the scrolled state.
 */
export const useScrollTrigger = (targetRef: RefObject<Element>): boolean => {
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Triggered when the target is NOT intersecting (i.e., scrolled above viewport)
        setIsTriggered(!entry.isIntersecting);
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: '0px', 
        threshold: 0, // Trigger as soon as even 1px is out of view
      }
    );

    const currentElement = targetRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [targetRef]); // Re-run if the target ref changes

  return isTriggered;
}; 