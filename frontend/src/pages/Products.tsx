import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { generateProductSchema } from '../lib/schema';
import { OptimizedImage } from '../lib/imageOptimizer';
import { ArrowRight, Factory, Shield, Award } from 'lucide-react';

const ProductsPage = () => {
  const products = [
    {
      name: "Ductile Iron Pipes",
      image: "/lovable-uploads/Product_DiPipes.jpeg",
      description: "High-quality ductile iron pipes manufactured to international standards, providing excellent durability and performance for water and sewage applications.",
      url: "/di-pipes",
      features: ["IS 8329 Certified", "Corrosion Resistant", "High Durability"]
    },
    {
      name: "DI Fittings",
      image: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/otqfxjgx8xbpv10kxlan",
      description: "Premium ductile iron fittings for perfect pipe connections with superior corrosion resistance and variety of configurations.",
      url: "/di-fittings",
      features: ["EN 545 Standard", "Perfect Connections", "Corrosion Resistant"]
    },
    {
      name: "TMT Bars",
      image: "https://www.rashmimetaliks.com/images/products/tmt-bar.jpg",
      description: "High-strength TMT bars with superior bendability and weldability for construction applications.",
      url: "/tmt-bar",
      features: ["High Strength", "Superior Bendability", "Earthquake Resistant"]
    },
    {
      name: "Pig Iron",
      image: "/lovable-uploads/Product_PigIron.jpeg",
      description: "Premium quality pig iron for steel manufacturing with consistent chemical composition and high purity.",
      url: "/pig-iron",
      features: ["High Purity", "Consistent Quality", "Steel Manufacturing"]
    },
    {
      name: "Sponge Iron",
      image: "/lovable-uploads/Product_SpongeIron.jpeg",
      description: "High-grade sponge iron produced through direct reduction process for steel production.",
      url: "/sponge-iron",
      features: ["Direct Reduced", "High Grade", "Steel Production"]
    },
    {
      name: "Iron Ore Pellets",
      image: "/lovable-uploads/Product_IronOrePellet.jpeg",
      description: "Superior quality iron ore pellets with high iron content for blast furnace operations.",
      url: "/iron-ore-pellet",
      features: ["High Iron Content", "Blast Furnace Ready", "Superior Quality"]
    },
    {
      name: "Sinter",
      image: "/lovable-uploads/Product_Sinter.jpeg",
      description: "High-quality sinter for iron and steel production with optimal chemical composition.",
      url: "/sinter",
      features: ["Optimal Composition", "Steel Production", "High Quality"]
    },
    {
      name: "Rashmi-Lock Joint System",
      image: "/lovable-uploads/rashmi-lock-hero.jpg",
      description: "Innovative joint system for ductile iron pipes providing superior sealing and easy installation.",
      url: "/rashmi-lock",
      features: ["Superior Sealing", "Easy Installation", "Innovative Design"]
    }
  ];

  const productSchema = generateProductSchema(
    "Steel Products by Rashmi Metaliks",
    "/lovable-uploads/Product_DiPipes.jpeg",
    "Comprehensive range of high-quality steel products including ductile iron pipes, TMT bars, pig iron, and more.",
    "/products"
  );
  
  return (
    <>
      <SEO 
        title="Steel Products | Rashmi Metaliks - Premium Quality Manufacturing"
        description="Explore our comprehensive range of high-quality steel products including ductile iron pipes, TMT bars, pig iron, sponge iron, and more. All products meet international quality standards."
        keywords="ductile iron pipes, TMT bars, pig iron, sponge iron, iron ore pellets, steel products, Rashmi products, DI fittings, sinter"
        canonicalUrl="/products"
        schema={productSchema}
      />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-rashmi-red/20 text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-rashmi-red">Products</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              World-class steel products manufactured to international standards
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Factory className="w-5 h-5 text-rashmi-red" />
                <span>770,000 MT Capacity</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-rashmi-red" />
                <span>International Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-rashmi-red" />
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Product Portfolio
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From ductile iron pipes to TMT bars, we manufacture a comprehensive range of steel products 
              that meet the highest international quality standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={index} className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage 
                    src={product.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={`${product.name} - Premium quality by Rashmi Metaliks`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-rashmi-red transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <div className="w-2 h-2 bg-rashmi-red rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    to={product.url}
                    className="inline-flex items-center gap-2 bg-rashmi-red text-white px-4 py-2 rounded-lg hover:bg-rashmi-red/90 transition-colors group-hover:shadow-lg"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-rashmi-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Need Custom Solutions?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our technical team can help you find the right products for your specific requirements. 
            Contact us for expert consultation and custom solutions.
          </p>
          <Link 
            to="/contact-us"
            className="inline-flex items-center gap-2 bg-white text-rashmi-red px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Our Experts
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductsPage; 