import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Declare gtag function type
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: {
        page_path?: string;
        page_title?: string;
        custom_map?: Record<string, string>;
        event_category?: string;
        event_label?: string;
        value?: number;
      }
    ) => void;
  }
}

// Google Analytics tracking component
const GoogleAnalytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views when route changes
    if (window.gtag) {
      window.gtag('config', 'GTM-NV5Z3DL7', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        custom_map: {
          'custom_parameter_1': 'company_name',
          'custom_parameter_2': 'industry'
        }
      });
    }

    // Track custom events for important interactions
    const trackContactForm = () => {
      if (window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'Contact',
          event_label: 'Contact Form',
          value: 1
        });
      }
    };

    const trackVendorRegistration = () => {
      if (window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'Vendor',
          event_label: 'Vendor Registration',
          value: 1
        });
      }
    };

    const trackJobApplication = () => {
      if (window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'Careers',
          event_label: 'Job Application',
          value: 1
        });
      }
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