// Enhanced Organization schema for Rashmi Metaliks
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "Manufacturer", "Corporation"],
  "name": "Rashmi Metaliks Limited",
  "alternateName": ["Rashmi Group", "Rashmi Metaliks", "World's 2nd Largest DI Pipe Manufacturer"],
  "url": "https://www.rashmimetaliks.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.rashmimetaliks.com/lovable-uploads/Rashmi-logo-light.png",
    "width": "300",
    "height": "100"
  },
  "description": "World's 2nd largest manufacturer of Ductile Iron Pipes with 770,000 MT annual capacity. Leading producer of high-quality steel products including DI Pipes, TMT Bars, Pig Iron, and more.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Premlata, 39 Shakespeare Sarani, 5th Floor",
    "addressLocality": "Kolkata",
    "addressRegion": "West Bengal",
    "postalCode": "700017",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "22.5448",
    "longitude": "88.3576"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-33-2289-8815",
      "contactType": "customer service",
      "email": "info@rashmimetaliks.com",
      "availableLanguage": ["English", "Hindi", "Bengali"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+91-33-2289-8815",
      "contactType": "sales",
      "email": "sales@rashmimetaliks.com"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/rashmimetaliks",
    "https://twitter.com/rashmimetaliks",
    "https://www.linkedin.com/company/rashmi-metaliks-limited",
    "https://www.youtube.com/channel/UCrashmimetaliks"
  ],
  "slogan": "Global Leadership in Metallic Excellence",
  "foundingDate": "1984",
  "foundingLocation": {
    "@type": "Place",
    "name": "Kolkata, India"
  },
  "numberOfEmployees": "1000+",
  "industry": ["Steel Manufacturing", "Ductile Iron Pipes", "Metallurgy"],
  "keywords": "World's 2nd largest DI pipe manufacturer, 770000 MT capacity, Ductile Iron Pipes, Steel Products, TMT Bars, Pig Iron",
  "award": [
    "ISO 9001:2015 Certified",
    "ISO 14001:2015 Environmental Management",
    "OHSAS 18001:2007 Occupational Health & Safety"
  ],
  "knowsAbout": [
    "Ductile Iron Pipe Manufacturing",
    "Steel Production",
    "Water Infrastructure",
    "Metallurgical Engineering"
  ]
};

// Enhanced Product schema for Ductile Iron Pipes
export const diPipesSchema = {
  "@context": "https://schema.org",
  "@type": ["Product", "ManufacturedProduct"],
  "name": "Ductile Iron Pipes - World's 2nd Largest Manufacturer",
  "alternateName": ["DI Pipes", "Ductile Iron Water Pipes", "Cast Iron Pipes"],
  "image": [
    {
      "@type": "ImageObject",
      "url": "https://www.rashmimetaliks.com/lovable-uploads/Product_DiPipes.jpeg",
      "caption": "High-quality Ductile Iron Pipes by Rashmi Metaliks - World's 2nd largest manufacturer"
    }
  ],
  "description": "Premium quality Ductile Iron Pipes from Rashmi Metaliks - World's 2nd largest DI pipe manufacturer with 770,000 MT annual capacity. Our DI pipes offer exceptional strength, corrosion resistance and longevity for water and sewage applications.",
  "brand": {
    "@type": "Brand",
    "name": "Rashmi Metaliks",
    "slogan": "Global Leadership in Metallic Excellence",
    "description": "World's 2nd largest DI pipe manufacturer with 770,000 MT annual capacity",
    "logo": "https://www.rashmimetaliks.com/lovable-uploads/Rashmi-logo-light.png"
  },
  "manufacturer": {
    "@type": ["Organization", "Manufacturer"],
    "name": "Rashmi Metaliks Limited",
    "url": "https://www.rashmimetaliks.com",
    "description": "World's 2nd largest manufacturer of Ductile Iron Pipes with 770,000 MT annual capacity"
  },
  "category": ["Industrial Pipes", "Water Infrastructure", "Ductile Iron Products"],
  "material": "Ductile Iron",
  "applicationArea": ["Water Distribution", "Sewage Systems", "Industrial Pipelines", "Fire Protection Systems"],
  "features": [
    "High tensile strength and yield strength",
    "Superior corrosion resistance with special coatings",
    "Exceptional longevity of over 100 years",
    "Smooth internal surface for maximum hydraulic capacity",
    "Compliance with international standards EN 545, ISO 2531, AWWA C151/A21.51"
  ],
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Rashmi Metaliks Limited"
    },
    "url": "https://www.rashmimetaliks.com/di-pipes",
    "priceValidUntil": "2025-12-31",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Annual Production Capacity",
      "value": "770,000 MT"
    },
    {
      "@type": "PropertyValue",
      "name": "Global Ranking",
      "value": "World's 2nd Largest Manufacturer"
    },
    {
      "@type": "PropertyValue",
      "name": "Standards Compliance",
      "value": "EN 545, ISO 2531, AWWA C151/A21.51, ASTM A536"
    }
  ],
  "award": "Manufactured by the World's 2nd largest DI pipe producer",
  "keywords": "World's 2nd largest DI pipe manufacturer, 770000 MT capacity, Ductile Iron Pipes, Water Distribution Pipes, Corrosion Resistant Pipes"
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

