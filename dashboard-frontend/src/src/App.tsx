import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Views/Home";
import Authgaurd from "./Auth/AuthGaurd";
import Sidebar from "./Views/Sidebar";
import Dashboard from "./Views/Dashboard";
import Doc from "./Views/Doc";
import People from "./Views/People";
import GroupScreen from "./Views/GroupScreen";
import LoginScreen from "./Views/Login_Signup/Login";
import SignupScreen from "./Views/Login_Signup/Signup";
import { useEffect } from "react";
import { useSignalR } from "./Services/useSignalIr";


function App() {

  const { data, connection } = useSignalR<string>({
    url: "https://localhost:7254/dashboardHub",
    method: "LightsON",
  });

  useEffect(() => {
    console.log("yttt");
    if (!connection) return;
    const join = async () => {
      if (connection.state === "Connected") {
        await connection.invoke("SubscribeZone", "zone1");
        console.log("✅ Joined zone1");
      }
    };
    join();
  }, [connection, data]);

  // const data = useSignalR({url:"https://swagger.domucloud.top/dashboardHub",method:"TelemetryUpdated",initialValue:""})
  // useEffect(()=>{
  //   console.log("here in hook : ", data);
  // },[])

  return (
    <>
      <Router>
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route element={<Sidebar />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/doc" element={<Doc/>} />
            <Route path="/group" element={<GroupScreen />} />
            <Route path="/people" element={<People />} />
            <Route element={<Authgaurd />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
