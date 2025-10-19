import React from 'react';
import { Avatar, Box } from '@mui/material';

const WeatherAvatar = ({ condition }) => {
    // priority order - first match found renders that image
    const getWeatherImage = (condition) => {
        const conditionLower = condition.toLowerCase();

        if (conditionLower.includes('storm') || conditionLower.includes('lightning') || conditionLower.includes('thunder')) {
            return '/images/storm.jpg';
        }
        if (conditionLower.includes('snow') || conditionLower.includes('blizzard') || conditionLower.includes('ice')) {
            return '/images/snow.jpg';
        }
        if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower')) {
            return '/images/rain.jpg';
        }
        if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
            return '/images/fog.jpg';
        }
        if (conditionLower.includes('wind') || conditionLower.includes('gale')) {
            return '/images/wind.jpg';
        }
        if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
            return '/images/cloud.jpg';
        }
        if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
            return '/images/sunny.jpg';
        }
        // no match - no avatar, just description
        return null;
    };

    const imageSrc = getWeatherImage(condition);

    if (!imageSrc) {
        return null;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Avatar
                src={imageSrc}
                alt={`${condition} weather`}
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
        </Box>
    );
};

export default WeatherAvatar;