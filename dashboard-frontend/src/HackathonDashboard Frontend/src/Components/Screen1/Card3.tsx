import React, { useEffect, useState } from "react";
import {
  CardContent,
  Typography,
  Chip,
  Divider,
  // Button,
} from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SpaIcon from "@mui/icons-material/Spa";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import {
  energyStatus as fetchEnergyStatus,
  type energyStatus as EnergyStatusApi,
} from "../../Services/ApiServices";

type Status = "Optimal" | "High";

interface MonitoringItem {
  id: number;
  label: string;
  icon: React.ReactNode;
  status: Status;
  value: string;
}

const statusColors = {
  Optimal: {
    bg: "bg-green-50",
    text: "text-green-600",
    mui: "success" as const,
  },
  High: { bg: "bg-red-50", text: "text-red-600", mui: "error" as const },
};

// static UI items (keep icons & labels)
const staticItems: MonitoringItem[] = [
  {
    id: 1,
    label: "PoolArea",
    icon: <OpacityIcon />,
    status: "Optimal",
    value: "234/546",
  },
  {
    id: 2,
    label: "EventHall",
    icon: <HourglassEmptyIcon />,
    status: "High",
    value: "234/546",
  },
  {
    id: 3,
    icon: <SpaIcon />,
    label: "LockerRoom",
    status: "Optimal",
    value: "234/546",
  },
  {
    id: 4,
    label: "GymHall",
    icon: <DirectionsRunIcon />,
    status: "Optimal",
    value: "234/546",
  },
];

// fallback API data typed with your interface (no icons)
const apiFallback: EnergyStatusApi[] = [
  { zone: "PoolArea", status: "Optimal", usage: 234, limit: 546 },
  { zone: "LockerRoom", status: "High", usage: 234, limit: 546 },
  { zone: "EventHall", status: "Optimal", usage: 234, limit: 546 },
  { zone: "GymHall", status: "Optimal", usage: 234, limit: 546 },
];

const EnergyMonitoringCard: React.FC = () => {
  const [items, setItems] = useState<MonitoringItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchEnergyStatus();
        console.log("Res monitoring : ", res)
        setLoading(false);
        const apiList: EnergyStatusApi[] = res
          ? Array.isArray(res)
            ? (res as unknown as EnergyStatusApi[])
            : [res as EnergyStatusApi]
          : apiFallback;
        console.log(res);
        // build lookup by zone (lowercase)
        const lookup = new Map<string, EnergyStatusApi>();
        apiList.forEach((a) =>
          lookup.set((a.zone ?? "").toString().toLowerCase(), a)
        );

        const merged = staticItems.map((si) => {
          const match = lookup.get(si.label.toLowerCase());
          if (!match) return si;
          const statusNormalized: Status =
            (match.status ?? "").toString().toLowerCase() === "high"
              ? "High"
              : "Optimal";
          const value = ` ${match.usage > 10000 ? Math.floor(Number(match.usage)/1000 ) : Math.floor(Number(match.usage)/100 )  ?? 0}/${match.status === "High" ? match.limit/2 : match.limit ?? 0}`;
          return { ...si, status: statusNormalized, value };
        });

        setItems(merged);
      } catch {
        // fallback to static UI data if anything fails
        setItems(staticItems);
      }
    };
    load();
  }, []);
  if (loading)
    return (
      <div className="bg-white rounded-2xl shadow-sm p-5 w-full h-full flex justify-center items-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  return (
    <div className="!rounded-2xl w-full h-full flex flex-col  justify-between">
      <CardContent className="p-5 h-full w-full relative flex flex-col items-center">
        {/* Header */}
        <div className="flex justify-between items-center w-full mb-4 ">
          <div  className="text-xl font-semibold">
            Energy Monitoring
          </div>
          <Chip label="Today" size="small" sx={{bgcolor:"#029F8E"}} />
        </div>

        {/* List Items */}
        <div className="space-y-3 w-full ">
          {items.map((item, idx) => (
            <div key={item.id}>
              <div className="flex justify-between items-center py-1">
                {/* Left: Icon + Label */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">{item.icon}</span>
                  <Typography className="text-gray-800 font-medium">
                    {item.label}
                  </Typography>
                </div>

                {/* Right: Status + Value */}
                <div className="flex items-center gap-3">
                  <Chip
                    label={item.status}
                    size="small"
                    className={`${statusColors[item.status].bg} ${
                      statusColors[item.status].text
                    }`}
                  />
                  <Typography className="text-gray-700 font-medium">
                    {item.value}
                  </Typography>
                </div>
              </div>

              {/* Divider except last item */}
              {idx < items.length - 1 && <Divider />}
            </div>
          ))}
        </div>

        {/* Footer button */}
        {/* <div className="mt-5 absolute bottom-5 w-[90%] ">
          <Button
            variant="outlined"
            fullWidth
            className="rounded-xl normal-case font-medium"
          >
            Manage utilities
          </Button>
        </div> */}
      </CardContent>
    </div>
  );
};

export default EnergyMonitoringCard;
