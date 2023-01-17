import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthTypeProps } from '../../types';

const initialState: AuthTypeProps = {
  result: null,
  addUser: null,
  token: null,
  loading: false,
  error: false,
  success: false,
  users: null,
  singleUser: null,
  updateUser: null,
  deleteUser: null,
  updateUserSuccess: false,
  deleteUserSuccess: false,
  loadingSingle: false,
  loadingUpdate: false,
  loadingDelete: false
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
    addUserSuccess: (state: typeof initialState, action: PayloadAction<AuthTypeProps>) => {
      state.loading = false
      state.success = true
      state.result = action.payload.result;
      state.token = action.payload.token;
      state.addUser = action.payload
    },
    addUserError: (state: typeof initialState, action: PayloadAction<AuthTypeProps>) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    resetAddUser: (state: typeof initialState) => {
      state.addUser = {}
      state.success = false
      state.error = false
    },
    readUsers: (state: typeof initialState) => {
      state.loading = true
    },
    readUsersSuccess: (state, action: PayloadAction<AuthTypeProps>) => {
      state.loading = false
      state.success = true
      state.users = action.payload
    },
    readUsersError: (state: typeof initialState, action: PayloadAction<AuthTypeProps>) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    readSingleUser: (state: typeof initialState) => {
      state.loadingSingle = true
    },
    readSingleUserSuccess: (state: typeof initialState, action: PayloadAction<AuthTypeProps>) => {
      state.loadingSingle = false
      state.success = true
      state.result = action.payload
      state.singleUser = action.payload
    },
    readSingleUserError: (state: typeof initialState, action: PayloadAction<AuthTypeProps>) => {
      state.loadingSingle = false
      state.success = false
      state.error = action.payload
    },
    updateUser: (state: typeof initialState) => {
      state.loading = true
    },
    updateUserSuccess: (state: typeof initialState, action: PayloadAction<AuthTypeProps>) => {
      state.loading = false
      state.updateUserSuccess = true
      state.result = action.payload
      state.updateUser = action.payload
    },
    updateUserError: (state: typeof initialState, action: PayloadAction<AuthTypeProps>) => {
      state.loading = false
      state.updateUserSuccess = false
      state.error = action.payload
    },

    resetUpdateUser: (state: typeof initialState) => {
      state.updateUser = null
      state.updateUserSuccess = false
    },

    deleteUser: (state: typeof initialState) => {
      state.loadingDelete = true
    },
    deleteUserSuccess: (state: typeof initialState, action: PayloadAction<AuthTypeProps>) => {
      state.loadingDelete = false
      state.deleteUserSuccess = true
      state.deleteUser = action.payload
    },
    deleteUserError: (state: typeof initialState, action: PayloadAction<AuthTypeProps>) => {
      state.loadingDelete = false
      state.deleteUserSuccess = false
      state.error = action.payload
    },

    resetDeleteUser: (state: typeof initialState) => {
      state.deleteUser = null
      state.loadingDelete = false
      state.deleteUserSuccess = false
      state.error = false
    },

    resetSingleUser: (state: typeof initialState) => {
      state.singleUser = {}
      state.loadingSingle = false
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
  readUsers,
  readUsersSuccess,
  readUsersError,
  readSingleUser,
  readSingleUserSuccess,
  readSingleUserError,
  deleteUser,
  deleteUserSuccess,
  deleteUserError,
  updateUser,
  updateUserSuccess,
  updateUserError,
  resetDeleteUser,
  resetSingleUser,
  resetUpdateUser
} = authSlice.actions;

export default authSlice.reducer;
