// this hook is currently unused - replaced by useMultipleCities for multiple city functionality.
// Kept for potential future single city components

import { useState } from 'react';
import { getWeatherAndForecast } from '../services/weatherAPI';

export const useWeatherData = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null); // add forecast state
    const [currentCity, setCurrentCity] = useState('');     // track which city is displayed
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeatherData = async (cityName) => {
        setLoading(true);
        setError(null);
        setWeatherData(null);
        setForecastData(null);  // clear previous forecast

        try {
            // use combined API call
            const data = await getWeatherAndForecast(cityName);
            setWeatherData(data.current);
            setForecastData(data.forecast);
            setCurrentCity(cityName); // store city name for the card
            return data; // return success data
        } catch (err) {
            const errorMessage = err.message || 'Something went wrong';
            setError(errorMessage);
            setCurrentCity(''); // clear city on error
            throw new Error(errorMessage); // re-throw for caller
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => setError(null);

    const clearWeatherData = () => {
        setWeatherData(null);
        setForecastData(null);
        setCurrentCity('');
        setError(null);
    };

    return {
        weatherData,
        forecastData,
        currentCity,
        loading,
        error,
        fetchWeatherData,
        clearError,
        clearWeatherData
    };
};