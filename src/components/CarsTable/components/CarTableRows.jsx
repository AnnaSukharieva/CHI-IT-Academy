import {
  TableCell,
  TableRow,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { DeleteWarningModal } from "../../../Modals";
import { useContext, useState } from "react";
import { DataContext } from "../../../context";
import { EditModal } from "../../../Modals/EditModal";

export const CarTableRows = ({ row, columns }) => {
  const { setData, data } = useContext(DataContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleEditClick = () => {
    setOpenEditModal(true);
  };

  const DeleteCarHendler = () => {
    const newData = data.filter((obj) => obj.id !== row.id);
    setData(newData);
  };

  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={row.car_vin}>
        {columns.map((column) => {
          if (column.id === "actions") {
            return (
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
            );
          } else {
            const value = row[column.id];
            return (
              <TableCell key={column.id} align={column.align}>
                {`${value}`}
              </TableCell>
            );
          }
        })}
      </TableRow>
      <DeleteWarningModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        DeleteHendler={DeleteCarHendler}
      />
      <EditModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        item={row}
      />
    </>
  );
};
