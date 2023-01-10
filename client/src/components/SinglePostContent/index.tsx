import { Container, Typography } from '@mui/material'
import React from 'react'

type DataProps = {
  data: {
    body: string;
  };
};

const SinglePostContent = ({ data }: DataProps) => {
  return (
    <Container sx={{ py: '50px' }}>
      <Typography>{data?.body}</Typography>
    </Container>
  )
}

export default SinglePostContent