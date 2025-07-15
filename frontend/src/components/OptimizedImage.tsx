import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  blur?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  blur = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurDataUrl, setBlurDataUrl] = useState('');
  
  // Extract file extension
  const extension = src.split('.').pop()?.toLowerCase() || 'jpg';
  
  // Generate responsive srcSet
  const generateSrcSet = () => {
    // Skip for SVGs
    if (extension === 'svg') return undefined;
    
    // Generate srcset for images
    const basePath = src.substring(0, src.lastIndexOf('.'));
    return `
      ${basePath}-300w.${extension} 300w,
      ${basePath}-600w.${extension} 600w,
      ${basePath}-900w.${extension} 900w,
      ${src} 1200w
    `;
  };
  
  // Generate tiny placeholder for blur effect
  useEffect(() => {
    if (blur && !isLoaded) {
      // This would ideally use a real tiny version of the image
      // For now, we'll simulate with a CSS background
      setBlurDataUrl('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect width="100%" height="100%" fill="rgb(200,200,200)"/></svg>');
    }
  }, [blur, isLoaded]);
  
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {blur && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse" 
          style={{ 
            backgroundImage: `url(${blurDataUrl})`,
            backgroundSize: 'cover',
            filter: 'blur(20px)',
            transform: 'scale(1.1)'
          }}
        />
      )}
      <img
        src={src}
        srcSet={generateSrcSet()}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      />
    </div>
  );
};

export default OptimizedImage; 