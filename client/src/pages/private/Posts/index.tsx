import React from 'react';
import PostsSection from '../../../features/PostsSection';
import { Helmet } from 'react-helmet';

const Posts = () => {
  return (
    <>
      <Helmet>
        <title>Post Manage Area | My App</title>
      </Helmet>

      <PostsSection />
    </>
  );
};

export default Posts;
