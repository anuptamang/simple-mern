import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllTasks } from 'redux/task/taskAction';
import { taskSelector } from 'redux/task/taskSlice';
import { TaskProps } from '../../../types/task';
import TaskCreate from './TaskCreate';
import TaskDelete from './TaskDelete';
import TaskEdit from './TaskEdit';
import TaskList from './TaskList';

export default function TasksBlock() {
  const dispatch = useAppDispatch();
  const { tasks: allTasks } = useAppSelector(taskSelector);
  const [tasks, setTasks] = useState<any>([]);
  const [editItem, setEditItem] = useState<TaskProps>();
  const [deleteId, setDeleteId] = useState<string | undefined>('');

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleEdit = (id: string | undefined) => {
    handleOpenEdit();
    if (tasks.length > 0) {
      const toEdit = tasks.find((task: TaskProps) => task._id === id);
      setEditItem(toEdit);
    }
  };
  const handleDelete = (id: string | undefined) => {
    handleOpenDelete();
    setDeleteId(id);
  };

  useEffect(() => {
    if (allTasks) setTasks(allTasks);
  }, [allTasks]);

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h3" sx={{ color: '#C1C6DB', marginBottom: '30px' }}>
        Tasks
      </Typography>
      <Grid container justifyContent="flex-end">
        <TaskEdit
          editItem={editItem}
          setTasks={setTasks}
          tasks={tasks}
          open={openEdit}
          handleClose={handleCloseEdit}
        />
        <TaskDelete
          setTasks={setTasks}
          tasks={tasks}
          deleteId={deleteId}
          open={openDelete}
          handleClose={handleCloseDelete}
        />
      </Grid>
      {tasks?.length < 1 ? (
        <div style={{ marginBottom: '30px' }}>No Tasks Available!</div>
      ) : (
        <TaskList
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          tasks={tasks}
          setTasks={setTasks}
        />
      )}
      <TaskCreate setTasks={setTasks} />
    </>
  );
}
