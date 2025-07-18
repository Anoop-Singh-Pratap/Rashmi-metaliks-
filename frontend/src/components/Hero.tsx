import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import RevealText from './ui/RevealText';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  // Parallel video playback when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch(e => console.error("Video play error:", e));
          } else if (videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  // Smooth scroll to About section
  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full h-screen">
    <section className="hero-section relative w-full h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full bg-overlay video-background overflow-hidden">
        {/* Subtle gradient for text readability without darkening the video too much */}
        <div className="absolute inset-0 bg-gradient-to-b from-rashmi-dark/30 to-transparent z-10 gradient-overlay"></div>
        
        {/* Video element with updated source and styling */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover scale-105 transform-gpu video-background" // Scale slightly to avoid white edges during animation
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1618761299062-ba2dbbcebd92?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
          onLoadedData={() => {
            console.log('🔍 HERO VIDEO: Video loaded');
            setVideoLoaded(true);
          }}
          onError={() => {
            console.log('🔍 HERO VIDEO: Video error');
            setVideoError(true);
          }}
          style={{
            filter: "brightness(1.1) contrast(1.05)",
            transition: "transform 15s ease-in-out",
            animationName: "slowZoom",
            animationDuration: "15s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDirection: "alternate"
          }}
        >
          <source 
            src="https://res.cloudinary.com/dada5hjp3/video/upload/f_auto:video,q_auto/video-hero_d0kgi3" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-3xl animate-fade-in p-6 rounded-lg">
          <RevealText
            text="Excellence in "
            as="h1"
            className="text-4xl md:text-6xl font-display font-bold text-white mb-4"
            staggerDelay={0.08}
          />
          <RevealText
            text="Iron & Steel"
            as="h2"
            className="text-2xl md:text-4xl font-display text-white/90 mb-6"
            staggerDelay={0.05}
            initialDelay={0.5}
          />
          <p className="text-white/80 text-lg max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
            Rashmi Metaliks is a premier steel manufacturing company in India, 
            specializing in high-quality integrated Iron & Steel Products with a focus on innovation and technology.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <Link 
              to="/products"
              className="bg-rashmi-red hover:bg-rashmi-red/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-block text-center"
              onClick={() => {
                console.log('🔍 HERO BUTTON: Explore Products clicked');
              }}
            >
              Explore Products
            </Link>
            <Link 
              to="/about-rashmi"
              className="border-2 border-white text-white hover:bg-white hover:text-rashmi-dark px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-block text-center"
              onClick={() => {
                console.log('🔍 HERO BUTTON: Learn More clicked');
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white flex flex-col items-center 
                 cursor-pointer animate-float"
      >
        <span className="text-sm mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white rounded-full mt-2 animate-float"></div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Hero;
