import api from "./Axios"

// Screen 1 Home
export const quickActions = async()=>{
    try{
        return await api.get("/admin/actions");
    }
    catch{
        return [];
    }
}

export const energyOptimization = async() =>{
    try{
        return await api.get("/admin/energy-optimisation?period=30d");
    }
    catch{
        return [];
    }
}

export interface Zone {
  id?: string;
  name: string;
  occupancy_pct: number; // occupancy percentage
  color?: string;
  icon?: React.ReactNode;
}

export interface OccupancyStatusResponse {
  timestamp: string;
  zones: Zone[];
  energy_efficiency_pct: number;
  delta_pct: number;
}

export const occupancyStatus = async (): Promise<OccupancyStatusResponse | null> => {
  try {
    const  res = await api.get("/admin/occupancy/status");
    return res.data;
  } catch {
    return null;
  }
};

export interface energyStatus {
    "zone":string;
    "status":string; 
    "usage":number;
    "limit":number;
}
export const energyStatus = async ():Promise<energyStatus | null> =>{
    try{
        return (await api.get<energyStatus>("/admin/energy/status")).data;
    }
    catch{
        return null;
    }
}

export interface CarbonCurrent {
    current: number;
    unit: string;
    comparison_pct: number;
    progress_pct: number;
}

export const carbonCurrent = async(): Promise<CarbonCurrent | null> =>{
    try{
        const res = await api.get<CarbonCurrent>("/admin/carbon/current");
        return res.data;
    }
    catch{
        return null;
    }
}

//Screen 2 Doc
export const recommendations = async() => {
    try{
        return (await api.get("/api/Recommendations"));
    }
    catch{
        return [];
    }
}

export const peakConsumption = async() => {
    try{
        return (await api.get("/admin/consumption/pattern?period=week")).data;
    }   
    catch{
        return [];
    }
}

export const doughNutChart = async() => {
    try{
        return (await api.get("/admin/occupancy/distribution?period=day")).data;
    }   
    catch{
        return [];
    }
}

export const barChart = async() => {
    try{
        return await api.get("/admin/emissions/forecast?period=daily");
    }
    catch{
        [];
    }
}

export interface AnualCarbon{
  current: number,
  target: number,
  progress_pct: number,
  unit: "kg CO2e"
}

export const AnnualCarbon = async():Promise<AnualCarbon | null> => {
    try{
        return (await api.get<AnualCarbon>("/admin/carbon/annual-goal")).data;
    }
    catch{
        return null;
    }
}

export interface CarbonImpact{
  last_30d: 0,
  prev_30d: 0,
  reduction_pct: 0,
  message: string
}

export const CarbonImpact = async():Promise<CarbonImpact | null> => {
    try{
        return (await api.get<CarbonImpact>("/admin/carbon/impact")).data;
    }
    catch{
        return null;
    }
}
// /admin/consumption/pattern?period=week

//Screen 3 Forecast

// {
//   "hourly": [],
//   "peak_hour": null,
//   "avg_dwell_time_min": 0
// }

export interface TodayForecast{
     hourly: any[],
     peak_hour: number,
     avg_dwell_time_min: number    
}
export const todayForecast = async() : Promise<TodayForecast | null> =>{
    try{
        const res = await api.get<TodayForecast>("/admin/forecast/today");
        return res.data;
    }
    catch{
        return null;
    }
}

export interface peakDay {
  day: string | null,
  visitors: number,
  message: string
}

export const PeakDay = async() : Promise<peakDay|null> =>{
    try{
        const res = await api.get("/admin/forecast/best-day");
        return res.data;
    }
    catch{
        return null;
    }
}

export interface peakHour {
  hour: string | null,
  visitors: number,
  highlight: string
}

export const PeakHour = async() : Promise<peakHour|null> =>{
    try{
        const res = await api.get("/admin/forecast/peak-hour");
        return res.data;
    }
    catch{
        return null;
    }
}

export interface dwell {
  avg_dwell_time_min: number,
  change_pct: number
}

export const Dwell = async() : Promise<dwell|null> =>{
    try{
        const res = await api.get("/admin/forecast/dwell");
        return res.data;
    }
    catch{
        return null;
    }
}

export const weeklyForecast = async() =>{
    try{
        return (await api.get("/admin/forecast/weekly")).data;
    }
    catch{
       return null 
    }
}

export const insightsForecast = async() =>{
    try{
        return await api.get("/admin/forecast/insights");
    }
    catch{
    
    }
}
// /admin/forecast/today → today’s hourly forecast (visitors, occupancy).
// GET /admin/forecast/weekly → weekly forecast (visitors, confidence).
// GET /admin/forecast/insights

//Screen 4 People

