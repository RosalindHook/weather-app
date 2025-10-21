import React from 'react';
import { Box, Typography } from '@mui/material';

const StatusMessages = ({ error, maxLimitReached, citiesCount }) => {
    return (
        <>
            {/* Error message */}
            {error && (
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                    <Typography color="error">{error}</Typography>
                </Box>
            )}

            {/* Conditional helper messages */}
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', minHeight: '24px' }}>
                {maxLimitReached ? (
                    <Typography variant="body2" color="warning.main">
                        Maximum 3 cities reached. Remove a city to add another.
                    </Typography>
            ) : citiesCount > 0 && citiesCount < 3 ? (
                    <Typography variant="body2" color="text.secondary">
                        Would you like to add another city? (up to 3 total)
                    </Typography>
            ) : null}
        </Box>
    </>
    );
};

export default StatusMessages;