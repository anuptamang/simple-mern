import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Box, Container, Typography } from '@mui/material';
import CommentArea from 'components/CommentArea';
import CommentsList from 'components/CommentArea/CommentsList';
import { useAuth } from 'hooks/useAuth';

import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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
  onSubmit: any;
  control: any;
  handleSubmit: any;
  errors: any;
  comments: [];
};

const SinglePostContent = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
  post,
  author,
  likes,
  setLikes,
  handleAddLikes,
  handleRemoveLikes,
  likeLoading,
  comments,
}: SinglePostProps) => {
  const likesRef = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const auth = useAuth();

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
        <Box sx={{ marginBottom: '20px' }}>
          <img
            style={{
              display: 'block',
              width: '100%',
              height: '400px',
              objectFit: 'cover',
            }}
            src={post?.thumbnail}
            alt={post?.title}
          />
        </Box>
        <Box
          sx={{
            marginBottom: '50px',
          }}
        >
          {post?.body && (
            <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
          )}
        </Box>
        <Box
          sx={{
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.5)',
            maxWidth: '600px',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: '#fff',
              marginBottom: { xs: '20px' },
            }}
          >
            Post a comment
          </Typography>
          {comments && comments.length < 1 && (
            <Typography sx={{ marginBottom: '20px' }}>
              There are no comments yet! Be the first one to comment.
            </Typography>
          )}
          {auth?.token ? (
            <CommentArea
              control={control}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
            />
          ) : (
            <Typography
              sx={{
                color: '#fff',
                marginBottom: { xs: '20px', lg: '50px' },
              }}
            >
              Your must login to comment. <Link to={'/login'}>Login</Link>
            </Typography>
          )}
          {comments && comments.length > 0 && (
            <CommentsList comments={comments} />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SinglePostContent;
