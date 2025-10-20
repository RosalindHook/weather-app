import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import WeatherScene from './scenes/WeatherScene';
import './App.css';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    background: { default: '#f5f5f5' }, // global app bg
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh', 
          width: '100%', 
          bgcolor: 'background.default', 
          overflowX: 'hidden' 
        }}
      >
        <WeatherScene />
      </Box>
    </ThemeProvider>
  );
}

export default App;