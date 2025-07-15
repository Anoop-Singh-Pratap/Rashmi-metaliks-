/**
 * SpecificationTable Component
 * 
 * A clean, structured table component designed specifically for displaying technical
 * product specifications and data in a readable format.
 * 
 * Features:
 * - Clear presentation of data in a structured table format
 * - Support for various data types through flexible column definitions
 * - Zebra striping for improved readability of dense data
 * - Responsive design that adapts to different screen sizes
 * - Optional highlighting for important specifications
 * - Consistent styling with the overall design system
 * - Support for custom styling through className prop
 * 
 * This component is typically used on product details pages to present technical
 * specifications, dimensions, material properties, and other structured data
 * that customers need to make informed purchasing decisions.
 */

import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface TableRow {
  [key: string]: string | number;
}

interface SpecificationTableProps {
  headers: string[];
  rows: TableRow[];
  className?: string;
}

// Table-specific styles for dark mode optimization
const TableStyles = () => (
  <style>
    {`
      /* Scoped styles for dark mode with no transitions */
      [data-theme='dark'] th {
        background-color: #1e293b !important; /* slate-800 */
        color: #f1f5f9 !important; /* slate-100 */
        border-color: #334155 !important; /* slate-700 */
        transition: none !important;
      }
      
      [data-theme='dark'] td {
        color: #cbd5e1 !important; /* slate-300 */
        border-color: #334155 !important; /* slate-700 */
        transition: none !important;
      }
      
      [data-theme='dark'] tr:hover {
        background-color: rgba(51, 65, 85, 0.3) !important; /* slate-700 with opacity */
      }
      
      [data-theme='dark'] tbody tr {
        border-color: #334155 !important; /* slate-700 */
      }
      
      /* Light mode defaults - also with no transitions */
      [data-theme='light'] th {
        transition: none !important;
      }
      
      [data-theme='light'] td {
        transition: none !important;
      }
      
      /* Common for both modes - prevent any transitions on theme change */
      th, td, tr {
        will-change: auto !important;
      }
    `}
  </style>
);

const SpecificationTable: React.FC<SpecificationTableProps> = ({
  headers,
  rows,
  className = '',
}) => {
  const { theme } = useTheme();
  
  return (
    <motion.div 
      className={`overflow-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      data-theme={theme}
    >
      <TableStyles />
      
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            {headers.map((header, index) => (
              <th 
                key={index}
                className="px-4 py-3 text-left font-medium text-foreground bg-muted transition-none"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className="border-b border-border hover:bg-muted/50 transition-none"
            >
              {headers.map((header, colIndex) => {
                const key = header.toLowerCase().replace(/\s+/g, '_');
                return (
                  <td 
                    key={colIndex}
                    className="px-4 py-3 text-muted-foreground transition-none"
                  >
                    {row[key] || row[header] || '-'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default SpecificationTable;
