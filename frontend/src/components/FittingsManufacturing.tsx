import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  Warehouse,
  Zap,
  Layers,
  Shield,
  AlertCircle,
  Settings,
  Box,
  Paintbrush,
  Target,
  Shapes,
  Hammer,
  SprayCan,
  Flame,
  Package,
  Boxes,
  ChevronsUpDown,
  ShieldAlert
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  details: string[];
}

interface ProcessType {
  id: string;
  name: string;
  description: string;
  steps: ProcessStep[];
}

const FittingsManufacturing: React.FC = () => {
  const [activeProcess, setActiveProcess] = useState<'vlfp' | 'highPressure'>('vlfp');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const { theme } = useTheme();
  const isInitialRender = useRef(true);

  // Cloudinary optimization parameters for different purposes
  const cloudinaryParams = {
    lowQuality: 'f_auto,q_10,e_blur:1000,w_50',
    thumbnail: 'f_auto,q_auto,w_20',
    preview: 'f_auto,q_auto,w_300',
    full: 'f_auto,q_auto'
  };

  // Replace the URL to include optimization parameters
  const getOptimizedUrl = (url: string): string => {
    if (url.includes('cloudinary.com')) {
      // For all quality levels, return direct URLs without transformations
      return url.replace(/f_auto,q_auto[^/]*\/v1\//, '');
    }
    return url;
  };

  // Add debugging function to show URL in console
  const logImageUrl = (url: string) => {
    console.log("Attempting to load image:", url);
    return url;
  };

  // VLFP Process (Lost Foam Process) steps
  const vlfpProcessSteps: ProcessStep[] = [
    {
      id: 'eps-expansion',
      title: 'EPS Expansion',
      description: 'Expandable Polystyrene (EPS) beads are expanded to form the base material.',
      icon: <Shapes size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/otqfxjgx8xbpv10kxlan',
      details: [
        'Pre-expanded EPS beads create precise pattern templates',
        'Controlled expansion ensures consistent density',
        'Material properties tuned for optimal vaporization during casting'
      ]
    },
    {
      id: 'segment-making',
      title: 'Segment Making',
      description: 'The expanded EPS is cut into segments to create the pattern of the fitting.',
      icon: <Ruler size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/v0stnhowcj13utrmm1j7',
      details: [
        'CNC cutting ensures dimensional accuracy',
        'Each segment designed for precise assembly',
        'Complex geometries created through segmentation'
      ]
    },
    {
      id: 'assembly',
      title: 'Assembly',
      description: 'Segments are assembled into a complete Styrofoam replica of the fitting.',
      icon: <Cog size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/ulpy4oq2qxj9tgsbwbl0',
      details: [
        'Adhesive bonding creates seamless pattern assemblies',
        'Assembly jigs ensure proper alignment',
        'Quality control inspection at every step'
      ]
    },
    {
      id: 'coating-drying',
      title: 'Coating & Drying',
      description: 'The replica is coated with a refractory material and dried to form a protective layer.',
      icon: <SprayCan size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/zaxktc7eauvwaunevfeb',
      details: [
        'Refractory coating withstands molten metal temperatures',
        'Controlled drying prevents pattern distortion',
        'Coating thickness optimized for each fitting type'
      ]
    },
    {
      id: 'molding',
      title: 'Molding',
      description: 'The coated replica is placed in mechanized molding boxes filled with sand.',
      icon: <Boxes size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/lrcbukzxutrkia9uivqm',
      details: [
        'Vibration compaction ensures uniform sand density',
        'Special unbonded sand provides optimal permeability',
        'Mold design incorporates gating and riser systems'
      ]
    },
    {
      id: 'clustering',
      title: 'Clustering',
      description: 'Multiple patterns may be clustered for batch processing.',
      icon: <Layers size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/aljwt27dhbonhrmipuna',
      details: [
        'Strategic clustering maximizes production efficiency',
        'Runners designed for optimal metal flow',
        'Computer simulations validate cluster designs'
      ]
    },
    {
      id: 'pouring',
      title: 'Pouring',
      description: 'Molten ductile iron is poured into the mold. The Styrofoam vaporizes, leaving the metal to fill the cavity.',
      icon: <Flame size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/n5isxmub0n8itczbpmdm',
      details: [
        'Temperature-controlled pouring ensures perfect solidification',
        'Styrofoam vaporization creates perfect cavity replication',
        'Advanced pouring techniques prevent turbulence'
      ]
    },
    {
      id: 'shot-blasting',
      title: 'Shot Blasting',
      description: 'After cooling, the casting is removed and cleaned using shot blasting.',
      icon: <Zap size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/vytj98mchxbhujlbgor8',
      details: [
        'High-velocity steel shot removes all sand and residue',
        'Automated process ensures complete coverage',
        'Surface preparation for subsequent processing'
      ]
    },
    {
      id: 'fettling-machining',
      title: 'Fettling & Machining',
      description: 'Excess material is removed (fettling), and the casting is machined to precise dimensions.',
      icon: <Wrench size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/sxfiy225wuey6u5wywoi',
      details: [
        'CNC machining ensures dimensional accuracy',
        'Precision grinding creates perfect sealing surfaces',
        'Detailed quality control measurements throughout'
      ]
    },
    {
      id: 'zinc-coating',
      title: 'Zinc Coating',
      description: 'The casting is coated with zinc for corrosion resistance.',
      icon: <Droplets size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/nvotjqvwdo9prdix8fii',
      details: [
        'Zinc provides sacrificial protection against corrosion',
        'Coating thickness controlled for optimal protection',
        'Uniform application ensures complete coverage'
      ]
    },
    {
      id: 'hydrostatic-testing',
      title: 'Hydrostatic Testing',
      description: 'The fitting undergoes pressure testing to ensure integrity.',
      icon: <Gauge size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/ajpjjpeufjgzvgkm02l5',
      details: [
        'Each fitting tested at 1.5x working pressure',
        'Computerized pressure monitoring for accuracy',
        'Zero leakage tolerance ensures quality'
      ]
    },
    {
      id: 'cement-lining',
      title: 'Cement Lining',
      description: 'Internal cement mortar lining is applied (if required).',
      icon: <Paintbrush size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/y58dd2v2orndqwvnfsha',
      details: [
        'Special cement formulation for water applications',
        'Centrifugal application ensures uniform thickness',
        'Smooth surface enhances flow characteristics'
      ]
    },
    {
      id: 'bitumen-coating',
      title: 'Bitumen Coating',
      description: 'External bituminous coating is applied for additional protection.',
      icon: <SprayCan size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/lozdvjufrzp4lk53h4jh',
      details: [
        'Bitumen forms waterproof external barrier',
        'Automated spray application ensures uniform coverage',
        'Enhanced environmental protection for buried fittings'
      ]
    },
    {
      id: 'fbe-coating',
      title: 'FBE Coating',
      description: 'Optional Fusion-Bonded Epoxy (FBE) coating is applied in a specialized plant.',
      icon: <Layers size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/jjjlgjjypypiqxul2lgg',
      details: [
        'High-performance epoxy provides superior protection',
        'Electrostatic application ensures perfect adhesion',
        'Ideal for aggressive soil or water conditions'
      ]
    },
    {
      id: 'packaging-dispatch',
      title: 'Packaging & Dispatch',
      description: 'Final inspection and packaging for delivery.',
      icon: <Package size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/clvih836vr8r6bh53hgn',
      details: [
        'Weather-resistant packaging prevents damage',
        'Barcoding ensures complete traceability',
        'Just-in-time delivery reduces storage requirements'
      ]
    }
  ];

  // High Pressure Moulding Process steps
  const highPressureProcessSteps: ProcessStep[] = [
    {
      id: 'pattern-development',
      title: 'Pattern Development',
      description: 'A metal pattern (master model) is designed and developed.',
      icon: <Shapes size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/RMP%20process/x2cq1o7rewehf0sw9dr9',
      details: [
        'Computer-aided design ensures dimensional accuracy',
        'Material selection optimized for pattern longevity',
        'Design incorporates shrinkage allowances'
      ]
    },
    {
      id: 'pattern-machining',
      title: 'Pattern Machining',
      description: 'The pattern is precision-machined to meet dimensional specifications.',
      icon: <Wrench size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/RMP%20process/qfqosnqozjsx7f5rjicj',
      details: [
        'CNC machining ensures perfect dimensions',
        'Surface finishing optimizes mold release',
        'Precision markings for part identification'
      ]
    },
    {
      id: 'pattern-mounting',
      title: 'Pattern Mounting on Match Plate',
      description: 'The pattern is mounted on a match plate for molding consistency.',
      icon: <Layers size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/RMP%20process/ruussuruiswswg1tu5vc',
      details: [
        'Match plate design ensures perfect alignment',
        'Multiple patterns mounted for production efficiency',
        'Gating system designed for optimal metal flow'
      ]
    },
    {
      id: 'molding-core-fixing',
      title: 'Molding & Core Fixing',
      description: 'Sand molds are created using high-pressure compaction. Cores (if needed) are fixed into the mold.',
      icon: <Boxes size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/RMP%20process/dryyze6ztpzyqwdbckql',
      details: [
        'High-pressure compaction ensures uniform density',
        'Special sand mixture optimizes surface finish',
        'Precision core positioning creates accurate internal geometries'
      ]
    },
    {
      id: 'hp-pouring',
      title: 'Pouring',
      description: 'Molten ductile iron is poured into the prepared mold.',
      icon: <Flame size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/n5isxmub0n8itczbpmdm',
      details: [
        'Temperature-controlled pouring ensures optimal metallurgy',
        'Inoculation treatments optimize graphite structure',
        'Automated pouring systems for consistency'
      ]
    },
    {
      id: 'knockout',
      title: 'Knockout',
      description: 'After solidification, the mold is broken to remove the casting.',
      icon: <Hammer size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/RMP%20process/dzqkigrrmj5cbwwargua',
      details: [
        'Controlled cooling ensures optimal metallurgical properties',
        'Automated knockout systems minimize damage',
        'Sand reclamation systems for environmental sustainability'
      ]
    },
    {
      id: 'hp-shot-blasting',
      title: 'Shot Blasting',
      description: 'The casting is cleaned using shot blasting to remove residual sand.',
      icon: <Zap size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/RMP%20process/me3rvf9uuzysamkzgeet',
      details: [
        'Multiple blasting cycles ensure complete cleaning',
        'Surface preparation for subsequent processing',
        'Quality inspection after cleaning'
      ]
    },
    {
      id: 'hp-fettling-machining',
      title: 'Fettling & Machining',
      description: 'Excess material is removed, and the casting is machined for accuracy.',
      icon: <Wrench size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/nvotjqvwdo9prdix8fii',
      details: [
        'Robotic fettling removes gates and risers',
        'CNC machining ensures dimensional accuracy',
        '3D scanning verifies final dimensions'
      ]
    },
    {
      id: 'hydrotesting-post-zinc',
      title: 'Hydrotesting Post Zinc Coating',
      description: 'Zinc coating is applied, followed by hydrostatic pressure testing.',
      icon: <ShieldAlert size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/RMP%20process/tkzd028b1jezngfsconj',
      details: [
        'Zinc coating applied through thermal spraying',
        'Pressure testing exceeds operating requirements',
        'Complete documentation of test results'
      ]
    },
    {
      id: 'hp-cement-lining',
      title: 'Cement Lining',
      description: 'Internal cement mortar lining is applied (if required).',
      icon: <Paintbrush size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/RMP%20process/cjxahkbxcm8tyqgoh67k',
      details: [
        'Special cement formulation for water applications',
        'Robotic application ensures uniform thickness',
        'Controlled curing for optimal performance'
      ]
    },
    {
      id: 'hp-bitumen-coating',
      title: 'Bitumen Coating',
      description: 'External bituminous coating is applied.',
      icon: <SprayCan size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/RMP%20process/y8cdoxe0r9zd4sqqb1oe',
      details: [
        'Bitumen coating provides environmental protection',
        'Automated application ensures uniform coverage',
        'Quick-drying formulation optimizes production flow'
      ]
    },
    {
      id: 'again-shot-blasting',
      title: 'Again Shot Blasting',
      description: 'Additional shot blasting to prepare for next coating steps.',
      icon: <Zap size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/RMP%20process/me3rvf9uuzysamkzgeet',
      details: [
        'Secondary blasting ensures perfect coating adhesion',
        'Controlled process to prevent damage to existing coatings',
        'Quality inspection before next manufacturing step'
      ]
    },
    {
      id: 'hp-fbe-coating',
      title: 'Fusion-Bonded Epoxy Coating',
      description: 'Optional FBE coating is applied for enhanced durability.',
      icon: <Layers size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/RMP%20process/hhenozu2bcgzjib4qg4y',
      details: [
        'Pre-heating ensures perfect adhesion',
        'Electrostatic application creates uniform layer',
        'Curing process monitored for quality assurance'
      ]
    },
    {
      id: 'hp-packaging-dispatch',
      title: 'Packaging & Dispatch',
      description: 'Final quality checks and packaging for dispatch.',
      icon: <Package size={24} />,
      imageUrl: 'https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/RMP%20process/qezyvgon6qsswlzu8zct',
      details: [
        'Final inspection ensures perfect quality',
        'Specialized packaging prevents transport damage',
        'Digital tracking from factory to installation site'
      ]
    }
  ];

  // Select the active process steps based on the toggle
  const activeProcessSteps = activeProcess === 'vlfp' ? vlfpProcessSteps : highPressureProcessSteps;

  // Memoized handlers to prevent re-renders
  const handleProcessToggle = useCallback((processType: 'vlfp' | 'highPressure') => (e: React.MouseEvent) => {
    e.preventDefault();
    if (activeProcess !== processType) {
      setActiveProcess(processType);
      setActiveStep(0);
    }
  }, [activeProcess]);

  const handleStepChange = useCallback((index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveStep(index);
  }, []);

  const handlePrevStep = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setActiveStep(prev => (prev === 0 ? activeProcessSteps.length - 1 : prev - 1));
  }, [activeProcessSteps.length]);

  const handleNextStep = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setActiveStep(prev => (prev === activeProcessSteps.length - 1 ? 0 : prev + 1));
  }, [activeProcessSteps.length]);

  // Reset active step and image loading state when switching processes
  useEffect(() => {
    if (!isInitialRender.current) {
      // Reset the active step when changing processes
      setActiveStep(0);
      // Reset loaded images
      setLoadedImages(new Set([0]));
      // Reset image loaded state
      setIsImageLoaded(false);
    } else {
      isInitialRender.current = false;
    }
  }, [activeProcess]);

  // Handle image loading
  useEffect(() => {
    // Reset states for new image
    setIsImageLoaded(false);
    setImageError(false);
    
    const currentStep = activeStep;
    
    // Preload current image
    const img = new Image();
    img.src = activeProcessSteps[currentStep].imageUrl;
    
    // Only update state if this is still the current step when loaded
    const onImageLoad = () => {
      setIsImageLoaded(true);
      setImageError(false);
      setLoadedImages(prev => {
        const newSet = new Set(prev);
        newSet.add(currentStep);
        return newSet;
      });
    };
    
    // Add error handling for image load failures
    const onImageError = () => {
      console.error(`Failed to load image: ${activeProcessSteps[currentStep].imageUrl}`);
      // Still set as loaded to make the UI usable, even with a missing image
      setIsImageLoaded(true);
      setImageError(true);
    };
    
    img.onload = onImageLoad;
    img.onerror = onImageError;

    // Add fallback timer in case image loading stalls
    const fallbackTimer = setTimeout(() => {
      if (!isImageLoaded) {
        console.warn("Image load timed out, forcing display");
        setIsImageLoaded(true);
      }
    }, 3000);
    
    // Preload next image
    const nextStep = (currentStep + 1) % activeProcessSteps.length;
    if (!loadedImages.has(nextStep)) {
      const nextImg = new Image();
      nextImg.src = activeProcessSteps[nextStep].imageUrl;
    }
    
    return () => {
      // Cleanup to prevent state updates on unmounted component
      img.onload = null;
      img.onerror = null;
      clearTimeout(fallbackTimer);
    };
  }, [activeStep, activeProcess, activeProcessSteps, isImageLoaded]);

  return (
    <section id="manufacturing-process" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Manufacturing <span className="text-rashmi-red">Process</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            Our ductile iron fittings are manufactured using two advanced processes,
            each optimized for specific fitting types and requirements
          </p>
          <div className="inline-block mt-4 mb-2 px-4 py-1 bg-rashmi-red text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-lg">
            VLFP Process
          </div>
        </motion.div>

        {/* Process Toggle Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-md">
            <div className="grid grid-cols-2">
              <motion.button
                onClick={handleProcessToggle('vlfp')}
                type="button"
                className={`py-6 px-4 flex flex-col items-center transition-all duration-300 ${
                  activeProcess === 'vlfp' 
                    ? 'bg-rashmi-red text-white' 
                    : 'hover:bg-muted/50'
                }`}
                whileHover={{ y: -2 }}
              >
                <Factory size={28} className="mb-3" />
                <h3 className="text-lg font-bold">VLFP Process</h3>
                <p className="text-sm opacity-80 mt-1">(Lost Foam Process)</p>
              </motion.button>
              
              <motion.button
                onClick={handleProcessToggle('highPressure')}
                type="button"
                className={`py-6 px-4 flex flex-col items-center transition-all duration-300 ${
                  activeProcess === 'highPressure' 
                    ? 'bg-rashmi-red text-white' 
                    : 'hover:bg-muted/50'
                }`}
                whileHover={{ y: -2 }}
              >
                <Hammer size={28} className="mb-3" />
                <h3 className="text-lg font-bold">High Pressure Moulding</h3>
                <p className="text-sm opacity-80 mt-1">(Traditional Process)</p>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Process Description */}
        <motion.div
          key={activeProcess}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto mb-12 bg-card border border-border rounded-xl p-6 shadow-md"
        >
          <h3 className="text-xl font-bold text-rashmi-red mb-4">
            {activeProcess === 'vlfp' ? 'Lost Foam Process (VLFP)' : 'High Pressure Moulding Process'}
          </h3>
          <p className="text-muted-foreground">
            {activeProcess === 'vlfp' 
              ? 'The Lost Foam Process (VLFP) is ideal for complex fittings with intricate geometries. It uses a styrofoam pattern that vaporizes during casting, allowing for greater design freedom and precision.'
              : 'The High Pressure Moulding Process is our traditional manufacturing method using metal patterns and sand molds. It excels in producing fittings with consistent quality and excellent surface finish.'}
          </p>
        </motion.div>

        {/* Production Stages Overview */}
        <div className="max-w-5xl mx-auto mb-10 bg-background rounded-xl p-6 border border-border">
          <h3 className="text-xl font-bold mb-6 text-center">Production Stages</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {activeProcessSteps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={handleStepChange(index)}
                type="button"
                className={`rounded-lg p-3 flex flex-col items-center justify-center text-center transition-all h-full ${
                  activeStep === index 
                    ? 'bg-rashmi-red text-white shadow-md' 
                    : 'bg-muted/20 hover:bg-muted'
                }`}
                whileHover={{ y: -3 }}
              >
                {/* Preload thumbnail images for overview */}
                {index !== activeStep && (
                  <div className="w-8 h-8 mb-2 overflow-hidden rounded-full opacity-0 absolute">
                    <img 
                      src={getOptimizedUrl(step.imageUrl)} 
                      alt="" 
                      width="32" 
                      height="32" 
                      loading="lazy"
                      onLoad={() => {
                        // This preloads the thumbnails in the background
                        if (!loadedImages.has(index)) {
                          const fullImg = new Image();
                          fullImg.src = getOptimizedUrl(step.imageUrl);
                        }
                      }}
                    />
                  </div>
                )}
                <div className={`mb-2 ${activeStep === index ? 'text-white' : 'text-rashmi-red'}`}>
                  {step.icon}
                </div>
                <span className="text-xs font-medium leading-tight">{step.title}</span>
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
                    width: `${(activeStep + 1) / activeProcessSteps.length * 100}%`,
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
                {Math.round((activeStep + 1) / activeProcessSteps.length * 100)}%
              </span>
            </div>
          </div>
          
          {/* Active Step Content */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${activeProcess}-${activeStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-lg"
            >
              <div className="grid md:grid-cols-2 h-full">
                {/* Image Side with Progressive Loading */}
                <div className="relative h-[350px] md:h-[450px] overflow-hidden">
                  {/* Loading placeholder removed to show cleaner image loading */}
                  
                  {/* Main image (when available) */}
                  <img 
                    src={getOptimizedUrl(activeProcessSteps[activeStep].imageUrl)}
                    alt={activeProcessSteps[activeStep].title}
                    className="w-full h-full object-contain md:object-cover"
                    loading="lazy"
                    onLoad={() => {
                      setIsImageLoaded(true);
                      setImageError(false);
                    }}
                    onError={(e) => {
                      console.error(`Failed to load image: ${activeProcessSteps[activeStep].imageUrl}`);
                      setIsImageLoaded(true);
                      setImageError(true);
                      
                      // Log the simplified URL
                      const simpleUrl = activeProcessSteps[activeStep].imageUrl.replace(/f_auto,q_auto[^/]*\/v1\//, '');
                      console.log(`Try this direct URL instead: https://res.cloudinary.com/dada5hjp3/image/upload/${simpleUrl}`);
                    }}
                    key={`${activeProcess}-${activeStep}`}
                  />
                  
                  {/* Simple error indicator without overlay */}
                  {imageError && (
                    <div className="absolute top-4 right-4">
                      <AlertCircle className="text-rashmi-red" size={24} />
                    </div>
                  )}
                </div>
                
                {/* Content Side */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-rashmi-red">
                      {activeProcessSteps[activeStep].title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {activeProcessSteps[activeStep].description}
                    </p>
                    
                    <h4 className="font-bold text-lg mb-4">Key Points:</h4>
                    <ul className="space-y-3">
                      {activeProcessSteps[activeStep].details.map((detail, idx) => (
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
                      onClick={handlePrevStep}
                      type="button"
                      className="text-sm font-medium text-rashmi-red hover:underline flex items-center gap-1"
                    >
                      ← Previous Step
                    </button>
                    <button 
                      onClick={handleNextStep}
                      type="button"
                      className="text-sm font-medium text-rashmi-red hover:underline flex items-center gap-1"
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

export default FittingsManufacturing; 