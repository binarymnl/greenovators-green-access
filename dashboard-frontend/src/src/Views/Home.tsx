import LinearProgressBar from "../Components/Charts/LinearProgressBar";
import CircularLoaderChart from "../Components/Charts/CircularLoaderChart";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import CustomTabs from "../Components/CustomTabs";
import ChartJSChart, {
  sampleBarData,
  sampleLineData,
  samplePieData,
} from "../Components/Charts/ReactCharts";
import CustomTable from "../Components/Table";
import GaugeChart from "../Components/Charts/GaugeChart";
import StackedAreaChart from "../Components/Charts/FilledLineChart";
import EmissionsChart from "../Components/Charts/BarChart";
import UsageForecastChart from "../Components/Charts/UsageForecastGraph";

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "role", label: "Role", minWidth: 100 },
];

const rows = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 2 === 0 ? "Admin" : "Attendee",
}));

function Home() {
  return (
    <div className="p-4 space-y-6">
      {/* Circular Loader */}
      <CircularLoaderChart
        color="red"
        value={72}
        label="gym"
        svg={<SportsGymnasticsIcon />}
      />

      {/* Linear Progress */}
      <div className="w-[20%]">
        <LinearProgressBar
          value="108"
          svg={<SportsGymnasticsIcon />}
          subtext={"gym"}
          max={123}
          label={"waste"}
        />
      </div>

      {/* Charts inside Tabs */}
      <div className="mt-4">
        <CustomTabs
          variant="capsule"
          tabs={[
            {
              label: "Pie Chart",
              content: (
                <div className="flex justify-center">
                  <div className="w-full md:w-[400px]">
                    <ChartJSChart type="pie" data={samplePieData} />
                  </div>
                </div>
              ),
            },
            {
              label: "Bar Graph",
              content: (
                <div className="flex justify-center">
                  <div className="w-full md:w-[500px]">
                    <ChartJSChart type="bar" data={sampleBarData} />
                  </div>
                </div>
              ),
            },
            {
              label: "Energy Curve",
              content: (
                <div className="flex justify-center">
                  <div className="w-full md:w-[500px]">
                    <ChartJSChart type="line" data={sampleLineData} />
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>

      <div>
        <CustomTable columns={columns} rows={rows} />;
      </div>
      <div>
        <GaugeChart value={80} label="gym" />
      </div>

      <div className="h-[900px] w-[900px] flex justify-center items-center">
        <StackedAreaChart
          labels={[
            "6:00",
            "7:00",
            "8:00",
            "9:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
          ]}
          weekday={[10, 50, 200, 270, 180, 220, 300, 360, 250, 150]}
          weekend={[5, 30, 120, 180, 150, 180, 220, 270, 200, 90]}
          holiday={[2, 20, 80, 100, 90, 100, 140, 160, 120, 70]}
        />
      </div>

      <div className="h-[900px] w-[900px] flex justify-center items-center">
        <EmissionsChart
          labels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
          data={{
            usage: [78, 82, 94, 62, 76],
            underLimit: [22, 18, 0, 38, 24],
            beyondLimit: [0, 0, 6, 0, 0],
          }}
        />
      </div>

      <div className="h-[900px] w-[900px] flex justify-center items-center">
        <UsageForecastChart
          labels={[
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
          ]}
          data={{
            forecast: [85, 92, 88, 77, 65, 48, 35, 20],
            baseline: [83, 89, 80, 70, 60, 45, 32, 18],
          }}
        />
      </div>
    </div>
  );
}

export default Home;
