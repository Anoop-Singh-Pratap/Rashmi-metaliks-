import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealText from '@/components/ui/RevealText';
import ExploreButton from '@/components/ui/ExploreButton';
import SEO from '@/components/SEO';
import { organizationSchema, generateFAQSchema } from '@/lib/schema';
import { motion, Variants, animate, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Award, Factory, Check, MapPin, FileText, Briefcase, Clock, Users, Globe, Target, Lightbulb, Rocket, BadgeCheck, Leaf, ChevronDown, CheckCircle2, TrendingUp, CheckSquare, ArrowUpRight, ArrowDown, Building, ChevronRight, ExternalLink, Eye, Flag, HardDrive, HelpCircle, Image, Info, Loader2, Mail, Map, Menu, Minus, Package, Phone, Plus, Shield, Star, X } from 'lucide-react';
import { throttle } from 'lodash'; // Add this import
import { Link } from 'react-router-dom';

// Add type definitions for Google Maps features
declare global {
  interface Window {
    flyToLocation: (position: {lat: number, lng: number}, zoom: number) => void;
    locations: {
      [key: string]: {
        position: {lat: number, lng: number};
        name: string;
        zoom: number;
        description?: string;
        embedUrl?: string;
      }
    };
    google: any;
    map: any;
  }
}

// StatCounter Component with optimized animations
interface StatCounterProps {
  value: number;
  duration?: number;
  format?: boolean;
}

const StatCounter: React.FC<StatCounterProps> = ({ value, duration = 2, format = false }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const node = nodeRef.current;
    
    const controls = animate(0, value, {
      duration,
      onUpdate(value) {
        if (node) {
          if (format && value > 1000) {
            // Format large numbers like 770000 as 770k
            node.textContent = (value / 1000).toFixed(0) + 'k';
          } else {
            node.textContent = Math.round(value).toString();
          }
        }
      },
      ease: "easeOut"
    });
    
    return () => controls.stop();
  }, [value, duration, format]);
  
  return <span ref={nodeRef}>0</span>;
};

// Market Share Counter for the progress bar
const MarketShareCounter = ({ to = 77 }: { to?: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();
    
    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);
      
      setCount(Math.floor(easedProgress * to));
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    
    const timeout = setTimeout(() => {
      requestAnimationFrame(updateCount);
    }, 800); // Start after 800ms delay
    
    return () => clearTimeout(timeout);
  }, [to]);
  
  return <span ref={countRef}>{count}%</span>;
};

// Feature indicator animation for better performance
const FeatureIndicator = ({ delay = 0 }: { delay?: number }) => (
  <span className="feature-indicator relative inline-block w-1 h-1 rounded-full bg-rashmi-red mr-2">
    <style dangerouslySetInnerHTML={{
      __html: `
        .feature-indicator::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: rgba(235, 89, 81, 0.3);
          animation: pulse 2s infinite;
          animation-delay: ${delay}s;
        }
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0.6; }
        }
      `
    }} />
  </span>
);

// Device detection for conditional rendering based on capability
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

