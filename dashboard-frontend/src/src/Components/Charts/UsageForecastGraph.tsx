import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UsageForecastChart = ({ labels, data }:any) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Forecast Usage",
        data: data.forecast,
        borderColor: "#3b82f6", // blue line
        backgroundColor: "#3b82f6",
        tension: 0.3, // smooth curve
        pointBackgroundColor: "#fff",
        pointBorderColor: "#3b82f6",
        pointRadius: 4,
        borderWidth: 2,
      },
      {
        label: "Baseline",
        data: data.baseline,
        borderColor: "#9ca3af", // gray dashed line
        borderDash: [5, 5],
        tension: 0.3,
        fill: false,
        pointRadius: 0, // no markers
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        min: 0,
        max: 120,
        ticks: { stepSize: 30 },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default UsageForecastChart;
