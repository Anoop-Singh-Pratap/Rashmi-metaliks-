import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useTransform, useScroll } from 'framer-motion';

interface ScrollySectionProps {
  children: React.ReactNode;
  onInView?: () => void;
  threshold?: number;
  margin?: string | number;
  once?: boolean;
}

/**
 * Enhanced ScrollySection component for triggering animations when scrolled into view
 * Used for scrollytelling effects with optimized performance
 */
const ScrollySection: React.FC<ScrollySectionProps> = ({ 
  children, 
  onInView, 
  threshold = 0.3,
  margin = "-100px", 
  once = false 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold,
    margin
  } as any); // Type assertion to avoid incompatible margin type
  
  const controls = useAnimation();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0.8]);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      if (onInView) onInView();
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, onInView, once]);
  
  return (
    <div 
      ref={ref} 
      className="min-h-[70vh] flex items-center relative overflow-hidden"
      style={{ 
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <motion.div 
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.8,
              ease: [0.17, 0.67, 0.83, 0.67] // Improved easing curve
            }
          }
        }}
        className="w-full relative z-10"
      >
        {children}
      </motion.div>
      
      {/* Optional subtle parallax background effect */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background/5 to-background/20 rounded-3xl opacity-30"
        style={{ y, opacity }}
      />
    </div>
  );
};

export default ScrollySection; 