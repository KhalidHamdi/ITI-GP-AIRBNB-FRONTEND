import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    text: {
      primary: '#000', 
      secondary: '#555', 
    },
    background: {
      default: '#ffffff', 
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    text: {
      primary: '#fff', 
      secondary: '#ccc', 
    },
    background: {
      default: '#121212', 
    },
  },
});
