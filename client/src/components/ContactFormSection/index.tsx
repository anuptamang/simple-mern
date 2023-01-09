import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { delay } from '../../utils/delay';
import { notify } from '../../utils/notification';
import { contactFormSchema } from '../../utils/validationSchema';
import { BtnLoading } from '../UI/BtnLoading';
import { InputForm } from '../UI/InputForm';

type IFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

const ContactFormSection = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      phone: '',
    },
    resolver: yupResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    await delay(3000);
    reset();
    setLoading(false);
    notify('Form submitted successfully', 'contact-form', 'success');
  };
  return (
    <Container sx={{ py: '120px' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={9}>
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
                marginBottom: { xs: '20px', lg: '50px' },
              }}
            >
              Contact Form
            </Typography>
            <Box
              onSubmit={handleSubmit(onSubmit)}
              component="form"
              noValidate
              autoComplete="off"
            >
              <Grid
                container
                direction={{ xs: 'column', md: 'row' }}
                spacing={4}
              >
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
                  <Controller
                    rules={{ required: true }}
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <InputForm fullWidth label="First Name" {...field} />
                    )}
                  />
                  <p>{errors.lastName?.message}</p>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    rules={{ required: true }}
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <InputForm
                        type="email"
                        fullWidth
                        label="Email"
                        {...field}
                      />
                    )}
                  />
                  <p>{errors.email?.message}</p>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    rules={{ required: true }}
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <InputForm
                        type="phone"
                        fullWidth
                        label="Phone"
                        {...field}
                      />
                    )}
                  />
                  <p>{errors.phone?.message}</p>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    rules={{ required: true }}
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <InputForm
                        multiline
                        rows={6}
                        fullWidth
                        label="Message"
                        {...field}
                      />
                    )}
                  />
                  <p>{errors.message?.message}</p>
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
  );
};

export default ContactFormSection;
