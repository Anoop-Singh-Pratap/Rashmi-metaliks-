import React from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { Shield, Award, Factory, Globe, BarChart, FileCheck, CheckCircle, ArrowRight, Info, ChevronRight, Pipette, Waves, ShieldCheck, Clock, MapPin, Ruler } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import RevealText from '@/components/ui/RevealText';
import { Helmet } from 'react-helmet-async';
import SEO from '@/components/SEO';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import { useRef, useEffect, useState } from 'react';

const WhyRashmiDiPipes = () => {
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

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  const floatAnimation = {
    initial: { y: 0 },
    animate: { 
      y: [0, -10, 0], 
      transition: { 
        duration: 3, 
        repeat: Infinity, 
        repeatType: "loop" as const, 
        ease: "easeInOut" 
      } 
    }
  };

  const shimmerVariants = {
    initial: { backgroundPosition: '200% 0' },
    animate: {
        backgroundPosition: '-200% 0',
        transition: {
            duration: 1.5, 
            repeat: Infinity,
            ease: "linear"
        }
    }
  };

  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef);
  const heroControls = useAnimation();
  
  useEffect(() => {
    if (isHeroInView) {
      heroControls.start("visible");
    }
  }, [isHeroInView, heroControls]);

  // SEO schemas
  const faqSchema = generateFAQSchema([
    {
      question: "Why should I choose Rashmi DI Pipes?",
      answer: "Rashmi DI Pipes offers exceptional quality, reliability, longevity, and value. As India's largest and world's second largest manufacturer, we provide products that meet global standards with a state-of-the-art manufacturing facility."
    },
    {
      question: "What makes Rashmi DI Pipes different from competitors?",
      answer: "Rashmi Metaliks DI Pipes stand apart due to our massive 770,000 MT annual production capacity, ISO certifications, 100+ year engineered lifespan, and compliance with international standards including EN 545, ISO 2531, and more."
    },
    {
      question: "What is the production capacity of Rashmi DI Pipes?",
      answer: "Rashmi Metaliks has a massive 770,000 MT annual production capacity for Ductile Iron Pipes, making it India's largest and the world's 2nd largest manufacturer."
    },
    {
      question: "What certifications do Rashmi DI Pipes have?",
      answer: "Rashmi DI Pipes are ISO certified and comply with international standards including EN 545, ISO 2531, AWWA C151/A21.51, and ASTM A536."
    }
  ]);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/#products" },
    { name: "Ductile Iron Pipes", url: "/di-pipes" },
    { name: "Why Choose Rashmi DI Pipes", url: "/why-rashmi-di-pipes" }
  ]);
  
  // Combined schema array for SEO component
  const schemas = [faqSchema, breadcrumbSchema];

  const milestones = [
    {
      year: "2004",
      title: "Founded in West Bengal",
      description: "Rashmi Metaliks Limited was incorporated in West Bengal."
    },
    {
      year: "2010",
      title: "Production Expansion",
      description: "Expanded facilities with state-of-the-art integrated steel manufacturing."
    },
    {
      year: "2015",
      title: "Leading Manufacturer",
      description: "Became one of the leading DI Pipes & Fittings manufacturers in India."
    },
    {
      year: "2023",
      title: "Global Leadership",
      description: "Secured position as India's largest and world's second-largest DI pipe manufacturer."
    }
  ];

  const qualities = [
    {
      icon: <Shield size={24} />,
      title: "Reliability",
      description: "Synonymous with reliability in Eastern India's iron & steel manufacturing industry."
    },
    {
      icon: <Award size={24} />,
      title: "Quality Excellence",
      description: "ISO certified with quality as per international benchmarks."
    },
    {
      icon: <Factory size={24} />,
      title: "Modern Manufacturing",
      description: "State-of-the-art integrated steel manufacturing facility."
    },
    {
      icon: <Globe size={24} />,
      title: "Global Standards",
      description: "Products following numerous international and European standards."
    }
  ];

  const stats = [
    {
      value: "7.7L MT",
      label: "Annual Production Capacity",
      icon: <Factory className="text-rashmi-red" size={24} />
    },
    {
      value: "62%",
      label: "CAGR Since Inception",
      icon: <BarChart className="text-rashmi-red" size={24} />
    },
    {
      value: "26K MT",
      label: "DI Fittings Production",
      icon: <Factory className="text-rashmi-red" size={24} />
    }
  ];

  const products = [
    {
      range: "DN 80 to DN 1200",
      type: "DI Pipes",
      applications: "Potable water, raw water, and wastewater transportation"
    },
    {
      range: "DN 80 to DN 1600",
      type: "DI Fittings",
      applications: "Various jointing options with different coating types"
    }
  ];

  // Certificate data
  const certifications = [
    // Management System Certifications
    {
      id: 1,
      title: "BSI ISO 9001:2015",
      category: "management",
      region: "global",
      description: "Quality Management System certification ensuring our products meet customer and regulatory requirements",
      issueDate: "2021-12-30",
      expiryDate: "2023-12-30",
      certificateNumber: "FM 729671",
      featured: true,
      certificationBody: "BSI",
      fileUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/09/ISO-9001-2015-Cert.pdf",
      thumbnailUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/09/ISO-9001-2015-Cert-725x1024.jpg",
      pdfSize: "1.2 MB"
    },
    {
      id: 2,
      title: "BSI ISO 14001",
      category: "management",
      region: "global",
      description: "Environmental Management System certification ensuring our operations minimize environmental impact",
      issueDate: "2020-12-30",
      expiryDate: "2023-12-30",
      certificateNumber: "EMS 729670",
      featured: true,
      certificationBody: "BSI",
      fileUrl: "https://rashmimetaliks.com/wp-content/uploads/2021/12/02.-EMS-14001-RML-Valid-till-30-12-2023.pdf",
      thumbnailUrl: "https://rashmimetaliks.com/wp-content/uploads/2021/12/BIS-14001-Rashmi-Metaliks-1.jpg",
      pdfSize: "1.1 MB"
    },
    {
      id: 3,
      title: "BSI ISO 45001",
      category: "management",
      region: "global",
      description: "Occupational Health and Safety Management System certification ensuring a safe workplace for all employees",
      issueDate: "2021-01-15",
      expiryDate: "2023-12-30",
      certificateNumber: "OHS 729672",
      featured: true,
      certificationBody: "BSI",
      fileUrl: "https://rashmimetaliks.com/wp-content/uploads/2021/12/OHS-45001.pdf",
      thumbnailUrl: "https://rashmimetaliks.com/wp-content/uploads/2021/12/BSI-45001-1.jpg",
      pdfSize: "950 KB"
    },
    {
      id: 4,
      title: "WRAS OPC Certificate",
      category: "management",
      region: "europe",
      description: "Water Regulations Advisory Scheme certification for Ordinary Portland Cement used in our products",
      issueDate: "2022-03-10",
      expiryDate: "2025-03-10",
      certificationBody: "WRAS",
      fileUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/09/WRAS-OPC.pdf",
      thumbnailUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/09/WRAS-OPC_page-0001-724x1024.jpg",
      pdfSize: "1.0 MB"
    },
    
    // Kitemark Certifications
    {
      id: 5,
      title: "Kitemark EN 545",
      category: "product",
      region: "europe",
      description: "BSI Kitemark certification confirming our DI pipes, fittings and flanged pipes comply with EN 545 standard for water pipelines",
      issueDate: "2022-02-15",
      expiryDate: "2025-02-15",
      certificateNumber: "KM 793696",
      standard: "EN 545:2010",
      featured: true,
      certificationBody: "BSI",
      fileUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/09/KM-793696-001-EN-545..pdf",
      thumbnailUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/09/KM-793696-001-EN-545._page-0001-scaled.jpg",
      pdfSize: "1.3 MB"
    },
    {
      id: 6,
      title: "Kitemark ISO 2531",
      category: "product",
      region: "global",
      description: "BSI Kitemark certification confirming our DI pipes, fittings and flanged pipes comply with ISO 2531 international standard",
      issueDate: "2022-02-15",
      expiryDate: "2025-02-15",
      certificateNumber: "KM 793698",
      standard: "ISO 2531:2009",
      featured: true,
      certificationBody: "BSI",
      fileUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/09/KM-793698-001-ISO-2531..pdf",
      thumbnailUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/09/KM-793698-001-ISO-2531._page-0001-scaled.jpg",
      pdfSize: "1.2 MB"
    },
    
    // NABL Certificate
    {
      id: 7,
      title: "NABL Certificate TC-8688",
      category: "laboratory",
      region: "asia",
      description: "National Accreditation Board for Testing and Calibration Laboratories certification for our testing facilities",
      issueDate: "2022-01-20",
      expiryDate: "2024-01-20",
      certificateNumber: "TC-8688",
      certificationBody: "NABL",
      fileUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/09/NABL-certificate-TC-8688.pdf.pdf",
      thumbnailUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/09/NABL-certificate-TC-8688.pdf_page-0001-scaled.jpg",
      pdfSize: "2.1 MB"
    },
    
    // BIS Certificate
    {
      id: 8,
      title: "BIS 8329:2000",
      category: "pipes",
      region: "asia",
      description: "Bureau of Indian Standards certification for Ductile Iron Pipes for Water and Sewage Applications",
      issueDate: "2021-06-15",
      expiryDate: "2024-06-15",
      standard: "IS 8329:2000",
      certificationBody: "BIS",
      fileUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/09/BIS-renewal_page-0001-scaled.jpg",
      thumbnailUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/09/BIS-renewal_page-0001-scaled.jpg",
      pdfSize: "1.5 MB"
    },
    
    // SASO Certificate
    {
      id: 9,
      title: "SASO Certificate",
      category: "pipes",
      region: "middleeast",
      description: "Saudi Standards, Metrology and Quality Organization certification for our Ductile Iron Pipes",
      issueDate: "2022-05-10",
      expiryDate: "2024-05-10",
      standard: "SASO 1020, SASO 1014, SASO 1016/1017",
      certificationBody: "SASO",
      fileUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/09/Rashmi_SASO_Certificate.pdf",
      thumbnailUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/09/Rashmi_SASO_Certificate_page-0001-scaled.jpg",
      pdfSize: "1.7 MB",
      featured: true
    },
    
    // BIS Licenses for Fitting Plant and Flanging Unit
    {
      id: 10,
      title: "BIS License for Fitting Plant",
      category: "fittings",
      region: "asia",
      description: "Bureau of Indian Standards license for the production of DI fittings",
      certificationBody: "BIS",
      fileUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/06/BIS-License-Fitting-plant-01-scaled.jpg",
      thumbnailUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/06/BIS-License-Fitting-plant-01-scaled.jpg",
      pdfSize: "1.6 MB"
    },
    {
      id: 11,
      title: "BIS License for Flanging Unit",
      category: "fittings",
      region: "asia",
      description: "Bureau of Indian Standards license for the production of flanged pipes",
      certificationBody: "BIS",
      fileUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/06/BIS-License-copy-Flanging-unit-01-scaled.jpg",
      thumbnailUrl: "https://rashmimetaliks.com/wp-content/uploads/2023/06/BIS-License-copy-Flanging-unit-01-scaled.jpg",
      pdfSize: "1.5 MB"
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>Why Choose Rashmi DI Pipes | Global Leadership in Quality & Reliability</title>
        <meta name="description" content="Discover why Rashmi Metaliks is the preferred choice for premium Ductile Iron Pipes. With 770,000 MT annual capacity, superior quality and global certifications, we're India's largest and world's 2nd largest DI pipe manufacturer." />
        <meta name="keywords" content="Rashmi DI Pipes, Premium DI Pipes, Best Ductile Iron Pipes, India Largest DI Pipe Manufacturer, World's 2nd Largest DI Pipe Manufacturer" />
      </Helmet>

      <SEO 
        title="Why Choose Rashmi DI Pipes | Global Leadership in Quality & Reliability"
        description="Discover why Rashmi Metaliks is the preferred choice for premium Ductile Iron Pipes. With 770,000 MT annual capacity, superior quality and global certifications, we're India's largest and world's 2nd largest DI pipe manufacturer."
        keywords="Rashmi DI Pipes, Premium DI Pipes, Best Ductile Iron Pipes, India Largest DI Pipe Manufacturer, World's 2nd Largest DI Pipe Manufacturer"
        canonicalUrl="/why-rashmi-di-pipes"
        ogType="website"
        ogImage="https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/Rashmi%20Metaliks/d7mk2qxrhaaliiuwtze7"
        schema={schemas}
      />

      <Header />

      {/* Enhanced Hero Section with Parallax and Animation Effects */}
      <section 
        ref={heroRef}
        className="pt-32 pb-24 md:pb-32 relative overflow-hidden min-h-[80vh] flex items-center"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-[-10] pointer-events-none">
          {/* Subtle Grid Pattern */}
          <svg className="absolute inset-0 h-full w-full stroke-gray-300/30 dark:stroke-neutral-700/30 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]" aria-hidden="true">
            <defs>
              <pattern id="hero-pattern" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M.5 200V.5H200" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero-pattern)"/>
          </svg>
          
          {/* Gradient Shapes */}
          <div className="absolute -right-[15%] top-[5%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-rashmi-red/15 via-rashmi-red/5 to-transparent blur-3xl opacity-70"></div>
          <div className="absolute -left-[10%] bottom-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-blue-500/15 via-blue-500/5 to-transparent blur-3xl opacity-60"></div>
          
          {/* Main Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background z-[-5]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate={heroControls}
            variants={containerVariants}
            className="max-w-5xl mx-auto"
          >
            {/* Enhanced Breadcrumb */}
            <motion.div
              variants={fadeInUpVariants}
              className="flex items-center text-sm text-muted-foreground/80 mb-10 self-start w-full"
            >
              <Link to="/" className="hover:text-rashmi-red transition-colors duration-200 group flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home text-muted-foreground/60 group-hover:text-rashmi-red transition-colors"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Home
              </Link>
              <ChevronRight className="mx-1.5 h-4 w-4 text-muted-foreground/40" />
              <Link to="/#products" className="hover:text-rashmi-red transition-colors duration-200">
                Products
              </Link>
              <ChevronRight className="mx-1.5 h-4 w-4 text-muted-foreground/40" />
              <Link to="/di-pipes" className="hover:text-rashmi-red transition-colors duration-200">
                Ductile Iron Pipes
              </Link>
              <ChevronRight className="mx-1.5 h-4 w-4 text-muted-foreground/40" />
              <span className="font-medium text-foreground">Why Choose Us</span>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                variants={containerVariants}
                className="flex flex-col space-y-6"
              >
                {/* Category label with animation */}
                <motion.div 
                  variants={fadeInUpVariants}
                  className="mb-2 overflow-hidden inline-block"
                >
                  <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-gradient-to-r from-rashmi-red to-rashmi-red/80 px-4 py-1 rounded-full mb-2 shadow-lg shadow-rashmi-red/20 inline-block"
                  >
                    <span className="text-white text-sm font-medium uppercase tracking-wider">Global Leadership</span>
                  </motion.div>
                </motion.div>
                
                {/* Main heading with RevealText for staggered animation */}
                <div className="mb-4">
                  <RevealText
                    text="Why Choose"
                    as="h1"
                    className="text-4xl md:text-6xl font-display font-bold text-foreground"
                    staggerDelay={0.08}
                  />
                  <RevealText
                    text="Rashmi DI Pipes"
                    as="h1"
                    className="text-4xl md:text-6xl font-display font-bold text-rashmi-red"
                    staggerDelay={0.08}
                    initialDelay={0.4}
                  />
                </div>
                
                <motion.p 
                  variants={fadeInUpVariants} 
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  A name synonymous with reliability & quality in Eastern India's iron & steel manufacturing industry. We are India's largest and world's second-largest DI pipe manufacturer.
                </motion.p>
                
                {/* Enhanced stat badges with animation */}
                <motion.div 
                  variants={fadeInUpVariants}
                  className="flex flex-wrap gap-4 my-6"
                >
                  <motion.span 
                    variants={floatAnimation}
                    initial="initial"
                    animate="animate"
                    className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-rashmi-red text-white shadow-md border border-rashmi-red/20"
                  >
                    <CheckCircle size={16} className="mr-1" /> World's 2nd Largest
                  </motion.span>
                  <motion.span 
                    variants={floatAnimation}
                    initial="initial"
                    animate="animate"
                    className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-card border border-border shadow-md backdrop-blur-sm"
                  >
                    <CheckCircle size={16} className="mr-1 text-rashmi-red" /> 7.7L MT Production
                  </motion.span>
                </motion.div>
                
                {/* CTA Button */}
                <motion.div
                  variants={fadeInUpVariants}
                  className="pt-4"
                >
                  <Link
                    to="/di-pipes"
                    className="group inline-flex items-center justify-center gap-2.5 py-3.5 px-8 bg-gradient-to-r from-rashmi-red to-red-700 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-rashmi-red/30 focus:outline-none focus:ring-4 focus:ring-rashmi-red/40 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
                  >
                     {/* Shimmer Effect */}
                     <motion.span
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                        style={{ backgroundSize: '200% 100%' }}
                        variants={shimmerVariants}
                        initial="initial"
                        animate="animate"
                     ></motion.span>
                     <span className="relative z-10">Explore Our DI Pipes</span>
                     <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5 relative z-10" />
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Hero Image with Premium 3D Mockup */}
              <motion.div
                variants={itemVariants}
                className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-rashmi-red/10 to-blue-500/10 rounded-2xl"></div>
                <div className="absolute inset-1 rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                  <img 
                    src="https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/Rashmi%20Metaliks/d7mk2qxrhaaliiuwtze7" 
                    alt="Premium Rashmi DI Pipes" 
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                  />
                  {/* Overlay gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Product specs highlights */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-xl font-bold">Premium DI Pipes</h3>
                        <p className="text-sm text-white/80">EN 545 & ISO 2531 Certified</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm">
                          <Ruler size={12} className="mr-1" /> DN 80-1200
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm">
                          <Clock size={12} className="mr-1" /> 100+ Years
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Introduction Section with Premium Styling */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          {/* Subtle background patterns */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(229,57,53,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(229,57,53,0.05)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(229,57,53,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(229,57,53,0.1)_1px,transparent_1px)]"></div>
          
          {/* Background gradient blobs */}
          <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-rashmi-red/5 dark:bg-rashmi-red/10 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-3xl opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={containerVariants} className="space-y-6">
                <div className="inline-block mb-4">
                  <span className="text-rashmi-red text-sm font-medium uppercase tracking-wider px-4 py-1 bg-rashmi-red/10 rounded-full">
                    Our Story
                  </span>
                </div>
              
                <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold">
                  Global Leadership in <span className="text-rashmi-red">Metallurgy</span>
                </motion.h2>
                
                <motion.div variants={itemVariants}>
                  <div className="w-16 h-1 bg-gradient-to-r from-rashmi-red via-rashmi-red/70 to-transparent rounded-full mb-6"></div>
                </motion.div>
                
                <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed">
                  Rashmi Metaliks Limited is one of the flagship companies of Rashmi Group, incorporated in 
                  the year 2004 in West Bengal. We have a State-Of-The-Art Integrated Steel manufacturing facility 
                  comprised of Pellet, Sinter, Pig iron, Sponge Iron, Ductile Iron Pipe and Fittings, Billet, TMT & Wire 
                  Rod.
                </motion.p>
                <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed">
                  Since its inception, Rashmi Metaliks has been expanding at an unbeatable CAGR 
                  of 62%. We have upgraded our production to 7,70,000 Metric Tonnes of DI Pipes & 26,000 Metric 
                  Tonnes of DI Fittings annually.
                </motion.p>
                <motion.p variants={itemVariants} className="font-semibold text-lg text-foreground">
                  Today, Rashmi Metaliks stands as the largest manufacturer of DI Pipes 
                  & Fittings in India and holds the second position in the globe.
                </motion.p>
                
                {/* Feature highlights */}
                <motion.div 
                  variants={itemVariants}
                  className="pt-4 grid grid-cols-2 gap-4"
                >
                  {[
                    { icon: <Award className="text-rashmi-red" size={20} />, text: "ISO Certified Quality" },
                    { icon: <Globe className="text-rashmi-red" size={20} />, text: "International Standards" },
                    { icon: <Factory className="text-rashmi-red" size={20} />, text: "Modern Manufacturing" },
                    { icon: <Shield className="text-rashmi-red" size={20} />, text: "Unmatched Durability" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="p-2 bg-rashmi-red/10 rounded-full">
                        {feature.icon}
                      </div>
                      <span className="text-sm font-medium">{feature.text}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="perspective-1000"
              >
                <div className="relative w-full rounded-2xl overflow-hidden transform-gpu group transition-all duration-500">
                  {/* 3D card effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rashmi-red/20 to-rashmi-red/5 rounded-2xl transform-gpu group-hover:scale-[1.02] transition-all duration-700"></div>
                  <div className="p-1">
                    <div className="relative rounded-xl overflow-hidden transform-gpu group-hover:scale-[1.01] transition-all duration-700">
                      {/* Main image */}
                      <img 
                        src="https://res.cloudinary.com/dada5hjp3/image/upload/v1744693543/Generated_Image_March_25_2025_-_11_12AM.png_j5ilcy.jpg" 
                  alt="Rashmi DI Pipes Manufacturing" 
                        className="w-full h-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                      {/* Image overlay with gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-rashmi-red/20 to-rashmi-dark/40 opacity-0 group-hover:opacity-50 transition-opacity duration-500 z-10"></div>
                      
                      {/* Floating badge */}
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-20">
                        <div className="w-2 h-2 rounded-full bg-rashmi-red animate-pulse"></div>
                        <span className="text-sm font-medium">World's 2nd Largest</span>
                      </div>
                      
                      {/* Bottom info card */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white/90 text-sm">
                          Our state-of-the-art manufacturing facility in West Bengal produces 7,70,000 MT of DI pipes annually
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating stats card */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="bg-card/80 backdrop-blur-sm border border-border/40 shadow-xl rounded-xl p-4 flex gap-4 -mt-16 mx-8 relative z-20"
                >
                  <div className="flex-1 flex flex-col items-center justify-center border-r border-border/30 pr-4">
                    <span className="text-2xl font-bold text-rashmi-red">7.7L MT</span>
                    <span className="text-xs text-muted-foreground text-center">Annual Production</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-rashmi-red">100+</span>
                    <span className="text-xs text-muted-foreground text-center">Years Lifespan</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section with Premium Cards */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 w-full h-full">
          <div className="absolute inset-0 bg-grid-pattern w-full h-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <span className="text-rashmi-red text-sm font-medium uppercase tracking-wider px-4 py-1 bg-rashmi-red/10 rounded-full inline-block mb-4">
                By The Numbers
              </span>
              
              <RevealText
                text="Our Production Capacity"
                as="h2"
                className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3"
                staggerDelay={0.05}
              />
              
              <p className="text-muted-foreground max-w-2xl mx-auto">
                As India's largest and world's second-largest manufacturer, we have the scale and capacity to meet the most demanding infrastructure projects.
              </p>
              
              <div className="w-16 h-1 bg-rashmi-red mx-auto mt-6 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  value: "7.7L MT",
                  label: "Annual DI Pipe Production",
                  icon: <Factory className="text-white" size={24} />,
                  desc: "Manufacturing capacity of 770,000 Metric Tonnes of DI Pipes annually"
                },
                {
                  value: "62%",
                  label: "CAGR Since Inception",
                  icon: <BarChart className="text-white" size={24} />,
                  desc: "Consistent growth since 2004 with expansion of production capabilities"
                },
                {
                  value: "26K MT",
                  label: "DI Fittings Production",
                  icon: <Factory className="text-white" size={24} />,
                  desc: "Annual manufacturing capacity of 26,000 Metric Tonnes of DI Fittings"
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative overflow-hidden group rounded-2xl"
                >
                  {/* Background with gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rashmi-red to-rashmi-dark opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-8 text-white">
                    <div className="mb-4 bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    {stat.icon}
                    </div>
                    <h3 className="text-4xl font-bold mb-2 text-center">{stat.value}</h3>
                    <h4 className="text-xl font-medium mb-4 text-center text-white/90">{stat.label}</h4>
                    <p className="text-sm text-white/80 text-center">{stat.desc}</p>
                    
                    {/* Decorative circle */}
                    <motion.div 
                      className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full z-0"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.2, 0.1]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Additional Achievement Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-16 max-w-3xl mx-auto bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="bg-rashmi-red/10 p-3 rounded-full">
                  <Award className="text-rashmi-red h-10 w-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Global Recognition</h3>
                  <p className="text-muted-foreground">2nd largest DI pipe manufacturer in the world</p>
                </div>
              </div>
              <Link
                to="/certifications"
                className="flex items-center gap-2 px-5 py-2.5 bg-rashmi-red/10 hover:bg-rashmi-red/20 text-rashmi-red rounded-full font-medium transition-colors duration-300 group"
              >
                View Certifications
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Enhanced Quality & Certifications Section */}
      <section className="py-24 bg-muted/20 dark:bg-rashmi-red/5 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(229,57,53,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(229,57,53,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-rashmi-red/3 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <span className="text-rashmi-red text-sm font-medium uppercase tracking-wider px-4 py-1 bg-rashmi-red/10 rounded-full inline-block mb-4">
                Excellence Assured
              </span>
              
              <RevealText
                text="Quality & Certifications"
                as="h2"
                className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3"
                staggerDelay={0.05}
              />
              
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our commitment to quality is backed by international certifications and rigorous testing processes.
              </p>
              
              <div className="w-16 h-1 bg-rashmi-red mx-auto mt-6 rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left side - Quality Cards */}
              <motion.div variants={containerVariants} className="grid grid-cols-2 gap-6">
                {qualities.map((quality, index) => (
                  <motion.div
                    key={quality.title}
              variants={itemVariants}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)",
                      transition: { duration: 0.3 }
                    }}
                    className="bg-card dark:bg-card/60 border border-border rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="mb-4 bg-rashmi-red/10 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-rashmi-red/20 transition-colors duration-300">
                      {React.cloneElement(quality.icon, { className: "text-rashmi-red group-hover:scale-110 transition-transform duration-300" })}
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-rashmi-red transition-colors duration-300">{quality.title}</h3>
                    <p className="text-muted-foreground text-sm">{quality.description}</p>
                    
                    {/* Highlight overlay on hover */}
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-r from-rashmi-red/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    {/* Top border accent that appears on hover */}
                    <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0 w-0 group-hover:w-full transition-all duration-500"></div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Right side - Certifications */}
              <motion.div 
                variants={containerVariants} 
                className="bg-card dark:bg-card/60 border border-border rounded-2xl p-8 shadow-lg"
              >
                <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Award className="text-rashmi-red" />
                  International Certifications
                </motion.h3>
                
                <div className="space-y-6">
                  <motion.div variants={itemVariants} className="flex items-start gap-4">
                    <div className="bg-rashmi-red/10 p-2 rounded-full flex-shrink-0">
                      <FileCheck className="text-rashmi-red h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">EN 545 Certification</h4>
                      <p className="text-sm text-muted-foreground">European standard for ductile iron pipes, fittings, and accessories for water pipelines</p>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex items-start gap-4">
                    <div className="bg-rashmi-red/10 p-2 rounded-full flex-shrink-0">
                      <FileCheck className="text-rashmi-red h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">ISO 2531 Compliance</h4>
                      <p className="text-sm text-muted-foreground">International standard for ductile iron pipes, fittings, and accessories for pressure applications</p>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex items-start gap-4">
                    <div className="bg-rashmi-red/10 p-2 rounded-full flex-shrink-0">
                      <FileCheck className="text-rashmi-red h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">ISO 9001:2015</h4>
                      <p className="text-sm text-muted-foreground">Quality management system certification ensuring consistent quality and customer satisfaction</p>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex items-start gap-4">
                    <div className="bg-rashmi-red/10 p-2 rounded-full flex-shrink-0">
                      <FileCheck className="text-rashmi-red h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">ISO 14001:2015</h4>
                      <p className="text-sm text-muted-foreground">Environmental management system certification demonstrating our commitment to sustainability</p>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div variants={itemVariants} className="mt-8">
                  <Link
                    to="/certifications"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rashmi-red to-rashmi-red/90 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-rashmi-red/20 transition-all duration-300 group"
                  >
                    <Award size={16} className="text-white/90" />
                    View All Certifications
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* New Premium Advantages Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Background gradient */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-rashmi-red/5 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-blue-500/5 via-transparent to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <span className="text-rashmi-red text-sm font-medium uppercase tracking-wider px-4 py-1 bg-rashmi-red/10 rounded-full inline-block mb-4">
                Choose Excellence
              </span>
              
              <RevealText
                text="Why Choose Our DI Pipes"
                as="h2"
                className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3"
                staggerDelay={0.05}
              />
              
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Benefits that flow beyond expectations. Our DI pipes offer the perfect blend of strength, longevity, and value.
              </p>
              
              <div className="w-16 h-1 bg-rashmi-red mx-auto mt-6 rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Ruler size={24} />,
                  title: "Exceptional Strength",
                  description: "Our DI pipes provide 2-3 times higher tensile strength than traditional cast iron pipes, ensuring durability in challenging conditions."
                },
                {
                  icon: <ShieldCheck size={24} />,
                  title: "Superior Corrosion Resistance",
                  description: "Advanced coating technologies protect against aggressive soil conditions and extend service life significantly."
                },
                {
                  icon: <Waves size={24} />,
                  title: "Optimal Hydraulic Efficiency",
                  description: "Smooth interior lining minimizes friction losses and maximizes flow capacity, reducing operational costs."
                },
                {
                  icon: <Clock size={24} />,
                  title: "Exceptional Longevity",
                  description: "Engineered to last 100+ years, providing exceptional long-term value for infrastructure investments."
                },
                {
                  icon: <Pipette size={24} />,
                  title: "Environmental Sustainability",
                  description: "Made from recycled materials and recyclable at end-of-life, supporting sustainable infrastructure development."
                },
                {
                  icon: <MapPin size={24} />,
                  title: "Global Project Experience",
                  description: "Successfully deployed in major infrastructure projects across 30+ countries, proving reliability worldwide."
                }
              ].map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10, 
                    transition: { duration: 0.3 }
                  }}
                  className="bg-card dark:bg-card/70 border border-border rounded-2xl p-8 shadow-md transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="mb-4 bg-rashmi-red/10 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-rashmi-red/20 transition-colors duration-300">
                    {React.cloneElement(advantage.icon, { className: "text-rashmi-red group-hover:scale-110 transition-transform duration-300" })}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-rashmi-red transition-colors duration-300">{advantage.title}</h3>
                  <p className="text-muted-foreground">{advantage.description}</p>
                  
                  {/* Gradient corner accent */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-tl from-rashmi-red/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </motion.div>
              ))}
            </div>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center mt-16"
            >
              <Link
                to="/di-pipes"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rashmi-red to-rashmi-dark text-white rounded-full text-lg font-medium hover:shadow-xl hover:shadow-rashmi-red/20 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Shimmer Effect */}
                <motion.span
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  style={{ backgroundSize: '200% 100%' }}
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                ></motion.span>
                <span className="relative z-10">Explore Our DI Pipe Range</span>
                <ArrowRight size={18} className="relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Enhanced Product Range section */}
      <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          {/* Gradient blobs */}
          <div className="absolute -right-[20%] -top-[10%] w-[40%] h-[40%] rounded-full bg-rashmi-red/10 blur-3xl opacity-50"></div>
          <div className="absolute -left-[20%] -bottom-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-3xl opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <span className="text-rashmi-red text-sm font-medium uppercase tracking-wider px-4 py-1 bg-rashmi-red/10 rounded-full inline-block mb-4">
                Comprehensive Solutions
              </span>
              
              <RevealText
                text="Our Product Range"
                as="h2"
                className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3"
                staggerDelay={0.05}
              />
              
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer a comprehensive range of ductile iron pipes and fittings to meet all your infrastructure needs.
              </p>
              
              <div className="w-16 h-1 bg-rashmi-red mx-auto mt-6 rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              {products.map((product, index) => (
                <motion.div
                  key={product.type}
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-card dark:bg-card/60 border border-border rounded-2xl overflow-hidden shadow-lg group"
                >
                  <div className="h-64 relative overflow-hidden">
                    {/* Product image */}
                    <img 
                      src={index === 0 
                        ? "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/Rashmi%20Metaliks/d7mk2qxrhaaliiuwtze7" 
                        : "https://res.cloudinary.com/dada5hjp3/image/upload/v1744704344/Product_DiFittings_ku2bvs.jpg"
                      } 
                      alt={product.type} 
                      className="w-full h-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300"></div>
                    
                    {/* Product title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white">{product.type}</h3>
                      <p className="text-white/80 text-sm mt-1">Range: {product.range}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-3">Applications</h4>
                    <p className="text-muted-foreground">{product.applications}</p>
                    
                    <div className="mt-6 flex items-center justify-end">
                      <Link 
                        to={index === 0 ? "/di-pipes" : "/di-fittings"}
                        className="inline-flex items-center gap-2 text-rashmi-red font-medium hover:underline group/link"
                      >
                        Learn more 
                        <ArrowRight size={16} className="transition-transform duration-200 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Enhanced Milestones Section */}
      <section className="py-24 bg-gradient-to-b from-background via-muted/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 dark:opacity-50 pointer-events-none">
          {/* Subtle background shapes */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-rashmi-red/5 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-blue-500/5 to-transparent blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <span className="text-rashmi-red text-sm font-medium uppercase tracking-wider px-4 py-1 bg-rashmi-red/10 rounded-full inline-block mb-4">
                Our Journey
              </span>
              
              <RevealText
                text="Milestones & Achievements"
                as="h2"
                className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3"
                staggerDelay={0.05}
              />
              
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A journey of excellence, innovation, and continuous growth since our inception.
              </p>
              
              <div className="w-16 h-1 bg-rashmi-red mx-auto mt-6 rounded-full"></div>
            </div>
            
            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Timeline Bar - Hidden on mobile, visible on desktop */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rashmi-red/20 via-rashmi-red/50 to-blue-500/50 rounded-full transform -translate-x-1/2"></div>
              
              {/* Milestone Items */}
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className={`relative mb-16 md:mb-24 last:mb-0`}
                >
                  <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} w-full mx-auto`}>
                    {/* Content Card */}
                    <div className="w-full md:w-5/12 px-4 py-4">
                      <motion.div 
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`bg-gradient-to-br ${index % 2 === 0 ? 'from-rashmi-red to-rashmi-dark' : 'from-blue-600 to-blue-800'} text-white border-0 rounded-xl shadow-lg p-6 relative z-10 transform transition-all duration-300 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}
                      >
                        {/* Year Badge */}
                        <div className={`absolute -top-4 ${index % 2 === 0 ? 'md:-left-6' : 'md:-right-6'} bg-white text-rashmi-red text-lg font-bold px-4 py-1 rounded-full shadow-md`}>
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-semibold mt-4 mb-2">{milestone.title}</h3>
                        <p className="text-white/90 text-sm">{milestone.description}</p>
                      </motion.div>
                    </div>
                    
                    {/* Center Dot - Visible on desktop */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-background rounded-full border-4 border-rashmi-red shadow-xl z-20 items-center justify-center">
                      <div className="w-2 h-2 bg-rashmi-red rounded-full"></div>
                    </div>
                    
                    {/* Spacer for alignment on desktop */}
                    <div className="hidden md:block w-5/12"></div>
                  </div>
                  
                  {/* Mobile Dot/Line */}
                  <div className="md:hidden flex flex-col items-center mt-4">
                    <div className="w-4 h-4 bg-rashmi-red rounded-full border-2 border-white dark:border-background shadow-md mb-2 z-10"></div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-12 bg-rashmi-red/50"></div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Premium Call-to-Action Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Background image with overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-rashmi-dark/90 to-rashmi-red/90 opacity-90"></div>
          <img 
            src="https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/Rashmi%20Metaliks/sl4ukstefebluhe1z8lz" 
            alt="DI Pipes Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <span className="text-white text-sm font-medium uppercase tracking-wider px-4 py-1 bg-white/10 rounded-full inline-block mb-6">
              Partner With Excellence
            </span>
            
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Ready to Experience the Rashmi Difference?
            </h2>
            
            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
              Join the global community of engineers, contractors, and utilities who trust Rashmi Metaliks for their critical infrastructure projects.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
                  <Link 
                    to="/di-pipes"
                className="px-8 py-4 bg-white text-rashmi-red rounded-full text-lg font-medium hover:bg-white/90 transition-colors duration-300 shadow-xl"
              >
                Explore Products
              </Link>
              
              <Link
                to="/contact-us"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-medium hover:bg-white/10 transition-colors duration-300"
              >
                Contact Our Team
                  </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WhyRashmiDiPipes;

