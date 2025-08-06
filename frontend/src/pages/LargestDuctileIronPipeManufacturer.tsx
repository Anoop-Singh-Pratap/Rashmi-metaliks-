import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Factory, Award, Globe, TrendingUp, Users, MapPin, CheckCircle, ArrowRight, BarChart3, Target, Zap, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { generateFAQSchema, generateBreadcrumbSchema } from '../lib/schema';

const LargestDuctileIronPipeManufacturer = () => {
  const [stats, setStats] = useState({ capacity: 0, countries: 0, projects: 0, years: 0 });

  useEffect(() => {
    // Animate statistics
    const animateStats = () => {
      const duration = 2000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setStats({
          capacity: Math.floor(progress * 770000),
          countries: Math.floor(progress * 50),
          projects: Math.floor(progress * 1000),
          years: Math.floor(progress * 40)
        });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    };
    
    animateStats();
  }, []);

  // SEO Schema for this strategic page
  const faqSchema = generateFAQSchema([
    {
      question: "Who is among the largest ductile iron pipe manufacturers in the world?",
      answer: "Rashmi Metaliks stands as one of the world's largest ductile iron pipe manufacturers with a massive 770,000 MT annual production capacity, making it the 2nd largest globally and India's largest DI pipe manufacturer."
    },
    {
      question: "What makes a ductile iron pipe manufacturer the largest in the industry?",
      answer: "The largest ductile iron pipe manufacturers are determined by production capacity, global reach, technical capabilities, and market presence. Rashmi Metaliks' 770,000 MT annual capacity, presence in 50+ countries, and compliance with international standards positions it among the world's largest."
    },
    {
      question: "How does production capacity determine the largest DI pipe manufacturers?",
      answer: "Production capacity is the primary metric for ranking DI pipe manufacturers. With 770,000 MT annual capacity, Rashmi Metaliks has established itself as the world's 2nd largest and India's largest ductile iron pipe manufacturer."
    },
    {
      question: "What are the key factors that make Rashmi Metaliks one of the largest DI pipe manufacturers?",
      answer: "Rashmi Metaliks is among the largest due to: 770,000 MT annual capacity, state-of-the-art manufacturing facilities, global presence in 50+ countries, ISO certifications, compliance with EN 545, ISO 2531, AWWA C151 standards, and 40+ years of industry experience."
    }
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industry Leadership", url: "/largest-ductile-iron-pipe-manufacturer" }
  ]);

  const manufacturingLeaders = [
    {
      rank: "Global Position",
      title: "World's 2nd Largest",
      description: "Among the top ductile iron pipe manufacturers globally",
      capacity: "770,000 MT",
      icon: Globe
    },
    {
      rank: "Regional Leadership", 
      title: "India's Largest",
      description: "Leading ductile iron pipe manufacturer in India",
      capacity: "Market Leader",
      icon: MapPin
    },
    {
      rank: "Production Scale",
      title: "Massive Capacity",
      description: "One of the highest production capacities worldwide",
      capacity: "770,000 MT/Year",
      icon: Factory
    }
  ];

  const competitiveAdvantages = [
    {
      title: "Unmatched Production Scale",
      description: "770,000 MT annual capacity places us among the world's largest DI pipe manufacturers",
      icon: BarChart3,
      stats: "770K MT/Year"
    },
    {
      title: "Global Market Presence",
      description: "Serving 50+ countries worldwide with premium quality DI pipes",
      icon: Globe,
      stats: "50+ Countries"
    },
    {
      title: "Technical Excellence",
      description: "Compliance with all major international standards and certifications",
      icon: Shield,
      stats: "ISO Certified"
    },
    {
      title: "Industry Experience",
      description: "40+ years of expertise in steel and DI pipe manufacturing",
      icon: Target,
      stats: "40+ Years"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Largest Ductile Iron Pipe Manufacturer | Rashmi Metaliks - 770,000 MT Capacity | World's 2nd Largest DI Pipe Producer"
        description="Discover why Rashmi Metaliks ranks among the world's largest ductile iron pipe manufacturers with 770,000 MT annual capacity. World's 2nd largest DI pipe manufacturer serving 50+ countries with premium quality pipes compliant with EN 545, ISO 2531, AWWA C151 standards."
        keywords="largest ductile iron pipe manufacturer, biggest DI pipe manufacturer, world's largest ductile iron pipe company, leading DI pipe producer, 770000 MT capacity, world's 2nd largest DI pipe manufacturer, India's largest ductile iron pipe manufacturer, global DI pipe leader, massive production capacity, international DI pipe supplier"
        canonicalUrl="/largest-ductile-iron-pipe-manufacturer"
        schema={[faqSchema, breadcrumbSchema]}
      />

      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rashmi-dark/5 to-rashmi-red/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-rashmi-red/10 text-rashmi-red px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Award size={16} />
              World's 2nd Largest DI Pipe Manufacturer
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rashmi-dark to-rashmi-red bg-clip-text text-transparent">
              Among the World's Largest
              <br />
              <span className="text-rashmi-red">Ductile Iron Pipe</span>
              <br />
              Manufacturers
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              With <strong>770,000 MT annual production capacity</strong>, Rashmi Metaliks stands as the 
              <strong> world's 2nd largest ductile iron pipe manufacturer</strong> and <strong>India's largest DI pipe producer</strong>, 
              serving global infrastructure needs with unmatched scale and quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/di-pipes"
                className="inline-flex items-center gap-2 bg-rashmi-red text-white px-8 py-3 rounded-lg hover:bg-rashmi-red/90 transition-colors"
              >
                Explore Our DI Pipes
                <ArrowRight size={20} />
              </Link>
              <Link 
                to="/about-rashmi"
                className="inline-flex items-center gap-2 border border-rashmi-red text-rashmi-red px-8 py-3 rounded-lg hover:bg-rashmi-red/5 transition-colors"
              >
                Learn About Our Scale
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-rashmi-dark text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-rashmi-red mb-2">
                {stats.capacity.toLocaleString()}
              </div>
              <div className="text-sm text-gray-300">MT Annual Capacity</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-rashmi-red mb-2">
                #{stats.countries > 1 ? 2 : stats.countries}
              </div>
              <div className="text-sm text-gray-300">Global Ranking</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-rashmi-red mb-2">
                {stats.countries}+
              </div>
              <div className="text-sm text-gray-300">Countries Served</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-rashmi-red mb-2">
                {stats.years}+
              </div>
              <div className="text-sm text-gray-300">Years Experience</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manufacturing Leadership Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Leadership in <span className="text-rashmi-red">Global DI Pipe Manufacturing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our position among the world's largest ductile iron pipe manufacturers is built on 
              unmatched production capacity, technical excellence, and global reach.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {manufacturingLeaders.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-rashmi-red/10 text-rashmi-red rounded-full mb-4">
                  <leader.icon size={32} />
                </div>
                <div className="text-sm text-rashmi-red font-medium mb-2">{leader.rank}</div>
                <h3 className="text-xl font-bold mb-2">{leader.title}</h3>
                <p className="text-muted-foreground mb-4">{leader.description}</p>
                <div className="text-lg font-bold text-rashmi-red">{leader.capacity}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Makes Us Among the <span className="text-rashmi-red">Largest DI Pipe Manufacturers</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitiveAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-rashmi-red/10 text-rashmi-red rounded-lg flex items-center justify-center">
                    <advantage.icon size={24} />
                  </div>
                  <div className="text-lg font-bold text-rashmi-red">{advantage.stats}</div>
                </div>
                <h3 className="font-bold mb-2">{advantage.title}</h3>
                <p className="text-sm text-muted-foreground">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LargestDuctileIronPipeManufacturer;
