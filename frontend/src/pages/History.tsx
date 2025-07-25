import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const History = () => {
  const milestones = [
    {
      year: "1990s",
      title: "Foundation Years",
      description: "Rashmi Metaliks was established with a vision to become a leading steel manufacturer in India."
    },
    {
      year: "2000s",
      title: "Expansion Phase",
      description: "Significant capacity expansion and modernization of manufacturing facilities."
    },
    {
      year: "2010s",
      title: "Technology Advancement",
      description: "Implementation of cutting-edge technology and quality management systems."
    },
    {
      year: "2020s",
      title: "Global Recognition",
      description: "Achieved status as world's 2nd largest DI pipe manufacturer with 770,000 MT annual capacity."
    }
  ];

  return (
    <>
      <SEO 
        title="Company History | Rashmi Metaliks"
        description="Discover the journey of Rashmi Metaliks from its foundation to becoming the world's 2nd largest DI pipe manufacturer with rich history of innovation and growth."
        keywords="Rashmi Metaliks history, company milestones, steel industry evolution, manufacturing heritage"
        canonicalUrl="/history"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50/50 to-background dark:from-blue-950/20 dark:to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-foreground">
                Our History
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A journey of excellence, innovation, and growth that has made us 
                the world's 2nd largest DI pipe manufacturer.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-center mb-12 text-foreground">
                Key Milestones
              </h2>
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="bg-rashmi-red text-white px-4 py-2 rounded-full font-semibold text-sm">
                        {milestone.year}
                      </div>
                    </div>
                    <div className="flex-1 bg-card rounded-xl p-6 shadow-lg border border-border/20">
                      <h3 className="text-xl font-semibold mb-3 text-foreground">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section className="py-16 bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/20">
                <h2 className="text-3xl font-display font-bold mb-6 text-foreground">
                  Building Tomorrow's Infrastructure
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  From our humble beginnings to becoming a global leader in steel manufacturing, 
                  our history is marked by continuous innovation, quality excellence, and 
                  unwavering commitment to our customers and stakeholders.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-rashmi-red mb-2">770,000</div>
                    <div className="text-sm text-muted-foreground">MT Annual Capacity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-rashmi-red mb-2">#2</div>
                    <div className="text-sm text-muted-foreground">Largest DI Pipe Manufacturer</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-rashmi-red mb-2">30+</div>
                    <div className="text-sm text-muted-foreground">Years of Excellence</div>
                  </div>
                </div>

                <div className="mt-12">
                  <Link 
                    to="/about-rashmi"
                    className="inline-flex items-center justify-center py-3 px-8 bg-rashmi-red text-white rounded-full hover:bg-rashmi-red/90 transition-colors font-semibold mr-4"
                  >
                    About Rashmi Metaliks
                  </Link>
                  <Link 
                    to="/products"
                    className="inline-flex items-center justify-center py-3 px-8 border border-border text-foreground rounded-full hover:bg-muted transition-colors font-semibold"
                  >
                    Our Products
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

export default History;