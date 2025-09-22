import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Box } from "@mui/material";

const LinearProgressBar = ({ value, max, label, color, svg, subtext }: any) => {
  const progress = value !== 0 && max !==0 ? (value / max) * 100 : 0;
 
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles("dark", {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: color,
      ...theme.applyStyles("dark", {
        backgroundColor: "#308fe8",
      }),
    },
  }));

  return (
    <Box
      sx={{ width: "100%" }}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 justify-center items-center">
          {svg}

          <div className="flex flex-col gap-1">
            <p className="font-bold text-[16px]">{label}</p>
            <p className="text-gray-500">{subtext}</p>
          </div>
        </div>
        <p className="">
          {value}/{max}
        </p>
      </div>
      <BorderLinearProgress variant="determinate" value={progress} />
    </Box>
  );
};

export default LinearProgressBar;
