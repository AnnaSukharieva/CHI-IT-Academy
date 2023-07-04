import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { CarTableRows } from "./components/CarTableRows";
import { useState, useContext, memo } from "react";
import { DataContext } from "../../context";
import PropTypes from "prop-types";

export const CarsTable = memo(({ data }) => {
  const { columns } = useContext(DataContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rowsElems = data
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row) => {
      return <CarTableRows key={row.id} row={row} columns={columns} />;
    });
  
  const nothingFound = (
    <Typography
      m={2}
      variant="h6"
      width="100%"
      textAlign="center"
      component="div"
    >
      There are no cars matching your request
    </Typography>
  );

  const table = (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{rowsElems}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );

  return data.length === 0 ? nothingFound : table;
});

CarsTable.propTypes = {
  data: PropTypes.array.isRequired,
};
