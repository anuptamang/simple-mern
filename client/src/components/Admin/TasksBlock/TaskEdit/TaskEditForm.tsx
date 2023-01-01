import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { delay } from '../../../../utils/delay';
import { notify } from '../../../../utils/notification';
import { tasksSchema } from '../../../../utils/validationSchema';
import EditBox from './EditBox';

type IFormInput = {
  title: string;
};

const TaskEditForm = ({ setTasks, tasks, handleClose, editItem }: any) => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      title: editItem.title,
    },
    resolver: yupResolver(tasksSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    await delay(3000);
    handleClose();
    reset();

    const updatedPosts = [...tasks];
    const index = updatedPosts.findIndex(
      (task: any) => task.id === editItem.id
    );
    updatedPosts[index] = {
      ...updatedPosts[index],
      title: data.title,
    };

    setTasks(updatedPosts);
    setLoading(false);
    notify('Task updated successfully', 'task-update-form', 'success');
  };

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
