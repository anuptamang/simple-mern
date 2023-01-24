import SinglePostContent from 'components/SinglePostContent';
import Loading from 'components/UI/Loading';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { getAllusers } from 'redux/auth/authAction';
import { authSelector } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addLikes, getPostById, removeLikes } from 'redux/post/postAction';
import { postSelector } from 'redux/post/postSlice';
import { UserInfo } from 'types';
import { LikesProps } from 'types/post';

const SinglePostSection = () => {
  const { id } = useParams() as any;
  const dispatch = useAppDispatch();
  const { singlePost, loading, likeLoading } = useAppSelector(postSelector);
  const { users } = useAppSelector(authSelector);

  const author = users?.find(
    (user: UserInfo) => user._id === singlePost?.userID
  );

  const [likes, setLikes] = useState<LikesProps>();

  const handleAddLikes = () => {
    dispatch(addLikes(singlePost?._id));
  };

  const handleRemoveLikes = () => {
    dispatch(removeLikes(singlePost?._id));
  };

  useEffect(() => {
    if (singlePost) setLikes(singlePost.likes);
  }, [singlePost]);

  useEffect(() => {
    dispatch(getPostById(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getAllusers());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>{singlePost?.title} | My App</title>
          </Helmet>

          <SinglePostContent
            post={singlePost}
            author={author}
            likes={likes}
            setLikes={setLikes}
            handleAddLikes={handleAddLikes}
            handleRemoveLikes={handleRemoveLikes}
            likeLoading={likeLoading}
          />
        </>
      )}
    </>
  );
};

export default SinglePostSection;
