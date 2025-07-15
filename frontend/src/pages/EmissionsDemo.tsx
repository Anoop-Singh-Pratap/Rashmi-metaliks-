import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronRight, 
  Leaf, 
  BarChart3, 
  TreePine, 
  Target,
  ArrowUpRight 
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EnhancedEmissionsChart from '../components/EnhancedEmissionsChart';

// Section navigation component
const NavSection = ({ id, title, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
      isActive ? 'bg-rashmi-red text-white' : 'bg-muted hover:bg-muted/80'
    }`}
  >
    {id === 'emissions' && <BarChart3 size={18} className="mr-2" />}
    {id === 'initiatives' && <Leaf size={18} className="mr-2" />}
    {id === 'goals' && <Target size={18} className="mr-2" />}
    {id === 'impact' && <TreePine size={18} className="mr-2" />}
    {title}
  </button>
);

const EmissionsDemo = () => {
  const [activeSection, setActiveSection] = useState('emissions');
  
  // Scroll to section when nav is clicked
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for header
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  
  return (
    <>
      <Helmet>
        <title>CO₂ Emissions Reduction - Rashmi Group</title>
        <meta name="description" content="Tracking our environmental performance with transparent metrics and continuous improvement" />
      </Helmet>
      
      <Header />
      
      <main className="py-16 md:py-24">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              Measuring Our <span className="text-rashmi-red">Impact</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8"
            >
              Tracking our environmental performance with transparent metrics and continuous improvement.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              <NavSection 
                id="emissions" 
                title="Emissions Data" 
                isActive={activeSection === 'emissions'} 
                onClick={scrollToSection} 
              />
              <NavSection 
                id="initiatives" 
                title="Key Initiatives" 
                isActive={activeSection === 'initiatives'} 
                onClick={scrollToSection} 
              />
              <NavSection 
                id="goals" 
                title="Future Goals" 
                isActive={activeSection === 'goals'} 
                onClick={scrollToSection} 
              />
              <NavSection 
                id="impact" 
                title="Environmental Impact" 
                isActive={activeSection === 'impact'} 
                onClick={scrollToSection} 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center mb-12"
            >
              <button 
                onClick={() => scrollToSection('emissions')}
                className="animate-bounce bg-rashmi-red/10 p-3 rounded-full"
              >
                <ChevronDown className="h-6 w-6 text-rashmi-red" />
                <span className="sr-only">Scroll down</span>
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Emissions Section */}
        <section id="emissions" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                CO₂ Emissions <span className="text-rashmi-red">Reduction Dashboard</span>
              </h2>
              <p className="text-muted-foreground">
                Interactive visualization showing our progress in reducing carbon emissions since 2022.
              </p>
            </div>
            
            <EnhancedEmissionsChart />
          </div>
        </section>
        
        {/* Key Initiatives Section */}
        <section id="initiatives" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                Key <span className="text-rashmi-red">Sustainability Initiatives</span>
              </h2>
              <p className="text-muted-foreground text-center mb-10">
                Strategic projects implemented to reduce our carbon footprint.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Solar Power Installation",
                    description: "We've installed 5MW of solar panels across our manufacturing facilities, reducing our dependency on grid electricity by 35%.",
                    icon: "☀️",
                    year: "2022",
                    impact: "8% emissions reduction"
                  },
                  {
                    title: "Energy-Efficient Equipment",
                    description: "Upgraded our machinery to state-of-the-art energy-efficient alternatives, improving productivity while reducing energy consumption.",
                    icon: "⚙️",
                    year: "2022",
                    impact: "12% emissions reduction"
                  },
                  {
                    title: "Carbon Capture Technology",
                    description: "Implemented advanced carbon capture systems at our main production facilities to filter and sequester CO2 emissions.",
                    icon: "🏭",
                    year: "2023",
                    impact: "15% emissions reduction"
                  },
                  {
                    title: "Massive Reforestation Drive",
                    description: "Planted over 50,000 trees across West Bengal as part of our commitment to offset carbon emissions and restore natural habitats.",
                    icon: "🌳",
                    year: "2023",
                    impact: "10% emissions offset"
                  }
                ].map((initiative, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl mb-4">{initiative.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{initiative.title}</h3>
                    <p className="text-muted-foreground mb-4">{initiative.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="bg-muted px-3 py-1 rounded-full">{initiative.year}</span>
                      <span className="text-green-600 font-semibold">{initiative.impact}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Future Goals Section */}
        <section id="goals" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                Our <span className="text-rashmi-red">Future Goals</span>
              </h2>
              <p className="text-muted-foreground text-center mb-10">
                Looking ahead to 2025 and beyond, we've set ambitious targets for further emissions reduction.
              </p>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-200 dark:bg-green-900/50 ml-3 md:ml-4"></div>
                
                {[
                  {
                    year: "2025",
                    title: "75% Emissions Reduction",
                    description: "Achieve a 75% reduction in carbon emissions compared to our 2022 baseline through continued investment in green technology."
                  },
                  {
                    year: "2027",
                    title: "Carbon Neutral Operations",
                    description: "Reach carbon neutrality across all manufacturing operations through a combination of direct reductions and verified carbon offsets."
                  },
                  {
                    year: "2030",
                    title: "100% Renewable Energy",
                    description: "Power all facilities entirely through renewable energy sources including solar, wind, and green hydrogen."
                  },
                  {
                    year: "2035",
                    title: "Net Positive Impact",
                    description: "Transition from carbon neutral to net positive by removing more carbon from the atmosphere than we emit."
                  }
                ].map((goal, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="ml-10 md:ml-12 mb-10 relative"
                  >
                    {/* Timeline node */}
                    <div className="absolute -left-10 md:-left-12 w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs border-4 border-background">
                      {i + 1}
                    </div>
                    
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="text-rashmi-red font-semibold mb-1">{goal.year}</div>
                      <h3 className="text-lg font-bold mb-2">{goal.title}</h3>
                      <p className="text-muted-foreground">{goal.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Environmental Impact Section */}
        <section id="impact" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                Environmental <span className="text-rashmi-red">Impact</span>
              </h2>
              <p className="text-muted-foreground text-center mb-10">
                The real-world impact of our emissions reduction efforts.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    metric: "120,000+",
                    label: "Tons of CO₂ Avoided",
                    icon: "🌍"
                  },
                  {
                    metric: "50,000+",
                    label: "Trees Planted",
                    icon: "🌱"
                  },
                  {
                    metric: "35%",
                    label: "Energy from Renewables",
                    icon: "⚡"
                  }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-card border border-border rounded-lg p-6 text-center"
                  >
                    <div className="text-3xl mb-3">{stat.icon}</div>
                    <div className="text-3xl font-bold text-green-600 mb-1">{stat.metric}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
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
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-rashmi-red/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Join Our Sustainability Journey
              </h2>
              <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
                At Rashmi Group, we are dedicated to reducing our environmental footprint and promoting 
                sustainable practices throughout our operations. Our emissions reduction targets are 
                part of a broader sustainability strategy aimed at creating long-term value for all stakeholders.
              </p>
              
              <a 
                href="/sustainability" 
                className="inline-flex items-center justify-center rounded-md bg-rashmi-red px-6 py-3 text-white font-medium hover:bg-rashmi-red/90 transition-colors"
              >
                Explore All Sustainability Initiatives
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default EmissionsDemo; 