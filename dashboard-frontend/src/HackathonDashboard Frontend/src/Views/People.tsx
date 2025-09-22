import React from "react";
import {
  Box,
  Card,
  CardContent,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import WinnersCard from "../Components/Screen4/WinnersCard";
import type { Member } from "../Components/Screen4/EcoPointsTable";
import ReusableTable from "../Components/Screen4/EcoPointsTable";

const People: React.FC = () => {
  // Example table data
  const columns = [
    // { id: "id", label: "Id", align: "left" as const },
    { id: "name", label: "Name", align: "left" as const },
    { id: "email", label: "Email", align: "center" as const },
    { id: "status", label: "Status", align: "center" as const },
    { id: "ecoPoints", label: "EcoPoints", align: "right" as const },
  ];
  const members: Member[] = [
    {
      id: 1,
      name: "Cody Fisher",
      email: "fisher.code@gmail.com",
      status: "ENTERED",
      ecoPoints: 429,
    },
    {
      id: 2,
      name: "Bessie Cooper",
      email: "b.cooper@gmail.com",
      status: "ENTERED",
      ecoPoints: 426,
    },
    {
      id: 3,
      name: "Savannag Ngyun",
      email: "aavannagn@gmail.com",
      status: "PENDING",
      ecoPoints: 512,
    },
    {
      id: 4,
      name: "Jenny Wilson",
      email: "will.jenny@gmail.com",
      status: "ENTERED",
      ecoPoints: 381,
    },
    {
      id: 5,
      name: "Floyd Miles",
      email: "fisher.code@gmail.com",
      status: "ENTERED",
      ecoPoints: 467,
    },
    {
      id: 6,
      name: "Cody Fisher",
      email: "fisher.code@gmail.com",
      status: "ENTERED",
      ecoPoints: 429,
    },
    {
      id: 7,
      name: "Bessie Cooper",
      email: "b.cooper@gmail.com",
      status: "ENTERED",
      ecoPoints: 426,
    },
    {
      id: 8,
      name: "Savannag Ngyun",
      email: "aavannagn@gmail.com",
      status: "PENDING",
      ecoPoints: 512,
    },
    {
      id: 9,
      name: "Jenny Wilson",
      email: "will.jenny@gmail.com",
      status: "ENTERED",
      ecoPoints: 381,
    },
    {
      id: 10,
      name: "Floyd Miles",
      email: "fisher.code@gmail.com",
      status: "ENTERED",
      ecoPoints: 467,
    },
  ];

  // Example winners
  const winners = [
    {
      id: 1,
      name: "Alice",
      score: 98,
      avatar: "https://i.pravatar.cc/50?img=1",
    },
    { id: 2, name: "Bob", score: 92, avatar: "https://i.pravatar.cc/50?img=2" },
    {
      id: 3,
      name: "Charlie",
      score: 85,
      avatar: "https://i.pravatar.cc/50?img=3",
    },
  ];
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("ecoPoints");
  const [automate, setAutomate] = React.useState(true);

  const filtered = members
    .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "ecoPoints"
        ? b.ecoPoints - a.ecoPoints
        : a.name.localeCompare(b.name)
    );

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-gray-100 min-h-screen">
      {/* Left card - Table */}
      <div className="flex-1">
        <Card className="rounded-2xl">
          <CardContent>
            <Typography variant="h6" className="mb-4 font-semibold">
              Participants
            </Typography>
           
            <ReusableTable<Member>
              title="Eco Points Members"
              columns={columns}
              rows={filtered}
              flagField="status"
              toolbar={
                <>
                  <TextField
                    size="small"
                    placeholder="Search member"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Select
                    size="small"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <MenuItem value="ecoPoints">Most Eco Points</MenuItem>
                    <MenuItem value="name">By Name</MenuItem>
                  </Select>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body2">Automate</Typography>
                    <Switch
                      checked={automate}
                      onChange={() => setAutomate((p) => !p)}
                    />
                  </Box>
                </>
              }
            />
          </CardContent>
        </Card>
      </div>

      {/* Right card - Winners */}
      <div className="w-full lg:w-[30%]">
        <WinnersCard title="🏆 Top Performers" winners={winners} />
      </div>
    </div>
  );
};

export default People;



// // import React from 'react'

// // function People() {
// //   return (
// //     <div>

// //     </div>
// //   )
// // }

// // export default People
// // People.tsx
// import React from "react";
// import { Card, CardContent, Typography, Switch, Button } from "@mui/material";
// import CustomTable, { type Column } from "../Components/Table";

// const People = () => {
//   const columns: Column[] = [
//   { id: "member", label: "Member" },
//   { id: "email", label: "Email" },
//   { id: "status", label: "Status" },
//   { id: "points", label: "Eco Points", align: "right" as const },
// ];

//   const rows = [
//     { id: 1, member: "Cody Fisher", email: "fisher.code@gmail.com", status: "ENTERED", points: 429 },
//     { id: 2, member: "Bessie Cooper", email: "b.cooper@gmail.com", status: "ENTERED", points: 426 },
//     { id: 3, member: "Savannah Nguyen", email: "aavannagn@gmail.com", status: "PENDING", points: 512 },
//     { id: 4, member: "Jenny Wilson", email: "will.jenny@gmail.com", status: "ENTERED", points: 381 },
//   ];

//   return (
//     <div className="flex flex-col gap-6 p-6">
//       {/* Winners Card */}
//       <Card>
//         <CardContent className="flex items-center justify-between">
//           <Typography variant="h6">Monthly Winners</Typography>
//           <div className="flex items-center gap-4">
//             <Typography variant="body2">Automate eco point distribution</Typography>
//             <Switch defaultChecked />
//             <Button variant="contained" color="success">Review</Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Table Card */}
//       <CustomTable
//         columns={columns}
//         rows={rows}
//         headBgColor="#f9fafb"
//         borderColor="#e5e7eb"
//         hoverColor="#f1f5f9"
//       />
//     </div>
//   );
// };

// export default People;

 {/* <CustomTableCard/>
            <CustomTable
              columns={columns}
              rows={rows}
              headBgColor="#f3f4f6"
              borderColor="#e5e7eb"
              hoverColor="#f9fafb"
            /> */}
            {/* <EcoPointsTable members={members} />; */}
            {/* <ReusableTable<Member>
              title="Eco Points Members"
              columns={columns}
              rows={members}
              flagField="status"
            /> */}