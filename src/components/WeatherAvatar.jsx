import React from 'react';
import { Avatar, Box, Tooltip } from '@mui/material';

const WeatherAvatar = ({ condition }) => {
    const weatherMap = [
        // order = priority, first match renders that image
        { keywords: ['storm', 'lightning', 'thunder'], src: '/images/storm.jpg', alt: 'Stormy' },
        { keywords: ['snow', 'blizzard', 'ice'], src: '/images/snow.jpg', alt: 'Snowy' },
        { keywords: ['rain', 'drizzle', 'wet'], src: '/images/rain.jpg', alt: 'Rainy' },
        { keywords: ['fog', 'mist'], src: '/images/fog.jpg', alt: 'Foggy' },
        { keywords: ['wind', 'gale'], src: '/images/wind.jpg', alt: 'Windy' },
        { keywords: ['cloud', 'overcast'], src: '/images/cloud.jpg', alt: 'Cloudy' },
        { keywords: ['clear', 'sun'], src: '/images/sunny.jpg', alt: 'Sunny' },
    ];   
    
    const getWeatherData = (condition) => {
        const conditionLower = condition.toLowerCase();
        
        // return first match
        return weatherMap.find(weather =>
            weather.keywords.some(keyword => conditionLower.includes(keyword))
        );
    };
    
    const weatherData = getWeatherData(condition);

    if (!weatherData) {
        return null;        // no match - no avatar, just description
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Tooltip title={weatherData.alt} arrow>
            <Avatar
                src={weatherData.src}
                alt={weatherData.alt}
                sx={{
                    width: 80,
                    height: 80,
                    border: '4px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.2s ease-in-out'
                    }
                }}
            />
            </Tooltip>
        </Box>
    );
};

export default WeatherAvatar;