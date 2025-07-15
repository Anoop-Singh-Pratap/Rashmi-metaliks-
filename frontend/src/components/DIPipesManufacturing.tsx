import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  FlaskConical, 
  Droplets, 
  Gauge, 
  Ruler, 
  Wrench, 
  CheckCircle,
  CircleCheck,
  Cog,
  Microscope,
  Warehouse
} from 'lucide-react';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  details: string[];
}

const DIPipesManufacturing: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Cloudinary optimization parameters for different purposes
  const cloudinaryParams = {
    lowQuality: 'f_auto,q_10,e_blur:1000,w_50',
    thumbnail: 'f_auto,q_auto,w_20',
    preview: 'f_auto,q_auto,w_300',
    full: 'f_auto,q_auto'
  };

  // Replace the URL to include optimization parameters
  const getOptimizedUrl = (url: string, quality: keyof typeof cloudinaryParams): string => {
    if (url.includes('cloudinary.com')) {
      return url.replace(/f_auto,q_auto/, cloudinaryParams[quality]);
    }
    return url;
  };

  const processSteps: ProcessStep[] = [
    {
      id: 'material',
      title: 'Selection of Material',
      description: 'If the molten iron composition deviates from established standards, it is rectified by introducing alloy and other elements.',
      icon: <FlaskConical size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/dip%20manufacturing%20process/ldfxfyeuce5fsfegkp4y',
      details: [
        'Strict quality control checks on raw materials',
        'Advanced spectrometry monitors chemical composition',
        'Material selection impacts overall strength and durability'
      ]
    },
    {
      id: 'composition',
      title: 'Composition Adjustment',
      description: 'A small quantity of pure magnesium is introduced into the molten iron to foster the development of a spheroidal graphite microstructure.',
      icon: <Microscope size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/dip%20manufacturing%20process/illkzdlborbheoxu55kw',
      details: [
        'Magnesium treatment transforms graphite from flake to nodular form',
        'Precise chemical balancing ensures optimal ductility',
        'Continuous monitoring throughout composition adjustment process'
      ]
    },
    {
      id: 'magnesium',
      title: 'Magnesium Treatment',
      description: 'A controlled amount of magnesium is added to create the spheroidal graphite structure that gives ductile iron its unique properties.',
      icon: <FlaskConical size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/dip%20manufacturing%20process/zyuoxq1wama751kv2xgg',
      details: [
        'Precise magnesium addition for optimal nodularity',
        'Temperature-controlled process for consistent results',
        'Real-time monitoring of reaction conditions'
      ]
    },
    {
      id: 'centrifugal',
      title: 'Centrifugal Casting',
      description: 'Pipes are formed using centrifugal casting method.',
      icon: <Cog size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/dip%20manufacturing%20process/xoznqzxzdqhvgiebxwcd',
      details: [
        'Rotating molds ensure even distribution and density',
        'Centrifugal force removes impurities from the pipe wall',
        'Process creates uniform wall thickness and smooth surfaces'
      ]
    },
    {
      id: 'annealing',
      title: 'Annealing',
      description: 'The heat treatment process is employed to enhance the mechanical properties of the pipes.',
      icon: <Gauge size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/dip%20manufacturing%20process/uxe32ivpxnfax0syvx03',
      details: [
        'Temperature controlled to within ±5°C for optimal results',
        'Stress relief improves pipe performance under pressure',
        'Annealing cycle customized based on pipe diameter and thickness'
      ]
    },
    {
      id: 'hydrostatic',
      title: 'Hydrostatic Pressure Testing',
      description: 'To perform the leak test, hydrostatic pressure is applied internally and is steadily maintained for 10 seconds.',
      icon: <Droplets size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/dip%20manufacturing%20process/xkziejwx1zcepyfh2vdl',
      details: [
        'Each pipe tested at pressure exceeding maximum working conditions',
        'Computer-controlled testing equipment ensures accuracy',
        'Zero-leak tolerance policy ensures only perfect pipes proceed'
      ]
    },
    {
      id: 'cutting',
      title: 'Cutting and Grinding',
      description: 'Pipes are subjected to spigot end cutting and grinding to attain the required end chamfer. (Applicable for sampling)',
      icon: <Wrench size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/dip%20manufacturing%20process/uxvcid8aowffppuwvngw',
      details: [
        'CNC precision cutting ensures perfect joint compatibility',
        'Automated grinding produces consistent chamfer angles',
        'Laser measurement verifies dimensional accuracy'
      ]
    },
    {
      id: 'zinc',
      title: 'Zinc Coating',
      description: 'Zinc coating, due to the galvanizing effect, increases the corrosion resistance of the pipe.',
      icon: <Droplets size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/dip%20manufacturing%20process/pfs3jfb5afdlxdjypxpx',
      details: [
        'Zinc metallization provides sacrificial protection against corrosion',
        'Coating thickness controlled to optimize protection and cost',
        'Rapid application ensures production efficiency'
      ]
    },
    {
      id: 'bituminous',
      title: 'Bituminous Coating',
      description: 'Bituminous paint is applied uniformly by a spraying machine. The mean thickness of the coating is 70 μm.',
      icon: <Droplets size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/dip%20manufacturing%20process/cvseznc4l2molf7ve1v4',
      details: [
        'UV-resistant coating extends service life in all environments',
        'Environmentally friendly bitumen formula minimizes impact',
        'Quick-drying formula enables efficient production flow'
      ]
    },
    {
      id: 'quality',
      title: 'Quality Testing',
      description: 'The pipes are rigorously tested on all predefined parameters to ensure the highest quality standards.',
      icon: <CircleCheck size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/dip%20manufacturing%20process/yyzyxwtjb0k6cqgqxdsk',
      details: [
        'Multi-stage quality assurance protocols exceed industry standards',
        'Statistical process control identifies trends before issues occur',
        'ISO certified testing facilities ensure consistent quality'
      ]
    },
    {
      id: 'storage',
      title: 'Storage',
      description: 'The quality-approved pipes are stacked in a controlled environment and marked for transportation',
      icon: <Warehouse size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/dip%20manufacturing%20process/toj5gxmivwq3ukbvfzlk',
      details: [
        'Weather-protected storage prevents damage before installation',
        'Computerized inventory management ensures traceability',
        'Strategic stacking minimizes handling and transport damage'
      ]
    }
  ];
  
  useEffect(() => {
    // Mark current image as loading
    setIsImageLoaded(false);
    
    // Preload current image
    const img = new Image();
    img.src = processSteps[activeStep].imageUrl;
    img.onload = () => {
      setIsImageLoaded(true);
      setLoadedImages(prev => new Set([...prev, activeStep]));
    };

    // Preload next image
    const nextStep = (activeStep + 1) % processSteps.length;
    if (!loadedImages.has(nextStep)) {
      const nextImg = new Image();
      nextImg.src = processSteps[nextStep].imageUrl;
      nextImg.onload = () => {
        setLoadedImages(prev => new Set([...prev, nextStep]));
      };
    }
  }, [activeStep]);

  return (
    <section id="manufacturing-process" className="py-20 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Manufacturing <span className="text-rashmi-red">Process Stages</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our state-of-the-art manufacturing process ensures the highest quality 
            Ductile Iron Pipes that meet international standards
          </p>
        </motion.div>

        {/* Production Stages Overview - Now as the primary section */}
        <div className="max-w-5xl mx-auto mb-16 bg-background rounded-xl p-6 border border-border">
          <h3 className="text-2xl font-bold mb-6 text-center text-rashmi-red">Production Stages Overview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {processSteps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`rounded-lg p-3 flex flex-col items-center justify-center text-center transition-all h-full ${
                  activeStep === index 
                    ? 'bg-rashmi-red text-white shadow-md' 
                    : 'bg-muted/20 hover:bg-muted'
                }`}
                whileHover={{ y: -5 }}
              >
                {/* Preload thumbnail images for overview */}
                {index !== activeStep && (
                  <div className="w-8 h-8 mb-2 overflow-hidden rounded-full opacity-0 absolute">
                    <img 
                      src={getOptimizedUrl(step.imageUrl, 'thumbnail')} 
                      alt="" 
                      width="32" 
                      height="32" 
                      loading="lazy"
                      onLoad={() => {
                        // This preloads the thumbnails in the background
                        if (!loadedImages.has(index)) {
                          const fullImg = new Image();
                          fullImg.src = getOptimizedUrl(step.imageUrl, 'preview');
                        }
                      }}
                    />
                  </div>
                )}
                <div className={`mb-2 ${activeStep === index ? 'text-white' : 'text-rashmi-red'}`}>
                  {step.icon}
                </div>
                <span className="text-sm font-medium">{step.title}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center">
              <div className="h-2 bg-muted rounded-full w-full">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${(activeStep + 1) / processSteps.length * 100}%`,
                  }}
                  transition={{ 
                    duration: 0.5, 
                    ease: "easeOut", 
                    type: "tween" 
                  }}
                  className="h-full bg-rashmi-red rounded-full"
                />
              </div>
              <span className="ml-4 text-sm font-medium">
                {Math.round((activeStep + 1) / processSteps.length * 100)}%
              </span>
            </div>
          </div>
          
          {/* Active Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-lg"
            >
              <div className="grid md:grid-cols-2 h-full">
                {/* Image Side with Progressive Loading */}
                <div className="relative h-[250px] md:h-full overflow-hidden">
                  {/* Low quality placeholder */}
                  <img 
                    src={getOptimizedUrl(processSteps[activeStep].imageUrl, 'lowQuality')}
                    alt={processSteps[activeStep].title + " placeholder"}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-0' : 'opacity-100'}`}
                    style={{ filter: 'blur(10px)' }}
                    loading="eager"
                  />
                  
                  {/* Main image with lazy loading */}
                  <img 
                    src={getOptimizedUrl(processSteps[activeStep].imageUrl, 'full')}
                    alt={processSteps[activeStep].title}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    onLoad={() => setIsImageLoaded(true)}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="inline-block bg-rashmi-red text-white text-sm font-medium px-3 py-1 rounded-full mb-2">
                      {processSteps[activeStep].title}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{processSteps[activeStep].title}</h3>
                  </div>
                </div>
                
                {/* Content Side */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-muted-foreground mb-6">
                      {processSteps[activeStep].description}
                    </p>
                    
                    <h4 className="font-bold text-lg mb-4">Key Points:</h4>
                    <ul className="space-y-3">
                      {processSteps[activeStep].details.map((detail, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-1 flex-shrink-0">
                            <div className="w-5 h-5 rounded-full bg-rashmi-red/10 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-rashmi-red" />
                            </div>
                          </div>
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center border-t border-border pt-4">
                    <button 
                      onClick={() => setActiveStep(prev => (prev === 0 ? processSteps.length - 1 : prev - 1))}
                      className="text-sm font-medium text-rashmi-red hover:underline flex items-center"
                      disabled={activeStep === 0}
                    >
                      ← Previous Step
                    </button>
                    <button 
                      onClick={() => setActiveStep(prev => (prev === processSteps.length - 1 ? 0 : prev + 1))}
                      className="text-sm font-medium text-rashmi-red hover:underline flex items-center"
                      disabled={activeStep === processSteps.length - 1}
                    >
                      Next Step →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default DIPipesManufacturing;
