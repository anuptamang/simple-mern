import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { loadState } from '../utils/localStorage';
import authSlice from './auth/authSlice';
import postSlice from './post/postSlice';
import taskSlice from './task/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    task: taskSlice,
  },
  preloadedState: loadState('user'),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
