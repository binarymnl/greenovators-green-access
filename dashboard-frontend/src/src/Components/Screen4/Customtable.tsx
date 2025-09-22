// components/CustomTable.tsx
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
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  render?: (value: any, row: Record<string, any>) => React.ReactNode;
}

interface CustomTableProps {
  columns: Column[];
  rows: Record<string, any>[];
  headBgColor?: string;
  borderColor?: string;
  hoverColor?: string;
}

const StyledTableCell = styled(TableCell)<{
  headBgColor?: string;
  borderColor?: string;
}>(({ theme, headBgColor, borderColor }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: headBgColor || theme.palette.grey[100],
    fontWeight: 600,
    border: `1px solid ${borderColor || theme.palette.divider}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: `1px solid ${borderColor || theme.palette.divider}`,
  },
}));

const StyledTableRow = styled(TableRow)<{ hoverColor?: string }>(
  ({ theme, hoverColor }) => ({
    "&:hover": {
      backgroundColor: hoverColor || theme.palette.action.hover,
    },
  })
);

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  rows,
  headBgColor,
  borderColor,
  hoverColor,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<(string | number)[]>([]);

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      const newSelected = rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((_, idx) => idx);
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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 3 }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell padding="checkbox">
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
                  borderColor={borderColor}
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
                const rowId = idx;
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
                    {columns.map((col) => (
                      <StyledTableCell key={col.id} align={col.align ?? "left"}>
                        {col.render
                          ? col.render(row[col.id], row)
                          : row[col.id]}
                      </StyledTableCell>
                    ))}
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
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default CustomTable;
