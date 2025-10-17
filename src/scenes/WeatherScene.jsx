import React from 'react';
import { useFormValidation } from '../hooks/useFormValidation';
import { useWeatherData } from '../hooks/useWeatherData';
import WeatherCard from '../components/WeatherCard';

const WeatherScene = () => {
    // use custom hooks to handle logic
    const {
        city,
        validationWarning,
        handleInputChange,
        validateForSubmit,
        resetForm
    } = useFormValidation();

    const {
        weatherData,
        forecastData,
        currentCity,
        loading,
        error,
        fetchWeatherData,
        clearError
    } = useWeatherData();

    // now simpler submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForSubmit()) return;

        try {
            await fetchWeatherData(city.trim());
            resetForm();
        } catch {
            // error now handled in the hook
        }
    };

    return (
        <div>
            <h2>Weather Search</h2>

            <form onSubmit={handleSubmit} data-testid="weather-form">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => handleInputChange(e, clearError)}
                    placeholder="Enter City"
                    disabled={loading}
                />

                <button
                    type="submit"
                    disabled={loading || !city.trim()}
                >
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </form>

            {validationWarning && (
                <p style={{ color: 'orange' }}>{validationWarning}</p>
            )}

            {error && (
                <p style={{ color: 'red' }}>{error}</p>
            )}

            <WeatherCard
                key={currentCity}
                weatherData={weatherData}
                forecastData={forecastData}
                cityName={currentCity}
            />
        </div>
    );
};

export default WeatherScene;