import React, { useState } from 'react';
import { getCurrentWeather } from '../services/weatherAPI';
import WeatherCard from '../components/WeatherCard';

const WeatherScene = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // client-side validation before API call
        if (!city.trim()) {
            setError('Please enter a city name');
            return;
        }

        // reset states for new search
        setLoading(true);
        setError(null);

        try {
            const data = await getCurrentWeather(city.trim());
            setWeatherData(data);
            setCity('');        // clear input on success
            // console.log('Weather data:', data);
        } catch (err) {
            // API errors handled here - display to user
            // console.error('Failed to fetch weather:', err);
            setError(err.message || 'Something went wrong');
            setWeatherData(null);       // clear previous data on error
        } finally {
            // always stop loading, regardless of success or failure
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
                    onChange={(e) => setCity(e.target.value)}
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

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <WeatherCard weatherData={weatherData} />
        </div>
    );
};

export default WeatherScene;
