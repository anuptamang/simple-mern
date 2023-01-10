import PostListingArea from 'components/PostListingArea';
import Loading from 'components/UI/Loading';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllPosts } from 'redux/post/postAction';
import { postSelector } from 'redux/post/postSlice';

const PostListings = () => {
  const allPost = useAppSelector(postSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <>{allPost?.posts ? <PostListingArea results={allPost} /> : <Loading />}</>
  );
};

export default PostListings;
