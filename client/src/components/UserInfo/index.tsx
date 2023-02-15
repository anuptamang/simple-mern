import React from 'react';
import { useAuth } from 'hooks/useAuth';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';

type Props = {};

const UserInfo = (props: Props) => {
  const auth = useAuth();

  if (!auth?.result) {
    return null;
  }

  return (
    <Box>
      <Avatar alt={auth.result.fullName} src="/static/images/avatar/1.jpg" />
      <Box>Name: {auth.result.fullName}</Box>
      <Box>Email: {auth.result.email}</Box>
    </Box>
  );
};

export default UserInfo;
