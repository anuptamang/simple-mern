import { Container, Grid, Typography, Box } from '@mui/material';
import { BtnLoading } from '../UI/BtnLoading';
import Banner from '../UI/Banner';
import { Controller } from 'react-hook-form';
import { InputForm } from '../UI/InputForm';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

type Iprops = {
  handleSubmit: (s: any) => any;
  loading: boolean;
  bannerUrl?: string;
  control: any;
  onSubmit: any;
  errors: any;
};

const LoginSection = ({
  handleSubmit,
  onSubmit,
  control,
  errors,
  bannerUrl,
  loading,
}: Iprops) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => setShowPassword(!showPassword);

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
                  Login
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
                          <InputForm fullWidth label="Email" {...field} />
                        )}
                      />
                      <p>{errors.email?.message}</p>
                    </Grid>
                    <Grid item xs={12} sx={{ position: 'relative' }}>
                      <Controller
                        rules={{ required: true }}
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <>
                            <InputForm
                              type={showPassword ? 'text' : 'password'}
                              fullWidth
                              label="Password"
                              {...field}
                            />
                            <Box
                              sx={{
                                cursor: 'pointer',
                                position: 'absolute',
                                right: '20px',
                                top: '50px',
                              }}
                              onClick={handlePassword}
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </Box>
                          </>
                        )}
                      />
                      <p>{errors.password?.message}</p>
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
                <Typography>
                  Forgot your password?
                  <Link to="/forgot-password">Click Here</Link>
                </Typography>
                <Typography>
                  Don't have an account?{' '}
                  <Link to="/register">Register Now</Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Banner>
    </>
  );
};

export default LoginSection;
