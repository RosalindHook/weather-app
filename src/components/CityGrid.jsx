import React from 'react';
import { Grid } from '@mui/material';
import WeatherCard from './cards/WeatherCard';

const CityGrid = ({ cities, onRemoveCity }) => {
    return (
        <Grid container spacing={3} justifyContent="center">
            {cities.map(cityData => (
                <WeatherCard
                    key={cityData.id}
                    weatherData={cityData.current}
                    forecastData={cityData.forecast}
                    cityName={cityData.name}
                    onRemove={() => onRemoveCity(cityData.id)}
                />
            ))}
        </Grid>
    );
};

export default CityGrid;