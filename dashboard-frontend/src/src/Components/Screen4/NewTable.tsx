import React, { useState } from "react";
import {
  Card,
  CardContent,
  InputBase,
  Switch,
  Button,
} from "@mui/material";
import { Search, FilterList, Notifications, CalendarToday } from "@mui/icons-material";
import CustomTable from "./Customtable"

const CustomTableCard: React.FC = () => {
  // Example data
  const columns = [
    { id: "member", label: "Member", align: "left" as const },
    { id: "email", label: "Email", align: "left" as const },
    { id: "status", label: "Status", align: "center" as const },
    { id: "ecoPoints", label: "Eco points", align: "right" as const },
  ];

  const rows = [
    { id: 1, member: "Cody Fisher", email: "fisher.code@gmail.com", status: "ENTERED", ecoPoints: 429 },
    { id: 2, member: "Bessie Cooper", email: "b.cooper@gmail.com", status: "ENTERED", ecoPoints: 426 },
    { id: 3, member: "Savannah Nguyen", email: "aavannagn@gmail.com", status: "PENDING", ecoPoints: 512 },
    { id: 4, member: "Jenny Wilson", email: "will.jenny@gmail.com", status: "ENTERED", ecoPoints: 381 },
    { id: 5, member: "Van Garfield", email: "Vany34@gmail.com", status: "ENTERED", ecoPoints: 382 },
    { id: 6, member: "Floyed Miles", email: "Fisher.code@gmail.com", status: "ENTERED", ecoPoints: 467 },
  ];

  const [ecoToggle, setEcoToggle] = useState(true);

  return (
    <Card className="rounded-2xl">
      <CardContent>
        {/* --- Header bar --- */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
          {/* Left side controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range */}
            <Button
              variant="outlined"
              startIcon={<CalendarToday />}
              className="normal-case"
            >
              8 May 2024 – 6 Jun 2024
            </Button>

            {/* Dropdown filter */}
            <Button
              variant="outlined"
              className="normal-case"
            >
              Last 30 days
            </Button>

            {/* Search */}
            <div className="flex items-center px-3 py-1 border rounded-lg bg-gray-50">
              <Search className="text-gray-500 mr-2" fontSize="small" />
              <InputBase placeholder="Search member" className="text-sm" />
            </div>

            {/* Notify visitors */}
            <Button
              variant="outlined"
              startIcon={<Notifications />}
              className="normal-case"
            >
              Notify Visitors
            </Button>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="outlined"
              endIcon={<FilterList />}
              className="normal-case"
            >
              Most Eco points
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Automate eco point distribution
              </span>
              <Switch
                checked={ecoToggle}
                onChange={(e) => setEcoToggle(e.target.checked)}
              />
            </div>
          </div>
        </div>

        {/* --- Table --- */}
        <CustomTable
          columns={columns}
          rows={rows}
          headBgColor="#f9fafb"
          borderColor="#e5e7eb"
          hoverColor="#f3f4f6"
        />
      </CardContent>
    </Card>
  );
};

export default CustomTableCard;
