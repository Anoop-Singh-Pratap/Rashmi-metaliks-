import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Management = () => {
  return (
    <>
      <SEO 
        title="Management Team | Rashmi Metaliks"
        description="Meet the experienced leadership team at Rashmi Metaliks, driving innovation and excellence in steel manufacturing."
        keywords="Rashmi Metaliks management, leadership team, steel industry leaders, board of directors"
        canonicalUrl="/management"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50/50 to-background dark:from-blue-950/20 dark:to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-foreground">
                Management Team
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our experienced leadership team drives innovation and excellence in steel manufacturing, 
                making Rashmi Metaliks the world's 2nd largest DI pipe manufacturer.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/20">
                <h2 className="text-2xl font-semibold mb-6 text-foreground">Leadership Excellence</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Our management team brings decades of experience in steel manufacturing, 
                  business strategy, and operational excellence. Under their guidance, 
                  Rashmi Metaliks has achieved remarkable growth and industry recognition.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Strategic Vision</h3>
                    <p className="text-muted-foreground text-sm">
                      Forward-thinking leadership driving sustainable growth and innovation
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Industry Expertise</h3>
                    <p className="text-muted-foreground text-sm">
                      Deep knowledge of steel manufacturing and global market dynamics
                    </p>
                  </div>
                </div>

                <div className="mt-12">
                  <Link 
                    to="/about-rashmi"
                    className="inline-flex items-center justify-center py-3 px-8 bg-rashmi-red text-white rounded-full hover:bg-rashmi-red/90 transition-colors font-semibold"
                  >
                    Learn More About Rashmi Metaliks
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

export default Management;