import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, List, ListItem, Typography } from '@mui/material';
import { useAuth } from 'hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { resetTaskUpdate, taskUpdate } from 'redux/task/taskAction';
import { isTokenValid } from 'utils/isTokenValid';
import { notify } from 'utils/notification';
import { TaskProps } from '../../../../types/task';
import { useEffect } from 'react';
import { taskSelector } from 'redux/task/taskSlice';

type TaskListProps = {
  tasks: TaskProps[] | any;
  handleEdit: (_id: string | undefined) => void;
  handleDelete: (_id: string | undefined) => void;
  setTasks: (t: TaskProps[]) => void;
};

const TaskList = ({
  tasks,
  handleEdit,
  handleDelete,
  setTasks,
}: TaskListProps) => {
  const dispatch = useAppDispatch();
  const { updateTaskSuccess } = useAppSelector(taskSelector);
  const auth = useAuth();
  const location = useLocation();

  const handlePin = (id: string | undefined) => {
    const allTasks = [...tasks];

    const index = allTasks.findIndex((task: TaskProps) => task._id === id);
    allTasks[index] = {
      ...allTasks[index],
      pinned: allTasks[index].pinned ? false : true,
    };

    if (auth?.token && isTokenValid(auth.token)) {
      dispatch(taskUpdate(allTasks[index], allTasks[index]._id, auth.token));
    } else {
      notify('User Session Expired', 'session-expire-form', 'warning');
      <Navigate to={'/login'} state={{ from: location }} replace />;
    }

    setTasks(allTasks);
  };
  const handleComplete = (id: string | undefined) => {
    const allTasks = [...tasks];

    const index = allTasks.findIndex((task: TaskProps) => task._id === id);
    allTasks[index] = {
      ...allTasks[index],
      completed: !allTasks[index].completed,
    };

    if (auth?.token && isTokenValid(auth.token)) {
      dispatch(taskUpdate(allTasks[index], allTasks[index]._id, auth.token));
    } else {
      notify('User Session Expired', 'session-expire-form', 'warning');
      <Navigate to={'/login'} state={{ from: location }} replace />;
    }

    setTasks(allTasks);
  };

  useEffect(() => {
    if (updateTaskSuccess) {
      dispatch(resetTaskUpdate());
    }
  }, [dispatch, updateTaskSuccess]);

  return (
    <>
      <List sx={{ marginBottom: '100px' }}>
        <>
          {[...tasks]
            ?.sort((a: any, b: any) => b.pinned - a.pinned)
            .sort((a: any, b: any) => a.completed - b.completed)
            .map((task: TaskProps, key: number) => (
              <>
                <ListItem
                  key={task._id}
                  sx={{ padding: '0', marginBottom: '30px' }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      background: '#fff',
                      borderRadius: '8px',
                      padding: '25px',
                      opacity: task.completed ? 0.5 : 1,
                      position: 'relative',
                      '&:before': {
                        display: task.completed ? 'block' : 'none',
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: '#656060',
                        pointerEvents: 'none',
                      },
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
                        onClick={() => handleComplete(task?._id && task._id)}
                      />
                      <Typography sx={{ color: '#333' }}>
                        {task.task}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '20px',
                        alignItems: 'center',
                      }}
                    >
                      <PushPinOutlinedIcon
                        onClick={() => handlePin(task?._id && task._id)}
                        sx={{
                          color: task.pinned ? '#f79a58' : '#919294',
                          cursor: 'pointer',
                        }}
                      />
                      <EditOutlinedIcon
                        onClick={() => handleEdit(task?._id && task._id)}
                        sx={{ color: '#919294', cursor: 'pointer' }}
                      />
                      <HighlightOffOutlinedIcon
                        onClick={() => handleDelete(task?._id && task._id)}
                        sx={{ color: '#919294', cursor: 'pointer' }}
                      />
                    </Box>
                  </Box>
                </ListItem>
              </>
            ))}
        </>
      </List>
    </>
  );
};

export default TaskList;
