import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';
import { resetUserUpdate, userUpdate } from 'redux/auth/authAction';
import { authSelector } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { UserInfo } from 'types';
import { delay } from 'utils/delay';
import { isTokenValid } from 'utils/isTokenValid';
import { notify } from '../../../../utils/notification';
import { userInfoSchema } from '../../../../utils/validationSchema';
import EditBox from './EditBox';

type IFormInput = {
  fullName?: string;
};

const UserEditForm = ({ setUsersList, users, handleClose, editItem }: any) => {
  const dispatch = useAppDispatch();
  const { loading, updateUserSuccess, updateUser } =
    useAppSelector(authSelector);
  const auth = useAuth();
  const location = useLocation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      fullName: editItem.fullName,
    },
    resolver: yupResolver(userInfoSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (auth?.token && isTokenValid(auth.token)) {
      dispatch(userUpdate(data, editItem._id, auth.token));
    } else {
      notify('User Session Expired', 'session-expire-form', 'warning');
      await delay(2000);
      <Navigate to={'/login'} state={{ from: location }} replace />;
    }
  };

  useEffect(() => {
    if (updateUserSuccess) {
      const updatedUsers = [...users];
      const index = updatedUsers.findIndex(
        (user: UserInfo) => user._id === editItem._id
      );
      updatedUsers[index] = {
        ...updatedUsers[index],
        ...updateUser,
      };
      setUsersList(updatedUsers);
      reset();
      handleClose();
      notify('User updated successfully', 'user-update-form', 'success');
      dispatch(resetUserUpdate());
    }
  }, [dispatch, updateUserSuccess]);

  return (
    <EditBox
      control={control}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      loading={loading}
      errors={errors}
      formTitle="Edit a User"
    />
  );
};

export default UserEditForm;
