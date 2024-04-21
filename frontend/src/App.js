import './App.css';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
    
  );
}

export default App;
