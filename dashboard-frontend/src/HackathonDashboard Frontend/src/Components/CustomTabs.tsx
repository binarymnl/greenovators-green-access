import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Capsule Variant
const CapsuleTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  borderRadius: "999px",
  marginRight: theme.spacing(1),
  padding: theme.spacing(1, 3),
  minHeight: "auto",
  fontWeight: 500,
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

// Normal Variant
const NormalTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(1),
  padding: theme.spacing(1, 2),
  minHeight: "auto",
  fontWeight: 500,
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

// Tab Item Interface
interface TabItem {
  label: string | React.ReactNode;
  content: React.ReactNode;
}

interface CustomTabsProps {
  tabs: TabItem[];
  variant?: "capsule" | "normal";
  onChange?: (value: number) => void;
  tabsBgColor?: string; // NEW: customize background
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  variant = "normal",
  onChange,
  tabsBgColor = "#f5f5f5", // default light gray
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  const TabComponent = variant === "capsule" ? CapsuleTab : NormalTab;

  return (
    <Box
      maxWidth={"600px"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      {/* Tabs Header with background capsule */}
      <Box
  sx={{
    backgroundColor: tabsBgColor,
    borderRadius: variant === "capsule" ? "999px" : 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 1, // small padding looks better
  }}
>
  <Tabs
    value={value}
    onChange={handleChange}
    TabIndicatorProps={{ style: { display: "none" } }}
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {tabs.map((tab, index) => (
      <TabComponent key={index} label={tab.label} />
    ))}
  </Tabs>
</Box>

      {/* Tab Content */}
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

export default CustomTabs;

// Panel
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
