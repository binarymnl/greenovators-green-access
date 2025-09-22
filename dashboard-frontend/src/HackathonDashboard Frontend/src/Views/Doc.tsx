import Card1 from "../Components/Screen2(Doc)/Card1";
import Card2 from "../Components/Screen2(Doc)/Card2";

function Doc() {
  return (
     <div className="flex flex-col lg:flex-row gap-6 ">
      {/* Left Panel */}
      <div className="flex-1">
        <Card1 />
      </div>

      {/* Right Panel */}
      <div className="flex-1">
        <Card2 />
      </div>
    </div>
  );
}

export default Doc;

// DashboardPage.tsx
// import React from "react";
// import Card1 from "./Card1";
// import Card2 from "./Card2";

// const DashboardPage = () => {
//   return (
//     <div className="flex flex-col lg:flex-row gap-6 p-6">
//       {/* Left Panel */}
//       <div className="flex-1">
//         <Card1 />
//       </div>

//       {/* Right Panel */}
//       <div className="flex-1">
//         <Card2 />
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;
