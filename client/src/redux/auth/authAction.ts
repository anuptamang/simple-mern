import axios from 'axios';
import { API_URL } from '../../configs';
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

export const login =
  (payload: LoginPayloadProps, reset: any) =>
    async (dispatch: (arg0: DispatchLoginProps) => any) => {
      dispatch(userLogin());

      try {
        const response = await axios.post(`${API_URL}/user/login`, payload);
        dispatch(userLoginSuccess(response.data));
        notify('Login Successfull', 'login-success', 'success');
        reset();
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
      localStorage.clear();

      dispatch(userLogoutSuccess());
    } catch (err: any) {
      dispatch(userLogoutError(err));
      notify('Logout Failed', 'Logout-failed', 'error');
    }
  };
