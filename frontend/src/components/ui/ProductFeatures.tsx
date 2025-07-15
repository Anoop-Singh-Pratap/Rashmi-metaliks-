/**
 * ProductFeatures Component
 * 
 * A visually engaging component for displaying product features with animations and interactive elements.
 * Designed to highlight key product attributes in a grid layout with visual enhancements.
 * 
 * Features:
 * - Animated entrance of feature items with staggered reveal
 * - Interactive hover effects for feature cards
 * - Support for icons or visual indicators for each feature
 * - Responsive grid layout that adapts to different screen sizes
 * - Optional animations on scroll into view
 * - Consistent styling with the design system
 * - Configurable feature list through props
 * 
 * This component is typically used on product detail pages to showcase the main
 * benefits and features of a product in an attractive, scannable format.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Check, CircleCheck } from 'lucide-react';

interface ProductFeature {
  title: string;
  description?: string;
}

interface ProductFeaturesProps {
  features: ProductFeature[];
  className?: string;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features, className }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="bg-background/50 backdrop-blur-sm border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
          variants={itemVariants}
          whileHover={{ scale: 1.03, y: -5 }}
        >
          <div className="flex items-start space-x-3">
            <div className="mt-1 text-rashmi-red">
              <CircleCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">{feature.title}</h3>
              {feature.description && (
                <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductFeatures;
