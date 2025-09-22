// // DashboardCharts.tsx
// import React from "react";
// import ChartJSChart from "../Charts/ReactCharts";

// const DashboardCharts = () => {
//   // 1️⃣ Peak Consumption Pattern (Line chart, stacked-like areas)
//   const peakConsumptionData = {
//     labels: [
//       "6:00",
//       "7:00",
//       "8:00",
//       "9:00",
//       "10:00",
//       "12:00",
//       "14:00",
//       "16:00",
//       "18:00",
//       "20:00",
//     ],
//     datasets: [
//       {
//         label: "Weekday",
//         data: [10, 50, 200, 270, 180, 250, 320, 360, 300, 150],
//         borderColor: "#2196f3",
//         backgroundColor: "rgba(33,150,243,0.3)",
//         fill: true,
//         tension: 0.4, // smooth curve
//       },
//       {
//         label: "Weekend",
//         data: [5, 20, 100, 180, 150, 200, 250, 280, 240, 100],
//         borderColor: "#ff9800",
//         backgroundColor: "rgba(255,152,0,0.3)",
//         fill: true,
//         tension: 0.4,
//       },
//       {
//         label: "Holiday",
//         data: [0, 10, 50, 90, 80, 100, 120, 130, 100, 60],
//         borderColor: "#f44336",
//         backgroundColor: "rgba(244,67,54,0.3)",
//         fill: true,
//         tension: 0.4,
//       },
//     ],
//   };

//   const peakConsumptionOptions = {
//     responsive: true,
//     plugins: {
//       legend: { display: true, position: "top" as const },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: { stepSize: 90 },
//       },
//     },
//   };

//   // 2️⃣ Current Occupancy Distribution (Pie/Doughnut chart)
//   const occupancyData = {
//     labels: ["Main Pool", "Locker Rooms", "Kids Pool", "Therapy Pool", "Café Area"],
//     datasets: [
//       {
//         data: [45, 30, 10, 7, 8], // sample distribution
//         backgroundColor: [
//           "#1976d2", // Main Pool
//           "#43a047", // Locker Rooms
//           "#ffb300", // Kids Pool
//           "#e53935", // Therapy Pool
//           "#8e24aa", // Café Area
//         ],
//       },
//     ],
//   };

//   const occupancyOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: "right" as const,
//       },
//     },
//   };

//   return (
//     <div className="h-[100%] w-[100%]">
//       {/* Peak Consumption */}
//       <div className="bg-white p-4 rounded-xl shadow">
//         <h3 className="text-sm font-semibold mb-2">PEAK CONSUMPTION PATTERN</h3>
//         <ChartJSChart type="line" data={peakConsumptionData} options={peakConsumptionOptions} />
//       </div>

//       {/* Occupancy Distribution */}
//       <div className="bg-white p-4 rounded-xl shadow">
//         <h3 className="text-sm font-semibold mb-2">Current Occupancy Distribution</h3>
//         <ChartJSChart type="pie" data={occupancyData} options={occupancyOptions} />
//       </div>
//     </div>
//   );
// };

// export default DashboardCharts;

// Card1.tsx
import ChartJSChart from "../Charts/ReactCharts";
import DoughnutChart from "../Charts/Donut";
// import { layouts } from "chart.js";
import { useEffect, useState } from "react";
import { occupancyStatus, peakConsumption, type Zone } from "../../Services/ApiServices";

