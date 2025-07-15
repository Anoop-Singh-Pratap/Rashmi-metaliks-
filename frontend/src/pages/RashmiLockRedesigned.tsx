import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Badge } from 'antd';
import { useHover } from '@mantine/hooks';
import { IconLock, IconDroplet, IconShield, IconChecks, IconArrowDown, IconArrowRight, IconBolt, IconAdjustments, IconSunHigh, IconMoon } from '@tabler/icons-react';
import { cn } from '../utils/cn';
import { useTheme } from '../context/ThemeContext';

// Import components from the original file
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

// Import custom components
import { RevealText, Card3D, Glow, ShimmerButton, FloatingAnimation, Spotlight, TypewriterEffect } from '../components/ui/AceternityComponents';
import { SpecTable, transformDimensionsData, transformPipeDimensionsData } from '../components/ui/SpecTable';

// Data imports
import { dimensionsData, pipeDimensionsData, lockFeatures, advantages, applications } from '../data/rashmiLockData';

// Aceternity UI inspired components (custom implementations)
const BackgroundGradient = ({ children, className, containerClassName, ...props }) => {
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-lg bg-gradient-to-r from-rashmi-red to-rashmi-red/70 opacity-70 blur-lg transition duration-500 group-hover:opacity-80",
          "animate-pulse"
        )}
      />
      <div
        className={cn(
          "relative flex items-center justify-center rounded-lg bg-black px-8 py-10 transition duration-200",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

const TextReveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        ref={ref}
        initial={{ y: 100 }}
        animate={isInView ? { y: 0 } : { y: 100 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
};

const GlowingCard = ({ icon: Icon, title, description, className = "" }) => {
  const { hovered, ref } = useHover();
  
  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -5 }}
      className={`relative bg-card border border-border rounded-xl p-6 overflow-hidden group transition-all duration-300 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-rashmi-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-rashmi-red text-white shadow-lg mb-4 transition-transform duration-300 ${hovered ? "scale-110" : ""}`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <div className="absolute bottom-0 left-0 h-1 bg-rashmi-red transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ width: hovered ? '100%' : '0%' }} />
    </motion.div>
  );
};

// 3D Floating element inspired by Aceternity UI
const FloatingElement = ({ children }) => {
  return (
    <motion.div
      initial={{ rotateX: 0, rotateY: 0 }}
      whileHover={{ 
        rotateX: 5, 
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.5 } 
      }}
      className="perspective-3d"
    >
      {children}
    </motion.div>
  );
};

const HeroButton = ({ onClick, children }) => {
  return (
    <motion.button
      onClick={onClick}
      className="px-8 py-3 rounded-lg bg-gradient-to-r from-rashmi-red to-rashmi-red/90 text-white font-medium shadow-lg shadow-rashmi-red/20 hover:shadow-xl hover:shadow-rashmi-red/30 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

const SectionHeading = ({ eyebrow, title, description }) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <RevealText text={eyebrow} className="text-rashmi-red font-medium mb-3" />
      <h2 className="text-3xl md:text-4xl font-bold mb-5">
        {title.split(' ').map((word, i) => (
          <span key={i} className={word === 'RASHMI-LOCK' ? 'text-rashmi-red' : ''}>
            {word}{' '}
          </span>
        ))}
      </h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

// AdvantageCard component
const AdvantageCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div 
      className="bg-card border border-border rounded-lg p-6 hover:border-rashmi-red/30 transition-all duration-300 group"
      whileHover={{ 
        y: -5, 
        boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.15)"
      }}
    >
      <IconShield className="text-rashmi-red mb-4 h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
};

