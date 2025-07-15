import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sustainability from '../components/Sustainability';
import SEO from '../components/SEO';

const SustainabilityPage = () => {
  return (
    <>
      <SEO
        title="Sustainability - Rashmi Metaliks"
        description="Discover Rashmi Metaliks' commitment to sustainability through eco-friendly manufacturing, emissions reduction, and environmental stewardship."
        keywords="sustainability, emissions reduction, eco-friendly manufacturing, environmental stewardship, carbon footprint, green steel"
        canonicalUrl="/sustainability"
      />
      
      <Header />
      
      <main>
        <Sustainability />
      </main>
      
      <Footer />
    </>
  );
};

export default SustainabilityPage; 