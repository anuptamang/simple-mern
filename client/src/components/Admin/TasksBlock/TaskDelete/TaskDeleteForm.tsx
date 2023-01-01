import { Button, Stack, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { useState } from 'react'
import { delay } from '../../../../utils/delay'
import { notify } from '../../../../utils/notification'
import { BtnLoading } from '../../../UI/BtnLoading'

const TaskDeleteForm = ({ tasks, setTasks, handleClose, deleteId }: any) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    await delay(3000)
    handleClose()
    const newData = tasks.filter((task: any) => task.id !== deleteId)
    setTasks(newData)

    setLoading(false)
    notify('Task Deleted successfully', 'task-delete-form', 'success')
  }

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          color: '#fff',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        Do you want to delete this task?
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{ background: 'gray', color: '#fff' }}
        >
          Cancel
        </Button>
        <BtnLoading
          variant="contained"
          onClick={handleSubmit}
          loading={loading}
          sx={{ background: red[200], color: '#fff' }}
        >
          Delete
        </BtnLoading>
      </Stack>
    </>
  )
}

export default TaskDeleteForm
