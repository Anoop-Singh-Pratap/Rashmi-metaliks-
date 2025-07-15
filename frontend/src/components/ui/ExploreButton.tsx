/**
 * ExploreButton Component
 * 
 * A visually attractive, animated button used for smooth page navigation to specific sections.
 * Typically used in hero/landing sections to encourage users to explore more content below.
 * 
 * Features:
 * - Smooth scrolling to target element with offset for better positioning
 * - Animated entrance with fade-in and slide-up effect
 * - Continuous bouncing animation on the arrow to draw attention
 * - Hover and tap animations for interactive feedback
 * - Customizable text and target element ID
 * - Color transitions on hover states
 * 
 * The component prevents default anchor behavior and implements custom smooth scrolling
 * with visual offset to ensure the target element is positioned correctly in the viewport.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface ExploreButtonProps {
  text: string;
  targetId: string;
  className?: string;
}

const ExploreButton: React.FC<ExploreButtonProps> = ({ 
  text,
  targetId,
  className = ""
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      // Get the element's position relative to the viewport
      const rect = element.getBoundingClientRect();
      
      // Get the current scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate the absolute position by adding the relative position to the current scroll position
      const absoluteTop = rect.top + scrollTop;
      
      // Scroll to the element with a slight offset for better visual
      window.scrollTo({
        top: absoluteTop - 100, // 100px offset from the top
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className={`w-full flex justify-center my-8 z-10 relative ${className}`}
    >
      <motion.a 
        href={`#${targetId}`} 
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <span className="mb-2">{text}</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="bg-rashmi-red/90 hover:bg-rashmi-red rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
        >
          <ArrowDown size={20} className="text-white" />
        </motion.div>
      </motion.a>
    </motion.div>
  );
};

export default ExploreButton;
