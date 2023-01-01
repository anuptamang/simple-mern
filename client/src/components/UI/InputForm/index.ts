import { TextField, TextFieldProps, styled } from '@mui/material';

export const InputForm = styled(TextField)<TextFieldProps>(({ theme }) => ({
  background: 'none',
  border: 0,
  borderRadius: 0,

  '& .MuiInputBase-root': {
    padding: '0 !important',
  },
  '& .MuiInputBase-input': {
    borderRadius: 10,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: 0,
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    fontFamily: theme.typography.fontFamily,
    color: '#fff',
    height: '42px',

    [theme.breakpoints.up('lg')]: {
      padding: '10px 42px',
    },

    '&:focus': {
      //
    },
  },
  '& .MuiInputLabel-root': {
    color: '#fff !important',
    fontSize: 18,
    lineHeight: '28px',
    fontWeight: 300,

    [theme.breakpoints.up('lg')]: {
      left: '42px',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 0,
  },
}));
