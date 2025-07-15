import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Area, 
  AreaChart as RechartsAreaChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip, 
  Label,
  ReferenceLine,
  Legend
} from "recharts";
import { 
  Droplets, 
  Waves, 
  ArrowUpRight, 
  ArrowDownRight, 
  Check,
  Info
} from 'lucide-react';
import gsap from 'gsap';
import { Card3D, Glow } from './ui/AceternityComponents';

// Import custom CSS
import '../styles/emissions-chart.css';

// Month names for date formatting
const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Sample data for the water usage chart
const waterUsageData = [
  { date: '2021-01', recycled: 60, fresh: 40 },
  { date: '2021-02', recycled: 62, fresh: 38 },
  { date: '2021-03', recycled: 65, fresh: 35 },
  { date: '2021-04', recycled: 68, fresh: 32 },
  { date: '2021-05', recycled: 70, fresh: 30 },
  { date: '2021-06', recycled: 72, fresh: 28 },
  { date: '2021-07', recycled: 75, fresh: 25 },
  { date: '2021-08', recycled: 78, fresh: 22 },
  { date: '2021-09', recycled: 80, fresh: 20 },
  { date: '2021-10', recycled: 82, fresh: 18 },
  { date: '2021-11', recycled: 85, fresh: 15 },
  { date: '2021-12', recycled: 88, fresh: 12 },
  { date: '2022-01', recycled: 90, fresh: 10 },
  { date: '2022-02', recycled: 91, fresh: 9 },
  { date: '2022-03', recycled: 91, fresh: 9 },
  { date: '2022-04', recycled: 92, fresh: 8 },
  { date: '2022-05', recycled: 92, fresh: 8 },
  { date: '2022-06', recycled: 93, fresh: 7 },
  { date: '2022-07', recycled: 93, fresh: 7 },
  { date: '2022-08', recycled: 94, fresh: 6 },
  { date: '2022-09', recycled: 94, fresh: 6 },
  { date: '2022-10', recycled: 95, fresh: 5 },
  { date: '2022-11', recycled: 95, fresh: 5 },
  { date: '2022-12', recycled: 96, fresh: 4 },
];

// Key milestones in water conservation
const milestoneData = [
  { 
    date: '2021-04', 
    recycled: 68, 
    label: 'Water Recycling System',
    description: 'New facility implemented',
    icon: <Droplets className="h-4 w-4 text-blue-500" />
  },
  { 
    date: '2021-08', 
    recycled: 78, 
    label: 'Rainwater Harvesting',
    description: 'Expanded collection area',
    icon: <Waves className="h-4 w-4 text-cyan-500" />
  },
  { 
    date: '2022-01', 
    recycled: 90, 
    label: 'Zero Discharge System',
    description: 'Closed-loop water cycle',
    icon: <Droplets className="h-4 w-4 text-blue-500" />
  },
  { 
    date: '2022-08', 
    recycled: 94, 
    label: 'Advanced Filtration',
    description: 'Multi-stage purification',
    icon: <Waves className="h-4 w-4 text-cyan-500" />
  }
];

