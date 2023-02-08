import { Box, Grid } from '@mui/material';
import { BtnLoading } from 'components/UI/BtnLoading';
import { useAuth } from 'hooks/useAuth';
import { useAppSelector } from 'redux/hooks';
import { postSelector } from 'redux/post/postSlice';
import CommentBox from './CommentBox';

const CommentArea = ({ control, handleSubmit, onSubmit, errors }: any) => {
  const { addCommentLoading } = useAppSelector(postSelector);
  const auth = useAuth();
  const userName = auth?.result?.fullName ? auth.result.fullName : 'User Name';

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      noValidate
      autoComplete="off"
      sx={{ marginBottom: '20px' }}
    >
      <Grid container direction={{ xs: 'column', md: 'row' }} spacing={1}>
        <Grid item xs={12}>
          <CommentBox
            label="Write a comment..."
            control={control}
            userName={userName}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'right' }}>
          <BtnLoading
            variant="contained"
            loading={addCommentLoading}
            loadingPosition="center"
            type="submit"
          >
            Comment
          </BtnLoading>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommentArea;
