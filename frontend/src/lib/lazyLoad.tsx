import React, { lazy, Suspense } from 'react';

interface LazyLoadOptions {
  fallback?: React.ReactNode;
  minDelay?: number;
}

// Helper to lazily load any component
export function lazyLoad(
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
  options: LazyLoadOptions = {}
) {
  const {
    fallback = <div className="h-40 w-full bg-muted animate-pulse rounded-md"></div>,
    minDelay = 0
  } = options;
  
  // Add a minimum delay to prevent layout shifts for fast connections
  const LazyComponent = lazy(() => {
    if (minDelay <= 0) return importFunc();
    
    return Promise.all([
      importFunc(),
      new Promise(resolve => setTimeout(resolve, minDelay))
    ]).then(([moduleExport]) => moduleExport);
  });
  
  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
} 