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
import { useCallback, useMemo } from "react";
import PropTypes from "prop-types";

export const DeleteWarningModal = ({ open, setOpen, deleteHandler }) => {
  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const dialog = useMemo(
    () => (
      <Dialog open={open} onClick={onClose} PaperProps={PaperProps}>
        <DialogTitle
          variant="h5"
          sx={{ display: "flex", alignItems: "center" }}
        >
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
            onClick={deleteHandler}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    ),
    [deleteHandler, onClose, open]
  );

  return dialog;
};

const PaperProps = {
  sx: { borderRadius: 2, bgcolor: "#fce4ec", px: 2, py: 2 },
};

DeleteWarningModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func,
};
