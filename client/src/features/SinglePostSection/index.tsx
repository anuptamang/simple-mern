import { yupResolver } from '@hookform/resolvers/yup';
import SinglePostContent from 'components/SinglePostContent';
import ErrorFallback from 'components/UI/ErrorFallback';
import Loading from 'components/UI/Loading';
import { useAuth } from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllusers } from 'redux/auth/authAction';
import { authSelector } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  addLikes,
  commentOnPost,
  getPostById,
  removeLikes,
} from 'redux/post/postAction';
import { postSelector, resetAddComment } from 'redux/post/postSlice';
import { UserInfo } from 'types';
import { Comments, LikesProps } from 'types/post';
import { delay } from 'utils/delay';
import { isTokenValid } from 'utils/isTokenValid';
import { notify } from 'utils/notification';
import { commentSchema } from 'utils/validationSchema';

type CommentProps = {
  text: string;
};

const SinglePostSection = () => {
  const { id } = useParams() as any;
  const dispatch = useAppDispatch();
  const { singlePost, loading, likeLoading, addComment, addCommentSuccess } =
    useAppSelector(postSelector);
  const { users } = useAppSelector(authSelector);
  const [likes, setLikes] = useState<LikesProps>();
  const auth = useAuth();
  const navigate = useNavigate();
  const [comments, setComments] = useState<[]>([]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CommentProps>({
    defaultValues: {
      text: '',
    },
    resolver: yupResolver(commentSchema),
  });

  const author = users?.find(
    (user: UserInfo) => user._id === singlePost?.userID
  );

  const onSubmit: SubmitHandler<CommentProps> = async (data: CommentProps) => {
    if (auth?.token && isTokenValid(auth.token)) {
      if (auth.result?._id) {
        dispatch(
          commentOnPost({ ...data, userId: auth.result._id }, id, auth.token)
        );
      }
    } else {
      notify('User Session Expired', 'session-expire-form', 'warning');
      await delay(2000);
      // <Navigate to={'/login'} state={{ from: location }} replace />;
      navigate('/login');
    }
  };

  const handleAddLikes = () => {
    dispatch(addLikes(singlePost?._id));
  };

  const handleRemoveLikes = () => {
    dispatch(removeLikes(singlePost?._id));
  };

  useEffect(() => {
    if (singlePost) {
      setLikes(singlePost.likes);
      setComments(singlePost.comments);
    }
  }, [singlePost]);

  useEffect(() => {
    dispatch(getPostById(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getAllusers());
  }, [dispatch]);

  useEffect(() => {
    if (addCommentSuccess) {
      setComments(addComment?.comments);
      reset();
      notify('Comment added successfully', 'comment-form', 'success');
      dispatch(resetAddComment());
    }
  }, [dispatch, addCommentSuccess]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Helmet>
              <title>{`${singlePost.title}`} | My App</title>
            </Helmet>

            <SinglePostContent
              errors={errors}
              handleSubmit={handleSubmit}
              control={control}
              onSubmit={onSubmit}
              post={singlePost}
              comments={comments}
              author={author}
              likes={likes}
              setLikes={setLikes}
              handleAddLikes={handleAddLikes}
              handleRemoveLikes={handleRemoveLikes}
              likeLoading={likeLoading}
            />
          </ErrorBoundary>
        </>
      )}
    </>
  );
};

export default SinglePostSection;
