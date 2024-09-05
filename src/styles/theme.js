import { createTheme } from '@mui/material/styles';
import color from "./variables"
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: color.background, 
      light: 'rgba(255, 255, 255, 0.51)'
    },
    secondary: {
      main: color.currentLine, 
    },
    background: {
      default: color.background,
      paper: color.foreground,
    },
    text: {
      primary: color.foreground,
      secondary: color.background,
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
    color: color.foreground
  },
});

export default darkTheme;
