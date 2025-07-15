import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';
import { useScrollTrigger } from '@/hooks/useScrollPosition';

// All icon imports removed for simplicity
import { Download, FileText, Building, Factory, Leaf, FileCheck, Award, Phone, Briefcase } from 'lucide-react';
import MobileMenu from './MobileMenu'; // Add import for MobileMenu

// Hook to detect clicks outside
const useClickOutside = (ref: React.RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  const triggerRef = useRef<HTMLDivElement>(null);
  const isScrolledPastTrigger = useScrollTrigger(triggerRef);

  // Determine if header should be visible (visible only when near top or mobile menu open)
  const isHeaderVisible = !isScrolledPastTrigger || mobileMenuOpen;
  
  // Determine if header should be blurred (blurred when past trigger)
  const shouldBeBlurred = isScrolledPastTrigger;

  // NEW: Determine if header content should be forced white for contrast on hero
  const forceWhiteText = !isScrolledPastTrigger && theme === 'light' && (location.pathname === '/' || location.pathname === '/about-rashmi');

  // Refs for click outside detection
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  // Navigation links - unchanged
  const navLinks = [
    { 
      label: 'Our Company', 
      dropdown: true,
      items: [
        { label: 'About Rashmi', href: '/about-rashmi', icon: <Building size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Media & News', href: '/media', icon: <FileText size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Contact Us', href: '/contact-us', icon: <Phone size={16} className="mr-2 text-rashmi-red/80" /> },
      ]
    },
    { 
      label: 'Products', 
      dropdown: true,
      items: [
        { label: 'DI Pipes', href: '/di-pipes', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'DI Fittings', href: '/di-fittings', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Rashmi-Lock Joint System', href: '/rashmi-lock', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'TMT Bar', href: '/tmt-bar', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Pig Iron', href: '/pig-iron', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Iron Ore Pellet', href: '/iron-ore-pellet', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Sinter', href: '/sinter', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Sponge Iron', href: '/sponge-iron', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
      ]
    },
    { 
      label: 'Sustainability', 
      dropdown: true,
      items: [
        { label: 'Sustainability Overview', href: '/sustainability', icon: <Leaf size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'CSR Initiatives', href: '/csr', icon: <Leaf size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Quality Assurance', href: '/quality-assurance', icon: <FileCheck size={16} className="mr-2 text-rashmi-red/80" /> },
      ]
    },
    { 
      label: 'Careers & Contact', 
      dropdown: true,
      items: [
        { label: 'Careers', href: '/careers', icon: <Briefcase size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Contact Us', href: '/contact-us', icon: <Phone size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Vendor Registration', href: '/vendor-registration', icon: <Building size={16} className="mr-2 text-rashmi-red/80" /> },
      ]
    },
    { 
      label: 'Downloads', 
      dropdown: true,
      items: [
        { label: 'Brochures', href: '/brochures', icon: <Download size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Certifications', href: '/certifications', icon: <Award size={16} className="mr-2 text-rashmi-red/80" /> },
      ]
    },
  ];

  // Close menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Body scroll lock
  useEffect(() => {
    if (mobileMenuOpen) {
      // Add classes to both HTML and body for better mobile handling
      document.documentElement.classList.add('mobile-menu-open');
      document.body.classList.add('mobile-menu-open');
      
      // Critical: ensure touch events still work with menu open
      const mobileMenu = document.querySelector('[data-mobile="true"]');
      if (mobileMenu) {
        mobileMenu.addEventListener('touchmove', (e) => {
          // Allow scrolling within the menu
          e.stopPropagation();
        }, { passive: true });
      }
    } else {
      // Remove classes from both HTML and body
      document.documentElement.classList.remove('mobile-menu-open');
      document.body.classList.remove('mobile-menu-open');
      
      // Ensure body can scroll again
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    
    return () => {
      // Clean up on unmount
      document.documentElement.classList.remove('mobile-menu-open');
      document.body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);

  // Handle clicks outside dropdown
  useClickOutside(dropdownRef, () => {
    if (activeDropdown) {
      setActiveDropdown(null);
    }
  });

  // Toggle dropdowns
  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  // Check active links
  const isLinkActive = (href: string) => {
    return location.pathname === href;
  };

  // Check if a parent link should be highlighted (any child is active)
  const isParentActive = (items: {href: string}[]) => {
    return items.some(item => location.pathname === item.href);
  };

  // Handle mobile navigation safely
  const handleMobileNavigation = (e: React.MouseEvent | React.TouchEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // First close the menu
    setMobileMenuOpen(false);
    
    // Use direct navigation for mobile to avoid any React Router issues
    // This ensures navigation works even if React Router has issues
    setTimeout(() => {
      window.location.href = href;
    }, 50);
  };

  return (
    <>
      {/* Invisible trigger element - improved size and positioning for better detection */}
      <div 
        ref={triggerRef} 
        style={{ 
          position: 'absolute', 
          top: '10px',  // Increased from 1px to 10px for better detection
          left: 0,
          height: '5px', // Increased from 1px to 5px for better detection
          width: '100%', // Full width for better detection 
          zIndex: -1,
          pointerEvents: 'none' // Ensure it doesn't interfere with clicks
        }} 
        aria-hidden="true"
      ></div>

      <header 
        className={`fixed w-full z-[1000] transition-transform duration-300 ease-in-out ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ touchAction: 'manipulation' }}
      >
        {/* Main Header background/blur container */}
        <div 
          className={`w-full ${shouldBeBlurred ? 'shadow-md' : ''}`} 
          style={{
            backgroundColor: shouldBeBlurred ? 'hsl(var(--background) / 0.5)' : 'transparent',
            backdropFilter: shouldBeBlurred ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: shouldBeBlurred ? 'blur(16px)' : 'none',
            transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease'
          }}
        >
          <div className="container mx-auto px-4">
            {/* Header Content: Logo, Nav, etc. */}
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img 
                  src={ (theme === 'dark' || forceWhiteText) ? '/lovable-uploads/Rashmi-logo-dark.png' : '/lovable-uploads/Rashmi-logo-light.png' } 
                  alt="Rashmi Metaliks"
                  className="h-10 md:h-12"
                />
              </Link>

              {/* Desktop Navigation */}
              <div ref={dropdownRef} className="hidden md:flex items-center space-x-3">
                {navLinks.map((link) => (
                  <div key={link.label} className="relative">
                    {link.dropdown ? (
                      <div className="relative">
                        <button 
                          className={`px-3 py-2 rounded-md font-medium flex items-center hover:bg-muted/70
                            ${forceWhiteText ? 'text-white hover:text-white/90' : 'text-foreground hover:text-rashmi-red'}
                            ${activeDropdown === link.label ? (forceWhiteText ? 'text-white bg-white/10' : 'text-rashmi-red bg-muted/50') : ''}
                            ${isParentActive(link.items) ? (forceWhiteText ? 'text-white' : 'text-rashmi-red') : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(link.label);
                          }}
                          onMouseEnter={() => setActiveDropdown(link.label)}
                        >
                          {link.label}
                          <ChevronDown size={16} className={`ml-1 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {activeDropdown === link.label && (
                          <div 
                            className="absolute left-0 mt-1 w-64 rounded-lg shadow-lg bg-background border border-border overflow-hidden z-20"
                            onMouseLeave={() => setActiveDropdown(null)}
                          >
                            <div className="py-2">
                              {link.items?.map((item) => (
                                <Link
                                  key={item.label}
                                  to={item.href}
                                  className={`flex items-center px-5 py-3 hover:bg-muted hover:text-rashmi-red
                                    ${isLinkActive(item.href) ? 'bg-muted/30 text-rashmi-red font-medium' : ''}`}
                                >
                                  {item.icon}
                                  <span>{item.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link 
                        to={link.dropdown ? '#' : link.items[0].href}
                        className={`px-3 py-2 rounded-md text-foreground font-medium hover:bg-muted/70 hover:text-rashmi-red
                          ${forceWhiteText ? 'text-white hover:text-white/90' : 'text-foreground hover:text-rashmi-red'}
                          ${isLinkActive(link.items[0].href) ? (forceWhiteText ? 'text-white' : 'text-rashmi-red') : ''}`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center md:hidden space-x-2">
                <ThemeToggle />
                <button 
                  className={`p-3 rounded-md hover:bg-muted/60
                    ${forceWhiteText ? 'text-white hover:text-white/90' : 'text-foreground hover:text-rashmi-red'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMobileMenuOpen(!mobileMenuOpen);
                  }}
                  aria-label="Toggle Menu"
                  style={{ touchAction: 'manipulation' }}
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />} 
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu - using portal component */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navLinks={navLinks}
          theme={theme}
        />
      </header>
    </>
  );
};

export default Header;
