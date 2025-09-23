import React, { useEffect } from "react";
import {
  CardContent,
  Typography,
} from "@mui/material";
// import { CheckCircle } from "lucide-react"; // or use @mui/icons-material/CheckCircle
import { quickActions } from "../../Services/ApiServices";
// import api from "../../Services/Axios";

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
    description: "Reduce temp by 0.5°C during off-peak",
    savings: "Saves: 40 kWh/day",
    enabled: true,
  },
  {
    id: 3,
    title: "Smart Ventilation",
    description: "AI-controlled circulation based on occupancy",
    savings: "Saves: 60 kWh/day",
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
              {/* {action.enabled ? (
                <CheckCircle className="text-green-500 w-6 h-6" />
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  className="rounded-full border-green-600 text-green-600 hover:bg-green-50"
                >
                  Enable
                </Button>
              )} */}
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
