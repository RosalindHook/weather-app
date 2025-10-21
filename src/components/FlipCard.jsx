import React from 'react';
import { Card, Box } from '@mui/material';

const FlipCard = ({ children, onFlip }) => {
  return (
    <Card
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: 2,
        border: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '320px',
        height: '420px',
        padding: 2,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': { transform: 'translateY(-5px)' },
      }}
    >
      <Box
        sx={{ width: '100%', height: '100%' }}
        onClick={onFlip}
      >
        {children}
      </Box>
    </Card>
  );
};

export default FlipCard;