import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Filter, HelpCircle, AlertTriangle } from 'lucide-react';

const SpecComparisonTool: React.FC = () => {
  const [selectedSizes, setSelectedSizes] = useState(['DN 100', 'DN 200']);
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(null);
  const [selectedPressure, setSelectedPressure] = useState<string | null>(null);
  
  const pipeSpecs = {
    'DN 80': { diameter: 98, thickness: 6.0, weight: 14.0, flow: 11.2 },
    'DN 100': { diameter: 118, thickness: 6.0, weight: 17.0, flow: 19.7 },
    'DN 150': { diameter: 170, thickness: 6.0, weight: 25.0, flow: 47.3 },
    'DN 200': { diameter: 222, thickness: 6.3, weight: 34.0, flow: 86.6 },
    'DN 250': { diameter: 274, thickness: 6.8, weight: 45.0, flow: 142.8 },
    'DN 300': { diameter: 326, thickness: 7.2, weight: 58.0, flow: 212.4 },
    'DN 350': { diameter: 378, thickness: 7.7, weight: 72.0, flow: 295.2 },
    'DN 400': { diameter: 429, thickness: 8.1, weight: 86.0, flow: 384.5 },
    'DN 450': { diameter: 480, thickness: 8.6, weight: 102.0, flow: 487.5 },
    'DN 500': { diameter: 532, thickness: 9.0, weight: 118.0, flow: 601.5 },
    'DN 600': { diameter: 635, thickness: 9.9, weight: 156.0, flow: 862.4 },
    'DN 700': { diameter: 738, thickness: 10.8, weight: 198.0, flow: 1178.5 },
    'DN 800': { diameter: 842, thickness: 11.7, weight: 244.0, flow: 1540.0 },
    'DN 900': { diameter: 945, thickness: 12.6, weight: 295.0, flow: 1950.0 },
    'DN 1000': { diameter: 1048, thickness: 13.5, weight: 351.0, flow: 2410.0 },
    'DN 1100': { diameter: 1152, thickness: 14.4, weight: 412.0, flow: 2920.0 },
    'DN 1200': { diameter: 1255, thickness: 15.3, weight: 477.0, flow: 3470.0 },
  };
  
  // Applications for different pipe sizes based on the provided data
  const recommendedUses = {
    'DN 80': ['Small residential water distribution', 'Irrigation systems', 'Industrial connections', 'Fire hydrant systems'],
    'DN 100': ['Residential water distribution', 'Commercial plumbing systems', 'Small industrial applications', 'Fire protection systems'],
    'DN 150': ['Municipal water distribution', 'Medium industrial applications', 'Sewerage systems', 'Stormwater drainage'],
    'DN 200': ['Main water transmission lines', 'Large commercial buildings', 'Industrial plants', 'Sewage treatment facilities'],
    'DN 250': ['Water transmission mains', 'Medium sewerage systems', 'Industrial effluent lines', 'City infrastructure'],
    'DN 300': ['Major water transmission lines', 'Large industrial applications', 'Main sewerage lines', 'City-wide water distribution'],
    'DN 350': ['Major water transmission', 'Large urban infrastructure', 'Industrial cooling systems', 'Wastewater treatment plants'],
    'DN 400': ['Main transmission lines', 'Major urban water supply', 'Industrial water systems', 'Large sewage applications'],
    'DN 450': ['Inter-city water transmission', 'Major industrial applications', 'Large sewage systems', 'Flood control systems'],
    'DN 500': ['Regional water transmission', 'Power plant applications', 'Major sewerage trunks', 'Large-scale water projects'],
    'DN 600': ['Long-distance water transmission', 'Major industrial applications', 'Large sewage outfalls', 'Dam water systems'],
    'DN 700': ['Inter-regional water transmission', 'Major industrial cooling', 'Large-scale waste management', 'Reservoir connections'],
    'DN 800': ['Main water transmission', 'Large industrial installations', 'Major sewerage outfalls', 'Dam to treatment connections'],
    'DN 900': ['Major water transmission lines', 'Power station cooling systems', 'Large-scale water management', 'Inter-basin transfers'],
    'DN 1000': ['Large-scale water projects', 'Major industrial installations', 'Inter-regional transmission', 'Major infrastructure projects'],
    'DN 1100': ['Major water supply infrastructure', 'Large industrial cooling systems', 'Major water management projects', 'Inter-regional water supply'],
    'DN 1200': ['Major infrastructure projects', 'Large-scale water transmission', 'Main regional supply lines', 'Major urban water systems']
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
  
  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else if (selectedSizes.length < 3) {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  
  // Function to get pipe recommendation based on selected criteria
  const getPipeRecommendation = () => {
    if (!selectedApplication || !selectedEnvironment || !selectedPressure) {
      return null;
    }
    
    // Simple recommendation logic based on selected criteria
    if (selectedApplication === 'Water transmission' || selectedApplication === 'Sewerage systems') {
      if (selectedPressure === 'High (25-40 bar)' || selectedPressure === 'Very high (> 40 bar)') {
        return 'DN 300 or larger with K9 class';
      } else if (selectedPressure === 'Medium (10-25 bar)') {
        return 'DN 200 or DN 300 with K7 or C30 class';
      } else {
        return 'DN 150 or DN 200 with K7 or C25 class';
      }
    } else if (selectedApplication === 'Water distribution' || selectedApplication === 'Irrigation') {
      if (selectedPressure === 'High (25-40 bar)') {
        return 'DN 150 or DN 200 with C40 class';
      } else if (selectedPressure === 'Medium (10-25 bar)') {
        return 'DN 100 or DN 150 with C30 class';
      } else {
        return 'DN 80 or DN 100 with C25 class';
      }
    } else if (selectedApplication === 'Industrial applications') {
      if (selectedEnvironment === 'Corrosive soil') {
        return 'DN 200 or DN 300 with special coating and PE sleeving';
      } else if (selectedPressure === 'Very high (> 40 bar)') {
        return 'DN 200 or larger with C40 or K9 class';
      } else {
        return 'DN 150 or DN 200 with K7 or C30 class';
      }
    } else if (selectedApplication === 'Fire protection') {
      return 'DN 100 or DN 150 with C30 class';
    }
    
    return 'DN 150 with C30 class (general purpose)';
  };
  
  const recommendation = getPipeRecommendation();
  
  return (
    <div className="bg-card dark:bg-card/80 border border-border rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Compare Pipe Specifications</h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(pipeSpecs).map(size => (
          <button
            key={size}
            onClick={() => handleSizeToggle(size)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
              selectedSizes.includes(size) 
                ? 'bg-rashmi-red text-white' 
                : 'bg-card dark:bg-rashmi-dark/30 border border-border hover:bg-rashmi-red/10'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-rashmi-dark/10 dark:bg-rashmi-red/20 text-left">
              <th className="p-3 border border-border rounded-tl-lg">Property</th>
              {selectedSizes.map(size => (
                <th key={size} className="p-3 border border-border">
                  {size}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-border font-medium">Outside Diameter (mm)</td>
              {selectedSizes.map(size => (
                <td key={size} className="p-3 border border-border">
                  {pipeSpecs[size as keyof typeof pipeSpecs].diameter}
                </td>
              ))}
            </tr>
            <tr className="bg-rashmi-dark/5 dark:bg-rashmi-red/5">
              <td className="p-3 border border-border font-medium">Wall Thickness (mm)</td>
              {selectedSizes.map(size => (
                <td key={size} className="p-3 border border-border">
                  {pipeSpecs[size as keyof typeof pipeSpecs].thickness}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 border border-border font-medium">Weight (kg/m)</td>
              {selectedSizes.map(size => (
                <td key={size} className="p-3 border border-border">
                  {pipeSpecs[size as keyof typeof pipeSpecs].weight}
                </td>
              ))}
            </tr>
            <tr className="bg-rashmi-dark/5 dark:bg-rashmi-red/5">
              <td className="p-3 border border-border font-medium">Flow Capacity (L/s)</td>
              {selectedSizes.map(size => (
                <td key={size} className="p-3 border border-border">
                  {pipeSpecs[size as keyof typeof pipeSpecs].flow}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Recommended Uses Section */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="font-medium mb-4 flex items-center">
          <span className="text-rashmi-red mr-2">◆</span>
          Recommended Uses
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-rashmi-dark/10 dark:bg-rashmi-red/10 text-left">
                <th className="p-3 border border-border rounded-tl-lg">Pipe Size</th>
                <th className="p-3 border border-border rounded-tr-lg">Ideal Applications</th>
              </tr>
            </thead>
            <tbody>
              {selectedSizes.map(size => (
                <tr key={size} className="hover:bg-rashmi-red/5 transition-colors duration-200">
                  <td className="p-3 border border-border font-medium">{size}</td>
                  <td className="p-3 border border-border">
                    <ul className="list-disc pl-5 space-y-1">
                      {recommendedUses[size as keyof typeof recommendedUses].map((use, index) => (
                        <li key={index} className="text-sm">{use}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SpecComparisonTool; 