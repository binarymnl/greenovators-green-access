// DoughnutChart.tsx
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: any;
  options?: any;
}

// const options: any = {
//   responsive: true,
//   legend: false,
//   plugins: {
//     legends: false,
//   },
// };

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, options, size = 400 }:any) => {
  return (
     <div className="flex flex-col justify-center items-center" style={{ width: size, height: size }}>
        <Doughnut
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "50%", // 🔑 makes hole bigger → chart ring thinner
            ...options,
          }}
        />
     </div>
  );
};

export default DoughnutChart;
