import React from 'react';

// Guard clause to prevent rendering without weather data
const WeatherCard = ({ weatherData = false }) => {
    if (!weatherData) return null;

    return (
        <div style={{
            border: '1px solid #ccc',
            padding: '15px',
            margin: '10px',
            borderRadius: '5px'
        }}>
            <h3>{weatherData.name}</h3>
            <p>Temperature: {Math.round(weatherData.main.temp)} C</p>
            <p>Feels like: {weatherData.main.feels_like} C</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
    );
};

export default WeatherCard;
