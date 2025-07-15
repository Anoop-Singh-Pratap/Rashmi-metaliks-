import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useAnimation, AnimatePresence, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, CheckCircle, Layers, Shield, Zap, Award, Factory, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductFeatures from '../components/ui/ProductFeatures';

const TmtBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  
  // Create proper motion values for smooth animations
  const scrollYProgress = useMotionValue(0);
  const backgroundControls = useAnimation();
  
  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollYProgress.set(currentScrollY);
      
      // Control hero background opacity based on scroll
      if (heroRef.current) {
        const { top } = heroRef.current.getBoundingClientRect();
        const opacity = Math.max(0.1, Math.min(0.7, 1 - top / 1000));
        backgroundControls.start({ opacity });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize values
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [backgroundControls, scrollYProgress]);
  
  // Parallax values derived from scroll position
  const parallaxY1 = useTransform(scrollYProgress, [0, 1000], [0, -150]);  // Slower movement
  const parallaxY2 = useTransform(scrollYProgress, [0, 1000], [0, -250]);  // Faster movement
  const parallaxOpacity = useTransform(scrollYProgress, [0, 300], [1, 0.2]);
  
  const processSteps = [
    {
      title: "Raw Material Treatment",
      description: "Raw materials are treated at the DRI (Direct Reduced Iron) plant.",
      icon: Factory
    },
    {
      title: "Billet Production",
      description: "High quality billets are obtained from the steel melting shop.",
      icon: Layers
    },
    {
      title: "Rolling Mill",
      description: "Billets are passed through the state-of-the-art rolling mill.",
      icon: Factory
    },
    {
      title: "Self-Tempering",
      description: "Self-Tempering process is used to result in a structure called 'Tempered Martensite'.",
      icon: Zap
    },
    {
      title: "Atmospheric Cooling",
      description: "Atmospheric Cooling process tempers the Martensite part and the ductile core becomes the Ferrite Pearlite structure.",
      icon: Shield
    },
    {
      title: "Testing & Packaging",
      description: "Mechanical & chemical tests are done at par with IS 1786:2008. TMT Bars are cut into required length, bundled up and tagged.",
      icon: CheckCircle
    }
  ];

  const advantages = [
    {
      title: "Earthquake Resistant",
      description: "Higher elongation makes them resistant against earthquakes",
      icon: AlertCircle
    },
    {
      title: "Corrosion Resistant",
      description: "Hard Ferric Oxide layer helps resist against corrosion",
      icon: Shield
    },
    {
      title: "Fire Resistant",
      description: "Tolerates heat up to 600° centigrade",
      icon: Zap
    },
    {
      title: "Extra Strength",
      description: "Higher strength, toughness and ductility",
      icon: Award
    },
    {
      title: "Super Bondability",
      description: "Strong bond with concrete for enhanced construction",
      icon: CheckCircle
    },
    {
      title: "Higher Weldability",
      description: "Low carbon ensures higher weldability",
      icon: Factory
    }
  ];

  const tmtGrades = [
    "Rashmi TMT Fe 415",
    "Rashmi TMT Fe 415D",
    "Rashmi TMT Fe 500",
    "Rashmi TMT Fe 500D",
    "Rashmi TMT Fe 550 EQCR"
  ];

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

  const scrollToAdvantages = () => {
    const advantagesSection = document.getElementById('advantages');
    if (advantagesSection) {
      advantagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Particle animation for background effect
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="min-h-screen bg-background" ref={containerRef}>
      <Helmet>
        <title>TMT Bars - High-Quality Construction Material | Rashmi Metaliks</title>
        <meta name="description" content="Rashmi Metaliks produces world-class TMT Bars with high yield load, ductility & quality for flyovers, dams, bridges and critical infrastructure projects." />
        <meta name="keywords" content="TMT Bars, Construction, Rashmi TMT, Fe 500D, earthquake resistant, fire resistant" />
        <link rel="canonical" href="https://www.rashmimetaliks.com/tmt-bar" />
        <meta property="og:title" content="TMT Bars - High-Quality Construction Material | Rashmi Metaliks" />
        <meta property="og:description" content="World-class TMT Bars with high yield load, ductility & quality for critical infrastructure projects." />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://www.rashmimetaliks.com/tmt-bar" />
        <meta property="og:image" content="https://res.cloudinary.com/dada5hjp3/image/upload/v1744693543/Generated_Image_March_25_2025_-_11_12AM.png_j5ilcy.jpg" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": "TMT Bars",
              "image": "https://www.rashmimetaliks.com/images/products/tmt-bar.jpg",
              "description": "Rashmi Metaliks produces world-class TMT Bars with high yield load, ductility & quality for flyovers, dams, bridges and critical infrastructure projects.",
              "brand": {
                "@type": "Brand",
                "name": "Rashmi Metaliks"
              },
              "offers": {
                "@type": "Offer",
                "url": "https://www.rashmimetaliks.com/tmt-bar",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock"
              }
            }
          `}
        </script>
      </Helmet>
      
      <Header />
      
      {/* Enhanced Hero Section with Parallax Effect */}
      <section ref={heroRef} className="pt-32 pb-20 relative min-h-[80vh] overflow-hidden flex items-center">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: "url('https://res.cloudinary.com/dada5hjp3/image/upload/v1744693543/Generated_Image_March_25_2025_-_11_12AM.png_j5ilcy.jpg')",
            y: parallaxY1
          }}
          initial={{ opacity: 0.1 }}
          animate={backgroundControls}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background"></div>
        </motion.div>
        
        {/* Floating particles for depth effect */}
        <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-rashmi-red/20 blur-sm"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Moving TMT Bars in background */}
        <div className="absolute inset-0 z-1 pointer-events-none">
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-rashmi-red/5 filter blur-3xl"
            style={{ 
              top: '20%', 
              left: '10%',
              y: parallaxY2 
            }}
          />
          <motion.div 
            className="absolute w-72 h-72 rounded-full bg-rashmi-red/10 filter blur-3xl"
            style={{ 
              bottom: '10%', 
              right: '5%',
              y: parallaxY1 
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Engineering <span className="text-rashmi-red">Structural Excellence</span>
              <motion.span 
                className="block text-2xl mt-4 font-medium text-muted-foreground"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Premium TMT Steel Bars
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              The TMT Bars produced by Rashmi Metaliks are world-class products with high yield load, 
              ductility & quality for infrastructure projects where strength meets precision.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto"
            >
              <motion.div 
                className="bg-card/80 backdrop-blur-sm hover:bg-card/90 border border-border p-6 rounded-lg transition-all duration-500 group"
                whileHover={{ y: -8, boxShadow: "0 15px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <motion.h3 
                  className="text-2xl font-bold mb-1 relative"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <span>4</span> Lakh
                  <div className="h-0.5 w-0 bg-rashmi-red group-hover:w-full transition-all duration-500 mt-1"></div>
                </motion.h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">MTPA Capacity</p>
              </motion.div>
              
              <motion.div 
                className="bg-card/80 backdrop-blur-sm hover:bg-card/90 border border-border p-6 rounded-lg transition-all duration-500 group"
                whileHover={{ y: -8, boxShadow: "0 15px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <motion.h3 
                  className="text-2xl font-bold mb-1 relative"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  2009
                  <div className="h-0.5 w-0 bg-rashmi-red group-hover:w-full transition-all duration-500 mt-1"></div>
                </motion.h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">Est. Steel Melting</p>
              </motion.div>
              
              <motion.div 
                className="bg-card/80 backdrop-blur-sm hover:bg-card/90 border border-border p-6 rounded-lg transition-all duration-500 col-span-2 sm:col-span-1 group"
                whileHover={{ y: -8, boxShadow: "0 15px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <motion.h3 
                  className="text-2xl font-bold mb-1 relative"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  2010
                  <div className="h-0.5 w-0 bg-rashmi-red group-hover:w-full transition-all duration-500 mt-1"></div>
                </motion.h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">Est. Rolling Mill</p>
              </motion.div>
            </motion.div>
            
            {/* Scroll Down Indicator */}
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{ opacity: parallaxOpacity }}
            >
              <motion.button
                onClick={scrollToAdvantages}
                className="inline-flex flex-col items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mb-2">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TMT Grades Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-display font-bold mb-4 text-center"
              >
                Rashmi <span className="text-rashmi-red">TMT</span> Grades
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground text-lg text-center"
              >
                Our diverse range of high-quality TMT grades for various construction needs
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tmtGrades.map((grade, index) => (
                <motion.div
                  key={grade}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)"
                  }}
                  className="bg-card border border-border rounded-lg p-6 text-center transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto bg-rashmi-red/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-rashmi-red/20 transition-colors duration-300">
                    <Award className="text-rashmi-red" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{grade}</h3>
                  <div className="h-1 w-16 bg-rashmi-red/60 mx-auto rounded-full my-3"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section with Parallax */}
      <section id="advantages" className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        {/* Background parallax element */}
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-fixed"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1519919159258-c4f5df3a3987?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.05,
            y: parallaxY1
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/80"></div>
        </motion.div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
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
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.3, 0.1],
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

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div 
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-rashmi-red/5 rounded-full filter blur-[100px]"
            style={{ y: useTransform(scrollYProgress, [0, 500], [0, -50]) }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-rashmi-red/10 rounded-full filter blur-[100px]"
            style={{ y: useTransform(scrollYProgress, [0, 500], [0, -30]) }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="inline-block text-rashmi-red font-medium mb-3 border border-rashmi-red/20 bg-rashmi-red/5 px-4 py-1 rounded-full"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(235, 89, 81, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              Premium Quality
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Why Choose Rashmi <span className="text-rashmi-red">TMT Bars</span>
            </motion.h2>
            
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-rashmi-red/80 to-rashmi-red/20 rounded-full mx-auto relative overflow-hidden"
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              viewport={{ once: true }}
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
            
            <motion.p 
              className="text-muted-foreground mt-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Our TMT bars exceed international quality standards with superior tensile strength,
              earthquake resistance, and excellent bendability. Ideal for all your construction needs.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {advantages.map((advantage, index) => (
              <FeatureCard 
                key={index}
                title={advantage.title}
                description={advantage.description}
                icon={<advantage.icon className="w-6 h-6" />}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Manufacturing Process with Parallax */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Subtle parallax background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background z-0"></div>
        
        {/* Decorative elements with parallax */}
        <motion.div 
          className="absolute right-0 top-1/4 w-80 h-80 bg-rashmi-red/5 rounded-full filter blur-[80px] z-0"
          style={{ x: useTransform(scrollYProgress, [600, 1200], [0, 50]) }}
        />
        <motion.div 
          className="absolute left-0 bottom-1/4 w-96 h-96 bg-rashmi-red/10 rounded-full filter blur-[100px] z-0"
          style={{ x: useTransform(scrollYProgress, [600, 1200], [0, -50]) }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="inline-block text-rashmi-red font-medium mb-3 border border-rashmi-red/20 bg-rashmi-red/5 px-4 py-1 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Manufacturing Excellence
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our Production <span className="text-rashmi-red">Process</span>
            </motion.h2>
            
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-rashmi-red/80 to-rashmi-red/20 rounded-full mx-auto relative overflow-hidden"
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              {/* Shimmering effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ x: [-100, 200] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                style={{ opacity: 0.6 }}
              />
            </motion.div>
            
            <motion.p 
              className="text-muted-foreground mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              We follow a stringent 6-step manufacturing process that ensures the highest quality TMT Bars
              with exceptional strength, durability, and material properties.
            </motion.p>
          </motion.div>
          
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative">
              {/* Process Timeline */}
              <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-1 bg-border/70 transform md:-translate-x-1/2 z-0"></div>
              
              {/* Process Steps */}
              <div className="space-y-12 md:space-y-24 relative z-10">
                {processSteps.map((step, index) => (
                  <ProcessStep
                    key={index}
                    index={index}
                    title={step.title}
                    description={step.description}
                    icon={<step.icon className="w-5 h-5" />}
                    position={index % 2 === 0 ? "left" : "right"}
                    isActive={activeProcessStep === index}
                    onClick={() => setActiveProcessStep(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Grades Section with Parallax */}
      <section className="py-24 bg-muted/20 relative overflow-hidden">
        {/* Parallax background */}
        <motion.div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-fixed bg-cover bg-center opacity-5 z-0"
          style={{ y: useTransform(scrollYProgress, [1200, 2000], [0, -100]) }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background"></div>
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Product <span className="text-rashmi-red">Grades</span>
            </motion.h2>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our TMT Bars are available in various grades to meet diverse construction requirements
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {tmtGrades.map((grade, index) => (
              <motion.div
                key={index}
                className="bg-card/80 backdrop-blur-sm border border-border p-6 rounded-xl text-center transition-all duration-300 group hover:border-rashmi-red/50"
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 15px 30px -15px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)" 
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.p 
                  className="font-semibold group-hover:text-rashmi-red transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {grade}
                </motion.p>
                
                <motion.div 
                  className="w-0 h-0.5 bg-rashmi-red/70 mx-auto mt-3 group-hover:w-full transition-all duration-500"
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-muted-foreground mb-4">Need more information about our TMT Bars?</p>
            <Link 
              to="/contact" 
              className="inline-flex items-center bg-rashmi-red text-white py-3 px-6 rounded-lg hover:bg-rashmi-red/90 transition-colors duration-300"
            >
              Contact our technical team
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto text-center bg-card border border-border p-10 md:p-16 rounded-2xl relative"
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl">
                <div className="bg-rashmi-red/5 rounded-full w-[600px] h-[600px] blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
                Ready to use Rashmi TMT for your <span className="text-rashmi-red">construction projects?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto text-center">
                Contact our experts to learn more about our high-quality TMT Bars and how they can benefit your construction projects.
              </p>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90 hover:shadow-lg hover-glow"
              >
                Contact Us Today
                <ArrowDown className="ml-2 rotate-[-90deg]" size={18} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Enhanced Feature Card with parallax effects
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="bg-card/80 backdrop-blur-sm border border-border/40 p-6 rounded-xl h-full group relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.1)",
        borderColor: "rgba(235, 89, 81, 0.3)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-rashmi-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      {/* Icon container with animation */}
      <div className="mb-4 relative">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-rashmi-red/10 text-rashmi-red mb-2 transition-all duration-300 group-hover:bg-rashmi-red/20 group-hover:shadow-md">
          <motion.div
            animate={isHovered ? { 
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ 
              repeat: isHovered ? Infinity : 0,
              duration: 1.5
            }}
          >
            {icon}
          </motion.div>
        </div>
        
        {/* Glow effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-rashmi-red/20 rounded-full filter blur-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.4, 0.2, 0.4],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>
      
      {/* Content */}
      <motion.h3 
        className="text-lg font-bold mb-2 relative z-10 group-hover:text-rashmi-red transition-colors duration-300"
      >
        {title}
      </motion.h3>
      
      <p className="text-muted-foreground text-sm relative z-10 group-hover:text-muted-foreground/90">
        {description}
      </p>
      
      {/* Bottom line animation */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-rashmi-red origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Subtle particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-rashmi-red/60"
              initial={{ 
                x: Math.random() * 100, 
                y: Math.random() * 100,
                opacity: 0 
              }}
              animate={{ 
                y: [null, -80],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 1.5 + Math.random(),
                ease: "easeOut",
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

// Enhanced ProcessStep component with parallax effects
interface ProcessStepProps {
  index: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: "left" | "right";
  isActive: boolean;
  onClick: () => void;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ 
  index, 
  title, 
  description, 
  icon, 
  position, 
  isActive, 
  onClick 
}) => {
  const hideMobileOnRight = position === "right" ? "md:block hidden" : "";
  const hideMobileOnLeft = position === "left" ? "md:block hidden" : "";
  
  return (
    <div className={`flex items-center relative ${position === "right" ? "md:flex-row-reverse text-right" : "flex-row text-left"}`}>
      {/* Left content (or empty for right position) */}
      <motion.div 
        className={`flex-1 pr-8 ${hideMobileOnRight}`}
        initial={{ opacity: 0, x: position === "left" ? -50 : 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        {position === "left" && (
          <div className="md:pr-8">
            <h3 className="text-xl font-bold mb-2 group-hover:text-rashmi-red">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        )}
      </motion.div>
      
      {/* Icon circle */}
      <motion.div 
        className={`w-8 h-8 rounded-full ${isActive ? 'bg-rashmi-red' : 'bg-card'} border-4 border-background flex items-center justify-center z-10 cursor-pointer transition-all duration-300 hover:scale-110`}
        onClick={onClick}
        whileHover={{ scale: 1.2, boxShadow: "0 0 0 4px rgba(235, 89, 81, 0.3)" }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-foreground'}`}>
          {icon}
        </span>
      </motion.div>
      
      {/* Right content (or empty for left position) */}
      <motion.div 
        className={`flex-1 pl-8 ${hideMobileOnLeft}`}
        initial={{ opacity: 0, x: position === "right" ? 50 : 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        {position === "right" && (
          <div className="md:pl-8">
            <h3 className="text-xl font-bold mb-2 group-hover:text-rashmi-red">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        )}
      </motion.div>
      
      {/* Mobile version - always visible and same layout */}
      <div className="absolute left-0 md:hidden pl-12 pr-4">
        <h3 className="text-base font-bold mb-1">{title}</h3>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </div>
  );
};

export default TmtBar;
