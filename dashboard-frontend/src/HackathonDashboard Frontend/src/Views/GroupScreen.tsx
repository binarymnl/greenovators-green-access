import Card3 from "../Components/Screen3/Card1";
import Card4 from "../Components/Screen3/Card2";

function Group() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <Card3 />
      </div>
      <div className="flex-1">
        <Card4 />
      </div>
    </div>
  );
}

export default Group;

// ForecastPage.tsx
// import React from "react";
// import Card3 from "./Card3";
// import Card4 from "./Card4";

// const ForecastPage = () => {
//   return (
//     <div className="flex flex-col lg:flex-row gap-6 p-6">
//       <div className="flex-1">
//         <Card3 />
//       </div>
//       <div className="flex-1">
//         <Card4 />
//       </div>
//     </div>
//   );
// };

// export default ForecastPage;
