import React, { useState } from 'react';
import { Grid } from '@mui/material';
import FlipCard from './FlipCard';
import RemoveButton from './RemoveButton';
import FlipButton from './FlipButton';
import CurrentWeatherView from './CurrentWeatherView';
import ForecastView from './ForecastView';

const WeatherCard = ({ weatherData = null, forecastData = null, onRemove }) => {
    const [flipped, setFlipped] = useState(false); // Each card has independent flip state

    if (!weatherData) return null;

    const handleFlip = () => setFlipped(prev => !prev);

    return (
        <Grid item xs={12} sm={6} md={4}>
            <FlipCard>
                <FlipButton onFlip={handleFlip} />
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