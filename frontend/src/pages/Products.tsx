import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { generateProductSchema } from '../lib/schema';
import { OptimizedImage } from '../lib/imageOptimizer';

const ProductsPage = () => {
  // Define product information for SEO and display
  const featuredProduct = {
    name: "Ductile Iron Pipes",
    image: "/lovable-uploads/Product_DiPipes.jpeg",
    description: "High-quality ductile iron pipes manufactured to international standards, providing excellent durability and performance for water and sewage applications.",
    url: "/di-pipes"
  };
  
  const productSchema = generateProductSchema(
    featuredProduct.name,
    featuredProduct.image,
    featuredProduct.description,
    featuredProduct.url
  );

  const products = [
    {
      name: "Ductile Iron Pipes",
      description: "High-quality ductile iron pipes for water and sewage applications",
      image: "/lovable-uploads/Product_DiPipes.jpeg",
      link: "/di-pipes",
      features: ["ISO 2531 Compliant", "Superior Strength", "Corrosion Resistant"]
    },
    {
      name: "DI Fittings",
      description: "Premium ductile iron fittings and accessories",
      image: "/lovable-uploads/Product_DiFittings.jpeg",
      link: "/di-fittings",
      features: ["Perfect Fit", "Easy Installation", "Long Lasting"]
    },
    {
      name: "TMT Bars",
      description: "High-strength TMT bars for construction applications",
      image: "/lovable-uploads/Product_TmtBar.jpeg", 
      link: "/tmt-bar",
      features: ["High Tensile Strength", "Earthquake Resistant", "Corrosion Resistant"]
    },
    {
      name: "Pig Iron",
      description: "Premium quality pig iron for steel manufacturing",
      image: "/lovable-uploads/Product_PigIron.jpeg",
      link: "/pig-iron",
      features: ["High Purity", "Consistent Quality", "Low Phosphorus"]
    },
    {
      name: "Sponge Iron",
      description: "Direct reduced iron for steel production",
      image: "/lovable-uploads/Product_SpongeIron.jpeg",
      link: "/sponge-iron",
      features: ["High Metallization", "Low Gangue", "Consistent Size"]
    },
    {
      name: "Iron Ore Pellets",
      description: "High-grade iron ore pellets for blast furnace feed",
      image: "/lovable-uploads/Product_IronOrePellet.jpeg",
      link: "/iron-ore-pellet",
      features: ["High Iron Content", "Low Silica", "Uniform Size"]
    }
  ];
  
  return (
    <>
      <SEO 
        title="Steel Products | Rashmi Metaliks"
        description="Explore our range of high-quality steel products including ductile iron pipes, TMT bars, pig iron, and more. All products meet international quality standards."
        keywords="ductile iron pipes, TMT bars, pig iron, sponge iron, iron ore pellets, steel products, Rashmi products"
        canonicalUrl="/products"
        schema={productSchema}
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50/50 to-background dark:from-blue-950/20 dark:to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-foreground">
                Our Products
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover our comprehensive range of high-quality steel products manufactured to international standards. 
                From ductile iron pipes to TMT bars, we deliver excellence in every product.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {products.map((product, index) => (
                <div key={index} className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 border border-border/20">
                  <div className="aspect-video overflow-hidden">
                    <OptimizedImage 
                      src={product.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={`${product.name} - Premium quality from Rashmi Metaliks`}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{product.name}</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{product.description}</p>
                    
                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-foreground mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-center">
                            <span className="w-1.5 h-1.5 bg-rashmi-red rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link 
                      to={product.link}
                      className="inline-flex items-center justify-center w-full py-3 px-4 bg-rashmi-red text-white rounded-lg hover:bg-rashmi-red/90 transition-colors font-medium text-sm"
                    >
                      Learn More
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground">
                Need More Information?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our technical team is ready to help you choose the right products for your specific requirements.
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
                  Download Brochures
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductsPage; 