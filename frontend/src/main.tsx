import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Initialize SEO performance optimizations
const initializeSEOPerformance = async () => {
  try {
    const { initializeSEOPerformance: initSEO, criticalCSS, inlineCriticalCSS } = await import('./lib/seo-performance');
    initSEO();
    inlineCriticalCSS(criticalCSS);
  } catch (error) {
    console.log('SEO performance initialization skipped:', error);
  }
};

// Initialize after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSEOPerformance);
} else {
  initializeSEOPerformance();
}
import { HelmetProvider } from 'react-helmet-async'

// Initialize mobile touch handling
const initMobileTouch = () => {
  // Ensure touch events are never blocked
  document.addEventListener('touchstart', () => {}, {passive: true});
  document.addEventListener('touchmove', () => {}, {passive: true});
  
  // Fix any potential issues with click events
  document.addEventListener('click', (e) => {
    // Fix for some mobile browsers not triggering click events
    if (e.target && e.target instanceof HTMLElement) {
      const now = Date.now();
      const element = e.target as HTMLElement & { _lastClickTime?: number };
      if (!element._lastClickTime || now - element._lastClickTime > 300) {
        element._lastClickTime = now;
      }
    }
  }, {capture: true});
};

// Run mobile touch initialization
initMobileTouch();

// Check if we should render compatibility mode
if ((window as any).COMPATIBILITY_MODE) {
  console.log('Rendering compatibility mode for mobile');
  
  // Create a simplified version of the page
  const compatRoot = document.getElementById('root');
  if (compatRoot) {
    compatRoot.innerHTML = `
      <div style="padding: 20px; max-width: 100%;">
      
        <header style="margin-bottom: 20px;">
          <img src="/lovable-uploads/Rashmi-logo-light.png" alt="Rashmi Metaliks" style="height: 40px; margin-bottom: 20px;" />
          <h1 style="font-size: 24px; margin-bottom: 10px;">Rashmi Metaliks</h1>
          <p style="color: #666;">World's 2nd Largest DI Pipe Manufacturer</p>
        </header>
        
        <nav style="margin-bottom: 30px;">
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 12px;"><a href="/" style="display: block; padding: 10px; background: #f5f5f5; border-radius: 4px; text-decoration: none; color: #333;">Home</a></li>
            <li style="margin-bottom: 12px;"><a href="/about-rashmi" style="display: block; padding: 10px; background: #f5f5f5; border-radius: 4px; text-decoration: none; color: #333;">About Rashmi</a></li>
            <li style="margin-bottom: 12px;"><a href="/di-pipes" style="display: block; padding: 10px; background: #f5f5f5; border-radius: 4px; text-decoration: none; color: #333;">DI Pipes</a></li>
            <li style="margin-bottom: 12px;"><a href="/di-fittings" style="display: block; padding: 10px; background: #f5f5f5; border-radius: 4px; text-decoration: none; color: #333;">DI Fittings</a></li>
            <li style="margin-bottom: 12px;"><a href="/certifications" style="display: block; padding: 10px; background: #f5f5f5; border-radius: 4px; text-decoration: none; color: #333;">Certifications</a></li>
            <li style="margin-bottom: 12px;"><a href="/contact-us" style="display: block; padding: 10px; background: #f5f5f5; border-radius: 4px; text-decoration: none; color: #333;">Contact Us</a></li>
          </ul>
        </nav>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666;">
          <p>You are viewing a simplified mobile version of our website for compatibility.</p>
          <p><a href="${window.location.pathname}?compatibility=false" style="color: #E53935;">Try full version</a></p>
        </div>
      </div>
    `;
  }
} else {
  // Render normal React app
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HelmetProvider>
  );
}
