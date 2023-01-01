import { ChangeEvent, ReactNode } from 'react'

export type GenericObject<T = unknown> = { [key: string]: T }
export type Nullable<T> = T | null

export type FunctionWithParam<T> = (p: T) => void
export type FunctionWithNoParam = () => void
export type FunctionWithNoParamButReturn<R> = () => R
export type FunctionWithParamAndReturn<P, R> = (p: P) => R

export interface ApiResponseType<T> {
  message: string
  success: boolean
  status: boolean
  data: T
}

export interface ApiReturn<T> extends Promise<ApiResponseType<Nullable<T>>> {}

export interface ErrorObject {
  error: string
}

export interface ChildrenProps {
  children: ReactNode
}

export interface AuthProps {
  user: {}
}

export interface LoginProps {
  user: null | {}
  loading: boolean
  error: boolean | {}
  success: boolean
}

export interface Author {
  id?: number
  firstName: string
  lastName: string
  maidenName: string
  age: number | null
  gender: string
  email: string
  phone: string
  username: string
  birthDate: string
  image: string
  company: {
    department: string
    name: string
    title: string
  }
}

export interface AuthorDataProps {
  data: Author
}

export interface PostProps {
  id: string | number
  title: string
  body: string
  createdAt?: string
  reactions: number
  categories?: string
  tags: string[]
  views?: number
  userId?: string | number
  postImageUrl?: string
  limitText?: string | number
  layoutType?: string
}

export interface LikesProps {
  likes: number | undefined
  setLikes: (likes: number | undefined) => void
}

export interface PostDataProps {
  data: PostProps
  author?: AuthorDataProps
  comments?: CommentsDataProps
  likes?: any
  setLikes?: any
  auth?: any
  handleCommentSubmit?: any
  handleReplySubmit?: any
  setPostComments?: any
  setReplyComments?: any
  replyComments?: any
}

export interface CommentsProps {
  id?: string | number
  body: string
  postId: string | number
  user: {
    id: string | number
    username: string
  }
}

export interface CommentsDataProps {
  comments: CommentsProps[]
  total?: number
  skip?: number
  limit?: number
}

export interface PostsProps {
  posts: {
    posts: []
    data: PostProps[]
    limit: number
    total: number
  }
}

export type eProps = ChangeEvent<HTMLInputElement>
export type HandleChangeProps = any

export type SetDataProps = (prev: [] | {} | string | number) => void
export type SetLoadingProps = (p: boolean | number) => void

export interface IDispatch {
  type: string
  payload?: string[] | [] | {}[] | boolean | number | unknown
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}
