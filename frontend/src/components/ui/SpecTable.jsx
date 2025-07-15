import React, { useState, useEffect, useRef, memo } from 'react';
import { Table, Badge, Tooltip, ConfigProvider, theme as antdTheme } from 'antd';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

// Optimization styles for the table with improved specificity and fewer !important declarations
const TableDarkModeStyles = memo(() => (
  <style>
    {`
      /* Theme-specific styles with higher specificity selectors */
      .spec-table .ant-table {
        background-color: transparent;
        transition: background-color 0.2s ease;
      }
      
      html.dark .spec-table .ant-table {
        background-color: #1e293b;
      }
      
      html.dark .spec-table .ant-table-thead > tr > th {
        background-color: #334155;
        color: #f1f5f9;
        border-color: #475569;
      }
      
      html.dark .spec-table .ant-table-tbody > tr > td {
        color: #cbd5e1;
        border-color: #475569;
        background-color: #1e293b;
      }
      
      html.dark .spec-table .ant-table-tbody > tr.ant-table-row:hover > td {
        background-color: rgba(71, 85, 105, 0.5);
      }
      
      /* Light mode styles with higher specificity */
      html.light .spec-table .ant-table-thead > tr > th {
        background-color: #f1f5f9;
        color: #1e293b;
        border-color: #e2e8f0;
      }
      
      html.light .spec-table .ant-table-tbody > tr > td {
        background-color: white;
        color: #334155;
        border-color: #e2e8f0;
      }
      
      html.light .spec-table .ant-table-tbody > tr.ant-table-row:hover > td {
        background-color: #f8fafc;
      }
      
      /* General overrides to prevent any transitions */
      .ant-table, 
      .ant-table-container, 
      .ant-table-content,
      .ant-table-thead > tr > th,
      .ant-table-tbody > tr > td,
      .ant-table-tbody > tr,
      .ant-table-wrapper,
      .ant-table *::before,
      .ant-table *::after {
        transition: none !important;
        animation: none !important;
      }
      
      /* Tab switching optimization - prevent layout shifts */
      .spec-table {
        contain: content;
        will-change: contents;
        backface-visibility: hidden;
      }
      
      /* Prevent all Ant Design transitions during theme change */
      .theme-changing .ant-table,
      .theme-changing .ant-table * {
        transition: none !important;
        animation: none !important;
      }
      
      /* Prevent hover effect transitions */
      .ant-table-tbody > tr.ant-table-row:hover > td {
        transition: none !important;
      }
    `}
  </style>
));

// Memoized column renderer
const CellRenderer = memo(({ text, isHighlighted, tooltip, title }) => (
  <Tooltip title={tooltip ? `${title}: ${text}` : null} mouseEnterDelay={0.5}>
    <div className="transition-none">
      {text}
      {isHighlighted && <Badge color="#E53935" className="ml-1" />}
    </div>
  </Tooltip>
));

// Main component - now using memo to prevent unnecessary re-renders
export const SpecTable = memo(({ data, columns, title, className }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const { theme } = useTheme();
  const tableRef = useRef(null);

  // Force theme update on theme change
  useEffect(() => {
    if (tableRef.current) {
      // Force a re-paint on theme change
      tableRef.current.style.display = 'none';
      // This forces a reflow
      void tableRef.current.offsetHeight;
      tableRef.current.style.display = '';
    }
  }, [theme]);
  
  // Pre-process columns only once - great optimization for tab switching
  const enhancedColumns = React.useMemo(() => columns.map(column => ({
    ...column,
    render: (text, record) => {
      // Safely parse numbers with a fallback
      const numericValue = typeof text === 'string' ? parseInt(text, 10) : null;
      
      // Highlight cells for the high pressure or important values
      const isHighlighted = 
        (column.dataIndex === 'high_pressure' && numericValue !== null && numericValue > 50) || 
        (column.dataIndex === 'deflection' && numericValue !== null && numericValue >= 4);
      
      return (
        <CellRenderer 
          text={text} 
          isHighlighted={isHighlighted} 
          tooltip={column.tooltip} 
          title={column.title}
        />
      );
    }
  })), [columns]);

  // Preprocess data to avoid doing it during rendering
  const processedData = React.useMemo(() => data.map((item, index) => ({
    ...item,
    key: index.toString(),
  })), [data]);

  const configProviderTheme = React.useMemo(() => ({
    algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      motion: false,
      colorBgContainer: theme === 'dark' ? '#1e293b' : '#ffffff',
      colorBorderSecondary: theme === 'dark' ? '#475569' : '#e2e8f0',
      colorText: theme === 'dark' ? '#cbd5e1' : '#334155',
    },
  }), [theme]);

  // The onRow prop is stable now
  const getRowProps = React.useCallback((record) => ({
    onMouseEnter: () => setHoveredRow(record.key),
    onMouseLeave: () => setHoveredRow(null),
    style: { transition: 'none' }
  }), []);

  return (
    <ConfigProvider theme={configProviderTheme}>
      <div
        ref={tableRef}
        className={cn(
          "overflow-hidden rounded-lg border border-border dark:border-slate-700 shadow-md", 
          className
        )}
        style={{ transition: 'none', contain: 'content' }}
        data-theme={theme}
      >
        <TableDarkModeStyles />
        
        {title && (
          <div className="py-3 px-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700" style={{ transition: 'none' }}>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100" style={{ transition: 'none' }}>{title}</h3>
          </div>
        )}
        
        <div className={`spec-table ${theme}`}>
          <Table
            dataSource={processedData}
            columns={enhancedColumns}
            pagination={false}
            size="middle"
            onRow={getRowProps}
            className="transition-none"
          />
        </div>
      </div>
    </ConfigProvider>
  );
});

export const transformDimensionsData = (data) => {
  const columns = [
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      fixed: 'left',
      width: 100,
    },
    {
      title: 'PFA - Water/Sewerage',
      dataIndex: 'water_sewerage',
      key: 'water_sewerage',
      tooltip: true,
    },
    {
      title: 'PFA - High Pressure',
      dataIndex: 'high_pressure',
      key: 'high_pressure',
      tooltip: true,
    },
    {
      title: 'Allowable Angular Deflection (°)',
      dataIndex: 'deflection',
      key: 'deflection',
      tooltip: true,
    },
    {
      title: 'No. of Locks',
      dataIndex: 'locks',
      key: 'locks',
    },
  ];

  return {
    columns,
    data: data.map((item, index) => ({
      key: index.toString(),
      size: item.size,
      water_sewerage: item.water_sewerage,
      high_pressure: item.high_pressure,
      deflection: item.deflection,
      locks: item.locks,
    })),
  };
};

export const transformPipeDimensionsData = (data) => {
  const columns = [
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      fixed: 'left',
      width: 100,
    },
    {
      title: 'DE',
      dataIndex: 'de',
      key: 'de',
      tooltip: true,
    },
    {
      title: 'Water/Sewerage',
      dataIndex: 'water_sewerage',
      key: 'water_sewerage',
      tooltip: true,
    },
    {
      title: 'High Pressure',
      dataIndex: 'high_pressure',
      key: 'high_pressure',
      tooltip: true,
    },
    {
      title: 'P1',
      dataIndex: 'p1',
      key: 'p1',
    },
    {
      title: 'WL',
      dataIndex: 'wl',
      key: 'wl',
    },
  ];

  return {
    columns,
    data: data.map((item, index) => ({
      key: index.toString(),
      size: item.size,
      de: item.de,
      water_sewerage: item.water_sewerage,
      high_pressure: item.high_pressure,
      p1: item.p1,
      wl: item.wl,
    })),
  };
}; 