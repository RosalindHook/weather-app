import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/"

// export service object with all weather-related API functions - initially just current weather for specific city
export const weatherService = {

    // weather for specific city in celsius
    getCurrentWeather: async () => {
        if (!API_KEY) {
            throw new Error('Weather API key not configured')      // if no API key, immediately throw error rather than making failed request
        }

        try {

            // axios.get() returns a Promise, 'await' response
            const response = await axios.get(`${BASE_URL}weather`, {

                params: {
                    q: 'London',        // hard code as London for now
                    appid: API_KEY,
                    units: 'metric'     // default is Kelvin
                }
            });
            return response.data;           // return data part of response - contains just the weather info needed specified in params - to expand later

        } catch (error) {
            console.error('Weather API error:', error);     // log error to console for debugging

            throw error;                // rethrow error so component calling function can show error message to user
        }
    }

    // add additional functions here later
};