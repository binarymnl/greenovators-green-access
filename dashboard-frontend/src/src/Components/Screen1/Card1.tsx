import React, { useEffect } from "react";
import {
  CardContent,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { CheckCircle } from "lucide-react"; // or use @mui/icons-material/CheckCircle
import { quickActions } from "../../Services/ApiServices";

interface QuickAction {
  id: number;
  title: string;
  description: string;
  savings: string;
  enabled: boolean;
}

const actions: QuickAction[] = [
  {
    id: 1,
    title: "Auto-adjust Lighting",
    description: "Enable smart lighting in low-occupancy areas",
    savings: "Saves: 156 kWh/day",
    enabled: false,
  },
  {
    id: 2,
    title: "Optimize Pool Temperature",
    description: "Reduce temperature by 0.5°C during off-peak",
    savings: "Saves: 89 kWh/day",
    enabled: true,
  },
  {
    id: 3,
    title: "Smart Ventilation",
    description: "AI-controlled air circulation based on occupancy",
    savings: "Saves: 203 kWh/day",
    enabled: false,
  },
];

const QuickActionsCard: React.FC = () => {
  useEffect(()=>{
  const fetch = async() =>{
    const res = await quickActions();
    console.log(res);
  };
  fetch();
},[])


  return (
    <div className="bg-white rounded-2xl p-2 w-full flex flex-col ">
      <CardContent className="p-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div  className="text-xl font-semibold">
            Quick Actions
          </div>
          <Typography variant="body2" className="text-gray-700">
            Implementation score <span className="font-semibold">23/30</span>
          </Typography>
        </div>

        {/* Actions list */}
        <div className="flex flex-col gap-3">
          {actions.map((action) => (
            <div
              key={action.id}
              className="border border-gray-200 rounded-xl p-4 flex justify-between items-center"
            >
              <div className="flex flex-col">
                <Typography variant="subtitle1" className="font-semibold">
                  {action.title}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-600 text-sm"
                >
                  {action.description}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-green-600 font-medium mt-1"
                >
                  {action.savings}
                </Typography>
              </div>

              {/* Right side: button or checkmark */}
              {action.enabled ? (
                <CheckCircle className="text-green-500 w-6 h-6" />
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  className="rounded-full border-green-600 text-green-600 hover:bg-green-50"
                >
                  Enable
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* <Divider /> */}

        {/* Footer */}
        {/* <Button
          fullWidth
          variant="text"
          className="rounded-lg font-medium text-gray-700 hover:bg-gray-100"
        >
          Manage utilities
        </Button> */}
      </CardContent>


    </div>
  );
};

export default QuickActionsCard;

//      import {useEffect, useRef, useState} from "react"; import {Line} from "react-chartjs-2"; import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, } from "chart.js"; import * as signalR from "@microsoft/signalr"; ChartJS.register( LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend ); export default function EnergyGraph() { const chartRef = useRef<any>(null); const [dataPoints, setDataPoints] = useState<number[]>([]); const [labels, setLabels] = useState<string[]>([]); const [currentValue, setCurrentValue] = useState(100); // starting watts useEffect(() => { // Create SignalR connection const connection = new signalR.HubConnectionBuilder() .withUrl("http://localhost:5000/energyHub") // adjust to your hub url .withAutomaticReconnect() .build(); connection.start().catch(err => console.error("SignalR connect error:", err)); // Event: Lights ON connection.on("lightsOn", () => { updateGraph("on"); }); // Event: Lights OFF connection.on("lightsOff", () => { updateGraph("off"); }); // Cleanup on unmount return () => { connection.stop(); }; }, [currentValue]); // Function to update chart values const updateGraph = (event: "on" | "off") => { let newValue = currentValue; // small controlled changes if (event === "on") { newValue = currentValue + (Math.random() * 3 + 1); // +1 to +4 watts } else { newValue = currentValue - (Math.random() * 3 + 1); // -1 to -4 watts } // keep values reasonable if (newValue < 50) newValue = 50; if (newValue > 200) newValue = 200; setCurrentValue(newValue); setDataPoints(prev => [...prev.slice(-19), newValue]); // keep last 20 points setLabels(prev => [...prev.slice(-19), new Date().toLocaleTimeString()]); }; const data = { labels, datasets: [ { label: "Energy Consumption (Watts)", data: dataPoints, borderColor: "rgba(75,192,192,1)", backgroundColor: "rgba(75,192,192,0.2)", fill: true, tension: 0.3, pointRadius: 2, }, ], }; const options = { responsive: true, animation: { duration: 300, }, scales: { y: { min: 50, max: 200, title: { display: true, text: "Watts" }, }, x: { ticks: { display: false }, }, }, }; return ( <div className="p-4"> <h2 className="text-lg font-semibold mb-2">Live Energy Consumption</h2> <Line ref={chartRef} data={data} options={options} /> </div> ); }