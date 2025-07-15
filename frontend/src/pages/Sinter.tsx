
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, Flame, Factory, Cog, MoveHorizontal, Thermometer, Filter, Settings } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Sinter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const processSteps = [
    {
      title: "Raw Material Preparation",
      description: "A mixture of fine-grained iron ore, ferriferous recuperation materials and fluxes are prepared",
      icon: Factory
    },
    {
      title: "Conveyor Baking",
      description: "The mixture is baked on a conveyor belt which is fueled by gases from the blast furnace",
      icon: MoveHorizontal
    },
    {
      title: "High Temperature Burning",
      description: "Burners located on top heat the mixture as it travels on the conveyor",
      icon: Flame
    },
    {
      title: "Air Suction Process",
      description: "Movement of conveyor belt sucks away the air from the mixture",
      icon: Filter
    },
    {
      title: "Combustion",
      description: "The entire layer gets combusted at 1300 to 1400 degree centigrade",
      icon: Thermometer
    },
    {
      title: "Finishing Process",
      description: "The sinter cake is discharged, crushed, cooled and size screened",
      icon: Settings
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
              Premium <span className="text-rashmi-red">Sinter</span> Production
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              Rashmi Metaliks set up its own Sinter Plant in 2007 to have complete control over this important ingredient for producing world-class steel products.
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
                <p className="text-muted-foreground">Sinter Plant Established</p>
              </motion.div>
              <motion.div 
                className="bg-card hover:bg-card/90 border border-border p-6 rounded-lg transition-colors duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <h3 className="text-2xl font-bold mb-1">1300-1400°C</h3>
                <p className="text-muted-foreground">Process Temperature</p>
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
  className="mt-16 text-center" // Changed from absolute positioning to relative with margin
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
                  The Importance of <span className="text-rashmi-red">Sinter</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Iron Ore is the most important raw material used to produce steel. However, it cannot be used as it 
                  is in the blast furnace. This is where sinter plays a crucial role in converting iron into steel.
                </p>
                <p className="text-muted-foreground mb-6">
                  Rashmi Metaliks set up its own Sinter Plant in 2007 to have complete control over this important 
                  ingredient, ensuring the production of world-class steel products.
                </p>
                
                <div className="flex items-center space-x-2 text-rashmi-red">
                  <Flame className="h-5 w-5" />
                  <span className="font-medium">Essential for steel production</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-lg border border-border shadow-sm">
                  <div className="aspect-square bg-gradient-to-br from-rashmi-dark/10 to-rashmi-red/5 flex items-center justify-center">
                    <motion.div 
                      animate={{ 
                        rotate: [0, 360],
                        transition: { duration: 30, repeat: Infinity, ease: "linear" }
                      }}
                      className="w-64 h-64 rounded-full border-4 border-dashed border-border/40 flex items-center justify-center"
                    >
                      <motion.div 
                        animate={{ 
                          rotate: [360, 0],
                          transition: { duration: 20, repeat: Infinity, ease: "linear" }
                        }}
                        className="w-48 h-48 rounded-full border-2 border-dashed border-rashmi-red/30 flex items-center justify-center"
                      >
                        <motion.div
                          whileInView={{ scale: [1, 1.1, 1] }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          className="w-32 h-32 rounded-full bg-gradient-to-br from-rashmi-red/20 to-rashmi-red/5 border border-border/50 shadow-lg flex items-center justify-center"
                        >
                          <motion.div
                            animate={{ 
                              boxShadow: [
                                "0 0 0 0 rgba(231, 37, 31, 0)",
                                "0 0 0 15px rgba(231, 37, 31, 0.1)",
                                "0 0 0 0 rgba(231, 37, 31, 0)"
                              ],
                              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="w-24 h-24 rounded-full bg-gradient-to-br from-card to-background border border-border/30 shadow-inner flex items-center justify-center"
                          >
                            <Cog size={40} className="text-rashmi-red" />
                          </motion.div>
                        </motion.div>
                      </motion.div>
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
              Our precise sinter production process ensures the highest quality output
            </motion.p>
          </div>
          
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
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-rashmi-red z-10 flex items-center justify-center"
                    whileInView={{ scale: [0.8, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    <span className="w-3 h-3 rounded-full bg-white"></span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Final Product Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              The Final <span className="text-rashmi-red">Product</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              The sinter produced by Rashmi Metaliks has unique properties that make it perfect for blast furnace applications
            </motion.p>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-card border border-border rounded-lg p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <div className="relative">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-rashmi-dark/10 to-rashmi-red/5 flex items-center justify-center">
                    <motion.div
                      whileInView={{ y: [0, -10, 0] }}
                      viewport={{ once: true }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="w-48 h-48 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 flex items-center justify-center"
                    >
                      <div className="text-center p-4">
                        <span className="text-xl font-semibold text-foreground">Sinter Nodules</span>
                        <p className="text-sm text-muted-foreground mt-2">Small and irregular in shape</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Particle animations */}
                  <motion.div
                    animate={{ 
                      x: [0, 10, 5, 15, 0],
                      y: [0, -5, 10, -10, 0],
                      opacity: [0.7, 0.9, 0.7]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-3 h-3 bg-rashmi-red/20 rounded-full"
                  ></motion.div>
                  <motion.div
                    animate={{ 
                      x: [0, -15, -5, -10, 0],
                      y: [0, 10, -10, 5, 0],
                      opacity: [0.5, 0.7, 0.5]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-rashmi-red/30 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-4">Perfect Chemical Composition</h3>
                <p className="text-muted-foreground mb-6">
                  The Sinter produced by Rashmi Metaliks contains iron mixed with other materials which lends it the perfect 
                  chemical composition to be charged in a blast furnace.
                </p>
                
                <ul className="space-y-3">
                  <motion.li 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rashmi-red/10 flex items-center justify-center mt-1 mr-3">
                      <div className="w-2 h-2 rounded-full bg-rashmi-red"></div>
                    </div>
                    <p className="text-muted-foreground">Small and irregular nodules</p>
                  </motion.li>
                  
                  <motion.li 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rashmi-red/10 flex items-center justify-center mt-1 mr-3">
                      <div className="w-2 h-2 rounded-full bg-rashmi-red"></div>
                    </div>
                    <p className="text-muted-foreground">Optimized for blast furnace charging</p>
                  </motion.li>
                  
                  <motion.li 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rashmi-red/10 flex items-center justify-center mt-1 mr-3">
                      <div className="w-2 h-2 rounded-full bg-rashmi-red"></div>
                    </div>
                    <p className="text-muted-foreground">Perfect mix of iron and other materials</p>
                  </motion.li>
                  
                  <motion.li 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rashmi-red/10 flex items-center justify-center mt-1 mr-3">
                      <div className="w-2 h-2 rounded-full bg-rashmi-red"></div>
                    </div>
                    <p className="text-muted-foreground">Controlled size screening for consistency</p>
                  </motion.li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
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
                Ready to use Rashmi Sinter for your <span className="text-rashmi-red">steel production?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Contact our experts to learn more about our high-quality Sinter and how it can benefit your steel manufacturing process.
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

export default Sinter;
