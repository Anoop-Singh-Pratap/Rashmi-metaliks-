import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowUp, 
  ChevronDown, 
  ExternalLink, 
  Shield, 
  AlertTriangle, 
  FileText,
  Printer,
  Check
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Collapsible section component
const CollapsibleSection = ({ title, children, index = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border border-border rounded-lg overflow-hidden mb-4 shadow-sm"
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

// Table of Contents Item with animated indicator
const TOCItem = ({ id, label, activeSection }) => {
  const isActive = activeSection === id;
  
  return (
    <motion.a
      href={`#${id}`}
      className={`block py-2 pl-3 border-l-2 transition-all ${
        isActive 
          ? 'border-rashmi-red text-rashmi-red font-medium' 
          : 'border-transparent text-muted-foreground hover:border-rashmi-red/50 hover:text-rashmi-red/90'
      }`}
      whileHover={{ x: 4 }}
    >
      <div className="flex items-center">
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mr-2"
          >
            <Check size={14} className="text-rashmi-red" />
          </motion.div>
        )}
        {label}
      </div>
    </motion.a>
  );
};

// Key Point Card component
const KeyPointCard = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.4 }}
    className="bg-card border border-border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-all duration-300"
  >
    <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
    {children}
  </motion.div>
);

const TermsAndConditions = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('welcome');
  
  // Track scroll progress for the progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1) * 100;
      setScrollProgress(progress);
      
      setShowBackToTop(window.scrollY > 300);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;
        
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          setActiveSection(section.getAttribute('id') || '');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const printTerms = () => {
    window.print();
  };

  // Sections for the table of contents
  const sections = [
    { id: 'welcome', label: 'Welcome' },
    { id: 'cookies', label: 'Cookies' },
    { id: 'license', label: 'License' },
    { id: 'comments', label: 'Comments' },
    { id: 'hyperlinking', label: 'Hyperlinking' },
    { id: 'iframes', label: 'iFrames' },
    { id: 'content-liability', label: 'Content Liability' },
    { id: 'privacy', label: 'Your Privacy' },
    { id: 'rights', label: 'Reservation of Rights' },
    { id: 'removal', label: 'Removal of Links' },
    { id: 'disclaimer', label: 'Disclaimer' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms and Conditions | Rashmi Metaliks</title>
        <meta name="description" content="Terms and conditions for the use of Rashmi Metaliks Ltd.'s website." />
        <link rel="canonical" href="https://www.rashmi.com/terms-and-conditions" />
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
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-fixed bg-center bg-cover opacity-5"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-center text-foreground">
              Terms & <span className="text-rashmi-red">Conditions</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8 text-center">
              These terms and conditions outline the rules and regulations for the use of Rashmi Metaliks Ltd.'s Website.
            </p>
            
            <div className="flex justify-center space-x-6 print:hidden">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={printTerms}
                className="flex items-center gap-2 text-sm bg-muted px-4 py-2 rounded-md hover:bg-muted/80 transition-colors"
              >
                <Printer size={16} />
                <span>Print Terms</span>
              </motion.button>
              
              <motion.a
                href="mailto:legal@rashmimetaliks.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-2 text-sm bg-rashmi-red text-white px-4 py-2 rounded-md hover:bg-rashmi-red/90 transition-colors"
              >
                <Shield size={16} />
                <span>Contact Legal Team</span>
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
      <section className="py-16 print:py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            {/* Table of Contents - Sticky on desktop */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-64 lg:flex-shrink-0 print:hidden"
            >
              <div className="lg:sticky lg:top-28">
                <h2 className="text-xl font-bold mb-4 flex items-center text-foreground">
                  <FileText size={20} className="mr-2 text-rashmi-red" />
                  Contents
                </h2>
                <div className="space-y-1">
                  {sections.map((section, index) => (
                    <TOCItem 
                      key={section.id} 
                      id={section.id} 
                      label={section.label} 
                      activeSection={activeSection}
                    />
                  ))}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-8 p-4 bg-rashmi-red/10 rounded-lg border border-rashmi-red/30"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="text-rashmi-red mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      This document contains important information about your rights and obligations as a user of this website.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Main Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <section id="welcome" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-display font-bold mb-4 flex items-center text-foreground">
                    <span className="bg-rashmi-red/10 text-rashmi-red rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">1</span> 
                    Welcome
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    These terms and conditions outline the rules and regulations for the use of Rashmi Metaliks Ltd.'s Website, located at www.rashmimetaliks.com.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    By accessing this website we assume you accept these terms and conditions. Do not continue to use Rashmi Metaliks if you do not agree to take all of the terms and conditions stated on this page.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of India. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
                  </p>
                </section>
                
                <section id="cookies" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-display font-bold mb-4 flex items-center text-foreground">
                    <span className="bg-rashmi-red/10 text-rashmi-red rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">2</span> 
                    Cookies
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We employ the use of cookies. By accessing Rashmi Metaliks, you agreed to use cookies in agreement with the Rashmi Metaliks Ltd.'s Privacy Policy.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
                  </p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-center my-6"
                  >
                    <Link to="/privacy-policy" className="flex items-center gap-2 text-rashmi-red hover:underline">
                      Read our complete Privacy Policy <ExternalLink size={16} />
                    </Link>
                  </motion.div>
                </section>
                
                <section id="license" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-display font-bold mb-4 flex items-center text-foreground">
                    <span className="bg-rashmi-red/10 text-rashmi-red rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">3</span> 
                    License
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Unless otherwise stated, Rashmi Metaliks Ltd. and/or its licensors own the intellectual property rights for all material on Rashmi Metaliks. All intellectual property rights are reserved. You may access this from Rashmi Metaliks for your own personal use subjected to restrictions set in these terms and conditions.
                  </p>
                  
                  <div className="bg-card border border-border rounded-lg p-6 my-6">
                    <h3 className="text-lg font-medium mb-4">You must not:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Republish material from Rashmi Metaliks",
                        "Sell, rent or sub-license material from Rashmi Metaliks",
                        "Reproduce, duplicate or copy material from Rashmi Metaliks",
                        "Redistribute content from Rashmi Metaliks"
                      ].map((restriction, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <span className="bg-rashmi-red/10 text-rashmi-red rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">✕</span>
                          {restriction}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the Terms And Conditions Generator.
                  </p>
                </section>
                
                <section id="comments" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-display font-bold mb-4 flex items-center text-foreground">
                    <span className="bg-rashmi-red/10 text-rashmi-red rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">4</span> 
                    Comments
                  </h2>
                  
                  <CollapsibleSection title="User Comments and Content Policy" index={0}>
                    <p className="text-muted-foreground mb-4">
                      Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Rashmi Metaliks Ltd. does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Rashmi Metaliks Ltd.,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Rashmi Metaliks Ltd. shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Rashmi Metaliks Ltd. reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
                    </p>
                  </CollapsibleSection>
                  
                  <CollapsibleSection title="User Warranties and Representations" index={1}>
                    <p className="text-muted-foreground mb-4">
                      You warrant and represent that:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-2">
                      <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                      <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                      <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                      <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                    </ul>
                    <p className="text-muted-foreground">
                      You hereby grant Rashmi Metaliks Ltd. a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
                    </p>
                  </CollapsibleSection>
                </section>
                
                <section id="hyperlinking" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-display font-bold mb-4 flex items-center text-foreground">
                    <span className="bg-rashmi-red/10 text-rashmi-red rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">5</span> 
                    Hyperlinking to our Content
                  </h2>
                  
                  <CollapsibleSection title="Organizations That May Link to Our Website" index={0}>
                    <p className="text-muted-foreground mb-4">
                      The following organizations may link to our Website without prior written approval:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-2">
                      <li>Government agencies;</li>
                      <li>Search engines;</li>
                      <li>News organizations;</li>
                      <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                      <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
                    </ul>
                    <p className="text-muted-foreground mb-4">
                      These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.
                    </p>
                  </CollapsibleSection>
                  
                  <CollapsibleSection title="Other Link Request Considerations" index={1}>
                    <p className="text-muted-foreground mb-4">
                      We may consider and approve other link requests from the following types of organizations:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-2">
                      <li>commonly-known consumer and/or business information sources;</li>
                      <li>dot.com community sites;</li>
                      <li>associations or other groups representing charities;</li>
                      <li>online directory distributors;</li>
                      <li>internet portals;</li>
                      <li>accounting, law and consulting firms; and</li>
                      <li>educational institutions and trade associations.</li>
                    </ul>
                    <p className="text-muted-foreground mb-4">
                      We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Rashmi Metaliks Ltd.; and (d) the link is in the context of general resource information.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.
                    </p>
                  </CollapsibleSection>
                  
                  <CollapsibleSection title="Link Request Process" index={2}>
                    <p className="text-muted-foreground mb-4">
                      If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Rashmi Metaliks Ltd.. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
                    </p>
                  </CollapsibleSection>
                  
                  <CollapsibleSection title="Approved Hyperlinking Methods" index={3}>
                    <p className="text-muted-foreground mb-4">
                      Approved organizations may hyperlink to our Website as follows:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-2">
                      <li>By use of our corporate name; or</li>
                      <li>By use of the uniform resource locator being linked to; or</li>
                      <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site.</li>
                    </ul>
                    <p className="text-muted-foreground">
                      No use of Rashmi Metaliks Ltd.'s logo or other artwork will be allowed for linking absent a trademark license agreement.
                    </p>
                  </CollapsibleSection>
                </section>
                
                <section id="iframes" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-display font-bold mb-4 flex items-center text-foreground">
                    <span className="bg-rashmi-red/10 text-rashmi-red rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">6</span> 
                    iFrames
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
                  </p>
                </section>
                
                <section id="content-liability" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-display font-bold mb-4 flex items-center text-foreground">
                    <span className="bg-rashmi-red/10 text-rashmi-red rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">7</span> 
                    Content Liability
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
                  </p>
                </section>
                
                <section id="privacy" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-display font-bold mb-4 flex items-center text-foreground">
                    <span className="bg-rashmi-red/10 text-rashmi-red rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">8</span> 
                    Your Privacy
                  </h2>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-card border border-border rounded-lg p-6 flex flex-col items-center"
                  >
                    <Shield size={32} className="text-rashmi-red mb-4" />
                    <p className="text-center text-muted-foreground mb-4">
                      Your privacy is important to us. Please read our detailed privacy policy to understand how we collect, use, and protect your information.
                    </p>
                    <Link to="/privacy-policy" className="text-rashmi-red hover:underline flex items-center gap-1">
                      Read Privacy Policy <ExternalLink size={14} />
                    </Link>
                  </motion.div>
                </section>
                
                <section id="rights" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-display font-bold mb-4 flex items-center text-foreground">
                    <span className="bg-rashmi-red/10 text-rashmi-red rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">9</span> 
                    Reservation of Rights
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
                  </p>
                </section>
                
                <section id="removal" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-display font-bold mb-4 flex items-center text-foreground">
                    <span className="bg-rashmi-red/10 text-rashmi-red rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">10</span> 
                    Removal of links from our website
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
                  </p>
                </section>
                
                <section id="disclaimer" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-display font-bold mb-4 flex items-center text-foreground">
                    <span className="bg-rashmi-red/10 text-rashmi-red rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">11</span> 
                    Disclaimer
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                    <li>limit or exclude our or your liability for death or personal injury;</li>
                    <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                    <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                    <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">
                    The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
                  </p>
                  <p className="text-muted-foreground">
                    As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
                  </p>
                </section>
                
                {/* Contact Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="mt-16 bg-card border border-border rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h2 className="text-xl font-display font-bold mb-4 text-foreground">Have Questions About Our Terms?</h2>
                  <p className="text-muted-foreground mb-6">
                    If you have any questions or concerns about our Terms and Conditions, please don't hesitate to contact us.
                  </p>
                  <Link to="/contact-us" className="inline-flex items-center gap-2 bg-rashmi-red text-white px-6 py-3 rounded-md hover:bg-rashmi-red/90 transition-colors hover:scale-105 transform duration-200 dark:text-white">
                    Contact Us
                  </Link>
                </motion.div>
              </div>
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
          onClick={printTerms}
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

export default TermsAndConditions; 