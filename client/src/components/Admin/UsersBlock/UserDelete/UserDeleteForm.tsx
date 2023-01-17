import { Button, Stack, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { resetUserDelete, userDelete } from 'redux/auth/authAction';
import { authSelector } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { UserInfo } from 'types';
import { isTokenValid } from 'utils/isTokenValid';
import { delay } from '../../../../utils/delay';
import { notify } from '../../../../utils/notification';
import { BtnLoading } from '../../../UI/BtnLoading';

const UserDeleteForm = ({
  users,
  setUsersList,
  handleClose,
  deleteId,
}: any) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { token } = useAuth();
  const { loading, deleteUserSuccess } = useAppSelector(authSelector) as any;

  const handleSubmit = async () => {
    if (token && isTokenValid(token)) {
      dispatch(userDelete(deleteId, token));
    } else {
      notify('User Session Expired', 'session-expire-form', 'warning');
      await delay(2000);
      <Navigate to={'/login'} state={{ from: location }} replace />;
    }
  };

  useEffect(() => {
    if (deleteUserSuccess) {
      handleClose();
      const newData = users?.filter((user: UserInfo) => user._id !== deleteId);

      setUsersList(newData);

      notify('User Deleted successfully', 'user-delete-form', 'success');
      dispatch(resetUserDelete());
    }
  }, [dispatch, deleteUserSuccess]);

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
        Do you want to delete this user?
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

export default UserDeleteForm;
