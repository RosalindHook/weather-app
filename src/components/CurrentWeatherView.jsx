import React from 'react';
import { CardContent, Typography } from '@mui/material';
import { getWeatherColour } from '../utils/weatherHelpers';
import WeatherDataList from './WeatherDataList';
import CityHeader from './CityHeader';

const CurrentWeatherView = ({ weatherData }) => {
    const weatherItems = [
        {
            term: 'Temperature',
            value: `${Math.round(weatherData.main.temp)}C`,
            color: getWeatherColour(weatherData.main.temp)
        },
        {
            term: 'Feels like',
            value: `${Math.round(weatherData.main.feels_like)}C`,
            color: getWeatherColour(weatherData.main.feels_like)
        },
        {
            term: 'Condition',
            value: weatherData.weather[0].description
        },
        {
            term: 'Humidity',
            value: `${weatherData.main.humidity}%`
        }
    ];

    return (
        <CardContent sx={{ textAlign: 'center', width: '100%' }}>
            <CityHeader weatherData={weatherData} />
            <WeatherDataList items={weatherItems} />
        </CardContent>
    );
};

export default CurrentWeatherView;