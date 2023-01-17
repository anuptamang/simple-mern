import { Box, Grid, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { BtnLoading } from '../../../UI/BtnLoading';
import { InputForm } from '../../../UI/InputForm';

const InputStyles = {
  width: '100%',
  '& .MuiInputBase-input': {
    backgroundColor: '#BDB2FF',
    border: 0,
    color: '#262835',
  },
  '& .MuiInputLabel-root': {
    color: '#262835 !important',
  },
  '& .MuiInputAdornment-root': {
    position: 'absolute',
    right: '20px',
    top: '30px',
    zIndex: 10,
  },
};

const EditBox = ({
  control,
  handleSubmit,
  onSubmit,
  loading,
  errors,
  formTitle,
}: any) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={9}>
        <Box
          sx={{
            p: { xs: '20px', lg: '50px', xl: '100px' },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#fff',
              textAlign: 'center',
              marginBottom: { xs: '20px', lg: '50px' },
            }}
          >
            {formTitle}
          </Typography>
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container direction={{ xs: 'column', md: 'row' }} spacing={4}>
              <Grid item xs={12} md={6}>
                <Controller
                  rules={{ required: true }}
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      sx={InputStyles}
                      fullWidth
                      label="Full Name"
                      {...field}
                    />
                  )}
                />
                <p>{errors.fullName?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <BtnLoading
                  variant="contained"
                  loading={loading}
                  loadingPosition="center"
                  type="submit"
                >
                  Update
                </BtnLoading>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditBox;
