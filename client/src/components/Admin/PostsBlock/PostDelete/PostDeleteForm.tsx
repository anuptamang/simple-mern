import { Button, Stack, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { postDelete, resetPostDelete } from 'redux/post/postAction';
import { postSelector } from 'redux/post/postSlice';
import { notify } from '../../../../utils/notification';
import { BtnLoading } from '../../../UI/BtnLoading';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { delay } from 'utils/delay';
import { isTokenValid } from 'utils/isTokenValid';

const PostDeleteForm = ({ rows, setRows, handleClose, deleteId }: any) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { token } = useAuth();
  const { loading, deletePostSuccess } = useAppSelector(postSelector) as any;

  const handleSubmit = async () => {
    if (token && isTokenValid(token)) {
      dispatch(postDelete(deleteId, token));
    } else {
      notify('User Session Expired', 'session-expire-form', 'warning');
      await delay(2000);
      <Navigate to={'/login'} state={{ from: location }} replace />;
    }
  };

  useEffect(() => {
    if (deletePostSuccess) {
      handleClose();
      const newData = rows.filter((post: any) => post.id !== deleteId);
      setRows(newData);

      notify('Post Deleted successfully', 'post-delete-form', 'success');
      dispatch(resetPostDelete());
    }
  }, [dispatch, deletePostSuccess]);

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          color: '#fff',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        Do you want to delete this post?
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{ background: 'gray', color: '#fff' }}
        >
          Cancel
        </Button>
        <BtnLoading
          variant="contained"
          onClick={handleSubmit}
          loading={loading}
          sx={{ background: red[200], color: '#fff' }}
        >
          Delete
        </BtnLoading>
      </Stack>
    </>
  );
};

export default PostDeleteForm;
