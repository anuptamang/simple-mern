import { Box, Typography } from '@mui/material';
import UserAvatar from 'components/UserAvatar';
import { useEffect } from 'react';
import { getUserById } from 'redux/auth/authAction';
import { authSelector } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Comments } from 'types/post';

const SingleComment = ({ comment }: { comment: Comments }) => {
  const { singleUser } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserById(comment.userId));
  }, [comment.userId, dispatch]);

  return (
    <Box
      sx={{
        position: 'relative',
        paddingLeft: '60px',
        marginBottom: '20px',
      }}
    >
      <Box sx={{ position: 'absolute', left: '0', top: '0' }}>
        <UserAvatar
          userName={singleUser?.fullName ? singleUser.fullName : 'User Name'}
        />
      </Box>
      <Box
        sx={{
          background: '#989393',
          color: '#333',
          borderRadius: '5px',
          padding: '10px',
        }}
      >
        <Typography>{comment.text}</Typography>
      </Box>
      <p>Reply</p>
    </Box>
  );
};

export default SingleComment;
