import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useAuth } from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { postSelector } from 'redux/post/postSlice';
import { delay } from 'utils/delay';
import { isTokenValid } from 'utils/isTokenValid';
import { notify } from 'utils/notification';
import { postCreate, resetPostCreate } from '../../../../redux/post/postAction';
import { PostBlockProps } from '../../../../types/post';
import { postCreateFormSchema } from '../../../../utils/validationSchema';
import PostForm from '../../../UI/CreateForm';

type IFormInput = {
  id?: string | number;
  title?: string;
  author?: string;
  status?: { [x: string]: string }[];
  date?: string | number;
  body?: string;
  tag?: string[];
  categories?: string[];
  thumbnail?: any;
};

const PostCreateForm = ({ setRows, handleClose }: any) => {
  const auth = useAuth();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { loading, createPostSuccess, createPost } = useAppSelector(
    postSelector
  ) as any;

  const [postBody, setPostBody] = useState(EditorState.createEmpty());
  const [thumbnail, setThumbnail] = useState<any>(null);

  const onPostBodyChange = (newPostBody: any) => {
    setPostBody(newPostBody);
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      title: '',
      categories: [],
      tag: [],
    },
    resolver: yupResolver(postCreateFormSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const bodyContent = draftToHtml(convertToRaw(postBody.getCurrentContent()));

    const formData = {
      ...data,
      body: bodyContent,
      thumbnail: thumbnail[0],
    };

    if (auth?.token && isTokenValid(auth.token)) {
      dispatch(postCreate(formData, auth.token));
    } else {
      notify('User Session Expired', 'session-expire-form', 'warning');
      await delay(2000);
      <Navigate to={'/login'} state={{ from: location }} replace />;
    }
  };

  useEffect(() => {
    if (createPostSuccess) {
      const newPost = {
        id: createPost?._id,
        createdAt: dayjs(createPost?.createdAt).format('MMMM D, YYYY'),
        author: auth?.result?.fullName,
        body: createPost?.body,
      };

      setRows((prev: PostBlockProps[]) => [...prev, newPost]);
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
      postBody={postBody}
      setPostBody={onPostBodyChange}
      setThumbnail={setThumbnail}
    />
  );
};

export default PostCreateForm;
