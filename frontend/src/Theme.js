import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#095f59", // Set the main color for the primary palette
      light: "#fff"
    },
    secondary: {
      main: "#fdcf6e", // Set the main color for the secondary palette
    },
  },
  spacing: 12,
});

export default theme;