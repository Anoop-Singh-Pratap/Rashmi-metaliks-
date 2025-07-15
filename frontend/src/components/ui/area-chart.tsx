/**
 * AreaChart Component
 * 
 * A specialized chart component built on Recharts that visualizes time-series 
 * or continuous data with filled areas below the line.
 * 
 * Features:
 * - Smooth gradient fills for visual appeal
 * - Interactive tooltips showing detailed data on hover
 * - Customizable colors and styles for different data series
 * - Responsive design that adapts to container size
 * - Support for multiple data series in the same chart
 * - Optional time range selection for filtering data
 * - Custom legend with interactive elements
 * - Title and description support for context
 * - Proper date/time formatting for axis labels
 * - Dark mode support for all elements
 * - Dynamic water-like flowing animations
 * 
 * This component is particularly useful for visualizing trends over time,
 * showing cumulative values, or comparing multiple related metrics. Commonly
 * used for sales data, website traffic, resource usage, or other time-based metrics.
 */
import React, { useEffect, useState } from "react";
import { Area, AreaChart as RechartsAreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, LegendProps } from "recharts";

interface AreaChartProps {
  data: any[];
  config: {
    [key: string]: {
      label: string;
      color: string;
    };
  };
  height?: number | string;
  className?: string;
  title?: string;
  description?: string;
  timeRanges?: { label: string; value: string }[];
  onTimeRangeChange?: (value: string) => void;
  selectedTimeRange?: string;
}

export const AreaChart = ({
  data,
  config,
  height = 300,
  className = "",
  title,
  description,
}: AreaChartProps) => {
  const chartKeys = Object.keys(config).filter(key => key !== "label");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  
  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    // Initial check
    checkDarkMode();
    
    // Set up a MutationObserver to detect class changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  // Trigger animation sequence
  useEffect(() => {
    // Delay animation start to create a more noticeable effect
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const renderGradients = () => {
    return chartKeys.map((key) => (
      <linearGradient key={`gradient-${key}`} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
        <stop
          offset="5%"
          stopColor={config[key].color}
          stopOpacity={0.8}
        />
        <stop
          offset="95%"
          stopColor={config[key].color}
          stopOpacity={0.1}
        />
      </linearGradient>
    ));
  };

  // Create a shimmer effect gradient for animation
  const renderAnimationGradients = () => {
    return chartKeys.map((key) => (
      <linearGradient key={`animate-${key}`} id={`animate${key}`} x1="0" y1="0" x2="1" y2="0">
        <stop
          offset="0%"
          stopColor={config[key].color}
          stopOpacity={0.4}
        >
          <animate 
            attributeName="offset" 
            values="0;1" 
            dur="3s" 
            repeatCount="indefinite"
          />
        </stop>
        <stop
          offset="50%"
          stopColor={config[key].color}
          stopOpacity={0.8}
        >
          <animate 
            attributeName="offset" 
            values="0;1" 
            dur="3s" 
            repeatCount="indefinite"
          />
        </stop>
        <stop
          offset="100%"
          stopColor={config[key].color}
          stopOpacity={0.4}
        >
          <animate 
            attributeName="offset" 
            values="0;1" 
            dur="3s" 
            repeatCount="indefinite"
          />
        </stop>
      </linearGradient>
    ));
  };

  const formatDateTick = (value: string) => {
    if (!value) return "";
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatTooltipLabel = (value: string) => {
    return formatDateTick(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded shadow-md">
          <p className="text-sm font-medium mb-1">{formatTooltipLabel(label)}</p>
          {payload.map((entry: any, index: number) => (
            <div className="flex items-center" key={`item-${index}`}>
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <p className="text-sm text-muted-foreground">
                {config[entry.dataKey]?.label}: {entry.value}%
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom formatter for the legend
  const CustomizedLegend = (props: LegendProps) => {
    const { payload } = props;
    if (!payload) return null;
    
    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-2">
        {payload.map((entry, index) => {
          const dataKey = entry.dataKey as string;
          if (!dataKey || !config[dataKey]) return null;
          
          return (
            <li key={`item-${index}`} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: config[dataKey].color }}
              ></div>
              <span className="text-sm text-foreground">{config[dataKey].label}</span>
            </li>
          );
        })}
      </ul>
    );
  };
  
  // Get text color based on current mode
  const getTextColor = () => {
    return isDarkMode ? '#ffffff' : '#000000';
  };

  return (
    <div className={`w-full rounded-xl overflow-hidden ${className}`}>
      {(title || description) && (
        <div className="mb-4 text-left">
          {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      
      <div style={{ height }} className="transition-all duration-1000 ease-in-out">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart 
            data={data} 
            margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
            className="transform transition-all duration-700 ease-in-out"
          >
            <defs>
              {renderGradients()}
              {renderAnimationGradients()}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} opacity={0.3} vertical={false} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDateTick}
              axisLine={false}
              tickLine={false}
              tick={{ fill: getTextColor(), fontSize: 12 }} 
              minTickGap={30}
            />
            <YAxis 
              tickFormatter={(value) => `${value}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fill: getTextColor(), fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomizedLegend />} />
            {chartKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={config[key].color}
                fill={`url(#fill${key})`}
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0 }}
                isAnimationActive={true}
                animationBegin={index * 300}
                animationDuration={1500 + index * 300}
                animationEasing="ease-in-out"
              />
            ))}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Flowing water animation overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div 
          className="absolute inset-0 transform translate-y-full animate-wave1 bg-gradient-to-t from-transparent to-blue-500/10"
          style={{animationDelay: '0s'}}
        ></div>
        <div 
          className="absolute inset-0 transform translate-y-full animate-wave2 bg-gradient-to-t from-transparent to-blue-300/5"
          style={{animationDelay: '0.5s'}}
        ></div>
      </div>
    </div>
  );
};
