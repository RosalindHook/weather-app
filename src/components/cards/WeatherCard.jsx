import React, { useState } from 'react';
import { Grid } from '@mui/material';
import FlipCard from './FlipCard';
import RemoveButton from '../RemoveButton';
import FlipButton from '../FlipButton';
import CurrentWeatherView from './CurrentWeatherView';
import ForecastView from './ForecastView';

const WeatherCard = ({ weatherData = null, forecastData = null, onRemove }) => {
    // uncomment following to test error boundaries, then enter city 'London' in UI - error is contained and page does not crash
    // if (weatherData.name === 'London') {
    //     throw new Error('Test error for London');
    // }
    const [flipped, setFlipped] = useState(false); // Each card has independent flip state

    if (!weatherData) return null;

    const handleFlip = () => setFlipped(prev => !prev);

    return (
        <Grid item xs={12} sm={6} md={4}>
            <FlipCard onFlip={handleFlip} weatherData={weatherData}>
                <FlipButton />
                {onRemove && <RemoveButton onRemove={onRemove} />}

                {!flipped ? (
                    <CurrentWeatherView weatherData={weatherData} />
                ) : (
                    <ForecastView forecastData={forecastData}
                        weatherData={weatherData} />
                )}
            </FlipCard>
        </Grid>
    );
};
export default WeatherCard;