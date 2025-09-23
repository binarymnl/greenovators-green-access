import React, { useEffect, useState } from "react";
import { CardContent, Typography, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Leaf, TrendingDown, TrendingUp, Minus } from "lucide-react"; // you can use MUI icons too
import { carbonCurrent, type CarbonCurrent } from "../../Services/ApiServices";

// Custom styled LinearProgress for Tailwind-like look
const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#111827", // dark fill
  },
  backgroundColor: "#E5E7EB", // light gray
}));

const CarbonFootprintCard: React.FC = () => {
  const [carbon, setCarbon] = useState<CarbonCurrent | null>(null);

  useEffect(() => {
    const callApi = async () => {
      const res = await carbonCurrent();
      setCarbon(res);
    };
    callApi();
  }, []);

  return (
    <div className="!rounded-2xl border bg-white border-gray-200 w-[100%] h-[100%]">
      <CardContent className="flex flex-col gap-4 p-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Leaf className="text-green-600 w-5 h-5" />
          <Typography  className="text-xl font-semibold">
            Current Carbon Footprint
          </Typography>
        </div>

        {/* Main metric */}
        <div>
          <Typography variant="h4" className="font-bold">
            {(carbon?.current) ?? 0}{" "}
            <span className="text-lg font-normal text-gray-600">
              {carbon?.unit ?? "kg CO₂e"}
            </span>
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            Current period 
          </Typography>
        </div>

        {/* Comparison */}
        {(() => {
          const comp = -18 
          const isLower = comp < 0;
          const isHigher = comp > 0;
          // const isFlat = comp === 0;
          const arrow = isLower ? <TrendingDown className="w-4 h-4" /> : isHigher ? <TrendingUp className="w-4 h-4" /> : <Minus className="w-4 h-4" />;
          const colorClass = isLower ? "text-green-600" : isHigher ? "text-red-600" : "text-gray-400";
          return (
            <div
              className={`flex items-center gap-1 ${colorClass} font-semibold text-sm`}
            >
              <span className="flex items-center gap-2 w-fit">
                {arrow}
                {`${Math.abs(comp)}% ${isLower ? "lower" : "higher"}`}
              </span>
              <Typography variant="body2" className="text-gray-500 font-normal">
                vs. previous period
              </Typography>
            </div>
          );
        })()}

        {/* Progress */}
        <div className="flex flex-col gap-2">
          <Typography variant="body2" className="text-gray-700">
            Progress to daily target
          </Typography>
          <div className="flex items-center gap-2">
            <BorderLinearProgress
              variant="determinate"
              value={10}
              className="flex-1"
            />
            <Typography variant="body2" className="text-gray-800 font-medium">
              {10 }%
            </Typography>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default CarbonFootprintCard;
