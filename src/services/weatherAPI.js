import axios from 'axios';

const BASE_URL = "https://api.openweathermap.org/data/2.5/";

// export service object with all weather-related API functions
export const getCurrentWeather = async (city = 'London') => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    if (!API_KEY) {
        throw new Error('Weather API key not configured');
    }

    // input validation - if city is falsy or white space
    if (!city || !city.trim()) {
        throw new Error('City name is required');
    }

    try {
        const response = await axios.get(`${BASE_URL}weather`, {
            params: {
                q: city.trim(),     // city param
                appid: API_KEY,
                units: 'metric'
            }
        });
        // Log the full API response data
        return response.data;
    } catch (error) {
        console.error('Weather API error:', error);

        if (error.response?.status === 404) {
            throw new Error(`"${city}" not found. Check spelling and try again.`);
        }

        throw new Error('Unable to get weather data. Please try again.');
    }
};

// future exports e.g. getForecast / searchCities