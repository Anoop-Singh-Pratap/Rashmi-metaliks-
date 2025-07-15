import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowUp, 
  ChevronDown, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Eye, 
  Database, 
  Lock, 
  RefreshCw,
  FileText,
  Printer,
  ExternalLink 
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Components
const CollapsibleSection = ({ title, children, index = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border border-border rounded-lg overflow-hidden mb-6 shadow-sm"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-card hover:bg-muted/50 p-4 text-left transition-colors duration-200"
      >
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-rashmi-red" />
        </motion.div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 border-t border-border bg-card/50">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Data Journey Visualization Component
const DataJourney = () => {
  const dataSteps = [
    { title: "Collection", icon: <Eye className="text-card-foreground" size={24} />, color: "bg-rashmi-red" },
    { title: "Storage", icon: <Database className="text-card-foreground" size={24} />, color: "bg-rashmi-red/80" },
    { title: "Processing", icon: <RefreshCw className="text-card-foreground" size={24} />, color: "bg-rashmi-red/60" },
    { title: "Protection", icon: <Lock className="text-card-foreground" size={24} />, color: "bg-rashmi-red/80" }
  ];

  return (
    <div className="py-8 mb-8">
      <h3 className="text-xl font-display font-bold mb-8 text-center text-foreground">
        Your Data Journey
      </h3>
      <div className="flex flex-wrap gap-8 justify-center">
        {dataSteps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
            whileHover={{ y: -10 }}
            className="flex flex-col items-center gap-4 w-36"
          >
            <div className={`${step.color} w-16 h-16 rounded-full shadow-md flex items-center justify-center`}>
              {step.icon}
            </div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "40%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
              className="h-1 bg-rashmi-red/60 rounded-full mt-1"
            ></motion.div>
            <p className="text-center font-medium text-foreground">{step.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Rights Grid Component
const RightsGrid = () => {
  const ccpaRights = [
    "Request disclosure of collected data",
    "Request deletion of personal data",
    "Opt-out of personal data selling",
    "Non-discrimination for exercising rights"
  ];

  const gdprRights = [
    "Right to access personal data",
    "Right to rectification of inaccurate data",
    "Right to erasure ('right to be forgotten')",
    "Right to restrict processing",
    "Right to object to processing",
    "Right to data portability"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-card p-6 rounded-xl border-l-4 border-rashmi-red/70"
      >
        <h4 className="text-lg font-display font-bold mb-4 text-foreground">
          CCPA Rights
        </h4>
        <ul className="space-y-3">
          {ccpaRights.map((right, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start gap-2 text-muted-foreground"
            >
              <CheckCircle className="w-5 h-5 text-rashmi-red mt-0.5 flex-shrink-0" />
              <span>{right}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-card p-6 rounded-xl border-l-4 border-rashmi-red"
      >
        <h4 className="text-lg font-display font-bold mb-4 text-foreground">
          GDPR Rights
        </h4>
        <ul className="space-y-3">
          {gdprRights.map((right, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start gap-2 text-muted-foreground"
            >
              <Shield className="w-5 h-5 text-rashmi-red mt-0.5 flex-shrink-0" />
              <span>{right}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

// Cookie Preference Demo
const CookieDemo = () => {
  const [cookies, setCookies] = useState({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false
  });

  return (
    <div className="bg-card p-6 rounded-xl mt-8 border border-border shadow-sm">
      <h3 className="text-xl font-display font-bold mb-6 text-foreground">
        Cookie Preferences Demo
      </h3>
      <div className="space-y-4">
        {Object.entries(cookies).map(([key, value], index) => (
          <motion.div 
            key={key}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-200"
          >
            <div>
              <p className="font-medium capitalize text-foreground">{key}</p>
              <p className="text-sm text-muted-foreground">
                {key === 'essential' ? 'Always enabled - Required for basic site functionality' : 'Optional'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={value}
                onChange={() => setCookies(prev => ({...prev, [key]: !prev[key]}))}
                disabled={key === 'essential'}
              />
              <div className={`
                w-11 h-6 bg-muted rounded-full peer 
                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
                after:bg-foreground/10 after:rounded-full after:h-5 after:w-5 after:transition-all 
                ${value ? 'peer-checked:bg-rashmi-red' : ''} 
                ${key === 'essential' ? 'opacity-60' : ''}
                transition-all duration-200
              `}></div>
            </label>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Note:</strong> This is a demonstration only. Your actual cookie preferences are managed 
          through our cookie consent banner when you first visit the site.
        </p>
      </div>
    </div>
  );
};

// Child Safety Alert
const ChildSafety = () => {
  return (
    <div className="bg-rashmi-red/10 p-6 rounded-xl mt-8 border border-rashmi-red/30">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <AlertTriangle className="w-8 h-8 text-rashmi-red" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold mb-2 text-foreground">
            Children's Privacy Protection
          </h3>
          <p className="text-muted-foreground">
            We are committed to protecting children's privacy online. Our website is not intended for children under 13, and we do not knowingly collect data from this age group.
          </p>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              If you believe your child has provided information on our website, please contact us immediately at{' '}
              <a href="mailto:privacy@rashmimetaliks.com" className="text-rashmi-red hover:underline">
                privacy@rashmimetaliks.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
const PrivacyPolicy = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Track scroll progress for the progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1) * 100;
      setScrollProgress(progress);
      
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const printPolicy = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | Rashmi Metaliks</title>
        <meta name="description" content="Privacy Policy for Rashmi Metaliks Ltd.'s website." />
        <link rel="canonical" href="https://www.rashmi.com/privacy-policy" />
        <style>{`
          @media print {
            header, footer, .print\\:hidden {
              display: none !important;
            }
            body, html {
              background-color: white !important;
              color: black !important;
            }
            .prose {
              max-width: 100% !important;
            }
          }
        `}</style>
      </Helmet>
      
      <Header />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50 print:hidden">
        <motion.div 
          className="h-full bg-rashmi-red"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden print:pt-8 print:pb-4">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background to-muted/30 print:hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1568607689150-2f18f4d0103c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-fixed bg-center bg-cover opacity-5"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-center text-foreground">
              Privacy <span className="text-rashmi-red">Policy</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8 text-center">
              At Rashmi Metaliks, your privacy is a top priority. This policy outlines how we collect, use, and protect your information.
            </p>
            
            <div className="flex justify-center space-x-6 print:hidden">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={printPolicy}
                className="flex items-center gap-2 text-sm bg-muted px-4 py-2 rounded-md hover:bg-muted/80 transition-colors"
              >
                <Printer size={16} />
                <span>Print Policy</span>
              </motion.button>
              
              <motion.a
                href="mailto:privacy@rashmimetaliks.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-2 text-sm bg-rashmi-red text-white px-4 py-2 rounded-md hover:bg-rashmi-red/90 transition-colors"
              >
                <Shield size={16} />
                <span>Contact Data Officer</span>
              </motion.a>
            </div>
            
            <div className="flex justify-center items-center mt-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <FileText size={16} />
                <span>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl pointer-events-none z-[-1] print:hidden"
        >
          <div className="bg-rashmi-red/20 rounded-full w-[600px] h-[600px] blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>
      </section>
      
      {/* Main Content Section */}
      <section className="py-12 print:py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Interactive Data Journey */}
            <DataJourney />
            
            {/* Introduction Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <p className="text-muted-foreground mb-4">
                At www.rashmimetaliks.com, accessible from www.rashmimetaliks.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by www.rashmimetaliks.com and how we use it.
              </p>
              <p className="text-muted-foreground mb-4">
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
              </p>
              <p className="text-muted-foreground mb-4">
                This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in www.rashmimetaliks.com. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the TermsFeed Privacy Policy Generator.
              </p>
            </motion.div>
            
            {/* Consent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-display font-bold mb-4 flex items-center text-foreground">
                <span className="bg-rashmi-red/10 text-rashmi-red rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">1</span> 
                Consent
              </h2>
              <p className="text-muted-foreground">
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
              </p>
            </motion.div>
            
            {/* Information Collection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-display font-bold mb-4 flex items-center text-foreground">
                <span className="bg-rashmi-red/10 text-rashmi-red rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">2</span> 
                Information We Collect
              </h2>
              <p className="text-muted-foreground mb-4">
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>
              <p className="text-muted-foreground mb-4">
                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
              </p>
              <p className="text-muted-foreground">
                When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
              </p>
            </motion.div>
            
            {/* How We Use Information */}
            <CollapsibleSection title="How We Use Your Information" index={0}>
              <p className="text-muted-foreground mb-4">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-2">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
              </ul>
            </CollapsibleSection>
            
            {/* Log Files */}
            <CollapsibleSection title="Log Files" index={1}>
              <p className="text-muted-foreground mb-4">
                www.rashmimetaliks.com follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
              </p>
              
              <div className="bg-muted/30 p-4 rounded-lg border border-border/50 mt-4">
                <h4 className="text-foreground font-medium mb-2 flex items-center">
                  <Database size={16} className="text-rashmi-red mr-2" /> Log Data Information
                </h4>
                <p className="text-sm text-muted-foreground">
                  Log files typically include: IP addresses, browser details, timestamps, page interactions, and device information.
                </p>
              </div>
            </CollapsibleSection>
            
            {/* Cookies and Web Beacons */}
            <CollapsibleSection title="Cookies and Web Beacons" index={2}>
              <p className="text-muted-foreground mb-4">
                Like any other website, www.rashmimetaliks.com uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
              </p>
              <p className="text-muted-foreground mb-4">
                For more general information on cookies, please read "Cookies" article from the Privacy Policy Generator.
              </p>
              
              {/* Demo Cookie Preferences */}
              <CookieDemo />
            </CollapsibleSection>
            
            {/* Advertising Partners */}
            <CollapsibleSection title="Advertising Partners Privacy Policies" index={3}>
              <p className="text-muted-foreground mb-4">
                You may consult this list to find the Privacy Policy for each of the advertising partners of www.rashmimetaliks.com.
              </p>
              <p className="text-muted-foreground mb-4">
                Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on www.rashmimetaliks.com, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
              </p>
              <p className="text-muted-foreground mb-4">
                Note that www.rashmimetaliks.com has no access to or control over these cookies that are used by third-party advertisers.
              </p>
              
              <div className="bg-rashmi-red/5 p-4 rounded-lg border border-rashmi-red/20 mt-2">
                <h4 className="text-foreground font-medium mb-2 flex items-center">
                  <AlertTriangle size={16} className="text-rashmi-red mr-2" /> Important Note
                </h4>
                <p className="text-sm text-muted-foreground">
                  We recommend reviewing the privacy policies of our advertising partners for more details on how they handle your data.
                </p>
              </div>
            </CollapsibleSection>
            
            {/* Third Party Privacy Policies */}
            <CollapsibleSection title="Third Party Privacy Policies" index={4}>
              <p className="text-muted-foreground mb-4">
                www.rashmimetaliks.com's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
              </p>
              <p className="text-muted-foreground mb-4">
                You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-card p-4 rounded-lg border border-border hover:shadow-md transition-shadow duration-300">
                  <h4 className="text-foreground font-medium mb-2">Disable Cookies in Chrome</h4>
                  <p className="text-sm text-muted-foreground">
                    Settings {'>'}  Privacy and Security {'>'}  Cookies and other site data
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border hover:shadow-md transition-shadow duration-300">
                  <h4 className="text-foreground font-medium mb-2">Disable Cookies in Firefox</h4>
                  <p className="text-sm text-muted-foreground">
                    Options {'>'}  Privacy &amp; Security {'>'}  Cookies and Site Data
                  </p>
                </div>
              </div>
            </CollapsibleSection>
            
            {/* Your Privacy Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12 mt-16"
            >
              <h2 className="text-2xl font-display font-bold mb-8 text-center text-foreground">
                Your Privacy Rights
              </h2>
              <RightsGrid />
            </motion.div>
            
            {/* CCPA Privacy Rights */}
            <CollapsibleSection title="CCPA Privacy Rights (Do Not Sell My Personal Information)" index={5}>
              <p className="text-muted-foreground mb-4">
                Under the CCPA, among other rights, California consumers have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
              </ul>
              <p className="text-muted-foreground">
                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
              </p>
            </CollapsibleSection>
            
            {/* GDPR Data Protection Rights */}
            <CollapsibleSection title="GDPR Data Protection Rights" index={6}>
              <p className="text-muted-foreground mb-4">
                We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
                <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
                <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
              </ul>
              <p className="text-muted-foreground">
                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
              </p>
            </CollapsibleSection>
            
            {/* Children's Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-display font-bold mb-4 flex items-center text-foreground">
                <span className="bg-rashmi-red/10 text-rashmi-red rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">3</span> 
                Children's Information
              </h2>
              <p className="text-muted-foreground mb-4">
                Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
              </p>
              <p className="text-muted-foreground mb-4">
                www.rashmimetaliks.com does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
              </p>
              
              <ChildSafety />
            </motion.div>
            
            {/* Contact Us Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mt-16 text-center print:hidden"
            >
              <Link to="/contact-us" className="inline-flex items-center gap-2 bg-rashmi-red text-white px-6 py-3 rounded-md hover:bg-rashmi-red/90 transition-colors">
                <Shield size={20} />
                <span>Contact Our Data Protection Team</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Floating Buttons */}
      <motion.div className="print:hidden">
        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: showBackToTop ? 1 : 0,
            scale: showBackToTop ? 1 : 0.8,
            y: showBackToTop ? 0 : 20
          }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 bg-rashmi-red text-white p-3 rounded-full shadow-lg hover:bg-rashmi-red/90 z-40"
        >
          <ArrowUp size={20} />
        </motion.button>
        
        {/* Print Button */}
        <motion.button
          onClick={printPolicy}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: showBackToTop ? 1 : 0,
            scale: showBackToTop ? 1 : 0.8,
            y: showBackToTop ? 0 : 20
          }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-24 bg-card border border-border text-foreground p-3 rounded-full shadow-lg hover:bg-muted z-40"
        >
          <Printer size={20} />
        </motion.button>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 