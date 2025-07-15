import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Droplets, 
  Factory, 
  Recycle, 
  Wind, 
  TreePine, 
  Zap, 
  BarChart3,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  Target,
  Info,
  Globe,
  HeartPulse
} from 'lucide-react';
import EnhancedEmissionsChart from './EnhancedEmissionsChart';
import EnhancedWaterUsageChart from './EnhancedWaterUsageChart';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      delay: 0.2 + i * 0.1 
    }
  })
};

// Navigation Section Button Component
const NavSection = ({ id, title, icon, isActive, onClick }) => (
  <a
    href={`#${id}`}
    onClick={(e) => {
      e.preventDefault();
      onClick(id);
    }}
    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
      isActive ? 'bg-rashmi-red text-white' : 'bg-muted hover:bg-muted/80'
    }`}
  >
    {icon}
    {title}
  </a>
);

// Interactive Before/After Slider Component
const BeforeAfterSlider = ({ beforeImage, afterImage, label }: { 
  beforeImage: string, 
  afterImage: string,
  label?: string
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  
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
      className="relative w-full h-[300px] overflow-hidden rounded-xl border border-border cursor-ew-resize"
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

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 1.5, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const countRef = React.useRef(null);
  
  const useIsInView = (ref) => {
    const [isInView, setIsInView] = useState(false);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      
      const currentRef = ref.current;
      if (currentRef) {
        observer.observe(currentRef);
      }
      
      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [ref]);
    
    return isInView;
  };
  
  const isInView = useIsInView(countRef);
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    let startValue = 0;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress);
      
      const currentCount = Math.floor(easedProgress * (value - startValue) + startValue);
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };
    
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(updateCount);
    }, delay * 1000);
    
    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };
    
    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
    };
  }, [isInView, value, duration, delay]);
  
  return <span ref={countRef}>{count.toLocaleString()}</span>;
};

const Sustainability = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [activeChart, setActiveChart] = useState('emissions');
  const [animateChart, setAnimateChart] = useState(false);
  
  // Data for emissions chart
  const emissionsData = [
    { date: '2020-01', co2: 100 },
    { date: '2020-02', co2: 98 },
    { date: '2020-03', co2: 96 },
    { date: '2020-04', co2: 94 },
    { date: '2020-05', co2: 90 },
    { date: '2020-06', co2: 88 },
    { date: '2020-07', co2: 85 },
    { date: '2020-08', co2: 82 },
    { date: '2020-09', co2: 79 },
    { date: '2020-10', co2: 75 },
    { date: '2020-11', co2: 72 },
    { date: '2020-12', co2: 70 },
    { date: '2021-01', co2: 68 },
    { date: '2021-02', co2: 65 },
    { date: '2021-03', co2: 63 },
    { date: '2021-04', co2: 60 },
    { date: '2021-05', co2: 58 },
    { date: '2021-06', co2: 55 },
    { date: '2021-07', co2: 53 },
    { date: '2021-08', co2: 50 },
    { date: '2021-09', co2: 48 },
    { date: '2021-10', co2: 45 },
    { date: '2021-11', co2: 43 },
    { date: '2021-12', co2: 40 },
  ];

  // Data for water usage chart
  const waterUsageData = [
    { date: '2021-01', recycled: 60, fresh: 40 },
    { date: '2021-02', recycled: 62, fresh: 38 },
    { date: '2021-03', recycled: 65, fresh: 35 },
    { date: '2021-04', recycled: 68, fresh: 32 },
    { date: '2021-05', recycled: 70, fresh: 30 },
    { date: '2021-06', recycled: 72, fresh: 28 },
    { date: '2021-07', recycled: 75, fresh: 25 },
    { date: '2021-08', recycled: 78, fresh: 22 },
    { date: '2021-09', recycled: 80, fresh: 20 },
    { date: '2021-10', recycled: 82, fresh: 18 },
    { date: '2021-11', recycled: 85, fresh: 15 },
    { date: '2021-12', recycled: 88, fresh: 12 },
  ];

  // Key initiatives data
  const initiativesData = [
    {
      title: "Solar Power Installation",
      description: "5MW solar panels reducing grid dependency by 35%",
      icon: <Zap className="h-6 w-6 text-white" />,
      year: "2022",
      impact: "8% reduction",
      color: "from-amber-400 to-amber-600"
    },
    {
      title: "Energy-Efficient Equipment",
      description: "State-of-the-art machinery improving productivity",
      icon: <Factory className="h-6 w-6 text-white" />,
      year: "2022",
      impact: "12% reduction",
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Carbon Capture Technology",
      description: "Advanced systems to filter and sequester CO₂",
      icon: <Wind className="h-6 w-6 text-white" />,
      year: "2023",
      impact: "15% reduction", 
      color: "from-green-400 to-green-600"
    },
    {
      title: "Reforestation Drive",
      description: "50,000+ trees planted across West Bengal",
      icon: <TreePine className="h-6 w-6 text-white" />,
      year: "2023",
      impact: "10% offset",
      color: "from-emerald-400 to-emerald-600"
    }
  ];

  // Future goals data
  const goalsData = [
    {
      year: "2025",
      title: "75% Emissions Reduction",
      description: "From 2022 baseline through green technology."
    },
    {
      year: "2027",
      title: "Carbon Neutral Operations",
      description: "Through direct reductions and verified offsets."
    },
    {
      year: "2030",
      title: "100% Renewable Energy",
      description: "Solar, wind, and green hydrogen sources."
    },
    {
      year: "2035",
      title: "Net Positive Impact",
      description: "Removing more carbon from the atmosphere than we emit."
    }
  ];
  
  // Environmental impact data
  const environmentalImpactData = [
    {
      metric: "120,000+",
      label: "Tons of CO₂ Avoided",
      icon: <Globe className="text-green-600" size={32} />
    },
    {
      metric: "50,000+",
      label: "Trees Planted",
      icon: <TreePine className="text-green-600" size={32} />
    },
    {
      metric: "35%",
      label: "Energy from Renewables",
      icon: <Zap className="text-green-600" size={32} />
    }
  ];
  
  // Visual comparison data
  const comparisonData = [
    { 
      title: "Khatranga Primary School", 
      beforeImage: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/CSR/jddxghtetiqu5zeblyoq", 
      afterImage: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/CSR/exddptximhrbwguvcjlz",
    },
    { 
      title: "Khatranga High School", 
      beforeImage: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/CSR/g2we8lxhvbinfgfbsgqd", 
      afterImage: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/CSR/hvr6gkeofirwl5lw3nyn",
    },
    { 
      title: "Dubgoal High School", 
      beforeImage: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/CSR/c08bjfnzys7gzvttl0ih", 
      afterImage: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/CSR/yfg6vl6gh9suwcx9ysyh",
    }
  ];
  
  // Key statistics - impact metrics for animated counters
  const impactStats = [
    { value: 56000, label: "Trees Planted", icon: <TreePine className="text-rashmi-red" size={24} />, suffix: "+" },
    { value: 25000, label: "Tons CO₂ Reduced", icon: <Globe className="text-rashmi-red" size={24} />, suffix: "" },
    { value: 98, label: "Water Recycling %", icon: <Droplets className="text-rashmi-red" size={24} />, suffix: "%" },
    { value: 12500, label: "Lives Improved", icon: <HeartPulse className="text-rashmi-red" size={24} />, suffix: "+" }
  ];

  const emissionsChartConfig = {
    co2: {
      label: "CO₂ Emissions",
      color: "#16a34a",
    }
  };

  const waterChartConfig = {
    recycled: {
      label: "Recycled Water",
      color: "#3b82f6",
    },
    fresh: {
      label: "Fresh Water",
      color: "#64748b",
    }
  };

  useEffect(() => {
    setAnimateChart(false);
    
    // Use requestAnimationFrame to ensure smoother transitions
    const animationFrame = requestAnimationFrame(() => {
      setTimeout(() => {
        setAnimateChart(true);
      }, 300);
    });
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [activeChart]);

  // Check URL hash on mount to scroll to the correct section
  useEffect(() => {
    const hash = window.location.hash.slice(1); // remove the # character
    if (hash) {
      const validSections = ['overview', 'emissions', 'initiatives', 'impact', 'goals'];
      const section = validSections.includes(hash) ? hash : 'overview';
      setTimeout(() => {
        scrollToSection(section);
      }, 100); // Small delay to ensure the DOM is ready
    }
  }, []);

  // Scroll to section when nav is clicked
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for header
      const yOffset = -100; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      
      // Update URL hash without causing a page reload
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  return (
    <div id="sustainability" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <motion.h2 
            variants={textVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Commitment to <span className="text-rashmi-red">Sustainability</span>
          </motion.h2>
          <motion.p 
            variants={textVariants}
            className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8"
          >
            Rashmi Group is dedicated to responsible manufacturing through environmental stewardship, 
            resource conservation, and community development.
          </motion.p>

          {/* Section Navigation */}
          <motion.div
            variants={textVariants}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            <NavSection 
              id="overview" 
              title="Overview" 
              icon={<Info size={18} className="mr-2" />}
              isActive={activeSection === 'overview'} 
              onClick={scrollToSection} 
            />
            <NavSection 
              id="emissions" 
              title="Emissions Data" 
              icon={<BarChart3 size={18} className="mr-2" />}
              isActive={activeSection === 'emissions'} 
              onClick={scrollToSection} 
            />
            <NavSection 
              id="initiatives" 
              title="Key Initiatives" 
              icon={<Leaf size={18} className="mr-2" />}
              isActive={activeSection === 'initiatives'} 
              onClick={scrollToSection} 
            />
            <NavSection 
              id="impact" 
              title="Environmental Impact" 
              icon={<Globe size={18} className="mr-2" />}
              isActive={activeSection === 'impact'} 
              onClick={scrollToSection} 
            />
            <NavSection 
              id="goals" 
              title="Future Goals" 
              icon={<Target size={18} className="mr-2" />}
              isActive={activeSection === 'goals'} 
              onClick={scrollToSection} 
            />
          </motion.div>
          
          <motion.div
            variants={textVariants}
            className="flex justify-center"
          >
            <a 
              href="#overview"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('overview');
              }}
              className="animate-bounce bg-rashmi-red/10 p-3 rounded-full inline-flex"
              aria-label="Scroll to overview section"
            >
              <ChevronDown className="h-6 w-6 text-rashmi-red" />
              <span className="sr-only">Scroll down</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Overview Section - Sustainability Initiatives */}
        <section id="overview" className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              <a href="#overview" className="hover:text-rashmi-red transition-colors">
                Sustainability <span className="text-rashmi-red">Overview</span>
              </a>
            </h3>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {[
            {
              icon: <Leaf className="h-6 w-6 text-white" />,
              title: "Environmental Protection",
              description: "Minimizing our ecological footprint through sustainable practices and technologies.",
              color: "from-green-400 to-green-600",
              borderColor: "border-green-400"
            },
            {
              icon: <Recycle className="h-6 w-6 text-white" />,
              title: "Circular Economy",
              description: "Reducing waste and promoting recycling throughout our production chain.",
              color: "from-blue-400 to-blue-600",
              borderColor: "border-blue-400"
            },
            {
              icon: <Factory className="h-6 w-6 text-white" />,
              title: "Sustainable Manufacturing",
              description: "Investing in clean technologies to reduce emissions and energy consumption.",
              color: "from-amber-400 to-amber-600",
              borderColor: "border-amber-400"
            },
            {
              icon: <Droplets className="h-6 w-6 text-white" />,
              title: "Water Conservation",
              description: "Implementing comprehensive water recycling systems across our facilities.",
              color: "from-cyan-400 to-cyan-600",
              borderColor: "border-cyan-400"
            },
            {
              icon: <Wind className="h-6 w-6 text-white" />,
              title: "Clean Energy",
              description: "Transitioning to renewable energy sources to power our operations.",
              color: "from-sky-400 to-sky-600",
              borderColor: "border-sky-400"
            },
            {
              icon: <TreePine className="h-6 w-6 text-white" />,
              title: "Reforestation Efforts",
              description: "Supporting large-scale tree planting initiatives to offset carbon emissions.",
              color: "from-emerald-400 to-emerald-600",
              borderColor: "border-emerald-400"
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8 }}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-sm group"
            >
              <div className="p-6">
                <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
              <div className={`h-1 w-full bg-gradient-to-r ${item.color}`}></div>
            </motion.div>
          ))}
        </div>

          {/* Key Impact Metrics */}
          <div className="max-w-5xl mx-auto mb-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={textVariants}
              className="mb-8 text-center"
            >
              <h3 className="text-2xl font-bold mb-3">
                Key <span className="text-rashmi-red">Impact Metrics</span>
              </h3>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Quantifying our commitment to sustainable development.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {impactStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 text-center"
                >
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-rashmi-red">
                    <AnimatedCounter value={stat.value} delay={i * 0.1} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Visual Comparison Section - NEW */}
        <section id="visual-comparison" className="mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="mb-8 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Visual <span className="text-rashmi-red">Transformation</span>
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              See the tangible impact of our sustainability initiatives through these before-and-after comparisons.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {comparisonData.map((item, i) => (
              <div key={i} className="space-y-3">
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  label={item.title}
                />
                <p className="text-sm text-muted-foreground text-center px-2">
                  {i === 0 ? "Educational infrastructure development for primary education facilities." : 
                   i === 1 ? "Renovation and modernization of high school facilities for better learning environment." : 
                   "Infrastructure improvements supporting local educational initiatives."}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Emissions Section - Charts */}
        <section id="emissions" className="mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textVariants}
            className="mb-8 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              <a href="#emissions" className="hover:text-rashmi-red transition-colors">
                Measuring Our <span className="text-rashmi-red">Impact</span>
              </a>
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Tracking our environmental performance with transparent metrics and continuous improvement.
            </p>
          </motion.div>

          {/* Chart selection tabs */}
            <div className="flex justify-center mb-8 space-x-4">
              <button 
                onClick={() => setActiveChart('emissions')}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeChart === 'emissions' 
                    ? 'bg-rashmi-red text-white'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <Zap size={18} className="mr-2" />
                Emissions Reduction
              </button>
              <button 
                onClick={() => setActiveChart('water')}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeChart === 'water' 
                    ? 'bg-rashmi-red text-white'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <Droplets size={18} className="mr-2" />
                Water Usage
              </button>
            </div>

          {/* Enhanced Charts */}
          <div className={`transition-opacity duration-500 ${animateChart ? 'opacity-100' : 'opacity-0'}`}>
            {activeChart === 'emissions' && <EnhancedEmissionsChart />}

              {activeChart === 'water' && (
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 lg:p-10 shadow-sm">
                  <div className="text-center mb-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">Water Usage Efficiency</h3>
                    <p className="text-muted-foreground text-sm">Recycled vs Fresh Water Consumption</p>
                  </div>
                <EnhancedWaterUsageChart />
                </div>
              )}
            </div>
        </section>

        {/* Key Initiatives Section */}
        <section id="initiatives" className="mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textVariants}
            className="mb-8 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              <a href="#initiatives" className="hover:text-rashmi-red transition-colors">
                Key <span className="text-rashmi-red">Initiatives</span>
              </a>
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Strategic projects implemented to reduce our carbon footprint.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {initiativesData.map((initiative, i) => (
              <motion.div
                key={initiative.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="bg-card border border-border rounded-xl p-6 overflow-hidden shadow-sm"
              >
                <div className="flex items-start mb-4">
                  <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${initiative.color} flex-shrink-0 flex items-center justify-center mr-4`}>
                    {initiative.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{initiative.title}</h4>
                    <p className="text-muted-foreground text-sm">{initiative.description}</p>
                  </div>
                </div>
                <div className="flex justify-between border-t border-border pt-4 text-sm">
                  <span className="bg-muted px-3 py-1 rounded-full">{initiative.year}</span>
                  <span className="text-green-600 font-semibold">{initiative.impact}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Environmental Impact Section - NEW */}
        <section id="impact" className="mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textVariants}
            className="mb-8 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              <a href="#impact" className="hover:text-rashmi-red transition-colors">
                Environmental <span className="text-rashmi-red">Impact</span>
              </a>
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              The real-world impact of our emissions reduction efforts.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            {environmentalImpactData.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card border border-border rounded-lg p-6 text-center"
              >
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-green-600 mb-1">{stat.metric}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 max-w-5xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Equivalent Environmental Impact</h3>
            <p className="text-muted-foreground mb-6">
              Our emissions reduction efforts so far are equivalent to:
            </p>
            
            <div className="space-y-4">
              {[
                "Taking 26,000 cars off the road for an entire year",
                "Powering 14,500 homes with clean energy for a year",
                "Planting and growing 1.2 million trees for 10 years",
                "Avoiding the burning of 130,000 barrels of oil"
              ].map((impact, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start"
                >
                  <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full mr-3 text-green-600">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <p>{impact}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Goals Section */}
        <section id="goals" className="mb-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textVariants}
            className="mb-8 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              <a href="#goals" className="hover:text-rashmi-red transition-colors">
                Future <span className="text-rashmi-red">Goals</span>
              </a>
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our roadmap for continued environmental progress.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative pb-8">
            {/* Timeline line */}
            <div className="absolute left-8 sm:left-[50%] top-0 bottom-0 w-1 bg-green-200 dark:bg-green-900/50 -translate-x-1/2"></div>
            
            {goalsData.map((goal, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className={`flex flex-col sm:flex-row items-start sm:items-center mb-12 relative ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Year indicator */}
                <div className="absolute left-0 sm:static flex-shrink-0 w-16 h-16 bg-rashmi-red/10 rounded-full flex items-center justify-center text-rashmi-red font-bold z-10">
                  {goal.year}
                </div>
                
                {/* Timeline node */}
                <div className={`absolute left-8 sm:left-[50%] w-4 h-4 rounded-full bg-green-500 top-6 -translate-x-1/2 border-4 border-background ${
                  i % 2 === 0 ? 'sm:left-[50%]' : 'sm:left-[50%]'
                }`}></div>
                
                {/* Content */}
                <div className={`bg-card border border-border rounded-lg p-6 ml-24 sm:ml-0 sm:w-5/12 ${
                  i % 2 === 0 ? 'sm:ml-8' : 'sm:mr-8'
                }`}>
                  <h4 className="text-lg font-bold mb-2">{goal.title}</h4>
                  <p className="text-muted-foreground text-sm">{goal.description}</p>
                </div>
              </motion.div>
            ))}
        </div>
        </section>
      </div>
    </div>
  );
};

export default Sustainability;
