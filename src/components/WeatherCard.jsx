import React, { useState } from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { getUnicodeFlagIcon, getWeatherColour, getDailySummaries } from '../utils/weatherHelpers';

const WeatherCard = ({ weatherData = null, forecastData = null, cityName = '' }) => {
    const [flipped, setFlipped] = useState(false); // always called
    if (!weatherData) return null;
    const daily = getDailySummaries(forecastData);

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
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                }}
                onClick={() => setFlipped((f) => !f)}
            >
                {!flipped ? (
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            {cityName || weatherData.name}, {getUnicodeFlagIcon(weatherData.sys.country)}
                        </Typography>
                        <Typography variant="body1" sx={{ color: getWeatherColour(weatherData.main.temp) }}>
                            Temperature: {Math.round(weatherData.main.temp)}°C
                        </Typography>
                        <Typography variant="body1" sx={{ color: getWeatherColour(weatherData.main.feels_like) }}>
                            Feels like: {Math.round(weatherData.main.feels_like)}°C
                        </Typography>
                        <Typography variant="body1">
                            {weatherData.weather[0].description}
                        </Typography>
                        <Typography variant="body1">
                            Humidity: {weatherData.main.humidity}%
                        </Typography>
                    </CardContent>
                ) : (
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Forecast
                        </Typography>
                        {daily.map((d, i) => (
                            <Box key={i} sx={{ mb: 1 }}>
                                <Typography variant="body2">
                                    {d.date}
                                </Typography>
                                <Typography variant="body2">
                                    Min: {Math.round(d.min)}°C / Max: {Math.round(d.max)}°C
                                </Typography>
                                <Typography variant="body2" sx={{ color: getWeatherColour(d.avg) }}>
                                    Avg: {Math.round(d.avg)}°C
                                </Typography>
                                <Typography variant="body2" sx={{ color: getWeatherColour(d.feels_avg) }}>
                                    Feels avg: {Math.round(d.feels_avg)}°C
                                </Typography>
                            </Box>
                        ))}
                    </CardContent>
                )}
            </Card>
        </Grid>
    );
};

export default WeatherCard;
