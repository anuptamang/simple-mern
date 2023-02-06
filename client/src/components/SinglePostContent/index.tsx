import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Box, Container, Typography } from '@mui/material';

import { useRef, useState } from 'react';
import { UserInfo } from 'types';
import { PostBlockProps } from 'types/post';

type SinglePostProps = {
  post: PostBlockProps;
  likes: any;
  setLikes: any;
  handleAddLikes: any;
  handleRemoveLikes: any;
  likeLoading: boolean;
  author: UserInfo;
};

const SinglePostContent = ({
  post,
  author,
  likes,
  setLikes,
  handleAddLikes,
  handleRemoveLikes,
  likeLoading,
}: SinglePostProps) => {
  const likesRef = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLikes = () => {
    if (count < 1) {
      setLikes((prev: number) => prev + 1);
      setCount(count + 1);
      likesRef.current !== null && setLiked(true);

      handleAddLikes();
    } else {
      setLikes((prev: number) => prev - 1);
      setCount(count - 1);
      likesRef.current !== null && setLiked(false);
      handleRemoveLikes();
    }
  };

  return (
    <Container sx={{ py: '50px' }}>
      <Box
        sx={{
          padding: '20px',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: '#fff',
            marginBottom: '20px',
          }}
        >
          {post?.title}
        </Typography>
        <Typography
          sx={{
            color: '#fff',
            marginBottom: '20px',
          }}
        >
          Author: {author?.fullName}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <Box
            onClick={handleLikes}
            ref={likesRef}
            sx={{
              cursor: 'pointer',
              '&.loading': { pointerEvents: 'none', visibility: 'hidden' },
            }}
            className={likeLoading ? 'loading' : ''}
          >
            {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          </Box>
          <Typography>{likes}</Typography>
        </Box>
        <Box>
          {post?.body && (
            <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SinglePostContent;
