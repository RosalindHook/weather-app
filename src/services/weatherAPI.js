import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

// export service object with all weather-related API functions
export const weatherService = {
    getCurrentWeather: async () => {
        if (!API_KEY) {
            console.warn('⚠️ Missing API key. Check your .env setup.');
            throw new Error('Weather API key not configured');
        }

        try {
            const response = await axios.get(`${BASE_URL}weather`, {
                params: {
                    q: 'London',
                    appid: API_KEY,
                    units: 'metric'
                }
            });

            // Log the full API response data
            console.log('Weather API response:', response.data);

            return response.data;
        } catch (error) {
            console.error('Weather API error:', error.response?.data || error.message || error);
            throw error;
        }
    }

    // add additional functions here later
};
