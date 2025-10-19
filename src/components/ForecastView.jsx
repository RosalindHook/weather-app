import React from 'react';
import { CardContent, Typography, Box } from '@mui/material';
import { getDailySummaries } from '../utils/weatherHelpers';
import ForecastDay from './ForecastDay';
import CityHeader from './CityHeader';

const ForecastView = ({ forecastData, weatherData }) => {
    const daily = getDailySummaries(forecastData);

    return (
        <CardContent sx={{ textAlign: 'center', width: '100%' }}>
            <CityHeader
                weatherData={weatherData}
                subtitle="5-Day Forecast"
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {daily.map((dayData, index) => (
                    <ForecastDay key={index} dayData={dayData} />
                ))}
            </Box>
        </CardContent>
    );
};

export default ForecastView;