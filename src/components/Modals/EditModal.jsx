import {
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DataContext } from "../../context";
import { memo } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";

export const EditModal = memo(({ open, setOpen, item }) => {
  const { columns, setData, data } = useContext(DataContext);
  const newItem = item ? { ...item } : {};

  const handleClose = () => {
    setOpen(false);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    if (item) {
      const newData = data.map((item) =>
        item.id === newItem.id ? newItem : item
      );
      setData(newData);
    } else {
      newItem.id = data.length;
      setData((prevData) => [newItem, ...prevData]);
    }
    handleClose();
  };

  const editHandler = (e, columnId) => {
    const newValue = e.target.value;
    newItem[columnId] = newValue;
  };

  const EditFields = () => {
    return columns.map((column) => {
      if (column.label !== "Actions") {
        return (
          <TextField
            key={column.label}
            required
            disabled={
              item
                ? column.label !== "Color" &&
                  column.label !== "Price" &&
                  column.label !== "Availability"
                : false
            }
            variant="standard"
            label={column.label}
            sx={{ mb: "20px" }}
            defaultValue={item ? item[column.id] : ""}
            onChange={(e) => editHandler(e, column.id)}
          />
        );
      }
    });
  };

  return (
    <Dialog onClose={handleClose} open={open} PaperProps={PaperProps}>
      <DialogTitle variant="h5" sx={dialogTitleStyles}>
        <EditIcon fontSize="large" sx={{ mr: "10px" }} />
        Edit car info
      </DialogTitle>
      <Divider />
      <Box component="form" id="editForm" onSubmit={saveChanges}>
        <DialogContent sx={dialogContentStyles}>
          <EditFields />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "black" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Apply
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
});

const PaperProps = {
  sx: { borderRadius: 2, px: 2, py: 2 },
};
const dialogTitleStyles = {
  display: "flex",
  alignItems: "center",
};
const dialogContentStyles = {
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  item: PropTypes.any,
};
