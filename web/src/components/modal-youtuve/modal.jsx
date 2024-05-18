import * as React from 'react';
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal';
import VideoPlayer from '../video-player/video-player';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  height:500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 84,
  p: 0,
};

export default function BasicModal({open ,handleOpen, handleClose}) {
 
  return (
    <div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <VideoPlayer width = "100%" height="500px"/>
        </Box>
      </Modal>
    </div>
  );
}