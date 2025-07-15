import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowUp } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Sustainability from '@/components/Sustainability';
import Footer from '@/components/Footer';
import SEO from '../components/SEO';
import { organizationSchema } from '../lib/schema';

const Index = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Preload images for smoother experience
  useEffect(() => {
    const preloadImages = [
      'https://images.unsplash.com/photo-1618761299062-ba2dbbcebd92?ixlib=rb-4.0.3&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495170420372-1063986a9a8a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80'
    ];
    
    preloadImages.forEach(image => {
      const img = new Image();
      img.src = image;
    });

    // --- TEMPORARILY COMMENTED OUT CONFLICTING LISTENER --- // -- RESTORED
    // /*
    // Show back to top button when user scrolls down
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // */
    // --- END OF COMMENTED OUT SECTION --- // -- RESTORED

  }, []);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <SEO 
        title="Rashmi Metaliks | Leading Steel Manufacturer in India"
        description="Rashmi Metaliks is a premier steel manufacturing company producing high-quality ductile iron pipes, TMT bars, and other steel products with a focus on sustainability and innovation."
        keywords="steel manufacturer, ductile iron pipes, TMT bars, pig iron, sponge iron, steel production, Rashmi Metaliks, India steel company"
        canonicalUrl="/"
        ogType="website"
        ogImage="/lovable-uploads/About-Rashmi.jpg"
        schema={organizationSchema}
      />
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <About />
          <Products />
          <Sustainability />
        </main>
        <Footer />
        
        {/* Back to Top Button with proper accessibility */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed z-50 bottom-8 right-8 size-10 flex items-center justify-center p-0 bg-rashmi-red text-white rounded-full shadow-lg hover:bg-rashmi-red/90 transition-colors"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </div>
    </>
  );
};

export default Index;
