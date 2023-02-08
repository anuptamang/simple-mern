import { yupResolver } from '@hookform/resolvers/yup';
import PostForm from 'components/UI/CreateForm';
import dayjs from 'dayjs';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { postCreate, resetPostCreate } from 'redux/post/postAction';
import { postSelector } from 'redux/post/postSlice';
import { PostBlockProps } from 'types/post';
import { isTokenValid } from 'utils/isTokenValid';
import { notify } from 'utils/notification';
import { postCreateFormSchema } from 'utils/validationSchema';

const PostCreateForm = ({
  setRows,
  handleClose,
  setThumbnail,
  thumbnail,
  postBody,
  onPostBodyChange,
}: any) => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const { loading, createPostSuccess, createPost } = useAppSelector(
    postSelector
  ) as any;

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PostBlockProps>({
    defaultValues: {
      title: '',
      categories: [],
      tag: [],
    },
    resolver: yupResolver(postCreateFormSchema),
  });

  const onSubmit: SubmitHandler<PostBlockProps> = async (data) => {
    const bodyContent = draftToHtml(convertToRaw(postBody.getCurrentContent()));

    const formData = {
      ...data,
      body: bodyContent,
      thumbnail: thumbnail[0],
    };

    if (auth?.token && isTokenValid(auth.token)) {
      dispatch(postCreate(formData, auth.token));
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
