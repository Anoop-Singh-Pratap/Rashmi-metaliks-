import React from 'react';
import { Helmet as ReactHelmet, HelmetProvider } from 'react-helmet-async';

interface CustomHelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  children?: React.ReactNode;
}

// Create a HelmetProvider context
const helmetContext = {};

/**
 * Custom Helmet component that uses react-helmet-async to avoid 
 * the UNSAFE_componentWillMount warning from react-helmet
 */
const CustomHelmet: React.FC<CustomHelmetProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  children
}) => {
  return (
    <HelmetProvider context={helmetContext}>
      <ReactHelmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        {children}
      </ReactHelmet>
    </HelmetProvider>
  );
};

export default CustomHelmet; 