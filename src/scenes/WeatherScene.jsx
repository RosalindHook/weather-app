import React, { useState } from 'react';
import { getWeatherAndForecast } from '../services/weatherAPI';
import WeatherCard from '../components/WeatherCard';

const WeatherScene = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null); // add forecast state
    const [currentCity, setCurrentCity] = useState('');     // track which city is displayed
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
        setCity(value); // Update input value state
    
        const hasTyped = value.trim() !== '';         // Has the user typed anything (ignores whitespace)?
        const willBeTouched = touched || hasTyped;    // Predict if the field is (or will be) considered 'touched'
    
        // If the field isn't touched yet but the user has typed something, mark it as touched
        if (hasTyped && !touched) {
            setTouched(true);
        }

        // Run validation in partial mode (i.e. only format checks, not length)
        const warning = validateInput(value, { fullCheck: false });
    
        // Show validation warning only if:
        // - the user has interacted with the field (touched or will be)
        // - AND the input isn’t blank (to avoid warnings while retrying)
        if (willBeTouched && hasTyped) {
            setValidationWarning(warning);  // Set warning if input is invalid
        } else {
            setValidationWarning(null);     // Clear warning otherwise
        }
        // Clear any existing API error (from a previous failed submission)
        if (error) setError(null);
    };    

    // update submit handler with combined API call - current weather and forecast
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
        setForecastData(null);  // clear previous forecast

        try {
            // use combined API call
            const data = await getWeatherAndForecast(city.trim());
            setWeatherData(data.current);
            setForecastData(data.forecast);
            setCurrentCity(city.trim()); // store city name for the card
            setCity('');
            setTouched(false); // Reset after success
        } catch (err) {
            setError(err.message || 'Something went wrong');
            setCurrentCity(''); // clear city on error
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

            <WeatherCard 
            weatherData={weatherData}
            forecastData={forecastData}
            cityName={currentCity} 
            />
        </div>
    );
};

export default WeatherScene;