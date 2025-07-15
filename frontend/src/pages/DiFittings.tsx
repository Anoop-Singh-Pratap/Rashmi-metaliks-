import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, Check, Ruler, ShieldCheck, ChevronDown, BookOpen, ArrowRight, MapPin, Award, Settings, Pipette, CheckCircle, Layers, Shield, Zap, Factory, AlertCircle } from 'lucide-react';
import { useHover } from '@mantine/hooks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import RevealText from '../components/ui/RevealText';
import { Helmet } from 'react-helmet-async';
import BenefitsSection from '../components/ui/BenefitsSection';
import { diFittingsSchema, generateFAQSchema, generateBreadcrumbSchema } from '../lib/schema';
import { cn } from '../utils/cn';
import { useTheme } from '@/context/ThemeContext';
import FittingsManufacturing from '../components/FittingsManufacturing';

// Custom styles component to avoid @import rule issues
const DiFittingsStyles = () => {
  return (
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
      `}</style>
    </Helmet>
  );
};

// Fixed TypeScript error by specifying literal types for repeatType
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

// Microinteraction animations for explore button
const exploreButtonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2, type: "spring", stiffness: 400 } },
  tap: { scale: 0.95, transition: { duration: 0.2 } }
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

// Enhanced card component with hover effects
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

// Section heading component
const SectionHeading = ({ eyebrow, title, description }) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <RevealText text={eyebrow} className="text-rashmi-red font-medium mb-3" />
      <h2 className="text-3xl md:text-4xl font-bold mb-5">
        {title.split(' ').map((word, i) => (
          <span key={i} className={i % 3 === 1 ? 'text-rashmi-red' : ''}>
            {word}{' '}
          </span>
        ))}
      </h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const DiFittings = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('dimensions');
  const [stats, setStats] = useState({ production: 0, varieties: 0, projects: 0, countries: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef);
  const isStatsInView = useInView(statsRef);
  const isFeaturesInView = useInView(featuresRef);
  const heroControls = useAnimation();
  const featuresControls = useAnimation();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  
  // Parallax effects
  const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
  const fittingFeatures = [
    {
      title: "Precise Engineering",
      description: "Precisely engineered to ensure perfect pipe connections and system integrity.",
      icon: Settings
    },
    {
      title: "Corrosion Resistance",
      description: "Special coatings prevent corrosion, extending the lifespan of your piping system.",
      icon: ShieldCheck
    },
    {
      title: "Multiple Configurations",
      description: "Available in various angles, sizes, and types to meet all project requirements.",
      icon: Ruler
    },
    {
      title: "Quality Materials",
      description: "Manufactured from high-quality ductile iron for strength and durability.",
      icon: Pipette
    }
  ];

  useEffect(() => {
    if (isHeroInView) {
      heroControls.start({ opacity: 1, y: 0 });
    }
    if (isFeaturesInView) {
      featuresControls.start('visible');
    }
  }, [isHeroInView, isFeaturesInView, heroControls, featuresControls]);

  // Enhanced scroll functionality
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Use scrollIntoView with behavior: 'smooth' for a better UX
      // Calculate offset to account for fixed header
      const headerHeight = 80; // Estimated header height in pixels
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      // Use window.scrollTo for more precise scroll positioning
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
      
      // Update URL without full page reload for better navigation
      if (history.pushState) {
        history.pushState(null, '', `#${sectionId}`);
      } else {
        window.location.hash = sectionId;
      }
      
      // Set active section for UI updates
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Handle hash in URL for direct section navigation
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Small timeout to ensure DOM is ready
      setTimeout(() => {
        const section = document.getElementById(hash);
        if (section) {
          const headerHeight = 80; // Estimated header height in pixels
          const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
          });
          
          setActiveSection(hash);
        }
      }, 100);
    }

    // Improved image loading with proper error handling
    const img = new Image();
    img.src = "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/otqfxjgx8xbpv10kxlan";
    
    // Success handler
    img.onload = () => setIsLoaded(true);
    
    // Error handler - still show the page but log the error
    img.onerror = () => {
      console.error("Failed to load hero image");
      setIsLoaded(true);
    };

    // Much longer fallback timer - only as absolute last resort
    const timer = setTimeout(() => {
      if (!isLoaded) {
        console.warn("Hero image load timed out, forcing display");
        setIsLoaded(true);
      }
    }, 5000);

    // Enhanced intersection observer with better thresholds for smoother transitions
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // Update URL without page reload for better navigation state
            if (history.replaceState) {
              history.replaceState(null, '', `#${entry.target.id}`);
            }
          }
        });
      },
      { 
        threshold: [0.2, 0.5, 0.8],
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    // Handle browser back/forward navigation
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(hash);
        }
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isLoaded]);

  // Stats counter animation
  useEffect(() => {
    if (isStatsInView) {
      const duration = 2000;
      const startTime = Date.now();
      const endValues = { production: 150000, varieties: 50, projects: 400, countries: 25 };
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setStats({
          production: Math.floor(progress * endValues.production),
          varieties: Math.floor(progress * endValues.varieties),
          projects: Math.floor(progress * endValues.projects),
          countries: Math.floor(progress * endValues.countries)
        });
        
        if (progress === 1) clearInterval(interval);
      }, 16);
      
      return () => clearInterval(interval);
    }
  }, [isStatsInView]);

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

  // SEO Schemas
  const faqSchema = generateFAQSchema([
    {
      question: "What types of DI Fittings does Rashmi Metaliks offer?",
      answer: "Rashmi Metaliks offers a comprehensive range of DI fittings including bends, elbows, tees, crosses, reducers, flanged adapters, collars, couplings, and end caps for water distribution systems."
    },
    {
      question: "What are the key features of Rashmi Metaliks DI Fittings?",
      answer: "Rashmi Metaliks DI Fittings feature precise engineering, superior corrosion resistance with special coatings, multiple configurations to meet various project needs, and high-quality ductile iron construction for strength and durability."
    },
    {
      question: "What international standards do Rashmi Metaliks DI Fittings comply with?",
      answer: "Rashmi Metaliks DI Fittings comply with international standards including EN 545, ISO 2531, AWWA C153/ANSI A21.53, and BS EN 598, ensuring the highest quality and reliability."
    },
    {
      question: "What are the main applications for Rashmi Metaliks DI Fittings?",
      answer: "Rashmi Metaliks DI Fittings are used in potable water networks, sewage systems, industrial pipelines, fire protection systems, irrigation systems, and major infrastructure projects."
    }
  ]);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/#products" },
    { name: "Ductile Iron Fittings", url: "/di-fittings" }
  ]);
  
  // Combined schema array for SEO component
  const schemas = [diFittingsSchema, faqSchema, breadcrumbSchema];

  const { theme } = useTheme();
  
  const socketsData = [
    {
      "nominal_size": "80",
      "outside_diameter": 98,
      "socket_depth": 84,
      "weight": 2.3
    },
    {
      "nominal_size": "100",
      "outside_diameter": 118,
      "socket_depth": 87,
      "weight": 2.84
    },
    {
      "nominal_size": "150",
      "outside_diameter": 170,
      "socket_depth": 91,
      "weight": 4.15
    },
    {
      "nominal_size": "200",
      "outside_diameter": 222,
      "socket_depth": 95,
      "weight": 5.63
    },
    {
      "nominal_size": "250",
      "outside_diameter": 274,
      "socket_depth": 99,
      "weight": 7.34
    },
    {
      "nominal_size": "300",
      "outside_diameter": 326,
      "socket_depth": 103,
      "weight": 9.28
    }
  ];

  const flangesData = [
    {
      "nominal_size": "80",
      "outside_diameter": 200,
      "bolt_circle": 160,
      "no_of_bolts": 8,
      "weight": 5.6
    },
    {
      "nominal_size": "100",
      "outside_diameter": 220,
      "bolt_circle": 180,
      "no_of_bolts": 8,
      "weight": 6.7
    },
    {
      "nominal_size": "150",
      "outside_diameter": 285,
      "bolt_circle": 240,
      "no_of_bolts": 8,
      "weight": 10.2
    },
    {
      "nominal_size": "200",
      "outside_diameter": 340,
      "bolt_circle": 295,
      "no_of_bolts": 12,
      "weight": 13.6
    },
    {
      "nominal_size": "250",
      "outside_diameter": 400,
      "bolt_circle": 350,
      "no_of_bolts": 12,
      "weight": 17.3
    },
    {
      "nominal_size": "300",
      "outside_diameter": 455,
      "bolt_circle": 400,
      "no_of_bolts": 12,
      "weight": 21.5
    }
  ];

  const bendData = [
    {
      "nominal_size": "80",
      "l_mm": 170,
      "weight_11_deg": 3.2,
      "weight_22_deg": 3.5,
      "weight_45_deg": 4.1,
      "weight_90_deg": 6.8
    },
    {
      "nominal_size": "100",
      "l_mm": 180,
      "weight_11_deg": 4.1,
      "weight_22_deg": 4.5,
      "weight_45_deg": 5.2,
      "weight_90_deg": 8.6
    },
    {
      "nominal_size": "150",
      "l_mm": 200,
      "weight_11_deg": 6.5,
      "weight_22_deg": 7.2,
      "weight_45_deg": 8.5,
      "weight_90_deg": 14.1
    },
    {
      "nominal_size": "200",
      "l_mm": 220,
      "weight_11_deg": 9.8,
      "weight_22_deg": 10.9,
      "weight_45_deg": 12.7,
      "weight_90_deg": 21.3
    },
    {
      "nominal_size": "250",
      "l_mm": 240,
      "weight_11_deg": 13.8,
      "weight_22_deg": 15.3,
      "weight_45_deg": 17.9,
      "weight_90_deg": 30.1
    },
    {
      "nominal_size": "300",
      "l_mm": 260,
      "weight_11_deg": 18.6,
      "weight_22_deg": 20.6,
      "weight_45_deg": 24.1,
      "weight_90_deg": 40.5
    }
  ];

  const advantages = [
    {
      title: "Perfect Compatibility",
      description: "Engineered to seamlessly integrate with our DI pipe systems, ensuring a cohesive and reliable pipeline network."
    },
    {
      title: "Same Durability",
      description: "Manufactured with the same high-quality ductile iron as our pipes, guaranteeing exceptional strength and longevity."
    },
    {
      title: "Diverse Joints",
      description: "Available in a variety of joint configurations, including flanged, spigot and socket, and mechanical joints, to suit any project requirement."
    },
    {
      title: "Pressure Capable",
      description: "Designed to withstand high-pressure conditions, ensuring safe and efficient fluid transfer in demanding applications."
    }
  ];

  return (
    <div ref={containerRef} className={`min-h-screen bg-background text-foreground relative transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Render the styles component here */}
      <DiFittingsStyles />
      
      <SEO 
        title="Ductile Iron Fittings | Premium DI Fittings | Rashmi Metaliks"
        description="High-quality Ductile Iron Fittings from Rashmi Metaliks. Our DI fittings offer perfect connections, corrosion resistance, and variety of configurations for water distribution systems."
        keywords="Ductile Iron Fittings, DI Fittings, Pipe Fittings, Water Distribution Fittings, Rashmi Metaliks, Corrosion Resistant Fittings"
        canonicalUrl="/di-fittings"
        ogType="product"
        ogImage="https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/otqfxjgx8xbpv10kxlan"
        schema={schemas}
      />

      <div className="relative z-50">
        <Header />
      </div>
      
      {/* Hero Section with Enhanced Parallax Effects */}
      <section 
        id="overview" 
        ref={heroRef}
        className="relative pt-28 md:pt-36 pb-24 min-h-[100vh] w-full flex items-center overflow-hidden"
        style={{ 
          position: 'relative',
          height: 'calc(100vh - 80px)' // Subtract header height
        }}
      >
        {/* Background image using Cloudinary URL */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <div className="relative w-full h-full">
            <img 
              src="https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/Rashmi%20Metaliks/wfpkbm4zgptwhef9dkve" 
              alt="DI Fittings Background" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(229,57,53,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(229,57,53,0.05)_1px,transparent_1px)] bg-[size:50px_50px] w-full h-full"></div>
        
        <div className="container mx-auto px-4 relative z-10 w-full">
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
                <span className="text-white text-sm font-medium uppercase tracking-wider">Premium Products</span>
              </motion.div>
            </motion.div>
            
            {/* Main title with RevealText */}
            <div className="mb-4">
              <RevealText
                text="Engineered Ductile Iron"
                as="h1"
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white"
                staggerDelay={0.08}
              />
              
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="block text-xl md:text-2xl mt-4 text-rashmi-red font-bold"
              >
                Fittings & Accessories
              </motion.span>
            </div>
            
            <div className="w-32 h-1 mx-auto my-6 rounded-full animated-gradient"></div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto"
            >
              Premium quality Ductile Iron Fittings engineered to complete your piping system with perfect connections, durability, and corrosion resistance.
            </motion.p>
            
            {/* Enhanced stat badges with floating animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center mb-12"
            >
              <motion.span 
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-rashmi-red text-white shadow-md border border-rashmi-red/20"
              >
                <Check size={16} className="mr-1" /> EN 545 Certified
              </motion.span>
              <motion.span 
                variants={flowAnimation}
                initial="initial"
                animate="animate"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-card border border-border shadow-md backdrop-blur-sm"
              >
                <Check size={16} className="mr-1 text-rashmi-red" /> ISO 2531 Compliant
              </motion.span>
              <motion.span 
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-rashmi-red text-white shadow-md border border-rashmi-red/20"
              >
                <Check size={16} className="mr-1" /> PN 10-40 Pressure Rating
              </motion.span>
              <motion.span 
                variants={flowAnimation}
                initial="initial"
                animate="animate"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-card border border-border shadow-md backdrop-blur-sm"
              >
                <Check size={16} className="mr-1 text-rashmi-red" /> DN 80-1600 Diameters
              </motion.span>
            </motion.div>
            
            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                variants={exploreButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => scrollToSection('features')}
                className="bg-rashmi-red hover:bg-rashmi-red/90 text-white py-3 px-6 rounded-lg flex items-center text-lg font-medium transition-colors shadow-lg shadow-rashmi-red/20"
              >
                Explore Features
                <motion.span 
                  className="ml-2 inline-block"
                  variants={arrowVariants}
                  initial="initial"
                  animate="animate"
                >
                  <ArrowDown size={18} />
                </motion.span>
              </motion.button>
              
              <Link 
                to="/contact-us" 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white py-3 px-6 rounded-lg flex items-center text-lg font-medium transition-colors border border-white/20 shadow-lg"
              >
                Request Quotation
                <ArrowRight size={18} className="ml-2" />
              </Link>
              
              <motion.button
                variants={exploreButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => scrollToSection('manufacturing-process')}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white py-3 px-6 rounded-lg flex items-center text-lg font-medium transition-colors border border-white/20 shadow-lg"
              >
                View Manufacturing Process
                <Factory size={18} className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Fixed scroll to explore button that's separate from the other content */}
        <motion.div 
          className="fixed bottom-8 right-8 z-50 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={() => scrollToSection('features')}
          whileHover={{ y: -5 }}
        >
          <div className="bg-rashmi-red text-white rounded-full p-4 shadow-lg flex flex-col items-center">
            <span className="text-sm font-medium mb-1">Scroll</span>
            <ArrowDown size={20} />
          </div>
        </motion.div>
      </section>
      
      {/* Statistics Section */}
      <section ref={statsRef} className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card p-6 rounded-xl border border-border shadow-sm text-center"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-rashmi-red mb-2">
                {stats.production.toLocaleString()}
              </div>
              <div className="text-muted-foreground font-medium">
                Annual Production <span className="text-md">(MT)</span>
          </div>
          </motion.div>
          
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card p-6 rounded-xl border border-border shadow-sm text-center"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-rashmi-red mb-2">
                {stats.varieties}+
              </div>
              <div className="text-muted-foreground font-medium">
                Types of Fittings
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card p-6 rounded-xl border border-border shadow-sm text-center"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-rashmi-red mb-2">
                {stats.projects}+
              </div>
              <div className="text-muted-foreground font-medium">
                Projects Completed
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card p-6 rounded-xl border border-border shadow-sm text-center"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-rashmi-red mb-2">
                {stats.countries}+
              </div>
              <div className="text-muted-foreground font-medium">
                Countries Served
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading 
            eyebrow="Outstanding Quality"
            title="Key Features of Our DI Fittings"
            description="Our ductile iron fittings are designed to provide reliable connections, maximum durability, and seamless integration with your piping systems."
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresControls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {fittingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                viewport={{ once: true }}
                className="h-full"
              >
                <GlowingCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  className="h-full"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
        
      {/* Types of Fittings Section */}
      <section id="types" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading 
            eyebrow="Complete Range"
            title="Types of DI Fittings"
            description="Rashmi Metaliks offers a comprehensive range of ductile iron fittings to meet all your water distribution needs."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Bends & Elbows",
                description: "Available in angles of 11.25°, 22.5°, 45°, and 90° to create directional changes in pipeline systems.",
                image: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/fittings%20pics/bwchafmk5927dyxqhzku",
                alt: "Ductile iron bends and elbows of various angles"
              },
              {
                title: "Tees & Crosses",
                description: "Connect three or four pipes at junction points for branch connections or distribution networks.",
                image: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/fittings%20pics/m3vkybjfhnnsyobpyfhs",
                alt: "Ductile iron tee and cross fittings for pipeline junctions"
              },
              {
                title: "Reducers",
                description: "Connect pipes of different diameters while maintaining flow efficiency and system integrity.",
                image: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/fittings%20pics/im0p8f9zyrtkj7nrwl2h",
                alt: "Ductile iron reducers for connecting different pipe sizes"
              },
              {
                title: "Flanged Adapters",
                description: "Create connections between spigot ends and flanged components for versatile system integration.",
                image: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/fittings%20pics/lqyi4adxz9xfysrxmid9",
                alt: "Ductile iron flanged adapters for component connections"
              },
              {
                title: "Sockets",
                description: "Join pipe sections securely while allowing for easy maintenance and system expansion.",
                image: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/fittings%20pics/iexnsfly3v3olvuelgqm",
                alt: "Ductile iron sockets for pipe joining"
              },
              {
                title: "End Caps",
                description: "Seal the ends of pipelines securely for terminations, testing, or future extensions.",
                image: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/fittings%20pics/siwyzzplorzksnez4wns",
                alt: "Ductile iron end caps for pipeline termination"
              }
            ].map((fitting, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={fitting.image}
                    alt={fitting.alt}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={400}
                    height={250}
                    onError={(e) => {
                      // Fallback for image load errors
                      const target = e.target as HTMLImageElement;
                      target.src = "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/placeholders/di-fitting-placeholder";
                      target.alt = "Placeholder for " + fitting.title;
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="w-24 h-1 bg-rashmi-red/80 rounded-full mb-4 transform origin-left group-hover:scale-x-110 transition-transform duration-300"></div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-rashmi-red transition-colors">{fitting.title}</h3>
                  <p className="text-muted-foreground">{fitting.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
        
      {/* Standards & Specifications */}
      <section id="specifications" className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading 
            eyebrow="Quality Assured"
            title="Standards & Specifications" 
            description="Our ductile iron fittings comply with international standards, ensuring reliability, compatibility, and performance."
          />
          
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-rashmi-red">International Standards</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="text-rashmi-red shrink-0 mt-1 mr-3" size={18} />
                    <div>
                      <span className="font-medium">EN 545:</span> European standard for ductile iron pipes, fittings, and accessories for water pipelines
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-rashmi-red shrink-0 mt-1 mr-3" size={18} />
                    <div>
                      <span className="font-medium">ISO 2531:</span> International standard for ductile iron pipes, fittings, and accessories for pressure applications
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-rashmi-red shrink-0 mt-1 mr-3" size={18} />
                    <div>
                      <span className="font-medium">AWWA C153/ANSI A21.53:</span> American Water Works Association standard for compact ductile iron fittings
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-rashmi-red shrink-0 mt-1 mr-3" size={18} />
                    <div>
                      <span className="font-medium">BS EN 598:</span> British standard for ductile iron pipes, fittings and accessories for sewerage applications
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-rashmi-red">Technical Specifications</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="text-rashmi-red shrink-0 mt-1 mr-3" size={18} />
                    <div>
                      <span className="font-medium">Material:</span> Ductile Iron (GGG50) with minimum tensile strength of 420 MPa
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-rashmi-red shrink-0 mt-1 mr-3" size={18} />
                    <div>
                      <span className="font-medium">Pressure Rating:</span> PN10, PN16, PN25, and PN40 options available
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-rashmi-red shrink-0 mt-1 mr-3" size={18} />
                    <div>
                      <span className="font-medium">Coating:</span> Internal cement lining and external zinc coating with finishing layer
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-rashmi-red shrink-0 mt-1 mr-3" size={18} />
                    <div>
                      <span className="font-medium">Joint Types:</span> Push-on, mechanical, and flanged joints available
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
        
      {/* Applications Section */}
      <section id="applications" className="py-20 bg-muted/30 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeading 
            eyebrow="Versatile Solutions"
            title="Application Areas" 
            description="Our DI fittings are engineered for various applications across municipal, industrial, and infrastructure projects."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Potable Water Networks",
                description: "Safe and reliable distribution of drinking water in municipal and residential systems.",
                icon: "🚰"
              },
              {
                title: "Sewage Systems",
                description: "Durable solutions for waste management and sanitation infrastructure.",
                icon: "♨️"
              },
              {
                title: "Industrial Pipelines",
                description: "Robust connections for manufacturing, processing, and industrial facilities.",
                icon: "🏭"
              },
              {
                title: "Fire Protection",
                description: "Critical components for fire hydrant systems and sprinkler networks.",
                icon: "🔥"
              },
              {
                title: "Irrigation Systems",
                description: "Efficient water distribution for agricultural and landscape applications.",
                icon: "🌱"
              },
              {
                title: "Infrastructure Projects",
                description: "Essential components for bridges, highways, and major public works.",
                icon: "🏗️"
              }
            ].map((application, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-card border border-border rounded-xl p-6 overflow-hidden group transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rashmi-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-rashmi-red text-white shadow-lg mb-4 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-2xl">{application.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{application.title}</h3>
                <p className="text-muted-foreground">{application.description}</p>
                <div className="absolute bottom-0 left-0 h-1 bg-rashmi-red transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ width: '0%' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
        
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto text-center bg-card border border-border p-10 md:p-16 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl">
                <div className="bg-rashmi-red/5 rounded-full w-[600px] h-[600px] blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Need <span className="text-rashmi-red">DI Fittings</span> for Your Project?
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Contact our team for detailed specifications, pricing information, and expert advice on selecting the right fittings for your application.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    to="/contact-us"
                    className="inline-flex items-center px-6 py-3 bg-rashmi-red hover:bg-rashmi-red/90 text-white font-medium rounded-lg transition-colors shadow-lg"
                  >
                    Request a Quote
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    to="/brochures"
                    className="inline-flex items-center px-6 py-3 bg-card border border-border text-foreground font-medium rounded-lg transition-colors hover:bg-muted shadow-md"
                  >
                    Download Brochure
                    <BookOpen className="ml-2" size={18} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Detailed Manufacturing Process Section */}
      <section id="manufacturing-process" className="relative" style={{ isolation: 'isolate' }}>
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center mb-4">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-rashmi-red text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg"
          >
            New Process
          </motion.div>
        </div>
        <FittingsManufacturing key="fittings-manufacturing" />
      </section>
      
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto text-center bg-card border border-border p-12 md:p-16 rounded-2xl relative shadow-lg"
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl">
                <div className="bg-rashmi-red/5 rounded-full w-[700px] h-[700px] blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground">
                Ready to integrate Rashmi DI Fittings into your <span className="text-rashmi-red">water systems?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Contact our experts to learn more about our high-quality DI Fittings and how they can benefit your water management solutions.
              </p>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, backgroundColor: "#d4473f" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center px-8 py-4 font-medium rounded-lg text-white bg-rashmi-red hover:bg-rashmi-red/90"
              >
                Contact Us Today
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DiFittings;
