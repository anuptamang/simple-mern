import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Box, Button, Link, Typography } from '@mui/material';
import { PostBlockProps } from 'types/post';

const PostBlock = (post: { data: PostBlockProps }) => {
  return (
    <Box
      sx={{
        background: '#3d3e42',
        borderRadius: '20px',
      }}
    >
      <Box
        sx={{
          padding: '20px',
        }}
      >
        <img
          style={{ width: '100%', height: 'auto', display: 'block' }}
          src={
            post?.data?.thumbnail
              ? post.data.thumbnail
              : 'https://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder-800x423.gif'
          }
          alt={post?.data?.title}
        />
        <Typography
          variant="h5"
          sx={{
            color: '#fff',
            marginBottom: '20px',
          }}
        >
          <Link
            href={`/posts/${post?.data._id}`}
            sx={{
              color: '#fff',
              textDecoration: 'none',
              '&:hover': { opacity: 0.7 },
            }}
          >
            {post?.data.title}
          </Link>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            href={`/posts/${post?.data._id}`}
            sx={{
              color: '#fff',
              background: '#5458F7',
              borderRadius: '40px',
              textTransform: 'capitalize',
            }}
          >
            Read more
          </Button>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <ThumbUpIcon />
            &nbsp; {post?.data.likes}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostBlock;
