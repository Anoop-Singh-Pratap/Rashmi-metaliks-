import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, Check, ScrollText, BookOpen, Settings, Factory, Globe, Flame } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductFeatures from '../components/ui/ProductFeatures';

const SpongeIron = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const yOffset = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  
  const [activeStep, setActiveStep] = useState(0);
  
  const processSteps = [
    {
      title: "Iron Ore Extraction",
      description: "Iron Ore is extracted from mines and processed at our facility",
      icon: Factory
    },
    {
      title: "DRI Plant Processing",
      description: "Processing at our Direct Reduced Iron (DRI) Plant",
      icon: Settings
    },
    {
      title: "Coal Charging",
      description: "Coals of different sizes are charged using conveyor from different stock houses",
      icon: ScrollText
    },
    {
      title: "BURWARD Reaction",
      description: "Carefully controlling temperature and air volume during the reaction",
      icon: Flame
    },
    {
      title: "Reduction Process",
      description: "Reactants get reduced and Sponge Iron instilled with Charcoal is obtained",
      icon: Settings
    },
    {
      title: "Magnetic Separation",
      description: "Magnetic Separator is used to extract the pure Sponge Iron",
      icon: Check
    }
  ];

  const features = [
    {
      title: "High Quality Production",
      description: "1.5 TPA production capacity at our Jhargram facility"
    },
    {
      title: "Superior Process",
      description: "Production process far superior to competitors"
    },
    {
      title: "Precision Control",
      description: "Careful control of temperature and air volume"
    },
    {
      title: "Best-in-Class Result",
      description: "Produces the highest quality Sponge Iron in the market"
    }
  ];
  
  // Animation variants for staggered animations
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

  return (
    <div className="min-h-screen bg-background" ref={containerRef}>
      <Helmet>
        <title>Sponge Iron - Premium Quality | Rashmi Metaliks</title>
        <meta name="description" content="Rashmi Metaliks produces highest quality Sponge Iron in its Jhargram facility with a production capacity of 1.5 TPA using superior production process." />
        <meta name="keywords" content="Sponge Iron, Jhargram facility, DRI Plant, Magnetic Separation, Iron production" />
        <link rel="canonical" href="https://www.rashmi.com/sponge-iron" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background to-muted/30">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620283085634-a10c02034ad5?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-fixed bg-center bg-cover opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Premium <span className="text-rashmi-red">Sponge Iron</span> Production
              <span className="block text-2xl mt-4 font-medium text-muted-foreground">Engineering Material Excellence</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              Rashmi Metaliks produces the highest quality Sponge Iron in its Jhargram facility with a production 
              capacity of 1.5 TPA using a far superior production process.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-2xl mx-auto"
            >
              <motion.div 
                className="bg-card hover:bg-card/90 border border-border p-6 rounded-lg transition-colors duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <h3 className="text-2xl font-bold mb-1">1.5 TPA</h3>
                <p className="text-muted-foreground">Production Capacity</p>
              </motion.div>
              <motion.div 
                className="bg-card hover:bg-card/90 border border-border p-6 rounded-lg transition-colors duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <h3 className="text-2xl font-bold mb-1">Superior Quality</h3>
                <p className="text-muted-foreground">Industry-Leading Standards</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl pointer-events-none z-[-1]"
        >
          <div className="bg-rashmi-red/20 rounded-full w-[600px] h-[600px] blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a 
            href="#process" 
            className="inline-flex flex-col items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <span className="mb-2">Explore Process</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="bg-rashmi-red/90 rounded-full w-8 h-8 flex items-center justify-center"
            >
              <ArrowDown size={18} className="text-white" />
            </motion.div>
          </a>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Rashmi <span className="text-rashmi-red">Sponge Iron</span> Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Our commitment to quality and precision ensures we deliver the best-in-class sponge iron
            </motion.p>
          </div>
          
          <ProductFeatures features={features} className="max-w-6xl mx-auto" />
        </div>
      </section>
      
      {/* Process Section */}
      <section id="process" className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Production <span className="text-rashmi-red">Process</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Our precise production process ensures the highest quality sponge iron
            </motion.p>
          </div>
          
          {/* Interactive Process Steps */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="flex flex-wrap justify-center mb-8">
              {processSteps.map((step, index) => (
                <motion.button
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: activeStep === index ? 1 : 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-full text-sm md:text-base font-medium m-1 transition-all ${
                    activeStep === index 
                      ? 'bg-rashmi-red text-white shadow-md' 
                      : 'bg-card border border-border text-foreground hover:bg-muted'
                  }`}
                >
                  Step {index + 1}
                </motion.button>
              ))}
            </div>
            
            {/* Progress Bar - Moved outside the keyed component */}
            <div className="mt-8 mb-4">
              <div className="flex items-center">
                <div className="h-2 bg-muted rounded-full w-full">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${(activeStep + 1) / processSteps.length * 100}%`,
                    }}
                    transition={{ 
                      duration: 0.5, 
                      ease: "easeOut", 
                      type: "tween" 
                    }}
                    className="h-full bg-rashmi-red rounded-full"
                  />
                </div>
                <span className="ml-4 text-sm font-medium">
                  {Math.round((activeStep + 1) / processSteps.length * 100)}%
                </span>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-shrink-0 bg-gradient-to-br from-rashmi-red/20 to-background border border-border/40 rounded-full w-20 h-20 flex items-center justify-center">
                    {React.createElement(processSteps[activeStep].icon, { 
                      className: "text-rashmi-red", 
                      size: 32
                    })}
                  </div>
                  
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3">
                      Step {activeStep + 1}: {processSteps[activeStep].title}
                    </h3>
                    <p className="text-muted-foreground">{processSteps[activeStep].description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Visual Process Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border/50 rounded-full z-0"></div>
            
            {/* Process steps */}
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center mb-16 relative ${isEven ? 'justify-end md:pl-10' : 'md:pr-10'}`}
                >
                  <div className={`md:w-1/2 relative z-10 ${isEven ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                    <div className={`bg-card border border-border p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md ${isEven ? 'md:ml-auto' : ''}`}>
                      <div className="flex items-center mb-3">
                        <div className={`bg-rashmi-red/10 w-10 h-10 rounded-full flex items-center justify-center ${isEven ? 'ml-auto mr-0' : 'mr-3'}`}>
                          {React.createElement(step.icon, { className: "text-rashmi-red", size: 18 })}
                        </div>
                        {!isEven && <h3 className="text-lg font-bold">{step.title}</h3>}
                        {isEven && <h3 className="text-lg font-bold mr-3">{step.title}</h3>}
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Center node */}
                  <motion.div 
                    className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-rashmi-red z-10 flex items-center justify-center ${
                      activeStep === index ? 'scale-125 ring-4 ring-rashmi-red/20' : ''
                    }`}
                    whileInView={{ scale: [0.8, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    onClick={() => setActiveStep(index)}
                  >
                    <span className="w-3 h-3 rounded-full bg-white"></span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden bg-muted/30">
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ready to use Rashmi Sponge Iron for your <span className="text-rashmi-red">industrial needs?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Contact our experts to learn more about our high-quality Sponge Iron and how it can benefit your manufacturing process.
              </p>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90"
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

export default SpongeIron;
