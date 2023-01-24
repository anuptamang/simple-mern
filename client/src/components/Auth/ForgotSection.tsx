import { Container, Grid, Typography, Box } from '@mui/material';
import { BtnLoading } from '../UI/BtnLoading';
import Banner from '../UI/Banner';
import { Controller } from 'react-hook-form';
import { InputForm } from '../UI/InputForm';
import { Link } from 'react-router-dom';

type Iprops = {
  handleSubmit: (s: any) => any;
  loading: boolean;
  bannerUrl?: string;
  control: any;
  onSubmit: any;
  errors: any;
};

const ForgotSection = ({
  handleSubmit,
  onSubmit,
  control,
  errors,
  bannerUrl,
  loading,
}: Iprops) => {
  return (
    <>
      <Banner imageUrl={bannerUrl} hasChildren={true}>
        <Container sx={{ py: '120px' }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} lg={7}>
              <Box
                sx={{
                  background: '#191A1D',
                  p: { xs: '20px', lg: '50px', xl: '100px' },
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: '#fff',
                    textAlign: 'center',
                    marginBottom: {
                      xs: '20px',
                      lg: '50px',
                    },
                  }}
                >
                  Forgot Password
                </Typography>
                <Typography
                  sx={{
                    color: '#fff',
                    textAlign: 'center',
                    marginBottom: '20px',
                  }}
                >
                  Enter your email or username, and we'll send you a link to
                  reset your password.
                </Typography>
                <Box
                  onSubmit={handleSubmit(onSubmit)}
                  component="form"
                  noValidate
                  autoComplete="off"
                  sx={{ marginBottom: '20px' }}
                >
                  <Grid
                    container
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={4}
                  >
                    <Grid item xs={12}>
                      <Controller
                        rules={{ required: true }}
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <InputForm
                            fullWidth
                            label="Email/Username"
                            {...field}
                          />
                        )}
                      />
                      <p>{errors.email?.message}</p>
                    </Grid>
                    <Grid item xs={12}>
                      <BtnLoading
                        variant="contained"
                        loading={loading}
                        loadingPosition="center"
                        type="submit"
                      >
                        Send
                      </BtnLoading>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Banner>
    </>
  );
};

export default ForgotSection;
