
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, Factory, Settings, Shield, Award, CheckCircle, Target } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductFeatures from '../components/ui/ProductFeatures';

const PigIron = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const applications = [
    {
      title: "Pressure-tight Precision Castings",
      description: "Used in manufacturing precision components requiring pressure resistance"
    },
    {
      title: "Crankshafts",
      description: "Essential for automotive and industrial machinery applications"
    },
    {
      title: "Automobile Engine Blocks",
      description: "Core component in automotive manufacturing"
    },
    {
      title: "Rolling Mill Rolls",
      description: "Critical for steel processing equipment"
    },
    {
      title: "Gears",
      description: "Used in various mechanical and industrial applications"
    },
    {
      title: "Railway and Machine Tools",
      description: "Essential for transportation and industrial machinery"
    },
    {
      title: "Motor and Generator Housings",
      description: "Providing durability for electrical equipment"
    }
  ];

  const features = [
    {
      title: "Low Sulfur Content",
      description: "Ideal for high-ductility castings"
    },
    {
      title: "Low Phosphorus Content",
      description: "Superior quality for demanding applications"
    },
    {
      title: "High Grade Production",
      description: "One of the few suppliers in India offering premium grade pig iron"
    },
    {
      title: "Annual Capacity",
      description: "200,000 tonnes of high-quality pig iron production"
    }
  ];

  // Item animation variants
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
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Premium <span className="text-rashmi-red">Pig Iron</span> Manufacturing
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              Rashmi Metaliks has been producing high-quality pig iron since May 2007, with a focus 
              on manufacturing that exceeds customer expectations.
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
                <h3 className="text-2xl font-bold mb-1">Since 2007</h3>
                <p className="text-muted-foreground">Producing High-Quality Pig Iron</p>
              </motion.div>
              <motion.div 
                className="bg-card hover:bg-card/90 border border-border p-6 rounded-lg transition-colors duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <h3 className="text-2xl font-bold mb-1">200,000 Tonnes</h3>
                <p className="text-muted-foreground">Annual Production Capacity</p>
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
  className="mt-16 text-center" // Replaced absolute positioning with margin
>
  <a 
    href="#features" 
    className="flex flex-col items-center mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
  >
    <span className="mb-2">Explore Features</span>
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
              Rashmi <span className="text-rashmi-red">Pig Iron</span> Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Our Kharagpur facility produces pig iron using a 215 m³ MBF with exceptional quality standards
            </motion.p>
          </div>
          
          <ProductFeatures features={features} className="max-w-6xl mx-auto" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center max-w-2xl mx-auto mt-12"
          >
            <div className="inline-block bg-rashmi-red/10 px-4 py-2 rounded-full border border-rashmi-red/20 text-rashmi-red font-medium">
              <Factory className="inline-block mr-2 h-4 w-4" /> Manufacturing Excellence
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Applications Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              <span className="text-rashmi-red">Applications</span> of Rashmi Pig Iron
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Our high-quality pig iron is used in various industrial applications
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {applications.map((application, index) => (
              <motion.div
                key={application.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                custom={index}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)"
                }}
                className="bg-card border border-border rounded-lg p-6 transition-all duration-300"
              >
                <div className="mb-3 bg-rashmi-red/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-rashmi-red" size={22} />
                </div>
                <h3 className="text-xl font-bold mb-2">{application.title}</h3>
                <p className="text-muted-foreground">{application.description}</p>
                
                <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-gradient-to-r from-rashmi-red/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Manufacturing Process Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative overflow-hidden rounded-lg border border-border">
                  <div className="aspect-video bg-gradient-to-br from-rashmi-dark/10 to-rashmi-red/5 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="w-24 h-24 rounded-full bg-card border border-border/50 shadow-lg flex items-center justify-center"
                    >
                      <Factory size={40} className="text-rashmi-red" />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute bottom-0 left-0 h-1 bg-rashmi-red"
                  ></motion.div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-display font-bold mb-6">
                  Manufacturing <span className="text-rashmi-red">Process</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our Kharagpur facility produces pig iron using a 215 m³ MBF. The manufacturing process 
                  is carefully controlled to ensure low sulfur and low phosphorus content, making our 
                  pig iron ideal for producing high-ductility castings.
                </p>
                
                <div className="space-y-4 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="mt-1 text-rashmi-red">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Premium Quality</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        One of the few suppliers in India that offers such a high grade of pig iron
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="mt-1 text-rashmi-red">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Controlled Production</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Strict quality control measures to ensure consistent product quality
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="mt-1 text-rashmi-red">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Customer-Focused</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Our core values emphasize manufacturing pig iron that exceeds customer expectations
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
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
                Ready to use Rashmi Pig Iron for your <span className="text-rashmi-red">casting needs?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Contact our experts to learn more about our high-quality Pig Iron and how it can benefit your manufacturing process.
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

export default PigIron;
