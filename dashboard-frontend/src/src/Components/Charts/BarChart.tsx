import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const EmissionsChart = ({ labels, data }:any) => {
  const chartData = {
    labels,
    datasets: [
      { label: "Usage", data: data.usage, backgroundColor: "#0fa968" },
      { label: "Under limit", data: data.underLimit, backgroundColor: "#a8e6cf" },
      // { label: "Beyond limit", data: data.beyondLimit, backgroundColor: "#ff6b6b" }, 
    ],
  };

  const options = {
    responsive: true,
    labels:true,
    plugins: {
      labels :true,
      datalabels: {
        color: "#fff",
        display:false,
        // formatter: (value:any, ctx:any) => {
        //   const total = ctx.chart.data.datasets
        //     .map((ds:any) => ds.data[ctx.dataIndex])
        //     .reduce((a:any, b:any) => a + b, 0);
        //   return `${Math.round((value / total) * 100)}%`;
        // }
      }
    },
    scales: {
      x: { stacked: true},
      y: { stacked: true}
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default EmissionsChart;