const EnhancedWaterUsageChart = () => {
  const [chartData, setChartData] = useState(waterUsageData);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showMilestones, setShowMilestones] = useState(true);
  const [activeMilestone, setActiveMilestone] = useState(null);
  const chartRef = useRef(null);
  
  // Animate the chart when it becomes visible
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Water ripple animation effect
  useEffect(() => {
    if (chartRef.current && animationComplete) {
      const waterWaves = chartRef.current.querySelectorAll('.water-wave');
      
      gsap.to(waterWaves, {
        y: -15,
        opacity: 0.2,
        duration: 2,
        stagger: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, [animationComplete]);

  // Format X-axis date labels
  const formatXAxis = (date) => {
    const d = new Date(date);
    return `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
  };
  
  // Calculate key metrics
  const latestData = chartData[chartData.length - 1];
  const recycledPercentage = latestData.recycled;
  const freshWaterReduction = 100 - latestData.fresh;
  
  // Handle milestone click
  const handleMilestoneClick = (milestone) => {
    setActiveMilestone(milestone);
  };

  return (
    <div ref={chartRef} className="w-full bg-card border border-border rounded-xl p-6 md:p-8 max-w-6xl mx-auto shadow-md relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
      
      {/* Header with animated text */}
      <div className="mb-8 text-center relative z-10">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold mb-3"
        >
          Water <span className="text-blue-500">Usage Efficiency</span>
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground"
        >
          Tracking our progress in recycling water and reducing fresh water consumption
        </motion.p>
      </div>
      
      {/* Main chart area */}
      <div className="mb-8 perspective-1000">
        <Card3D className="p-2 md:p-4 bg-background rounded-xl">
          <div className="h-[350px] relative">
            {/* Interactive water ripple effect overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-20">
              <div className="water-wave absolute inset-0 animate-wave1 bg-gradient-to-t from-transparent to-blue-500/20"></div>
              <div className="water-wave absolute inset-0 animate-wave2 bg-gradient-to-t from-transparent to-cyan-300/20"></div>
            </div>
            
            {/* Main chart */}
            <ResponsiveContainer width="100%" height="100%">
              <RechartsAreaChart 
                data={chartData} 
                margin={{ top: 20, right: 20, left: -15, bottom: 20 }}
                className="transform transition-all duration-700 ease-in-out"
              >
                <defs>
                  {/* Recycled water gradient */}
                  <linearGradient id="colorRecycled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  
                  {/* Fresh water gradient */}
                  <linearGradient id="colorFresh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0.1}/>
                  </linearGradient>
                  
                  {/* Filter shadow effect */}
                  <filter id="shadowBlue" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#3b82f6" floodOpacity="0.2"/>
                  </filter>
                </defs>
                
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatXAxis}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  minTickGap={30}
                />
                
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                >
                  <Label 
                    value="Water Usage (%)" 
                    angle={-90} 
                    position="insideLeft" 
                    style={{ textAnchor: 'middle', fontSize: 12, fill: '#888' }} 
                  />
                </YAxis>
                
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background/95 backdrop-blur-sm p-3 border border-border rounded-lg shadow-lg">
                          <p className="font-semibold text-sm">{formatXAxis(data.date)}</p>
                          <div className="flex items-center mt-1 text-sm">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                            <span>Recycled Water: <span className="font-semibold">{data.recycled}%</span></span>
                          </div>
                          <div className="flex items-center mt-1 text-sm">
                            <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                            <span>Fresh Water: <span className="font-semibold">{data.fresh}%</span></span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  content={({ payload }) => (
                    <div className="flex justify-center gap-6 mb-2">
                      {payload.map((entry, index) => (
                        <div key={`item-${index}`} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: entry.color }}
                          ></div>
                          <span className="text-sm">{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                />
                
                {/* Target reference line for 2025 */}
                <ReferenceLine y={95} stroke="#3b82f6" strokeDasharray="3 3">
                  <Label value="2025 Target (95% Recycled)" position="insideBottomRight" />
                </ReferenceLine>
                
                {/* Milestone markers */}
                {showMilestones && milestoneData.map(milestone => (
                  <motion.g 
                    key={milestone.date}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <ReferenceLine 
                      x={milestone.date}
                      stroke="#3b82f6"
                      strokeDasharray="3 3"
                      strokeOpacity={0.5}
                      className="cursor-pointer"
                      onClick={() => handleMilestoneClick(milestone)}
                    />
                  </motion.g>
                ))}
                
                <Area
                  type="monotone"
                  dataKey="recycled"
                  stackId="1"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorRecycled)"
                  strokeWidth={2}
                  filter="url(#shadowBlue)"
                  name="Recycled Water"
                  isAnimationActive={true}
                  animationDuration={2000}
                  animationEasing="ease-in-out"
                />
                
                <Area
                  type="monotone"
                  dataKey="fresh"
                  stackId="1"
                  stroke="#64748b"
                  fillOpacity={1}
                  fill="url(#colorFresh)"
                  strokeWidth={2}
                  name="Fresh Water"
                  isAnimationActive={true}
                  animationDuration={2000}
                  animationEasing="ease-in-out"
                />
              </RechartsAreaChart>
            </ResponsiveContainer>
          </div>
        </Card3D>
      </div>
      
      {/* Milestone toggle */}
      <div className="flex justify-end mt-2 mb-4">
        <button 
          onClick={() => setShowMilestones(!showMilestones)}
          className="text-xs flex items-center text-muted-foreground hover:text-foreground px-2 py-1 rounded-md bg-muted/50 hover:bg-muted transition-colors"
        >
          {showMilestones ? (
            <>
              <Check className="h-3 w-3 mr-1" /> Milestones Shown
            </>
          ) : (
            <>
              <Info className="h-3 w-3 mr-1" /> Show Milestones
            </>
          )}
        </button>
      </div>
      
      {/* Active milestone details */}
      {activeMilestone && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-auto max-w-2xl mb-6 p-3 border border-border rounded-lg bg-background"
        >
          <div className="flex items-start">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full mr-3">
              {activeMilestone.icon}
            </div>
            <div>
              <h4 className="font-semibold text-sm">{activeMilestone.label}</h4>
              <p className="text-xs text-muted-foreground">{activeMilestone.description}</p>
            </div>
            <button 
              className="ml-auto text-muted-foreground hover:text-foreground"
              onClick={() => setActiveMilestone(null)}
            >
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-background p-4 rounded-lg border border-border flex flex-col items-center justify-center text-center"
        >
          <Glow>
            <div className="text-3xl font-bold text-blue-500">{recycledPercentage}%</div>
            <div className="text-sm text-muted-foreground mt-1">Water Recycled</div>
          </Glow>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-background p-4 rounded-lg border border-border flex flex-col items-center justify-center text-center"
        >
          <Glow>
            <div className="text-3xl font-bold text-cyan-500">{freshWaterReduction}%</div>
            <div className="text-sm text-muted-foreground mt-1">Fresh Water Reduction</div>
          </Glow>
        </motion.div>
      </div>
      
      {/* Key fact */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800/50 mb-6">
        <div className="flex items-center text-sm text-blue-700 dark:text-blue-300">
          <Droplets className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>Our water recycling system processes over 1.2 million gallons per day, significantly reducing our fresh water consumption while maintaining production quality.</p>
        </div>
      </div>
      
      {/* Footer with call to action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center mt-4"
      >
        <a 
          href="/sustainability" 
          className="inline-flex items-center rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
        >
          Learn more about our water conservation
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </a>
      </motion.div>
    </div>
  );
};

export default EnhancedWaterUsageChart; 