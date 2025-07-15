import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, ArrowRight, FileIcon } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { organizationSchema, generateBreadcrumbSchema } from '../lib/schema';

interface BrochureItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  fallbackImage?: string;
  fileUrl: string;
  fileSize: string;
  category: string;
}

const Brochures = () => {
  const brochures: BrochureItem[] = [
    {
      id: 'di-pipes-brochure',
      title: 'Rashmi Ductile Iron Pipes',
      description: 'Complete specifications and applications for our premium Ductile Iron Pipes range.',
      thumbnail: '/lovable-uploads/Rashmi Ductile Iron Pipes.pdf',
      fallbackImage: '/lovable-uploads/About-Rashmi.jpg',
      fileUrl: '/lovable-uploads/Rashmi Ductile Iron Pipes.pdf',
      fileSize: '3.5 MB',
      category: 'Products'
    },
    {
      id: 'di-fittings-brochure',
      title: 'Rashmi DI Fittings',
      description: 'Technical specifications and installation guide for Ductile Iron Fittings.',
      thumbnail: '/lovable-uploads/Rashmi Di Fittings.pdf',
      fallbackImage: '/lovable-uploads/About-Rashmi.jpg',
      fileUrl: '/lovable-uploads/Rashmi Di Fittings.pdf',
      fileSize: '2.0 MB',
      category: 'Products'
    },
    {
      id: 'bi-products-brochure',
      title: 'Rashmi BI Products',
      description: 'Comprehensive guide to our BI Products range with technical specifications.',
      thumbnail: '/lovable-uploads/Rashmi Bi Product.pdf',
      fallbackImage: '/lovable-uploads/About-Rashmi.jpg',
      fileUrl: '/lovable-uploads/Rashmi Bi Product.pdf',
      fileSize: '6.1 MB',
      category: 'Products'
    },
    {
      id: 'rashmi-lock-brochure',
      title: 'RASHMI-LOCK Restrained Jointing System',
      description: 'Technical details for our advanced RASHMI-LOCK Restrained Jointing System.',
      thumbnail: '/lovable-uploads/Rashmi Lock Joint.pdf',
      fallbackImage: '/lovable-uploads/About-Rashmi.jpg',
      fileUrl: '/lovable-uploads/Rashmi Lock Joint.pdf',
      fileSize: '4.9 MB',
      category: 'Products'
    },
    {
      id: 'company-profile',
      title: 'Rashmi Group Company Profile',
      description: 'Complete overview of Rashmi Group, our vision, values and achievements.',
      thumbnail: '/lovable-uploads/Rashmi Combined.pdf',
      fallbackImage: '/lovable-uploads/About-Rashmi.jpg',
      fileUrl: '/lovable-uploads/Rashmi Combined.pdf',
      fileSize: '38 MB',
      category: 'Corporate'
    }
  ];

  // Generate thumbnails for the PDFs
  const [pdfThumbnails, setPdfThumbnails] = useState<{[key: string]: string}>({});
  
  useEffect(() => {
    // This is a placeholder. In a production app, you might want to
    // use a server-side approach to generate thumbnails or use PDF.js
    // For now, we'll use a placeholder approach
    const generatePlaceholderThumbnails = () => {
      const thumbnails: {[key: string]: string} = {};
      brochures.forEach(brochure => {
        // Using the first page as thumbnail is something that would require PDF.js in a real implementation
        thumbnails[brochure.id] = brochure.fallbackImage || '/lovable-uploads/pdf-placeholder.jpg';
      });
      setPdfThumbnails(thumbnails);
    };
    
    generatePlaceholderThumbnails();
  }, []);

  const categories = Array.from(new Set(brochures.map(item => item.category)));
  const [activeCategory, setActiveCategory] = React.useState('All');
  
  const filteredBrochures = activeCategory === 'All' 
    ? brochures 
    : brochures.filter(item => item.category === activeCategory);

  // Create breadcrumb schema for the Brochures page
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Downloads", url: "/brochures" }
  ]);

  // Combined schemas
  const schemas = [organizationSchema, breadcrumbSchema];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Brochures & Downloads | Rashmi Metaliks Technical Resources"
        description="Download product brochures, technical specifications, and catalogs for Rashmi Metaliks' premium DI pipes, fittings, and other steel products."
        keywords="Rashmi Metaliks brochures, DI pipes PDF, ductile iron technical specifications, steel product catalogs, RASHMI-LOCK jointing system"
        canonicalUrl="/brochures"
        schema={schemas}
      />

      <Header />

      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="text-rashmi-red">Brochures</span> & Downloads
            </h1>
            <p className="text-muted-foreground text-lg">
              Access our product catalogs, technical guides, and corporate publications
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'All' 
                  ? 'bg-rashmi-red text-white' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-rashmi-red text-white' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredBrochures.map((brochure) => (
              <motion.div
                key={brochure.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-border group"
              >
                <div className="relative h-52 bg-muted">
                  {/* PDF thumbnails with styled overlay */}
                  {brochure.thumbnail.endsWith('.pdf') ? (
                    <div className="relative w-full h-full overflow-hidden">
                      <img 
                        src={pdfThumbnails[brochure.id] || brochure.fallbackImage} 
                        alt={brochure.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 flex flex-col justify-between p-4">
                        <div className="flex justify-end">
                          <span className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                            {brochure.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-white p-2 rounded-md shadow-lg">
                            <FileText size={22} className="text-rashmi-red" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium text-base">{brochure.title}</h4>
                            <span className="text-white/70 text-xs">PDF • {brochure.fileSize}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* View/Download overlay on hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <a 
                          href={brochure.fileUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-white hover:bg-gray-100 transition-colors"
                          title="View PDF"
                        >
                          <Eye size={20} className="text-rashmi-red" />
                        </a>
                        <a 
                          href={brochure.fileUrl} 
                          download
                          className="p-3 rounded-full bg-rashmi-red text-white hover:bg-rashmi-red/90 transition-colors"
                          title="Download PDF"
                        >
                          <Download size={20} />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img 
                        src={brochure.thumbnail} 
                        alt={brochure.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                          {brochure.category}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-5">
                  {!brochure.thumbnail.endsWith('.pdf') && (
                    <h3 className="text-xl font-bold mb-2">{brochure.title}</h3>
                  )}
                  <p className="text-muted-foreground text-sm mb-4">
                    {brochure.description}
                  </p>
                  {!brochure.thumbnail.endsWith('.pdf') && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        <FileText size={14} className="inline mr-1" />
                        {brochure.fileSize}
                      </span>
                      <div className="flex gap-2">
                        <a 
                          href={brochure.fileUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </a>
                        <a 
                          href={brochure.fileUrl} 
                          download
                          className="p-2 rounded-full bg-rashmi-red text-white hover:bg-rashmi-red/90 transition-colors"
                          title="Download"
                        >
                          <Download size={18} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for?
            </p>
            <a 
              href="/contact-us" 
              className="inline-flex items-center text-rashmi-red hover:underline"
            >
              Contact our team for assistance
              <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Brochures;
