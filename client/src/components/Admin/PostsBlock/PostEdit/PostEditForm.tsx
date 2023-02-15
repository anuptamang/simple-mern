import { yupResolver } from '@hookform/resolvers/yup';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { postSelector } from 'redux/post/postSlice';
import { delay } from 'utils/delay';
import { isTokenValid } from 'utils/isTokenValid';
import { postUpdate, resetPostUpdate } from '../../../../redux/post/postAction';
import { PostBlockProps } from '../../../../types/post';
import { notify } from '../../../../utils/notification';
import { postCreateFormSchema } from '../../../../utils/validationSchema';
import PostForm from '../../../UI/CreateForm';

const PostEditForm = ({
  setRows,
  rows,
  handleClose,
  editPost,
  postBody,
  onPostBodyChange,
  thumbnail,
  setThumbnail,
}: any) => {
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
  } = useForm<PostBlockProps>({
    defaultValues: {
      title: editPost?.title,
      categories: editPost?.categories[0]?.toString(),
      tag: editPost?.tag[0].toString(),
    },
    resolver: yupResolver(postCreateFormSchema),
  });

  const onSubmit: SubmitHandler<PostBlockProps> = async (data) => {
    const bodyContent = draftToHtml(convertToRaw(postBody.getCurrentContent()));

    const formData = {
      ...data,
      body: bodyContent,
    };

    if (token && isTokenValid(token)) {
      dispatch(postUpdate(formData, editPost?.id, token));
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
      postBody={postBody}
      setPostBody={onPostBodyChange}
      setThumbnail={setThumbnail}
      thumbnail={thumbnail}
    />
  );
};

export default PostEditForm;
