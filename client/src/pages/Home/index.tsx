import React from 'react';
import HomeBanner from '../../features/HomeBanner';
import PostListings from 'features/PostListings';

const Home = () => {
  return (
    <>
      <HomeBanner />
      <PostListings />
    </>
  );
};

export default Home;
