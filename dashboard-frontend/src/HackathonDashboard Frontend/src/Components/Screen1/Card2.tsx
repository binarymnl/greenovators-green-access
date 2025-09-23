// import CircularLoaderChart from "../Charts/CircularLoaderChart";
// import GaugeChart from "../Charts/GaugeChart";
// import OpacityIcon from "@mui/icons-material/Opacity";
// import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
// import SpaIcon from "@mui/icons-material/Spa";

// function Card2() {
//   return (
//     <div className="bg-white !rounded-2xl shadow-sm p-5 w-full h-full flex flex-col justify-between items-center ">
//       {/* Header */}
//       <div className="flex justify-between w-full items-center mb-4">
//         <div>
//           <p className="text-xl font-semibold">Occupancy Status</p>
//           <p className="text-sm text-gray-500">14:12, 21-03-2025</p>
//         </div>
//         <span className="bg-green-100 text-green-700 text-md w-14 text-center px-2 py-1 rounded-full">
//           live
//         </span>
//       </div>

//       {/* Circular charts row */}
//       <div className="flex justify-around mt-4 w-[90%]">
//         <CircularLoaderChart
//           value={72}
//           svg={<OpacityIcon />}
//           label="Training area"
//           color="#00BFA6"
//         />
//         <CircularLoaderChart
//           value={54}
//           svg={<DirectionsRunIcon />}
//           label="Cardio area"
//           color="#FF7043"
//         />
//         <CircularLoaderChart
//           value={63}
//           svg={<SpaIcon />}
//           label="Steam room"
//           color="#9575CD"
//         />
//       </div>

//       {/* Gauge */}
//       <GaugeChart value={78} label="Energy Efficiency" />
//     </div>
//   );
// }

// export default Card2;

import { useEffect, useState } from "react";
import CircularLoaderChart from "../Charts/CircularLoaderChart";
import GaugeChart from "../Charts/GaugeChart";
import OpacityIcon from "@mui/icons-material/Opacity";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SpaIcon from "@mui/icons-material/Spa";
import { occupancyStatus, type OccupancyStatusResponse } from "../../Services/ApiServices";

// ---------- Component ----------
function Card2() {
  const [data, setData] = useState<OccupancyStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // fallback data for POC
  const fallbackData: OccupancyStatusResponse = {
    timestamp: new Date().toISOString(),
    zones: [
      { id: "1", name: "Training area", occupancy_pct: 0 },
      { id: "2", name: "Cardio area", occupancy_pct: 0 },
      { id: "3", name: "Steam room", occupancy_pct: 0 },
    ],
    energy_efficiency_pct: 0,
    delta_pct: 0,
  };

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await occupancyStatus();
      if (res) {
        setData(res);
      } else {
        setData(fallbackData);
      }
      setLoading(false);
    };

    fetchStatus();

  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-5 w-full h-full flex justify-center items-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const chartData = data ?? fallbackData;

  // fallback icons/colors if API doesn’t send them
  const icons = [<OpacityIcon />, <DirectionsRunIcon />, <SpaIcon />];
  const colors = ["#00BFA6", "#00BFA6", "#00BFA6"];

  return (
    <div className="bg-white rounded-2xl p-5 w-full h-full flex flex-col justify-between items-center">
      {/* Header */}
      <div className="flex justify-between w-full items-center mb-4">
        <div>
          <p className="text-xl font-semibold">Occupancy Status</p>
          <p className="text-sm text-gray-500">
            {new Date(chartData.timestamp).toLocaleString()}
          </p>
        </div>
        <span className="bg-green-100 text-green-700 text-md w-14 text-center px-2 py-1 rounded-full">
          live
        </span>
      </div>

      {/* Circular charts row */}
      <div className="flex mt-4 gap-5">
        {chartData.zones.map((zone, idx) => (
          <CircularLoaderChart
            key={zone.id}
            value={zone.occupancy_pct/10}
            svg={zone.icon || icons[idx % icons.length]}
            label={zone.name}
            color={zone.color || colors[idx % colors.length]}
          />
        ))}
        {chartData.zones.length == 0 &&
          fallbackData.zones.map((zone, idx) => (
            <CircularLoaderChart
              key={zone.id}
              value={zone.occupancy_pct}
              svg={zone.icon || icons[idx % icons.length]}
              label={zone.name}
              color={zone.color || colors[idx % colors.length]}
            />
          ))}
      </div>

      {/* Gauge */}
      <GaugeChart
        value={15}
        label="Energy Efficiency"
        change={chartData.delta_pct}
      />
    </div>
  );
}

