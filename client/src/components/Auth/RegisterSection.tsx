import { Box, Container, Grid, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import Banner from '../UI/Banner';
import { BtnLoading } from '../UI/BtnLoading';
import { InputForm } from '../UI/InputForm';

type Iprops = {
  handleSubmit: (s: any) => any;
  loading: boolean;
  bannerUrl?: string;
  control: any;
  onSubmit: any;
  errors: any;
};

const RegisterSection = ({
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
                  Register
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
                    <Grid item xs={12} lg={6}>
                      <Controller
                        rules={{ required: true }}
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <InputForm fullWidth label="First Name" {...field} />
                        )}
                      />
                      <p>{errors.firstName?.message}</p>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Controller
                        rules={{ required: true }}
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <InputForm fullWidth label="Last Name" {...field} />
                        )}
                      />
                      <p>{errors.lastName?.message}</p>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Controller
                        rules={{ required: true }}
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <InputForm fullWidth label="Email" {...field} />
                        )}
                      />
                      <p>{errors.email?.message}</p>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Controller
                        rules={{ required: true }}
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <InputForm fullWidth label="Phone" {...field} />
                        )}
                      />
                      <p>{errors.phone?.message}</p>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Controller
                        rules={{ required: true }}
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <InputForm
                            type="password"
                            fullWidth
                            label="Password"
                            {...field}
                          />
                        )}
                      />
                      <p>{errors.password?.message}</p>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Controller
                        rules={{ required: true }}
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                          <InputForm
                            type="password"
                            fullWidth
                            label="Confirm Password"
                            {...field}
                          />
                        )}
                      />
                      <p>{errors.confirmPassword?.message}</p>
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

export default RegisterSection;
