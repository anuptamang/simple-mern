import { Button, Stack, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { resetTaskDelete, taskDelete } from 'redux/task/taskAction';
import { taskSelector } from 'redux/task/taskSlice';
import { isTokenValid } from 'utils/isTokenValid';
import { delay } from '../../../../utils/delay';
import { notify } from '../../../../utils/notification';
import { BtnLoading } from '../../../UI/BtnLoading';

const TaskDeleteForm = ({ tasks, setTasks, handleClose, deleteId }: any) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { token } = useAuth();
  const { loading, deleteTaskSuccess } = useAppSelector(
    taskSelector
  ) as any;

  const handleSubmit = async () => {

    if (token && isTokenValid(token)) {
      dispatch(taskDelete(deleteId, token));
    } else {
      notify('User Session Expired', 'session-expire-form', 'warning');
      await delay(2000);
      <Navigate to={'/login'} state={{ from: location }} replace />;
    }
  };

  useEffect(() => {
    if (deleteTaskSuccess) {
      handleClose();
      const newData = tasks?.filter((task: any) => task._id !== deleteId);

      setTasks(newData);

      notify('Post Deleted successfully', 'post-delete-form', 'success');
      dispatch(resetTaskDelete());
    }
  }, [dispatch, deleteTaskSuccess]);

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
  );
};

export default TaskDeleteForm;
