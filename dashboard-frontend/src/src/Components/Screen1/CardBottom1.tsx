// import React from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   LinearProgress,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";

// const BorderLinearProgress = styled(LinearProgress)(() => ({
//   height: 10,
//   borderRadius: 5,
//   "& .MuiLinearProgress-bar": {
//     borderRadius: 5,
//     backgroundColor: "#111827", // dark bar
//   },
//   backgroundColor: "#E5E7EB", // light gray
// }));

// const EnergyOptimisationCard: React.FC = () => {
//   return (
//     <Card className="!rounded-2xl shadow-sm border border-gray-200 ">
//       <CardContent className="p-6 flex flex-col gap-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           {/* Title + Select */}
//           <div className="flex items-center gap-4">
//             <Typography variant="h6" className="font-semibold text-gray-800">
//               Energy Optimisation
//             </Typography>
//             <Select
//               size="small"
//               value="30d"
//               className="bg-white rounded-md"
//               sx={{ minWidth: 80 }}
//             >
//               <MenuItem value="7d">7d</MenuItem>
//               <MenuItem value="30d">30d</MenuItem>
//               <MenuItem value="90d">90d</MenuItem>
//             </Select>
//           </div>

//           {/* Annual reduction goal */}
//           <div className="flex flex-col gap-1 w-full md:w-[40%]">
//             <div className="flex justify-between text-sm font-medium text-gray-700">
//               <span>Annual Reduction Goal</span>
//               <span>35/40%</span>
//             </div>
//             <BorderLinearProgress variant="determinate" value={35 / 40 * 100} />
//             <Typography variant="body2" className="text-gray-500">
//               35% achieved · 5% remaining
//             </Typography>
//           </div>
//         </div>

//         {/* Stats grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {/* Card 1 */}
//           <div className="rounded-xl border border-gray-200 p-4 flex flex-col">
//             <Typography variant="body2" className="text-gray-600">
//               Recommendations Implemented
//             </Typography>
//             <Typography variant="h6" className="font-bold">
//               23 <span className="text-gray-500 text-sm">/30</span>
//             </Typography>
//             <Typography variant="caption" className="text-gray-500">
//               This Month
//             </Typography>
//           </div>

//           {/* Card 2 */}
//           <div className="rounded-xl border border-gray-200 p-4 flex flex-col">
//             <Typography variant="body2" className="text-gray-600">
//               Energy Saved
//             </Typography>
//             <Typography variant="h6" className="font-bold">
//               2840 <span className="text-gray-500 text-sm">kWh</span>
//             </Typography>
//             <Typography variant="caption" className="text-gray-500">
//               This Week
//             </Typography>
//           </div>

//           {/* Card 3 */}
//           <div className="rounded-xl border border-gray-200 p-4 flex flex-col">
//             <Typography variant="body2" className="text-gray-600">
//               CO₂ Reduced
//             </Typography>
//             <Typography variant="h6" className="font-bold">
//               1.2 <span className="text-gray-500 text-sm">tonnes</span>
//             </Typography>
//             <Typography variant="caption" className="text-gray-500">
//               This Month
//             </Typography>
//           </div>

//           {/* Card 4 */}
//           <div className="rounded-xl border border-gray-200 p-4 flex flex-col">
//             <Typography variant="body2" className="text-gray-600">
//               Cost Savings
//             </Typography>
//             <Typography variant="h6" className="font-bold">
//               426 <span className="text-gray-500 text-sm">USD</span>
//             </Typography>
//             <Typography variant="caption" className="text-gray-500">
//               This Month
//             </Typography>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default EnergyOptimisationCard;

import React, { useState } from "react";
import {
  // Card,
  CardContent,
  Typography,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import {
//   AnnualCarbon,
//   CarbonImpact,
//   type AnualCarbon,
// } from "../../Services/ApiServices";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#111827", // dark bar
  },
  backgroundColor: "#E5E7EB", // light gray
}));

// Fake dataset
const fakeData: Record<
  string,
  {
    goal: { achieved: number; target: number };
    stats: {
      recommendations: { value: number; total: number; period: string };
      energy: { value: number; unit: string; period: string };
      co2: { value: number; unit: string; period: string };
      cost: { value: number; unit: string; period: string };
    };
  }
