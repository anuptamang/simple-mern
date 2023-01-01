import { createTheme } from '@mui/material';
import { green, grey, orange, red } from '@mui/material/colors';

let theme = createTheme();

// A custom theme for this app
theme = createTheme(theme, {
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#131313',
    },
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      main: '#131313',
      light: '#222',
      dark: '#111',
      contrastText: ' rgba(0,0,0,0.5)',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red[400],
    },
    warning: {
      main: orange[300],
    },
    success: {
      main: green[400],
    },
    info: {
      main: grey[400],
    },
    text: {
      primary: '#fff',
      secondary: '#444',
      disabled: '#666',
    },
    action: {
      active: '#000',
      hover: '#444',
      hoverOpacity: 0.08,
    },
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 14,
    fontWeightLight: 300,
    fontFamily: [
      'Mulish',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

    [theme.breakpoints.up('lg')]: {
      fontSize: [18, '!important'],
      lineHeight: 1.55,
    },

    h1: {
      fontSize: 32,
      lineHeight: 1.3,
      fontWeight: 300,

      [theme.breakpoints.up('lg')]: {
        fontSize: 120,
        lineHeight: '151px',
      },
    },
    button: {
      fontSize: 16,
      fontWeight: 300,
    },
  },
  components: {
    //components overrides
    MuiContainer: {
      styleOverrides: {
        maxWidthSm: {
          '&.MuiContainer-maxWidthSm': {
            maxWidth: 1450,
          },
        },
        maxWidthMd: {
          '&.MuiContainer-maxWidthMd': {
            maxWidth: 1450,
          },
        },
        maxWidthLg: {
          '&.MuiContainer-maxWidthLg': {
            maxWidth: 1450,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: '#333',
        },
      },
    },
    MuiDatePicker: {
      styleOverrides: {
        root: {
          color: '#333',
        },
        MuiPickersDay: {
          day: {
            color: 'black',
          },
          daySelected: {
            backgroundColor: '#33abb6',
          },
          dayDisabled: {
            color: '#ccc',
          },
          current: {
            color: 'red',
          },
        },
      },
    },
  },
});

export { theme };
