// import React hooks for this component - useState manages component state - data that can change
import { useState } from 'react';
// import API function created in weatherAPI.js
import { weatherService } from '../services/weatherAPI';

// define React component as function
const WeatherTest = () => {
    // state management with useState hook
    const [weather, setWeather] = useState(null);       // store weather data from API
    const [loading, setLoading] = useState(false);      // track if currently loading data through API call

    // ASYNC function to handle API calls
    const testAPI = async () => {
        // set loading to true - disable button and show 'Loading'
        setLoading(true);

        try {
            const data = await weatherService.getCurrentWeather();
            setWeather(data)
            console.log('Weather data:', data);

        } catch (error) {
            console.error('Failed to featch weather:', error)   // if API call fails

        } finally {
            setLoading(false);      // set back to false when API call complete
        }
    };

    return (
        <div>
            <h2>Weather API Test for London</h2>

            <button
                onClick={testAPI}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Get Weather'}
            </button>

            {/* If weather not null, render this */}
            {weather && (
                <div style={{
                    marginTop: '20px',
                    padding: '10px',
                    border: '1px solid #ccc'
                }}>
                    <h3>{weather.name}</h3>
                    <p>Temperature: {weather.main.temp} C</p>
                    <p>Feels like: {weather.main.feels_like} C</p>
                    <p>Description: {weather.weather[0].description}</p>        {/* First description from array*/}
                    <p>Humidity: {weather.main.humidity}%</p>
                </div>
            )}
        </div>
    );
};

export default WeatherTest