const AboutRashmi = () => {
  const isMobile = useIsMobile();
  
  // Create a ref to track mouse movement with throttling
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Use throttling for mouse movement for better performance
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    }, 50), // Throttle to every 50ms for better performance
    []
  );
  
  // Update mouse position with throttling
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      handleMouseMove.cancel(); // Cancel any pending throttled calls
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);
  
  // Empty functions that were previously used for cursor but now just act as placeholders
  const textEnter = () => {};
  const textLeave = () => {};
  
  // Function for animating numbers
  const Counter = ({ value, label, duration = 2 }: { value: number, label: string, duration?: number }) => {
    const nodeRef = useRef(null);
    
    useEffect(() => {
      const node = nodeRef.current;
      
      const controls = animate(0, value, {
        duration,
        onUpdate(value) {
          if (node) {
            node.textContent = Math.round(value).toString();
          }
        },
        ease: "easeOut"
      });
      
      return () => controls.stop();
    }, [value, duration]);
    
    return (
      <div className="flex flex-col items-center">
        <span 
          ref={nodeRef} 
          className="text-3xl md:text-4xl font-bold text-rashmi-red"
        >
          0
        </span>
        <span className="text-sm text-muted-foreground mt-2">{label}</span>
      </div>
    );
  };
  
  // Add lazy loading for components
  const LazyComponent = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      // Create the observer once and with proper root margin to load earlier
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Set a minimum delay to avoid flickering
            const timeoutId = setTimeout(() => setIsVisible(true), Math.max(100, delay));
            observer.disconnect();
            return () => clearTimeout(timeoutId);
          }
        },
        { 
          threshold: 0.01, // Trigger with just 1% visibility for earlier loading
          rootMargin: "500px 0px" // Load content 500px before it comes into view
        }
      );
      
      if (ref.current) {
        observer.observe(ref.current);
      }
      
      return () => observer.disconnect();
    }, [delay]);
    
    // Ensure the component stays mounted once visible
    return (
      <div ref={ref} className="min-h-[150px]">
        {isVisible ? children : (
          <div className="w-full h-full min-h-[150px] flex items-center justify-center">
            {/* Subtle loading indicator */}
            <div className="p-4 rounded-lg bg-card/60 backdrop-blur-sm">
              <div className="w-6 h-6 border-2 border-rashmi-red/30 border-t-rashmi-red rounded-full animate-spin"></div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // SEO Schema for About page
  const aboutFAQSchema = generateFAQSchema([
    {
      question: "What makes Rashmi Metaliks the world's 2nd largest DI pipe manufacturer?",
      answer: "Rashmi Metaliks has achieved this position through our massive 770,000 MT annual production capacity, state-of-the-art manufacturing facilities, and commitment to quality with ISO certifications."
    },
    {
      question: "Where are Rashmi Metaliks manufacturing facilities located?",
      answer: "Our manufacturing facilities are strategically located in West Bengal, India, with advanced production lines for ductile iron pipes and other steel products."
    },
    {
      question: "What certifications does Rashmi Metaliks hold?",
      answer: "We are ISO 9001:2015 certified for quality management, ISO 14001:2015 for environmental management, and OHSAS 18001:2007 for occupational health & safety."
    }
  ]);

  return (
    <div className="min-h-screen">
      <SEO
        title="About Rashmi Metaliks | World's 2nd Largest DI Pipe Manufacturer | 770,000 MT Capacity"
        description="Learn about Rashmi Metaliks - World's 2nd largest DI pipe manufacturer with 770,000 MT annual capacity. ISO certified manufacturing facilities in West Bengal, India. Leading global steel manufacturer since 1984."
        keywords="Rashmi Metaliks, World's 2nd largest DI pipe manufacturer, 770000 MT capacity, steel production India, ISO certified pipes, ductile iron pipes manufacturer, largest ductile iron pipe company, biggest DI pipe manufacturer, West Bengal steel industry, global steel leader"
        canonicalUrl="/about-rashmi"
        schema={[organizationSchema, aboutFAQSchema]}
      />
      <Helmet>
        <style>{`
          .will-change-transform {
            will-change: transform;
          }
          .will-change-opacity {
            will-change: opacity;
          }
          .gpu-accelerated {
            transform: translateZ(0);
          }
          @media (prefers-reduced-motion: reduce) {
            .motion-reduce {
              transition: none !important;
              animation: none !important;
              transform: none !important;
            }
          }
          @keyframes expandWidth {
            from { width: 0; }
            to { width: 80px; }
          }
          .animate-expandWidth {
            animation: expandWidth 1s ease-out forwards;
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
          @keyframes ripple {
            0% { transform: scale(1); opacity: 0; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(2); opacity: 0; }
          }
          .group-hover\\:animate-ripple {
            animation: none;
          }
          .group:hover .group-hover\\:animate-ripple {
            animation: ripple 1.5s ease-out;
          }
          /* Fix for font smoothing */
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
          /* Fix for line clamp */
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-clamp: 2;
          }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-clamp: 3;
          }
          /* Improved product card hover effect */
          .product-card-hover {
            transition: transform 0.3s ease, box-shadow 0.4s ease;
          }
          .product-card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          /* Fix for light mode text readability */
          @media (prefers-color-scheme: light) {
            .text-muted-foreground {
              color: rgba(0, 0, 0, 0.7) !important;
            }
            .text-foreground {
              color: rgba(0, 0, 0, 0.9) !important;
            }
            p:not([class*="text-"]), h1:not([class*="text-"]), h2:not([class*="text-"]), h3:not([class*="text-"]), h4:not([class*="text-"]) {
              color: rgba(0, 0, 0, 0.9) !important;
            }
          }
        `}</style>
      </Helmet>
      <Header />
      <main>
        {/* Hero Section with Video Background */}
        <section className="relative h-screen overflow-hidden pt-20">
          {/* Local Video Background */}
          <div className="absolute inset-0 w-full h-full z-0">
            <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{ 
                  position: 'absolute', 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  top: 0, 
                  left: 0 
                }}
                src="/lovable-uploads/About-rashmi-header.mp4"
                title="Rashmi Metaliks Video Presentation"
                preload="auto"
                onCanPlay={(e) => {
                  // Force play on iOS
                  e.currentTarget.play().catch(error => console.log("Autoplay prevented:", error));
                }}
              />
            </div>
            {/* Dark overlay for better text visibility */}
            <div className="absolute inset-0 bg-black opacity-60"></div>
          </div>
          
          {/* Optimized Floating particles - reduced number for better performance */}
          <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
            {!isMobile && Array.from({ length: isMobile ? 5 : 10 }).map((_, index) => (
              <motion.div
                key={index}
                className="absolute rounded-full bg-rashmi-red/30 blur-sm gpu-accelerated will-change-transform"
                style={{
                  width: Math.random() * 12 + 4,
                  height: Math.random() * 12 + 4,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 80 - 40],
                  y: [0, Math.random() * 80 - 40],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: Math.random() * 15 + 10,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          {/* Grid overlay - CSS-based for better performance */}
          <div className="absolute inset-0 opacity-10 z-1">
            <div 
              className="grid grid-cols-6 md:grid-cols-12 grid-rows-6 md:grid-rows-12 h-full w-full"
              style={{ 
                backgroundSize: 'cover',
                backgroundImage: isMobile ? 'none' : 'linear-gradient(to right, rgba(235, 89, 81, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(235, 89, 81, 0.05) 1px, transparent 1px)'
              }}
            >
              {isMobile && Array.from({ length: 36 }).map((_, index) => (
                <div key={index} className="border border-rashmi-red/5"></div>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6 will-change-transform"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                  We <span className="text-rashmi-red">Transport</span> Water with <br/>
                  <span className="text-rashmi-red">Safety</span> and <span className="text-rashmi-red">Security</span>
                </h1>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto will-change-opacity"
              >
                Forging the future of infrastructure with precision, innovation, and environmental responsibility
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8"
              >
                <ExploreButton text="Discover Our Journey" targetId="company-overview" />
              </motion.div>
            </div>
          </div>
          
          {/* Scroll indicator with CSS animation for better performance */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center relative">
              <div className="w-1 h-2 bg-white rounded-full absolute animate-scrollIndicator"></div>
              <style dangerouslySetInnerHTML={{
                __html: `
                  @keyframes scrollIndicator {
                    0% { top: 2px; }
                    50% { top: 14px; }
                    100% { top: 2px; }
                  }
                  .animate-scrollIndicator {
                    animation: scrollIndicator 2s infinite ease-in-out;
                  }
                `
              }} />
            </div>
          </div>
        </section>

        {/* Company Overview - Optimized */}
        <section id="company-overview" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-rashmi-red font-medium mb-3">
                  <RevealText text="Our Company" />
                </div>
                <RevealText
                  text="World's 2nd Largest DI Pipe Manufacturer"
                  as="h2"
                  className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
                />
                
                <div className="space-y-4 text-muted-foreground">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                  >
                    <FeatureIndicator delay={0.1} />
                    Rashmi Metaliks Limited is a name synonymous with reliability & quality in India's iron & 
                    steel manufacturing industry. Incorporated in 2004 in West Bengal, we have expanded at an unbeatable 
                    CAGR of 62% to become one of the flagship companies of Rashmi Group.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                  >
                    <FeatureIndicator delay={0.2} />
                    We have a State-Of-The-Art Integrated Steel manufacturing facility comprised of Pellet, Sinter, 
                    Pig iron, Sponge Iron, Ductile Iron Pipe and Fittings, Billet, TMT & Wire Rod.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                  >
                    <FeatureIndicator delay={0.3} />
                    Today, Rashmi Metaliks stands as the largest manufacturer of DI Pipes & Fittings in India and 
                    holds the second position globally, with an annual production capacity of 7,70,000 Metric Tonnes 
                    of DI Pipes & 26,000 Metric Tonnes of DI Fittings.
                  </motion.p>
                </div>
                
                {/* Achievement Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  {[
                    { value: "7.7L MT", label: "Annual Pipe Capacity", color: "from-red-500/30 to-rashmi-red/50", icon: "🏭" },
                    { value: "62%", label: "Industry-Leading CAGR", color: "from-blue-500/30 to-indigo-500/50", icon: "📈" },
                    { value: "#2", label: "Global Ranking", color: "from-green-500/30 to-emerald-500/50", icon: "🌎" }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      className={`bg-card rounded-xl p-5 border border-border/40 shadow-sm relative overflow-hidden group gpu-accelerated`}
                      initial={{ opacity: 0, scale: 0.8, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.2 + 0.7, 
                        duration: 0.4,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      style={{ willChange: 'transform' }}
                    >
                      {/* Animated gradient background - for desktop only */}
                      {!isMobile && (
                        <motion.div 
                          className={`absolute inset-0 opacity-0 bg-gradient-to-br ${stat.color}`}
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 0.5 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      
                      {/* Stats content */}
                      <div className="relative z-10">
                        <motion.div 
                          className="flex items-center text-rashmi-red text-3xl font-bold mb-2"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + 0.9, duration: 0.5 }}
                          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                        >
                          <span className="mr-2 text-2xl" aria-hidden="true">{stat.icon}</span>
                          {stat.value}
                        </motion.div>
                        <motion.div 
                          className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + 1.1, duration: 0.5 }}
                        >
                          {stat.label}
                        </motion.div>
                      </div>
                      
                      {/* Light shine effect on hover - desktop only */}
                      {!isMobile && (
                        <motion.div 
                          className="absolute -inset-full h-full w-[120%] block transform -skew-x-12 from-transparent via-white to-transparent bg-gradient-to-r opacity-0 group-hover:opacity-10"
                          variants={{
                            hover: {
                              right: '-100%',
                              transition: { repeat: 0, duration: 0.8 }
                            }
                          }}
                          transition={{ duration: 0.8 }}
                          initial={{ left: '-100%' }}
                          whileHover="hover"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Image Side with optimized reveal effect and minified map */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative z-10 space-y-4">
                  <div className="overflow-hidden rounded-2xl transform">
                    <motion.div
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                      className="will-change-transform"
                    >
                    </motion.div>
                  </div>
                  
                  {/* Minified Map of Kolkata Office - with improved styling */}
                  <motion.div
                    className="mt-6 overflow-hidden rounded-2xl shadow-lg border border-border/40 bg-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="relative h-[500px]">
                      <iframe
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d883.801637926636!2d88.35795788894713!3d22.545083685715742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02771e63a35cf9%3A0xf4e31f075f3d4c91!2sRashmi%20Group!5e0!3m2!1sen!2sin!4v1744775898650!5m2!1sen!2sin`}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        loading="lazy" 
                        className="rounded-t-xl" // Apply rounding only to the top
                        title="Rashmi Kolkata Office Location"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      <div className="absolute top-2 right-2 z-10">
                        <a 
                          href="https://goo.gl/maps/xJZQThbkvqJXZMPQ9" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="bg-rashmi-red text-white text-xs px-2 py-1 rounded-full shadow-md hover:bg-rashmi-red/90 transition-colors duration-200"
                        >
                          View Larger
                        </a>
                      </div>
                    </div>
                    <div className="p-4 border-t border-border/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-rashmi-red mr-2 flex-shrink-0" />
                          <span className="text-sm font-medium truncate">Rashmi HQ - Kolkata</span>
                        </div>
                        <div className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                          22.545°N, 88.358°E
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-rashmi-red/5 rounded-full filter blur-3xl z-0"></div>
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-rashmi-red/5 rounded-full filter blur-3xl z-0"></div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CEO Section */}
        <section className="py-20 bg-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative z-10">
                  <div className="overflow-hidden rounded-2xl transform">
                    <motion.div
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                    >
                      <img 
                        src="/lovable-uploads/Ceo-pic.png" 
                        alt="Mr. Sunil Kumar Patwari, CEO of Rashmi Group" 
                        className="w-full rounded-2xl object-cover"
                      />
                    </motion.div>
                  </div>
                </div>
                
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-rashmi-red/5 rounded-full filter blur-3xl z-0"></div>
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-rashmi-red/5 rounded-full filter blur-3xl z-0"></div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute bottom-6 left-6 right-6 bg-background/80 backdrop-blur-md p-4 rounded-xl z-10 border border-border/20"
                >
                  <h3 className="text-xl font-semibold flex items-center">
                    <Globe className="w-5 h-5 text-rashmi-red mr-2" />
                    Chief Executive Officer
                  </h3>
                  <p className="text-sm text-muted-foreground">Transforming Rashmi Group into a global conglomerate</p>
                </motion.div>
              </motion.div>
              
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-6"
              >
                <div className="text-rashmi-red font-medium mb-3">
                  <RevealText text="Leadership" />
                </div>
                <RevealText
                  text="About our CEO"
                  as="h2"
                  className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
                />
                
                <motion.div 
                  className="space-y-4 text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <p>
                    Mr. Sunil Kumar Patwari, joined the family business which then was centered 
                    around the steel industry. Within a very short period of time, Mr. Patwari turned the greatest 
                    chapter in the group's history with his highly effective managerial and leadership skills.
                  </p>
                  <p>
                    His largest focus areas have been infusing the latest cutting-edge technology into the businesses 
                    and constantly innovate and produce world class products. He is the main reason why Rashmi Group 
                    has become a force to reckon with – not just in India, but so also in global markets.
                  </p>
                  <p>
                    Mr. Patwari has singlehandedly led the group towards its current transformation as a global business 
                    conglomerate. The technology adopted under his guidance is world class. This combined with the constant 
                    capacity expansion has led to market domination by Rashmi Group.
                  </p>
                </motion.div>
                
                {/* Key Achievements */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 bg-rashmi-red/10 p-1.5 rounded-full text-rashmi-red">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Technology Integration</h4>
                      <p className="text-sm text-muted-foreground">Implementing cutting-edge manufacturing processes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 bg-rashmi-red/10 p-1.5 rounded-full text-rashmi-red">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Global Expansion</h4>
                      <p className="text-sm text-muted-foreground">Strategic market penetration worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 bg-rashmi-red/10 p-1.5 rounded-full text-rashmi-red">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Product Innovation</h4>
                      <p className="text-sm text-muted-foreground">Continuous development of world-class products</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 bg-rashmi-red/10 p-1.5 rounded-full text-rashmi-red">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Capacity Expansion</h4>
                      <p className="text-sm text-muted-foreground">Driving growth through strategic capacity increase</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Quality & Certification */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-rashmi-red font-medium mb-3">
                <RevealText text="Quality Assurance" />
              </div>
              <RevealText
                text="International Standards & Certifications"
                as="h2"
                className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
              />
              <p className="text-muted-foreground">
                Maintaining quality as per international benchmarks, we make use of the most modern casting
                techniques for manufacturing that result in good-quality casting for transportation of potable 
                drinking water, raw water, and wastewater.
              </p>
            </div>
            
            {/* Certification Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-card rounded-xl p-6 border border-border/40 shadow-sm"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-rashmi-red/10 text-rashmi-red mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">ISO 9001:2015</h3>
                <p className="text-muted-foreground text-sm">
                  Quality Management System certified for consistent product quality and customer satisfaction.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-card rounded-xl p-6 border border-border/40 shadow-sm"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-rashmi-red/10 text-rashmi-red mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">EN 545 / ISO 2531</h3>
                <p className="text-muted-foreground text-sm">
                  European and international standards compliance for ductile iron pipe systems for water pipelines.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-card rounded-xl p-6 border border-border/40 shadow-sm"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-rashmi-red/10 text-rashmi-red mb-4">
                  <Factory className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ultra Mega Project</h3>
                <p className="text-muted-foreground text-sm">
                  Recognized by the Government of West Bengal for significant industrial contribution.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Video Journey Section */}
        <section className="relative h-screen overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full z-0">
            <video 
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay 
              muted 
              loop 
              playsInline
              preload="auto"
              onCanPlay={(e) => {
                // Force play on iOS
                e.currentTarget.play().catch(error => console.log("Autoplay prevented:", error));
              }}
            >
              <source src="/lovable-uploads/video-journey.mp4" type="video/mp4" />
            </video>
          </div>
          
          {/* Content that will fade out after 5 seconds */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center px-4"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 5, duration: 1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block text-rashmi-red font-medium mb-3 border border-rashmi-red/20 bg-rashmi-red/5 px-4 py-1 rounded-full"
              >
                Our Visual Story
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl font-display font-bold mb-6 text-white"
              >
                Experience the <span className="text-rashmi-red">Rashmi Journey</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-300 text-lg"
              >
                From humble beginnings to becoming a global leader - witness our growth, innovation, and commitment to excellence.
              </motion.p>
            </motion.div>
          </div>
        </section>
        
        {/* Enhanced Interactive Map Section */}
        <section className="py-24 bg-background relative overflow-visible">
          {/* Background subtle patterns */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-rashmi-red/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-rashmi-red/10 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Title */}
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-rashmi-red font-medium mb-3">
                <RevealText text="Global Reach" />
              </div>
              <RevealText
                text="Our Worldwide Presence"
                as="h2"
                className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
              />
              <p className="text-muted-foreground mb-10">
                With manufacturing facilities in West Bengal and a global distribution network, 
                our products reach over 40 countries across six continents.
              </p>
            </motion.div>
            
            {/* Map Component Wrapper */} 
            <motion.div 
              className="relative overflow-visible bg-muted/5 backdrop-blur-sm rounded-2xl border border-border/20 shadow-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ minHeight: "auto" }} // Removed marginBottom
            >
              <div className="w-full relative">
                <MapComponent />
              </div>
            </motion.div>
            
            {/* Removed spacer */}
            
            {/* Removed World Coverage Stat Counter */}
            
            {/* Removed Key market indicators */}
          </div>
        </section>
        
        {/* --- Enhanced 3D Parallax Cards Section (Core Strengths) --- */}
        <section 
          className="py-24 bg-gradient-to-b from-background to-muted/30 relative" 
          id="core-strengths"
          style={{ minHeight: '800px', overflow: 'visible', zIndex: 10 }}
        >
           {/* Background parallax effect */}
          <motion.div
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/cld-sample-5')", opacity: 0.1 }}
              animate={{ y: [-20, 20] }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
           >
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"></div>
           </motion.div>

           {/* Subtle background particles */}
           <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
             {Array.from({ length: 10 }).map((_, i) => (
               <motion.div
                 key={i}
                 className="absolute rounded-full bg-rashmi-red/10"
                 style={{
                   width: Math.random() * 6 + 2,
                   height: Math.random() * 6 + 2,
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                 }}
                 animate={{
                   x: [0, Math.random() * 50 - 25],
                   y: [0, Math.random() * 50 - 25],
                   opacity: [0.1, 0.2, 0.1],
                   scale: [1, Math.random() * 0.3 + 0.9, 1]
                 }}
                 transition={{
                   duration: Math.random() * 10 + 10,
                   repeat: Infinity,
                   repeatType: "reverse",
                   ease: "easeInOut"
                 }}
               />
             ))}
           </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Section Heading */}
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div 
                className="text-rashmi-red font-medium mb-3 inline-block"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <RevealText text="Core Strengths" />
              </motion.div>
              <div className="mb-6 relative">
                <RevealText
                  text="What Sets Us Apart"
                  as="h2"
                  className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
                />
                <motion.div
                  className="h-1 w-24 bg-gradient-to-r from-rashmi-red/80 to-rashmi-red/20 rounded-full mx-auto"
                  initial={{ width: 0 }}
                  animate={{ width: 120 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                  {/* Shimmering effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                    animate={{ x: [-100, 200] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                    style={{ opacity: 0.6 }}
                  />
                </motion.div>
              </div>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Our commitment to excellence, innovation, and customer satisfaction are the pillars that define Rashmi Metaliks' position as an industry leader.
              </motion.p>
            </motion.div>

            {/* Parallax Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "Advanced Manufacturing",
                  description: "State-of-the-art facilities with cutting-edge technology ensuring precision and quality in every product.",
                  icon: <Rocket className="h-12 w-12 text-rashmi-red" />,
                  color: "rgba(235, 89, 81, 0.1)",
                  images: ["https://images.unsplash.com/photo-1618761299062-ba2dbbcebd92?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"],
                  link: "/quality-assurance" 
                },
                {
                  title: "Quality Assurance",
                  description: "Rigorous testing and quality control processes that exceed industry standards to deliver exceptional products.",
                  icon: <BadgeCheck className="h-12 w-12 text-rashmi-red" />,
                  color: "rgba(235, 89, 81, 0.15)",
                  images: ["https://images.unsplash.com/photo-1620283085634-a10c02034ad5?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"],
                  link: "/quality-assurance" 
                },
                {
                  title: "Sustainable Practices",
                  description: "Environmentally conscious manufacturing processes that minimize our ecological footprint.",
                  icon: <Leaf className="h-12 w-12 text-rashmi-red" />,
                  color: "rgba(235, 89, 81, 0.1)",
                  images: ["https://images.unsplash.com/photo-1495170420372-1063986a9a8a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"],
                  link: "/sustainability" 
                }
              ].map((card, index) => {
                // Create state for this card's rotation effect
                const [rotation, setRotation] = useState({ x: 0, y: 0 });
                const [isHovered, setIsHovered] = useState(false);
                const cardRef = useRef<HTMLDivElement>(null);
                
                const handleMouseMove = useCallback(throttle((e: React.MouseEvent<HTMLDivElement>) => {
                  if (!cardRef.current || !isHovered) return;
                  
                  const rect = cardRef.current.getBoundingClientRect();
                  const centerX = rect.left + rect.width / 2;
                  const centerY = rect.top + rect.height / 2;
                  
                  const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 5;
                  const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 5;
                  
                  setRotation({
                    x: parseFloat(rotateX.toFixed(2)),
                    y: parseFloat(rotateY.toFixed(2))
                  });
                }, 16), [isHovered]);
                
                const resetRotation = () => {
                  setRotation({ x: 0, y: 0 });
                  setIsHovered(false);
                };
                
                return (
                  <motion.div 
                    key={index} 
                    ref={cardRef}
                    className="h-full relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.2) }}
                    style={{
                      transformStyle: "preserve-3d",
                      willChange: "transform"
                    }}
                  >
                    <motion.div
                      className="bg-card rounded-xl p-8 h-full shadow-lg border border-border/40 relative z-10"
                      style={{
                        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                        boxShadow: isHovered
                          ? "0 20px 30px rgba(0, 0, 0, 0.15)"
                          : "0 10px 20px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.1s linear, box-shadow 0.3s ease"
                      }}
                      onMouseMove={handleMouseMove}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={resetRotation}
                    >
                      <div
                        className="absolute inset-0 -z-10 transition-opacity duration-300 rounded-xl"
                        style={{
                          backgroundColor: card.color,
                          opacity: isHovered ? 0.7 : 0.5
                        }}
                      />

                      {card.images && card.images.length > 0 && (
                        <div className="absolute inset-0 -z-5 rounded-xl opacity-30">
                          <div
                            className="w-full h-full bg-cover bg-center rounded-xl"
                            style={{
                              backgroundImage: `url(${card.images[0]})`,
                              transform: isHovered ? 'scale(1.1)' : 'scale(1.05)',
                              transition: 'transform 0.3s ease'
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent rounded-xl" />
                        </div>
                      )}

                      <div
                        className="relative z-10 transition-transform duration-200"
                        style={{
                          transform: isHovered ? 'translateY(-5px)' : 'translateY(0)'
                        }}
                      >
                        <div className="mb-6 relative">
                          <div className="relative z-10">
                            {card.icon}
                          </div>
                        </div>

                        <h3
                          className="text-xl font-bold mb-3 transition-colors duration-300"
                          style={{
                            color: isHovered ? "#eb5951" : "var(--foreground)"
                          }}
                        >
                          {card.title}
                        </h3>

                        <p className="text-muted-foreground z-10 relative">
                          {card.description}
                        </p>

                        <div className="mt-4 pt-3 border-t border-border/20">
                          <Link to={card.link} className="text-rashmi-red flex items-center text-sm font-medium cursor-pointer">
                            <span>Learn more</span>
                            <motion.span
                              className="ml-1"
                              animate={{ x: isHovered ? 5 : 0 }}
                              transition={{ duration: 0.3 }}
                            >→</motion.span>
                          </Link>
                        </div>
                      </div>

                      <div
                        className="absolute bottom-0 left-0 h-1 bg-rashmi-red origin-left transition-transform duration-300"
                        style={{
                          transform: `scaleX(${isHovered ? 1 : 0})`,
                          width: '100%'
                        }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Optimized Statistics Section */}
        <section className="py-20 bg-rashmi-red/5 relative overflow-hidden">
          {/* Background elements - Optimized with CSS gradient */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-rashmi-red blur-[100px]"></div>
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-rashmi-red blur-[100px]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <motion.div
                className="mb-4 inline-block bg-rashmi-red/10 px-6 py-2 rounded-full border border-rashmi-red/20"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(235, 89, 81, 0.15)",
                  transition: { duration: 0.2 }
                }}
              >
                <span className="text-sm font-medium text-rashmi-red flex items-center">
                  <FeatureIndicator delay={0.1} />
                  Rashmi In Numbers
                </span>
              </motion.div>
              
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <RevealText
                  text="Our Performance At A Glance"
                  as="h2"
                  className="text-3xl md:text-4xl font-display font-bold text-foreground"
                />
                <motion.div
                  className="h-1 w-20 bg-gradient-to-r from-rashmi-red/80 to-rashmi-red/20 rounded-full mx-auto mt-5"
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </motion.div>
              
              {/* Animated Stats with improved transitions and conditional rendering for mobile */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
                {[
                  { value: 21, label: "Years of Excellence", suffix: "+", icon: <Clock className="h-5 w-5" />, color: "from-red-500/20 to-rashmi-red/50" },
                  { value: 62, label: "CAGR Growth", suffix: "%", icon: <Target className="h-5 w-5" />, color: "from-blue-500/20 to-indigo-500/50" },
                  { value: 770000, label: "Annual Production Capacity", suffix: "MT", format: true, icon: <Factory className="h-5 w-5" />, color: "from-green-500/20 to-emerald-500/50" },
                  { value: 40, label: "Export Countries", suffix: "+", icon: <Globe className="h-5 w-5" />, color: "from-purple-500/20 to-violet-500/50" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="relative cursor-pointer group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 50,
                      damping: 15
                    }}
                    whileHover="hover"
                  >
                    <div className="flex flex-col items-center relative z-10">
                      <motion.div
                        className={`w-16 h-16 rounded-full mb-4 bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}
                        initial={{ scale: 0, rotateZ: -10 }}
                        whileInView={{ scale: 1, rotateZ: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: index * 0.1 + 0.2, 
                          duration: 0.5, 
                          type: "spring",
                          stiffness: 200
                        }}
                        variants={{
                          hover: { 
                            scale: 1.1, 
                            boxShadow: "0 0 20px rgba(235, 89, 81, 0.3)",
                            rotateZ: 5,
                            transition: { duration: 0.3 }
                          }
                        }}
                        style={{ willChange: 'transform' }}
                      >
                        <motion.div 
                          className="text-white"
                          variants={{
                            hover: { scale: 1.2, transition: { duration: 0.3 } }
                          }}
                        >
                          {stat.icon}
                        </motion.div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-3xl md:text-4xl font-bold flex items-center bg-clip-text text-transparent bg-gradient-to-r from-rashmi-red to-red-600"
                        variants={{
                          hover: { scale: 1.05, transition: { duration: 0.3 } }
                        }}
                        style={{ willChange: 'transform' }}
                      >
                        <StatCounter 
                          value={stat.value} 
                          duration={2.5} 
                          format={stat.format}
                        />
                        <span>{stat.suffix}</span>
                      </motion.div>
                      <motion.div 
                        className="text-sm mt-2 font-medium"
                        variants={{
                          hover: { color: "#eb5951", transition: { duration: 0.3 } }
                        }}
                      >
                        {stat.label}
                      </motion.div>
                    </div>
                    
                    {/* Optimized background and particle effects */}
                    <motion.div 
                      className="absolute -inset-4 rounded-full bg-rashmi-red/5 -z-10 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      transition={{ duration: 0.5 }}
                      variants={{
                        hover: { 
                          scale: 1, 
                          backgroundColor: "rgba(235, 89, 81, 0.08)",
                          transition: { duration: 0.3 }
                        }
                      }}
                    />
                    
                    {/* Only render particles on non-mobile devices */}
                    {!isMobile && (
                      <>
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 rounded-full bg-rashmi-red/40 opacity-0"
                            style={{
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                            }}
                            variants={{
                              hover: {
                                opacity: [0, 0.8, 0],
                                y: [0, -Math.random() * 20 - 10],
                                x: [0, (Math.random() - 0.5) * 15],
                                scale: [0, 1, 0],
                                transition: {
                                  duration: 0.8 + Math.random() * 0.5,
                                  repeat: 2,
                                  repeatType: "loop",
                                  delay: Math.random() * 0.2
                                }
                              }
                            }}
                          />
                        ))}
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {/* Market Share Progress Bar with improved animation */}
              <motion.div 
                className="mt-20 max-w-4xl mx-auto relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">Market Share in Domestic DI Pipe Industry</h3>
                  <div className="text-rashmi-red text-5xl font-bold flex items-center justify-center">
                    <MarketShareCounter to={77} />
                  </div>
                </div>
                
                <div className="relative h-[60px] bg-card rounded-xl overflow-hidden border border-border/30 shadow-inner">
                  {/* Background pattern for progress bar */}
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%" className="text-rashmi-red">
                      <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
                    </svg>
                  </div>
                  
                  {/* Animated progress fill */}
                  <motion.div 
                    className="absolute h-full left-0 top-0 bg-gradient-to-r from-rashmi-red/90 to-rashmi-red flex items-center justify-end pr-4"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "77%" }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1.5, 
                      ease: [0.34, 1.56, 0.64, 1],
                      delay: 0.3 
                    }}
                  >
                    <span className="text-white font-bold relative z-10">77%</span>
                    
                    {/* Shine effect - animated gradient overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, delay: 1.8, ease: "easeInOut" }}
                    />
                  </motion.div>
                  
                  {/* Animated dots/markers */}
                  {[25, 50, 75, 100].map((mark) => (
                    <div 
                      key={mark} 
                      className="absolute top-0 bottom-0 flex flex-col items-center justify-between py-2"
                      style={{ left: `${mark}%`, transform: 'translateX(-50%)' }}
                    >
                      <div className="w-1 h-1 rounded-full bg-foreground/30"></div>
                      <div className="text-xs text-foreground/50 font-medium">{mark}%</div>
                      <div className="w-1 h-1 rounded-full bg-foreground/30"></div>
                    </div>
                  ))}
                </div>
                
                {/* Animated indicator particles */}
                <div className="absolute left-[77%] top-1/2 -translate-y-1/2">
                  <motion.div
                    className="w-4 h-4 rounded-full bg-rashmi-red -translate-x-1/2"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(235,89,81,0.7)",
                        "0 0 0 10px rgba(235,89,81,0)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Clients Section - Matching awards-grid from index.html */}
        <section className="section--awards-grid py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-rashmi-red/5 rounded-full filter blur-[120px]"></div>
            <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-rashmi-red/5 rounded-full filter blur-[120px]"></div>
          </div>
          
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-rashmi-red font-medium mb-3">
                <RevealText text="Our Valued Partners" />
              </div>
              <RevealText
                text="Clients Who Trust Us"
                as="h2"
                className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
              />
              <p className="text-muted-foreground mb-10">
                We're proud to work with leading organizations across various industries worldwide,
                providing them with reliable infrastructure solutions.
              </p>
            </div>
            
            {/* Awards grid with proper hover effects - grayscale to colored on hover */}
            <div className="awards-grid">
              {[
                { name: "ZETWERK", logo: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/logo/jrlepmykzuaqxpscyvvn" },
                { name: "KEC International", logo: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/logo/doqbbrczgajvialoques" },
                { name: "Larsen & Toubro", logo: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/logo/qakagnnhzabsa6cqigtt" },
                { name: "UP jal nigam", logo: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/logo/lnfhkijyh69seoiq3ydk" },
                { name: "SCL Infratech", logo: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/logo/tpaalsh4sq579houtpyp" },
                { name: "Kalpataru Group", logo: "https://res.cloudinary.com/dada5hjp3/image/upload/v1752836207/kalpataru_limited_logo_b5qmnt.jpg" },
                { name: "WPL", logo: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/logo/uaecaacuyg0xmvtsfror" },
                { name: "New Delhi Municipal Corporation", logo: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/logo/fj3df7oqoj3rtyvwubjf" },
                { name: "RIICO", logo: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/logo/qvlmznwoqjfyjv6clahk" },
                { name: "Gujarat Water Supply", logo: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/logo/k1uapmjvpcz2mgrmrlr6" },
              ].map((client, index) => (
                <div key={index} className="awards-grid__item">
                  <img 
                    src={client.logo} 
                    loading="lazy" 
                    width="250" 
                    height="120" 
                    alt={client.name} 
                    className={`awards-grid__image ${client.name === "RIICO" || client.name === "Gujarat Water Supply" ? "enlarged-logo" : ""}`}
                  />
                </div>
              ))}
            </div>

            {/* Add necessary CSS for the awards grid */}
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  .awards-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px;
                  }
                  
                  @media (min-width: 768px) {
                    .awards-grid {
                      grid-template-columns: repeat(3, 1fr);
                      gap: 20px;
                    }
                  }
                  
                  @media (min-width: 992px) {
                    .awards-grid {
                      grid-template-columns: repeat(5, 1fr);
                      gap: 24px;
                    }
                  }
                  
                  .awards-grid__item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--card, #ffffff);
                    border-radius: 12px;
                    padding: 16px;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
                    border: 1px solid rgba(0, 0, 0, 0.08);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    will-change: transform;
                  }
                  
                  .awards-grid__item:hover {
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
                  }
                  
                  .awards-grid__image {
                    max-width: 100%;
                    height: auto;
                    max-height: 80px;
                    object-fit: contain;
                    filter: grayscale(100%);
                    transition: filter 0.3s ease, transform 0.3s ease;
                  }
                  
                  .awards-grid__image.enlarged-logo {
                    max-height: 100px;
                    transform: scale(1.2);
                  }
                  
                  .awards-grid__item:hover .awards-grid__image {
                    filter: grayscale(0%);
                  }
                  
                  .awards-grid__item:hover .awards-grid__image.enlarged-logo {
                    transform: scale(1.3);
                  }
                `
              }}
            />
            
            {/* Client Testimonial - Temporarily commented out
            <motion.div
              className="mt-20 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-card border border-border/30 rounded-2xl p-8 md:p-10 shadow-lg">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-rashmi-red/20">
                      <img
                        src="/lovable-uploads/ceo-testimonial.jpg"
                        alt="Client Testimonial"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-4 text-rashmi-red">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-20">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                      </svg>
                    </div>
                    <blockquote className="text-lg md:text-xl italic mb-6 text-foreground">
                      Rashmi Group has been our trusted partner for over a decade. Their unwavering commitment to quality, 
                      timely delivery, and technical expertise has been crucial to our infrastructure projects across India.
                    </blockquote>
                    <div>
                      <div className="font-bold">Sanjeev Kumar</div>
                      <div className="text-sm text-muted-foreground">Chief Procurement Officer, National Infrastructure Development Corp.</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            */}
            
            {/* Client Stats - Enhanced with better animations */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { count: 200, label: "Projects Completed", suffix: "+" },
                { count: 85, label: "Long-term Clients", suffix: "%" },
                { count: 21, label: "Years of Trust", suffix: "+" },
                { count: 40, label: "Countries Served", suffix: "+" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "100px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ y: -8 }}
                >
                  <div className="bg-gradient-to-br from-card to-card/90 border border-border/40 rounded-xl p-6 text-center relative z-10 h-full flex flex-col items-center justify-center backdrop-blur-sm">
                    {/* Animated background */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-rashmi-red/5 z-0"></div>
                      {/* Animated Particles */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-24 h-24 rounded-full bg-rashmi-red/10"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            scale: Math.random() * 0.5 + 0.5,
                          }}
                          animate={{
                            y: [0, -30, 0],
                            x: [0, Math.random() * 10 - 5, 0],
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Number content */}
                    <div className="relative z-10">
                      <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-rashmi-red to-rashmi-red/80 mb-2 flex items-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            delay: index * 0.15 + 0.3,
                            duration: 0.8,
                            type: "spring",
                            bounce: 0.4
                          }}
                        >
                          <StatCounter value={stat.count} duration={2.5} />
                          <span className="inline-block ml-1">{stat.suffix}</span>
                        </motion.div>
                      </div>
                      <motion.div 
                        className="text-sm font-medium text-muted-foreground"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.5, duration: 0.4 }}
                      >
                        {stat.label}
                      </motion.div>
                    </div>
                    
                    {/* Bottom highlight bar */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-rashmi-red/80 to-transparent"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.6, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Modernized Call to Action with enhanced parallax effect */}
        <section className="relative py-32 overflow-hidden">
          {/* Parallax Background */}
          <div className="absolute inset-0 z-0">
            <motion.div 
              className="relative h-[120%] w-full"
              initial={{ y: 0 }}
              whileInView={{ y: -50 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Using factory image with gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1595231712325-9fedecef7575?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Factory Background" 
                className="w-full h-full object-cover opacity-20"
              />
            </motion.div>
          </div>
          
          {/* Subtle animated elements */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <motion.div 
              className="absolute top-1/3 right-1/4 w-64 h-64 bg-rashmi-red/10 rounded-full filter blur-[100px]"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "mirror" 
              }}
            />
            
            <motion.div 
              className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-rashmi-red/10 rounded-full filter blur-[100px]"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3] 
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "mirror",
                delay: 1
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <div 
                    className="inline-block mb-6"
                    onMouseEnter={textEnter}
                    onMouseLeave={textLeave}
                  >
                    <RevealText
                      text="Partner with Rashmi Group"
                      as="h2"
                      className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground"
                    />
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                    Join us in building infrastructure solutions that stand the test of time. 
                    Our expertise in iron & steel manufacturing ensures quality, sustainability, and excellence.
                  </p>
                </motion.div>
                
                {/* Trust Indicators - Fixed version with just one set of buttons and icons */}
                <div className="flex items-center justify-center gap-6 flex-wrap mt-12">
                  <motion.a 
                    href="/contact-us" 
                    className="px-8 py-4 bg-rashmi-red text-white rounded-full font-medium text-lg shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(235, 89, 81, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Our Team
                  </motion.a>
                  
                  <motion.a 
                    href="/#products" 
                    className="px-8 py-4 bg-transparent text-foreground border-2 border-rashmi-red/40 rounded-full font-medium text-lg transition-colors duration-300"
                    whileHover={{ 
                      borderColor: "rgba(235, 89, 81, 0.8)", 
                      color: "#eb5951",
                      backgroundColor: "rgba(235, 89, 81, 0.05)" 
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Our Products
                  </motion.a>
                </div>
                
                {/* Trust Indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mt-16">
                  {[
                    { icon: <Award className="w-6 h-6" />, text: "Award-Winning Quality" },
                    { icon: <Globe className="w-6 h-6" />, text: "Global Presence" },
                    { icon: <Clock className="w-6 h-6" />, text: "Reliable Delivery" },
                    { icon: <Check className="w-6 h-6" />, text: "Globally Certified" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      className="flex flex-col items-center group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.7 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1] // Use custom cubic bezier for smoother animation
                      }}
                      style={{
                        willChange: "transform, opacity"
                      }}
                    >
                      <div 
                        className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-rashmi-red/10 to-rashmi-red/30 text-rashmi-red mb-3 shadow-md relative overflow-hidden transform-gpu transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-rashmi-red/20 group-hover:to-rashmi-red/50"
                      >
                        {/* Icon with subtle bounce animation on hover */}
                        <div className="transform-gpu transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110">
                          {item.icon}
                        </div>
                        
                        {/* Add pulsating circle effect for visual enhancement */}
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100">
                          <div className="absolute inset-0 rounded-full scale-0 bg-rashmi-red/10 animate-trustPulse"></div>
                          <div className="absolute inset-0 rounded-full scale-0 bg-rashmi-red/5 animate-trustPulse animation-delay-200"></div>
                        </div>
                        
                        {/* Add subtle particle effects that appear on hover */}
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 overflow-hidden pointer-events-none">
                          {[...Array(3)].map((_, j) => (
                            <div 
                              key={j}
                              className="absolute w-1 h-1 rounded-full bg-rashmi-red/60"
                              style={{
                                top: `${50 + Math.cos(j * (Math.PI * 2) / 3) * 30}%`,
                                left: `${50 + Math.sin(j * (Math.PI * 2) / 3) * 30}%`,
                                animation: `particleEffect ${1 + j * 0.4}s ease-out infinite`,
                                animationDelay: `${j * 0.2}s`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Text with smooth underline animation */}
                      <div className="text-sm font-medium group-hover:text-rashmi-red transition-colors duration-300 relative">
                        {item.text}
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-rashmi-red/70 rounded-full group-hover:w-full transition-all duration-300 ease-out"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Add keyframes for the trust indicators animations */}
                <style dangerouslySetInnerHTML={{
                  __html: `
                    @keyframes trustPulse {
                      0% { transform: scale(0.5); opacity: 0.7; }
                      100% { transform: scale(1.5); opacity: 0; }
                    }
                    
                    @keyframes particleEffect {
                      0% { transform: scale(0) translate(0, 0); opacity: 0; }
                      25% { opacity: 1; }
                      100% { transform: scale(1) translate(0, -15px); opacity: 0; }
                    }
                    
                    .animation-delay-200 {
                      animation-delay: 200ms;
                    }
                  `
                }} />
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Timeline - Improved Section */}
        <section className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-rashmi-red font-medium mb-3">
                <RevealText text="Our Journey" />
              </div>
              <RevealText
                text="Timeline of Excellence"
                as="h2"
                className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
              />
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Tracing our path from inception to becoming a global leader in manufacturing excellence and innovation
              </p>
            </div>
            
            {/* Timeline Component - Enhanced with Quality Assurance Style */}
            <div className="relative max-w-6xl mx-auto">
              {/* Timeline center line with gradient effect */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-rashmi-red/30 via-rashmi-red to-rashmi-red/30 rounded-full z-0"
                style={{ willChange: "height" }}
              ></motion.div>
              
              {/* Timeline Items */}
              {[
                {
                  year: "2004",
                  title: "Founding in West Bengal",
                  description: "Rashmi Metaliks Limited was incorporated as one of the flagship companies of Rashmi Group.",
                  icon: <Briefcase className="w-5 h-5" />,
                  position: "left",
                  image: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/default%20metaliks/wpzp68xhqdbjndolgbnj"
                },
                {
                  year: "2008",
                  title: "First Expansion",
                  description: "Expanded operations with State-Of-The-Art Integrated Steel manufacturing facilities.",
                  icon: <Factory className="w-5 h-5" />,
                  position: "right",
                  image: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/default%20metaliks/wwuusfebg30hq3y1u1bl"
                },
                {
                  year: "2012",
                  title: "DI Pipe Production",
                  description: "Started production of Ductile Iron Pipes with initial capacity of 2,00,000 MT.",
                  icon: <Factory className="w-5 h-5" />,
                  position: "left",
                  image: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/default%20metaliks/yvlz3hucfxlwjrvy602x"
                },
                {
                  year: "2015",
                  title: "Ultra Mega Project Award",
                  description: "Recognized by the Government of West Bengal for industrial contribution.",
                  icon: <Award className="w-5 h-5" />,
                  position: "right",
                  image: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/default%20metaliks/lofyrwjm6dwe6kzyao9o"
                },
                {
                  year: "2018",
                  title: "Production Milestone",
                  description: "Reached 5,00,000 MT annual production capacity for DI pipes.",
                  icon: <TrendingUp className="w-5 h-5" />,
                  position: "left",
                  image: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/default%20metaliks/lv8qg5wg0dxgzn7vcv1a"
                },
                {
                  year: "2019",
                  title: "Global Certification",
                  description: "Received international quality standards certification for products and processes.",
                  icon: <CheckSquare className="w-5 h-5" />,
                  position: "right",
                  image: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/default%20metaliks/vwr1almvxtpk37s4arow"
                },
                {
                  year: "2023",
                  title: "Global Leadership in Manufacturing",
                  description: "Positioned as a global leader in steel manufacturing with exports to over 30 countries.",
                  icon: <Globe className="w-5 h-5" />,
                  position: "left",
                  image: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/default%20metaliks/fs1wxrp9fxjhaikzunrr"
                }
              ].map((item, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.25, 
                      delay: index * 0.04,
                      type: "spring",
                      stiffness: 150,
                      damping: 20
                    }}
                    className={`flex items-start mb-32 md:mb-40 relative ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    style={{ willChange: "transform, opacity" }}
                  >
                    {/* Stage number - positioned on timeline */}
                    <div className="absolute left-1/2 top-24 transform -translate-x-1/2 z-30 hidden md:flex">
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.2, 
                          delay: 0.05,
                          type: "spring",
                          stiffness: 300
                        }}
                        className="w-12 h-12 rounded-full bg-rashmi-red flex items-center justify-center text-white font-bold text-lg shadow-md"
                        style={{ willChange: "transform" }}
                      >
                        {index + 1}
                      </motion.div>
                    </div>
                    
                    {/* Year indicator pill (above card) */}
                    <div className={`absolute ${isEven ? 'md:left-[calc(5%+10px)]' : 'md:right-[calc(5%+10px)]'} top-5 z-20 hidden md:block`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.25, delay: 0.08 }}
                        className="px-4 py-1 rounded-full bg-background shadow-md border border-border text-sm font-medium"
                        style={{ willChange: "transform, opacity" }}
                      >
                        <span className="text-rashmi-red">{item.year}</span>
                      </motion.div>
                    </div>
                    
                    {/* Timeline connecting line */}
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "20%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.15, delay: 0.05 }}
                      style={{ 
                        position: 'absolute',
                        top: '98px', 
                        height: '2px',
                        left: isEven ? 'auto' : '50%',
                        right: isEven ? '50%' : 'auto',
                        background: `linear-gradient(${isEven ? 'to left' : 'to right'}, transparent, #E53935)`,
                        willChange: "width"
                      }}
                      className="hidden md:block z-10"
                    ></motion.div>
                    
                    {/* Content card */}
                    <div className={`w-full md:w-[40%] z-10 ${isEven ? 'md:mr-[10%] md:ml-0' : 'md:ml-[10%] md:mr-0'}`}>
                      {/* Mobile-only year indicator */}
                      <div className="mb-3 md:hidden">
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-rashmi-red/10 text-rashmi-red">
                          {item.year}
                        </span>
                        
                        <span className="ml-2 px-3 py-1 text-xs font-medium rounded-full bg-rashmi-red/10 text-rashmi-red">
                          Stage {index + 1}
                        </span>
                      </div>
                      
                      <motion.div 
                        whileHover={{ y: -5, boxShadow: "0 12px 30px -10px rgba(0, 0, 0, 0.1)" }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="bg-card overflow-hidden rounded-xl border border-border/40 shadow-sm"
                        style={{ willChange: "transform" }}
                      >
                        {/* Image container with aspect ratio */}
                        <div className="relative w-full h-64 md:h-80 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                            loading="lazy"
                          />
                          {/* Add subtle overlay for better text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="bg-rashmi-red/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                              {item.icon}
                            </div>
                            <h3 className="text-xl font-bold">{item.title}</h3>
                          </div>
                          
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Timeline End */}
              <div className="flex flex-col items-center justify-center relative mt-4 mb-12 pt-8">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="w-12 h-12 rounded-full bg-rashmi-red flex items-center justify-center shadow-lg border-2 border-background dark:border-background z-20"
                  style={{ willChange: "transform" }}
                >
                  <CheckCircle2 className="text-white" size={20} />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="mt-3 bg-card dark:bg-card border border-rashmi-red/20 rounded-full px-6 py-2 text-sm font-medium shadow-lg"
                >
                  Continuing Our Excellence
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Range Highlight - Enhanced with animations */}
        <section className="py-20 bg-background relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-rashmi-red/10 rounded-full filter blur-[120px]"></div>
            <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-rashmi-red/10 rounded-full filter blur-[120px]"></div>
            
            {/* Optimized animated grid pattern - Performance friendly */}
            <div 
              className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 grid-rows-6 md:grid-rows-12"
              style={{ 
                backgroundSize: 'cover',
                backgroundImage: isMobile ? 'none' : 'linear-gradient(to right, rgba(235, 89, 81, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(235, 89, 81, 0.05) 1px, transparent 1px)'
              }}
            >
              {isMobile && Array.from({ length: 36 }).map((_, index) => (
                <div key={index} className="border border-rashmi-red/20"></div>
              ))}
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "300px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-rashmi-red/10 px-5 py-2 rounded-full border border-rashmi-red/20 mb-6 group hover:bg-rashmi-red/20 transition-colors duration-200">
                <div className="text-rashmi-red font-medium flex items-center">
                  <Check className="w-4 h-4 mr-2 inline-block" />
                  <RevealText text="Product Excellence" />
                </div>
              </div>
              
              <div className="mb-6 relative">
                <RevealText
                  text="Comprehensive Product Range"
                  as="h2"
                  className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground relative"
                />
                
                {/* Add shimmer effect to the line */}
                <div className="relative h-1 mx-auto">
                  <div className="h-1 w-24 bg-gradient-to-r from-rashmi-red/80 to-rashmi-red/20 rounded-full mx-auto animate-expandWidth"></div>
                  <div className="absolute inset-0 w-24 h-1 mx-auto overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We supply A+ grade quality of DI Pipes (DN 80 to DN 1200) and Fittings (DN 80 to DN 1600), 
                manufactured for a wide range of applications with high dimensional accuracy and proper fitment.
              </p>
            </motion.div>
            
            {/* Product Features Grid - With optimized loading and staggered reveal */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {[
                { title: "High Safety Factor", description: "Perfect pipeline solutions for critical infrastructure needs, ensuring long-term reliability in the most demanding environments." },
                { title: "Wide Size Range", description: "DN 80 to DN 1600 to meet diverse project requirements across various industrial and municipal applications." },
                { title: "Coating Options", description: "Various internal and external coating types for different conditions, offering superior corrosion resistance and longevity." },
                { title: "Dimensional Accuracy", description: "Precision manufacturing for proper fitment in all applications, minimizing installation issues and ensuring perfect connections." }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "200px" }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  style={{ willChange: "transform, opacity" }}
                  className="group"
                >
                  <div className="bg-card border border-border/40 rounded-xl p-6 h-full transform-gpu relative product-card-hover group">
                    <div className="absolute inset-0 bg-gradient-to-br from-rashmi-red/5 to-transparent opacity-0 rounded-xl transition-opacity duration-300 group-hover:opacity-100"></div>
                    
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rashmi-red/20 to-rashmi-red/40 flex items-center justify-center mb-6 relative overflow-hidden group-hover:scale-105 group-hover:bg-rashmi-red/30 group-hover:shadow-lg transition-all duration-300">
                      <div className="text-rashmi-red group-hover:scale-110 transition-transform duration-300">
                        <Check className="h-7 w-7" />
                      </div>
                      
                      {/* Simplified ripple effect with CSS only - better performance */}
                      {!isMobile && (
                        <div className="absolute inset-0 rounded-full border-2 border-rashmi-red/30 opacity-0 group-hover:animate-ripple"></div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 bg-clip-text text-foreground group-hover:text-rashmi-red transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Timeline Item Component - Improved
interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: "left" | "right";
  image: string;
}

// Improve timeline rendering with React.memo
const TimelineItem = React.memo(({ year, title, description, icon, position, image }: TimelineItemProps) => {
  return (
    <motion.div
      className={`relative flex items-start gap-4 ${position === 'right' ? 'md:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, x: position === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
      whileHover="hover"
      style={{
        willChange: "transform, opacity",
        backfaceVisibility: "hidden"
      }}
    >
      {/* Timeline circle and line */}
      <motion.div 
        className="relative flex-shrink-0 w-12 h-12 rounded-full bg-card border-4 border-rashmi-red flex items-center justify-center z-10 overflow-hidden"
        whileHover={{ 
          scale: 1.1,
          borderColor: "#eb5951",
          boxShadow: "0 0 0 4px rgba(235, 89, 81, 0.3)",
          transition: { duration: 0.2 }
        }}
        style={{ willChange: "transform" }}
      >
        <motion.div 
          className="w-full h-full flex items-center justify-center text-rashmi-red"
          variants={{ 
            hover: { 
              scale: 1.15, 
              rotate: [0, 5, -5, 0],
              transition: { 
                duration: 0.3,
                rotate: { repeat: 0, duration: 0.3 }
              }
            } 
          }}
        >
          {icon}
        </motion.div>
        
        {/* Animated background effect */}
        <motion.div 
          className="absolute inset-0 bg-rashmi-red/10"
          variants={{
            hover: {
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              transition: { 
                duration: 1.2, 
                repeat: Infinity,
                repeatType: "mirror"
              }
            }
          }}
        />
      </motion.div>
      
      {/* Content card */}
      <motion.div 
        className="flex-1 bg-card p-5 rounded-xl border border-border/40 shadow-sm"
        variants={{
          hover: { 
            y: -5, 
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            transition: { duration: 0.2 }
          }
        }}
        style={{ willChange: "transform" }}
      >
        <motion.div 
          className="text-rashmi-red font-medium mb-1"
          variants={{
            hover: { 
              x: position === 'left' ? 5 : -5,
              transition: { duration: 0.15 }
            }
          }}
        >
          {year}
        </motion.div>
        <motion.h3 
          className="text-lg font-bold mb-2"
          variants={{
            hover: { 
              color: "#eb5951",
              transition: { duration: 0.15 }
            }
          }}
        >
          {title}
        </motion.h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </motion.div>
    </motion.div>
  );
});

// Product Feature Component
interface ProductFeatureProps {
  title: string;
  description: string;
}

const ProductFeature: React.FC<ProductFeatureProps> = ({ title, description }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-card border border-border/40 rounded-xl p-6 h-full transform-gpu relative product-card-hover group">
      <div className="absolute inset-0 bg-gradient-to-br from-rashmi-red/5 to-transparent opacity-0 rounded-xl transition-opacity duration-300 group-hover:opacity-100"></div>
      
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rashmi-red/20 to-rashmi-red/40 flex items-center justify-center mb-6 relative overflow-hidden group-hover:scale-105 group-hover:bg-rashmi-red/30 group-hover:shadow-lg transition-all duration-300">
        <div className="text-rashmi-red group-hover:scale-110 transition-transform duration-300">
          <Check className="h-7 w-7" />
        </div>
        
        {/* Simplified ripple effect with CSS only - better performance */}
        {!isMobile && (
          <div className="absolute inset-0 rounded-full border-2 border-rashmi-red/30 opacity-0 group-hover:animate-ripple"></div>
        )}
      </div>
      
      <h3 className="text-xl font-bold mb-3 bg-clip-text text-foreground group-hover:text-rashmi-red transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
        {description}
      </p>
      
      <div className="mt-5 pt-4 border-t border-border/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-rashmi-red flex items-center text-sm font-medium cursor-pointer">
          <span className="mr-2">Learn more</span>
          <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </div>
  );
};

// Add additional export sections for global reach
export const ExportData = () => {
  return (
    <motion.div 
      className="w-full max-w-md mx-auto mt-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      animate={{ 
        y: [0, -10, 0],
        transition: {
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 30px 40px -20px rgba(0,0,0,0.2)",
        transition: { duration: 0.3 }
      }}
    >
      <div className="bg-card/90 backdrop-blur-lg border border-border/50 rounded-xl overflow-hidden">
        <div className="bg-rashmi-red/10 border-b border-border/10 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-base font-medium">Global Export Data</div>
            <div className="flex space-x-2">
              <motion.span 
                className="w-3 h-3 rounded-full bg-red-500"
                whileHover={{ scale: 1.2 }}
              ></motion.span>
              <motion.span 
                className="w-3 h-3 rounded-full bg-yellow-500"
                whileHover={{ scale: 1.2 }}
              ></motion.span>
              <motion.span 
                className="w-3 h-3 rounded-full bg-green-500"
                whileHover={{ scale: 1.2 }}
              ></motion.span>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <div className="flex flex-col gap-1">
              <div className="text-xs text-muted-foreground">Top Export Region</div>
              <div className="text-sm font-semibold">Europe (42%)</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs text-muted-foreground">Export Revenue</div>
              <div className="text-sm font-semibold">$127M / Year</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs text-muted-foreground">Countries Served</div>
              <div className="text-sm font-semibold">40+ Countries</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs text-muted-foreground">Growth YoY</div>
              <div className="text-sm font-semibold">+22.5%</div>
            </div>
          </div>
          
          <div className="mt-5 pt-4 border-t border-border/20">
            <div className="text-xs text-muted-foreground mb-2">Global Presence Zones</div>
            <div className="grid grid-cols-5 gap-1 h-4">
              <motion.div 
                className="bg-rashmi-red/80 rounded-sm" 
                whileHover={{ height: "24px", transition: { duration: 0.1 } }}
              ></motion.div>
              <motion.div 
                className="bg-rashmi-red/60 rounded-sm" 
                whileHover={{ height: "28px", transition: { duration: 0.1 } }}
              ></motion.div>
              <motion.div 
                className="bg-rashmi-red/90 rounded-sm" 
                whileHover={{ height: "32px", transition: { duration: 0.1 } }}
              ></motion.div>
              <motion.div 
                className="bg-rashmi-red/50 rounded-sm" 
                whileHover={{ height: "20px", transition: { duration: 0.1 } }}
              ></motion.div>
              <motion.div 
                className="bg-rashmi-red/70 rounded-sm" 
                whileHover={{ height: "26px", transition: { duration: 0.1 } }}
              ></motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutRashmi;

// Add ParallaxCard component definition near other component definitions
const ParallaxCard = ({ 
  title, 
  description, 
  icon, 
  color, 
  delay = 0 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  color: string;
  delay?: number;
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Optimize throttle timing and use passive events
  const handleMouseMove = useCallback(throttle((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation with a smoother formula
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 5; // Max 5 degrees
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 5; // Max 5 degrees
    
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      setRotation({ 
        x: parseFloat(rotateX.toFixed(2)), // Round to 2 decimal places to reduce unnecessary updates
        y: parseFloat(rotateY.toFixed(2))
      });
    });
  }, 16), [isHovered]); // 60fps timing, and depend on isHovered state
  
  const resetRotation = () => {
    // Use spring animation for reset
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Memoize content that doesn't change with hover/rotation
  const cardContent = useMemo(() => (
    <>
      <div className="mb-6 relative">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-foreground relative transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-muted-foreground z-10 relative">
        {description}
      </p>
    </>
  ), [icon, title, description]);
  
  return (
    <motion.div
      ref={cardRef}
      className="relative h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.7, delay: delay, ease: "easeOut" }}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
    >
      <motion.div
        className="bg-card rounded-xl p-8 h-full shadow-lg border border-border/40 overflow-hidden relative z-10 gpu-accelerated"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          boxShadow: isHovered 
            ? "0 20px 30px rgba(0, 0, 0, 0.15)" 
            : "0 10px 20px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.1s linear, box-shadow 0.3s ease",
          willChange: "transform, box-shadow"
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={resetRotation}
      >
        {/* Background gradient with CSS animation for better performance */}
        <div 
          className="absolute inset-0 -z-10 transition-opacity duration-300"
          style={{ 
            backgroundColor: color,
            opacity: isHovered ? 0.7 : 0.5
          }}
        />
        
        {/* Use CSS transforms for better performance */}
        <div
          className="relative z-10 transition-transform duration-200"
          style={{
            transform: isHovered ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)'
          }}
        >
          {cardContent}
        </div>
        
        {/* Progress bar with CSS animation */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-rashmi-red origin-left transition-transform duration-300"
          style={{
            transform: `scaleX(${isHovered ? 1 : 0})`,
          }}
        />
        
        {/* Add subtle shimmer effect on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute -inset-full h-full w-10 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 skew-x-12 transform"
              style={{
                animation: "shimmerEffect 1.5s infinite",
              }}
            />
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes shimmerEffect {
                  0% { transform: translateX(-100%) skew(-12deg); }
                  100% { transform: translateX(200%) skew(-12deg); }
                }
              `
            }} />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Add EnhancedParallaxCard component with true parallax effect
interface EnhancedParallaxCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  images: string[];
  delay?: number;
}

const EnhancedParallaxCard: React.FC<EnhancedParallaxCardProps> = ({
  title,
  description,
  icon,
  color,
  images,
  delay = 0
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(throttle((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 10;

    requestAnimationFrame(() => {
      setRotation({
        x: parseFloat(rotateX.toFixed(2)),
        y: parseFloat(rotateY.toFixed(2))
      });
    });
  }, 16), [isHovered]);

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
    >
      <motion.div
        className="bg-card rounded-xl p-8 h-full shadow-lg border border-border/40 relative z-10"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          boxShadow: isHovered
            ? "0 20px 30px rgba(0, 0, 0, 0.15)"
            : "0 10px 20px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.1s linear, box-shadow 0.3s ease"
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={resetRotation}
      >
        <div
          className="absolute inset-0 -z-10 transition-opacity duration-300 rounded-xl"
          style={{
            backgroundColor: color,
            opacity: isHovered ? 0.7 : 0.5
          }}
        />

        {images && images.length > 0 && (
          <div className="absolute inset-0 -z-5 rounded-xl opacity-30">
            <div
              className="w-full h-full bg-cover bg-center rounded-xl"
              style={{
                backgroundImage: `url(${images[0]})`,
                transform: isHovered ? 'scale(1.1)' : 'scale(1.05)',
                transition: 'transform 0.3s ease'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent rounded-xl" />
          </div>
        )}

        <div
          className="relative z-10 transition-transform duration-200"
          style={{
            transform: isHovered ? 'translateY(-5px)' : 'translateY(0)'
          }}
        >
          <div className="mb-6 relative">
            <div className="relative z-10">
              {icon}
            </div>
          </div>

          <h3
            className="text-xl font-bold mb-3 transition-colors duration-300"
            style={{
              color: isHovered ? "#eb5951" : "var(--foreground)"
            }}
          >
            {title}
          </h3>

          <p className="text-muted-foreground z-10 relative">
            {description}
          </p>

          <div className="mt-4 pt-3 border-t border-border/20">
            <span className="text-rashmi-red flex items-center text-sm font-medium cursor-pointer">
              <span>Learn more</span>
              <motion.span
                className="ml-1"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >→</motion.span>
            </span>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 h-1 bg-rashmi-red origin-left transition-transform duration-300"
          style={{
            transform: `scaleX(${isHovered ? 1 : 0})`,
            width: '100%'
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Add MapComponent definition near other component definitions
interface MapProps {}

const MapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('headquarters');
  const [mapUrl, setMapUrl] = useState('');
  const [isChangingLocation, setIsChangingLocation] = useState(false);
  
  // Define location interface
  interface LocationData {
    position: { lat: number; lng: number };
    name: string;
    zoom: number;
    description?: string;
  }
  
  // Define locations
  const locations: Record<string, LocationData> = {
    kharagpur: { 
      position: { lat: 22.32627262772027, lng: 87.39800088018508 },
      name: 'Plant 2 - Kharagpur',
      zoom: 16,
      description: 'Gopinathpur and Jethia A.D.S.R., Khatranga, Changual, NH – 60, Kharagpur, West Bengal, India'
    },
    headquarters: {
      position: { lat: 22.545083685715742, lng: 88.35795788894713 },
      name: 'Head Office - Kolkata',
      zoom: 16,
      description: 'First Floor, Ideal Center, 9, Acharya Jagdish Chandra Bose Rd, Mullick Bazar, Park Street area, Kolkata, West Bengal 700017'
    },
    europe: { 
      position: { lat: 51.51187730491441, lng: -0.07737247046335716 },
      name: 'RASHMI METALIKS UK LTD.',
      zoom: 14,
      description: '3rd Floor, 5 Lloyd\'s Avenue, EC3N 3AE London, UK'
    },
    spain: {
      position: { lat: 40.43754538862622, lng: -3.7943328708636526 },
      name: 'RASHMI METALIKS SPAIN S.L.',
      zoom: 14,
      description: 'Av. de Europa, 16, chalet 19, 28224 Pozuelo de Alarcón, Madrid, Spain'
    },
    singapore: { 
      position: { lat: 1.280806292054586, lng: 103.8479927528802 },
      name: 'RASHMI AQUA PTE LTD.',
      zoom: 14,
      description: '137 Telok Ayer Street,#05-02 Singapore (068602)'
    },
    dubai: { 
      position: { lat: 25.07801203948215, lng: 55.14665528532732 },
      name: 'RASHMI PIPE & FITTING FZCO',
      zoom: 14,
      description: 'Cluster R, Jumeirah Lake Towers (JLT), Dubai, UAE'
    },
    plant1: { 
      position: { lat: 22.37651633801149, lng: 87.2801833298779 },
      name: 'Plant 1',
      zoom: 14,
      description: 'Gokulpur, P.O.: Shyamraipur, Dist.: West Midnapur, West Bengal, India'
    },
    iran: {
      position: { lat: 33.298433904993175, lng: 44.325621584688946 },
      name: 'RASHMI GROUP - IRAQ',
      zoom: 14,
      description: '78XG+695 Baghdad, Iraq'
    },
    bahrain: {
      position: { lat: 26.097235077142635, lng: 50.61625127557729 },
      name: 'RASHMI METALIKS BAHRAIN W.L.L',
      zoom: 14,
      description: '5218, Mamama 1127, Bahrain'
    }
  };

  // Generate enhanced 3D embed URL from position
  const getEnhanced3DEmbedUrl = useCallback((locationKey: string) => {
    if (!locationKey) {
      // Default to headquarters if no location selected
      locationKey = 'headquarters';
    }
    
    // Custom embed URLs for specific locations
    const customEmbedUrls: Record<string, string> = {
      iran: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3334.779395517535!2d44.325621584688946!3d33.298433904993175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15577f0046a045c9%3A0x1e4f288654ccaea4!2sRashmi%20Group!5e1!3m2!1sen!2sin!4v1749896425674!5m2!1sen!2sin',
      bahrain: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.345389795521!2d50.61625127557729!3d26.097235077142635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49ab5f9b417d3b%3A0x91f42aaab20296a7!2sRashmi%20Metaliks%20Bahrain%20W.L.L!5e1!3m2!1sen!2sin!4v1749896627232!5m2!1sen!2sin',

      spain: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d683.803389712677!2d-3.7943328708636526!3d40.43754538862622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd41864f7cfab627%3A0xd718c29a0890351b!2sAv.%20de%20Europa%2C%2016%2C%20chalet%2019%2C%2028224%20Pozuelo%20de%20Alarc%C3%B3n%2C%20Madrid%2C%20Spain!5e1!3m2!1sen!2sin!4v1749900743766!5m2!1sen!2sin'
    };
    
    // Return custom embed URL if available
    if (customEmbedUrls[locationKey]) {
      return customEmbedUrls[locationKey];
    }
    
    const location = locations[locationKey as keyof typeof locations];
    const { lat, lng } = location.position;
    const zoom = location.zoom;
    const name = encodeURIComponent(location.name);
    
    // Use enhanced 3D Earth view with satellite imagery
    // The t=k parameter enables satellite view, and the h (heading) and pitch parameters add the 3D effect
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d500!2d${lng}!3d${lat}!2m3!1f0!2f30!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin`;
  }, []);

  // Update map URL when selected location changes
  useEffect(() => {
    setIsChangingLocation(true);
    setMapUrl(getEnhanced3DEmbedUrl(selectedLocation));
    
    // Reset changing state after a short delay
    const timer = setTimeout(() => {
      setIsChangingLocation(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [selectedLocation, getEnhanced3DEmbedUrl]);

  // Create a fly to location function that changes the selected location
  const flyToLocation = useCallback((locationId: string) => {
    setSelectedLocation(locationId);
  }, []);

  return (
    <div className="w-full h-full relative map-container">
      {/* Map Container with Loading effect - Fixed height to prevent scroll issues */}
      <motion.div 
        className="w-full rounded-2xl overflow-hidden border border-border/40 relative"
        style={{ 
          height: '750px', // Increased height
          maxHeight: '90vh', // Adjusted max height
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.05)',
          background: 'linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-rashmi-red/5 to-transparent pointer-events-none z-10 opacity-50 rounded-2xl"></div>
        
        {/* Loading overlay */}
        <AnimatePresence>
          {isChangingLocation && (
            <motion.div 
              className="absolute inset-0 bg-card/30 backdrop-blur-sm z-20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center">
                <motion.div 
                  className="w-12 h-12 rounded-full border-2 border-rashmi-red/30 border-t-rashmi-red"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <div className="text-sm mt-3 font-medium">Traveling to {locations[selectedLocation]?.name}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <iframe 
          src={mapUrl}
          width="100%" 
          height="100%" 
          style={{ border: 0, pointerEvents: 'auto' }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-popups"
          className="rounded-2xl"
          title="Rashmi Group Locations Map"
          onLoad={() => {
            // Force document scrollable state after iframe loads
            document.body.classList.add('scroll-enable');
          }}
        />
      </motion.div>
      
      {/* Map Controls - Location Selector */}
      <motion.div 
        className="absolute top-4 right-4 z-30 bg-card/90 backdrop-blur-md p-4 rounded-xl border border-border/40 shadow-xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex flex-col gap-3">
          <div className="text-sm font-medium mb-1 flex items-center">
            <Globe className="w-4 h-4 mr-2 text-rashmi-red" />
            <span>Our Global Presence</span>
          </div>
          <div className="relative">
            <select 
              id="location-selector"
              className="w-full bg-background/80 border border-border/60 rounded-lg px-3 py-2 text-sm pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-rashmi-red/30 transition-all duration-200"
              onChange={(e) => flyToLocation(e.target.value)}
              value={selectedLocation}
            >
              <option value="headquarters">Head Office - Kolkata</option>
              <option value="kharagpur">Plant 2 - Kharagpur (Manufacturing Unit)</option>
              <option value="plant1">Plant 1 (Manufacturing Unit)</option>
              <option value="europe">UK Office</option>
              <option value="spain">Spain Office</option>
              <option value="singapore">Singapore Office</option>
              <option value="dubai">Dubai Office</option>
              <option value="iran">Iraq (Warehouse)</option>
              <option value="bahrain">Bahrain (Warehouse)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          
          {/* Help tooltip */}
          <div className="mt-1 text-xs text-muted-foreground bg-background/40 p-2 rounded-lg border border-border/20">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-rashmi-red/10 flex items-center justify-center mr-2 text-rashmi-red">?</div>
              <span>Explore our global presence in 3D</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Location Info Display */}
      <motion.div 
        className="absolute left-4 bottom-4 z-30 bg-card/90 backdrop-blur-md p-5 rounded-xl border border-border/40 shadow-xl max-w-md hidden md:block"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          key={selectedLocation} // Force re-render on location change
        >
          <h3 className="text-lg font-bold flex items-center mb-3">
            <div className="w-7 h-7 rounded-full bg-rashmi-red/10 flex items-center justify-center mr-2">
              <MapPin className="w-3.5 h-3.5 text-rashmi-red" />
            </div>
            {locations[selectedLocation as keyof typeof locations].name}
          </h3>
          {locations[selectedLocation as keyof typeof locations].description && (
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-rashmi-red/20 to-transparent rounded-full"></div>
              <p className="text-sm mb-3 pl-3 text-foreground/90">
                {locations[selectedLocation as keyof typeof locations].description}
              </p>
            </div>
          )}
          <div className="flex items-center text-sm text-muted-foreground bg-background/50 py-2 px-3 rounded-lg">
            <Globe className="w-3.5 h-3.5 mr-2 text-rashmi-red/70" />
            <span>
              {`${locations[selectedLocation as keyof typeof locations].position.lat.toFixed(6)}, 
              ${locations[selectedLocation as keyof typeof locations].position.lng.toFixed(6)}`}
            </span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Mobile Controls */}
      <motion.div 
        className="absolute bottom-4 right-4 z-30 md:hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex flex-col gap-2">
          <button 
            className="w-12 h-12 bg-card/90 backdrop-blur-md flex items-center justify-center rounded-full shadow-xl border border-border/40 text-rashmi-red transition-all duration-200 hover:bg-rashmi-red hover:text-white"
            onClick={() => {
              const menu = document.getElementById('mobile-locations-dropdown');
              if (menu) {
                menu.classList.toggle('hidden');
              }
            }}
          >
            <MapPin className="w-5 h-5" />
          </button>
          
          {/* Mobile Locations Dropdown */}
          <div 
            id="mobile-locations-dropdown" 
            className="absolute bottom-16 right-0 w-56 bg-card/90 backdrop-blur-md p-4 rounded-xl border border-border/40 shadow-xl hidden"
          >
            <div className="text-xs font-medium mb-3 flex items-center">
              <Globe className="w-3.5 h-3.5 mr-1.5 text-rashmi-red" />
              <span>Our Global Locations</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                {id: "headquarters", name: "Head Office - Kolkata", icon: <Building className="w-3 h-3" />},
                {id: "kharagpur", name: "Plant 2 - Kharagpur (Manufacturing Unit)", icon: <Building className="w-3 h-3" />},
                {id: "plant1", name: "Plant 1 (Manufacturing Unit)", icon: <HardDrive className="w-3 h-3" />},
                {id: "europe", name: "UK Office", icon: <Flag className="w-3 h-3" />},
                {id: "spain", name: "Spain Office", icon: <Flag className="w-3 h-3" />},
                {id: "singapore", name: "Singapore Office", icon: <Flag className="w-3 h-3" />},
                {id: "dubai", name: "Dubai Office", icon: <Flag className="w-3 h-3" />},
                {id: "iran", name: "Iraq (Warehouse)", icon: <Flag className="w-3 h-3" />},
                {id: "bahrain", name: "Bahrain (Warehouse)", icon: <Flag className="w-3 h-3" />}
              ].map((loc, index) => (
                <button 
                  key={index}
                  className="text-xs text-left px-3 py-2 hover:bg-rashmi-red/10 rounded-lg transition-colors duration-200 flex items-center"
                  onClick={() => {
                    flyToLocation(loc.id);
                    // Hide dropdown after selection
                    document.getElementById('mobile-locations-dropdown')?.classList.add('hidden');
                  }}
                >
                  <span className="w-5 h-5 rounded-full bg-background/80 flex items-center justify-center mr-2 text-rashmi-red">
                    {loc.icon}
                  </span>
                  {loc.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

