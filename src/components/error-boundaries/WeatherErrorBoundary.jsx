import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { Warning, Refresh } from '@mui/icons-material';

class WeatherErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Weather Error Boundary caught an error:', error, errorInfo);
  }
  handleRetry = () => {
    this.setState({ hasError: false, error: null });

    // Trigger a re-render of children
  };

  render() {
    if (this.state.hasError) {
      return (
        <Alert
          severity="error"
          sx={{
            my: 2,
            '& .MuiAlert-message': { width: '100%' }
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

              <Warning />
              <Typography variant="h6">

                Weather Component Error

              </Typography>
            </Box>

            <Typography variant="body2">

              There was a problem displaying the weather data.

              This might be due to a visualisation error or data processing issue.
            </Typography>

            <Button
              variant="outlined"
              size="small"
              startIcon={<Refresh />}
              onClick={this.handleRetry}
              sx={{ alignSelf: 'flex-start' }}
            >
              Try Again
            </Button>
          </Box>
        </Alert>
      );
    }
    return this.props.children;
  }
}

export default WeatherErrorBoundary;