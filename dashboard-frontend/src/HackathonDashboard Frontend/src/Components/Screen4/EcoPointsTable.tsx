// // // EcoPointsTable.tsx
// // import React from "react";
// // import {
// //   Box,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   Checkbox,
// //   Typography,
// //   IconButton,
// //   TextField,
// //   Select,
// //   MenuItem,
// //   Switch,
// //   TablePagination,
// // } from "@mui/material";
// // import EmailIcon from "@mui/icons-material/Email";

// // // Types
export interface Member {
  id: number;
  name: string;
  email: string;
  status: "ENTERED" | "PENDING";
  ecoPoints: number;
}

// // interface EcoPointsTableProps {
// //   members: Member[];
// //   title?: string;
// //   rowsPerPageOptions?: number[];
// // }

// // const EcoPointsTable: React.FC<EcoPointsTableProps> = ({
// //   members,
// //   title = "Eco Points Members",
// //   rowsPerPageOptions = [5, 10, 25],
// // }) => {
// //   const [page, setPage] = React.useState(0);
// //   const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
// //   const [search, setSearch] = React.useState("");
// //   const [automate, setAutomate] = React.useState(true);
// //   const [sort, setSort] = React.useState("ecoPoints");

// //   const handleChangePage = (_: unknown, newPage: number) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (
// //     event: React.ChangeEvent<HTMLInputElement>
// //   ) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const filteredMembers = members
// //     .filter((m) =>
// //       m.name.toLowerCase().includes(search.toLowerCase().trim())
// //     )
// //     .sort((a, b) =>
// //       sort === "ecoPoints" ? b.ecoPoints - a.ecoPoints : a.name.localeCompare(b.name)
// //     );

// //   return (
// //     <Box>
// //       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// //         <Typography variant="h6">{title}</Typography>

// //         <Box display="flex" gap={2} alignItems="center">
// //           <TextField
// //             size="small"
// //             placeholder="Search member"
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />

// //           <Select
// //             size="small"
// //             value={sort}
// //             onChange={(e) => setSort(e.target.value)}
// //           >
// //             <MenuItem value="ecoPoints">Most Eco Points</MenuItem>
// //             <MenuItem value="name">By Name</MenuItem>
// //           </Select>

// //           <Box display="flex" alignItems="center" gap={1}>
// //             <Typography variant="body2">Automate</Typography>
// //             <Switch
// //               checked={automate}
// //               onChange={() => setAutomate((p) => !p)}
// //             />
// //           </Box>
// //         </Box>
// //       </Box>

// //       <TableContainer component={Paper}>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell padding="checkbox">
// //                 <Checkbox />
// //               </TableCell>
// //               <TableCell>Member</TableCell>
// //               <TableCell>Email</TableCell>
// //               <TableCell>Status</TableCell>
// //               <TableCell>Eco Points</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {filteredMembers
// //               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// //               .map((member) => (
// //                 <TableRow key={member.id}>
// //                   <TableCell padding="checkbox">
// //                     <Checkbox />
// //                   </TableCell>
// //                   <TableCell>{member.name}</TableCell>
// //                   <TableCell>
// //                     <Box display="flex" alignItems="center" gap={1}>
// //                       <EmailIcon fontSize="small" />
// //                       {member.email}
// //                     </Box>
// //                   </TableCell>
// //                   <TableCell>
// //                     <Typography
// //                       color={member.status === "ENTERED" ? "green" : "orange"}
// //                     >
// //                       {member.status}
// //                     </Typography>
// //                   </TableCell>
// //                   <TableCell>{member.ecoPoints}</TableCell>
// //                 </TableRow>
// //               ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>

// //       <TablePagination
// //         component="div"
// //         count={filteredMembers.length}
// //         page={page}
// //         onPageChange={handleChangePage}
// //         rowsPerPage={rowsPerPage}
// //         onRowsPerPageChange={handleChangeRowsPerPage}
// //         rowsPerPageOptions={rowsPerPageOptions}
// //       />
// //     </Box>
// //   );
// // };

// // export default EcoPointsTable;

// // ReusableTable.tsx
// import React from "react";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Checkbox,
//   Typography,
//   Switch,
//   TablePagination,
// } from "@mui/material";

// export interface Column<T> {
//   id: keyof T | string; // field name or custom
//   label: string;
//   render?: (row: T) => React.ReactNode; // optional custom render
// }

// interface ReusableTableProps<T> {
//   title?: string;
//   columns: Column<T>[];
//   rows: T[];
//   rowsPerPageOptions?: number[];
//   flagField?: keyof T; // e.g. "status" (ENTERED / EXIT)
// }

// function ReusableTable<T extends { id: number | string }>({
//   title = "Reusable Table",
//   columns,
//   rows,
//   rowsPerPageOptions = [5, 10, 25],
//   flagField,
// }: ReusableTableProps<T>) {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);

//   const handleChangePage = (_: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box>
//       <Typography variant="h6" mb={2}>
//         {title}
//       </Typography>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell padding="checkbox">
//                 <Checkbox />
//               </TableCell>
//               {columns.map((col) => (
//                 <TableCell key={col.id.toString()}>{col.label}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => (
//                 <TableRow
//                   key={row.id}
//                   sx={{
//                     backgroundColor:
//                       flagField && (row[flagField] as string) === "EXIT"
//                         ? "rgba(255,0,0,0.05)"
//                         : "inherit",
//                   }}
//                 >
//                   <TableCell padding="checkbox">
//                     <Checkbox />
//                   </TableCell>
//                   {columns.map((col) => (
//                     <TableCell key={col.id.toString()}>
//                       {col.render ? col.render(row) : (row[col.id as keyof T] as any)}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         component="div"
//         count={rows.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={rowsPerPageOptions}
//       />
//     </Box>
//   );
// }

// export default ReusableTable;

// ReusableTable.tsx
import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  TablePagination,
} from "@mui/material";

export interface Column<T> {
  id: keyof T | string; // field name or custom
  label: string;
  render?: (row: T) => React.ReactNode; // optional custom renderer
}

interface ReusableTableProps<T> {
  title?: string;
  columns: Column<T>[];
  rows: T[];
  rowsPerPageOptions?: number[];
  flagField?: keyof T; // highlight row if value is EXIT/whatever
  toolbar?: React.ReactNode; // 🔑 inject search/sort/filters here
}

function ReusableTable<T extends { id: number | string }>({
  title = "Reusable Table",
  columns,
  rows,
  rowsPerPageOptions = [5, 10, 25],
  flagField,
  toolbar,
}: ReusableTableProps<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">{title}</Typography>
        {/* 🔑 place custom search/sort/filter UI here */}
        {toolbar && <Box display="flex" gap={2}>{toolbar}</Box>}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              {columns.map((col) => (
                <TableCell key={col.id.toString()}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor:
                      flagField && (row[flagField] as string) === "EXIT"
                        ? "rgba(255,0,0,0.05)"
                        : "inherit",
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.id.toString()}>
                      {col.render ? col.render(row) : (row[col.id as keyof T] as any)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Box>
  );
}

export default ReusableTable;

