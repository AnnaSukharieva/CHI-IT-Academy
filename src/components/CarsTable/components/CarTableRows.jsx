import {
  TableCell,
  TableRow,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { DeleteWarningModal } from "../../Modals";
import { useContext, useState } from "react";
import { DataContext } from "../../../context";
import { EditModal } from "../../Modals/EditModal";
import PropTypes from "prop-types";

export const CarTableRows = ({ row, columns }) => {
  const { setData, data } = useContext(DataContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleEditClick = () => {
    setOpenEditModal(true);
  };

  const deleteCarHendler = () => {
    const newData = data.filter((obj) => obj.id !== row.id);
    setData(newData);
  };

  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  const columnsElems = columns.map((column) =>
    column.id === "actions" ? (
      <TableCell key={column.id} align={column.align}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-standard-label">Action</InputLabel>
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
  );

  return (
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
  );
};

CarTableRows.propTypes = {
  row: PropTypes.any.isRequired,
  columns: PropTypes.any.isRequired,
};
