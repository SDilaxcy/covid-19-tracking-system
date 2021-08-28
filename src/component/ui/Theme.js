import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    common: {
      UIBlue: '#0B72B9',
      UIOrnage: '#00e676',
    },
    primary: {
      main: '#0B72B9',
    },
    secondary: {
      main: '#00e676',
    },
  },
  typography: {
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
    },
    estimate: {
      fontFamily: 'pacifico',
      fontSize: '1rem',
      textTransform: 'none',
      color: 'white',
    },
    h2: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#0B72B9',
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: 'Pacifico',
      fontSize: '2.5rem',
      color: '#0B72B9',
    },
    h4: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '1.75rem',
      color: '#0B72B9',
    },
    h6: {
      fontWeight: 500,
      fontFamily: 'Raleway',
      color: '#0B72B9',
      lineHeight: 1,
    },
    subtitle1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#868686',
    },
    subtitle2: {
      color: 'white',
      fontSize: '1.9rem',
      fontWeight: 600,
    },
    learnButton: {
      borderColor: '#0B72B9',
      color: '#0B72B9',
      borderWidth: 2,
      textTransform: 2,
      borderRadius: 50,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1.25rem',
      color: '#455a64',
      fontWeight: 300,
    },
    caption: {
      fontSize: '1rem',
      fontWeight: 300,
      color: '#868686',
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: '#0B72B9',
        fontSize: '1rem',
      },
    },
    MuiInput: {
      root: {
        color: '#455a64',
        fontWeight: 300,
      },
      underline: {
        '&:before': {
          borderBottom: `2px solid #0B72B9`,
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid #0B72B9`,
        },
      },
    },
  },
});
