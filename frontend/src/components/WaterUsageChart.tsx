
import React, { useState } from 'react';
import { AreaChart } from './ui/area-chart';

interface WaterUsageChartProps {
  className?: string;
}

const WaterUsageChart: React.FC<WaterUsageChartProps> = ({ className }) => {
  const [timeRange, setTimeRange] = useState('1y');
  
  // Water usage data
  const waterUsageData = [
    { date: '2023-01-01', recycled: 65, fresh: 35 },
    { date: '2023-02-01', recycled: 68, fresh: 32 },
    { date: '2023-03-01', recycled: 70, fresh: 30 },
    { date: '2023-04-01', recycled: 72, fresh: 28 },
    { date: '2023-05-01', recycled: 75, fresh: 25 },
    { date: '2023-06-01', recycled: 78, fresh: 22 },
    { date: '2023-07-01', recycled: 80, fresh: 20 },
    { date: '2023-08-01', recycled: 82, fresh: 18 },
    { date: '2023-09-01', recycled: 85, fresh: 15 },
    { date: '2023-10-01', recycled: 87, fresh: 13 },
    { date: '2023-11-01', recycled: 90, fresh: 10 },
    { date: '2023-12-01', recycled: 92, fresh: 8 },
    { date: '2024-01-01', recycled: 93, fresh: 7 },
    { date: '2024-02-01', recycled: 95, fresh: 5 },
    { date: '2024-03-01', recycled: 96, fresh: 4 },
    { date: '2024-04-01', recycled: 97, fresh: 3 },
    { date: '2024-05-01', recycled: 98, fresh: 2 },
    { date: '2024-06-01', recycled: 99, fresh: 1 },
  ];

  // Define chart configuration
  const chartConfig = {
    recycled: {
      label: "Recycled Water",
      color: "hsl(var(--chart-1))",
    },
    fresh: {
      label: "Fresh Water",
      color: "hsl(var(--chart-2))",
    },
  };

  // Filter data based on selected time range
  const getFilteredData = () => {
    const now = new Date();
    let monthsToGoBack = 12;
    
    if (timeRange === '6m') {
      monthsToGoBack = 6;
    } else if (timeRange === '3m') {
      monthsToGoBack = 3;
    }
    
    const cutoffDate = new Date();
    cutoffDate.setMonth(now.getMonth() - monthsToGoBack);
    
    return waterUsageData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  };

  const timeRangeOptions = [
    { label: 'Last 3 months', value: '3m' },
    { label: 'Last 6 months', value: '6m' },
    { label: 'Last year', value: '1y' },
  ];

  return (
    <div className={`w-full ${className}`}>
      <AreaChart
        data={getFilteredData()}
        config={chartConfig}
        title="Water Usage Efficiency"
        description="Recycled vs Fresh Water Consumption"
        timeRanges={timeRangeOptions}
        onTimeRangeChange={setTimeRange}
        selectedTimeRange={timeRange}
        height={300}
      />
    </div>
  );
};

export default WaterUsageChart;
