import { Button } from "@mui/material";
import { EditModal } from "../Modals";
import { useState, useMemo, useCallback } from "react";

export const AddButton = () => {
 const [openModal, setOpenModal] = useState(false);

 const handleAddClick = useCallback(() => {
   setOpenModal(true);
 }, []);

 const button = useMemo(
   () => (
     <>
       <Button variant="contained" onClick={handleAddClick}>
         Add new car
       </Button>
       <EditModal open={openModal} setOpen={setOpenModal} />
     </>
   ),
   [handleAddClick, openModal]
 );

 return button;
};