// LocalBusiness Schema for enhanced local SEO
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Manufacturer", "Organization"],
  "name": "Rashmi Metaliks Limited",
  "image": "https://www.rashmimetaliks.com/lovable-uploads/Rashmi-logo-light.png",
  "telephone": "+91-33-2289-8815",
  "email": "info@rashmimetaliks.com",
  "url": "https://www.rashmimetaliks.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Premlata, 39 Shakespeare Sarani, 5th Floor",
    "addressLocality": "Kolkata",
    "addressRegion": "West Bengal",
    "postalCode": "700017",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "22.5448",
    "longitude": "88.3576"
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "$$$$",
  "description": "World's 2nd largest manufacturer of Ductile Iron Pipes with 770,000 MT annual capacity. Leading producer of high-quality steel products.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Steel Products Catalog",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Ductile Iron Pipes"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "DI Fittings"
        }
      }
    ]
  }
};

// Manufacturing Schema for industrial processes
export const manufacturingSchema = {
  "@context": "https://schema.org",
  "@type": "ManufacturingProcess",
  "name": "Ductile Iron Pipe Manufacturing",
  "description": "Advanced manufacturing process for producing world-class ductile iron pipes with 770,000 MT annual capacity by world's 2nd largest DI pipe manufacturer",
  "manufacturer": {
    "@type": "Organization",
    "name": "Rashmi Metaliks Limited",
    "description": "World's 2nd largest ductile iron pipe manufacturer"
  },
  "productionCapacity": {
    "@type": "QuantitativeValue",
    "value": "770000",
    "unitCode": "TNE",
    "unitText": "Metric Tons per year"
  }
};

// Industry Leadership Schema
export const industryLeadershipSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Rashmi Metaliks Limited",
  "description": "World's 2nd largest ductile iron pipe manufacturer with 770,000 MT annual capacity",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Ductile Iron Pipes - World's 2nd Largest Manufacturer",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Ductile Iron Pipes",
          "description": "Premium quality DI pipes from world's 2nd largest manufacturer"
        }
      }
    ]
  },
  "award": [
    "World's 2nd Largest DI Pipe Manufacturer",
    "India's Largest Ductile Iron Pipe Producer",
    "770,000 MT Annual Production Capacity",
    "ISO 9001:2015 Certified",
    "ISO 14001:2015 Environmental Management",
    "OHSAS 18001:2007 Occupational Health & Safety"
  ],
  "knowsAbout": [
    "Largest Ductile Iron Pipe Manufacturing",
    "World's 2nd Largest DI Pipe Production",
    "Biggest DI Pipe Manufacturing Capacity",
    "Leading Ductile Iron Pipe Technology",
    "Global DI Pipe Market Leadership"
  ]
};

// Competitive Positioning Schema
export const competitivePositioningSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Global Ductile Iron Pipe Manufacturing Rankings",
  "description": "Comprehensive data on world's largest ductile iron pipe manufacturers and their production capacities",
  "creator": {
    "@type": "Organization",
    "name": "Rashmi Metaliks Limited"
  },
  "about": [
    {
      "@type": "Thing",
      "name": "Largest Ductile Iron Pipe Manufacturers",
      "description": "Global ranking of biggest DI pipe manufacturers by production capacity"
    },
    {
      "@type": "Thing",
      "name": "World's 2nd Largest DI Pipe Manufacturer",
      "description": "Rashmi Metaliks position in global ductile iron pipe manufacturing"
    }
  ],
  "keywords": [
    "largest ductile iron pipe manufacturer",
    "biggest DI pipe manufacturer",
    "world's largest ductile iron pipe company",
    "leading DI pipe producer",
    "global DI pipe manufacturing capacity"
  ]
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