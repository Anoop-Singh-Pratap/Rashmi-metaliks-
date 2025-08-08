import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, Check, Ruler, Pipette, Waves, ShieldCheck, ChevronDown, BookOpen, ArrowRight, MapPin, Award, Users, Settings, AlertCircle, Info } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductViewer from '../components/ui/ProductViewer';
import DIPipesManufacturing from '../components/DIPipesManufacturing';
import SEO from '../components/SEO';
import { diPipesSchema, generateFAQSchema, generateBreadcrumbSchema } from '../lib/schema';
import RevealText from '../components/ui/RevealText';
import PipeViewer3D from '../components/ui/PipeViewer3D';
import SpecComparisonTool from '../components/ui/SpecComparisonTool';
import ProjectCalculator from '../components/ui/ProjectCalculator';
import BenefitsSection from '../components/ui/BenefitsSection';
import { useTheme } from '../context/ThemeContext';

// Custom styles component to avoid @import rule issues
const DiPipesStyles = () => {
  // Empty component since styles are now in globals.css
  return null;
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

// Enhanced version of the specification table with improved styling and functionality
interface TableRow {
  [key: string]: string | number | undefined;
}

interface EnhancedSpecTableProps {
  headers: string[];
  rows: TableRow[];
  className?: string;
}

const EnhancedSpecTable: React.FC<EnhancedSpecTableProps> = ({ headers, rows, className = '' }) => {
  const { theme } = useTheme();
  
  // Optional: Add sorting capability
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ 
    key: headers[0], 
    direction: 'asc' 
  });
  
  const handleSort = (header: string) => {
    setSortConfig(prevConfig => ({
      key: header,
      direction: prevConfig.key === header && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      // Handle undefined or null values
      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;
      
      // Convert to numbers for numeric comparison if needed
      const aNum = typeof aValue === 'string' ? parseFloat(aValue as string) : aValue;
      const bNum = typeof bValue === 'string' ? parseFloat(bValue as string) : bValue;
      
      if (!isNaN(aNum as number) && !isNaN(bNum as number)) {
        return sortConfig.direction === 'asc' 
          ? (aNum as number) - (bNum as number)
          : (bNum as number) - (aNum as number);
      }
      
      // String comparison
      return sortConfig.direction === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [rows, sortConfig]);
  
  // Numerical column detection for alignment and colorization
  const isNumericalColumn = (header: string): boolean => {
    return ['C25', 'C30', 'C40', 'C50', 'C64', 'C100', 'K7', 'K9'].includes(header) ||
           header.includes('mm') || 
           header.includes('Limit');
  };

  // Function to determine cell background color based on value (for thickness values)
  const getCellBackgroundColor = (header: string, value: string | number | undefined): string => {
    if (!value || typeof value !== 'number') return '';
    
    if (['C25', 'C30', 'C40', 'C50', 'C64', 'C100', 'K7', 'K9'].includes(header)) {
      // Color scale from light to dark based on wall thickness - increased opacity
      if (value < 6) return 'bg-blue-100/80 dark:bg-blue-900/50';
      if (value < 10) return 'bg-green-100/80 dark:bg-green-900/50';
      if (value < 15) return 'bg-yellow-100/80 dark:bg-yellow-900/50';
      if (value < 20) return 'bg-orange-100/80 dark:bg-orange-900/50';
      return 'bg-red-100/80 dark:bg-red-900/50';
    }
    
    return '';
  };

  // Get tooltip content based on header
  const getTooltipContent = (header: string): string => {
    switch (header) {
      case 'DN (mm)': return 'Nominal Diameter in millimeters';
      case 'DE (mm)': return 'External Diameter in millimeters';
      case 'Limit Deviation (mm)': return 'Allowed deviation from nominal dimensions';
      case 'C25': return 'Class 25 pressure rating - Wall thickness in mm';
      case 'C30': return 'Class 30 pressure rating - Wall thickness in mm';
      case 'C40': return 'Class 40 pressure rating - Wall thickness in mm';
      case 'C50': return 'Class 50 pressure rating - Wall thickness in mm';
      case 'C64': return 'Class 64 pressure rating - Wall thickness in mm';
      case 'C100': return 'Class 100 pressure rating - Wall thickness in mm';
      case 'As Per BS EN 598 (PresurePipe)': return 'British Standard for ductile iron pipes';
      case 'K7': return 'K7 classification - Wall thickness in mm';
      case 'K9': return 'K9 classification - Wall thickness in mm';
      default: return header;
    }
  };

  // Function to generate a heat map color for numerical cells
  const getHeatMapColor = (header: string, value: number): string => {
    if (!['C25', 'C30', 'C40', 'C50', 'C64', 'C100', 'K7', 'K9'].includes(header)) {
      return '';
    }
    
    // Maximum value used for normalization
    const maxValue = 28;
    const normalizedValue = Math.min(value / maxValue, 1);
    
    if (theme === 'dark') {
      return `rgba(229, 57, 53, ${normalizedValue * 0.5})`;
    } else {
      return `rgba(229, 57, 53, ${normalizedValue * 0.15})`;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-xl shadow-md overflow-hidden border border-border ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-rashmi-red/20 via-card to-rashmi-red/10 dark:from-rashmi-red/30 dark:via-card/80 dark:to-rashmi-red/20">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={header}
                  onClick={() => handleSort(header)}
                  className={`px-4 py-3.5 text-left text-sm font-semibold select-none cursor-pointer transition-colors hover:bg-rashmi-red/10 relative group ${
                    idx === 0 ? 'sticky left-0 z-10 backdrop-blur-sm' : ''
                  } ${
                    isNumericalColumn(header) ? 'text-right' : ''
                  }`}
                  style={{
                    background: idx === 0 ? 'inherit' : undefined,
                    backdropFilter: idx === 0 ? 'blur(8px)' : undefined
                  }}
                >
                  <div className="flex items-center gap-1 justify-between">
                    <span className="relative">
                      {header}
                      {/* Tooltip */}
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 w-max max-w-[200px] px-2 py-1 bg-foreground dark:bg-neutral-800 text-background dark:text-neutral-200 text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-20 whitespace-normal text-center">
                        {getTooltipContent(header)}
                      </span>
                    </span>
                    {sortConfig.key === header && (
                      <span className="text-rashmi-red bg-white/20 dark:bg-black/20 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                  {/* Bottom gradient bar for active sort */}
                  {sortConfig.key === header && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-rashmi-red/70 via-rashmi-red to-rashmi-red/70"
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-border">
            {sortedRows.map((row, rowIdx) => (
              <motion.tr
                key={rowIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rowIdx * 0.03 }}
                className={`hover:bg-rashmi-red/5 dark:hover:bg-rashmi-red/10 transition-all duration-300 ${
                  rowIdx % 2 === 1 ? 'bg-muted/20 dark:bg-muted/5' : ''
                }`}
              >
                {headers.map((header, colIdx) => {
                  const value = row[header];
                  const isNumeric = typeof value === 'number';
                  
                  return (
                    <td
                      key={`${rowIdx}-${colIdx}`}
                      className={`px-4 py-3 text-sm border-r border-border/20 last:border-r-0 ${
                        colIdx === 0 ? 'sticky left-0 font-medium bg-inherit backdrop-blur-sm z-10' : ''
                      } ${
                        isNumericalColumn(header) ? 'text-right font-mono' : ''
                      } ${
                        getCellBackgroundColor(header, value)
                      } relative group`}
                    >
                      {value !== undefined ? (
                        <>
                          <span className="relative">
                            {value}
                            {/* Show hover indicator for numerical values */}
                            {isNumeric && ['C25', 'C30', 'C40', 'C50', 'C64', 'C100', 'K7', 'K9'].includes(header) && (
                              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-foreground dark:bg-neutral-800 text-background dark:text-neutral-200 text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-20">
                                {header}: {value}mm thickness
                              </span>
                            )}
                          </span>
                          {/* Visual indicator bar for thickness */}
                          {isNumeric && ['C25', 'C30', 'C40', 'C50', 'C64', 'C100', 'K7', 'K9'].includes(header) && (
                            <div className="absolute bottom-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <div 
                                className="absolute bottom-0 left-0 h-1 bg-rashmi-red/40 dark:bg-rashmi-red/60"
                                style={{ width: `${Math.min((value as number) / 30 * 100, 100)}%` }}
                              ></div>
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-muted-foreground/50 italic">—</span>
                      )}
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Legend for thickness values */}
      <div className="py-3 px-4 bg-muted/20 dark:bg-muted/10 border-t border-border flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800"></div>
          <span>&lt; 6 mm</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-green-100/80 dark:bg-green-900/50 border border-green-200 dark:border-green-800"></div>
          <span>6-10 mm</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-yellow-100/80 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-800"></div>
          <span>10-15 mm</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-orange-100/80 dark:bg-orange-900/50 border border-orange-200 dark:border-orange-800"></div>
          <span>15-20 mm</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-red-100/80 dark:bg-red-900/50 border border-red-200 dark:border-red-800"></div>
          <span>&gt; 20 mm</span>
        </div>
      </div>
    </motion.div>
  );
};

const DiPipes = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('dimensions');
  const [stats, setStats] = useState({ production: 0, years: 0, projects: 0, countries: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef);
  const isStatsInView = useInView(statsRef);
  const heroControls = useAnimation();
  
  const pipeFeatures = [
    {
      title: "High Strength",
      description: "Ductile iron provides exceptional tensile and yield strength.",
      icon: Ruler
    },
    {
      title: "Corrosion Resistance",
      description: "Special coatings prevent corrosion, extending the lifespan.",
      icon: ShieldCheck
    },
    {
      title: "Hydraulic Capacity",
      description: "Smooth inner linings maximize flow and reduce pumping costs.",
      icon: Waves
    },
    {
      title: "Longevity",
      description: "Ductile iron pipes can last for more than 100 years.",
      icon: Pipette
    }
  ];

  useEffect(() => {
    if (isHeroInView) {
      heroControls.start({ opacity: 1, y: 0 });
    }
  }, [isHeroInView, heroControls]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    const img = new Image();
    img.src = "/lovable-uploads/compressed/Product_DiPipes.webp";
    img.onload = () => setIsLoaded(true);

    // Force show the page even if the image doesn't load
    const timer = setTimeout(() => {
      setIsLoaded(true);

      // Show the fallback for ProductViewer if needed
      const fallback = document.querySelector('.product-viewer-fallback');
      if (fallback) {
        fallback.classList.remove('hidden');
      }
    }, 2000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Stats counter animation
  useEffect(() => {
    if (isStatsInView) {
      const duration = 2000;
      const startTime = Date.now();
      const endValues = { production: 770, years: 100, projects: 500, countries: 40 };
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setStats({
          production: Math.floor(progress * endValues.production),
          years: Math.floor(progress * endValues.years),
          projects: Math.floor(progress * endValues.projects),
          countries: Math.floor(progress * endValues.countries)
        });
        
        if (progress === 1) clearInterval(interval);
      }, 16);
      
      return () => clearInterval(interval);
    }
  }, [isStatsInView]);

  // SEO Schemas
  const faqSchema = generateFAQSchema([
    {
      question: "Who is the world's 2nd largest manufacturer of Ductile Iron Pipes?",
      answer: "Rashmi Metaliks is the world's 2nd largest manufacturer of Ductile Iron Pipes with an impressive 770,000 MT annual production capacity."
    },
    {
      question: "What is the production capacity of Rashmi Metaliks for DI Pipes?",
      answer: "Rashmi Metaliks has a massive 770,000 MT annual production capacity for Ductile Iron Pipes, making it the 2nd largest manufacturer globally."
    },
    {
      question: "What are the key features of Rashmi Metaliks DI Pipes?",
      answer: "Rashmi Metaliks DI Pipes offer exceptional tensile and yield strength, superior corrosion resistance with special coatings, excellent hydraulic capacity with smooth inner linings, and remarkable longevity of over 100 years."
    },
    {
      question: "What standards do Rashmi Metaliks DI Pipes comply with?",
      answer: "Rashmi Metaliks DI Pipes comply with international standards including EN 545, ISO 2531, AWWA C151/A21.51, and ASTM A536, ensuring the highest quality and reliability."
    }
  ]);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/#products" },
    { name: "Ductile Iron Pipes", url: "/di-pipes" }
  ]);
  
  // Combined schema array for SEO component
  const schemas = [diPipesSchema, faqSchema, breadcrumbSchema];



  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      <div className={`relative transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Render the styles component here */}
      <DiPipesStyles />

      <SEO
        title="Ductile Iron Pipes | World's 2nd Largest DI Pipe Manufacturer | Rashmi Metaliks - 770,000 MT Capacity"
        description="Premium quality Ductile Iron Pipes from Rashmi Metaliks - World's 2nd largest DI pipe manufacturer with 770,000 MT annual capacity. Our DI pipes offer exceptional strength, corrosion resistance and longevity for water and sewage applications. Leading global manufacturer of DI pipes with EN 545, ISO 2531, AWWA C151 compliance."
        keywords="Ductile Iron Pipes, DI Pipes, World's 2nd largest DI pipe manufacturer, 770000 MT capacity, Water Distribution Pipes, Rashmi Metaliks, Corrosion Resistant Pipes, Global Leadership, largest ductile iron pipe company, biggest DI pipe manufacturer, leading ductile iron pipe producer, world's largest ductile iron pipe manufacturer, EN 545, ISO 2531, AWWA C151, ductile iron water pipes, cast iron pipes"
        canonicalUrl="/di-pipes"
        ogType="product"
        ogImage="/lovable-uploads/compressed/Product_DiPipes.webp"
        schema={schemas}
      />

      {/* Remove the fixed header wrapper div with z-index 999 and just use the Header component directly */}
      <Header />
      
      {/* Hero Section with Enhanced Parallax Effects */}
      <section 
        id="overview" 
        ref={heroRef}
        className="relative pt-32 md:pt-40 pb-24 md:pb-32 min-h-[100vh] w-full flex items-center perspective-container"
        style={{ 
          position: 'relative',
          height: 'calc(100vh - 80px)' // Subtract header height
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-10 w-full h-full bg-overlay">
          <div className="absolute inset-0 bg-grid-pattern w-full h-full"></div>
        </div>
        
        {/* Background gradient shapes */}
        <div className="absolute -top-96 -right-96 w-[100vw] h-[100vh] rounded-full bg-rashmi-red/3 blur-3xl geometric-pattern opacity-50 bg-overlay"></div>
        <div className="absolute -bottom-96 -left-96 w-[100vw] h-[100vh] rounded-full bg-rashmi-red/3 blur-3xl geometric-pattern opacity-50 bg-overlay"></div>
        
        {/* Background with parallax */}
        <motion.div 
          className="absolute inset-0 z-0 w-full h-full bg-overlay parallax-background"
            style={{ 
            background: 'radial-gradient(circle at 30% 70%, rgba(229, 57, 53, 0.1) 0%, transparent 50%)',
          }}
        />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 z-0 opacity-5 w-full h-full bg-overlay">
          <div className="absolute inset-0 bg-grid-pattern w-full h-full"></div>
        </div>
        </div>

        <div className="container mx-auto px-4 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={heroControls}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
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
                <span className="text-white text-sm font-medium uppercase tracking-wider">Flagship Product</span>
              </motion.div>
            </motion.div>
            
            {/* Main title with RevealText */}
            <div className="mb-4">
              <RevealText
                text="Engineering Fluid Excellence"
                as="h1"
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold"
                staggerDelay={0.08}
              />
              
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="block text-xl md:text-2xl mt-4 text-muted-foreground"
              >
                Ductile Iron Pressure Pipes
              </motion.span>
            </div>
            
            <div className="w-32 h-1 mx-auto my-6 rounded-full animate-pulse" 
              style={{ backgroundImage: 'linear-gradient(90deg, #E53935, #FF5252, #E53935)' }}></div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
            >
              High-performance ductile iron pipes for water and sewage infrastructure. 
              Manufactured to meet stringent international standards, ensuring durability and reliability.
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
            
            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.a 
                href="#features" 
                variants={exploreButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="inline-flex items-center gap-2 bg-rashmi-red hover:bg-rashmi-red/90 text-white px-8 py-4 rounded-full transition-all duration-300 font-medium shadow-lg shadow-rashmi-red/20 group"
              >
                Explore Features 
                <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
              </motion.a>
              
              <motion.a 
                href="#specifications" 
                variants={exploreButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-card/50 text-foreground border border-border px-8 py-4 rounded-full transition-all duration-300 font-medium group"
              >
                View Specifications
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
            
            {/* World's 2nd largest badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-16 inline-block"
            >
              <div className="px-6 py-3 bg-card border border-border rounded-full backdrop-blur-sm shadow-xl">
                <span className="text-sm md:text-base font-medium">
                  <span className="text-rashmi-red font-bold">World's 2nd Largest</span> DI Pipe Manufacturer
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator with responsive positioning */}
        <motion.div
          className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <a
            href="#features"
            aria-label="Scroll to explore features"
            className="outline-none"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-black/50 backdrop-blur-sm px-5 py-3 min-h-[44px] rounded-full text-white transition-colors duration-300 flex flex-col items-center shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 transform-gpu"
            >
              <span className="text-sm font-medium mb-1">Scroll to explore</span>
              <motion.div
                animate={{
                  y: [0, 5, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowDown size={16} />
              </motion.div>
            </motion.div>
          </a>
        </motion.div>
      </section>
      
      {/* NEW Key Statistics Section */}
      <section ref={statsRef} className="py-16 relative overflow-hidden bg-rashmi-dark/5 dark:bg-rashmi-red/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card/80 dark:bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-lg text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rashmi-red/10 mb-4">
                <Award className="text-rashmi-red" size={28} />
              </div>
              <h3 className="text-3xl font-bold mb-1">{stats.production}K</h3>
              <p className="text-muted-foreground">MT Annual Production</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card/80 dark:bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-lg text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rashmi-red/10 mb-4">
                <Settings className="text-rashmi-red" size={28} />
              </div>
              <h3 className="text-3xl font-bold mb-1">{stats.years}+</h3>
              <p className="text-muted-foreground">Years Lifespan</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card/80 dark:bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-lg text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rashmi-red/10 mb-4">
                <Users className="text-rashmi-red" size={28} />
              </div>
              <h3 className="text-3xl font-bold mb-1">{stats.projects}+</h3>
              <p className="text-muted-foreground">Projects Completed</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card/80 dark:bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-lg text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rashmi-red/10 mb-4">
                <MapPin className="text-rashmi-red" size={28} />
              </div>
              <h3 className="text-3xl font-bold mb-1">{stats.countries}+</h3>
              <p className="text-muted-foreground">Countries Served</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* NEW 3D Product Viewer Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="mb-16 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-3"
              >
                <span className="text-rashmi-red text-sm font-medium uppercase tracking-wider">Interactive Experience</span>
              </motion.div>
              
              <RevealText
                text="Explore Our Products in 3D"
                as="h2"
                className="text-3xl md:text-5xl font-bold text-foreground mb-3"
                staggerDelay={0.05}
              />
              
              <p className="text-muted-foreground text-lg mb-6">
                Interact with our DI pipes to see every detail up close
              </p>
            </div>
            
            <PipeViewer3D />
          </motion.div>
        </div>
      </section>
      
      {/* Product Visualization Section with ProductViewer */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* 3D product visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[60vh] rounded-[2rem] overflow-hidden border border-border bg-card/50 backdrop-blur-sm shadow-xl perspective-container"
            >
              <ProductViewer productName="Ductile Iron Pipe" description="Premium quality DI pipes with international certifications" />
              <div className="product-viewer-fallback absolute inset-0 flex items-center justify-center text-rashmi-red text-xl font-bold">
                <img
                  src="https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/Rashmi%20Metaliks/sl4ukstefebluhe1z8lz"
                  alt="Ductile Iron Pipe"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            {/* Key highlights */}
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-card p-6 rounded-[1.5rem] border border-border shadow-md backdrop-blur-sm dark:bg-card/80"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-rashmi-red/10 flex items-center justify-center mr-4">
                    <Check className="text-rashmi-red" size={20} />
                  </div>
                  <h3 className="text-xl font-bold">770,000 MT</h3>
                </div>
                <p className="text-muted-foreground">Annual production capacity, making us the world's 2nd largest manufacturer</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-card p-6 rounded-[1.5rem] border border-border shadow-md backdrop-blur-sm dark:bg-card/80"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-rashmi-red/10 flex items-center justify-center mr-4">
                    <Check className="text-rashmi-red" size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Global Standards</h3>
                </div>
                <p className="text-muted-foreground">Compliant with EN 545, ISO 2531, AWWA C151/A21.51, and ASTM A536</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-card p-6 rounded-[1.5rem] border border-border shadow-md backdrop-blur-sm dark:bg-card/80"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-rashmi-red/10 flex items-center justify-center mr-4">
                    <Check className="text-rashmi-red" size={20} />
                  </div>
                  <h3 className="text-xl font-bold">100+ Years</h3>
                </div>
                <p className="text-muted-foreground">Engineered service life, providing exceptional long-term value</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <BenefitsSection />
      
      {/* Interactive Tools Section */}
      <section className="py-16 bg-muted/20 dark:bg-rashmi-dark/5">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <span className="text-rashmi-red text-sm font-medium uppercase tracking-wider mb-3 inline-block">
              Interactive Tools
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Plan Your Project
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Use our interactive tools to compare specifications and calculate your project requirements
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <SpecComparisonTool />
            <ProjectCalculator />
          </div>
        </div>
      </section>
      
      {/* Features Section - Enhanced */}
      <section id="features" className="py-24 relative gradient-border overflow-hidden geometric-pattern dark:bg-rashmi-dark/5 scroll-mt-24 md:scroll-mt-32">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0"></div>
        <div className="absolute -right-64 -top-64 w-[500px] h-[500px] rounded-full bg-rashmi-red/3 blur-3xl opacity-50"></div>
        <div className="absolute -left-64 -bottom-64 w-[500px] h-[500px] rounded-full bg-rashmi-red/3 blur-3xl opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <div className="text-rashmi-red text-sm font-medium uppercase tracking-wider mb-3">
              <RevealText text="WHY CHOOSE OUR PIPES" />
            </div>
            
            <RevealText
              text="Benefits That Flow Beyond Expectations"
              as="h2"
              className="text-3xl md:text-5xl font-bold text-foreground mb-3"
              staggerDelay={0.05}
            />
            
            <p className="text-muted-foreground text-lg">
              Our DI pipes offer a perfect blend of strength, longevity, and value that make them the ideal choice for critical infrastructure projects.
            </p>
            
            <div className="w-16 h-1 bg-rashmi-red mx-auto mt-6 rounded-full"></div>
            
            {/* Link to Why Rashmi DI Pipes page */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <Link 
                to="/why-rashmi-di-pipes" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rashmi-red to-rashmi-dark text-white rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-rashmi-red/20 focus:outline-none focus:ring-2 focus:ring-rashmi-red/50 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Shimmer effect to draw attention */}
                <motion.span
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  style={{ backgroundSize: '200% 100%' }}
                  animate={{
                    backgroundPosition: ['200% 0', '-200% 0']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                ></motion.span>
                
                {/* Icon with attention-grabbing pulse */}
                <span className="relative z-10 bg-white/20 p-2 rounded-full">
                  <Info size={20} className="text-white animate-pulse" />
                </span>
                
                {/* Button text */}
                <span className="relative z-10">Discover Why Industry Leaders Choose Rashmi DI Pipes</span>
                
                {/* Arrow with enhanced animation */}
                <ArrowRight size={20} className="relative z-10 transition-transform duration-200 group-hover:translate-x-2" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {pipeFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
                className="bg-card dark:bg-card/70 border border-border rounded-[1.5rem] p-8 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="mb-4 bg-rashmi-red/10 w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-rashmi-red/20 transition-colors duration-300">
                  {React.createElement(feature.icon, { className: "text-rashmi-red group-hover:scale-110 transition-transform duration-300", size: 24 })}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-rashmi-red transition-colors duration-300">{feature.title}</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{feature.description}</p>
                
                {/* Highlight overlay on hover */}
                <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-gradient-to-r from-rashmi-red/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Top border accent that appears on hover */}
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0 w-0 group-hover:w-full transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Technical Specifications Section with Tabs */}
      <section id="specifications" className="py-24 relative gradient-border scroll-mt-24 md:scroll-mt-32">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-rashmi-dark/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="mb-16 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-3"
              >
                <span className="text-rashmi-red text-sm font-medium uppercase tracking-wider">Product Details</span>
              </motion.div>
              
              <RevealText
                text="Technical Specifications"
                as="h2"
                className="text-3xl md:text-5xl font-bold text-foreground mb-3"
                staggerDelay={0.05}
              />
              
              <p className="text-muted-foreground text-lg mb-10">
                Comprehensive specifications to help you select the right pipe for your application
              </p>
              
              {/* Tab navigation */}
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                <button 
                  onClick={() => setActiveTab('dimensions')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === 'dimensions' 
                      ? 'bg-rashmi-red text-white shadow-md' 
                      : 'bg-card border border-border hover:bg-rashmi-red/10'
                  }`}
                >
                  <Ruler size={16} />
                  Dimensions & Sizes
                </button>
                <button 
                  onClick={() => setActiveTab('materials')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === 'materials' 
                      ? 'bg-rashmi-red text-white shadow-md' 
                      : 'bg-card border border-border hover:bg-rashmi-red/10'
                  }`}
                >
                  <Pipette size={16} />
                  Materials & Properties
                </button>
                <button 
                  onClick={() => setActiveTab('coatings')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === 'coatings' 
                      ? 'bg-rashmi-red text-white shadow-md' 
                      : 'bg-card border border-border hover:bg-rashmi-red/10'
                  }`}
                >
                  <ShieldCheck size={16} />
                  Coatings & Linings
                </button>
                <button 
                  onClick={() => setActiveTab('standards')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === 'standards' 
                      ? 'bg-rashmi-red text-white shadow-md' 
                      : 'bg-card border border-border hover:bg-rashmi-red/10'
                  }`}
                >
                  <Award size={16} />
                  Standards & Certifications
                </button>
              </div>
            </div>
            
            {/* Tab content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-[1.5rem] overflow-hidden border border-border shadow-xl p-8"
            >
              {activeTab === 'dimensions' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Ruler className="text-rashmi-red" size={24} />
                    Available Dimensions & Sizes
                  </h3>
                  <div className="overflow-x-auto">
                    <EnhancedSpecTable
                      headers={['DN (mm)', 'DE (mm)', 'Limit Deviation (mm)', 'C25', 'C30', 'C40', 'C50', 'C64', 'C100', 'As Per BS EN 598 (PresurePipe)', 'K7', 'K9']}
                      rows={[
                        { 'DN (mm)': 80, 'DE (mm)': 98, 'Limit Deviation (mm)': '+1/-2.7', 'C40': 4.4, 'C50': 4.4, 'C64': 4.4, 'C100': 4.8, 'As Per BS EN 598 (PresurePipe)': 4.8, 'K7': 5.0, 'K9': 6.0 },
                        { 'DN (mm)': 100, 'DE (mm)': 118, 'Limit Deviation (mm)': '+1/-2.8', 'C40': 4.4, 'C50': 4.4, 'C64': 4.4, 'C100': 5.5, 'As Per BS EN 598 (PresurePipe)': 4.8, 'K7': 5.0, 'K9': 6.0 },
                        { 'DN (mm)': 125, 'DE (mm)': 144, 'Limit Deviation (mm)': '+1/-2.8', 'C40': 4.5, 'C50': 4.5, 'C64': 4.8, 'C100': 6.5, 'As Per BS EN 598 (PresurePipe)': 4.8, 'K7': 5.0, 'K9': 6.0 },
                        { 'DN (mm)': 150, 'DE (mm)': 170, 'Limit Deviation (mm)': '+1/-2.9', 'C40': 4.5, 'C50': 4.5, 'C64': 5.3, 'C100': 7.4, 'As Per BS EN 598 (PresurePipe)': 4.8, 'K7': 5.0, 'K9': 6.0 },
                        { 'DN (mm)': 200, 'DE (mm)': 222, 'Limit Deviation (mm)': '+1/-3.0', 'C40': 4.7, 'C50': 5.4, 'C64': 6.5, 'C100': 9.2, 'As Per BS EN 598 (PresurePipe)': 4.9, 'K7': 5.0, 'K9': 6.3 },
                        { 'DN (mm)': 250, 'DE (mm)': 274, 'Limit Deviation (mm)': '+1/-3.1', 'C40': 5.5, 'C50': 6.4, 'C64': 7.8, 'C100': 11.1, 'As Per BS EN 598 (PresurePipe)': 5.3, 'K7': 5.3, 'K9': 6.8 },
                        { 'DN (mm)': 300, 'DE (mm)': 326, 'Limit Deviation (mm)': '+1/-3.3', 'C30': 5.1, 'C40': 6.2, 'C50': 7.4, 'C64': 8.9, 'C100': 12.9, 'As Per BS EN 598 (PresurePipe)': 5.6, 'K7': 5.6, 'K9': 7.2 },
                        { 'DN (mm)': 350, 'DE (mm)': 378, 'Limit Deviation (mm)': '+1/-3.4', 'C25': 5.1, 'C30': 6.3, 'C40': 7.1, 'C50': 8.4, 'C64': 10.2, 'C100': 14.8, 'As Per BS EN 598 (PresurePipe)': 6.0, 'K7': 6.0, 'K9': 7.7 },
                        { 'DN (mm)': 400, 'DE (mm)': 429, 'Limit Deviation (mm)': '+1/-3.5', 'C25': 5.5, 'C30': 6.5, 'C40': 7.8, 'C50': 9.3, 'C64': 11.3, 'C100': 16.5, 'As Per BS EN 598 (PresurePipe)': 6.3, 'K7': 6.3, 'K9': 8.1 },
                        { 'DN (mm)': 450, 'DE (mm)': 480, 'Limit Deviation (mm)': '+1/-3.6', 'C25': 6.1, 'C30': 6.9, 'C40': 8.6, 'C50': 10.3, 'C64': 12.6, 'C100': 18.4, 'As Per BS EN 598 (PresurePipe)': 6.7, 'K7': 6.6, 'K9': 8.6 },
                        { 'DN (mm)': 500, 'DE (mm)': 532, 'Limit Deviation (mm)': '+1/-3.8', 'C25': 6.5, 'C30': 7.5, 'C40': 9.3, 'C50': 11.2, 'C64': 13.7, 'C100': 20.2, 'As Per BS EN 598 (PresurePipe)': 7.0, 'K7': 7.0, 'K9': 9.0 },
                        { 'DN (mm)': 600, 'DE (mm)': 635, 'Limit Deviation (mm)': '+1/-4.0', 'C25': 7.6, 'C30': 8.7, 'C40': 10.9, 'C50': 13.1, 'C64': 16.1, 'C100': 23.8, 'As Per BS EN 598 (PresurePipe)': 7.7, 'K7': 7.7, 'K9': 9.9 },
                        { 'DN (mm)': 700, 'DE (mm)': 738, 'Limit Deviation (mm)': '+1/-4.3', 'C25': 8.8, 'C30': 9.9, 'C40': 12.4, 'C50': 15.0, 'C64': 18.5, 'C100': 27.5, 'As Per BS EN 598 (PresurePipe)': 9.6, 'K7': 8.4, 'K9': 10.8 },
                        { 'DN (mm)': 750, 'DE (mm)': 790, 'Limit Deviation (mm)': 1, 'K7': 8.8, 'K9': 11.3 },
                        { 'DN (mm)': 800, 'DE (mm)': 842, 'Limit Deviation (mm)': '+1/-4.5', 'C25': 9.6, 'C30': 11.1, 'C40': 14.0, 'C50': 16.9, 'C64': 21.0, 'As Per BS EN 598 (PresurePipe)': 10.4, 'K7': 9.1, 'K9': 11.7 },
                        { 'DN (mm)': 900, 'DE (mm)': 945, 'Limit Deviation (mm)': '+1/-4.8', 'C25': 10.6, 'C30': 12.3, 'C40': 15.5, 'C50': 18.8, 'C64': 23.4, 'As Per BS EN 598 (PresurePipe)': 11.2, 'K7': 9.8, 'K9': 12.6 },
                        { 'DN (mm)': 1000, 'DE (mm)': 1048, 'Limit Deviation (mm)': '+1/-5.0', 'C25': 11.6, 'C30': 13.4, 'C40': 17.1, 'C50': 20.7, 'As Per BS EN 598 (PresurePipe)': 12.0, 'K7': 10.5, 'K9': 13.5 },
                        { 'DN (mm)': 1100, 'DE (mm)': 1152, 'Limit Deviation (mm)': '+1/-6.0', 'C25': 12.6, 'C30': 14.6, 'C40': 18.6, 'C50': 22.6, 'As Per BS EN 598 (PresurePipe)': 14.4, 'K7': 11.2, 'K9': 14.4 },
                        { 'DN (mm)': 1200, 'DE (mm)': 1255, 'Limit Deviation (mm)': '+1/-6.2', 'C25': 13.6, 'C30': 15.8, 'C40': 20.2, 'C50': 24.5, 'As Per BS EN 598 (PresurePipe)': 15.3, 'K7': 11.9, 'K9': 15.3 }
                      ]}
                      className="mb-6"
                    />
                  </div>
                  <div className="bg-rashmi-red/10 p-4 rounded-lg border border-rashmi-red/20">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <AlertCircle className="text-rashmi-red" size={18} />
                      Note About Wall Thickness
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      All dimensions are in millimeters. Wall thickness values shown in the table represent minimum requirements based on different pressure classes (C25-C100) and standard specifications (K7, K9). The full range of DI pipes from DN 80 to DN 1200 is available. Contact our technical team for detailed specifications for your specific project requirements.
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'materials' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Pipette className="text-rashmi-red" size={24} />
                    Material Properties
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-5 rounded-lg border border-border hover:shadow-md transition-all duration-300">
                      <h4 className="font-semibold mb-4">Mechanical Properties</h4>
                      <div className="space-y-4">
                        {[
                          {name: "Minimum Tensile Strength", value: "420 MPa", percent: "84%"},
                          {name: "Minimum Yield Strength", value: "300 MPa", percent: "60%"},
                          {name: "Minimum Elongation", value: "10%", percent: "50%"}
                        ].map(prop => (
                          <div key={prop.name} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{prop.name}</span>
                              <span className="font-medium">{prop.value}</span>
                            </div>
                            <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-rashmi-red"
                                initial={{ width: 0 }}
                                whileInView={{ width: prop.percent }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-rashmi-dark/5 dark:bg-card/30 p-5 rounded-lg border border-border">
                      <h4 className="font-semibold mb-4">Chemical Composition</h4>
                      <ul className="space-y-3">
                        {[
                          {element: "Carbon", value: "3.0 - 3.9%"},
                          {element: "Silicon", value: "1.8 - 2.8%"},
                          {element: "Manganese", value: "0.1 - 0.5%"},
                          {element: "Phosphorus", value: "≤ 0.09%"}
                        ].map(item => (
                          <motion.li 
                            key={item.element} 
                            className="flex justify-between items-center p-2 hover:bg-card/80 rounded"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <span className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-rashmi-red"></div>
                              {item.element}
                            </span>
                            <span className="font-medium">{item.value}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    Our ductile iron pipes provide exceptional strength and durability due to their spheroidal graphite microstructure, offering superior mechanical properties compared to traditional cast iron.
                  </p>
                </div>
              )}
              
              {activeTab === 'coatings' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck className="text-rashmi-red" size={24} />
                    Coatings & Linings
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-4 rounded-lg border border-border hover:shadow-md transition-shadow duration-300">
                      <h4 className="text-lg font-semibold text-rashmi-red mb-2">External Coatings</h4>
                      <ul className="space-y-3">
                        {[
                          {name: "Zinc Coating", desc: "Standard 200 g/m² metallic zinc coating with finishing layer"},
                          
                          {name: "Zinc-Aluminum", desc: "Enhanced 400 g/m² Zn-Al (85/15) coating for aggressive soil conditions"},
                          {name: "Polyethylene Sleeve", desc: "Additional protection option for highly corrosive environments"}
                        ].map((item, index) => (
                          <motion.li 
                            key={item.name} 
                            className="flex items-start gap-2 p-2 hover:bg-rashmi-red/5 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Check size={18} className="text-rashmi-red mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-medium">{item.name}:</span>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border border-border hover:shadow-md transition-shadow duration-300">
                      <h4 className="text-lg font-semibold text-rashmi-red mb-2">Internal Linings</h4>
                      <ul className="space-y-3">
                        {[
                          {name: "Cement Mortar", desc: "Standard high-alumina cement lining for potable water applications"},
                          {name: "Polyurethane", desc: "Special lining for aggressive water conditions or sewage applications"},
                          {name: "Epoxy", desc: "Available for specific industrial or chemical transport applications"}
                        ].map((item, index) => (
                          <motion.li 
                            key={item.name} 
                            className="flex items-start gap-2 p-2 hover:bg-rashmi-red/5 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Check size={18} className="text-rashmi-red mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-medium">{item.name}:</span>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'standards' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Award className="text-rashmi-red" size={24} />
                    Standards & Certifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <motion.div 
                        className="bg-rashmi-dark/5 dark:bg-card/30 p-4 rounded-lg border border-border"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <h4 className="font-semibold">International Standards</h4>
                        <ul className="mt-2 space-y-2">
                          {[
                            "EN 545: European Standard for water pipes",
                            "ISO 2531: International Standard for DI pipes",
                            "AWWA C151/A21.51: American Water Works Assoc.",
                            "ASTM A536: Standard for ductile iron castings"
                          ].map(standard => (
                            <li key={standard} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-rashmi-red"></div>
                              <span>{standard}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                      <motion.div 
                        className="bg-rashmi-dark/5 dark:bg-card/30 p-4 rounded-lg border border-border"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <h4 className="font-semibold">Quality Management</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-rashmi-red"></div>
                            <span>ISO 9001: Quality Management System</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-rashmi-red"></div>
                            <span>ISO 14001: Environmental Management System</span>
                          </li>
                        </ul>
                      </motion.div>
                    </div>
                    <div className="bg-card p-5 rounded-lg border border-border">
                      <h4 className="font-semibold mb-3">Testing & Quality Assurance</h4>
                      <ul className="space-y-3">
                        {[
                          "100% hydrostatic pressure testing at 1.5x operating pressure",
                          "Full dimensional inspection and tolerances verification",
                          "Material composition validation through spectral analysis",
                          "Mechanical property testing including tensile and impact tests",
                          "Coating thickness measurement and adhesion testing",
                          "Full traceability with batch identification marking"
                        ].map((test, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Check size={18} className="text-rashmi-red mt-1" />
                            <span>{test}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
            
            {/* Manufacturing process section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16 bg-card rounded-[1.5rem] overflow-hidden border border-border shadow-xl"
            >
              <DIPipesManufacturing />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-24 relative overflow-hidden gradient-border">
        <div className="absolute inset-0 bg-rashmi-red/10 dark:bg-rashmi-red/5"></div>
        <div className="absolute inset-0 geometric-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,57,53,0.15),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(229,57,53,0.1),transparent_70%)]"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0"></div>
        
        {/* Floating elements */}
        <motion.div 
          className="absolute right-[15%] top-[20%] w-16 h-16 rounded-full bg-rashmi-red/30 blur-md"
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute left-[20%] bottom-[30%] w-10 h-10 rounded-full bg-rashmi-red/20 blur-md"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-lg mb-8">
              Our engineering team is available to help you select the right DI pipe specifications for your project.
              Contact us today for a consultation or request a detailed product catalog.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-block"
              >
                <a href="/contact-us" className="inline-flex items-center gap-2 bg-rashmi-red hover:bg-rashmi-red/90 text-white px-8 py-4 rounded-full transition-all duration-300 font-medium shadow-lg shadow-rashmi-red/20 group">
                  Contact Us <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-block"
              >
                <a href="/brochures" className="inline-flex items-center gap-2 bg-background dark:bg-rashmi-dark/10 border border-border hover:bg-card dark:hover:bg-card/20 text-foreground px-8 py-4 rounded-full transition-all duration-300 font-medium group">
                  Download Catalog <BookOpen size={16} className="transition-transform group-hover:scale-110" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <div style={{ position: 'relative', zIndex: 100 }}>
        <Footer />
      </div>
      </div>
    </div>
  );
};

export default DiPipes;
