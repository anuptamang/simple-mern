import { Box, Container, Typography } from '@mui/material';

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <Container sx={{ padding: '50px 30px' }}>
      <Box
        sx={{
          padding: '20px',
          background: '#FDF7D5',
          borderLeft: '10px solid #ffe564',
        }}
      >
        <Typography
          sx={{ color: '#333', marginBottom: '15px', fontWeight: 'bold' }}
        >
          Something went wrong:
        </Typography>
        <Typography sx={{ color: '#333' }}>{error.message}</Typography>
      </Box>
    </Container>
  );
};

export default ErrorFallback;
