import React from 'react';
import HomeBanner from '../../../features/HomeBanner';
import PostListings from 'features/PostListings';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | My App</title>
      </Helmet>
      <HomeBanner />
      <PostListings />
    </>
  );
};

export default Home;
