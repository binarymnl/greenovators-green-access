// ChartJSCharts.tsx
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

interface ChartProps {
  type: "pie" | "bar" | "line";
  data: any;
  options?: any;
}

const ChartJSChart: React.FC<ChartProps> = ({ type, data, options }) => {
  if (type === "pie") return <Pie data={data} options={options} />;
  if (type === "bar") return <Bar data={data} options={options} />;
  if (type === "line") return <Line data={data} options={options} />;
  return null;
};

export default ChartJSChart;

// 📊 Sample Usage
export const samplePieData = {
  labels: ["Solar", "Wind", "Hydro", "Coal"],
  datasets: [
    {
      data: [35, 25, 20, 20],
      backgroundColor: ["#f6c90e", "#00bcd4", "#4caf50", "#9e9e9e"],
    },
  ],
};

export const sampleBarData = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Energy Produced (kWh)",
      data: [300, 450, 200, 500],
      backgroundColor: "#2196f3",
    },
  ],
};

export const sampleLineData = {
  labels: ["0h", "6h", "12h", "18h", "24h"],
  datasets: [
    {
      label: "Energy Usage Curve",
      data: [50, 200, 500, 400, 150],
      borderColor: "#f44336",
      backgroundColor: "rgba(244,67,54,0.2)",
      fill: true,
    },
  ],
};
