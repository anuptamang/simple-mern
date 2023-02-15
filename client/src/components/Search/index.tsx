import { yupResolver } from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import { InputForm } from 'components/UI/InputForm';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { searchSchema } from 'utils/validationSchema';

export type TChat = {
  text: string;
};

const Search = ({ setSearchQuery }: any) => {
  const {
    watch,
    control
  } = useForm<TChat>({
    defaultValues: {
      text: '',
    },
    resolver: yupResolver(searchSchema),
  });

  useEffect(() => {
    const subscription = watch((value) => {
      setSearchQuery(value.text?.trim());
    });
    return () => subscription.unsubscribe();
  }, [setSearchQuery, watch]);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ position: 'relative', marginBottom: '20px' }}
    >
      <Controller
        rules={{ required: true }}
        name="text"
        control={control}
        render={({ field }) => (
          <InputForm
            sx={{
              '& .MuiInputBase-input': {
                paddingLeft: '70px',
              },
              '& .MuiInputLabel-formControl': {
                marginLeft: '30px',
              },
            }}
            fullWidth
            label={'Search friend...'}
            {...field}
          />
        )}
      />
      <SearchIcon
        sx={{ position: 'absolute', top: '18px', left: '10px', zIndex: 2 }}
      />
    </Box>
  );
};

export default Search;
