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
  ReferenceDot 
} from "recharts";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Autoplay, Navigation } from 'swiper/modules';
import { 
  Leaf, 
  Wind, 
  TreePine, 
  Factory, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Info
} from 'lucide-react';
import gsap from 'gsap';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Card3D, FloatingAnimation, Glow } from './ui/AceternityComponents';

// Import custom CSS
import '../styles/emissions-chart.css';

// ============= DATA DEFINITIONS =============
const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Sample data for the chart
const emissionsData = Array(24).fill(0).map((_, index) => {
  // Calculate the month index (0-11) and year offset
  const monthIndex = index % 12;
  const yearOffset = Math.floor(index / 12);
  const year = 2022 + yearOffset;
  
  // Progress starts at 100% (no reduction) and gradually decreases to ~25% (75% reduction)
  const progress = Math.max(25, 100 - (index * 3.25));
  
  return {
    date: `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-01`,
    co2: Math.round(progress),
    month: monthNames[monthIndex],
    year: year
  };
});

// Milestone data for reference points on chart
const milestoneData = [
  { 
    date: '2022-04-01', 
    value: 87, 
    label: 'Solar Installation', 
    description: 'Installed 5MW solar panels',
    icon: <Zap className="h-4 w-4 text-amber-500" />
  },
  { 
    date: '2022-08-01', 
    value: 75, 
    label: 'Equipment Upgrade', 
    description: 'Energy-efficient machinery',
    icon: <Factory className="h-4 w-4 text-blue-500" /> 
  },
  { 
    date: '2023-02-01', 
    value: 58, 
    label: 'Carbon Capture', 
    description: 'New tech implemented',
    icon: <Wind className="h-4 w-4 text-green-500" /> 
  },
  { 
    date: '2023-07-01', 
    value: 42, 
    label: 'Tree Plantation', 
    description: '50,000+ trees planted',
    icon: <TreePine className="h-4 w-4 text-emerald-500" /> 
  },
  { 
    date: '2023-12-01', 
    value: 27, 
    label: 'Waste Heat Recovery', 
    description: 'Power generation from waste heat',
    icon: <Leaf className="h-4 w-4 text-lime-500" /> 
  }
];

// Key achievements data
const achievementData = [
  { 
    title: "Solar Installation", 
    description: "Installed 5MW solar panels across manufacturing units",
    icon: <Zap className="h-5 w-5 text-amber-500" />,
    date: "Apr 2022",
    reduction: 8
  },
  { 
    title: "Energy Efficient Equipment", 
    description: "Upgraded to energy-efficient machinery",
    icon: <Factory className="h-5 w-5 text-blue-500" />,
    date: "Aug 2022",
    reduction: 12
  },
  { 
    title: "Carbon Capture", 
    description: "Implemented carbon capture technology",
    icon: <Wind className="h-5 w-5 text-green-500" />,
    date: "Feb 2023",
    reduction: 15
  },
  { 
    title: "Tree Plantation Drive", 
    description: "Planted 50,000+ trees across West Bengal",
    icon: <TreePine className="h-5 w-5 text-emerald-500" />,
    date: "Jul 2023",
    reduction: 10
  },
  { 
    title: "Waste Heat Recovery", 
    description: "Utilizing waste heat for power generation",
    icon: <Leaf className="h-5 w-5 text-lime-500" />,
    date: "Dec 2023",
    reduction: 18
  }
];

// Steps of our emissions reduction journey
const reductionJourney = [
  { title: "Baseline Assessment", description: "Initial evaluation of our carbon footprint" },
  { title: "Target Setting", description: "Established clear reduction goals with timelines" },
  { title: "Implementation", description: "Deployed innovative technologies and processes" },
  { title: "Monitoring", description: "Continuous tracking of emissions data" },
  { title: "Optimization", description: "Refining approaches based on measured results" }
];

// ============= CHART COMPONENTS =============

// Custom Milestone Label Component
const CustomMilestoneLabel = ({ viewBox, milestone }) => {
  const { x, y } = viewBox;
  return (
    <g>
      <foreignObject x={x - 50} y={y - 60} width={100} height={50}>
        <div className="milestone-label">
          <div className="milestone-icon">{milestone.icon}</div>
          <div className="milestone-text">{milestone.label}</div>
        </div>
      </foreignObject>
    </g>
  );
};

