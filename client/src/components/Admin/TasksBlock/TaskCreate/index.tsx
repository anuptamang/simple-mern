import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { resetTaskCreate, taskCreate } from 'redux/task/taskAction';
import { taskSelector } from 'redux/task/taskSlice';
import { delay } from 'utils/delay';
import { isTokenValid } from 'utils/isTokenValid';
import { notify } from '../../../../utils/notification';
import { tasksSchema } from '../../../../utils/validationSchema';
import { BtnLoading } from '../../../UI/BtnLoading';
import { InputForm } from '../../../UI/InputForm';

type IFormInput = {
  task: string;
  id?: string;
  completed?: boolean;
  pinned?: boolean;
};

type TaskCreateProps = {
  setTasks: any;
};

const TaskCreate = ({ setTasks }: TaskCreateProps) => {
  const dispatch = useAppDispatch();
  const { loading, createTaskSuccess, createTask } =
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
      task: '',
    },
    resolver: yupResolver(tasksSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (auth?.token && isTokenValid(auth.token)) {
      dispatch(taskCreate(data, auth.token));
    } else {
      notify('User Session Expired', 'session-expire-form', 'warning');
      await delay(2000);
      <Navigate to={'/login'} state={{ from: location }} replace />;
    }
  };

  useEffect(() => {
    if (createTaskSuccess) {
      setTasks((prev: any) => [...prev, createTask]);
      reset();
      notify('Task created successfully', 'task-create-form', 'success');
      dispatch(resetTaskCreate());
    }
  }, [dispatch, createTaskSuccess]);

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      noValidate
      autoComplete="off"
    >
      <Grid container direction={{ xs: 'column', md: 'row' }} spacing={4}>
        <Grid item xs={12} md={6}>
          <Controller
            rules={{ required: true }}
            name="task"
            control={control}
            render={({ field }) => (
              <InputForm fullWidth label="Type here..." {...field} />
            )}
          />
          <p>{errors.task?.message}</p>
        </Grid>
        <Grid item xs={4}>
          <BtnLoading
            variant="contained"
            loading={loading}
            loadingPosition="center"
            type="submit"
          >
            Submit
          </BtnLoading>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskCreate;