// Main component
const RashmiLockRedesigned = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('dimensions');
  const { theme, toggleTheme } = useTheme();
  
  // Refs for sections
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const advantagesRef = useRef(null);
  const applicationsRef = useRef(null);
  const aboutRef = useRef(null);
  const technicalRef = useRef(null);
  
  // Check if sections are in view
  const isHeroInView = useInView(heroRef);
  const isFeaturesInView = useInView(featuresRef);
  const isAdvantagesInView = useInView(advantagesRef);
  const isApplicationsInView = useInView(applicationsRef);
  const isAboutInView = useInView(aboutRef);
  const isTechnicalInView = useInView(technicalRef);
  
  // Animations
  const heroControls = useAnimation();
  const featuresControls = useAnimation();
  const advantagesControls = useAnimation();
  const applicationsControls = useAnimation();
  const aboutControls = useAnimation();
  const technicalControls = useAnimation();
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Initialize dark mode based on user preference
  useEffect(() => {
    // Check for user preference in localStorage or system preference
    const isDarkMode = localStorage.getItem('rashmi-theme') === 'dark' || 
      (!('rashmi-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // No need to set local state anymore as we're using theme context
    
    /* Remove this code as it's handled by ThemeContext
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    */
  }, []);

  // Function to toggle dark mode - use theme context's toggle
  const toggleDarkMode = () => {
    toggleTheme(); // Use the global context method
    
    /* Remove this code as it's handled by ThemeContext
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
    */
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Load image and show component
    const img = new Image();
    img.src = "/lovable-uploads/compressed/rashmi-lock.webp";
    img.onload = () => setIsLoaded(true);

    // Force show the component after a timeout
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Control animations based on element visibility
  useEffect(() => {
    if (isHeroInView) heroControls.start({ opacity: 1, y: 0 });
    if (isFeaturesInView) featuresControls.start('visible');
    if (isAdvantagesInView) advantagesControls.start('visible');
    if (isApplicationsInView) applicationsControls.start('visible');
    if (isAboutInView) aboutControls.start({ opacity: 1, x: 0 });
    if (isTechnicalInView) technicalControls.start({ opacity: 1, y: 0 });
  }, [
    isHeroInView, 
    isFeaturesInView, 
    isAdvantagesInView, 
    isApplicationsInView,
    isAboutInView,
    isTechnicalInView,
    heroControls,
    featuresControls,
    advantagesControls,
    applicationsControls,
    aboutControls,
    technicalControls
  ]);

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  return (
    <div className={`min-h-screen bg-background relative transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} ref={containerRef}>
      <Helmet>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .geometric-pattern {
            background-image: radial-gradient(rgba(235, 89, 81, 0.1) 2px, transparent 2px), 
                              radial-gradient(rgba(235, 89, 81, 0.07) 2px, transparent 2px);
            background-size: 40px 40px;
            background-position: 0 0, 20px 20px;
          }
          
          .bg-grid-pattern {
            background-size: 50px 50px;
            background-image: 
              linear-gradient(to right, rgba(229, 57, 53, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(229, 57, 53, 0.03) 1px, transparent 1px);
          }
          
          .perspective-3d {
            perspective: 1000px;
            transform-style: preserve-3d;
          }
          
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .animated-gradient {
            background-size: 200% 200%;
            background-image: linear-gradient(to right, #E53935, #FF5252, #E53935);
            animation: gradientFlow 8s ease infinite;
          }
          
          @keyframes shine {
            from {
              background-position: -100px;
            }
            to {
              background-position: 200px;
            }
          }
          
          .animate-shine {
            animation: shine 2s linear infinite;
            background-size: 200px 100%;
            background-repeat: no-repeat;
          }
          
          /* Dark mode transitions */
          :root {
            --transition-duration: 0.3s;
          }
          
          .dark {
            color-scheme: dark;
          }
          
          *, *::before, *::after {
            transition: background-color var(--transition-duration) ease-in-out, border-color var(--transition-duration) ease-in-out, color var(--transition-duration) ease-in-out;
          }
        `}</style>
        <script>{`
          // Dark mode toggle functionality is handled by ThemeContext component
          // This script is no longer needed
        `}</script>
      </Helmet>
      
      <Header />
      <SEO 
        title="Rashmi-Lock Restrained Jointing System | High-Pressure DI Pipe Joints"
        description="Revolutionary self-restrained, semi-flexible jointing system for Ductile Iron Pipes that eliminates thrust blocks and handles up to 100 bar pressure - perfect for challenging installations and seismic zones."
        keywords="Rashmi-Lock, restrained joint, ductile iron pipes, trenchless laying, self-restrained joint, semi-flexible joint, high pressure pipes, thrust block elimination"
        canonicalUrl="/rashmi-lock"
        ogType="product"
        ogImage="/lovable-uploads/compressed/rashmi-lock.webp"
      />
    
      {/* Hero Section - Inspired by Magic UI and Aceternity UI */}
      <section id="hero" className="relative pt-28 md:pt-36 pb-24 min-h-[90vh] flex items-center overflow-hidden perspective-3d" ref={heroRef}>
        {/* Background pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        {/* Background gradient shapes */}
        <div className="absolute -top-96 -right-96 w-[800px] h-[800px] rounded-full bg-rashmi-red/3 blur-3xl geometric-pattern opacity-50"></div>
        <div className="absolute -bottom-96 -left-96 w-[800px] h-[800px] rounded-full bg-rashmi-red/3 blur-3xl geometric-pattern opacity-50"></div>
        
        {/* Animated background with parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-rashmi-dark/20 via-rashmi-dark/10 to-background"></div>
          
          {/* Parallax background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{ 
              y: heroImageY,
              filter: "brightness(0.8) saturate(1.2)"
            }}
          >
            <div className="absolute inset-0 geometric-pattern"></div>
          </motion.div>
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(229,57,53,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(229,57,53,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </motion.div>
        
        <Spotlight className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={heroControls}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
            style={{ y: textY }}
          >
            {/* Category label with improved animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4 overflow-hidden inline-block"
            >
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gradient-to-r from-rashmi-red to-rashmi-red/80 px-4 py-1 rounded-full mb-6 shadow-lg shadow-rashmi-red/20"
              >
                <span className="text-white text-sm font-medium uppercase tracking-wider">Advanced Jointing System</span>
              </motion.div>
            </motion.div>
            
            {/* Main title with RevealText */}
            <div className="mb-4">
              <RevealText
                text="Revolutionary Pipeline"
                as="h1"
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold"
                staggerDelay={0.08}
              />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex justify-center items-center mt-4"
              >
                <TypewriterEffect 
                  words={["RASHMI-LOCK", "Restrained Joint System", "Self-Locking Technology"]} 
                  className="text-xl md:text-2xl text-rashmi-red font-bold" 
                />
              </motion.div>
            </div>
            
            <div className="w-32 h-1 mx-auto my-6 rounded-full animated-gradient"></div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
            >
              A self-restrained, semi-flexible push-in-jointing system for Ductile Iron Pipes that eliminates thrust blocks and facilitates trenchless installation in challenging environments.
            </motion.p>
            
            {/* Enhanced stat badges with floating animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center mb-12"
            >
              <FloatingAnimation
                yOffset={10}
                duration={3}
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-rashmi-red text-white shadow-md border border-rashmi-red/20"
              >
                <IconChecks size={16} className="mr-1" /> ISO 10804-1 Compliant
              </FloatingAnimation>
              
              <FloatingAnimation
                yOffset={10}
                duration={2.5}
                delay={0.2}
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-card border border-border shadow-md backdrop-blur-sm"
              >
                <IconChecks size={16} className="mr-1 text-rashmi-red" /> DN100-DN600 Range
              </FloatingAnimation>
              
              <FloatingAnimation
                yOffset={10}
                duration={3.2}
                delay={0.4}
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-rashmi-red text-white shadow-md border border-rashmi-red/20"
              >
                <IconChecks size={16} className="mr-1" /> Up to 100 Bar Pressure
              </FloatingAnimation>
            </motion.div>
            
            {/* CTA button with scroll indicator */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8 flex flex-col items-center"
            >
              <ShimmerButton onClick={() => scrollToSection('features')}>
                Explore Features
              </ShimmerButton>
              
              <motion.div 
                className="mt-12"
                style={{ opacity: scrollIndicatorOpacity }}
              >
                <motion.div
                  animate={{
                    y: [0, 5, 0],
                    transition: { 
                      repeat: Infinity, 
                      duration: 1.5, 
                      ease: "easeInOut" 
                    }
                  }}
                  className="flex flex-col items-center text-muted-foreground"
                >
                  <span className="text-sm mb-2">Scroll to discover</span>
                  <IconArrowDown size={20} className="text-rashmi-red" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </Spotlight>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative bg-card" ref={featuresRef}>
        <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading 
            eyebrow="Key Advantages"
            title="RASHMI-LOCK Features"
            description="Discover what makes our revolutionary jointing system the preferred choice for challenging pipeline installations."
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresControls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
          >
            <motion.div variants={itemVariants}>
              <GlowingCard 
                icon={IconLock}
                title="Self-Restrained Design"
                description="Eliminates the need for thrust blocks in pipeline installations."
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <GlowingCard 
                icon={IconDroplet}
                title="High Pressure Capacity"
                description="Handles pressure up to 100 bar depending on pipe size."
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <GlowingCard 
                icon={IconBolt}
                title="Angular Deflection"
                description="Flexible joints with angular deflection up to 5° for easy installation."
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <GlowingCard 
                icon={IconAdjustments}
                title="Quick Installation"
                description="Simple locking system significantly reduces installation time."
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative geometric-pattern" ref={aboutRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={aboutControls}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl font-bold mb-5">What is <span className="text-rashmi-red">RASHMI-LOCK</span>?</h2>
              <p className="text-muted-foreground mb-4">
                RASHMI-LOCK Jointing system is a restrained semi-flexible push-in-jointing of Ductile Iron Pipes. It is a Self-Restrained, semi-flexible jointing system of socket and spigot pipe. The joint can be deflected up to the designed value as per function of size range.
              </p>
              <p className="text-muted-foreground mb-4">
                Water or other fluids passing through the pipe line exert internal pressure on the walls of the pipe barrel and the same force is being transferred to the other pipe. RASHMI-LOCK Jointing system helps in transferring the thrust forces generated to next pipe through weld bead made on spigot of each pipe via lock segments.
              </p>
              <p className="text-muted-foreground mb-6">
                The Complete Jointing Assembly make joint self-restraining thus eliminating the need of thrust blocks and facilitate trenchless laying of ductile iron pipe lines.
              </p>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-start gap-2">
                  <IconChecks className="text-rashmi-red mt-1 h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">Size range from DN100-DN600</p>
                </div>
                <div className="flex items-start gap-2">
                  <IconChecks className="text-rashmi-red mt-1 h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">Meets ISO 10804-1 standards</p>
                </div>
                <div className="flex items-start gap-2">
                  <IconChecks className="text-rashmi-red mt-1 h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">Semi-flexible design</p>
                </div>
                <div className="flex items-start gap-2">
                  <IconChecks className="text-rashmi-red mt-1 h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">Angular deflection capability</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={aboutControls}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <Card3D>
                <div className="bg-card rounded-xl overflow-hidden shadow-xl border border-border">
                  <img 
                    src="https://res.cloudinary.com/dada5hjp3/image/upload/v1744461897/Rashmi%20Metaliks/eoa8obecx01oka73pli9.png" 
                    alt="Rashmi-Lock Jointing System" 
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/600x400/e53935/ffffff?text=Rashmi-Lock";
                    }}
                  />
                </div>
              </Card3D>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Data Section */}
      <section id="technical-data" className="py-20 dark:bg-slate-900 bg-slate-100 transition-colors duration-300" ref={technicalRef}>
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Technical Specifications"
            title="RASHMI-LOCK Technical Data"
            description="Our RASHMI-LOCK system is available in sizes ranging from DN100 to DN600 and designed for both standard water applications and high-pressure requirements."
          />
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab('dimensions')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'dimensions' 
                  ? 'bg-rashmi-red text-white shadow-md transition-none' 
                  : 'bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-100 transition-none'
              }`}
            >
              Pipe Dimensions
            </button>
            <button
              onClick={() => setActiveTab('pressure')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'pressure' 
                  ? 'bg-rashmi-red text-white shadow-md transition-none' 
                  : 'bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-100 transition-none'
              }`}
            >
              Allowable Pressure
            </button>
          </div>
          
          <div className="mb-8 relative" style={{ contain: 'layout' }}>
            {/* Preload both tables but show only the active one - this prevents remounting */}
            <div className={`${activeTab === 'dimensions' ? 'block' : 'hidden'} transition-none`}>
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-md">
                <SpecTable
                  data={transformPipeDimensionsData(pipeDimensionsData).data}
                  columns={transformPipeDimensionsData(pipeDimensionsData).columns}
                  title="Pipe Dimensions (mm)"
                  className="mb-2"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-2">**Details can be arranged on request</p>
            </div>
            
            <div className={`${activeTab === 'pressure' ? 'block' : 'hidden'} transition-none`}>
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-md">
                <SpecTable
                  data={transformDimensionsData(dimensionsData).data}
                  columns={transformDimensionsData(dimensionsData).columns}
                  title="Allowable Pressure & Deflection"
                  className="mb-2"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-2">PFA - Allowable Operating Pressure (bar)</p>
            </div>
          </div>
          
          {/* Theme toggle button */}
          <div className="flex justify-center mt-6">
            <button 
              onClick={toggleDarkMode}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-md border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hidden dark:block" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 block dark:hidden" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              <span className="text-sm font-medium">Toggle Theme</span>
            </button>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="py-20 bg-grid-pattern" ref={advantagesRef}>
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Benefits"
            title="RASHMI-LOCK Advantages"
            description="Discover the unique advantages that make our RASHMI-LOCK Restrained Joint System the preferred choice for challenging pipeline installations."
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={advantagesControls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {advantages.map((advantage, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-card border border-border rounded-lg p-6 hover:border-rashmi-red/30 transition-all duration-300 group"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.15)"
                }}
              >
                <IconShield className="text-rashmi-red mb-4 h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground text-sm">{advantage.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Applications Section */}
      <section id="applications" className="py-20 bg-muted/30" ref={applicationsRef}>
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Use Cases"
            title="Areas of Application"
            description="RASHMI-LOCK Restrained Joint Piping System is designed for a wide range of applications where conventional jointing systems would be insufficient."
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={applicationsControls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 max-w-4xl mx-auto"
          >
            {applications.map((application, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="flex items-start gap-3 group"
              >
                <IconArrowRight className="text-rashmi-red mt-0.5 h-5 w-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                <p className="text-foreground">{application}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rashmi-red/5 to-background/80"></div>
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
            <p className="text-muted-foreground mb-8">
              Contact us to learn more about our innovative RASHMI-LOCK Restrained Joint System and how it can benefit your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ShimmerButton containerClassName="w-full sm:w-auto">
                <Link
                  to="/contact-us"
                  className="w-full"
                >
                  Contact Our Team
                </Link>
              </ShimmerButton>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="/brochures"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-lg border border-border bg-card text-foreground font-medium hover:bg-muted transition-colors shadow-md"
                >
                  Download Brochure
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />

      {/* Apply button or toggle in the UI that uses toggleDarkMode */}
      <button 
        className="fixed bottom-4 right-4 p-3 bg-card border border-border rounded-full shadow-lg z-50 hover:bg-muted transition-colors duration-300"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          <IconSunHigh size={20} className="text-foreground" />
        ) : (
          <IconMoon size={20} className="text-foreground" />
        )}
      </button>
    </div>
  );
};

export default RashmiLockRedesigned; 