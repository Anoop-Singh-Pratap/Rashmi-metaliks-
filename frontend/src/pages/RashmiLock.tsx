import React, { useRef, useState, useEffect, useMemo, useCallback, memo, Suspense } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Shield, ArrowRight, Ruler, Pipette, Waves, ShieldCheck, Lock, Check, Wrench, Minimize, ArrowDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpecificationTable from '../components/ui/SpecificationTable';
import InteractiveSpecTable from '../components/ui/InteractiveSpecTable';
import ExploreButton from '../components/ui/ExploreButton';
import RevealText from '../components/ui/RevealText';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';

// Lazy-loaded components for better performance - add proper types
interface LazyImageProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
}

const LazyImage = memo(({ src, alt, fallback, className }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  return (
    <img 
      src={error ? fallback : src}
      alt={alt}
      className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ transition: 'opacity 0.3s ease-in-out' }}
      onLoad={() => setLoaded(true)}
      onError={() => {
        setError(true);
        setLoaded(true);
      }}
    />
  );
});

// Memoized advantage card for better performance - add proper types
interface AdvantageCardProps {
  title: string;
  description: string;
  Icon: React.ComponentType<any>; // Use more generic type for icon components
}

const AdvantageCard = memo(({ title, description, Icon }: AdvantageCardProps) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }}
    className="bg-card border border-border rounded-lg p-6 hover:border-rashmi-red/30 transition-all duration-300 group"
    whileHover={{ 
      y: -5, 
      boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.15)"
    }}
  >
    <Icon className="text-rashmi-red mb-4 h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </motion.div>
));

// Memoized application item for better performance - add proper types
interface ApplicationItemProps {
  text: string;
}

const ApplicationItem = memo(({ text }: ApplicationItemProps) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }}
    className="flex items-start gap-3 group"
  >
    <ArrowRight className="text-rashmi-red mt-0.5 h-5 w-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
    <p className="text-foreground">{text}</p>
  </motion.div>
));

interface TableRow {
  [key: string]: string | number;
}

