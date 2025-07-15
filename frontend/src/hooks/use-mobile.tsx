import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Function to check if device is mobile
    const checkMobile = () => {
      // Check both width and touch capability
      const isTouchDevice = ('ontouchstart' in window || navigator.maxTouchPoints > 0);
      const isNarrowScreen = window.innerWidth < MOBILE_BREAKPOINT;
      
      // Consider a device mobile if it has touch capability OR narrow screen
      setIsMobile(isNarrowScreen || isTouchDevice);
    };
    
    // Set initial value
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Also listen for orientation change for mobile devices
    window.addEventListener('orientationchange', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  return !!isMobile;
}
