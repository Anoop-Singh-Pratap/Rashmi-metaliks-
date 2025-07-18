import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from './components/ui/toaster';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Index from './pages/Index';
import AboutRashmi from './pages/AboutRashmi';
import DiPipes from './pages/DiPipes';
import DiFittings from './pages/DiFittings';
import TmtBar from './pages/TmtBar';
import PigIron from './pages/PigIron';
import SpongeIron from './pages/SpongeIron';
import IronOrePellet from './pages/IronOrePellet';
import Sinter from './pages/Sinter';
import Media from './pages/Media';
import Careers from './pages/Careers';
import Apply from './pages/Apply';
import ApplyJob from './pages/ApplyJob';
import ContactUs from './pages/ContactUs';
import QualityAssurance from './pages/QualityAssurance';
import WhyRashmiDiPipes from './pages/WhyRashmiDiPipes';
import Certifications from './pages/Certifications';
import NotFound from './pages/NotFound';
import CSR from './pages/CSR';
import Brochures from './pages/Brochures';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NewsAdmin from './pages/NewsAdmin';
import ApiDebugger from './pages/ApiDebugger';
import RashmiLock from './pages/RashmiLock';
import VendorRegistration from './pages/VendorRegistration';
import RashmiLockRedesigned from './pages/RashmiLockRedesigned';
import SustainabilityPage from './pages/SustainabilityPage';

function App() {
  // Add useEffect to set the viewport meta tag for better mobile handling
  useEffect(() => {
    // iOS touch fix
    const isIOS = /iP(hone|ad)/.test(navigator.userAgent);
    if (isIOS) {
      document.body.addEventListener('touchstart', () => {}, { passive: true });
    }

    // CRITICAL FIX FOR MOBILE FREEZING
    // Sometimes animations or event handling can freeze the page
    // This ensures the page remains interactive
    let animationId: number | null = null;
    let lastTime = 0;
    
    const checkPageResponse = (timestamp: number) => {
      // If more than 3000ms have passed without a frame, something is blocking the main thread
      // Increased threshold to reduce false positives during form submissions
      if (lastTime && timestamp - lastTime > 3000) {
        console.log('Detected page freeze, attempting recovery...');
        
        // Force touch events to work
        document.documentElement.style.touchAction = 'auto';
        document.body.style.touchAction = 'auto';
        
        // Force-enable scrolling
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
        
        // Reset any mobile menu that might be stuck
        document.documentElement.classList.remove('mobile-menu-open');
        document.body.classList.remove('mobile-menu-open');
      }
      
      lastTime = timestamp;
      animationId = requestAnimationFrame(checkPageResponse);
    };
    
    // Start monitoring frame rate
    animationId = requestAnimationFrame(checkPageResponse);
    
    // Ensure viewport meta tag is set correctly for mobile
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=yes'
      );
    } else {
      // Create it if it doesn't exist
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=yes';
      document.head.appendChild(meta);
    }
    
    // Add diagnostics for touch events
    const diagnoseTouch = () => {
      // Fix any navigation issues
      document.querySelectorAll('a[href]').forEach(link => {
        if (!link.getAttribute('data-touch-fixed')) {
          link.setAttribute('data-touch-fixed', 'true');
          
          // Add touchstart handler
          link.addEventListener('touchstart', (e) => {
            e.stopPropagation();
          }, { passive: true });
          
          // Remove the aggressive navigation override that breaks React Router
          // Let React Router handle navigation naturally
        }
      });
      
      // Fix any button issues
      document.querySelectorAll('button, [role="button"]').forEach(button => {
        if (!button.getAttribute('data-touch-fixed')) {
          button.setAttribute('data-touch-fixed', 'true');
          button.addEventListener('touchstart', (e) => {
            e.stopPropagation();
          }, { passive: true });
        }
      });
    };
    
    // Run diagnostics immediately
    diagnoseTouch();

    return () => {
      animationId && cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <AnimatedRoutes />
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about-rashmi" element={<PageTransition><AboutRashmi /></PageTransition>} />
        <Route path="/di-pipes" element={<PageTransition><DiPipes /></PageTransition>} />
        <Route path="/di-fittings" element={<PageTransition><DiFittings /></PageTransition>} />
        <Route path="/tmt-bar" element={<PageTransition><TmtBar /></PageTransition>} />
        <Route path="/pig-iron" element={<PageTransition><PigIron /></PageTransition>} />
        <Route path="/sponge-iron" element={<PageTransition><SpongeIron /></PageTransition>} />
        <Route path="/iron-ore-pellet" element={<PageTransition><IronOrePellet /></PageTransition>} />
        <Route path="/sinter" element={<PageTransition><Sinter /></PageTransition>} />
        <Route path="/rashmi-lock" element={<PageTransition><RashmiLockRedesigned /></PageTransition>} />
        <Route path="/media" element={<PageTransition><Media /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="/careers/apply" element={<PageTransition><Apply /></PageTransition>} />
        <Route path="/careers/job/:id" element={<PageTransition><ApplyJob /></PageTransition>} />
        <Route path="/contact-us" element={<PageTransition><ContactUs /></PageTransition>} />
        <Route path="/vendor-registration" element={<PageTransition><VendorRegistration /></PageTransition>} />
        <Route path="/quality-assurance" element={<PageTransition><QualityAssurance /></PageTransition>} />
        <Route path="/why-rashmi-di-pipes" element={<PageTransition><WhyRashmiDiPipes /></PageTransition>} />
        <Route path="/certifications" element={<PageTransition><Certifications /></PageTransition>} />
        <Route path="/csr" element={<PageTransition><CSR /></PageTransition>} />
        <Route path="/brochures" element={<PageTransition><Brochures /></PageTransition>} />
        <Route path="/terms-and-conditions" element={<PageTransition><TermsAndConditions /></PageTransition>} />
        <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/admin/news" element={<PageTransition><NewsAdmin /></PageTransition>} />
        <Route path="/admin/api-debug" element={<PageTransition><ApiDebugger /></PageTransition>} />
        <Route path="/emissions-demo" element={<Navigate to="/sustainability" replace />} />
        <Route path="/sustainability" element={<PageTransition><SustainabilityPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  // Check if running on mobile
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
  
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // If on mobile, don't animate to prevent potential freezes
  if (isMobile) {
    return <>{children}</>;
  }
  
  // Only use animations on desktop
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ touchAction: 'auto' }}
    >
      {children}
    </motion.div>
  );
}

export default App;
