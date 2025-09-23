// PropertyHeader.tsx
import React from "react";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";


interface PropertyHeaderProps {
  properties: string[];
  selected: string;
  onChange: (value: string) => void;
  date?: Date;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  properties,
  selected,
  onChange,
  date = new Date(),
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Box
      display="flex"
      gap={ 2 }
      justifyContent={"flex-end"}
      alignItems="center"
      borderRadius="12px"
    >
      {/* Dropdown */}
      <Select
        size="small"
        // fullWidth
        value={selected}
        onChange={handleChange}
        sx={{ fontWeight: 500, minWidth: 160,backgroundColor:"white" ,width:"18vw",height:"50px", borderRadius:"12px !important"}}
      >
        {properties.map((p) => (
          <MenuItem key={p} value={p}>
            {p}
          </MenuItem>
        ))}
      </Select>

      {/* Date + Time */}
      <Typography fontWeight={500}>
        {formattedDate} | {formattedTime}
      </Typography>
    </Box>
  );
};

export default PropertyHeader;
