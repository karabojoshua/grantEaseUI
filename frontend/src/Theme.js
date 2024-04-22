import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#095f59", // Set the main color for the primary palette
      light: "rgb(249, 232, 171)"
    },
    secondary: {
      main: "#fdcf6e", // Set the main color for the secondary palette
      light: "rgb(249, 232, 171)"
    },
  },
  spacing: 12,
});

export default theme;