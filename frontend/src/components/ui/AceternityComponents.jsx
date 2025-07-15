import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView, useMotionValue, useSpring, useMotionTemplate, useTransform } from "framer-motion";
import { cn } from "../../utils/cn";

// Glow animation element
export const Glow = ({ children, className = "", containerClassName = "" }) => {
  return (
    <div className={cn("relative", containerClassName)}>
      <div className={cn("absolute inset-0 rounded-3xl bg-rashmi-red/20 blur-xl animate-pulse", className)} />
      <div className="relative bg-background rounded-3xl p-4">{children}</div>
    </div>
  );
};

// 3D Card effect inspired by Aceternity UI
export const Card3D = ({ children, className = "", containerClassName = "" }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 }); // Track relative mouse position (0 to 1)
  
  const handleMouseMove = (e) => {
    const container = e.currentTarget.getBoundingClientRect();
    const xRel = (e.clientX - container.left) / container.width;
    const yRel = (e.clientY - container.top) / container.height;
    const x = xRel - 0.5;
    const y = yRel - 0.5;
    
    // Adjust sensitivity if needed (e.g., multiply x and y by a factor like 15 or 25)
    setRotate({ x: y * 20, y: x * -20 }); 
    setMousePosition({ x: xRel, y: yRel });
  };
  
  return (
    <div
      className={cn("relative perspective-3d group", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotate({ x: 0, y: 0 });
        setMousePosition({ x: 0.5, y: 0.5 }); // Reset mouse position
      }}
    >
      <motion.div
        className={cn("w-full rounded-xl", className)} // Removed transition-all duration-200, handled by framer-motion
        style={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          // Use spring animation for a more responsive feel
          transition: { type: "spring", stiffness: 200, damping: 20, mass: 0.5 }
        }}
      >
        {children}
        
        {/* Enhanced Red Lighting/Shine effect - Increased Intensity */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full rounded-xl opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300 pointer-events-none overflow-hidden z-10" // Added z-10 just in case
          )}
          style={{ 
            background: `radial-gradient(
              circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(235, 89, 81, 0.5) 0%, // Increased opacity from 0.3 to 0.5
              rgba(235, 89, 81, 0) 35%   // Faster fade-out (was 50%)
            )`,
          }}
        />
      </motion.div>
    </div>
  );
};

// RevealText component for text reveal animations
export const RevealText = ({ text, className = "", as = "div", delay = 0.2, duration = 0.5, staggerDelay = 0.05 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);
  
  // Split the text into words
  const words = text.split(" ");
  
  // Container variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay * i },
    }),
  };
  
  // Child variants (words)
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration,
      },
    },
  };
  
  const Component = as;
  
  return (
    <Component className={className}>
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={controls}
        className="inline-flex flex-wrap"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block mr-1"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </Component>
  );
};

// Shimmer button with hover effect
export const ShimmerButton = ({
  children,
  className,
  containerClassName,
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        "relative inline-flex overflow-hidden rounded-lg p-[1px] shimmer-effect",
        containerClassName
      )}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.button
        className={cn(
          "relative z-10 inline-flex items-center justify-center rounded-lg bg-rashmi-red px-6 py-3 text-white font-medium shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    </motion.div>
  );
};

// Floating Animation Component
export const FloatingAnimation = ({ 
  children, 
  className = "", 
  yOffset = 10, 
  duration = 3, 
  delay = 0 
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-yOffset, 0, -yOffset],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// Spotlight effect for hover 
export const Spotlight = ({ children, className = "" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (divRef.current) {
      const div = divRef.current;
      const rect = div.getBoundingClientRect();
      
      // Set CSS variable values directly on the element
      div.style.setProperty('--x', `${e.clientX - rect.left}px`);
      div.style.setProperty('--y', `${e.clientY - rect.top}px`);
    }
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="spotlight-effect"
        style={{ opacity, transition: "opacity 0.3s" }}
      />
      {children}
    </div>
  );
};

// Typewriter effect
export const TypewriterEffect = ({ words, className = "", cursorClassName = "" }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const word = words[currentWordIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setCurrentText(word.substring(0, currentText.length + 1));
        
        if (currentText.length === word.length) {
          // Start deleting after a pause
          setTimeout(() => {
            setIsDeleting(true);
          }, 1500);
        }
      } else {
        // Deleting
        setCurrentText(word.substring(0, currentText.length - 1));
        
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timer);
  }, [currentText, currentWordIndex, isDeleting, words]);
  
  return (
    <div className={cn("flex items-center", className)}>
      <span className="mr-1">{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className={cn("inline-block h-5 w-[2px] bg-rashmi-red", cursorClassName)}
      />
    </div>
  );
};

// Tabs Component System
export const Tabs = ({ defaultValue, className, children, onValueChange }) => {
  const [value, setValue] = useState(defaultValue);
  
  useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value, onValueChange]);
  
  // Provide context to child components
  const contextValue = {
    value,
    setValue
  };
  
  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// Create a context for Tabs state
const TabsContext = React.createContext(null);

// Hook to use Tabs context
const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs component");
  }
  return context;
};

export const TabsList = ({ className, children }) => {
  return (
    <div className={`inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground ${className || ''}`}>
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, className, children }) => {
  const { value: selectedValue, setValue } = useTabsContext();
  const isSelected = selectedValue === value;
  
  return (
    <button
      role="tab"
      aria-selected={isSelected}
      data-state={isSelected ? "active" : "inactive"}
      className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2
        text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2
        disabled:pointer-events-none disabled:opacity-50 tab-transition
        ${isSelected 
          ? 'bg-rashmi-red text-white shadow-sm' 
          : 'bg-transparent hover:bg-background/80 hover:text-foreground'
        } ${className || ''}
      `}
      onClick={() => setValue(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, className, children }) => {
  const { value: selectedValue } = useTabsContext();
  const isSelected = selectedValue === value;
  
  return isSelected ? (
    <motion.div
      role="tabpanel"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  ) : null;
}; 