import React, { useState } from 'react';
import { getCurrentWeather } from '../services/weatherAPI';
import WeatherCard from '../components/WeatherCard';

const WeatherScene = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validationWarning, setValidationWarning] = useState(null);
    const [touched, setTouched] = useState(false);

    // Client-side input validation
    const validateInput = (input, { fullCheck = false } = {}) => {
        const trimmed = input.trim();

        if (!trimmed) {     // guard clause - checks if input empty after trimming white space
            return 'Please enter a city name';
        }

        // Only enforce 3+ chars during submit
        if (fullCheck && trimmed.length < 3) {
            return 'City name must be at least 3 characters long';
        }

        // Regex to allow only letters and spaces (including accented letters)
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(trimmed)) {
            return 'City name must contain only letters and spaces';
        }

        return null;
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setCity(value);

        // Set touched only if user typed something
        if (!touched && value.trim() !== '') {
            setTouched(true);
        }

        // do partial validation here (format only, not length)
        const warning = validateInput(value, { fullCheck: false });

        // Show warning only if:
        // - user has typed something (`touched`)
        // - AND the input isn't blank (i.e., in case they're trying to retry)
        if (touched && value.trim() !== '') {
            setValidationWarning(warning);
        } else {
            setValidationWarning(null);
        }

        if (error) setError(null);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const warning = validateInput(city, { fullCheck: true });;
        setValidationWarning(warning);

        if (warning) {
            return; // Don't proceed with API call
        }
        setLoading(true);
        setError(null);
        setWeatherData(null);

        try {
            const data = await getCurrentWeather(city.trim());
            setWeatherData(data);
            setCity('');
            setTouched(false); // Reset after success
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Weather Search</h2>

            <form onSubmit={handleSubmit} data-testid="weather-form">
                <input
                    type="text"
                    value={city}
                    onChange={handleInputChange}
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

            <WeatherCard weatherData={weatherData} />
        </div>
    );
};

export default WeatherScene;