const Card1 = () => {
  // Line Chart Data

  const peakConsumptionOptions = {
    responsive: true,
    plugins: { 
        legend: { display: true, 
          position: "top" as const, 
          // fullSize :true,
          // align:"start" , 
          labels: {
            textAlign : "center"
          // usePointStyle: true, // ✅ makes markers circular
          // pointStyle: "circle", // ✅ force circle instead of line
          // padding: 20, // ✅ space between items
          // boxHeight:20,
          // boxWidth:20,

        },} },
    scales: { y: { beginAtZero: true } },
  };

  // Doughnut Chart Data
  

  const occupancyOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true, // ✅ makes markers circular
          pointStyle: "circle", // ✅ force circle instead of line
          padding: 20, // ✅ space between items
        },
      },
      datalabels: { display: false },
    },
  };

  const [peakconsumption , setPeakConsumption] = useState<any>({});
  const [occupancydata , setoccupancydata] = useState<Zone[]>([]);
  const [loading , setLoading] = useState<boolean>();

  useEffect(()=>{
    const fetch = async() => {
      const line = await peakConsumption()
      setPeakConsumption(line)  

      setLoading(true)  
      const donut = await occupancyStatus()
      setoccupancydata(donut?.zones ?? []);
      console.log(donut?.zones)
      setLoading(false)  
    }
    fetch()
  },[])

  //   const occupancyData = {
  //   labels: [
  //     "Main Pool",
  //     "Locker Rooms",
  //     "Kids Pool",
  //     "Therapy Pool",
  //     "Café Area",
  //   ],
  //   datasets: [
  //     {
  //       data: [45, 30, 10, 7, 8],
  //       backgroundColor: [
  //         "#1976d2",
  //         "#43a047",
  //         "#ffb300",
  //         "#e53935",
  //         "#8e24aa",
  //       ],
  //     },
  //   ],
  // };
  let occupancyData:any  = {
      labels: [
        "PoolArea",
        "LockerRoom",
        "GymHall",
        "EventHall"
      ],
      datasets: [
        {
          data: [45, 30, 10, 7, 8],
          backgroundColor: [
            "#1976d2",
            "#43a047",
            "#ffb300",
            "#e53935",
            "#8e24aa",
          ],
        },
      ],
    };

  useEffect(()=>{

    if(loading){
        console.log(occupancydata)
        const labels:any[] = []
        const data:any[] = []
  
        console.log("here")
        occupancydata.forEach((o:any) => {
          console.log("here1",labels.length)
          labels.push(o.name)
        })
        occupancydata.forEach(((o:any) => {
          console.log("here1" , data.length)
          data.push(o.occupancy_pct)
        }))
        
        console.log("labels", labels)
        console.log("data", data)
        occupancyData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#1976d2",
              "#43a047",
              "#ffb300",
              "#e53935",
              "#8e24aa",
            ],
          },
        ],
      };
    }
    else{
     
    }
  },[occupancydata])

    const peakConsumptionData = {
    labels: [
      "6:00",
      "8:00",
      "10:00",
      "12:00",
      "14:00",
      "16:00",
      "18:00",
      "20:00",
    ],
    datasets: [
      {
        label: "Weekday",
        data: peakconsumption.weekday,
        borderColor: "#2196f3",
        backgroundColor: "rgba(33,150,243,0.3)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Weekend",
        // data: [10, 150, 180, 150, 200, 250, 220, 100],
        data: peakconsumption.weekend,
        borderColor: "#ff9800",
        backgroundColor: "rgba(255,152,0,0.3)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Holiday",
        // data: [5, 80, 90, 80, 100, 120, 100, 60],
        data: peakconsumption.holiday,
        borderColor: "#f44336",
        backgroundColor: "rgba(244,67,54,0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };


  return (
    <div className="flex flex-col rounded-xl  gap-6 w-full">
      <div className="bg-white p-4 w-full rounded-xl">
        <h3 className="text-lg font-semibold">Peak Consumption Pattern</h3>
        <ChartJSChart
          type="line"
          data={peakConsumptionData}
          options={peakConsumptionOptions}
        />
      </div>

      {/* <hr className="text-[#14191133]" /> */}
      <div className="h-full w-full flex flex-col justify-center items-center bg-white p-4  rounded-xl">
        <div className="flex justify-Start w-full ">
          <h3 className="text-lg font-semibold">
            Current Occupancy Distribution
          </h3>
        </div>
        <DoughnutChart data={occupancyData} options={occupancyOptions} />
      </div>
    </div>
  );
};

export default Card1;
