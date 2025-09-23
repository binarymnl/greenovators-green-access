import QuickActionsCard from "../Components/Screen1/Card1"
import Card2 from "../Components/Screen1/Card2"
import EnergyMonitoringCard from "../Components/Screen1/Card3"
import EnergyOptimisationCard from "../Components/Screen1/CardBottom1"
import CarbonFootprintCard from "../Components/Screen1/CardBottom2"
import EnergyGraph from "../Components/Screen1/CardLive"



function Dashboard() {
  return (
    <div className="flex flex-col gap-3 h-full ">
    <div className="flex gap-2 ">
      <div className="flex-3 bg-white h-[50%] rounded-[18px]">
        <QuickActionsCard />
      </div>
      <div className="flex-3 bg-white h-[100%] rounded-[18px]">
        <Card2 />
      </div>
      <div className="flex-3 bg-white h-[100%] rounded-[18px]">
        <EnergyMonitoringCard />
      </div>
    </div>
    <div className="w-full h-full flex gap-2 rounded-[18px]">
      <div className="flex-2/3">
      <EnergyOptimisationCard/>
      </div>
      <div className="flex flex-col flex-1/3 w-[100%]">
      <CarbonFootprintCard/>
      
      </div>
    </div>
    <div className="w-full h-[500px] flex gap-2 rounded-[18px]">
      <EnergyGraph/>
    </div>
    </div>
  )
}

export default Dashboard
