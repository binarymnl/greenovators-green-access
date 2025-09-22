import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Building2Icon } from "lucide-react";


ChartJS.register(ArcElement, Tooltip, Legend);

interface GaugeChartProps {
  value: number;       // e.g. 78
  label: string;       // e.g. "Energy Efficiency"
  change?: number;     // e.g. +23.2
  color?: string;      // progress color
}

const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  label,
  change,
  color = "#00bfa5",
}) => {
  const data = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, "#e5e7eb"], // use gray for empty arc
        borderWidth: 0,
        circumference: 180,  // half circle
        rotation: -90,       // start from top center
      },
    ],
  };

  const options = {
    cutout: "92%",          // ✅ makes ring thin
    maintainAspectRatio: false, // ✅ allows stretching in container
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
        datalabels: { display: false },
    },
  } as const;

  return (
    <div className="relative w-[300px] h-[160px]">
      <Doughnut data={data} options={options} />

      {/* Overlay content */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 flex flex-col gap-2 items-center">
       
        <span className="h-full w-12 flex flex-col gap-2 items-center justify-center"> 
          <Building2Icon/> 
           {change !== undefined && (
            <span className={`${ change > 0 ? "text-green-500" : change === 0 ? "text-gray-500" : "text-red-500"} text-[12px] font-semibold`}>
              {change > 0 ? `+${change}%` : `${change}%`}
            </span>
          )}
        </span>
        <div className="flex flex-col text-center">
          <span className="text-2xl font-bold">{value}%</span>
          <span className="text-gray-600 text-sm">{label}</span>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
