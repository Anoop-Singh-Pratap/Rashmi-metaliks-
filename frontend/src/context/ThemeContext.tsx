import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Global styles for theme optimization
const GlobalStyles = () => (
  <style>
    {`
      /* Global optimization styles */
      .theme-changing * {
        transition: none !important;
      }
      
      /* Fast transitions only for background colors */
      .theme-changing body,
      .theme-changing section,
      .theme-changing div:not(.geometric-pattern, .bg-grid-pattern) {
        transition: background-color 100ms linear !important;
      }
      
      /* Better performance for tables during theme changes */
      table, th, td, tr {
        transition: none !important;
      }
      
      /* Text that should never transition */
      h1, h2, h3, h4, h5, h6, .text-white, .text-rashmi-red {
        transition: none !important;
      }
    `}
  </style>
);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('rashmi-theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Add optimization class before theme change to disable most transitions
    if (isTransitioning) {
      root.classList.add('theme-changing');
    }
    
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('rashmi-theme', theme);
    
    // Remove optimization class after a short delay to re-enable transitions
    if (isTransitioning) {
      const timer = setTimeout(() => {
        root.classList.remove('theme-changing');
        setIsTransitioning(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [theme, isTransitioning]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setIsTransitioning(true);
      setTheme(newTheme);
    },
    toggleTheme,
  };

  return (
    <>
      <GlobalStyles />
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};
