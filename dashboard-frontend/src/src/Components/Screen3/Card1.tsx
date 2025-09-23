// Card3.tsx
import { Clock } from "lucide-react";
import LineGraph from "../Charts/LineGraph";
import { useEffect, useState } from "react";
import { Dwell,type  dwell, PeakDay, PeakHour,type peakHour, type peakDay, todayForecast } from "../../Services/ApiServices";

const Card3 = () => {
  

  const lineOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  const [peakHour, setPeakHour] = useState<peakHour | null>();
  const [peakday, setPeakDay] = useState<peakDay | null>();
  const [dwell, setDwell] = useState<dwell |null>();
  const [todayforecast, setforecast] = useState<any |null>();
  const [,setLaoding] = useState<boolean>();

  useEffect(()=>{
    const fetchData = async() =>{
      setLaoding(true)
      const todayforecast = await todayForecast(); 
      setforecast(todayforecast)
      setLaoding(false)

      const peakhour = await PeakHour();
      setPeakHour(peakhour);

      const peakday = await PeakDay();
      setPeakDay(peakday); 
      
      const dwell = await Dwell();
      setDwell(dwell);

    }
    fetchData();
  },[])

  // const lineData = {
  //   labels: ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
  //   datasets: [
  //     {
  //       label: "Usage",
  //       data: [85, 90, 80, 65, 50, 35, 20],
  //       borderColor: "#3b82f6",
  //       backgroundColor: "rgba(59,130,246,0.2)",
  //       fill: true,
  //       tension: 0.4,
  //     },
  //     {
  //       label: "Prediction",
  //       data: [88, 92, 85, 70, 55, 40, 25],
  //       borderColor: "#9ca3af",
  //       borderDash: [5, 5],
  //       fill: false,
  //       tension: 0.4,
  //     },
  //   ],
  // };
  let lineData:any = {}
  if(todayforecast !== undefined){
    const labels:any[] = [] 
    const predictedVisitors:any[] = []
    
    todayforecast?.hourly?.forEach((h:any) => {
      labels.push(h.time.toString())
    })
    todayforecast?.hourly?.forEach((h:any) => {
      predictedVisitors.push(h.predicted_visitors)
    })

    lineData = {
      labels: labels,
      datasets: [
        // {
        //   label: "Usage",
        //   data: [85, 90, 80, 65, 50, 35, 20],
        //   borderColor: "#3b82f6",
        //   backgroundColor: "rgba(59,130,246,0.2)",
        //   fill: true,
        //   tension: 0.4,
        // },
        {
          label: "Prediction",
          data: predictedVisitors,
          borderDash: [0, 0],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59,130,246,0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }
  else{
    lineData =  {
    labels: ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
    datasets: [
      {
        label: "Usage",
        data: [0,0,0,0,0,0,0,0,0],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Prediction",
        data: [],
        borderColor: "#9ca3af",
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
      },
    ],
  };
  }

  //   if (loading) {
  //   return (
  //     <div className="bg-white rounded-2xl shadow-sm p-5 w-[50vw] h-[100vh] flex justify-center items-center">
  //       <p className="text-gray-500">Loading...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col bg-white rounded-xl  p-4 gap-6 w-full">
      <h3 className="flex felx-col gap-2  font-semibold text-gray-600">
        <Clock></Clock>
        Today's Usage Forecast
      </h3>
      <LineGraph data={lineData} options={lineOptions} />

      <p className="text-xs text-gray-500">
        Prediction confidence decreases for future time slots. Current accuracy: 87%.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-indigo-50 rounded-lg p-3 text-center">
          <p className="text-sm font-medium">Peak Hour</p>
          {/* <p className="text-lg font-bold">3:00 PM</p> */}
          {/* <p className="text-xs text-indigo-600">+15% vs avg</p> */}
          <p className="text-lg font-bold">{peakHour?.hour}</p>
          <p className="text-xs text-indigo-600">{peakHour?.visitors} vs avg</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 text-center">
          <p className="text-sm font-medium">Peak Day</p>
          {/* <p className="text-lg font-bold">Saturday</p> */}
          {/* <p className="text-xs text-orange-600">342 visitors</p> */}
          <p className="text-lg font-bold">{peakday?.day}</p>
          <p className="text-xs text-orange-600">{peakday?.visitors} visitors</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-sm font-medium">Avg Dwell Time</p>
          {/* <p className="text-lg font-bold">87 min</p> */}
          {/* <p className="text-xs text-green-600">+8% this week</p> */}
          <p className="text-lg font-bold">{dwell?.avg_dwell_time_min} min</p>
          <p className="text-xs text-green-600">{dwell?.change_pct} this week</p>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
          <p className="font-semibold">Peak Management</p>
          <p>Saturday 3–5 PM expected to reach 87% capacity. Consider off-peak promotions.</p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
          <p className="font-semibold">Optimal Windows</p>
          <p>Tue & Thu mornings show lower usage. Best for maintenance.</p>
        </div>
        <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded">
          <p className="font-semibold">Weather Impact</p>
          <p>Rainy Thursday may see 25% lower attendance. Adjust staffing.</p>
        </div>
      </div>
    </div>
  );
};

export default Card3;
