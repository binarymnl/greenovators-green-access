// import { useEffect, useRef, useState } from "react";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import * as signalR from "@microsoft/signalr";
// import LineGraph from "../Charts/LineGraph";
// import { useSignalR } from "../../Services/useSignalIr";
// // import LineGraph from"; // Assuming this is your custom wrapper for <Line />

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function EnergyGraph() {
//   const chartRef = useRef<any>(null);
//   const [dataPoints, setDataPoints] = useState<number[]>([]);
//   const [labels, setLabels] = useState<string[]>([]);
//   const [currentValue, setCurrentValue] = useState(0); // Starting watts
//   const [on , setOn] = useState<number[]>([0.1,0.2,0.3,0.4]);
//   const [off , setofF] = useState<number[]>([0.1,0.2,0.3,0.4,0.3,0.2,0.1,0]);
  
//   // const { data, connection } = useSignalR<string>({
//   //   url: "https://localhost:7254/dashboardhub",
//   //   method: "LightsON",
//   // });

//   // useEffect(() => {
//   //   console.log("yttt");
//   //   if (!connection) return;
//   //   const join = async () => {
//   //     if (connection.state === "Connected") {
//   //       await connection.invoke("SubscribeZone", "zone1");
//   //       console.log("✅ Joined zone1");
//   //     }
//   //   };
//   //   join();
//   // }, [connection, data]);

//   const { data, connection } = useSignalR<number>({
//     url: "https://localhost:7254/dashboardHub",
//     method: "Lights",
//   });

//   //   const { data, connection } = useSignalR<string>({
//   //   url: "https://localhost:7254/dashboardHub",
//   //   method: "LightsOff",
//   // });

//   useEffect(() => {
//     console.log("yttt");
//     if (!connection) return;
//     const join = async () => {
//       if (connection.state === "Connected") {
//         await connection.invoke("SubscribeZone", "zone1");
//         console.log("✅ Joined zone1");
//       }
//     };

    
//     join();
//   }, [connection]);

//   useEffect(()=>{
//     if(Number(data) === 1){
//       console.log(data)
//       updateGraph("on");
//       // connection.on("lightsOn", () => {
//       //   updateGraph("on");
//       // });
  
//       // connection.on("lightsOff", () => {
//       //   updateGraph("off");
//       // });
//     }
//     else if(Number(data) === 2){
//       console.log(data)
//       updateGraph("off");
//     }
//     else{
//       console.log("nothing : ", data)
//     }

//   },[data])

  
//   useEffect(() => {
//     // const connection = new signalR.HubConnectionBuilder()
//     //   .withUrl("http://localhost:7254/dashboard") // Adjust to your hub URL
//     //   .withAutomaticReconnect()
//     //   .build();

//     // connection.start().catch((err) =>
//     //   console.error("SignalR connect error:", err)
//     // );

//     // connection.on("lightsOn", () => {
//     //   updateGraph("on");
//     // });

//     // connection.on("lightsOff", () => {
//     //   updateGraph("off");
//     // });

//     // return () => {
//     //   connection.stop();
//     // };
//   }, [currentValue]);

//   // Function to update chart values
//   const updateGraph = (event: "on" | "off") => {
//     let newValue = currentValue;

//     // if (event === "on") {
//     //   newValue = currentValue + (Math.random() * 3 + 1); // +1 to +4 watts
//     // } else {
//     //   newValue = currentValue - (Math.random() * 3 + 1); // -1 to -4 watts
//     // }
    
//     if (event === "on") {
//       setDataPoints(on); 
//     } else {
 
//       setDataPoints(off); 
//           // newValue = currentValue - 0.194444444444444; // -1 to -4 watts
  
//     }

//     setCurrentValue(newValue);
//     // setDataPoints((prev) => [...prev.slice(-19), newValue]); // Keep last 20 points
//     // setLabels((prev) => [...prev.slice(-19), new Date().toLocaleTimeString()]);
//   };

//   const lineData = {
//     labels,
//     datasets: [
//       {
//         label: "Energy Consumption (Watts)",
//         data: dataPoints,
//         borderColor: "rgba(75,192,192,1)",
//         backgroundColor: "rgba(75,192,192,0.2)",
//         fill: true,
//         tension: 0.3,
//         pointRadius: 2,
//       },
//     ],
//   };

//   const lineOptions = {
//     responsive: true,
//     animation: {
//       duration: 300,
//     },
//     scales: {
//       y: {
//         min: 0,
//         max: 1,
//         title: {
//           display: true,
//           text: "Watts",
//         },
//       },
//       x: {
//         ticks: {
//           display: false,
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-white rounded-2xl p-5 w-full h-full flex flex-col justify-between items-center">
//       <h2 className="text-lg font-semibold mb-2">Live Energy Consumption</h2>
//       <LineGraph data={lineData} options={lineOptions} />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LineGraph from "../Charts/LineGraph"; // Make sure this is your wrapper for Chart.js Line chart
import { useSignalR } from "../../Services/useSignalIr"; // Your custom SignalR hook

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function EnergyGraph() {
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [, setCurrentValue] = useState(0); // Starting watts

  const onValues = [0.1, 0.2, 0.3, 0.4];
  const offValues = [0.1, 0.2, 0.3, 0.4, 0.3, 0.2, 0.1, 0];

  const { data, connection } = useSignalR<number>({
    url: "https://swagger.domucloud.top/dashboardHub",
    method: "Lights",
  });

  // Subscribe to a zone once connection is established
  useEffect(() => {
    if (!connection) return;

    const join = async () => {
      try {
        if (connection.state === "Connected") {
          await connection.invoke("SubscribeZone", "zone1");
          console.log("✅ Joined zone1");
        }
      } catch (err) {
        console.error("❌ Zone subscription failed:", err);
      }
    };

    join();
  }, [connection]);

  // Handle SignalR data updates
  useEffect(() => {
    if (Number(data) === 1) {
      console.log("Signal: ON", data);
      updateGraph("on");
    } else if (Number(data) === 2) {
      console.log("Signal: OFF", data);
      updateGraph("off");
    } else {
      console.log("Signal: Unknown", data);
    }
  }, [data]);

  // Function to update chart values
  const updateGraph = (event: "on" | "off") => {
    const values = event === "on" ? onValues : offValues;
    const timeStamps = values.map(() => new Date().toLocaleTimeString());

    setDataPoints(values);
    setLabels(timeStamps);
    setCurrentValue(values[values.length - 1]);
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: "Energy Consumption (Watts)",
        data: dataPoints,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    animation: {
      duration: 300,
    },
    scales: {
      y: {
        min: 0,
        max: 1,
        title: {
          display: true,
          text: "Watts",
        },
      },
      x: {
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-5 w-full h-full flex flex-col justify-between items-center">
      <h2 className="text-lg font-semibold mb-2">Live Energy Consumption</h2>
      <LineGraph
        key={JSON.stringify(dataPoints)} // Force re-render when data changes
        data={lineData}
        options={lineOptions}
      />
    </div>
  );
}