// ============= MAIN COMPONENT =============
const EnhancedEmissionsChart = () => {
  const [chartData, setChartData] = useState(emissionsData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeAchievement, setActiveAchievement] = useState(achievementData[0]);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showMilestones, setShowMilestones] = useState(true);
  const [activeMilestone, setActiveMilestone] = useState(null);
  const [viewMode, setViewMode] = useState('chart'); // 'chart', 'timeline', or 'cards'
  const chartRef = useRef(null);
  
  // Animate the chart when it becomes visible
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Particle effect for the achievement cards
  useEffect(() => {
    if (chartRef.current) {
      const particleContainer = chartRef.current.querySelector('.particle-container');
      if (particleContainer) {
        gsap.to(particleContainer.children, {
          y: -20,
          opacity: 0,
          duration: 1.5,
          stagger: 0.1,
          repeat: -1,
          repeatDelay: 0.5,
          ease: "power1.out"
        });
      }
    }
  }, [animationComplete]);

  // Format X-axis date labels
  const formatXAxis = (date) => {
    const d = new Date(date);
    return `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
  };
  
  // Calculate total reduction statistics
  const totalReduction = achievementData.reduce((acc, curr) => acc + curr.reduction, 0);
  const currentEmission = chartData[chartData.length - 1].co2;
  const reductionPercentage = Math.round(100 - currentEmission);

  // Handle milestone hover/click
  const handleMilestoneClick = (milestone) => {
    setActiveMilestone(milestone);
  };

  // =========== CHART VIEW COMPONENT ===========
  const renderChartView = () => (
    <div className="mb-8 perspective-1000">
      <Card3D className="p-2 md:p-4 bg-background rounded-xl">
        <div className="h-[350px] relative">
          {/* Interactive water ripple effect overlay */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-20">
            <div className="absolute inset-0 animate-wave1 bg-gradient-to-t from-transparent to-blue-500/20"></div>
            <div className="absolute inset-0 animate-wave2 bg-gradient-to-t from-transparent to-green-300/20"></div>
          </div>
          
          {/* Main chart */}
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart 
              data={chartData} 
              margin={{ top: 20, right: 20, left: -15, bottom: 20 }}
              className="transform transition-all duration-700 ease-in-out"
            >
              <defs>
                {/* Multi-stage gradient for better visual impact */}
                <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="50%" stopColor="#34d399" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#6ee7b7" stopOpacity={0.2}/>
                </linearGradient>
                <filter id="shadow" height="200%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#10b981" floodOpacity="0.2"/>
                </filter>
                
                {/* Emission reduction pattern for visual texture */}
                <pattern id="emissionPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" stroke="#16a34a" strokeWidth="1" opacity="0.3"/>
                </pattern>
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
                  value="Emission Level (%)" 
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
                        <p className="font-semibold text-sm">{data.month} {data.year}</p>
                        <div className="flex items-center mt-1 text-sm">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span>Emission Level: <span className="font-semibold">{data.co2}%</span></span>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-green-600">
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                          <span>Reduction: <span className="font-semibold">{100 - data.co2}%</span></span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="co2"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorCo2)"
                strokeWidth={3}
                filter="url(#shadow)"
                isAnimationActive={true}
                animationDuration={2000}
                animationEasing="ease-in-out"
              />
              
              {/* Target reference line */}
              <ReferenceLine y={25} stroke="#16a34a" strokeDasharray="3 3">
                <Label value="2025 Target (75% Reduction)" position="insideBottomRight" />
              </ReferenceLine>

              {/* Milestone markers */}
              {showMilestones && milestoneData.map(milestone => (
                <ReferenceDot
                  key={milestone.date}
                  x={milestone.date}
                  y={milestone.value}
                  r={6}
                  fill="#ffffff"
                  stroke="#10b981"
                  strokeWidth={2}
                  onClick={() => handleMilestoneClick(milestone)}
                  className="cursor-pointer hover:opacity-80"
                />
              ))}
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      </Card3D>
      
      {/* Milestone toggle */}
      <div className="flex justify-end mt-2">
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
          className="mt-4 p-3 border border-border rounded-lg bg-background"
        >
          <div className="flex items-start">
            <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full mr-3">
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
    </div>
  );

  // =========== TIMELINE VIEW COMPONENT ===========
  const renderTimelineView = () => (
    <div className="mb-8">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
        
        {/* Timeline items */}
        {reductionJourney.map((journey, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            {/* Content */}
            <div className={`w-5/12 p-4 bg-background border border-border rounded-lg shadow-sm ${index % 2 === 0 ? 'text-right pr-6' : 'text-left pl-6'}`}>
              <h4 className="font-bold text-green-600">{journey.title}</h4>
              <p className="text-sm text-muted-foreground">{journey.description}</p>
            </div>
            
            {/* Timeline node */}
            <div className="w-2/12 flex justify-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white border-4 border-background z-10">
                {index + 1}
              </div>
            </div>
            
            {/* Empty space for alternating layout */}
            <div className="w-5/12"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // =========== CARDS VIEW COMPONENT ===========
  const renderCardsView = () => (
    <div className="mb-8">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        className="achievement-cards-swiper"
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 }
        }}
      >
        {achievementData.map((achievement, index) => (
          <SwiperSlide key={index}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="h-full bg-background p-6 rounded-xl border border-border shadow-sm flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  {achievement.icon}
                </div>
                <h4 className="ml-3 font-bold">{achievement.title}</h4>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4 flex-grow">{achievement.description}</p>
              
              <div className="mt-auto grid grid-cols-2 gap-2 text-sm">
                <div className="bg-muted/50 p-2 rounded">
                  <div className="text-muted-foreground text-xs">Date</div>
                  <div className="font-medium">{achievement.date}</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                  <div className="text-muted-foreground text-xs">CO₂ Reduction</div>
                  <div className="font-medium text-green-600 flex items-center">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    {achievement.reduction}%
                  </div>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

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
          CO₂ <span className="text-rashmi-red">Emissions Reduction</span>
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground"
        >
          Tracking our progress in reducing carbon emissions
        </motion.p>
      </div>
      
      {/* View mode selector */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex p-1 bg-muted rounded-lg">
          <button 
            onClick={() => setViewMode('chart')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              viewMode === 'chart' 
                ? 'bg-background shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Chart View
          </button>
          <button 
            onClick={() => setViewMode('timeline')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              viewMode === 'timeline' 
                ? 'bg-background shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Timeline
          </button>
          <button 
            onClick={() => setViewMode('cards')}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              viewMode === 'cards' 
                ? 'bg-background shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Initiatives
          </button>
        </div>
      </div>
      
      {/* Main content based on view mode */}
      {viewMode === 'chart' && renderChartView()}
      {viewMode === 'timeline' && renderTimelineView()}
      {viewMode === 'cards' && renderCardsView()}
      
      {/* Key metrics */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-background p-4 rounded-lg border border-border flex flex-col items-center justify-center text-center"
        >
          <Glow>
            <div className="text-3xl font-bold text-rashmi-red">{reductionPercentage}%</div>
            <div className="text-sm text-muted-foreground mt-1">Total Reduction</div>
          </Glow>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-background p-4 rounded-lg border border-border flex flex-col items-center justify-center text-center"
        >
          <Glow>
            <div className="text-3xl font-bold text-blue-500">{totalReduction}</div>
            <div className="text-sm text-muted-foreground mt-1">Initiatives</div>
          </Glow>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-background p-4 rounded-lg border border-border flex flex-col items-center justify-center text-center"
        >
          <Glow>
            <div className="text-3xl font-bold text-emerald-500">2025</div>
            <div className="text-sm text-muted-foreground mt-1">Target Year</div>
          </Glow>
        </motion.div>
      </div>
      
      {/* Footer with call to action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center mt-8"
      >
        <a 
          href="/sustainability" 
          className="inline-flex items-center rounded-full bg-rashmi-red/10 px-4 py-2 text-sm text-rashmi-red hover:bg-rashmi-red/20 transition-colors"
        >
          Learn more about our sustainability initiatives
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </a>
      </motion.div>
    </div>
  );
};

export default EnhancedEmissionsChart; 