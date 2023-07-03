import {
  TableCell,
  TableRow,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { DeleteWarningModal } from "../../Modals";
import { useContext, useState, useCallback, useMemo } from "react";
import { DataContext } from "../../../context";
import { EditModal } from "../../Modals/EditModal";
import PropTypes from "prop-types";


export const CarTableRows = ({ row, columns }) => {
  const { setData, data } = useContext(DataContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleEditClick = useCallback(() => {
    setOpenEditModal(true);
  }, []);

  const deleteCarHendler = useCallback(() => {
    const newData = data.filter((obj) => obj.id !== row.id);
    setData(newData);
  }, [data, row.id, setData]);

  const handleDeleteClick = useCallback(() => {
    setOpenDeleteModal(true);
  }, []);

  const columnsElems = useMemo(
    () =>
      columns.map((column) =>
        column.id === "actions" ? (
          <TableCell key={column.id} align={column.align}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Action
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={""}
                label="Action"
              >
                <MenuItem value="edit" onClick={handleEditClick}>
                  Edit
                </MenuItem>
                <MenuItem value="delete" onClick={handleDeleteClick}>
                  Delete
                </MenuItem>
              </Select>
            </FormControl>
          </TableCell>
        ) : (
          <TableCell key={column.id} align={column.align}>
            {`${row[column.id]}`}
          </TableCell>
        )
      ),
    [columns, handleDeleteClick, handleEditClick, row]
  );

  const tableRows = useMemo(
    () => (
      <>
        <TableRow hover role="checkbox" tabIndex={-1} key={row.car_vin}>
          {columnsElems}
        </TableRow>
        <DeleteWarningModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          deleteHandler={deleteCarHendler}
        />
        <EditModal open={openEditModal} setOpen={setOpenEditModal} item={row} />
      </>
    ),
    [deleteCarHendler, columnsElems, openDeleteModal, openEditModal, row]
  );

  return tableRows;
};

CarTableRows.propTypes = {
  row: PropTypes.any.isRequired,
  columns: PropTypes.any.isRequired,
};
