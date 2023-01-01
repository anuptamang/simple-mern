import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { delay } from '../../../../utils/delay';
import { notify } from '../../../../utils/notification';
import { postCreateFormSchema } from '../../../../utils/validationSchema';
import PostForm from '../../../UI/CreateForm';
import { PostProps } from '../../../../types/post';

type IFormInput = {
  id?: string | number;
  title: string;
  author: string;
  status: { [x: string]: string }[];
  date?: string | number;
  body: string;
};

const PostEditForm = ({ setRows, rows, handleClose, editPost }: any) => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      id: editPost.id,
      title: editPost.title,
      author: editPost.author,
      status: editPost.status,
      date: editPost.date,
      body: editPost.body,
    },
    resolver: yupResolver(postCreateFormSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    await delay(3000);
    handleClose();
    reset();

    const updatedPosts = [...rows];
    const index = updatedPosts.findIndex(
      (post: PostProps) => post.id === editPost.id
    );
    updatedPosts[index] = {
      ...updatedPosts[index],
      title: data.title,
      author: data.author,
      status: data.status,
      date: data.date,
      body: data.body,
    };

    setRows(updatedPosts);
    setLoading(false);
    notify('Post updated successfully', 'post-update-form', 'success');
  };

  return (
    <PostForm
      control={control}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      loading={loading}
      errors={errors}
      formTitle="Edit a Post"
    />
  );
};

export default PostEditForm;
