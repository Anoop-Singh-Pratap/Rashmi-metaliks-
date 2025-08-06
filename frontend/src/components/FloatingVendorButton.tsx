import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Building, X, Handshake, ArrowRight, Factory, Globe, Award, TrendingUp, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FloatingVendorButtonProps {
  className?: string;
  position?: 'right' | 'left';
  hideOnMobile?: boolean;
}

const FloatingVendorButton: React.FC<FloatingVendorButtonProps> = ({
  className = '',
  position = 'right',
  hideOnMobile = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hide only on vendor registration page
  useEffect(() => {
    const shouldHide = location.pathname.includes('/vendor-registration');
    setIsVisible(!shouldHide);
  }, [location.pathname]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpanded && event.target instanceof Element) {
        const floatingButton = document.querySelector('[data-floating-vendor-button]');
        if (floatingButton && !floatingButton.contains(event.target)) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded]);

  // Auto-collapse after 8 seconds when expanded
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        setIsExpanded(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  const handleVendorRegistration = () => {
    console.log('Navigating to vendor registration...');
    navigate('/vendor-registration');
  };



  if (!isVisible) {
    return null;
  }

  const positionClasses = position === 'right'
    ? 'right-2'
    : 'left-2';

  const mobileClasses = isMobile
    ? 'bottom-20 top-auto translate-y-0'
    : 'top-1/2 -translate-y-1/2';

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div
        data-floating-vendor-button
        className={`fixed ${positionClasses} ${mobileClasses} ${className}`}
        style={{
          zIndex: 10001,
          fontFamily: 'Poppins, Inter, system-ui, sans-serif'
        }}
      >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          // Collapsed rectangular vertical button
          <motion.div
            key="collapsed"
            initial={{ x: position === 'right' ? 80 : -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: position === 'right' ? 80 : -80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative"
          >
            {/* Background overlay for visibility */}
            <div
              className={`absolute -inset-2 bg-black/10 backdrop-blur-sm ${
                position === 'right'
                  ? 'rounded-l-3xl'
                  : 'rounded-r-3xl'
              }`}
              style={{ zIndex: -1 }}
            />
            {/* Subtle floating animation */}
            <motion.div
              animate={{
                y: [-2, 2, -2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              {/* Compact Premium Button */}
              <motion.button
                onClick={() => setIsExpanded(true)}
                className={`group relative bg-gradient-to-b from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 backdrop-blur-sm cursor-pointer overflow-hidden ${
                  position === 'right'
                    ? 'rounded-l-2xl rounded-r-none'
                    : 'rounded-r-2xl rounded-l-none'
                }`}
                style={{
                  height: '180px',
                  width: '60px',
                  boxShadow: '0 15px 30px rgba(239, 68, 68, 0.4), 0 5px 15px rgba(0, 0, 0, 0.2)',
                  zIndex: 10000,
                  filter: 'drop-shadow(0 0 12px rgba(239, 68, 68, 0.4))',
                  position: 'relative',
                }}
                whileHover={{
                  scale: 1.02,
                  x: position === 'right' ? -8 : 8,
                  filter: 'drop-shadow(0 0 18px rgba(239, 68, 68, 0.6))',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Pulse animation background */}
                <motion.div
                  className={`absolute inset-0 bg-red-500/40 ${
                    position === 'right'
                      ? 'rounded-l-2xl'
                      : 'rounded-r-2xl'
                  }`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />

                {/* Outer glow effect */}
                <motion.div
                  className={`absolute -inset-1 bg-red-500/20 blur-sm ${
                    position === 'right'
                      ? 'rounded-l-2xl'
                      : 'rounded-r-2xl'
                  }`}
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"
                  animate={{
                    y: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />

                {/* Compact Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center gap-2 px-2 py-4">
                  {/* Compact Icon */}
                  <motion.div
                    className="text-white drop-shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Handshake className="h-6 w-6" />
                  </motion.div>

                  {/* Compact Vertical Text */}
                  <div className="flex flex-col items-center gap-0.5">
                    {['V', 'E', 'N', 'D', 'O', 'R'].map((letter, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="text-white font-bold text-sm leading-none"
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                          fontSize: '12px',
                          fontWeight: '700',
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>

                  {/* Active indicator dot */}
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full shadow-lg mt-1"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                </div>

                {/* Hover arrow indicator */}
                <motion.div
                  className={`absolute ${position === 'right' ? 'left-1' : 'right-1'} top-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  animate={{
                    x: position === 'right' ? [-2, 2, -2] : [2, -2, 2],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  <ChevronLeft className={`h-4 w-4 ${position === 'right' ? '' : 'rotate-180'}`} />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          // Expanded slide-out panel
          <motion.div
            key="expanded"
            initial={{
              x: position === 'right' ? 400 : -400,
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              x: position === 'right' ? -20 : 20,
              opacity: 1,
              scale: 1
            }}
            exit={{
              x: position === 'right' ? 400 : -400,
              opacity: 0,
              scale: 0.95
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.6
            }}
            className="relative"
          >
            <Card className={`${isMobile ? 'w-72' : 'w-80'} shadow-xl border border-white/10 bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg ${
              position === 'right'
                ? 'rounded-l-2xl rounded-r-none'
                : 'rounded-r-2xl rounded-l-none'
            }`}
            style={{
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12), 0 8px 20px rgba(0, 0, 0, 0.08)',
            }}>
              <CardContent className="p-6" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
                {/* Compact Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                      <Handshake className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Become Our Vendor
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                        Join Rashmi Metaliks network
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(false)}
                    className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>

                {/* Compact Content */}
                <div className="space-y-4">
                  <div className="text-gray-700 dark:text-gray-300">
                    <p className="mb-4 leading-relaxed font-medium text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Partner with <strong className="text-red-600 dark:text-red-400 font-bold">Rashmi Metaliks</strong> - world's 2nd largest ductile iron pipe manufacturer. Join our trusted supplier network.
                    </p>

                    <div className="space-y-2.5">
                      <motion.div
                        className="flex items-center gap-3 text-xs font-medium text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span><strong className="font-semibold text-gray-900 dark:text-white">Free Registration</strong></span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-3 text-xs font-medium text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span><strong className="font-semibold text-gray-900 dark:text-white">Global Reach</strong> - 40+ countries</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-3 text-xs font-medium text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                        <span><strong className="font-semibold text-gray-900 dark:text-white">ISO Certified</strong> - Quality assured</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Compact CTA Button */}
                  <div className="pt-3">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button
                        onClick={handleVendorRegistration}
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold group shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-3 text-sm"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <Building className="h-4 w-4 mr-2" />
                        Register as Vendor
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </motion.div>

                  </div>

                  {/* Additional Info */}
                  <motion.div
                    className="pt-3 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="text-xs text-muted-foreground font-medium">
                      <span className="inline-flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <strong className="font-semibold">62% CAGR</strong> - Join our growth journey
                      </span>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default FloatingVendorButton;
