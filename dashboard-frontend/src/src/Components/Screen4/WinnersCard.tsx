// // components/WinnersCard.tsx
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// import { Calendar } from "lucide-react";

// import { Avatar, Chip } from "@mui/material";
// import CustomTable from "./Customtable";

// const WinnersCard = () => {
//   const columns = [
//     {
//       id: "member",
//       label: "Member",
//       render: (value: string, row: any) => (
//         <div className="flex items-center gap-2">
//           <Avatar src={row.avatar} sx={{ width: 32, height: 32 }} />
//           {value}
//         </div>
//       ),
//     },
//     { id: "email", label: "Email" },
//     {
//       id: "status",
//       label: "Status",
//       render: (value: string) => (
//         <Chip
//           label={value}
//           size="small"
//           color={value === "ENTERED" ? "success" : "warning"}
//         />
//       ),
//     },
//     { id: "points", label: "Eco Points", align: "right" as const },
//   ];

//   const rows = [
//     {
//       member: "Cody Fisher",
//       email: "fisher.code@gmail.com",
//       status: "ENTERED",
//       points: 429,
//       avatar: "https://i.pravatar.cc/32?img=1",
//     },
//     {
//       member: "Savannah Nguyen",
//       email: "aavannagn@gmail.com",
//       status: "PENDING",
//       points: 512,
//       avatar: "https://i.pravatar.cc/32?img=2",
//     },
//     {
//       member: "Jenny Wilson",
//       email: "will.jenny@gmail.com",
//       status: "ENTERED",
//       points: 381,
//       avatar: "https://i.pravatar.cc/32?img=3",
//     },
//   ];

//   return (
//     <Card className="p-4 flex flex-col gap-4 shadow-sm">
//       {/* Header */}
//       <div className="flex flex-wrap justify-between items-center gap-2">
//         <div className="flex items-center gap-2">
//           <Calendar className="w-4 h-4 text-gray-500" />
//           <span className="text-sm">8 May 2024 – 6 Jun 2024</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <Input placeholder="Search member" className="h-8" />
//           <Button size="sm" variant="outline">
//             Notify Visitors
//           </Button>
//           <Switch defaultChecked />
//         </div>
//       </div>

//       {/* Table */}
//       <CustomTable columns={columns} rows={rows} />
//     </Card>
//   );
// };

// export default WinnersCard;

import { Card, CardContent, CardHeader, Typography, Avatar } from "@mui/material";

interface Winner {
  id: number;
  name: string;
  score: number;
  avatar?: string;
}

interface WinnersCardProps {
  title?: string;
  winners: Winner[];
}

const WinnersCard: React.FC<WinnersCardProps> = ({ 
  title = "🏆 Top Performers", 
  winners 
}) => {
  return (
    <Card className="rounded-2xl w-full">
      <CardHeader
        title={
          <Typography variant="h6" className="font-semibold">
            {title}
          </Typography>
        }
        className="border-b p-4"
      />
      <CardContent className="flex flex-col gap-4">
        {winners.map((winner, idx) => (
          <div
            key={winner.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition"
          >
            {/* Left: Avatar + Name */}
            <div className="flex items-center gap-3">
              <Avatar src={winner.avatar}>
                {winner.name.charAt(0)}
              </Avatar>
              <Typography variant="body1" className="font-medium">
                {winner.name}
              </Typography>
            </div>

            {/* Right: Score */}
            <Typography
              variant="body2"
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                idx === 0
                  ? "bg-yellow-100 text-yellow-700"
                  : idx === 1
                  ? "bg-gray-200 text-gray-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {winner.score}
            </Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WinnersCard;
