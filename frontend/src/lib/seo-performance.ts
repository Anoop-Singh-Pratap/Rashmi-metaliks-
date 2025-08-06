// SEO Performance Optimization Utilities
// This file contains utilities to improve Core Web Vitals and SEO performance

// Declare global types for GTM
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontPreloads = [
    '/fonts/manrope-v14-latin-regular.woff2',
    '/fonts/manrope-v14-latin-700.woff2'
  ];

  fontPreloads.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preload critical images
  const criticalImages = [
    '/lovable-uploads/Rashmi-logo-light.png',
    '/lovable-uploads/Product_DiPipes.jpeg'
  ];

  criticalImages.forEach(image => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = image;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

// Lazy load images with intersection observer
export const createLazyImageObserver = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    return imageObserver;
  }
  return null;
};

// Optimize images for different screen sizes
export const generateResponsiveImageSrcSet = (basePath: string, sizes: number[] = [300, 600, 900, 1200]) => {
  const extension = basePath.split('.').pop();
  const pathWithoutExtension = basePath.substring(0, basePath.lastIndexOf('.'));
  
  return sizes.map(size => `${pathWithoutExtension}-${size}w.webp ${size}w`).join(', ');
};

// Critical CSS inlining utility
export const inlineCriticalCSS = (css: string) => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
};

// Defer non-critical JavaScript
export const deferNonCriticalJS = (scripts: string[]) => {
  scripts.forEach(scriptSrc => {
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.defer = true;
    document.head.appendChild(script);
  });
};

// Resource hints for better performance
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
    { rel: 'dns-prefetch', href: '//www.googletagmanager.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    { rel: 'preconnect', href: 'https://www.googletagmanager.com' }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossorigin) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  }
};

// Performance tracking without external dependencies
export const trackWebVitals = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Track Core Web Vitals using native Performance API
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance metrics for monitoring
        console.log(`Performance: ${entry.name} - ${entry.duration}ms`);

        // Send to GTM dataLayer if available
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'performance_metric',
            metric_name: entry.name,
            metric_value: Math.round(entry.duration),
            metric_category: 'core_web_vitals'
          });
        }
      }
    });

    // Observe different performance metrics
    try {
      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
    } catch (error) {
      console.log('Performance Observer not fully supported');
    }

    // Track page load time
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`Page Load Time: ${loadTime}ms`);

      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'page_load_time',
          load_time: Math.round(loadTime),
          metric_category: 'performance_tracking'
        });
      }
    });
  }
};

// Advanced SEO meta tags
export const addAdvancedSEOTags = () => {
  const metaTags = [
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'googlebot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'bingbot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'msapplication-TileColor', content: '#1a365d' },
    { name: 'theme-color', content: '#1a365d' }
  ];

  metaTags.forEach(tag => {
    const meta = document.createElement('meta');
    meta.name = tag.name;
    meta.content = tag.content;
    document.head.appendChild(meta);
  });
};

// Initialize all performance optimizations
export const initializeSEOPerformance = () => {
  // Run immediately
  preloadCriticalResources();
  addResourceHints();
  addAdvancedSEOTags();

  // Run after DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    const imageObserver = createLazyImageObserver();
    if (imageObserver) {
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  });

  // Run after page is fully loaded
  window.addEventListener('load', () => {
    registerServiceWorker();
    trackWebVitals();
  });
};

// Schema markup utilities
export const addBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://www.rashmimetaliks.com${crumb.url}`
    }))
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

// Enhanced image optimization
export const optimizeImage = (src: string, alt: string, className?: string) => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  img.decoding = 'async';
  if (className) img.className = className;
  
  // Add WebP support detection
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  if (supportsWebP() && !src.includes('.webp')) {
    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    img.src = webpSrc;
  }

  return img;
};

// Critical CSS for above-the-fold content
export const criticalCSS = `
  /* Critical styles for above-the-fold content */
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
  }
  
  .logo {
    height: 40px;
    width: auto;
  }
  
  .btn-primary {
    background: #E53935;
    color: white;
    padding: 12px 24px;
    border-radius: 6px;
    text-decoration: none;
    display: inline-block;
    transition: background-color 0.2s ease;
  }
  
  .btn-primary:hover {
    background: #c62828;
  }
`;
