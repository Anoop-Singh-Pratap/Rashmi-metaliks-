import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform, MotionValue, useDragControls } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { TreePine, Sun, Droplets, HeartPulse, Users, ArrowRight, Globe, Leaf, TrendingUp, Sparkles, Lightbulb, Award, Target, LineChart, Gauge, BarChart3 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RevealText from '../components/ui/RevealText';
import ImageSwiper from '../components/ImageSwiper';
import '../styles/swiper.css';
import { Card3D, Glow, FloatingAnimation, Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/AceternityComponents';
import { getCSRItems } from '../services/cmsService';

// Lazy load heavy components
const EnhancedWaterUsageChart = lazy(() => import('../components/EnhancedWaterUsageChart'));
const EnhancedEmissionsChart = lazy(() => import('../components/EnhancedEmissionsChart'));

// Inspired by index.html typography and animation system
const StatBox = ({ value, label, index = 0 }: { value: string, label: string, index?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }}
    className="bg-background/90 backdrop-blur-sm border border-border p-6 rounded-[1.5rem] text-center hover:border-rashmi-red/50 transition-all duration-500"
  >
    <motion.div 
      initial={{ scale: 0.8 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
      className="text-3xl md:text-4xl font-bold text-rashmi-red mb-2"
    >
      {value}
    </motion.div>
    <div className="text-sm md:text-base text-muted-foreground">{label}</div>
  </motion.div>
);

// Enhanced Impact Metric Card with Advanced Animation
const ImpactMetricCard = ({ value, label, icon, description, index = 0 }: { 
  value: string, 
  label: string, 
  icon: React.ReactNode, 
  description: string, 
  index?: number 
}) => (
  <Card3D className="overflow-hidden">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 bg-background/90 backdrop-blur-sm border border-border rounded-[1.5rem] hover:border-rashmi-red/50 transition-all duration-500"
    >
      <div className="flex items-center mb-4">
        <div className="p-3 bg-rashmi-red/10 rounded-full mr-4">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">{label}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-rashmi-red">{value}</h3>
        </div>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  </Card3D>
);

// Enhanced grid-based card component inspired by index3.html
const CSRCard = ({ icon, title, image, stats, children, index = 0 }: { 
  icon: React.ReactNode,
  title: string,
  image: string,
  stats: string,
  children: React.ReactNode,
  index?: number
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    whileHover={{ 
      y: -10,
      transition: { duration: 0.3 }
    }}
    className="m-card -radius -shadow -hasIcon bg-background border border-border rounded-[1.5rem] overflow-hidden hover:shadow-xl transition-all duration-500 group"
  >
    <div className="m-card__image relative h-56 md:h-64 overflow-hidden">
      <motion.img 
        src={image}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.7, ease: "easeOut" }
        }}
      />
      <motion.div 
        initial={{ opacity: 0.9 }}
        whileHover={{ opacity: 1 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-rashmi-dark via-rashmi-dark/80 to-transparent p-4"
      >
        <div className="m-card__meta flex items-center gap-4">
          <motion.div 
            whileHover={{ 
              rotate: 5,
              scale: 1.1,
              transition: { duration: 0.3 }
            }}
            className="p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-white/10"
          >
            {icon}
          </motion.div>
          <div>
            <h3 className="m-card__title text-xl font-bold text-white">{title}</h3>
            <p className="tx-ps text-rashmi-red font-medium">{stats}</p>
          </div>
        </div>
      </motion.div>
    </div>
    <div className="m-card__content p-6 md:p-8">
      <p className="m-textContent text-muted-foreground group-hover:text-foreground transition-colors duration-300">{children}</p>
      
      <a href="#" className="a-link flex items-center mt-4 text-rashmi-red gap-2 group/link">
        <span>Learn More</span>
        <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
      </a>
    </div>
  </motion.div>
);

// Story Timeline Component
const StoryItem = ({ year, title, description, image, index = 0 }: {
  year: string,
  title: string,
  description: string,
  image: string,
  index?: number
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative grid md:grid-cols-2 gap-8 items-center"
    >
      {/* Line connector (visible on larger screens) */}
      {index > 0 && (
        <div className="absolute hidden md:block left-[7.5rem] top-[-3rem] w-[2px] h-[3rem] bg-gradient-to-b from-transparent to-rashmi-red/50"></div>
      )}

      <div className="md:text-right md:order-1 order-2">
        <div className="inline-flex items-center mb-3">
          <span className="text-sm text-rashmi-red font-bold px-3 py-1 rounded-full border border-rashmi-red/30 bg-rashmi-red/5">
            {year}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Card3D className="md:order-2 order-1 overflow-hidden rounded-2xl">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-60 object-cover rounded-2xl" 
        />
      </Card3D>
    </motion.div>
  );
};

// New components for combined sustainability data
const ComparisonMetric = ({ title, before, after, unit, improvement, index = 0 }: {
  title: string;
  before: string;
  after: string;
  unit: string;
  improvement: string;
  index?: number;
}) => (
  <motion.div 
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group"
    style={{ willChange: 'transform, opacity' }}
  >
    <div className="flex justify-between text-sm mb-1">
      <span>{title}</span>
      <motion.span 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        className="text-emerald-500 font-medium"
      >
        ↓ {improvement}
      </motion.span>
    </div>
    <div className="h-16 relative rounded-xl overflow-hidden border border-border bg-gradient-to-r from-background/60 to-background/30 p-3">
      <div className="flex justify-between h-full items-center">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          >
            <span className="text-xs text-muted-foreground">Before</span>
            <p className="font-bold">{before} <span className="text-xs font-normal text-muted-foreground">{unit}</span></p>
          </motion.div>
        </div>
        <div className="h-full w-0.5 bg-border relative z-10"></div>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
          >
            <span className="text-xs text-muted-foreground">Current</span>
            <p className="font-bold text-rashmi-red">{after} <span className="text-xs font-normal text-muted-foreground">{unit}</span></p>
          </motion.div>
        </div>
      </div>
      <motion.div 
        className="absolute left-0 top-0 bottom-0 bg-rashmi-red/10"
        initial={{ width: '100%' }}
        whileInView={{ width: '50%' }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: index * 0.1 + 0.6 }}
      ></motion.div>
    </div>
  </motion.div>
);

// BeforeAfterSlider component for visual comparison
const BeforeAfterSlider = ({ beforeImage, afterImage, label }: { 
  beforeImage: string, 
  afterImage: string,
  label?: string
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e.clientX);
    }
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      updateSliderPosition(e.touches[0].clientX);
    }
  };
  
  const handleEnd = () => {
    setIsDragging(false);
  };
  
  const updateSliderPosition = (clientX: number) => {
    if (!sliderRef.current) return;
    
    const container = sliderRef.current;
    const rect = container.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };
  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchend', handleEnd);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);
  
  return (
    <motion.div 
      ref={sliderRef}
      className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl border border-border cursor-ew-resize"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Before image (full width) */}
      <div className="absolute inset-0 z-10">
        <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
      </div>
      
      {/* After image (clipped by slider) */}
      <div 
        className="absolute inset-0 z-20 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img src={afterImage} alt="After" className="w-full h-full object-cover" style={{ width: `${100 / (sliderPosition/100)}%` }} />
      </div>

      {/* Slider handle */}
      <div 
        className="absolute top-0 bottom-0 z-30 w-1 bg-white"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <span className="w-0.5 h-4 bg-rashmi-red"></span>
            <span className="h-0.5 w-4 bg-rashmi-red"></span>
          </div>
        </div>
      </div>

      {label && (
        <div className="absolute bottom-4 left-4 right-4 z-40 text-center">
          <span className="px-4 py-2 bg-black/70 text-white rounded-full text-sm font-medium">
            {label}
          </span>
        </div>
      )}
    </motion.div>
  );
};

