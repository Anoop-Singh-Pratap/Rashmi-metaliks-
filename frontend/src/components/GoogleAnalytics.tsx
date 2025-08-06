import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Declare GTM dataLayer type
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (
      command: 'config' | 'event',
      targetId: string,
      config?: any
    ) => void;
  }
}

// Google Tag Manager tracking component - GTM-53NK9DHX ONLY
const GoogleAnalytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];

    // Ensure GTM is loaded and track page views
    const trackPageView = () => {
      window.dataLayer.push({
        event: 'page_view',
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href,
        company_name: 'Rashmi Metaliks',
        industry: 'Steel Manufacturing',
        gtm_id: 'GTM-53NK9DHX' // Ensure only this GTM ID is used
      });

      // Debug log for verification
      console.log('GTM Page View Tracked:', {
        path: location.pathname,
        title: document.title,
        gtm: 'GTM-53NK9DHX'
      });
    };

    // Track immediately
    trackPageView();

    // Track custom events for important interactions using GTM dataLayer
    const trackContactForm = () => {
      window.dataLayer.push({
        event: 'form_submit',
        form_type: 'contact',
        event_category: 'Contact',
        event_label: 'Contact Form',
        value: 1
      });
    };

    const trackVendorRegistration = () => {
      window.dataLayer.push({
        event: 'form_submit',
        form_type: 'vendor',
        event_category: 'Vendor',
        event_label: 'Vendor Registration',
        value: 1
      });
    };

    const trackJobApplication = () => {
      window.dataLayer.push({
        event: 'form_submit',
        form_type: 'job',
        event_category: 'Careers',
        event_label: 'Job Application',
        value: 1
      });
    };

    // Add event listeners for form submissions
    const contactForms = document.querySelectorAll('form[data-form-type="contact"]');
    const vendorForms = document.querySelectorAll('form[data-form-type="vendor"]');
    const jobForms = document.querySelectorAll('form[data-form-type="job"]');

    contactForms.forEach(form => {
      form.addEventListener('submit', trackContactForm);
    });

    vendorForms.forEach(form => {
      form.addEventListener('submit', trackVendorRegistration);
    });

    jobForms.forEach(form => {
      form.addEventListener('submit', trackJobApplication);
    });

    // Cleanup event listeners
    return () => {
      contactForms.forEach(form => {
        form.removeEventListener('submit', trackContactForm);
      });
      vendorForms.forEach(form => {
        form.removeEventListener('submit', trackVendorRegistration);
      });
      jobForms.forEach(form => {
        form.removeEventListener('submit', trackJobApplication);
      });
    };
  }, [location]);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics; 