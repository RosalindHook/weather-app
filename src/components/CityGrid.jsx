import React from 'react';
import { Grid } from '@mui/material';
import WeatherCard from './cards/WeatherCard';
import WeatherErrorBoundary from './error-boundaries/WeatherErrorBoundary';

const CityGrid = ({ cities, onRemoveCity }) => {
    return (
        <Grid container spacing={3} justifyContent="center">
            {cities.map(cityData => (
                <WeatherErrorBoundary>
                <WeatherCard
                    key={cityData.id}
                    weatherData={cityData.current}
                    forecastData={cityData.forecast}
                    cityName={cityData.name}
                    onRemove={() => onRemoveCity(cityData.id)}
                />
                </WeatherErrorBoundary>
            ))}
        </Grid>
    );
};

export default CityGrid;