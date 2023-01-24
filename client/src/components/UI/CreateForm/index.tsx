import { Box, Grid, Typography } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import { Controller } from 'react-hook-form';
import { BtnLoading } from '../BtnLoading';
import FileUpload from '../FileUpload';
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
  setPostBody,
  postBody,
  setThumbnail,
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
              <Grid item xs={12}>
                <Controller
                  rules={{ required: true }}
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      sx={InputStyles}
                      multiline
                      rows={2}
                      fullWidth
                      label="Title"
                      {...field}
                    />
                  )}
                />
                {errors.title?.message && <p>{errors.title?.message}</p>}
              </Grid>
              <Grid item xs={12}>
                <Editor
                  editorState={postBody}
                  onEditorStateChange={setPostBody}
                  placeholder="Body"
                  editorStyle={{
                    background: '#BDB2FF',
                    color: '#333',
                    padding: '0 42px',
                    borderRadius: '4px',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  rules={{ required: true }}
                  name="tag"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      sx={InputStyles}
                      multiline
                      rows={2}
                      fullWidth
                      label="Tag"
                      {...field}
                    />
                  )}
                />
                {errors.tag?.message && <p>{errors.tag?.message}</p>}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  rules={{ required: true }}
                  name="categories"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      sx={InputStyles}
                      multiline
                      rows={2}
                      fullWidth
                      label="Categories"
                      {...field}
                    />
                  )}
                />
                {errors.categories?.message && (
                  <p>{errors.categories?.message}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  rules={{ required: true }}
                  name="thumbnail"
                  control={control}
                  render={({ field }) => (
                    <FileUpload setThumbnail={setThumbnail} />
                  )}
                />

                {/* {errors.thumbnail?.message && (
                  <p>{errors.thumbnail?.message}</p>
                )} */}
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
