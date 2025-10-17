import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

// Guard clause to prevent rendering without weather data
const WeatherCard = ({ weatherData = false }) => {
    if (!weatherData) return null;

    const getUnicodeFlagIcon = (countryCode) => {
        return countryCode
            .toUpperCase()
            .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
    };

    // change colour based on temperature
    const getWeatherColour = (temp) => {
        if (temp < 0) return '#74b9ff';
        if (temp < 15) return '#00b894';
        if (temp < 25) return '#e84393';
        return '#e17055';
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
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
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                    },
                }}
            >
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        {weatherData.name}, {getUnicodeFlagIcon(weatherData.sys.country)}
                    </Typography>
                    <Typography variant="body1" sx={{ color: getWeatherColour(weatherData.main.temp) }}>
                        Temperature: {Math.round(weatherData.main.temp)}°C
                    </Typography>
                    <Typography variant="body2" sx={{ color: getWeatherColour(weatherData.main.feels_like) }}>
                        Feels like: {Math.round(weatherData.main.feels_like)}°C
                    </Typography>
                    <Typography variant="body2">
                        Description: {weatherData.weather[0].description}
                    </Typography>
                    <Typography variant="body2">
                        Humidity: {weatherData.main.humidity}%
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default WeatherCard;
