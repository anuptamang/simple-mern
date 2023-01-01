import { Box, Grid, MenuItem, Select, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import { BtnLoading } from '../BtnLoading';
import { InputForm } from '../InputForm';

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

const CreateForm = ({
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
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      sx={InputStyles}
                      fullWidth
                      label="Title"
                      {...field}
                    />
                  )}
                />
                <p>{errors.title?.message}</p>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  rules={{ required: true }}
                  name="author"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      sx={InputStyles}
                      fullWidth
                      label="Author"
                      {...field}
                    />
                  )}
                />
                <p>{errors.author?.message}</p>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  rules={{ required: true }}
                  name="status"
                  control={control}
                  render={({ field }: any) => (
                    <Select {...field} label="Status" sx={InputStyles}>
                      <MenuItem value={'Status'}>Status</MenuItem>
                      <MenuItem value={'publish'}>Publish</MenuItem>
                      <MenuItem value={'future'}>Future</MenuItem>
                      <MenuItem value={'draft'}>Draft</MenuItem>
                    </Select>
                  )}
                />
                <p>{errors.status?.message}</p>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        label="Date"
                        value={value}
                        onChange={onChange}
                        renderInput={(params: any) => (
                          <InputForm sx={InputStyles} fullWidth {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  rules={{ required: true }}
                  name="body"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      sx={InputStyles}
                      multiline
                      rows={6}
                      fullWidth
                      label="Body"
                      {...field}
                    />
                  )}
                />
                <p>{errors.body?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <BtnLoading
                  variant="contained"
                  loading={loading}
                  loadingPosition="center"
                  type="submit"
                >
                  Submit
                </BtnLoading>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CreateForm;
