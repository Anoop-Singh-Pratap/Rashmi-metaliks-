import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  schema?: any | any[]; // Updated to allow array of schemas
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
  };
  lang?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = '/lovable-uploads/Rashmi-logo-light.png',
  schema,
  article,
  lang = 'en',
  noindex = false
}) => {
  const siteUrl = 'https://www.rashmimetaliks.com'; // Updated to correct domain
  const fullCanonicalUrl = canonicalUrl ? 
    (canonicalUrl.startsWith('http') ? canonicalUrl : `${siteUrl}${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`) 
    : siteUrl;
  
  // Handle rendering multiple schemas
  const renderSchemas = () => {
    if (!schema) return null;
    
    if (Array.isArray(schema)) {
      return schema.map((schemaItem, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaItem)}
        </script>
      ));
    }
    
    return (
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    );
  };
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="author" content="Rashmi Metaliks" />
      <meta name="generator" content="React" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`} />
      <meta property="og:site_name" content="Rashmi Metaliks" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific tags */}
      {article && article.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article && article.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article && article.tags && article.tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rashmi_group" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`} />
      
      {/* Theme color for browser */}
      <meta name="theme-color" content="#E53935" />
      
      {/* Favicon - These should be placed in public directory */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Schema.org JSON-LD */}
      {renderSchemas()}
    </Helmet>
  );
};

export default SEO; 