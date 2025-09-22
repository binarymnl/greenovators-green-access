// LineGraph.tsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineGraphProps {
  data: any;
  options?: any;
}

const LineGraph: React.FC<LineGraphProps> = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

export default LineGraph;
