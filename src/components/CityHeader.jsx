import React from 'react';
import { Typography } from '@mui/material';
import { getUnicodeFlagIcon } from '../utils/weatherHelpers';

const CityHeader = ({ weatherData, subtitle = null }) => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                {weatherData.name} {getUnicodeFlagIcon(weatherData.sys.country)}
            </Typography>
            {subtitle && (
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {subtitle}
                </Typography> 
            )}
        </>
    );
};

export default CityHeader;