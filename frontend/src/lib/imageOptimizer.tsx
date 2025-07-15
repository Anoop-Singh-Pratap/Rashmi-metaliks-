import React from 'react';

// Properly formatted alt text for common product images
export const productImageAltText: Record<string, string> = {
  'Product_DiPipes.jpeg': 'Rashmi Metaliks high-quality ductile iron pipes for water and sewage applications',
  'Product_DiFittings.jpg': 'Ductile iron fittings manufactured by Rashmi Metaliks for pipe connections',
  'Product_Sponge-Iron.jpg': 'Sponge iron production at Rashmi Metaliks manufacturing facility',
  'Product_Pig-Iron.jpeg': 'High-grade pig iron material produced by Rashmi Metaliks',
  'Product_TMT-Bar.jpeg': 'Rashmi TMT steel bars for construction and infrastructure projects',
  'Product_Sinter.jpg': 'Sintered iron ore for metallurgical applications by Rashmi Metaliks',
  'Product_IronOre-Pellet.jpeg': 'Iron ore pellets for steel manufacturing by Rashmi Metaliks',
};

// Component to replace basic img tags with optimized ones
export const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height 
}: { 
  src: string; 
  alt?: string; 
  className?: string; 
  width?: number; 
  height?: number; 
}): JSX.Element => {
  // Extract filename from path
  const filename = src.split('/').pop() || '';
  
  // Use predefined alt text or provided alt, or filename as fallback
  const altText = alt || productImageAltText[filename] || `Rashmi Metaliks - ${filename.replace(/[-_]/g, ' ').replace(/\.\w+$/, '')}`;
  
  return (
    <img
      src={src}
      alt={altText}
      className={className}
      width={width}
      height={height}
      loading="lazy" // Enable lazy loading for better performance
    />
  );
} 