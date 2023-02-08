import { Box, Typography } from '@mui/material';
import UserAvatar from 'components/UserAvatar';
import React from 'react';
import { Comments } from 'types/post';
import SingleComment from './SingleComment';

type CommentsListProps = {
  comments: Comments[];
};

const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <>
      {comments.map((comment) => (
        <SingleComment comment={comment} />
      ))}
    </>
  );
};

export default CommentsList;
