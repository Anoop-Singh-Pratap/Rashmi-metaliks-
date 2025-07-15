import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RevealText from './ui/RevealText';
import { Award, Globe, Zap, ArrowRight, Factory, FileText, Users } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundControls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect();
        const opacity = Math.max(0, Math.min(0.7, 1 - top / 1000));
        backgroundControls.start({ opacity });
      }
    };

    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    // Only add parallax effect on desktop
    if (!isMobile) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [backgroundControls]);

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background image with parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/Rashmi%20Metaliks/sl4ukstefebluhe1z8lz')",
          backgroundAttachment: window.innerWidth <= 768 ? "scroll" : "fixed", /* Dynamic attachment based on screen size */
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "opacity"
        }}
        initial={{ opacity: 0.2 }}
        animate={backgroundControls}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rashmi-dark/80 via-background/20 to-background/20"></div>
      </motion.div>

      {/* Original background decorative elements */}
      <div className="absolute inset-0 pointer-events-none z-1 opacity-5">
        <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full bg-rashmi-red/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-rashmi-red/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="max-w-xl backdrop-blur-[2px] rounded-xl p-4">
            <div className="text-rashmi-red font-medium mb-3">
              <RevealText text="About Rashmi Group" />
            </div>
            <RevealText
              text="Global Leadership in Metallurgy"
              as="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-foreground"
            />
            
            <div className="space-y-4 text-muted-foreground">
              <p className="animate-fade-in text-gray-700 dark:text-gray-300/90">
                Rashmi Group is one of the fastest growing Business Conglomerates in the India, 
                pioneer in manufacturing of integrated Iron & Steel Products, Cement, Power and Ferro Alloys & Mining.
              </p>
              <p className="animate-fade-in text-gray-700 dark:text-gray-300/90" style={{ animationDelay: '0.2s' }}>
                Today, Rashmi Metaliks stands as the largest manufacturer of DI Pipes & Fittings in India and holds the 
                second position globally, with an annual production capacity of 7,70,000 Metric Tonnes of DI Pipes & 
                26,000 Metric Tonnes of DI Fittings.
              </p>
              <p className="animate-fade-in text-gray-700 dark:text-gray-300/90" style={{ animationDelay: '0.4s' }}>
                Our State-Of-The-Art Integrated Steel manufacturing facility produces Pellet, Sinter, Pig Iron, 
                Sponge Iron, Ductile Iron Pipe, Billet, TMT & Wire Rod, along with 1.0 MTPA of Cement 
                manufacturing facility and 300 MW of Captive Power Generation Plant.
              </p>
            </div>
            
            {/* Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <Achievement 
                icon={<Award />}
                title="Global Certified"
                description="ISO 9001:2008, ISO 14001:2004, OHSAS18001"
                delay={0.6}
              />
              <Achievement 
                icon={<Globe />}
                title="#2 Worldwide"
                description="In DI Pipe Manufacturing"
                delay={0.7}
              />
              <Achievement 
                icon={<Zap />}
                title="62% CAGR"
                description="Industry-Leading Growth"
                delay={0.8}
              />
            </div>
            
            {/* Learn More Link */}
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Link 
                to="/about-rashmi" 
                className="inline-flex items-center group text-lg px-6 py-3 bg-rashmi-red text-white rounded-md hover:bg-rashmi-red/90 transition-colors"
              >
                Learn more about Rashmi Group
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-rashmi-red/20 to-rashmi-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            {/*<img 
              src="https://images.unsplash.com/photo-1495170420372-1063986a9a8a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
              alt="Rashmi Group Factory" 
              className="w-full h-full object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-105"
            />*/}
            <div className="absolute bottom-6 left-6 right-6 bg-background/80 backdrop-blur-md p-4 rounded-xl z-20">
              <h3 className="text-xl font-semibold">Rashmi Group Factory</h3>
              <p className="text-sm text-muted-foreground">State-of-the-art manufacturing facility in West Bengal</p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <StatCard 
            icon={<Factory />}
            value="7.7L MT"
            label="Annual DI Pipe Capacity"
          />
          <StatCard 
            icon={<FileText />}
            value="40+"
            label="Country Approvals"
          />
          <StatCard 
            icon={<Users />}
            value="10,000+"
            label="Team Members"
          />
          <StatCard 
            icon={<Globe />}
            value="2004"
            label="Year Established"
          />
        </div>
      </div>
    </section>
  );
};

interface AchievementProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Achievement: React.FC<AchievementProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="flex flex-col items-center text-center p-4 rounded-lg border border-border/40 bg-card/60 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-rashmi-red/10 text-rashmi-red mb-3">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => {
  return (
    <motion.div 
      className="bg-card/60 border border-border rounded-xl p-6 flex items-center backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-rashmi-red/10 text-rashmi-red mr-4">
        {icon}
      </div>
      <div>
        <h4 className="text-2xl font-bold">{value}</h4>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
};

export default About;
