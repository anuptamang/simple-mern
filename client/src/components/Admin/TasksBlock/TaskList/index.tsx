import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { Box, List, ListItem, Typography } from '@mui/material'
import { TaskProps } from '../../../../types/task'

type TaskListProps = {
  tasks: TaskProps[]
  handleEdit: (id: string | undefined) => void
  handleDelete: (id: string | undefined) => void
  setTasks: (t: TaskProps[]) => void
}

const TaskList = ({
  tasks,
  handleEdit,
  handleDelete,
  setTasks,
}: TaskListProps) => {
  const handlePin = (id: string | undefined) => {
    const allTasks = [...tasks]

    const index = allTasks.findIndex((task: TaskProps) => task.id === id)
    allTasks[index] = {
      ...allTasks[index],
      pinned: allTasks[index].pinned ? false : true,
    }

    setTasks(allTasks)
  }
  const handleComplete = (id: string | undefined) => {
    const allTasks = [...tasks]

    const index = allTasks.findIndex((task: TaskProps) => task.id === id)
    allTasks[index] = {
      ...allTasks[index],
      completed: !allTasks[index].completed,
    }
    setTasks(allTasks)
  }
  return (
    <>
      <List sx={{ marginBottom: '100px' }}>
        {tasks.map((task: TaskProps, key: number) => (
          <ListItem key={key} sx={{ padding: '0', marginBottom: '30px' }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                background: '#fff',
                borderRadius: '8px',
                padding: '25px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                }}
              >
                <StarOutlineIcon
                  sx={{
                    color: task.completed ? '#f79a58' : '#919294',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleComplete(task?.id && task.id)}
                />
                <Typography sx={{ color: '#333' }}>{task.title}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                }}
              >
                <PushPinOutlinedIcon
                  onClick={() => handlePin(task?.id && task.id)}
                  sx={{
                    color: task.pinned ? '#f79a58' : '#919294',
                    cursor: 'pointer',
                  }}
                />
                <EditOutlinedIcon
                  onClick={() => handleEdit(task?.id && task.id)}
                  sx={{ color: '#919294', cursor: 'pointer' }}
                />
                <HighlightOffOutlinedIcon
                  onClick={() => handleDelete(task?.id && task.id)}
                  sx={{ color: '#919294', cursor: 'pointer' }}
                />
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default TaskList
