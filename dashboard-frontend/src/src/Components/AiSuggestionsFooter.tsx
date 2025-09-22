import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Sparkles } from "lucide-react";

interface InsightFooterProps {
  message: React.ReactNode;
  onCheckMore?: () => void;
}

const InsightFooter: React.FC<InsightFooterProps> = ({ message, onCheckMore }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      borderRadius={2}
      sx={{ backgroundColor: "#F9FAFB" }}
    >
      {/* Left Section */}
      <Box display="flex" alignItems="center" gap={1.5}>
        <Sparkles size={18} color="#00A093" />
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{ color: "#00A093", letterSpacing: 1 }}
        >
          AI INSIGHTS
        </Typography>
        <Box
          sx={{
            width: "1px",
            height: "20px",
            backgroundColor: "#E0E0E0",
            mx: 1,
          }}
        />
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </Box>

      {/* Right Section */}
      <Button
        variant="outlined"
        size="small"
        endIcon={<span style={{ fontSize: "16px" }}>→</span>}
        sx={{
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 500,
        }}
        onClick={onCheckMore}
      >
        Check More AI Insights
      </Button>
    </Box>
  );
};

export default InsightFooter;
