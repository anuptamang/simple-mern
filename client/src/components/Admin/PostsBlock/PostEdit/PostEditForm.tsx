import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { postSelector } from 'redux/post/postSlice';
import { postUpdate, resetPostUpdate } from '../../../../redux/post/postAction';
import { PostBlockProps } from '../../../../types/post';
import { notify } from '../../../../utils/notification';
import { postCreateFormSchema } from '../../../../utils/validationSchema';
import PostForm from '../../../UI/CreateForm';
import { useAuth } from 'hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { delay } from 'utils/delay';
import { isTokenValid } from 'utils/isTokenValid';

type IFormInput = {
  id?: string | number;
  title?: string;
  author?: string;
  status?: { [x: string]: string }[];
  date?: string | number;
  body: string;
};

const PostEditForm = ({ setRows, rows, handleClose, editPost }: any) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { token } = useAuth();

  const { loading, updatePostSuccess, updatePost } = useAppSelector(
    postSelector
  ) as any;
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      body: editPost.body,
    },
    resolver: yupResolver(postCreateFormSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (token && isTokenValid(token)) {
      dispatch(postUpdate(data, editPost?.id, token));
    } else {
      notify('User Session Expired', 'session-expire-form', 'warning');
      await delay(2000);
      <Navigate to={'/login'} state={{ from: location }} replace />;
    }
  };

  useEffect(() => {
    if (updatePostSuccess) {
      handleClose();
      reset();

      const updatedPosts = [...rows];
      const index = updatedPosts.findIndex(
        (post: PostBlockProps) => post.id === editPost.id
      );

      updatedPosts[index] = {
        ...updatedPosts[index],
        body: updatePost?.body,
      };

      setRows(updatedPosts);
      notify('Post updated successfully', 'post-update-form', 'success');
      dispatch(resetPostUpdate());
    }
  }, [dispatch, updatePostSuccess]);

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
