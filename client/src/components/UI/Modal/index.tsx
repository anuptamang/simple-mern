import { Box, Fade, Modal as MuiModal } from '@mui/material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#262835',
  border: '0',
  boxShadow: 24,
  outline: 'none',
  width: '100%',
  maxWidth: '1100px',
  borderRadius: '20px',
  p: 4,
}

const Modal = ({ open, handleClose, children }: any) => {
  return (
    <MuiModal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </MuiModal>
  )
}

export default Modal