// AnimatedCounter for statistics
const AnimatedCounter = ({ 
  value, 
  duration = 1.5,
  delay = 0
}: { 
  value: number, 
  duration?: number,
  delay?: number
}) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    let startValue = 0;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress); // Easing function for smoother animation
      
      // Calculate current count based on eased progress
      const currentCount = Math.floor(easedProgress * (value - startValue) + startValue);
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(value); // Ensure final value is exact
      }
    };
    
    // Start the animation after the specified delay
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(updateCount);
    }, delay * 1000);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
    };
  }, [isInView, value, duration, delay]);
  
  // Easing function for smooth animation
  const easeOutExpo = (x: number): number => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  };
  
  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
};

// Implementation based on index.html animation system
const CSR = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLVideoElement>(null);
  const isHeroInView = useInView(heroRef);
  const heroControls = useAnimation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('emissions');
  const [activeMetricsTab, setActiveMetricsTab] = useState('emissions');
  const [activeScrollySection, setActiveScrollySection] = useState(0);
  const [csrSlides, setCsrSlides] = useState([]);
  
  // Advanced parallax effects from index.html
  const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  useEffect(() => {
    if (isHeroInView) {
      heroControls.start({ opacity: 1, y: 0 });
    }
  }, [isHeroInView, heroControls]);

  useEffect(() => {
    getCSRItems().then((slides) => {
      setCsrSlides(slides);
      console.log('CSR Swiper Slides:', slides);
    });
  }, []);

  // Timeline data for impact stories - Merged from both pages
  const impactStories = [
    {
      year: "2017",
      title: "Baseline Emissions Study",
      description: "Conducted first comprehensive carbon footprint analysis across all operations to establish baseline metrics.",
      image: "https://images.unsplash.com/photo-1624913503273-5f9c4e980dba?q=80"
    },
    {
      year: "2019",
      title: "Rainwater Harvesting Initiative",
      description: "Launched our first large-scale rainwater harvesting system at our main production facility, capturing over 20 million liters annually.",
      image: "https://images.unsplash.com/photo-1541250848537-6d5631683144?q=80"
    },
    {
      year: "2020",
      title: "Solar Energy Transition",
      description: "Installed 4MW solar generation capacity, reducing carbon emissions by 15,000 tons annually.",
      image: "https://images.unsplash.com/photo-1595437193398-f24279553f4f?q=80"
    },
    {
      year: "2021",
      title: "Village Adoption Program",
      description: "Adopted 5 villages surrounding our plants, implementing comprehensive development programs for education, healthcare, and infrastructure.",
      image: "https://images.unsplash.com/photo-1527507631895-7cb2a7125b96?q=80"
    },
    {
      year: "2022",
      title: "Carbon Reduction Goals",
      description: "Set science-based targets for 30% emissions reduction by 2030, with detailed roadmap for implementation across operations.",
      image: "https://images.unsplash.com/photo-1620775997990-1ffd224e6553?q=80"
    },
    {
      year: "2023",
      title: "Zero-Waste Manufacturing",
      description: "Achieved 98% waste recycling rate across all manufacturing facilities, setting new benchmarks in sustainable production.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80"
    }
  ];

  // Interactive progress data - Combined from sustainability metrics
  const sustainabilityGoals = [
    { title: "Carbon Neutrality", value: 65, maxValue: 100, color: "bg-emerald-500", icon: <Globe size={20} className="text-white" /> },
    { title: "Renewable Energy", value: 40, maxValue: 100, color: "bg-amber-500", icon: <Sun size={20} className="text-white" /> },
    { title: "Water Conservation", value: 98, maxValue: 100, color: "bg-blue-500", icon: <Droplets size={20} className="text-white" /> },
    { title: "Waste Reduction", value: 87, maxValue: 100, color: "bg-purple-500", icon: <Leaf size={20} className="text-white" /> }
  ];
  
  // SDG goals data
  const sdgGoals = [
    { number: "SDG 6", label: "Clean Water", description: "Ensuring availability and sustainable management of water for all communities where we operate.", icon: <Droplets size={24} className="text-rashmi-red" /> },
    { number: "SDG 7", label: "Clean Energy", description: "Increasing access to affordable, reliable, sustainable and modern energy in our operational areas.", icon: <Sun size={24} className="text-rashmi-red" /> },
    { number: "SDG 13", label: "Climate Action", description: "Taking urgent action to combat climate change through carbon sequestration initiatives.", icon: <Globe size={24} className="text-rashmi-red" /> },
    { number: "SDG 15", label: "Life on Land", description: "Protecting and promoting sustainable use of terrestrial ecosystems through afforestation.", icon: <TreePine size={24} className="text-rashmi-red" /> }
  ];

  // Key performance comparison 
  const performanceData = [
    { title: "Carbon Emissions", before: "85,000", after: "62,000", unit: "tons CO₂", improvement: "27%" },
    { title: "Water Usage", before: "450,000", after: "220,000", unit: "kL", improvement: "51%" },
    { title: "Renewable Energy", before: "2", after: "6.5", unit: "MW", improvement: "225%" },
    { title: "Waste Recycling", before: "65", after: "98", unit: "%", improvement: "51%" }
  ];
  
  // Combined emissions and sustainability data
  const combinedMetricsData = {
    emissions: [
      { title: "Scope 1 Emissions", value: "12,450", changePercent: "-15%", icon: <Gauge size={20} className="text-rashmi-red" /> },
      { title: "Scope 2 Emissions", value: "28,750", changePercent: "-22%", icon: <Gauge size={20} className="text-rashmi-red" /> },
      { title: "Carbon Intensity", value: "0.24 tCO₂/ton", changePercent: "-18%", icon: <BarChart3 size={20} className="text-rashmi-red" /> },
      { title: "Total CO₂ Offset", value: "15,800 tons", changePercent: "+120%", icon: <TreePine size={20} className="text-rashmi-red" /> }
    ],
    water: [
      { title: "Water Consumption", value: "220,000 kL", changePercent: "-51%", icon: <Droplets size={20} className="text-rashmi-red" /> },
      { title: "Water Recycled", value: "198,000 kL", changePercent: "+35%", icon: <Droplets size={20} className="text-rashmi-red" /> },
      { title: "Water Intensity", value: "1.8 kL/ton", changePercent: "-45%", icon: <BarChart3 size={20} className="text-rashmi-red" /> },
      { title: "Harvested Rainwater", value: "22 million L", changePercent: "+80%", icon: <Droplets size={20} className="text-rashmi-red" /> }
    ],
    waste: [
      { title: "Waste Recycled", value: "98%", changePercent: "+33%", icon: <Leaf size={20} className="text-rashmi-red" /> },
      { title: "Landfill Diversion", value: "99.2%", changePercent: "+15%", icon: <Leaf size={20} className="text-rashmi-red" /> },
      { title: "Hazardous Waste", value: "0.3%", changePercent: "-78%", icon: <BarChart3 size={20} className="text-rashmi-red" /> },
      { title: "Materials Reused", value: "4,500 tons", changePercent: "+65%", icon: <Leaf size={20} className="text-rashmi-red" /> }
    ]
  };

  // Add new state variables for the enhanced sections
  const [activeStory, setActiveStory] = useState(0);
  const [showImpactDetails, setShowImpactDetails] = useState(false);
  
  // New sustainabilityImpactData for the visual comparison section
  const sustainabilityImpactData = [
    { 
      title: "Khatranga Primary School", 
      beforeImage: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/CSR/jddxghtetiqu5zeblyoq", 
      afterImage: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/CSR/exddptximhrbwguvcjlz",
      description: "Educational infrastructure development for primary education facilities."
    },
    { 
      title: "Khatranga High School", 
      beforeImage: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/CSR/g2we8lxhvbinfgfbsgqd", 
      afterImage: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/CSR/hvr6gkeofirwl5lw3nyn",
      description: "Renovation and modernization of high school facilities for better learning environment."
    },
    { 
      title: "Dubgoal High School", 
      beforeImage: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/CSR/c08bjfnzys7gzvttl0ih", 
      afterImage: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/CSR/yfg6vl6gh9suwcx9ysyh",
      description: "Infrastructure improvements supporting local educational initiatives."
    }
  ];

  // Key facts with animated counters
  const impactNumbers = [
    { value: 56000, label: "Trees Planted", icon: <TreePine className="text-rashmi-red" size={20} />, suffix: "+" },
    { value: 25000, label: "Tons CO₂ Reduced", icon: <Globe className="text-rashmi-red" size={20} />, suffix: "" },
    { value: 98, label: "Water Recycling", icon: <Droplets className="text-rashmi-red" size={20} />, suffix: "%" },
    { value: 12500, label: "Lives Improved", icon: <Users className="text-rashmi-red" size={20} />, suffix: "+" }
  ];

  // Preload hero image with proper loading state
  useEffect(() => {
    // Create video element for preloading
    const video = document.createElement('video');
    video.src = "https://res.cloudinary.com/dada5hjp3/video/upload/v1744694427/6950522_Wind_Turbines_Towering_1920x1080_qlvseg.mp4";
    video.muted = true;
    video.preload = "auto";
    
    // Set loaded state when metadata is loaded (video is ready to play)
    video.onloadedmetadata = () => setIsLoaded(true);
    
    // Add smooth scroll behavior for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className={`min-h-screen bg-background transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Helmet>
        <title>Sustainability & CSR | Rashmi Group</title>
        <meta name="description" content="Explore Rashmi Group's comprehensive sustainability initiatives and corporate social responsibility programs focused on environmental stewardship and community development." />
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientFlow 8s ease infinite;
          }
          
          /* Geometric pattern background effect */
          .geometric-pattern {
            background-image: radial-gradient(rgba(235, 89, 81, 0.1) 2px, transparent 2px), 
                              radial-gradient(rgba(235, 89, 81, 0.07) 2px, transparent 2px);
            background-size: 40px 40px;
            background-position: 0 0, 20px 20px;
          }
          
          /* Animated gradient border */
          .gradient-border {
            position: relative;
          }
          .gradient-border::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(to right, transparent, rgba(235, 89, 81, 0.7), transparent);
          }
          
          /* Parallax layers for depth */
          .parallax-layer-1 {
            will-change: transform;
            transform: translateZ(-10px) scale(2);
          }
          .parallax-layer-2 {
            will-change: transform;
            transform: translateZ(-5px) scale(1.5);
          }
          
          /* Smooth scroll effect */
          html {
            scroll-behavior: smooth;
          }
          
          /* Improve video performance on mobile (Keep specific media query styles if needed) */
          @media (max-width: 768px) {
            /* Example: if you need specific mobile video positioning */
            /* video { object-position: center; } */
          }
          
          /* Performance optimizations for animations */
          .optimize-motion {
            will-change: transform, opacity;
            backface-visibility: hidden;
          }
          
          /* Scrollytelling fade effects */
          .fade-scroll {
            opacity: 0;
            transition: opacity 0.6s ease-out, transform 0.8s ease-out;
          }
          
          .fade-scroll.is-visible {
            opacity: 1;
          }
          
          /* Tabs animation */
          .tab-transition {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          /* Add loading indicator styles */
          .loading-indicator {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 200px;
          }
          
          .loading-indicator::after {
            content: '';
            width: 32px;
            height: 32px;
            border: 4px solid rgba(235, 89, 81, 0.2);
            border-left-color: rgba(235, 89, 81, 1);
            border-radius: 50%;
            animation: spinner 1s linear infinite;
          }
          
          @keyframes spinner {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </Helmet>

      {/* Visual Scrolly Progress Bar */}
      <motion.div 
        className="scrolly-progress-bar optimize-motion"
        style={{ 
          scaleX: scrollYProgress, 
          transformOrigin: "0%" 
        }}
      />

      <div className="relative h-screen overflow-hidden">
        <div className="absolute top-0 left-0 w-full z-20">
          <Header />
        </div>

        {/* Hero Section - Simplified structure */}
        <section 
          ref={heroRef} 
          className="relative h-full w-full flex items-center justify-center"
        >
          {/* Background shapes temporarily removed for debugging */}
          {/* <div className="absolute -top-96 -right-96 w-[800px] h-[800px] rounded-full bg-rashmi-red/3 blur-3xl z-0"></div> */}
          {/* <div className="absolute -bottom-96 -left-96 w-[800px] h-[800px] rounded-full bg-rashmi-red/3 blur-3xl z-0"></div> */}
          
          {/* Standard video tag with direct viewport dimensions */}
          <video 
            ref={heroImageRef} 
            autoPlay
            muted
            loop
            playsInline
            className="fixed inset-0 object-cover -z-10" // Removed w-full, h-full as style overrides
            style={{ minWidth: '100vw', minHeight: '100vh' }} // Force viewport dimensions
          >
            <source src="https://res.cloudinary.com/dada5hjp3/video/upload/v1744694427/6950522_Wind_Turbines_Towering_1920x1080_qlvseg.mp4" type="video/mp4" />
          </video>
          
          {/* Re-added Overlay for text contrast, above video, below text */}
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          {/* Content Container - Ensure it's above the fixed video and overlay */}
          <div className="container mx-auto px-4 relative z-10 pt-32 md:pt-36 lg:pt-40 flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={heroControls} // These animations might target the wrong element now
              transition={{ duration: 0.8, delay: 0.2 }}
              className="m-title max-w-4xl w-full"
              style={{ y: textY }} // Keep parallax on text content
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mb-4 overflow-hidden inline-block"
              >
                <motion.div
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="tx-xs bg-rashmi-red px-4 py-1 rounded-full mb-6"
                >
                  <span className="text-white font-medium uppercase tracking-wider">Corporate Social Responsibility</span>
                </motion.div>
              </motion.div>
            
              <div className="mb-4">
                <RevealText
                  text="Creating Positive Impact"
                  as="h1"
                  className="a-title tx-xxl text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white"
                  staggerDelay={0.08}
                />
              </div>
              <div className="w-24 h-1 bg-rashmi-red mx-auto my-6 rounded-full animate-gradient" 
                style={{ backgroundImage: 'linear-gradient(90deg, #E53935, #FF5252, #E53935)' }}></div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="m-textContent text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto"
              >
                At Rashmi Group, our commitment to environmental sustainability and renewable energy 
                is at the heart of our CSR initiatives. We strive for a greener future through 
                responsible practices and community empowerment.
              </motion.p>
              
              {/* Action button with improved animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <a 
                  href="#environmental-section" 
                  className="a-button -tertiary inline-flex items-center gap-2 bg-rashmi-red hover:bg-rashmi-red/90 text-white px-8 py-3 rounded-full transition-all duration-300 font-medium group"
                >
                  Explore Our Initiatives 
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Comprehensive Sustainability Dashboard - Combined Section */}
      <section className="relative py-20 bg-gradient-to-b from-background via-background/95 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-5 geometric-pattern"></div>
        <FloatingAnimation 
          className="absolute top-20 right-10 w-40 h-40 bg-rashmi-red/5 rounded-full blur-3xl optimize-motion" 
          yOffset={15}
          duration={6}
        />
        <FloatingAnimation 
          className="absolute bottom-20 left-10 w-60 h-60 bg-rashmi-red/5 rounded-full blur-3xl optimize-motion" 
          yOffset={20}
          duration={8}
          delay={1}
        />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
            style={{ willChange: 'transform, opacity' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sustainability & Impact Dashboard</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              A comprehensive view of our environmental performance, emissions reduction progress, and social impact metrics.
            </p>
            <div className="w-24 h-1 bg-rashmi-red mx-auto mt-6 rounded-full"></div>
          </motion.div>

          {/* Combined Tabbed Interface for Sustainability & Emissions */}
          <Tabs defaultValue="emissions" className="max-w-5xl mx-auto mb-16" onValueChange={setActiveMetricsTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="emissions" className="text-sm md:text-base">
                <Globe className="mr-2 h-4 w-4" />
                Emissions Data
              </TabsTrigger>
              <TabsTrigger value="water" className="text-sm md:text-base">
                <Droplets className="mr-2 h-4 w-4" />
                Water Management
              </TabsTrigger>
              <TabsTrigger value="waste" className="text-sm md:text-base">
                <Leaf className="mr-2 h-4 w-4" />
                Waste Reduction
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="emissions" className="space-y-8 focus:outline-none">
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {combinedMetricsData.emissions.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-background/90 backdrop-blur-sm border border-border p-6 rounded-[1.5rem] hover:border-rashmi-red/50 transition-all duration-300"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="p-3 bg-rashmi-red/10 rounded-full mr-3">
                        {metric.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.title}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-bold">{metric.value}</p>
                          <span className={`text-xs font-medium ${metric.changePercent.startsWith('+') ? 'text-emerald-500' : 'text-rashmi-red'}`}>
                            {metric.changePercent}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Glow className="w-full">
                <div className="rounded-[1.5rem] overflow-hidden border border-border bg-background/80 backdrop-blur-sm">
                  <Suspense fallback={<div className="loading-indicator h-[400px]"></div>}>
                    <EnhancedEmissionsChart />
                  </Suspense>
                </div>
              </Glow>
            </TabsContent>
            
            <TabsContent value="water" className="space-y-8 focus:outline-none">
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {combinedMetricsData.water.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-background/90 backdrop-blur-sm border border-border p-6 rounded-[1.5rem] hover:border-rashmi-red/50 transition-all duration-300"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="p-3 bg-rashmi-red/10 rounded-full mr-3">
                        {metric.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.title}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-bold">{metric.value}</p>
                          <span className={`text-xs font-medium ${metric.changePercent.startsWith('+') ? 'text-emerald-500' : 'text-rashmi-red'}`}>
                            {metric.changePercent}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Glow className="w-full">
                <div className="rounded-[1.5rem] overflow-hidden border border-border bg-background/80 backdrop-blur-sm">
                  <Suspense fallback={<div className="loading-indicator h-[400px]"></div>}>
                    <EnhancedWaterUsageChart />
                  </Suspense>
                </div>
              </Glow>
            </TabsContent>
            
            <TabsContent value="waste" className="space-y-8 focus:outline-none">
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {combinedMetricsData.waste.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-background/90 backdrop-blur-sm border border-border p-6 rounded-[1.5rem] hover:border-rashmi-red/50 transition-all duration-300"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="p-3 bg-rashmi-red/10 rounded-full mr-3">
                        {metric.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.title}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-bold">{metric.value}</p>
                          <span className={`text-xs font-medium ${metric.changePercent.startsWith('+') ? 'text-emerald-500' : 'text-rashmi-red'}`}>
                            {metric.changePercent}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Glow className="w-full">
                <div className="p-8 rounded-[1.5rem] border border-border bg-background/80 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <Leaf className="mr-2 h-5 w-5 text-rashmi-red" />
                    Waste Reduction Journey
                  </h3>
                  
                  <div className="space-y-6">
                    {performanceData.map((item, index) => (
                      <ComparisonMetric
                        key={index}
                        title={item.title}
                        before={item.before}
                        after={item.after}
                        unit={item.unit}
                        improvement={item.improvement}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </Glow>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CSR Image Gallery Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our CSR Initiatives</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our commitment to social responsibility through these impactful moments captured across our various initiatives.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <ImageSwiper slides={csrSlides} />
          </motion.div>
        </div>
      </section>
      
      {/* Impact Stories Timeline Section - Commented out as requested 
      <section className="relative py-24 bg-background/50 overflow-hidden">
        <div className="absolute inset-0 opacity-5 geometric-pattern"></div>
        <FloatingAnimation 
          className="absolute top-1/4 right-10 w-32 h-32 bg-rashmi-red/10 rounded-full blur-3xl" 
          yOffset={20}
          duration={7}
        />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="mb-3">
              <span className="text-rashmi-red text-sm font-medium uppercase tracking-wider">Our Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">CSR Impact Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Milestones in our journey of creating positive environmental and social impact through sustainable initiatives.
            </p>
            <div className="w-24 h-1 bg-rashmi-red mx-auto mt-6 rounded-full"></div>
          </motion.div>
          
          <div className="space-y-16 md:space-y-24 mx-auto max-w-5xl">
            {impactStories.map((story, index) => (
              <StoryItem 
                key={index}
                year={story.year}
                title={story.title}
                description={story.description}
                image={story.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      */}

      {/* New Visual Impact Comparison Section */}
      <section className="relative py-24 bg-background/95 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-rashmi-red/10 mb-4">
              <TrendingUp size={16} className="text-rashmi-red mr-2" />
              <span className="text-sm font-medium">Visual Transformation</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Educational Infrastructure Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the tangible impact of our educational infrastructure development initiatives through these before-and-after comparisons.
            </p>
            <div className="w-24 h-1 bg-rashmi-red mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-3 md:gap-6 mb-8">
            {sustainabilityImpactData.map((item, index) => (
              <div 
                key={index}
                className="space-y-4"
              >
                <BeforeAfterSlider 
                  beforeImage={item.beforeImage} 
                  afterImage={item.afterImage} 
                  label={item.title} 
                />
                <p className="text-sm text-muted-foreground text-center px-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Impact Numbers Section */}
      <section className="relative py-16 bg-gradient-to-b from-background/80 via-background/90 to-background/95">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {impactNumbers.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border hover:border-rashmi-red/30 transition-all duration-300"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-rashmi-red/10 flex items-center justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  <AnimatedCounter value={stat.value} delay={index * 0.1} />
                  {stat.suffix}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CSR Philosophy with improved styling from index3.html */}
      <section className="b-textListCards py-24 bg-card relative gradient-border">
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-background/20 opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-3"
            >
              <span className="tx-xs text-rashmi-red font-medium uppercase tracking-wider">Our Approach</span>
            </motion.div>
            
            <motion.div whileInView={{ opacity: [0, 1] }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <RevealText
                text="Our CSR Philosophy"
                as="h2"
                className="a-title tx-xl text-3xl md:text-5xl font-bold text-foreground mb-6"
                staggerDelay={0.05}
              />
            </motion.div>
            <div className="w-16 h-1 bg-rashmi-red mx-auto mb-10 rounded-full"></div>
            
            <div className="o-listCards grid md:grid-cols-2 gap-12 text-muted-foreground">
              <motion.div 
                className="m-card -radius -shadow text-lg leading-relaxed p-8 rounded-[1.5rem] bg-background/50 backdrop-blur-sm border border-border"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="m-card__meta flex items-center mb-4">
                  <div className="a-tag -round -bgtertiary w-10 h-10 rounded-full bg-rashmi-red/10 flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-rashmi-red">01</span>
                  </div>
                  <h3 className="m-card__title text-xl font-medium">Beyond Compliance</h3>
                </div>
                <p className="m-textContent">
                  We maintain self-regulated CSR standards that go beyond compliance, focusing on 
                  sustainable ecosystem development and employee welfare.
                </p>
              </motion.div>
              
              <motion.div 
                className="m-card -radius -shadow text-lg leading-relaxed p-8 rounded-[1.5rem] bg-background/50 backdrop-blur-sm border border-border"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="m-card__meta flex items-center mb-4">
                  <div className="a-tag -round -bgtertiary w-10 h-10 rounded-full bg-rashmi-red/10 flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-rashmi-red">02</span>
                  </div>
                  <h3 className="m-card__title text-xl font-medium">Lasting Impact</h3>
                </div>
                <p className="m-textContent">
                  Our leadership drives initiatives that create lasting positive impacts through 
                  environmental conservation and community engagement.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Environmental Initiatives with improved grid system */}
      <section id="environmental-section" className="b-pushPages py-24 relative overflow-hidden geometric-pattern gradient-border">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0"></div>
        <div className="absolute -right-36 top-24 w-96 h-96 rounded-full bg-rashmi-red/5 blur-3xl"></div>
        <div className="absolute -left-36 bottom-24 w-96 h-96 rounded-full bg-rashmi-red/5 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <div className="tx-xs text-rashmi-red font-medium mb-3">
              <RevealText text="ENVIRONMENTAL FOCUS" />
            </div>
            <RevealText
              text="Environmental Stewardship"
              as="h2"
              className="a-title tx-xl text-3xl md:text-5xl font-bold text-foreground mb-3"
              staggerDelay={0.05}
            />
            <p className="m-textContent text-muted-foreground text-lg">Sustainable practices at the core of our operations</p>
            <div className="w-16 h-1 bg-rashmi-red mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <div className="o-push grid md:grid-cols-3 gap-8">
            <CSRCard 
              icon={<Droplets size={40} className="text-rashmi-red" />}
              title="Rainwater Harvesting"
              image="https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf"
              stats="100% water recycling achieved"
              index={0}
            >
              Our plants implement advanced rainwater harvesting systems, setting industry benchmarks 
              in water conservation and management practices for sustainable resource utilization.
            </CSRCard>

            <CSRCard 
              icon={<Sun size={40} className="text-rashmi-red" />}
              title="Solar Energy"
              image="https://images.unsplash.com/photo-1509391366360-2e959784a276"
              stats="40% energy from renewables"
              index={1}
            >
              We've installed state-of-the-art solar farms reducing carbon footprint by 25,000 tons annually, 
              contributing significantly to our environmental sustainability goals.
            </CSRCard>

            <CSRCard 
              icon={<TreePine size={40} className="text-rashmi-red" />}
              title="Green Coverage"
              image="https://images.unsplash.com/photo-1473448912268-2022ce9509d8"
              stats="50,000+ Trees Planted"
              index={2}
            >
              Maintaining green belts that act as carbon sinks while preserving local biodiversity, 
              enhancing natural habitats and promoting ecological balance in our operational areas.
            </CSRCard>
          </div>
        </div>
      </section>

      {/* Employee & Community Section with improved layout */}
      <section className="b-listCards py-24 bg-card relative gradient-border">
        <div className="absolute inset-0 bg-gradient-to-tr from-rashmi-dark/5 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0"></div>
        <div className="absolute inset-0 geometric-pattern opacity-[0.03]"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="mb-16 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-3"
            >
              <span className="tx-xs text-rashmi-red text-sm font-medium uppercase tracking-wider">Our Focus</span>
            </motion.div>
            
            <RevealText
              text="People & Community"
              as="h2"
              className="a-title tx-xl text-3xl md:text-5xl font-bold text-foreground mb-3"
              staggerDelay={0.05}
            />
            <div className="w-16 h-1 bg-rashmi-red mx-auto mt-6 mb-8 rounded-full"></div>
          </div>
          
          <div className="o-listCards__items grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="m-card -radius -shadow -hasIcon flex flex-col items-center text-center bg-background/50 backdrop-blur-sm rounded-[1.5rem] border border-border p-8"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.05,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
                className="mb-6 bg-background rounded-full p-5 border border-border"
              >
                <HeartPulse size={48} className="text-rashmi-red" />
              </motion.div>
              <h3 className="m-card__title text-2xl font-bold text-foreground mb-4">
                Employee Wellness
              </h3>
              <p className="m-textContent text-muted-foreground mb-8">
                Comprehensive healthcare programs covering 10,000+ employees and families, coupled 
                with continuous skill development initiatives.
              </p>
              <ul className="text-left space-y-4 text-muted-foreground w-full">
                {['Annual health checkups', 'Vaccination drives', 'Technical training programs'].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index + 0.5 }}
                    className="flex items-center p-3 rounded-lg hover:bg-rashmi-red/5 transition-colors duration-300"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-rashmi-red mr-3"></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="m-card -radius -shadow -hasIcon flex flex-col items-center text-center bg-background/50 backdrop-blur-sm rounded-[1.5rem] border border-border p-8"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.05,
                  rotate: -5,
                  transition: { duration: 0.3 }
                }}
                className="mb-6 bg-background rounded-full p-5 border border-border"
              >
                <Users size={48} className="text-rashmi-red" />
              </motion.div>
              <h3 className="m-card__title text-2xl font-bold text-foreground mb-4">
                Community Engagement
              </h3>
              <p className="m-textContent text-muted-foreground mb-8">
                We've impacted 50+ communities through education, healthcare, and infrastructure 
                development initiatives.
              </p>
              <div className="grid grid-cols-2 gap-5 w-full">
                <StatBox value="15+" label="Schools Supported" index={0} />
                <StatBox value="200+" label="Community Projects" index={1} />
                <StatBox value="₹5Cr+" label="Annual Investment" index={2} />
                <StatBox value="10k+" label="Lives Impacted" index={3} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action section with improved effects */}
      <section className="py-24 relative overflow-hidden gradient-border">
        <div className="absolute inset-0 bg-rashmi-red/10"></div>
        <div className="absolute inset-0 geometric-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0"></div>
        
        {/* Additional floating elements for visual interest */}
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
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="m-title max-w-4xl mx-auto text-center"
          >
            <h2 className="a-title tx-xl text-3xl md:text-4xl font-bold mb-6">Join Our CSR Journey</h2>
            <p className="m-textContent text-lg mb-8">
              We're always looking for partners and volunteers to join our sustainability and community development initiatives.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <a href="/contact-us" className="a-button -tertiary inline-flex items-center gap-2 bg-rashmi-red hover:bg-rashmi-red/90 text-white px-8 py-4 rounded-full transition-all duration-300 font-medium group">
                Get Involved <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CSR;
