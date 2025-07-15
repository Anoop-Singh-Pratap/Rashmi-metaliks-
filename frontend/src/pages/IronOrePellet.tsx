
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, Layers, Award, BarChart, Shield, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductFeatures from '../components/ui/ProductFeatures';

const IronOrePellet = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const advantages = [
    {
      title: "Superior Quality",
      description: "Better quality compared to iron ore lumps"
    },
    {
      title: "Corrosion Resistant",
      description: "High resistance to corrosion for longer life"
    },
    {
      title: "Faster Reduction",
      description: "Faster reduction rates for improved efficiency"
    },
    {
      title: "High Metallization",
      description: "High metallization levels for better outcomes"
    }
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
              Premium <span className="text-rashmi-red">Iron Ore Pellets</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              Rashmi Metaliks established the first manufacturing plant to produce pellets in West Bengal,
              experiencing significant growth in demand for its high-quality iron ore pellets.
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
                <h3 className="text-2xl font-bold mb-1">1,000,000 TPA</h3>
                <p className="text-muted-foreground">Combined Production Capacity</p>
              </motion.div>
              <motion.div 
                className="bg-card hover:bg-card/90 border border-border p-6 rounded-lg transition-colors duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <h3 className="text-2xl font-bold mb-1">Multiple Grades</h3>
                <p className="text-muted-foreground">Diverse Product Range</p>
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
    href="#advantages" 
    className="flex flex-col items-center mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
  >
    <span className="mb-2">Explore Advantages</span>
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

      {/* About Section */}
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
                <h2 className="text-3xl font-display font-bold mb-6">
                  Pioneering <span className="text-rashmi-red">Iron Ore Pellet</span> Production
                </h2>
                <p className="text-muted-foreground mb-6">
                  Rashmi Metaliks established the first manufacturing plant to produce pellets in West Bengal. 
                  Since its inception, we have experienced significant growth in demand for our high-quality iron ore pellets.
                </p>
                <p className="text-muted-foreground mb-6">
                  We produce pellets of various grades across our two units, with a combined capacity of 1,000,000 TPA, 
                  making us one of the largest producers in the region.
                </p>
                
                <div className="flex items-center space-x-2 text-rashmi-red">
                  <Award className="h-5 w-5" />
                  <span className="font-medium">First in West Bengal</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-lg border border-border">
                  <div className="aspect-square bg-gradient-to-br from-rashmi-dark/10 to-rashmi-red/5 flex items-center justify-center">
                    <motion.div 
                      whileInView={{ 
                        scale: [0.8, 1.1, 1],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 2,
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                      className="w-48 h-48 rounded-full bg-gradient-to-br from-rashmi-red/20 to-rashmi-red/5 border border-border/50 shadow-lg flex items-center justify-center"
                    >
                      <div className="w-36 h-36 rounded-full bg-gradient-to-br from-card to-background border border-border/30 shadow-inner flex items-center justify-center">
                        <Layers size={48} className="text-rashmi-red" />
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -right-4 -bottom-4 w-24 h-24 bg-rashmi-red/10 rounded-full blur-xl"
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Advantages Section */}
      <section id="advantages" className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              <span className="text-rashmi-red">Advantages</span> of Our Iron Pellets
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Our iron ore pellets offer significant advantages over traditional iron ore products
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 max-w-6xl mx-auto">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start"
              >
                <div className="mr-6">
                  <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center shadow-sm">
                    <motion.div
                      whileInView={{ scale: [1, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2, repeat: Infinity, repeatDelay: 3 }}
                      className="w-8 h-8 bg-rashmi-red/10 rounded-full flex items-center justify-center"
                    >
                      {index === 0 && <Award className="h-4 w-4 text-rashmi-red" />}
                      {index === 1 && <Shield className="h-4 w-4 text-rashmi-red" />}
                      {index === 2 && <Zap className="h-4 w-4 text-rashmi-red" />}
                      {index === 3 && <BarChart className="h-4 w-4 text-rashmi-red" />}
                    </motion.div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                  <p className="text-muted-foreground">{advantage.description}</p>
                  <div className="mt-4 h-1 w-20 bg-rashmi-red/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                      className="h-full bg-rashmi-red rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Production Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div
                variants={itemVariants}
                className="bg-card border border-border rounded-lg p-6 text-center"
              >
                <motion.div
                  whileInView={{ scale: [1, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 4 }}
                  className="w-16 h-16 bg-rashmi-red/10 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Layers size={28} className="text-rashmi-red" />
                </motion.div>
                <h3 className="text-3xl font-bold mb-2">1,000,000</h3>
                <p className="text-muted-foreground">TPA Combined Capacity</p>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="bg-card border border-border rounded-lg p-6 text-center"
              >
                <motion.div
                  whileInView={{ scale: [1, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, repeat: Infinity, repeatDelay: 4 }}
                  className="w-16 h-16 bg-rashmi-red/10 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Award size={28} className="text-rashmi-red" />
                </motion.div>
                <h3 className="text-3xl font-bold mb-2">First</h3>
                <p className="text-muted-foreground">Producer in West Bengal</p>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="bg-card border border-border rounded-lg p-6 text-center"
              >
                <motion.div
                  whileInView={{ scale: [1, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6, repeat: Infinity, repeatDelay: 4 }}
                  className="w-16 h-16 bg-rashmi-red/10 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <BarChart size={28} className="text-rashmi-red" />
                </motion.div>
                <h3 className="text-3xl font-bold mb-2">Multiple</h3>
                <p className="text-muted-foreground">Product Grades Available</p>
              </motion.div>
            </motion.div>
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
                Ready to use Rashmi Iron Ore Pellets for your <span className="text-rashmi-red">industrial needs?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Contact our experts to learn more about our high-quality Iron Ore Pellets and how they can benefit your production processes.
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

export default IronOrePellet;
