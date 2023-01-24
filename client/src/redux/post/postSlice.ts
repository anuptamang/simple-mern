import { PayloadAction, createSlice } from '@reduxjs/toolkit'
export type SinglePostProps = {
  body?: object;
  title?: string;
  categories?: string[];
  tag?: string[];
  thumbnail?: string;
  createdAt?: string;
  userID?: string;
  __v?: number;
  _id?: string;
} | any

export type PostProps = {
  posts?: object | null,
  loading: boolean;
  error: any;
  success: boolean | undefined;
  singlePost: SinglePostProps;
  postsById: object | null;
  createPost: object | null;
  updatePost: object | null;
  deletePost: object | null;
  postAuthor: object | null;
  loadingSingle: boolean;
  loadingDelete: boolean;
  loadingUpdate: boolean;
  likeLoading: boolean;
  createPostSuccess: boolean;
  updatePostSuccess: boolean;
  deletePostSuccess: boolean;
}

const initialState: PostProps = {
  posts: null,
  loading: false,
  error: false,
  success: false,
  singlePost: {},
  postsById: null,
  createPost: null,
  updatePost: null,
  deletePost: null,
  postAuthor: null,
  loadingSingle: false,
  loadingDelete: false,
  loadingUpdate: false,
  likeLoading: false,
  createPostSuccess: false,
  updatePostSuccess: false,
  deletePostSuccess: false
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    createPost: (state: typeof initialState) => {
      state.loading = true
      state.createPostSuccess = false
    },
    createPostSuccess: (state, action: PayloadAction<PostProps>) => {
      state.loading = false
      state.createPostSuccess = true
      state.createPost = action.payload
    },
    createPostError: (state, action: PayloadAction<PostProps>) => {
      state.loading = false
      state.createPostSuccess = false
      state.error = action.payload
    },
    resetCreatePost: (state: typeof initialState) => {
      state.createPost = null
      state.createPostSuccess = false
    },
    resetUpdatePost: (state: typeof initialState) => {
      state.updatePost = null
      state.updatePostSuccess = false
    },

    readPosts: (state: typeof initialState) => {
      state.loading = true
    },
    readPostsSuccess: (state, action: PayloadAction<PostProps>) => {
      state.loading = false
      state.success = true
      state.posts = { ...state.posts, ...action.payload }
    },
    readPostsError: (state, action: PayloadAction<PostProps>) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    readSinglePost: (state: typeof initialState) => {
      state.loadingSingle = true
    },
    readSinglePostSuccess: (state, action: PayloadAction<PostProps>) => {
      state.loadingSingle = false
      state.success = true
      state.singlePost = action.payload
    },
    readSinglePostError: (state, action: PayloadAction<PostProps>) => {
      state.loadingSingle = false
      state.success = false
      state.error = action.payload
    },
    updatePost: (state: typeof initialState) => {
      state.loading = true
    },
    updatePostSuccess: (state, action: PayloadAction<PostProps>) => {
      state.loading = false
      state.updatePostSuccess = true
      state.updatePost = action.payload
    },
    updatePostError: (state, action: PayloadAction<PostProps>) => {
      state.loading = false
      state.updatePostSuccess = false
      state.error = action.payload
    },

    addLike: (state: typeof initialState) => {
      state.likeLoading = true
    },

    addLikeSuccess: (state, action: PayloadAction<PostProps>) => {
      state.likeLoading = false
      state.updatePostSuccess = true
      state.updatePost = action.payload
    },
    addLikeError: (state, action: PayloadAction<PostProps>) => {
      state.likeLoading = false
      state.updatePostSuccess = false
      state.error = action.payload
    },

    removeLike: (state: typeof initialState) => {
      state.likeLoading = true
    },

    removeLikeSuccess: (state, action: PayloadAction<PostProps>) => {
      state.likeLoading = false
      state.updatePostSuccess = true
      state.updatePost = action.payload
    },
    removeLikeError: (state, action: PayloadAction<PostProps>) => {
      state.likeLoading = false
      state.updatePostSuccess = false
      state.error = action.payload
    },


    deletePost: (state: typeof initialState) => {
      state.loadingDelete = true
    },
    deletePostSuccess: (state, action: PayloadAction<PostProps>) => {
      state.loadingDelete = false
      state.deletePostSuccess = true
      state.deletePost = action.payload
    },
    deletePostError: (state, action: PayloadAction<PostProps>) => {
      state.loadingDelete = false
      state.deletePostSuccess = false
      state.error = action.payload
    },

    resetDeletePost: (state: typeof initialState) => {
      state.deletePost = null
      state.loadingDelete = false
      state.deletePostSuccess = false
      state.error = false
    },
    resetSinglePost: (state: typeof initialState) => {
      state.singlePost = {}
      state.loadingSingle = false
      state.success = false
      state.error = false
    },
  },
})

// Selector function return
export const postSelector = (state: { post: PostProps }) => state.post

// Action creators are generated for each case reducer function
export const {
  readPosts,
  readPostsSuccess,
  readPostsError,
  readSinglePost,
  readSinglePostSuccess,
  readSinglePostError,
  createPost,
  createPostSuccess,
  createPostError,
  deletePost,
  deletePostSuccess,
  deletePostError,
  updatePost,
  updatePostSuccess,
  updatePostError,
  addLike,
  addLikeSuccess,
  addLikeError,
  removeLike,
  removeLikeSuccess,
  removeLikeError,
  resetDeletePost,
  resetSinglePost,
  resetCreatePost,
  resetUpdatePost,
} = postSlice.actions

export default postSlice.reducer
