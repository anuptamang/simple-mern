import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { postSelector } from 'redux/post/postSlice';
import { notify } from 'utils/notification';
import {
  postCreate,
  resetPostCreate
} from '../../../../redux/post/postAction';
import { PostProps } from '../../../../types/post';
import { postCreateFormSchema } from '../../../../utils/validationSchema';
import PostForm from '../../../UI/CreateForm';

type IFormInput = {
  id?: string | number;
  title?: string;
  author?: string;
  status?: { [x: string]: string }[];
  date?: string | number;
  body: string;
};

const PostCreateForm = ({ setRows, handleClose }: any) => {
  const dispatch = useAppDispatch();
  const { loading, createPostSuccess, createPost } = useAppSelector(
    postSelector
  ) as any;
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      body: '',
    },
    resolver: yupResolver(postCreateFormSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    dispatch(postCreate(data));
  };

  useEffect(() => {
    if (createPostSuccess) {
      const newPost = {
        id: createPost?._id,
        createdAt: dayjs(createPost?.createdAt).format('MMMM D, YYYY'),
        author: createPost?.userID,
        body: createPost?.body,
      };

      setRows((prev: PostProps[]) => [...prev, newPost]);
      reset();
      handleClose();
      notify('Post created successfully', 'post-update-form', 'success');
      dispatch(resetPostCreate());
    }
  }, [dispatch, createPostSuccess]);

  return (
    <PostForm
      control={control}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      loading={loading}
      errors={errors}
      formTitle="Create a Post"
    />
  );
};

export default PostCreateForm;
