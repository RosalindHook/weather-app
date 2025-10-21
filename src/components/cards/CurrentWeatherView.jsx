import React from 'react';
import { CardContent } from '@mui/material';
import { getWeatherColour } from '../../utils/weatherHelpers';
import WeatherDataList from '../WeatherDataList';
import CityHeader from '../CityHeader';
import TemperatureGauge from '../charts/TemperatureGauge';
import WeatherAvatar from '../WeatherAvatar';

const CurrentWeatherView = ({ weatherData }) => {
    const weatherItems = [
        {
            term: 'Feels like',
            value: `${Math.round(weatherData.main.feels_like)}°C`,
            color: getWeatherColour(weatherData.main.feels_like)
        },
        {
            term: 'Condition',
            value: weatherData.weather[0].description,
            color: getWeatherColour(weatherData.main.temp)
        }
    ];

    return (
        <CardContent sx={{ textAlign: 'center', width: '100%' }}>
            <CityHeader
                weatherData={weatherData}
                subtitle="Currently" />
            <TemperatureGauge temperature={weatherData.main.temp} />
            <WeatherDataList items={weatherItems} />

            <WeatherAvatar
                condition={weatherData.weather[0].description}
            // sx={{mt: 0 }} 
            />
        </CardContent>
    );
};

export default CurrentWeatherView;