// Custom styles component with enhanced animations and effects
const RashmiLockStyles = memo(() => {
  return (
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      
      /* Geometric pattern background */
      .geometric-pattern {
        background-image: radial-gradient(rgba(235, 89, 81, 0.1) 2px, transparent 2px), 
                          radial-gradient(rgba(235, 89, 81, 0.07) 2px, transparent 2px);
        background-size: 40px 40px;
        background-position: 0 0, 20px 20px;
      }
      
      /* Grid pattern background */
      .bg-grid-pattern {
        background-size: 50px 50px;
        background-image: 
          linear-gradient(to right, rgba(229, 57, 53, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(229, 57, 53, 0.03) 1px, transparent 1px);
      }
      
      /* Theme transition optimizations */
      .theme-aware {
        transition-property: color, background-color, border-color;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
      }
      
      /* Optimize theme transitions for common elements */
      .light .theme-transition,
      .dark .theme-transition {
        will-change: background-color, color, border-color;
      }
      
      /* Reduce transition properties for performance */
      .performance-transitions {
        transition-property: transform, opacity;
        will-change: transform, opacity;
      }
      
      /* Perspective for 3D effects */
      .perspective-container {
        perspective: 1000px;
        transform-style: preserve-3d;
      }
      
      /* Animated gradient for buttons */
      .animated-gradient {
        background-size: 200% 200%;
        background-image: linear-gradient(to right, #E53935, #FF5252, #E53935);
        animation: gradientFlow 8s ease infinite;
      }
      
      @keyframes gradientFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      /* Hardware acceleration for improved performance */
      .hardware-accelerated {
        transform: translateZ(0);
        backface-visibility: hidden;
      }
      
      /* For smooth animations - use will-change for elements that animate */
      .will-animate {
        will-change: transform, opacity;
      }
      
      /* Critical text elements - prevent transitions on text */
      .transition-none {
        transition: none !important;
        will-change: auto !important;
      }
      
      /* Optimize theme transitions - reduce properties being transitioned */
      .theme-optimize {
        transition-property: background-color;
        transition-duration: 80ms;
        will-change: auto !important;
      }
      
      /* White text needs special handling for themes */
      .white-text {
        color: white !important;
        transition: none !important;
      }
      
      /* Fast background transitions */
      .fast-transition {
        transition-duration: 100ms !important;
      }
    `}</style>
  );
});

// Animation variants - moved outside component to prevent recreation on renders
const floatAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, -10, 0], 
    transition: { 
      duration: 3, 
      repeat: Infinity, 
      repeatType: "loop" as const, 
      ease: "easeInOut" 
    } 
  }
};

const flowAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, 5, 0], 
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      repeatType: "reverse" as const, 
      ease: "easeInOut" 
    } 
  }
};

const pulseAnimation = {
  initial: { opacity: 0.7 },
  animate: { 
    opacity: [0.7, 1, 0.7], 
    scale: [1, 1.05, 1],
    transition: { 
      duration: 1.5, 
      repeat: Infinity, 
      repeatType: "mirror" as const, 
      ease: "easeInOut" 
    } 
  }
};

const arrowVariants = {
  initial: { y: 0 },
  animate: { 
    y: [0, 5, 0],
    transition: { 
      repeat: Infinity, 
      duration: 1.5, 
      ease: "easeInOut" 
    }
  }
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Data is now outside the component to prevent recreation on each render
const dimensionsData = [
  {
    "size": "DN 100",
    "outer_diameter": "180",
    "water_sewerage": "40",
    "high_pressure": "100",
    "deflection": "5",
    "locks": "5"
  },
  {
    "size": "DN 150",
    "outer_diameter": "220",
    "water_sewerage": "40",
    "high_pressure": "100",
    "deflection": "5",
    "locks": "5"
  },
  {
    "size": "DN 200",
    "outer_diameter": "274",
    "water_sewerage": "40",
    "high_pressure": "64",
    "deflection": "4",
    "locks": "8"
  },
  {
    "size": "DN 250",
    "outer_diameter": "326",
    "water_sewerage": "40",
    "high_pressure": "64",
    "deflection": "4",
    "locks": "8"
  },
  {
    "size": "DN 300",
    "outer_diameter": "378",
    "water_sewerage": "40",
    "high_pressure": "45",
    "deflection": "4",
    "locks": "8"
  },
  {
    "size": "DN 350",
    "outer_diameter": "429",
    "water_sewerage": "30",
    "high_pressure": "38",
    "deflection": "3",
    "locks": "8"
  },
  {
    "size": "DN 400",
    "outer_diameter": "532",
    "water_sewerage": "30",
    "high_pressure": "35",
    "deflection": "3",
    "locks": "8"
  },
  {
    "size": "DN 500",
    "outer_diameter": "635",
    "water_sewerage": "30",
    "high_pressure": "35",
    "deflection": "3",
    "locks": "9"
  },
  {
    "size": "DN 600",
    "outer_diameter": "738",
    "water_sewerage": "35",
    "high_pressure": "*",
    "deflection": "2",
    "locks": "10"
  }
];

const pipeDimensionsData = [
  {
    "size": "DN 100",
    "de": "123",
    "water_sewerage": "170",
    "high_pressure": "170",
    "p1": "123",
    "wl": "85"
  },
  {
    "size": "DN 150",
    "de": "180",
    "water_sewerage": "246",
    "high_pressure": "246",
    "p1": "130",
    "wl": "85"
  },
  {
    "size": "DN 200",
    "de": "220",
    "water_sewerage": "290",
    "high_pressure": "290",
    "p1": "142",
    "wl": "95"
  },
  {
    "size": "DN 250",
    "de": "274",
    "water_sewerage": "354",
    "high_pressure": "354",
    "p1": "163",
    "wl": "100"
  },
  {
    "size": "DN 300",
    "de": "326",
    "water_sewerage": "410",
    "high_pressure": "410",
    "p1": "174",
    "wl": "105"
  },
  {
    "size": "DN 350",
    "de": "378",
    "water_sewerage": "460",
    "high_pressure": "460",
    "p1": "171",
    "wl": "110"
  },
  {
    "size": "DN 400",
    "de": "429",
    "water_sewerage": "540",
    "high_pressure": "**",
    "p1": "183",
    "wl": "117"
  },
  {
    "size": "DN 500",
    "de": "532",
    "water_sewerage": "670",
    "high_pressure": "**",
    "p1": "200",
    "wl": "117"
  },
  {
    "size": "DN 600",
    "de": "635",
    "water_sewerage": "786",
    "high_pressure": "**",
    "p1": "216",
    "wl": "128"
  }
];

const lockFeatures = [
  {
    title: "Self-Restrained Design",
    description: "Eliminates the need for thrust blocks in pipeline installations.",
    icon: Lock
  },
  {
    title: "High Pressure Capacity",
    description: "Handles pressure up to 100 bar depending on pipe size.",
    icon: Zap
  },
  {
    title: "Angular Deflection",
    description: "Flexible joints with angular deflection up to 5° for easy installation.",
    icon: Minimize
  },
  {
    title: "Quick Installation",
    description: "Simple locking system significantly reduces installation time.",
    icon: Wrench
  }
];

const advantages = [
  {
    title: "Robust Pipe System",
    description: "Simple locking mechanism providing a robust, restrained jointing system."
  },
  {
    title: "High Pressure Handling",
    description: "Designed to sustain high pressure ranging from 100 bar to 16 bar depending on size."
  },
  {
    title: "Quick Installation",
    description: "The simple locking system saves a great deal of installation time."
  },
  {
    title: "Flexibility",
    description: "High angular deflections make joints suitable for laying in complicated intersections."
  },
  {
    title: "No Thrust Blocks",
    description: "Eliminates the need for anchorage or thrust blocks in conventional open trenches."
  },
  {
    title: "Earthquake Resistant",
    description: "Can be used in regions with elevated earthquake or earth settlement risks."
  }
];

const applications = [
  "Trenchless laying of Ductile Iron pipe lines",
  "Laying without thrust blocks for water applications",
  "Higher pressure applications",
  "Laying of Pipe lines on steep slopes",
  "Hydro-power applications",
  "Mining applications such as dewatering",
  "Bridge pipelines",
  "Horizontal Directional Drilling (HDD)",
  "Snow making pipelines",
  "Firefighting Mains",
  "District Cooling/Heating Pipelines",
  "Floating Pipelines in water"
];

// Technical Data Section as a separate component for better performance
interface TechnicalDataSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TechnicalDataSection = memo(({ activeTab, setActiveTab }: TechnicalDataSectionProps) => {
  return (
    <section id="technical-data" className="py-20 bg-muted/30 theme-optimize">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-rashmi-red font-medium mb-3 transition-none">
            Technical Specifications
          </div>
          <h2 className="text-3xl font-bold mb-5 transition-none">
            <span className="text-rashmi-red transition-none">RASHMI-LOCK</span> Technical Data
          </h2>
          <p className="text-muted-foreground mb-6 theme-optimize">
            Our RASHMI-LOCK system is available in sizes ranging from DN100 to DN600 and designed for both standard water applications and high-pressure requirements.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab('dimensions')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'dimensions' 
                  ? 'bg-rashmi-red text-white shadow-md' 
                  : 'bg-card hover:bg-card/80 text-foreground theme-transition'
              }`}
            >
              Pipe Dimensions
            </button>
            <button
              onClick={() => setActiveTab('pressure')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'pressure' 
                  ? 'bg-rashmi-red text-white shadow-md' 
                  : 'bg-card hover:bg-card/80 text-foreground theme-transition'
              }`}
            >
              Allowable Pressure
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          {activeTab === 'dimensions' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              layoutId="technical-data-content"
            >
              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-md theme-transition">
                <SpecificationTable
                  headers={['Size', 'DE', 'Water/Sewerage', 'High Pressure', 'P1', 'WL']}
                  rows={pipeDimensionsData.map(item => ({
                    'Size': item.size,
                    'DE': item.de,
                    'Water/Sewerage': item.water_sewerage,
                    'High Pressure': item.high_pressure,
                    'P1': item.p1,
                    'WL': item.wl
                  }))}
                  className="mb-2"
                />
              </div>
              <p className="text-xs text-muted-foreground text-right mt-2">**Details can be arranged on request</p>
            </motion.div>
          )}
          
          {activeTab === 'pressure' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              layoutId="technical-data-content"
            >
              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-md theme-transition">
                <SpecificationTable
                  headers={['Size', 'PFA - Water/Sewerage', 'PFA - High Pressure', 'Allowable Angular Deflection (°)', 'No. of Locks']}
                  rows={dimensionsData.map(item => ({
                    'Size': item.size,
                    'PFA - Water/Sewerage': item.water_sewerage,
                    'PFA - High Pressure': item.high_pressure,
                    'Allowable Angular Deflection (°)': item.deflection,
                    'No. of Locks': item.locks
                  }))}
                  className="mb-2"
                />
              </div>
              <p className="text-xs text-muted-foreground text-right mt-2">PFA - Allowable Operating Pressure</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
});

// Features section as a separate component
interface FeaturesSectionProps {
  featuresControls: ReturnType<typeof useAnimation>;
}

const FeaturesSection = memo(({ featuresControls }: FeaturesSectionProps) => {
  return (
    <section id="features" className="py-20 relative bg-card theme-optimize">
      <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-rashmi-red font-medium mb-3 transition-none">
            Key Advantages
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 transition-none">
            <span className="text-rashmi-red transition-none">RASHMI-LOCK</span> Features
          </h2>
          <p className="text-muted-foreground theme-optimize">
            Discover what makes our revolutionary jointing system the preferred choice for challenging pipeline installations.
          </p>
        </div>
        
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={featuresControls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          {lockFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-rashmi-red/30 hover:-translate-y-1 group theme-transition"
              >
                <div className="absolute -top-6 left-6 w-12 h-12 rounded-lg flex items-center justify-center bg-rashmi-red text-white shadow-lg shadow-rashmi-red/20 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} />
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
});

// Create a ThemeToggle component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="fixed bottom-4 right-4 z-50 p-2 rounded-full bg-card border border-border shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-110 theme-optimize"
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 transition-none" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700 transition-none" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
};

// Main component with performance optimizations
const RashmiLock = () => {
  const [activeTab, setActiveTab] = useState('dimensions');
  const [isLoaded, setIsLoaded] = useState(true); // Changed to true by default to improve perceived performance
  const [activeSection, setActiveSection] = useState('overview');
  
  // Refs with proper typing
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);
  const applicationsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  
  // Use a reduced set of useInView hooks - only for critical sections
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  
  // Animation controls
  const heroControls = useAnimation();
  const featuresControls = useAnimation(); // Restored for feature section
  
  // Reduce reliance on scroll animations by using the simpler variant
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Simplify scroll animations
  const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, 100]); // Reduced movement amount
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -20]); // Reduced movement amount
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Callback for scrolling
  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Simplify useEffect to optimize performance
  useEffect(() => {
    if (isHeroInView) {
      heroControls.start({ opacity: 1, y: 0 });
    }
    if (isFeaturesInView) {
      featuresControls.start('visible');
    }
  }, [isHeroInView, isFeaturesInView, heroControls, featuresControls]);

  // Minimal component setup - no unnecessary IntersectionObserver
  useEffect(() => {
    // Simple scroll to top
    window.scrollTo(0, 0);
    
    // Load main image in the background if needed
    const img = new Image();
    img.src = "/lovable-uploads/compressed/rashmi-lock.webp";
    
    // No lengthy timeouts that block rendering
  }, []);

  // Get theme from context
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background relative theme-aware hardware-accelerated transition-opacity duration-700" 
         ref={containerRef}
         data-theme={theme} // Use data attribute to help with theme transitions
    >
      <RashmiLockStyles />
      <Header />
      <SEO 
        title="Rashmi-Lock Restrained Jointing System | High-Pressure DI Pipe Joints"
        description="Revolutionary self-restrained, semi-flexible jointing system for Ductile Iron Pipes that eliminates thrust blocks and handles up to 100 bar pressure - perfect for challenging installations and seismic zones."
        keywords="Rashmi-Lock, restrained joint, ductile iron pipes, trenchless laying, self-restrained joint, semi-flexible joint, high pressure pipes, thrust block elimination"
        canonicalUrl="/rashmi-lock"
        ogType="product"
        ogImage="/lovable-uploads/compressed/rashmi-lock.webp"
      />
      
      {/* Hero Section with Enhanced Design */}
      <section 
        id="overview" 
        ref={heroRef}
        className="relative pt-28 md:pt-36 pb-24 min-h-[90vh] flex items-center overflow-hidden perspective-container theme-optimize"
      >
        {/* Background pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        {/* Background with simplified transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-rashmi-dark/20 via-rashmi-dark/10 to-background theme-optimize"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Category label with improved animation - avoid transitions */}
            <div className="mb-4 inline-block">
              <div className="bg-gradient-to-r from-rashmi-red to-rashmi-red/80 px-4 py-1 rounded-full mb-6 shadow-lg shadow-rashmi-red/20">
                <span className="text-white text-sm font-medium uppercase tracking-wider white-text">Advanced Jointing System</span>
              </div>
            </div>
            
            {/* Main title with RevealText */}
            <div className="mb-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold transition-none">
                Revolutionary Pipeline
              </h1>
              
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="block text-xl md:text-2xl mt-4 text-muted-foreground"
              >
                <span className="text-rashmi-red font-bold transition-none">RASHMI-LOCK</span> Restrained Joint System
              </motion.span>
            </div>
            
            <div className="w-32 h-1 mx-auto my-6 rounded-full animate-pulse" 
              style={{ backgroundImage: 'linear-gradient(90deg, #E53935, #FF5252, #E53935)' }}></div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto theme-transition"
            >
              A self-restrained, semi-flexible push-in-jointing system for Ductile Iron Pipes that eliminates thrust blocks and facilitates trenchless installation in challenging environments.
            </motion.p>
            
            {/* Enhanced stat badges with transition optimizations */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <div className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-rashmi-red text-white shadow-md border border-rashmi-red/20">
                <Check size={16} className="mr-1" /> <span className="white-text">ISO 10804-1 Compliant</span>
              </div>
              
              <div className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-card border border-border shadow-md backdrop-blur-sm theme-optimize">
                <Check size={16} className="mr-1 text-rashmi-red" /> DN100-DN600 Range
              </div>
              
              <div className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-rashmi-red text-white shadow-md border border-rashmi-red/20">
                <Check size={16} className="mr-1" /> <span className="white-text">Up to 100 Bar Pressure</span>
              </div>
            </div>
            
            {/* CTA button with optimized transitions */}
            <div className="mt-8 flex flex-col items-center">
              <button 
                onClick={() => scrollToSection('features')}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-rashmi-red to-rashmi-red/90 text-white font-medium shadow-lg shadow-rashmi-red/20 hover:shadow-xl hover:shadow-rashmi-red/30 transition-all duration-300 hover:scale-105"
              >
                <span className="white-text">Explore Features</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Using memoized component */}
      <FeaturesSection featuresControls={featuresControls} />

      {/* Other sections... */}
      {/* Technical Data Section - Using memoized component */}
      <TechnicalDataSection activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Advantages Section - optimized with memo components */}
      <section id="advantages" className="py-20 bg-grid-pattern theme-transition" ref={advantagesRef}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-rashmi-red font-medium mb-3 transition-none">
              Benefits
            </div>
            <h2 className="text-3xl font-bold mb-5 transition-none">
              <span className="text-rashmi-red transition-none">RASHMI-LOCK</span> Advantages
            </h2>
            <p className="text-muted-foreground theme-optimize">
              Discover the unique advantages that make our RASHMI-LOCK Restrained Joint System the preferred choice for challenging pipeline installations.
            </p>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {advantages.map((advantage, index) => (
              <AdvantageCard 
                key={index}
                title={advantage.title}
                description={advantage.description}
                Icon={Shield}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Applications Section - optimized with memo components */}
      <section id="applications" className="py-20 bg-muted/30 theme-transition" ref={applicationsRef}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-rashmi-red font-medium mb-3 transition-none">
              Use Cases
            </div>
            <h2 className="text-3xl font-bold mb-5 transition-none">
              Areas of Application
            </h2>
            <p className="text-muted-foreground theme-optimize">
              RASHMI-LOCK Restrained Joint Piping System is designed for a wide range of applications where conventional jointing systems would be insufficient.
            </p>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 max-w-4xl mx-auto"
          >
            {applications.map((application, index) => (
              <ApplicationItem key={index} text={application} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section - simplified animations */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rashmi-red/5 to-background/80 theme-transition"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to explore <span className="text-rashmi-red">RASHMI-LOCK</span>?
            </h2>
            <p className="text-muted-foreground mb-8 theme-transition">
              Contact us to learn more about our innovative RASHMI-LOCK Restrained Joint System and how it can benefit your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-rashmi-red text-white font-medium hover:bg-rashmi-red/90 transition-colors shadow-lg shadow-rashmi-red/20"
                >
                  Contact Our Team
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="/brochures"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-card text-foreground font-medium hover:bg-muted transition-colors shadow-md theme-transition"
                >
                  Download Brochure
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Add ThemeToggle to the bottom of the page */}
      <ThemeToggle />
      
      <Footer />
    </div>
  );
};

const RashmiLockWithSuspense = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="animated-gradient w-12 h-12 rounded-full"></div>
    </div>}>
      <RashmiLock />
    </Suspense>
  );
};

export default memo(RashmiLockWithSuspense); 