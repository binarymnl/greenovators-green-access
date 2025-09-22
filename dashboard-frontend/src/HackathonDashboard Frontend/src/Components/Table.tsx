// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Checkbox,
//   TablePagination,
//   tableCellClasses,
//   TableCell,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";

// interface Column {
//   id: string;
//   label: string;
//   minWidth?: number;
//   align?: "left" | "right" | "center";
// }

// interface CustomTableProps {
//   columns: Column[];
//   rows: Record<string, any>[];
//   headBgColor?: string;
//   borderColor?: string;
//   hoverColor?: string;
// }

// // Styled components
// const StyledTableCell = styled(TableCell, {
//   shouldForwardProp: (prop) =>
//     !["headBgColor", "borderColor"].includes(prop.toString()),
// })<{
//   headBgColor?: string;
//   borderColor?: string;
// }>(({ theme, headBgColor, borderColor }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: headBgColor || theme.palette.grey[200],
//     color: theme.palette.common.black,
//     border: `1px solid ${borderColor || theme.palette.divider}`,
//     fontWeight: 600,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//     border: `1px solid ${borderColor || theme.palette.divider}`,
//   },
// }));

// const StyledTableRow = styled(TableRow, {
//   shouldForwardProp: (prop) => prop !== "hoverColor",
// })<{ hoverColor?: string }>(({ theme, hoverColor }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:hover": {
//     backgroundColor: hoverColor || theme.palette.action.selected,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const CustomTable: React.FC<CustomTableProps> = ({
//   columns,
//   rows,
//   headBgColor,
//   borderColor,
//   hoverColor,
// }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [selected, setSelected] = useState<(string | number)[]>([]);

//   // Selection handlers
//   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       const newSelected = rows
//         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//         .map((row, idx) => row.id ?? row[columns[0].id] ?? idx);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (id: string | number) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
//     );
//   };

//   const isSelected = (id: string | number) => selected.includes(id);

//   // Pagination
//   const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: "100%", overflow: "hidden", borderColor:`solid 1px ${borderColor}` }}>
//       <TableContainer>
//         <Table stickyHeader>
//           <TableHead>
//             <StyledTableRow>
//               <StyledTableCell
//                 padding="checkbox"
//                 headBgColor={headBgColor}
//                 borderColor={borderColor}
//               >
//                 <Checkbox
//                   indeterminate={
//                     selected.length > 0 &&
//                     selected.length <
//                       rows.slice(
//                         page * rowsPerPage,
//                         page * rowsPerPage + rowsPerPage
//                       ).length
//                   }
//                   checked={
//                     selected.length ===
//                     rows.slice(
//                       page * rowsPerPage,
//                       page * rowsPerPage + rowsPerPage
//                     ).length
//                   }
//                   onChange={handleSelectAllClick}
//                 />
//               </StyledTableCell>
//               {columns.map((col) => (
//                 <StyledTableCell
//                   key={col.id}
//                   align={col.align ?? "left"}
//                   headBgColor={headBgColor}
//                   borderColor={borderColor}
//                 >
//                   {col.label}
//                 </StyledTableCell>
//               ))}
//             </StyledTableRow>
//           </TableHead>

//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row, idx) => {
//                 const rowId = row.id ?? row[columns[0].id] ?? idx;
//                 const isItemSelected = isSelected(rowId);

//                 return (
//                   <StyledTableRow
//                     key={rowId}
//                     hoverColor={hoverColor}
//                     selected={isItemSelected}
//                     onClick={() => handleClick(rowId)}
//                   >
//                     <StyledTableCell padding="checkbox">
//                       <Checkbox checked={isItemSelected} />
//                     </StyledTableCell>
//                     {columns.map((col) => (
//                       <StyledTableCell key={col.id}>
//                         {row[col.id]}
//                       </StyledTableCell>
//                     ))}
//                   </StyledTableRow>
//                 );
//               })}
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
//         rowsPerPageOptions={[5, 10, 25]}
//       />
//     </Paper>
//   );
// };

// export default CustomTable;

// CustomTable.tsx (updated styles)
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
  tableCellClasses,
  TableCell,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
}

interface CustomTableProps {
  columns: Column[];
  rows: Record<string, any>[];
  headBgColor?: string;
  borderColor?: string;
  hoverColor?: string;
}

// Styled components
const StyledTableCell = styled(TableCell)<{
  headBgColor?: string;
  borderColor?: string;
}>(({ theme, headBgColor, borderColor }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: headBgColor || theme.palette.grey[100],
    color: theme.palette.grey[900],
    fontWeight: 600,
    borderBottom: `2px solid ${borderColor || theme.palette.divider}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: `1px solid ${borderColor || theme.palette.divider}`,
  },
}));

const StyledTableRow = styled(TableRow)<{ hoverColor?: string }>(
  ({ theme, hoverColor }) => ({
    "&:hover": {
      backgroundColor: hoverColor || theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  })
);

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  rows,
  headBgColor,
  hoverColor,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<(string | number)[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, idx) => row.id ?? row[columns[0].id] ?? idx);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: string | number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const isSelected = (id: string | number) => selected.includes(id);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell padding="checkbox" headBgColor={headBgColor}>
                <Checkbox
                  indeterminate={
                    selected.length > 0 &&
                    selected.length <
                      rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      ).length
                  }
                  checked={
                    selected.length ===
                    rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    ).length
                  }
                  onChange={handleSelectAllClick}
                />
              </StyledTableCell>
              {columns.map((col) => (
                <StyledTableCell
                  key={col.id}
                  align={col.align ?? "left"}
                  headBgColor={headBgColor}
                >
                  {col.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => {
                const rowId = row.id ?? row[columns[0].id] ?? idx;
                const isItemSelected = isSelected(rowId);

                return (
                  <StyledTableRow
                    key={rowId}
                    hoverColor={hoverColor}
                    selected={isItemSelected}
                    onClick={() => handleClick(rowId)}
                  >
                    <StyledTableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </StyledTableCell>
                    {columns.map((col) => {
                      let value = row[col.id];

                      // STATUS column as chip
                      if (col.id === "status") {
                        value = (
                          <Chip
                            label={row[col.id]}
                            size="small"
                            color={
                              row[col.id] === "ENTERED"
                                ? "success"
                                : row[col.id] === "PENDING"
                                ? "warning"
                                : "default"
                            }
                            variant="outlined"
                          />
                        );
                      }

                      return (
                        <StyledTableCell key={col.id}>{value}</StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
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
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default CustomTable;
