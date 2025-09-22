// Card4.tsx
import { Calendar } from "lucide-react";
import LinearProgressBar from "../Charts/LinearProgressBar";
import { useEffect, useState } from "react";
import { weeklyForecast } from "../../Services/ApiServices";

const Card4 = () => {
  
  const [weeklyforecast,setweeklyforecast] = useState<any[]>();
  const [loading,setloading] = useState<boolean>();

  useEffect(()=>{
    const fetch = async() => {
      setloading(true)
      const res = await weeklyForecast()
      setloading(false)
      setweeklyforecast(res);
    }
    fetch()
  },[])

  // const weekData = [
  //   { day: "Today", value: 285, max: 400, confidence: "92%", icon: "☀️" },
  //   { day: "Tomorrow", value: 310, max: 400, confidence: "88%", icon: "⛅" },
  //   { day: "Thursday", value: 256, max: 400, confidence: "75%", icon: "🌧️" },
  //   { day: "Friday", value: 342, max: 400, confidence: "85%", icon: "☀️" },
  //   { day: "Saturday", value: 398, max: 400, confidence: "90%", icon: "☀️" },
  //   { day: "Sunday", value: 365, max: 400, confidence: "87%", icon: "⛅" },
  // ];
  let weekData:any[] = [];
  if(weeklyforecast !== undefined){
    weekData = [
      { day: "Today", value: weeklyforecast[0].visitors, max: 100, confidence: `${weeklyforecast[0].confidence*100}%`, icon: "☀️" },
      { day: "Tomorrow", value: weeklyforecast[1].visitors, max: 100, confidence: `${weeklyforecast[1].confidence*100}%`, icon: "⛅" },
      { day: "Wednesday", value: weeklyforecast[2].visitors, max: 100, confidence: `${weeklyforecast[2].confidence*100}%`, icon: "⛅" },
      { day: "Thursday", value: weeklyforecast[3].visitors, max: 100, confidence: `${weeklyforecast[3].confidence*100}%`, icon: "🌧️" },
      { day: "Friday", value: weeklyforecast[4].visitors, max: 100, confidence: `${weeklyforecast[4].confidence*100}%`, icon: "☀️" },
      { day: "Saturday", value: weeklyforecast[5].visitors, max: 100, confidence: `${weeklyforecast[5].confidence*100}%`, icon: "☀️" },

    ];
  }
  else {
    weekData = [
    // { day: "Today", value: 285, max: 400, confidence: "92%", icon: "☀️" },
    // { day: "Tomorrow", value: 310, max: 400, confidence: "88%", icon: "⛅" },
    // { day: "Thursday", value: 256, max: 400, confidence: "75%", icon: "🌧️" },
    // { day: "Friday", value: 342, max: 400, confidence: "85%", icon: "☀️" },
    // { day: "Saturday", value: 398, max: 400, confidence: "90%", icon: "☀️" },
    // { day: "Sunday", value: 365, max: 400, confidence: "87%", icon: "⛅" },
    ]
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-5 w-full h-full flex justify-center items-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white rounded-xl p-4 gap-6 w-full">
      <h3 className=" font-semibold flex gap-2 items-center text-lg">
        <Calendar></Calendar>
        Weekly Forecast
      </h3>
      <div className="flex flex-col gap-4">
        {weekData.map((d, i) => (
          <LinearProgressBar
            key={i}
            value={d.value}
            max={d.max}
            label={d.day}
            subtext={`Predicted: ${d.value} visitors`}
            color="#000"
            svg={<span>{d.icon}</span>}
          />
        ))}
      </div>
    </div>
  );
};

export default Card4;
