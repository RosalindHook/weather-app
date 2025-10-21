import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('App Error Boundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              textAlign: 'center',
              gap: 3
            }}

          >

            <ErrorOutline sx={{ fontSize: 80, color: 'error.main' }} />
            <Typography variant="h4" component="h1" gutterBottom>

              Oops! Something went wrong

            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              The weather app encountered an unexpected error.

              Please try refreshing the page.
            </Typography>
            
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={this.handleReload}
              size="large"
            >
              Refresh Page
            </Button>
          </Box>
        </Container>
      );
    }
    return this.props.children;
  }
}
export default AppErrorBoundary;