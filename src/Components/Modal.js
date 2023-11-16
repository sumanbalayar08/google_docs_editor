import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 150,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

export default function ModalComponent({ open, setOpen,title,setTitle }) {
  const handleClose = () => setOpen(false);

  const addData=async()=>{
    const res=await axios.post("http://localhost:4000/postdoc",{title});
    console.log(res.data)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input placeholder="Enter the title" className="add-input" value={title} onChange={(e)=>setTitle(e.target.value)}/>
          <div className="button-container">
            <button className="add-docs" onClick={addData}>Add Document</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
