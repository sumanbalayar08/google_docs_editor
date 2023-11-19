import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    try {
      const res = await axios.post("http://localhost:4000/postdoc", { title });
      console.log(res.status);
  
      // Check if the data was added successfully
      if (res.status === 200) {
        // Show success toast message
        toast.success("Data added successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, // Adjust the duration as needed
        });
      } else {
        // Handle other response statuses if necessary
        toast.error("Failed to add data. Please try again.");
      }
    } catch (error) {
      // Handle error if the request fails
      console.error("Error adding data:", error);
      toast.error("An error occurred. Please try again later.");
    }
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
            <button className="single-button" onClick={addData}>Add Document</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
