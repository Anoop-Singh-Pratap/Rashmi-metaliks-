// Organization schema for Rashmi Metaliks
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Rashmi Metaliks Limited",
  "url": "https://www.rashmimetaliks.com",
  "logo": "https://www.rashmimetaliks.com/lovable-uploads/Rashmi-logo-light.png",
  "description": "Leading manufacturer of high-quality steel products including ductile iron pipes, TMT bars, and more.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Premlata, 39 Shakespeare Sarani, 5th Floor",
    "addressLocality": "Kolkata",
    "addressRegion": "West Bengal",
    "postalCode": "700017",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-33-2289-8815",
    "contactType": "customer service",
    "email": "info@rashmimetaliks.com"
  },
  "sameAs": [
    "https://www.facebook.com/rashmimetaliks",
    "https://twitter.com/rashmimetaliks",
    "https://www.linkedin.com/company/rashmi-metaliks-limited"
  ],
  "slogan": "Global Leadership in Metallic Excellence",
  "foundingDate": "1984",
  "foundingLocation": "Kolkata, India",
  "numberOfEmployees": "1000+"
};

// Product schema for Ductile Iron Pipes
export const diPipesSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Ductile Iron Pipes",
  "image": "https://www.rashmimetaliks.com/lovable-uploads/Product_DiPipes.jpeg",
  "description": "High-quality ductile iron pipes manufactured to international standards, providing excellent durability and performance for water and sewage applications.",
  "brand": {
    "@type": "Brand",
    "name": "Rashmi",
    "slogan": "Global Leadership in Metallic Excellence",
    "description": "World's 2nd largest DI pipe manufacturer with 770,000 MT annual capacity"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Rashmi Metaliks Limited",
    "description": "World's 2nd largest DI pipe manufacturer with 770,000 MT annual capacity"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "url": "https://www.rashmimetaliks.com/di-pipes"
  },
  "award": "Manufactured by the World's 2nd largest DI pipe producer"
};

// Schema for DI Fittings page
export const diFittingsSchema = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Ductile Iron Fittings",
  "image": "/lovable-uploads/compressed/di-fittings-hero.webp",
  "description": "Premium Ductile Iron Fittings manufactured by Rashmi Metaliks for water distribution systems, offering superior strength, corrosion resistance, and durability.",
  "brand": {
    "@type": "Brand",
    "name": "Rashmi Metaliks"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Rashmi Metaliks Ltd."
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.rashmimetaliks.com/di-fittings",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  }
};

// Generate FAQ Schema
export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Generate BreadcrumbList Schema
export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `https://www.rashmimetaliks.com${item.url.startsWith('/') ? item.url : `/${item.url}`}`
    }))
  };
};

// Generate product schema dynamically for any product
export const generateProductSchema = (
  name: string, 
  image: string, 
  description: string,
  url: string,
  brand: string = "Rashmi",
  specifications?: Array<{name: string, value: string}>,
  awards?: string[]
) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "image": image.startsWith('http') ? image : `https://www.rashmimetaliks.com${image.startsWith('/') ? image : `/${image}`}`,
    "description": description,
    "brand": {
      "@type": "Brand",
      "name": brand,
      "slogan": "Global Leadership in Metallic Excellence"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Rashmi Metaliks Limited",
      "description": "World's 2nd largest DI pipe manufacturer with 770,000 MT annual capacity"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": url.startsWith('http') ? url : `https://www.rashmimetaliks.com${url.startsWith('/') ? url : `/${url}`}`
    }
  };

  // Add specifications if provided
  if (specifications && specifications.length > 0) {
    schema.additionalProperty = specifications.map(spec => ({
      "@type": "PropertyValue",
      "name": spec.name,
      "value": spec.value
    }));
  }

  // Add awards if provided
  if (awards && awards.length > 0) {
    schema.award = awards;
  }

  return schema;
};

// Generate article schema
export const generateArticleSchema = (
  headline: string,
  image: string,
  datePublished: string,
  dateModified: string,
  author: string = "Rashmi Metaliks",
  publisher: string = "Rashmi Metaliks Limited",
  description: string,
  url: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "image": image.startsWith('http') ? image : `https://www.rashmimetaliks.com${image.startsWith('/') ? image : `/${image}`}`,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": publisher,
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.rashmimetaliks.com/lovable-uploads/Rashmi-logo-light.png"
      }
    },
    "description": description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url.startsWith('http') ? url : `https://www.rashmimetaliks.com${url.startsWith('/') ? url : `/${url}`}`
    }
  };
}; 