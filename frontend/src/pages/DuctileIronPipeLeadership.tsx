import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Factory, Award, Globe, TrendingUp, Users, MapPin, CheckCircle, ArrowRight, BarChart3, Target, Zap, Shield, Crown, Star, Trophy } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { generateFAQSchema, generateBreadcrumbSchema } from '../lib/schema';

const DuctileIronPipeLeadership = () => {
  // Comprehensive FAQ targeting all keyword variations
  const faqSchema = generateFAQSchema([
    {
      question: "Who are the largest ductile iron pipe manufacturers in the world?",
      answer: "The largest ductile iron pipe manufacturers globally are determined by production capacity and market reach. Rashmi Metaliks ranks as the world's 2nd largest ductile iron pipe manufacturer with 770,000 MT annual capacity, making it India's largest and among the biggest DI pipe manufacturers worldwide."
    },
    {
      question: "What makes a company the biggest DI pipe manufacturer?",
      answer: "The biggest DI pipe manufacturers are characterized by massive production capacity, global presence, technical excellence, and market leadership. Rashmi Metaliks exemplifies this with 770,000 MT annual capacity, presence in 50+ countries, ISO certifications, and compliance with international standards like EN 545, ISO 2531, and AWWA C151."
    },
    {
      question: "Which is the world's largest ductile iron pipe company by capacity?",
      answer: "Among the world's largest ductile iron pipe companies, Rashmi Metaliks holds the 2nd position globally with 770,000 MT annual production capacity. This massive scale makes it India's largest ductile iron pipe manufacturer and one of the leading DI pipe producers worldwide."
    },
    {
      question: "How do you identify the leading ductile iron pipe producers globally?",
      answer: "Leading ductile iron pipe producers are identified by production capacity, quality standards, global reach, and technical capabilities. Rashmi Metaliks stands among the leaders with 770,000 MT capacity, serving 50+ countries, maintaining ISO certifications, and producing pipes compliant with EN 545, ISO 2531, AWWA C151 standards."
    },
    {
      question: "What production capacity makes a manufacturer among the largest DI pipe companies?",
      answer: "Production capacity is the primary metric for ranking among the largest DI pipe companies. Rashmi Metaliks' 770,000 MT annual capacity positions it as the world's 2nd largest ductile iron pipe manufacturer and India's largest, demonstrating the scale required to be among global leaders."
    }
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industry Leadership", url: "/ductile-iron-pipe-leadership" }
  ]);

  const globalRankings = [
    {
      position: "#2",
      title: "World's 2nd Largest",
      subtitle: "Ductile Iron Pipe Manufacturer",
      capacity: "770,000 MT/Year",
      description: "Global leadership in DI pipe manufacturing",
      icon: Crown,
      color: "text-yellow-600"
    },
    {
      position: "#1", 
      title: "India's Largest",
      subtitle: "DI Pipe Producer",
      capacity: "Market Leader",
      description: "Dominating the Indian ductile iron pipe market",
      icon: Star,
      color: "text-rashmi-red"
    },
    {
      position: "Top 3",
      title: "Global Manufacturing",
      subtitle: "Scale & Capacity",
      capacity: "50+ Countries",
      description: "Among the biggest DI pipe manufacturers worldwide",
      icon: Trophy,
      color: "text-blue-600"
    }
  ];

  const competitiveMetrics = [
    {
      metric: "Production Capacity",
      value: "770,000 MT",
      description: "Annual ductile iron pipe production capacity",
      comparison: "Among the highest globally",
      icon: Factory
    },
    {
      metric: "Global Presence",
      value: "50+ Countries",
      description: "International market reach and distribution",
      comparison: "Extensive worldwide coverage",
      icon: Globe
    },
    {
      metric: "Quality Standards",
      value: "ISO Certified",
      description: "International quality and safety certifications",
      comparison: "Meets all major global standards",
      icon: Shield
    },
    {
      metric: "Industry Experience",
      value: "40+ Years",
      description: "Decades of expertise in steel manufacturing",
      comparison: "Established industry leader",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Ductile Iron Pipe Industry Leadership | World's Largest DI Pipe Manufacturers | Rashmi Metaliks Global Ranking"
        description="Explore the global ductile iron pipe industry leadership. Rashmi Metaliks ranks as world's 2nd largest DI pipe manufacturer with 770,000 MT capacity. Discover what makes the biggest ductile iron pipe manufacturers and leading DI pipe producers in the global market."
        keywords="ductile iron pipe industry leadership, world's largest DI pipe manufacturers, biggest ductile iron pipe manufacturers, leading DI pipe producers, global DI pipe market leaders, largest ductile iron pipe companies, world's 2nd largest DI pipe manufacturer, industry rankings, production capacity comparison, global manufacturing scale"
        canonicalUrl="/ductile-iron-pipe-leadership"
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
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-rashmi-red/10 text-rashmi-red px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Crown size={16} />
              Global Industry Leadership Analysis
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rashmi-dark to-rashmi-red bg-clip-text text-transparent">
              World's Largest
              <br />
              <span className="text-rashmi-red">Ductile Iron Pipe</span>
              <br />
              Manufacturers
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Comprehensive analysis of the <strong>global ductile iron pipe industry</strong> and the 
              <strong> largest DI pipe manufacturers</strong> worldwide. Discover how <strong>Rashmi Metaliks</strong> 
              ranks as the <strong>world's 2nd largest ductile iron pipe manufacturer</strong> with 
              <strong> 770,000 MT annual capacity</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/largest-ductile-iron-pipe-manufacturer"
                className="inline-flex items-center gap-2 bg-rashmi-red text-white px-8 py-3 rounded-lg hover:bg-rashmi-red/90 transition-colors"
              >
                View Our Global Position
                <ArrowRight size={20} />
              </Link>
              <Link 
                to="/di-pipes"
                className="inline-flex items-center gap-2 border border-rashmi-red text-rashmi-red px-8 py-3 rounded-lg hover:bg-rashmi-red/5 transition-colors"
              >
                Explore Our DI Pipes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Rankings Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-rashmi-red">Global Rankings</span> in DI Pipe Manufacturing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding where Rashmi Metaliks stands among the world's largest ductile iron pipe manufacturers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {globalRankings.map((ranking, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rashmi-red/10 to-rashmi-red/5 rounded-full mb-4`}>
                  <ranking.icon size={32} className={ranking.color} />
                </div>
                <div className={`text-3xl font-bold mb-2 ${ranking.color}`}>{ranking.position}</div>
                <h3 className="text-xl font-bold mb-1">{ranking.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{ranking.subtitle}</p>
                <div className="text-lg font-bold text-rashmi-red mb-2">{ranking.capacity}</div>
                <p className="text-sm text-muted-foreground">{ranking.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Makes the <span className="text-rashmi-red">Largest DI Pipe Manufacturers</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key metrics that define leadership among the world's biggest ductile iron pipe manufacturers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitiveMetrics.map((metric, index) => (
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
                    <metric.icon size={24} />
                  </div>
                </div>
                <h3 className="font-bold mb-2">{metric.metric}</h3>
                <div className="text-2xl font-bold text-rashmi-red mb-2">{metric.value}</div>
                <p className="text-sm text-muted-foreground mb-2">{metric.description}</p>
                <p className="text-xs text-rashmi-red font-medium">{metric.comparison}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Analysis */}
      <section className="py-16 bg-rashmi-dark text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Global <span className="text-rashmi-red">DI Pipe Industry</span> Analysis
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Understanding the competitive landscape among the world's leading ductile iron pipe producers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-rashmi-red">Market Leadership Factors</h3>
              <div className="space-y-4">
                {[
                  "Production capacity and manufacturing scale",
                  "Global market presence and distribution network", 
                  "Technical capabilities and quality standards",
                  "Innovation in manufacturing processes",
                  "Compliance with international standards",
                  "Sustainability and environmental practices"
                ].map((factor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="text-rashmi-red flex-shrink-0" size={20} />
                    <span className="text-gray-300">{factor}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-rashmi-red">Rashmi Metaliks Position</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-bold text-rashmi-red">#2</div>
                  <div className="text-sm text-gray-300">World's 2nd Largest DI Pipe Manufacturer</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-rashmi-red">770,000</div>
                  <div className="text-sm text-gray-300">MT Annual Production Capacity</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-rashmi-red">50+</div>
                  <div className="text-sm text-gray-300">Countries Served Globally</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-rashmi-red">40+</div>
                  <div className="text-sm text-gray-300">Years of Industry Experience</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DuctileIronPipeLeadership;
