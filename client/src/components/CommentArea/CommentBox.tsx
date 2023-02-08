import { Box } from '@mui/material';
import { InputForm } from 'components/UI/InputForm';
import UserAvatar from 'components/UserAvatar';
import React from 'react';
import { Controller } from 'react-hook-form';

const CommentBox = ({
  userName,
  label,
  control,
  errors,
}: {
  userName: string;
  label: string;
  control: any;
  errors: any;
}) => {
  return (
    <>
      <Box sx={{ position: 'relative', paddingLeft: '60px' }}>
        <Box sx={{ position: 'absolute', left: '0', top: '0' }}>
          <UserAvatar userName={userName} />
        </Box>
        <Controller
          rules={{ required: true }}
          name="text"
          control={control}
          render={({ field }) => (
            <InputForm fullWidth label={label} {...field} />
          )}
        />
        <p>{errors.text?.message}</p>
      </Box>
    </>
  );
};

export default CommentBox;
