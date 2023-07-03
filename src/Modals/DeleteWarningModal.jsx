import {
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export const DeleteWarningModal = ({ open, setOpen, DeleteHendler }) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClick={onClose}
      PaperProps={{
        sx: { borderRadius: 2, bgcolor: "#fce4ec", px: 2, py: 2 },
      }}
    >
      <DialogTitle variant="h5" sx={{ display: "flex", alignItems: "center" }}>
        <Delete fontSize="large" sx={{ color: "#d32f2f", mr: "10px" }} />
        Delete car?
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText sx={{ mb: 1 }}>
          Are you sure you want to delete information about this car?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "black" }} onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#d32f2f" }}
          onClick={DeleteHendler}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
