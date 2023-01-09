import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginProps } from '../../types';

const initialState: LoginProps = {
  result: {
    email: '',
    fullName: '',
    password: '',
  },
  token: null,
  loading: false,
  error: false,
  success: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin: (state: typeof initialState) => {
      state.loading = true;
    },
    userLoginSuccess: (
      state: typeof initialState,
      action: PayloadAction<LoginProps>
    ) => {
      state.loading = false;
      state.result = action.payload.result;
      state.token = action.payload.token;
      state.error = false;
      state.success = true;
    },
    userLoginError: (
      state: typeof initialState,
      action: PayloadAction<LoginProps>
    ) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    userLogout: (state: typeof initialState) => {
      state.loading = true;
    },
    userLogoutSuccess: (state: typeof initialState) => {
      state.loading = false;
      state.result = null;
      state.token = null;
      state.success = false;
    },
    userLogoutError: (
      state: typeof initialState,
      action: PayloadAction<LoginProps>
    ) => {
      state.error = action.payload;
    },
  },
});

// Selector function return
export const authSelector = (state: { auth: LoginProps }) => state.auth;

// Action creators are generated for each case reducer function
export const {
  userLogin,
  userLoginSuccess,
  userLoginError,
  userLogout,
  userLogoutSuccess,
  userLogoutError,
} = authSlice.actions;

export default authSlice.reducer;
