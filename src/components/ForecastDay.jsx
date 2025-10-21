import React from 'react';
import { Box, Typography } from '@mui/material';
import { getWeatherColour } from '../utils/weatherHelpers';

const ForecastDay = ({ dayData }) => {
    const formattedDate = new Date(dayData.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });

    return (
        <Box sx={{ mb: 1, textAlign: 'left' }}>
            <Typography variant="body2" fontWeight="bold" gutterBottom>
                {formattedDate}
            </Typography>

            <Box
                component="dl"
                sx={{
                    margin: 0,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    '& dt, & dd': {
                        margin: 0,
                        fontSize: '0.75rem'
                    },
                    '& dt': {
                        fontWeight: 'bold',
                        color: 'text.secondary'
                    }
                }}
            >
                <Box component="dt">Min:</Box>
                <Box component="dd">{Math.round(dayData.min)}°C</Box>
                <Box component="dt">Max:</Box>
                <Box component="dd">{Math.round(dayData.max)}°C</Box>
                <Box component="dt">Avg:</Box>
                <Box
                    component="dd"
                    sx={{ color: getWeatherColour(dayData.avg) }}
                >
                    {Math.round(dayData.avg)}°C
                </Box>
            </Box>
        </Box>
    );
};

export default ForecastDay;