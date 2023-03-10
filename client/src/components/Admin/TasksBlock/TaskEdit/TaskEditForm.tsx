import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { resetTaskUpdate, taskUpdate } from 'redux/task/taskAction';
import { taskSelector } from 'redux/task/taskSlice';
import { delay } from 'utils/delay';
import { isTokenValid } from 'utils/isTokenValid';
import { notify } from '../../../../utils/notification';
import { tasksSchema } from '../../../../utils/validationSchema';
import EditBox from './EditBox';

type IFormInput = {
  task: string;
};

const TaskEditForm = ({ setTasks, tasks, handleClose, editItem }: any) => {
  const dispatch = useAppDispatch();
  const { loading, updateTaskSuccess, updateTask } =
    useAppSelector(taskSelector);
  const auth = useAuth();
  const location = useLocation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      task: editItem.task,
    },
    resolver: yupResolver(tasksSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (auth?.token && isTokenValid(auth.token)) {
      dispatch(taskUpdate(data, editItem._id, auth.token));
    } else {
      notify('User Session Expired', 'session-expire-form', 'warning');
      await delay(2000);
      <Navigate to={'/login'} state={{ from: location }} replace />;
    }
  };

  useEffect(() => {
    if (updateTaskSuccess) {
      const updatedTasks = [...tasks];
      const index = updatedTasks.findIndex(
        (task: any) => task._id === editItem._id
      );
      updatedTasks[index] = {
        ...updatedTasks[index],
        ...updateTask,
      };
      setTasks(updatedTasks);
      reset();
      handleClose();
      notify('Task updated successfully', 'task-update-form', 'success');
      dispatch(resetTaskUpdate());
    }
  }, [dispatch, updateTaskSuccess]);

  return (
    <EditBox
      control={control}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      loading={loading}
      errors={errors}
      formTitle="Edit a Task"
    />
  );
};

export default TaskEditForm;
