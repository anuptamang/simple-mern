import { Box, Container, Grid, Link, Typography } from '@mui/material';

const PostListingArea = ({ results }: any) => {
  return (
    <Container sx={{ py: '50px' }}>
      <Typography variant="h4" component="h2" sx={{ marginBottom: '20px' }}>
        Posts
      </Typography>
      <Grid container spacing={4}>
        {results?.posts?.data?.map((post: any) => (
          <Grid key={post?._id} item xs={12} sm={6} lg={4}>
            <Box>
              <Link
                href={`/posts/${post?._id}`}
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                  '&:hover': { opacity: 0.7 },
                }}
              >
                {post?.body}
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PostListingArea;