export default Card2;


// import { useEffect, useState } from "react";
// import CircularLoaderChart from "../Charts/CircularLoaderChart";
// import GaugeChart from "../Charts/GaugeChart";
// import OpacityIcon from "@mui/icons-material/Opacity";
// import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
// import SpaIcon from "@mui/icons-material/Spa";
// import axios from "axios";

// // ---------- Types ----------
// interface Zone {
//   id: string;
//   name: string;
//   value: number; // occupancy percentage
//   color?: string;
//   icon?: React.ReactNode;
// }

// interface OccupancyStatusResponse {
//   timestamp: string;
//   zones: Zone[];
//   energy_efficiency_pct: number;
//   delta_pct: number;
// }

// // ---------- API Call ----------
// const occupancyStatus = async (): Promise<OccupancyStatusResponse | null> => {
//   try {
//     const res = await axios.get<OccupancyStatusResponse>(
//       "/admin/occupancy/status"
//     );
//     console.log("Screen 1 card 2 :" ,res.data)
//     return res.data;
//   } catch {
//     return null;
//   }
// };

// // ---------- Component ----------
// function Card2() {
//   const [data, setData] = useState<OccupancyStatusResponse | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStatus = async () => {
//       const res = await occupancyStatus();
//       setData(res);
//       setLoading(false);
//     };

//     fetchStatus();
//     const interval = setInterval(fetchStatus, 30000); // refresh every 30s
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm p-5 w-full h-full flex justify-center items-center">
//         <p className="text-gray-500">Loading...</p>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm p-5 w-full h-full flex justify-center items-center">
//         <p className="text-red-500">No data available</p>
//       </div>
//     );
//   }

//   // fallback icons/colors if API doesn’t send them
//   const icons = [<OpacityIcon />, <DirectionsRunIcon />, <SpaIcon />];
//   const colors = ["#00BFA6", "#FF7043", "#9575CD"];

//   return (
//     <div className="bg-white rounded-2xl shadow-sm p-5 w-full h-full flex flex-col justify-between items-center">
//       {/* Header */}
//       <div className="flex justify-between w-full items-center mb-4">
//         <div>
//           <p className="text-xl font-semibold">Occupancy Status</p>
//           <p className="text-sm text-gray-500">
//             {new Date(data.timestamp).toLocaleString()}
//           </p>
//         </div>
//         <span className="bg-green-100 text-green-700 text-md w-14 text-center px-2 py-1 rounded-full">
//           live
//         </span>
//       </div>

//       {/* Circular charts row */}
//       <div className="flex justify-around mt-4 w-[90%]">
//         {data.zones.length > 0 ? (
//           data.zones.map((zone, idx) => (
//             <CircularLoaderChart
//               key={zone.id}
//               value={zone.value}
//               svg={zone.icon || icons[idx % icons.length]}
//               label={zone.name}
//               color={zone.color || colors[idx % colors.length]}
//             />
//           ))
//         ) : (
//           <p className="text-gray-400">No zones available</p>
//         )}
//       </div>

//       {/* Gauge */}
//       <GaugeChart
//         value={data.energy_efficiency_pct}
//         label="Energy Efficiency"
//       />
//     </div>
//   );
// }

// export default Card2;