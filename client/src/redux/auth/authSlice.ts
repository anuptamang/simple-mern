import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthTypeProps } from '../../types';

const initialState: AuthTypeProps = {
  result: {
    email: '',
    fullName: '',
    password: '',
  },
  addUser: null,
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
      action: PayloadAction<AuthTypeProps>
    ) => {
      state.loading = false;
      state.result = action.payload.result;
      state.token = action.payload.token;
      state.error = false;
      state.success = true;
    },
    userLoginError: (
      state: typeof initialState,
      action: PayloadAction<AuthTypeProps>
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
      action: PayloadAction<AuthTypeProps>
    ) => {
      state.error = action.payload;
    },
    addUser: (state) => {
      state.loading = true
    },
    addUserSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.result = action.payload.result;
      state.token = action.payload.token;
      state.addUser = action.payload
    },
    addUserError: (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    resetAddUser: (state) => {
      state.addUser = {}
      state.success = false
      state.error = false
    },
  },
});

// Selector function return
export const authSelector = (state: { auth: AuthTypeProps }) => state.auth;

// Action creators are generated for each case reducer function
export const {
  userLogin,
  userLoginSuccess,
  userLoginError,
  userLogout,
  userLogoutSuccess,
  userLogoutError,
  addUser,
  addUserSuccess,
  addUserError,
  resetAddUser,
} = authSlice.actions;

export default authSlice.reducer;
