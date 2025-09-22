import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface StackedAreaChartProps {
  labels: string[];
  weekday: number[];
  weekend: number[];
  holiday: number[];
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({
  labels,
  weekday,
  weekend,
  holiday,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Weekday",
        data: weekday,
        borderColor: "#4285F4",
        backgroundColor: "rgba(66,133,244,0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        stack: "combined",
      },
      {
        label: "Weekend",
        data: weekend,
        borderColor: "#FBBC05",
        backgroundColor: "rgba(251,188,5,0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        stack: "combined",
      },
      {
        label: "Holiday",
        data: holiday,
        borderColor: "#EA4335",
        backgroundColor: "rgba(234,67,53,0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        stack: "combined",
      },
    ],
  };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       // position: "top" as const,
  //       labels: {
  //         display:false,
  //       },
  //       display:false
  //     },
  //     title: {
  //       display: true,
  //       text: "PEAK CONSUMPTION PATTERN",
  //       font: {
  //         size: 16,
  //         weight: "bold",
  //       },
  //     },
  //   },
  //   interaction: {
  //     intersect: false,
  //     mode: "index" as const,
  //   },
  //   scales: {
  //     x: {
  //       stacked: true,
  //     },
  //     y: {
  //       stacked: true,
  //       beginAtZero: true,
  //     },
  //   },
  // };

  return <Line data={data} />;
};

export default StackedAreaChart;
