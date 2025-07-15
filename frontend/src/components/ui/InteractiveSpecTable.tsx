/**
 * InteractiveSpecTable Component
 * 
 * An enhanced, interactive data table specifically designed for displaying
 * technical specifications with visual indicators and animations.
 * 
 * Features:
 * - Tab-based navigation between different spec categories (sockets, flanges, bends)
 * - Interactive row highlighting on hover
 * - Visual data representation with colored bars for numeric values
 * - Animated data changes and transitions between views
 * - Responsive design that adapts to different screen sizes
 * - Automatic calculation of proportional value indicators
 * - Support for various data types through the TableRow interface
 * 
 * This component is particularly useful for product specification pages where
 * technical data needs to be presented in an engaging and readable format,
 * making it easier for users to compare different specifications.
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TableRow {
  [key: string]: string | number;
}

interface InteractiveSpecTableProps {
  data: {
    sockets?: TableRow[];
    flanges?: TableRow[];
    bends?: TableRow[];
  };
  className?: string;
}

const InteractiveSpecTable: React.FC<InteractiveSpecTableProps> = ({
  data,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'sockets' | 'flanges' | 'bends'>('sockets');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [animateValue, setAnimateValue] = useState<boolean>(false);

  // Helper to determine max value in a column for visual scaling
  const getMaxValue = (rows: TableRow[], key: string): number => {
    const maxVal = Math.max(...rows.map(row => typeof row[key] === 'number' ? Number(row[key]) : 0));
    return maxVal || 1; // Avoid division by zero
  };

  // Get the headers for the active tab
  const getHeaders = () => {
    if (!data[activeTab] || data[activeTab]?.length === 0) return [];

    return Object.keys(data[activeTab]![0]).map(key => {
      const formattedKey = key.replace(/_/g, ' ');
      return formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
    });
  };

  // Animation variants
  const tabVariants = {
    inactive: { backgroundColor: "hsl(var(--muted)/50)", color: "hsl(var(--foreground))" },
    active: { backgroundColor: "hsl(var(--rashmi-red))", color: "hsl(var(--primary-foreground))" }
  };

  const tableVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  const barVariants = {
    initial: { width: 0 },
    animate: (width: number) => ({
      width: `${width}px`,
      transition: { duration: 0.8, ease: "easeOut" }
    })
  };

  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    hover: { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }
  };

  // Trigger value animation on tab change
  React.useEffect(() => {
    setAnimateValue(false);
    const timer = setTimeout(() => setAnimateValue(true), 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className={`${className}`}>
      {/* Tab Navigation */}
      <motion.div 
        className="flex flex-wrap gap-2 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={() => setActiveTab('sockets')}
          variants={tabVariants}
          animate={activeTab === 'sockets' ? 'active' : 'inactive'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-md transition-all duration-300"
        >
          Sockets
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('flanges')}
          variants={tabVariants}
          animate={activeTab === 'flanges' ? 'active' : 'inactive'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-md transition-all duration-300"
        >
          Flanges
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('bends')}
          variants={tabVariants}
          animate={activeTab === 'bends' ? 'active' : 'inactive'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-md transition-all duration-300"
        >
          Bends
        </motion.button>
      </motion.div>

      {/* Table Content */}
      <motion.div
        key={activeTab}
        variants={tableVariants}
        initial="hidden"
        animate="visible"
        className="overflow-x-auto"
      >
        {data[activeTab] && data[activeTab]!.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <table className="w-full border-collapse text-sm hidden md:table">
              <thead>
                <tr className="border-b border-border bg-muted">
                  {getHeaders().map((header, index) => (
                    <th 
                      key={index}
                      className="px-4 py-3 text-left font-medium text-foreground"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data[activeTab]!.map((row, rowIndex) => (
                  <motion.tr 
                    key={rowIndex}
                    onMouseEnter={() => setHoveredRow(rowIndex)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`border-b border-border transition-colors ${
                      hoveredRow === rowIndex ? 'bg-muted/70' : 'hover:bg-muted/50'
                    }`}
                  >
                    {Object.entries(row).map(([key, value], colIndex) => {
                      // For special columns that should have visual indicators
                      const isNumericCol = typeof value === 'number';
                      const isSpecialVisualCol = isNumericCol && 
                        (key.includes('weight') || key.includes('diameter') || 
                         key.includes('outside_diameter'));
                      
                      const maxValue = isNumericCol && data[activeTab] 
                        ? getMaxValue(data[activeTab]!, key) 
                        : 1;
                      
                      const barWidth = Math.max(20, (Number(value) / maxValue) * 80);
                      
                      return (
                        <td 
                          key={`${rowIndex}-${colIndex}`}
                          className="px-4 py-3 text-muted-foreground"
                        >
                          {isSpecialVisualCol ? (
                            <div className="flex items-center gap-2">
                              <motion.span 
                                className={hoveredRow === rowIndex ? 'font-medium text-foreground' : ''}
                                initial={{ scale: 1 }}
                                animate={animateValue ? { scale: [0.8, 1.2, 1] } : { scale: 1 }}
                                transition={{ duration: 0.5 }}
                              >
                                {value}
                              </motion.span>
                              <motion.div 
                                className="h-2 bg-rashmi-red/30 rounded-full transition-all"
                                variants={barVariants}
                                initial="initial"
                                animate={animateValue ? "animate" : "initial"}
                                custom={barWidth}
                                style={{ 
                                  opacity: hoveredRow === rowIndex ? 0.8 : 0.4
                                }}
                              />
                            </div>
                          ) : (
                            <motion.span 
                              className={hoveredRow === rowIndex ? 'font-medium text-foreground' : ''}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: colIndex * 0.05 }}
                            >
                              {value || '-'}
                            </motion.span>
                          )}
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {data[activeTab]!.map((row, rowIndex) => (
                <motion.div
                  key={rowIndex}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  transition={{ duration: 0.3, delay: rowIndex * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4 space-y-3 text-foreground shadow-sm"
                >
                  {Object.entries(row).map(([key, value], colIndex) => {
                    const header = key.replace(/_/g, ' ');
                    const formattedHeader = header.charAt(0).toUpperCase() + header.slice(1);
                    
                    const isNumericCol = typeof value === 'number';
                    const isSpecialVisualCol = isNumericCol && 
                      (key.includes('weight') || key.includes('diameter') || 
                       key.includes('outside_diameter'));
                    
                    return (
                      <div key={`mobile-${rowIndex}-${colIndex}`} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{formattedHeader}:</span>
                        {isSpecialVisualCol ? (
                          <motion.span 
                            className="font-medium text-rashmi-red"
                            initial={{ scale: 1 }}
                            animate={animateValue ? { scale: [0.8, 1.2, 1] } : { scale: 1 }}
                            transition={{ duration: 0.5, delay: colIndex * 0.05 }}
                          >
                            {value}
                          </motion.span>
                        ) : (
                          <motion.span 
                            className="font-medium text-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: colIndex * 0.05 }}
                          >
                            {value || '-'}
                          </motion.span>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <motion.div 
            className="text-center p-8 bg-muted/30 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-muted-foreground">No data available for this category</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default InteractiveSpecTable;
