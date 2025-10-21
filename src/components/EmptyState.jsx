import React from 'react';
import { Box, Typography } from '@mui/material';

const EmptyState = ({ message = "Search for a city to get started! 🌤️" }) => {
    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
                {message}
            </Typography>
        </Box>
    );
};

export default EmptyState