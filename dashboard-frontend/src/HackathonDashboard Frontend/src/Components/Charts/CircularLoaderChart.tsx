// components/DeterministicCircular.tsx
import React from 'react';
import { Box, CircularProgress, circularProgressClasses, Typography } from '@mui/material';

interface CircularLoaderChart {
  value: number;       // 0-100
  label?: string;      // optional label below percentage
  size?: number;       // size of the circle
  thickness?: number;  // thickness of the circle
  color?: string;      // circle color
  svg?: React.ReactNode;
}

const CircularLoaderChart: React.FC<CircularLoaderChart> = ({
  value,
  label,
  svg ,
  size = 80,
  thickness = 3,
  color = '#000000', // default black
}) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={100}
          size={size}
          thickness={thickness}
          sx={{ color: '#e0e0e0' }} // background circle color
        />
        <CircularProgress
          variant="determinate"
          value={value}
          size={size}
          thickness={thickness}
          
          sx={{
            color: color,
            position: 'absolute',
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
            },
          }}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h6" component="div" color="textPrimary">
            {svg}
          </Typography>
        </Box>
      </Box>
      {label && (

        <Typography display={"flex"} flexDirection={"column"} variant="subtitle2" color="textSecondary" mt={1}>
           <div className='text-2xl text-center font-extrabold text-black'>
            {`${value ?? ""}%`} 
            </div>
            <div className='text-[15px] text-center font-medium text-[#858585]'>
                {label}
            </div>
        </Typography>
      )}
    </Box>
  );
};

export default CircularLoaderChart;
