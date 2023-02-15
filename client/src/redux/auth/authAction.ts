import axios from 'axios';
import { API_URL, configHeaders } from '../../configs';
import { AuthTypeProps } from '../../types';
import { delay } from '../../utils/delay';
import { notify } from '../../utils/notification';
import {
  addUser,
  addUserError,
  addUserSuccess,
  userLogin,
  userLoginError,
  userLoginSuccess,
  userLogout,
  userLogoutError,
  userLogoutSuccess,
  deleteUser, deleteUserError, deleteUserSuccess, readUsers, readUsersError, readUsersSuccess, updateUser, updateUserError, updateUserSuccess, resetDeleteUser, readSingleUser, readSingleUserSuccess, readSingleUserError, resetUpdateUser
} from './authSlice';

interface LoginPayloadProps {
  email: string;
  password: string;
}

interface RegisterPayloadProps {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type DispatchLoginProps = {
  payload: AuthTypeProps | undefined;
  type: 'auth/userLogin' | 'auth/userLoginSuccess' | 'auth/userLoginError';
};


type DispatchRegisterProps = {
  payload: AuthTypeProps | undefined;
  type: 'auth/addUser' | 'auth/addUserSuccess' | 'auth/addUserError';
};

type DispatchLogoutProps = {
  payload: AuthTypeProps | undefined;
  type: 'auth/userLogout' | 'auth/userLogoutSuccess' | 'auth/userLogoutError';
};




type DispatchResetDeleteUserProps = {
  type: 'auth/resetDeleteUser';
};


type DispatchReadUsersProps = {
  type: 'auth/readUsers' | 'auth/readUsersSuccess' | 'auth/readUsersError';
};

type DispatchUpdateUserProps = {
  type: 'auth/updateUser' | 'auth/updateUserSuccess' | 'auth/updateUserError';
};


type DispatchDeleteUserProps = {
  type: 'auth/deleteUser' | 'auth/deleteUserSuccess' | 'auth/deleteUserError';
};

type DispatchReadSingleUserProps = {
  type: 'auth/readSingleUser' | 'auth/readSingleUserSuccess' | 'auth/readSingleUserError';
};

interface PatchUserPayloadProps {
  fullName?: string
}

type DispatchResetUpdateUserProps = {
  type: 'auth/resetUpdateUser';
};

export const resetUserDelete = () => async (dispatch: (arg0: DispatchResetDeleteUserProps) => any) => {
  dispatch(resetDeleteUser());
}



export const getAllusers = () => async (dispatch: (arg0: DispatchReadUsersProps) => any) => {
  dispatch(readUsers());

  try {
    const response = await axios.get(`${API_URL}/user/list`)
    dispatch(readUsersSuccess(response.data));
  } catch (err: any) {
    dispatch(readUsersError(err));
  }
};

export const userUpdate = (payload: PatchUserPayloadProps, userId: string, token: string) =>
  async (dispatch: (arg0: DispatchUpdateUserProps) => any) => {
    dispatch(updateUser());

    try {
      const response = await axios.patch(`${API_URL}/user/${userId}`, payload, configHeaders(token))
      dispatch(updateUserSuccess(response.data));
    } catch (err: any) {
      dispatch(updateUserError(err));
    }
  };

export const resetUserUpdate = () => async (dispatch: (arg0: DispatchResetUpdateUserProps) => any) => {
  dispatch(resetUpdateUser());
}

export const userDelete = (userId: string, token: string) =>
  async (dispatch: (arg0: DispatchDeleteUserProps) => any) => {
    dispatch(deleteUser());

    try {
      const response = await axios.delete(`${API_URL}/user/${userId}`, configHeaders(token))
      dispatch(deleteUserSuccess(response.data));
    } catch (err: any) {
      dispatch(deleteUserError(err));
    }
  };

export const getUserById = (userId: string) => async (dispatch: (arg0: DispatchReadSingleUserProps) => any) => {
  dispatch(readSingleUser());

  try {
    const response = await axios.get(`${API_URL}/user/${userId}`)
    dispatch(readSingleUserSuccess(response.data));
  } catch (err: any) {
    dispatch(readSingleUserError(err));
  }
};

export const login =
  (payload: LoginPayloadProps, reset: any, navigate: any) =>
    async (dispatch: (arg0: DispatchLoginProps) => any) => {
      dispatch(userLogin());

      try {
        const response = await axios.post(`${API_URL}/user/login`, payload);
        dispatch(userLoginSuccess(response.data));
        reset();
        notify('Login Successfull', 'login-success', 'success');
        navigate('/user');
      } catch (err: any) {
        dispatch(userLoginError(err));
        notify(err.response.data.message, 'login-failed', 'error');
      }
    };

export const register =
  (payload: RegisterPayloadProps, reset: any) =>
    async (dispatch: (arg0: DispatchRegisterProps) => any) => {
      dispatch(addUser());

      try {
        const response = await axios.post(`${API_URL}/user/registration`, payload);
        dispatch(addUserSuccess(response.data));
        reset();
        notify('Register Successfull', 'register-success', 'success');
      } catch (err: any) {
        dispatch(addUserError(err));
        notify(err.response.data.message, 'register-failed', 'error');
      }
    };

export const logout =
  () => async (dispatch: (arg0: DispatchLogoutProps) => any) => {
    dispatch(userLogout());
    try {
      await delay(3000);
      localStorage.removeItem('user');

      dispatch(userLogoutSuccess());
    } catch (err: any) {
      dispatch(userLogoutError(err));
      notify('Logout Failed', 'Logout-failed', 'error');
    }
  };