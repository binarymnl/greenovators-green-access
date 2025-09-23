import { useState } from "react";
import Header from "../Components/Header";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const nav = useNavigate();

  const menuItems = [
    {
      key: "/",
      activeIcon: "Icons/home-active.svg",
      inactiveIcon: "Icons/home-01.svg",
    },
    {
      key: "/doc",
      activeIcon: "Icons/document-active.svg",
      inactiveIcon: "Icons/document-text.svg",
    },
    {
      key: "/group",
      activeIcon: "Icons/Group-active.svg",
      inactiveIcon: "Icons/Group.svg",
    },
    {
      key: "/people",
      activeIcon: "Icons/people-active.svg",
      inactiveIcon: "Icons/People.svg",
    },
    {
      key: "/settings",
      activeIcon: "Icons/setting-2.svg", // settings stays green always
      inactiveIcon: "Icons/setting-2.svg",
    },
  ];

  return (
    <div className="flex bg-[#F3F4F3] overflow-hidden">
      {/* Sidebar */}
      <div className="bg-[#F3F4F3] h-[100vh] w-[6%] flex flex-col items-center">
        {/* Logo */}
        <div className="mt-15">
          <img src="Icons/Mainicons.png" className="h-[50px] w-[50px] mt-7" alt="Logo" />
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2 mt-20 h-fit w-[52px] items-center">
          {menuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => {
                setActive(item.key);
                if (item.key !== "/") {
                  nav(`${item.key}`);
                } else {
                  nav("/");
                }
              }}
              className={`h-full w-full flex justify-center p-2 rounded-[13.68px] cursor-pointer ${
                active === item.key ? "bg-[#00B0A2]" : ""
              }`}
            >
              <img
                className="h-[27.37px] w-[27.37px]"
                src={active === item.key ? item.activeIcon : item.inactiveIcon}
                alt={item.key}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Header */}

      <Header />
    </div>
  );
}

export default Sidebar;
