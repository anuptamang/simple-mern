import SinglePostContent from 'components/SinglePostContent';
import Loading from 'components/UI/Loading';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getPostById } from 'redux/post/postAction';
import { postSelector } from 'redux/post/postSlice';

const SinglePostSection = () => {
  const { id } = useParams() as any;
  const dispatch = useAppDispatch();
  const { singlePost, loading } = useAppSelector(postSelector);

  useEffect(() => {
    dispatch(getPostById(id));
  }, [id, dispatch]);

  return <>{loading ? <Loading /> : <SinglePostContent data={singlePost} />}</>;
};

export default SinglePostSection;
