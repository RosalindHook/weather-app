import React from 'react';
import { CardContent, Typography, Box } from '@mui/material';
import { getDailySummaries } from '../utils/weatherHelpers';
// import ForecastDay from './ForecastDay'; // now unused (keep component for now)
import CityHeader from './CityHeader';
import TemperatureHeatmap from './TemperatureHeatmap';
import WeatherAvatar from './WeatherAvatar';

const ForecastView = ({ forecastData, weatherData }) => {
    const daily = getDailySummaries(forecastData);

    return (
        <CardContent sx={{ textAlign: 'center', width: '100%' }}>
            <CityHeader
                weatherData={weatherData}
                subtitle="5-Day Forecast"
            />

            {/* If we have forecast data then show temp heatmap and avatars */}
            {daily.length > 0 ? (
                <Box>
                {/* Section header */}
                <Typography
                    variant='subtitle2'
                    sx={{
                        mt: 2,
                        mb: 0.1,
                        color: 'text.secondary',
                        fontSize: '0.85rem'
                    }}
                >
                    Average Temperatures
                </Typography>
                {/* Temperature Heatmap */}
                <TemperatureHeatmap dailyData={daily.slice(0, 5)} />

                {/* Conditions section header*/}
                <Typography
                variant='subtitle2'
                sx={{
                    mt: 2,
                    mb: 0.1,
                    color: 'text.secondary',
                    fontSize: '0.85rem'
                }}
            >
                Daily Conditions
            </Typography>
            
                {/* Beaded Necklace of Weather Avatars */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 0.1,
                        position: 'relative',
                        height: '100px', // Taller for full-size avatars
                    }}
                >
                    {daily.slice(0, 5).map((day, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: 'relative',
                                marginLeft: index > 0 ? '-30px' : '0', // Overlap for full-size avatars
                                zIndex: 5 - index, // First avatar on top
                            }}
                        >
                            <WeatherAvatar condition={day.condition || 'clear sky'} />
                        </Box>
                    ))}
                </Box>
            </Box>
        ) : (
            <Typography variant="body2" color="text.secondary">
                No forecast data available
            </Typography>
        )}

    </CardContent>
);
};

export default ForecastView;