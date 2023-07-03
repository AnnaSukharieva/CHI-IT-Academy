import { Button } from "@mui/material";
import { EditModal } from "../Modals";
import { useState } from "react";

export const AddButton = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleAddClick = () => {
    setOpenModal(true);
  };
  return (
    <>
      <Button variant="contained" onClick={handleAddClick}>
        Add new car
      </Button>
      <EditModal open={openModal} setOpen={setOpenModal} />
    </>
  );
};
