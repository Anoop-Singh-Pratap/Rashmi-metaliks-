import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Droplet, Timer, Recycle, DollarSign } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Superior Strength",
      description: "Withstands high pressures and external loads with exceptional tensile strength."
    },
    {
      icon: Droplet,
      title: "Water Quality",
      description: "Interior linings prevent contamination, ensuring clean water delivery."
    },
    {
      icon: Timer,
      title: "Long Lifespan",
      description: "100+ year service life provides exceptional long-term value."
    },
    {
      icon: Recycle,
      title: "Sustainability",
      description: "Made from recycled materials and fully recyclable at end of life."
    },
    {
      icon: DollarSign,
      title: "Cost-Effective",
      description: "Lower maintenance and replacement costs over the lifespan."
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="py-16 px-4 bg-muted/30 dark:bg-rashmi-dark/10">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-rashmi-red text-sm font-medium uppercase tracking-wider mb-3 inline-block"
        >
          Why Choose Our Pipes
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-foreground mb-6"
        >
          Benefits That Flow Beyond Expectations
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-muted-foreground text-lg max-w-3xl mx-auto"
        >
          Our DI pipes offer a perfect blend of strength, longevity, and value that make them the ideal choice for critical infrastructure projects.
        </motion.p>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            className="bg-card dark:bg-card/80 border border-border rounded-2xl p-8 transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 mb-6 bg-rashmi-red/10 rounded-full flex items-center justify-center">
              {React.createElement(benefit.icon, { 
                className: "text-rashmi-red", 
                size: 32
              })}
            </div>
            <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
            <p className="text-muted-foreground">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BenefitsSection; 