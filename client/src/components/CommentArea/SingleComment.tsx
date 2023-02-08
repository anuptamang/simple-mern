import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import UserAvatar from 'components/UserAvatar';
import { CommentProps } from 'features/SinglePostSection';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getUserById } from 'redux/auth/authAction';
import { authSelector } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Comments } from 'types/post';
import { commentSchema } from 'utils/validationSchema';
import CommentBox from './CommentBox';
import { BtnLoading } from 'components/UI/BtnLoading';
import { postSelector, resetReplyComment } from 'redux/post/postSlice';
import { useAuth } from 'hooks/useAuth';
import { replyOnComment } from 'redux/post/postAction';
import { useParams, useNavigate } from 'react-router-dom';
import { isTokenValid } from 'utils/isTokenValid';
import { notify } from 'utils/notification';
import { delay } from 'utils/delay';

const SingleComment = ({ comment }: { comment: Comments }) => {
  const { singleUser } = useAppSelector(authSelector);
  const { replyCommentLoading, replyCommentSuccess, replyComment } =
    useAppSelector(postSelector);
  const dispatch = useAppDispatch();
  const [showReplyBox, setShowReplyBox] = useState<boolean>(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const [replies, setReplies] = useState<string[]>(comment.replies);

  // console.log(postId);

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

  const handleReplyToggle = () => {
    setShowReplyBox(!showReplyBox);
  };

  const onSubmit: SubmitHandler<CommentProps> = async (data: CommentProps) => {
    if (auth?.token && isTokenValid(auth.token)) {
      if (auth.result?._id) {
        if (postId) {
          dispatch(replyOnComment(data, postId, comment._id, auth.token));
        }
      }
    } else {
      notify('User Session Expired', 'session-expire-form', 'warning');
      await delay(2000);
      // <Navigate to={'/login'} state={{ from: location }} replace />;
      navigate('/login');
    }
  };

  useEffect(() => {
    dispatch(getUserById(comment.userId));
  }, [comment.userId, dispatch]);

  useEffect(() => {
    if (replyCommentSuccess) {
      setReplies(
        replyComment?.comments.find(
          (item: Comments) => item._id === comment._id
        ).replies
      );
      reset();
      notify('Reply added successfully', 'reply-form', 'success');
      dispatch(resetReplyComment());
    }
  }, [dispatch, replyCommentSuccess]);

  return (
    <Box sx={{marginBottom: '20px'}}>
      <Box
        sx={{
          position: 'relative',
          paddingLeft: '60px',
          marginBottom: '10px',
        }}
      >
        <Box sx={{ position: 'absolute', left: '0', top: '0' }}>
          <UserAvatar
            userName={singleUser?.fullName ? singleUser.fullName : 'User Name'}
          />
        </Box>
        <Box
          sx={{
            background: '#e9eedc',
            color: '#333',
            borderRadius: '5px',
            padding: '10px',
          }}
        >
          <Typography>{comment.text}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
          paddingLeft: '60px',
          marginBottom: '10px',
        }}
      >
        {replies.length > 0 && (
          <Typography sx={{ marginBottom: '10px', textAlign: 'right' }}>
            Comment Replies:
          </Typography>
        )}
        {replies.map((reply: string, index: number) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              paddingLeft: '60px',
              marginBottom: '10px',
              textAlign: 'right',
            }}
          >
            <Box
              sx={{
                background: '#979893',
                color: '#333',
                borderRadius: '5px',
                padding: '10px',
                display: 'inline-block',
              }}
            >
              <Typography>{reply}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box>
        {showReplyBox && (
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            noValidate
            autoComplete="off"
            sx={{ paddingLeft: '60px' }}
          >
            <Grid container direction={{ xs: 'column', md: 'row' }} spacing={1}>
              <Grid item xs={12}>
                <CommentBox
                  label="Reply..."
                  control={control}
                  userName={singleUser.fullName}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '20px',
                    alignItems: 'center',
                  }}
                >
                  <BtnLoading
                    variant="contained"
                    loading={replyCommentLoading}
                    loadingPosition="center"
                    type="submit"
                  >
                    Reply
                  </BtnLoading>
                  <Typography
                    onClick={handleReplyToggle}
                    sx={{ textAlign: 'right', cursor: 'pointer' }}
                  >
                    Dismiss
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
        {!showReplyBox && (
          <Typography
            onClick={handleReplyToggle}
            sx={{ textAlign: 'right', cursor: 'pointer' }}
          >
            Reply
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SingleComment;
