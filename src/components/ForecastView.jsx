import React from 'react';
import { CardContent, Typography, Box } from '@mui/material';
import { getDailySummaries } from '../utils/weatherHelpers';
// import ForecastDay from './ForecastDay'; // now unused (keep component for now)
import CityHeader from './CityHeader';
import TemperatureHeatmap from './TemperatureHeatmap';

const ForecastView = ({ forecastData, weatherData }) => {
    const daily = getDailySummaries(forecastData);

    return (
        <CardContent sx={{ textAlign: 'center', width: '100%' }}>
            <CityHeader
                weatherData={weatherData}
                subtitle="5-Day Forecast"
            />

            {daily.length > 0 ? (
                <TemperatureHeatmap dailyData={daily.slice(0, 5)} />
            ) : (
                <Typography variant="body2" color="text.secondary">
                    No forecast data available
                </Typography>
            )}
        </CardContent>
    );
};

export default ForecastView;