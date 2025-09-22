import { Box, Button } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import PropertyHeader from "./DateTimeProperty";
import { useState } from "react";
import { Download } from "lucide-react";
import InsightFooter from "./AiSuggestionsFooter";

function Header() {
  const location = useLocation();
  const [selected, setSelected] = useState<string>("Gym");

  const getHeader = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/doc":
        return "Consumption Analysis";
      case "/people":
        return "Members";
      case "/group":
        return "Forecast";
    }
  };
  return (
    <div className="h-[12vh] w-[93%] bg-[#F3F4F3]">
      <div className=" flex justify-between h-[54px] w-[99%] mt-5 ">
        {/* <Select className="!w-[229px]"> </Select> */}
        {location.pathname !== "/" && (
          <div className="text-[32px] font-medium">{getHeader()}</div>
        )}

        {location.pathname === "/" && (
          <Button
            className="!w-[279px] !text-white !rounded-[10px] p-2"
            sx={{
              background:
                "linear-gradient(90deg, #01A093 0%, #029F8E 100%) !important",
              textTransform: "none",
              "&:hover": {
                background:
                  "linear-gradient(90deg, #018679 0%, #027c72 100%) !important",
              },
            }}
            startIcon={<Download size={20} />}
          >
            Energy Consumption Report
          </Button>
        )}

        <div className="w-[40%]">
          <PropertyHeader
            properties={["Property Name", "Villa Green", "Ocean View", "Gym"]}
            selected={selected}
            onChange={setSelected}
            date={new Date(Date.now())}
          />
        </div>
        
      </div>
      <Box
        className="flex flex-col gap-2 h-[90vh] mt-2 overflow-auto"
        sx={{
          "&::-webkit-scrollbar": {
            width: "9px",
            borderRadius: "20px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#d3d3d3",
            borderRadius: "18px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#bfbfbf",
          },
        }}
      >
        <InsightFooter
          message={
            <>
              AI detected low occupancy in locker areas. <b>Reducing HVAC</b> by{" "}
              <b>15%</b> could save <b>240 kWh</b> today.
            </>
          }
          onCheckMore={() => console.log("Check More AI Insights clicked")}
        />

        <Outlet />
      </Box>
    </div>
  );
}

export default Header;
