import { ChangeEvent, ReactNode } from 'react';

export type GenericObject<T = unknown> = { [key: string]: T };
export type Nullable<T> = T | null;

export type FunctionWithParam<T> = (p: T) => void;
export type FunctionWithNoParam = () => void;
export type FunctionWithNoParamButReturn<R> = () => R;
export type FunctionWithParamAndReturn<P, R> = (p: P) => R;

export interface ApiResponseType<T> {
  message: string;
  success: boolean;
  status: boolean;
  data: T;
}

export interface ApiReturn<T> extends Promise<ApiResponseType<Nullable<T>>> { }

export interface ErrorObject {
  error: string;
}

export interface ChildrenProps {
  children: ReactNode;
}

export interface UserInfo {
  result?: any
  email?: string;
  fullName?: string;
  password?: string;
  __v?: any;
  _id?: string;
}

export interface AuthTypeProps {
  result: null | UserInfo;
  token: string | null;
  loading: boolean;
  error: boolean | {};
  success: boolean;
  addUser: object | null;
  users: null | any
  singleUser: null | any
  updateUser: null | any
  deleteUser: null | any
  loadingSingle: boolean
  loadingUpdate: boolean
  loadingDelete: boolean
  updateUserSuccess: boolean
  deleteUserSuccess: boolean
}

export interface PostProps {
  id: string | number;
  title: string;
  body: string;
  createdAt?: string;
  reactions: number;
  categories?: string;
  tags: string[];
  views?: number;
  userId?: string | number;
  postImageUrl?: string;
  limitText?: string | number;
  layoutType?: string;
}

export interface LikesProps {
  likes: number | undefined;
  setLikes: (likes: number | undefined) => void;
}


export type eProps = ChangeEvent<HTMLInputElement>;
export type HandleChangeProps = any;

export type SetDataProps = (prev: [] | {} | string | number) => void;
export type SetLoadingProps = (p: boolean | number) => void;

export interface IDispatch {
  type: string;
  payload?: string[] | [] | {}[] | boolean | number | unknown;
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  };
};