> = {
  "7d": {
    goal: { achieved: 10, target: 40 },
    stats: {
      recommendations: { value: 8, total: 30, period: "This Week" },
      energy: { value: 720, unit: "kWh", period: "This Week" },
      co2: { value: 0.3, unit: "tonnes", period: "This Week" },
      cost: { value: 120, unit: "USD", period: "This Week" },
    },
  },
  "30d": {
    goal: { achieved: 35, target: 40 },
    stats: {
      recommendations: { value: 23, total: 30, period: "This Month" },
      energy: { value: 2840, unit: "kWh", period: "This Month" },
      co2: { value: 1.2, unit: "tonnes", period: "This Month" },
      cost: { value: 426, unit: "USD", period: "This Month" },
    },
  },
  "90d": {
    goal: { achieved: 38, target: 40 },
    stats: {
      recommendations: { value: 28, total: 30, period: "Last 3 Months" },
      energy: { value: 8200, unit: "kWh", period: "Last 3 Months" },
      co2: { value: 3.6, unit: "tonnes", period: "Last 3 Months" },
      cost: { value: 1300, unit: "USD", period: "Last 3 Months" },
    },
  },
};

const EnergyOptimisationCard: React.FC = () => {
  const [range, setRange] = useState("30d");
  const data = fakeData[range];

  // const [annualcarbon, setAnnualCarbon] = useState<AnualCarbon | null>();
  // const [carbonImpact, setCarbonImpact] = useState<CarbonImpact | null>();

  // useEffect(() => {
  //   const fetch = async () => {
  //     const annualcarbon = await AnnualCarbon();
  //     setAnnualCarbon(annualcarbon);

  //     const carbonimpact = await CarbonImpact();
  //     setCarbonImpact(carbonimpact);
  //   };
  //   fetch();
  // }, []);

  return (
    <div className="!rounded-2xl border bg-white border-gray-200 h-[100%]">
      <CardContent className="p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Title + Select */}
          <div className="flex items-center gap-4">
            <div className="text-xl font-semibold">Energy Optimisation</div>
            <Select
              size="small"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="bg-white rounded-md"
              sx={{ minWidth: 80 }}
            >
              <MenuItem value="7d">7d</MenuItem>
              <MenuItem value="30d">30d</MenuItem>
              <MenuItem value="90d">90d</MenuItem>
            </Select>
          </div>

          {/* Annual reduction goal */}
          <div className="flex flex-col gap-1 w-full md:w-[40%]">
            <div className="flex justify-between text-sm font-medium text-gray-700">
              <span>Annual Reduction Goal</span>
              <span>
                {data.goal.achieved}/{data.goal.target}%
              </span>
            </div>
            <BorderLinearProgress
              variant="determinate"
              value={(data.goal.achieved / data.goal.target) * 100}
            />
            <Typography variant="body2" className="text-gray-500">
              {data.goal.achieved}% achieved ·{" "}
              {data.goal.target - data.goal.achieved}% remaining
            </Typography>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="rounded-xl border border-gray-200 p-4 flex flex-col">
            <Typography variant="body2" className="text-gray-600">
              Recommendations Implemented
            </Typography>
            <Typography variant="h6" className="font-bold">
              {data.stats.recommendations.value}{" "}
              <span className="text-gray-500 text-sm">
                /{data.stats.recommendations.total}
              </span>
            </Typography>
            <Typography variant="caption" className="text-gray-500">
              {data.stats.recommendations.period}
            </Typography>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-gray-200 p-4 flex flex-col">
            <Typography variant="body2" className="text-gray-600">
              Energy Saved
            </Typography>
            <Typography variant="h6" className="font-bold">
              {data.stats.energy.value}{" "}
              <span className="text-gray-500 text-sm">
                {data.stats.energy.unit}
              </span>
            </Typography>
            <Typography variant="caption" className="text-gray-500">
              {data.stats.energy.period}
            </Typography>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-gray-200 p-4 flex flex-col">
            <Typography variant="body2" className="text-gray-600">
              CO₂ Reduced
            </Typography>
            <Typography variant="h6" className="font-bold">
              {data.stats.co2.value}{" "}
              <span className="text-gray-500 text-sm">
                {data.stats.co2.unit}
              </span>
            </Typography>
            <Typography variant="caption" className="text-gray-500">
              {data.stats.co2.period}
            </Typography>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl border border-gray-200 p-4 flex flex-col">
            <Typography variant="body2" className="text-gray-600">
              Cost Savings
            </Typography>
            <Typography variant="h6" className="font-bold">
              {data.stats.cost.value}{" "}
              <span className="text-gray-500 text-sm">
                {data.stats.cost.unit}
              </span>
            </Typography>
            <Typography variant="caption" className="text-gray-500">
              {data.stats.cost.period}
            </Typography>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default EnergyOptimisationCard;
