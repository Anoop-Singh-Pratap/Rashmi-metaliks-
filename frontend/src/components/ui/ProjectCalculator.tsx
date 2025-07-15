import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, Filter, Check, HelpCircle, AlertTriangle, ArrowRight, Sparkles, Award, CheckCircle } from 'lucide-react';

const ProjectCalculator: React.FC = () => {
  const [pipeSize, setPipeSize] = useState('DN 100');
  const [length, setLength] = useState(100);
  const [totalWeight, setTotalWeight] = useState(0);
  
  // Pipe Selection Guide states
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(null);
  const [selectedPressure, setSelectedPressure] = useState<string | null>(null);
  const [showGuideHighlight, setShowGuideHighlight] = useState(false);
  
  const pipeData = {
    'DN 80': { weight: 14.0 },
    'DN 100': { weight: 17.0 },
    'DN 150': { weight: 25.0 },
    'DN 200': { weight: 34.0 },
    'DN 250': { weight: 45.0 },
    'DN 300': { weight: 58.0 },
    'DN 350': { weight: 72.0 },
    'DN 400': { weight: 86.0 },
    'DN 450': { weight: 102.0 },
    'DN 500': { weight: 118.0 },
    'DN 600': { weight: 156.0 },
    'DN 700': { weight: 198.0 },
    'DN 800': { weight: 244.0 },
    'DN 900': { weight: 295.0 },
    'DN 1000': { weight: 351.0 },
    'DN 1100': { weight: 412.0 },
    'DN 1200': { weight: 477.0 },
  };
  
  // Selection guide criteria
  const applications = [
    'Water transmission', 
    'Water distribution', 
    'Sewerage systems', 
    'Industrial applications', 
    'Fire protection', 
    'Irrigation'
  ];
  
  const environments = [
    'Standard soil conditions',
    'Corrosive soil',
    'Underwater installation',
    'High traffic areas',
    'Earthquake-prone areas'
  ];
  
  const pressureRequirements = [
    'Low (< 10 bar)',
    'Medium (10-25 bar)',
    'High (25-40 bar)',
    'Very high (> 40 bar)'
  ];
  
  useEffect(() => {
    if (pipeData[pipeSize as keyof typeof pipeData]) {
      const weight = pipeData[pipeSize as keyof typeof pipeData].weight * length;
      setTotalWeight(weight);
    }
  }, [pipeSize, length]);
  
  // Function to get pipe recommendation based on selected criteria
  const getPipeRecommendation = () => {
    if (!selectedApplication || !selectedEnvironment || !selectedPressure) {
      return null;
    }
    
    // Simple recommendation logic based on selected criteria
    if (selectedApplication === 'Water transmission' || selectedApplication === 'Sewerage systems') {
      if (selectedPressure === 'High (25-40 bar)' || selectedPressure === 'Very high (> 40 bar)') {
        if (selectedEnvironment === 'Corrosive soil' || selectedEnvironment === 'Underwater installation') {
          return 'DN 300 to DN 700 with K9 class, special coating and PE sleeving';
        }
        return 'DN 300 to DN 700 with K9 class';
      } else if (selectedPressure === 'Medium (10-25 bar)') {
        if (selectedEnvironment === 'Earthquake-prone areas') {
          return 'DN 200 to DN 500 with K7 or C30 class with flexible joints';
        }
        return 'DN 200 to DN 500 with K7 or C30 class';
      } else {
        return 'DN 150 to DN 400 with K7 or C25 class';
      }
    } else if (selectedApplication === 'Water distribution' || selectedApplication === 'Irrigation') {
      if (selectedPressure === 'High (25-40 bar)') {
        return 'DN 150 to DN 400 with C40 class';
      } else if (selectedPressure === 'Medium (10-25 bar)') {
        return 'DN 100 to DN 300 with C30 class';
      } else {
        return 'DN 80 to DN 200 with C25 class';
      }
    } else if (selectedApplication === 'Industrial applications') {
      if (selectedEnvironment === 'Corrosive soil') {
        return 'DN 200 to DN 600 with special coating and PE sleeving';
      } else if (selectedPressure === 'Very high (> 40 bar)') {
        return 'DN 200 to DN 500 with C40 or K9 class';
      } else {
        return 'DN 150 to DN 400 with K7 or C30 class';
      }
    } else if (selectedApplication === 'Fire protection') {
      return 'DN 100 to DN 300 with C30 class';
    }
    
    return 'DN 150 with C30 class (general purpose)';
  };
  
  const recommendation = getPipeRecommendation();
  
  // Trigger animation for the guide section
  useEffect(() => {
    if (selectedApplication || selectedEnvironment || selectedPressure) {
      setShowGuideHighlight(true);
      const timer = setTimeout(() => setShowGuideHighlight(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedApplication, selectedEnvironment, selectedPressure]);
  
  // Get pipe class details
  const getPipeClassDetails = () => {
    if (!recommendation) return null;
    
    if (recommendation.includes('K9')) {
      return {
        class: 'K9',
        description: 'Highest strength class, suitable for high pressure and severe conditions.',
        advantages: ['Maximum pressure capacity', 'Excellent for challenging environments', 'Superior mechanical properties']
      };
    } else if (recommendation.includes('K7')) {
      return {
        class: 'K7',
        description: 'Standard class with good pressure rating for general applications.',
        advantages: ['Good balance of strength and cost', 'Suitable for most standard installations', 'Widely used in water distribution']
      };
    } else if (recommendation.includes('C40')) {
      return {
        class: 'C40',
        description: 'High pressure class with excellent tensile strength (40,000 psi).',
        advantages: ['High pressure capacity', 'Ideal for industrial applications', 'Good for areas with pressure fluctuations']
      };
    } else if (recommendation.includes('C30')) {
      return {
        class: 'C30',
        description: 'Medium pressure class with good tensile strength (30,000 psi).',
        advantages: ['Good pressure handling', 'Cost-effective solution', 'Versatile for many applications']
      };
    } else if (recommendation.includes('C25')) {
      return {
        class: 'C25',
        description: 'Standard pressure class with adequate tensile strength (25,000 psi).',
        advantages: ['Economical solution', 'Sufficient for standard installations', 'Good performance in normal conditions']
      };
    }
    
    return null;
  };
  
  const classDetails = getPipeClassDetails();
  
  return (
    <div className="bg-card dark:bg-card/90 border border-border rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-border flex items-center gap-3">
        <Calculator className="text-rashmi-red" size={24} />
        <h3 className="text-xl font-bold">Project Calculator</h3>
      </div>
      
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Pipe Size</label>
            <select 
              value={pipeSize}
              onChange={(e) => setPipeSize(e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-rashmi-red/30 focus:border-rashmi-red transition-all duration-300"
            >
              {Object.keys(pipeData).map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Pipe Length (meters)</label>
            <input 
              type="number" 
              min="1"
              value={length}
              onChange={(e) => setLength(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-rashmi-red/30 focus:border-rashmi-red transition-all duration-300"
            />
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
          <div className="bg-rashmi-dark/5 dark:bg-rashmi-red/5 p-6 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Total Pipe Weight:</p>
            <motion.div 
              key={totalWeight}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold flex items-baseline"
            >
              {totalWeight.toLocaleString()} <span className="text-base ml-1">kg</span>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp size={16} />
            <span>This is an estimate. Contact us for accurate project details.</span>
          </div>
          
          <motion.a
            href="/contact-us"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="block w-full mt-4 bg-rashmi-red hover:bg-rashmi-red/90 text-white py-4 rounded-xl font-medium transition-all duration-300 text-center"
          >
            Request Detailed Quote
          </motion.a>
        </div>
        
        {/* Pipe Selection Guide */}
        <motion.div 
          className={`mt-10 pt-6 border-t border-border ${showGuideHighlight ? 'animate-pulse' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-xl flex items-center">
              <span className="text-rashmi-red mr-2">◆</span>
              Pipe Selection Guide
            </h4>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="bg-rashmi-red/10 px-3 py-1 rounded-full flex items-center text-xs font-medium text-rashmi-red"
            >
              <Sparkles size={12} className="mr-1" />
              Interactive Tool
            </motion.div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">
            Select your project requirements below to get a personalized pipe recommendation:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Filter size={14} className="mr-1 text-rashmi-red" />
                Application Type
                {selectedApplication && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-2 text-rashmi-red"
                  >
                    <CheckCircle size={14} />
                  </motion.div>
                )}
              </label>
              <div className="relative">
                <select 
                  className="w-full p-3 pl-4 pr-10 rounded-lg border border-border bg-background focus:ring-2 focus:ring-rashmi-red/30 focus:border-rashmi-red transition-all duration-300"
                  value={selectedApplication || ''}
                  onChange={(e) => setSelectedApplication(e.target.value || null)}
                >
                  <option value="">Select application...</option>
                  {applications.map(app => (
                    <option key={app} value={app}>{app}</option>
                  ))}
                </select>
                {selectedApplication && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-rashmi-red">
                    <Check size={16} />
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Filter size={14} className="mr-1 text-rashmi-red" />
                Environment
                {selectedEnvironment && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-2 text-rashmi-red"
                  >
                    <CheckCircle size={14} />
                  </motion.div>
                )}
              </label>
              <div className="relative">
                <select 
                  className="w-full p-3 pl-4 pr-10 rounded-lg border border-border bg-background focus:ring-2 focus:ring-rashmi-red/30 focus:border-rashmi-red transition-all duration-300"
                  value={selectedEnvironment || ''}
                  onChange={(e) => setSelectedEnvironment(e.target.value || null)}
                >
                  <option value="">Select environment...</option>
                  {environments.map(env => (
                    <option key={env} value={env}>{env}</option>
                  ))}
                </select>
                {selectedEnvironment && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-rashmi-red">
                    <Check size={16} />
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Filter size={14} className="mr-1 text-rashmi-red" />
                Pressure Requirement
                {selectedPressure && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-2 text-rashmi-red"
                  >
                    <CheckCircle size={14} />
                  </motion.div>
                )}
              </label>
              <div className="relative">
                <select 
                  className="w-full p-3 pl-4 pr-10 rounded-lg border border-border bg-background focus:ring-2 focus:ring-rashmi-red/30 focus:border-rashmi-red transition-all duration-300"
                  value={selectedPressure || ''}
                  onChange={(e) => setSelectedPressure(e.target.value || null)}
                >
                  <option value="">Select pressure...</option>
                  {pressureRequirements.map(pressure => (
                    <option key={pressure} value={pressure}>{pressure}</option>
                  ))}
                </select>
                {selectedPressure && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-rashmi-red">
                    <Check size={16} />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {recommendation ? (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-rashmi-red/10 to-rashmi-red/5 dark:from-rashmi-red/20 dark:to-rashmi-red/10 border border-rashmi-red/30 rounded-xl p-6"
                >
                  <div className="flex items-start">
                    <div className="bg-white dark:bg-rashmi-dark/80 p-3 rounded-full mr-4 shadow-lg">
                      <Award className="text-rashmi-red h-8 w-8" />
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-2 flex items-center">
                        Recommended Pipe Solution
                        <motion.span 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="ml-2 text-xs bg-rashmi-red text-white px-2 py-0.5 rounded-full"
                        >
                          Perfect Match
                        </motion.span>
                      </h5>
                      <p className="text-lg font-medium">{recommendation}</p>
                      
                      {classDetails && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="mt-4 pt-4 border-t border-rashmi-red/20"
                        >
                          <div className="flex items-center mb-2">
                            <span className="bg-rashmi-red/10 text-rashmi-red font-medium px-3 py-1 rounded-lg text-sm">
                              Class {classDetails.class}
                            </span>
                          </div>
                          <p className="text-sm mb-3">{classDetails.description}</p>
                          <div>
                            <h6 className="text-sm font-medium mb-2">Key Advantages:</h6>
                            <ul className="space-y-1">
                              {classDetails.advantages.map((adv, i) => (
                                <motion.li 
                                  key={i}
                                  initial={{ opacity: 0, x: -5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.4 + (i * 0.1) }}
                                  className="flex items-start text-sm"
                                >
                                  <Check size={14} className="text-rashmi-red mr-2 mt-1 flex-shrink-0" />
                                  <span>{adv}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row sm:justify-between items-center pt-4 border-t border-rashmi-red/20">
                    <p className="text-xs text-muted-foreground mb-3 sm:mb-0">
                      <span className="font-medium">Note:</span> This is a general recommendation. Please consult with our engineering team for specific project requirements.
                    </p>
                    <motion.a
                      href="/contact-us"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center text-sm text-rashmi-red font-medium"
                    >
                      Speak to our engineers <ArrowRight size={14} className="ml-1" />
                    </motion.a>
                  </div>
                </motion.div>
                
                <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 rounded-lg p-4 flex items-start">
                  <AlertTriangle className="text-amber-600 dark:text-amber-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <h6 className="font-medium text-amber-800 dark:text-amber-400 mb-1">Key Advantages of DI Pipes</h6>
                    <ul className="text-xs text-amber-800 dark:text-amber-400 space-y-1">
                      <li>• High corrosion resistance with special coatings</li>
                      <li>• Excellent hydraulic flow capacity</li>
                      <li>• High tensile strength and ductility</li>
                      <li>• Service life of up to 100 years</li>
                      <li>• Available in sizes DN 80 to DN 1200</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-muted/30 border border-border rounded-xl p-6 flex items-start"
              >
                <HelpCircle className="text-muted-foreground mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-medium mb-1">Make Your Selection</h5>
                  <p className="text-sm">Please select all criteria above to get a pipe recommendation tailored to your project needs.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectCalculator; 