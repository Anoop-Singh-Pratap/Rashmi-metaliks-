import React from 'react';
import SEO from '../components/SEO';
import { generateProductSchema } from '../lib/schema';
import { OptimizedImage } from '../lib/imageOptimizer';
// ... other imports

const ProductsPage = () => {
  // Define product information for SEO and display
  const featuredProduct = {
    name: "Ductile Iron Pipes",
    image: "/lovable-uploads/Product_DiPipes.jpeg",
    description: "High-quality ductile iron pipes manufactured to international standards, providing excellent durability and performance for water and sewage applications.",
    url: "/products/ductile-iron-pipes"
  };
  
  const productSchema = generateProductSchema(
    featuredProduct.name,
    featuredProduct.image,
    featuredProduct.description,
    featuredProduct.url
  );
  
  return (
    <>
      <SEO 
        title="Steel Products | Rashmi Metaliks"
        description="Explore our range of high-quality steel products including ductile iron pipes, TMT bars, pig iron, and more. All products meet international quality standards."
        keywords="ductile iron pipes, TMT bars, pig iron, sponge iron, iron ore pellets, steel products, Rashmi products"
        canonicalUrl="/products"
        schema={productSchema}
      />
      
      {/* Replace regular img tags with OptimizedImage */}
      <div className="product-showcase">
        <OptimizedImage 
          src={featuredProduct.image}
          className="w-full h-48 object-cover"
          alt="Rashmi Metaliks premium ductile iron pipes for water infrastructure"
        />
        {/* Rest of the product page content */}
      </div>
    </>
  );
};

export default ProductsPage; 