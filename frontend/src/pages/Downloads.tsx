import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Downloads = () => {
  const downloadCategories = [
    {
      title: "Product Brochures",
      description: "Detailed information about our steel products",
      items: [
        { name: "DI Pipes Catalog", size: "2.5 MB", type: "PDF" },
        { name: "TMT Bars Brochure", size: "1.8 MB", type: "PDF" },
        { name: "Pig Iron Specifications", size: "1.2 MB", type: "PDF" }
      ]
    },
    {
      title: "Technical Documents",
      description: "Technical specifications and quality certificates",
      items: [
        { name: "Quality Certificates", size: "3.1 MB", type: "PDF" },
        { name: "Technical Specifications", size: "2.7 MB", type: "PDF" },
        { name: "Installation Guidelines", size: "4.2 MB", type: "PDF" }
      ]
    },
    {
      title: "Company Information",
      description: "Corporate brochures and company presentations",
      items: [
        { name: "Company Profile", size: "5.8 MB", type: "PDF" },
        { name: "Annual Report", size: "12.3 MB", type: "PDF" },
        { name: "Sustainability Report", size: "3.9 MB", type: "PDF" }
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Downloads | Rashmi Metaliks"
        description="Download product brochures, technical documents, company profiles and other resources from Rashmi Metaliks - World's 2nd largest DI pipe manufacturer."
        keywords="Rashmi Metaliks downloads, product brochures, technical documents, company profile, steel product catalogs"
        canonicalUrl="/downloads"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50/50 to-background dark:from-blue-950/20 dark:to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-foreground">
                Downloads
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Access our comprehensive collection of product brochures, technical documents, 
                and company information to learn more about our steel products and services.
              </p>
            </div>
          </div>
        </section>

        {/* Downloads Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-12">
                {downloadCategories.map((category, index) => (
                  <div key={index} className="bg-card rounded-2xl p-8 shadow-lg border border-border/20">
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold mb-2 text-foreground">
                        {category.title}
                      </h2>
                      <p className="text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/10 hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              <svg className="w-8 h-8 text-rashmi-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium text-foreground text-sm">
                                {item.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {item.type} • {item.size}
                              </div>
                            </div>
                          </div>
                          <button className="flex-shrink-0 bg-rashmi-red text-white px-3 py-1.5 rounded-md hover:bg-rashmi-red/90 transition-colors text-sm font-medium">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="py-16 bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/20">
                <h2 className="text-3xl font-display font-bold mb-6 text-foreground">
                  Need Something Specific?
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Can't find what you're looking for? Our team is ready to provide 
                  custom documentation and technical specifications for your specific requirements.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/contact-us"
                    className="inline-flex items-center justify-center py-3 px-8 bg-rashmi-red text-white rounded-full hover:bg-rashmi-red/90 transition-colors font-semibold"
                  >
                    Contact Our Team
                  </Link>
                  <Link 
                    to="/brochures"
                    className="inline-flex items-center justify-center py-3 px-8 border border-border text-foreground rounded-full hover:bg-muted transition-colors font-semibold"
                  >
                    View All Brochures
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Downloads;