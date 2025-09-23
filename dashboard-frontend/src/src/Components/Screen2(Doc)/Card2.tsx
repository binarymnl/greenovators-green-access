// Card2.tsx
import { useEffect, useState } from "react";
import EmissionsChart from "../Charts/BarChart";
import LinearProgressBar from "../Charts/LinearProgressBar";
import { AnnualCarbon, CarbonImpact, type AnualCarbon } from "../../Services/ApiServices";


const Card2 = () => {
  // Bar chart data
  const emissionsData = {
    usage: [78, 82, 94, 62, 76, 76, 76],
    underLimit: [20, 18, 0, 30, 20, 20, 20],
    beyondLimit: [2, 0, 6, 8, 4, 4, 4],
  };

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [annualcarbon , setAnnualCarbon] = useState<AnualCarbon | null>();
  const [ , setCarbonImpact] = useState<CarbonImpact | null>();

  useEffect(()=>{
     const fetch = async() => {
       const annualcarbon = await AnnualCarbon();
       setAnnualCarbon(annualcarbon);
       
       const carbonimpact = await CarbonImpact();
       setCarbonImpact(carbonimpact);
     } 
     fetch()
  },[])

  return (
    <div className="flex flex-col  gap-6  h-[90%]">
      <div className="bg-white rounded-xl p-4 w-full">
        <div className="text-lg font-semibold">Emissions forecast</div>
        <EmissionsChart labels={labels} data={emissionsData} />
      </div>
      {/* <hr className="text-[#14191133]" /> */}

      <div className="h-[100%] w-[100%] flex flex-col gap-5 justify-center bg-white rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-2">CO₂ Reduction Impact & Goals</h3>
        <LinearProgressBar
          value={annualcarbon?.current ?? 0}
          max={2000}
          label="Annual Reduction Goal"
          color="#000"
          svg={<span>🌍</span>}
          subtext={`${annualcarbon?.current ?? 0} achieved • ${((annualcarbon?.current ?? 0) - (annualcarbon?.target ?? 0))} remaining`}
        />
        <div className="flex justify-around  gap-5 mt-4">
          <div className="bg-green-100 text-green-700 rounded-lg px-6 py-3 text-center w-[50%] h-[15vh] flex flex-col justify-center">
            <p className="text-3xl font-bold">2.8t</p>
            <p className="text-md">CO₂ Saved This Month</p>
          </div>
          <div className="bg-indigo-100 text-indigo-700 rounded-lg px-6 py-3 text-center w-[50%] h-[15vh] flex flex-col justify-center">
            <p className="text-3xl font-bold">142</p>
            <p className="text-md">Trees Equivalent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card2;
