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
import { DataContext } from "../context";
import { useContext } from "react";

export const EditModal = ({ open, setOpen, item }) => {
  const { columns, setData, data } = useContext(DataContext);
  const newItem = item ? { ...item } : {};

  const handleClose = () => {
    setOpen(false);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    if (item) {
      const newData = data.map((item) => {
        if (item.id === newItem.id) {
          return newItem;
        }
        return item;
      });
      setData(newData);
    } else {
      newItem.id = data.length;
      setData((prevData) => [newItem, ...prevData]);
    }
    onClose();
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
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: { borderRadius: 2, px: 2, py: 2 },
      }}
    >
      <DialogTitle variant="h5" sx={{ display: "flex", alignItems: "center" }}>
        <EditIcon fontSize="large" sx={{ mr: "10px" }} />
        Edit car info
      </DialogTitle>
      <Divider />
      <Box component="form" id="editForm" onSubmit={saveChanges}>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
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
};
