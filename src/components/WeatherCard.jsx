import React from 'react';

// Guard clause to prevent rendering without weather data
const WeatherCard = ({ weatherData = false }) => {
    if (!weatherData) return null;

    const getUnicodeFlagIcon = (countryCode) => {
        // Maps each letter of a 2-letter country code to a Unicode regional indicator, forming the flag emoji
        return countryCode
            .toUpperCase()
            .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
    };

    return (
        <div style={{
            border: '1px solid #ccc',
            padding: '15px',
            margin: '10px',
            borderRadius: '5px'
        }}>
            <h3>{weatherData.name}, {getUnicodeFlagIcon(weatherData.sys.country)} </h3>
            <p>Temperature: {Math.round(weatherData.main.temp)} C</p>
            <p>Feels like: {Math.round(weatherData.main.feels_like)} C</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
    );
};

export default WeatherCard;