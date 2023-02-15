import axios from 'axios';
import { delay } from 'utils/delay';
import { API_URL, configHeaders, multiPartConfigHeaders } from '../../configs';
import { PostProps, addComment, addCommentError, addCommentSuccess, addLike, addLikeError, addLikeSuccess, createPost, createPostError, createPostSuccess, deletePost, deletePostError, deletePostSuccess, readPosts, readPostsError, readPostsSuccess, readSinglePost, readSinglePostError, readSinglePostSuccess, removeLike, removeLikeError, removeLikeSuccess, replyComment, replyCommentError, replyCommentSuccess, resetCreatePost, resetDeletePost, resetUpdatePost, updatePost, updatePostError, updatePostSuccess } from './postSlice';

type DispatchCreatePostProps = {
  payload: PostProps | undefined
  type: 'post/createPost' | 'post/createPostSuccess' | 'post/createPostError';
};

type DispatchResetCreatePostProps = {
  type: 'post/resetCreatePost';
};

type DispatchResetUpdatePostProps = {
  type: 'post/resetUpdatePost';
};


type DispatchResetDeletePostProps = {
  type: 'post/resetDeletePost';
};


type DispatchReadPostsProps = {
  type: 'post/readPosts' | 'post/readPostsSuccess' | 'post/readPostsError';
};

type DispatchUpdatePostProps = {
  type: 'post/updatePost' | 'post/updatePostSuccess' | 'post/updatePostError';
};

type DispatchAddLikeProps = {
  type: 'post/addLike' | 'post/addLikeSuccess' | 'post/addLikeError';
};

type DispatchRemoveLikeProps = {
  type: 'post/removeLike' | 'post/removeLikeSuccess' | 'post/removeLikeError';
};

type DispatchDeletePostProps = {
  type: 'post/deletePost' | 'post/deletePostSuccess' | 'post/deletePostError';
};

type DispatchReadSinglePostProps = {
  type: 'post/readSinglePost' | 'post/readSinglePostSuccess' | 'post/readSinglePostError';
};

interface PostCreatePayloadProps {
  body?: any,
  title?: string,
  thumbnail?: string,
  categories?: string[],
  tag?: string[],
}

interface PatchPostPayloadProps {
  body?: any,
  title?: string,
  thumbnail?: any,
  categories?: string[],
  tag?: string[],
}

interface AddCommentPayloadProps {
  text: string,
  userId: string
}

interface ReplyCommentPayloadProps {
  text: string
}

type DispatchAddCommentPostProps = {
  payload: PostProps | undefined
  type: 'post/addComment' | 'post/addCommentSuccess' | 'post/addCommentError';
};

type DispatchReplyCommentPostProps = {
  payload: PostProps | undefined
  type: 'post/replyComment' | 'post/replyCommentSuccess' | 'post/replyCommentError';
};

export const postCreate = (payload: PostCreatePayloadProps, token: string) =>
  async (dispatch: (arg0: DispatchCreatePostProps) => any) => {
    dispatch(createPost());

    try {
      const response = await axios.post(`${API_URL}/posts`, payload, multiPartConfigHeaders(token))
      dispatch(createPostSuccess(response.data));
    } catch (err: any) {
      dispatch(createPostError(err));
    }
  };

export const resetPostCreate = () => async (dispatch: (arg0: DispatchResetCreatePostProps) => any) => {
  dispatch(resetCreatePost());
}

export const resetPostUpdate = () => async (dispatch: (arg0: DispatchResetUpdatePostProps) => any) => {
  dispatch(resetUpdatePost());
}

export const resetPostDelete = () => async (dispatch: (arg0: DispatchResetDeletePostProps) => any) => {
  dispatch(resetDeletePost());
}


export const getAllPosts = () => async (dispatch: (arg0: DispatchReadPostsProps) => any) => {
  dispatch(readPosts());

  try {
    const response = await axios.get(`${API_URL}/posts`)
    dispatch(readPostsSuccess(response.data));
  } catch (err: any) {
    dispatch(readPostsError(err));
  }
};

export const postUpdate = (payload: PatchPostPayloadProps, postId: string, token: string) =>
  async (dispatch: (arg0: DispatchUpdatePostProps) => any) => {
    dispatch(updatePost());

    try {
      const response = await axios.patch(`${API_URL}/posts/${postId}`, payload, configHeaders(token))
      dispatch(updatePostSuccess(response.data));
    } catch (err: any) {
      dispatch(updatePostError(err));
    }
  };

export const addLikes = (postId: string) =>
  async (dispatch: (arg0: DispatchAddLikeProps) => any) => {
    dispatch(addLike())

    try {
      const response = await axios.put(`${API_URL}/posts/${postId}/like`)
      dispatch(addLikeSuccess(response.data));
    } catch (err: any) {
      dispatch(addLikeError(err));
    }
  };
export const removeLikes = (postId: string) =>
  async (dispatch: (arg0: DispatchRemoveLikeProps) => any) => {
    dispatch(removeLike())

    try {
      const response = await axios.delete(`${API_URL}/posts/${postId}/like`)
      dispatch(removeLikeSuccess(response.data));
    } catch (err: any) {
      dispatch(removeLikeError(err));
    }
  };

export const postDelete = (postId: string, token: string) =>
  async (dispatch: (arg0: DispatchDeletePostProps) => any) => {
    dispatch(deletePost());

    try {
      const response = await axios.delete(`${API_URL}/posts/${postId}`, configHeaders(token))
      dispatch(deletePostSuccess(response.data));
    } catch (err: any) {
      dispatch(deletePostError(err));
    }
  };

export const getPostById = (postId: string) => async (dispatch: (arg0: DispatchReadSinglePostProps) => any) => {
  dispatch(readSinglePost());

  try {
    const response = await axios.get(`${API_URL}/posts/${postId}`)
    dispatch(readSinglePostSuccess(response.data));
  } catch (err: any) {
    dispatch(readSinglePostError(err));
  }
};

export const commentOnPost = (payload: AddCommentPayloadProps, postId: string, token: string) =>
  async (dispatch: (arg0: DispatchAddCommentPostProps) => any) => {
    dispatch(addComment())

    try {
      const response = await axios.post(`${API_URL}/posts/${postId}/comments`, payload, configHeaders(token))
      await delay(3000)
      dispatch(addCommentSuccess(response.data));
    } catch (err: any) {
      dispatch(addCommentError(err));
    }
  };

export const replyOnComment = (payload: ReplyCommentPayloadProps, postId: string, commentId: string, token: string) =>
  async (dispatch: (arg0: DispatchReplyCommentPostProps) => any) => {
    dispatch(replyComment())

    try {
      const response = await axios.patch(`${API_URL}/posts/${postId}/comments/${commentId}/reply`, payload, configHeaders(token))
      await delay(3000)
      dispatch(replyCommentSuccess(response.data));
    } catch (err: any) {
      dispatch(replyCommentError(err));
    }
  };