import { Container, Grid, Typography } from '@mui/material';
import PostBlock from 'components/PostBlock';
import { PostBlockProps } from 'types/post';

const PostListingArea = ({ results }: any) => {
  return (
    <Container sx={{ py: '50px' }}>
      <Typography variant="h4" component="h2" sx={{ marginBottom: '20px' }}>
        Post Area
      </Typography>
      {results?.posts?.data?.length > 0 ? (
        <>
          <Grid container spacing={4}>
            {results?.posts?.data?.map((post: PostBlockProps) => (
              <Grid key={post?._id} item xs={12} sm={6} lg={4}>
                <PostBlock data={post} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography>There are no posts yet!</Typography>
      )}
    </Container>
  );
};

export default PostListingArea;
