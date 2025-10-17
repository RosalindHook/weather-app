import { useState } from 'react';
import { getWeatherAndForecast } from '../services/weatherAPI';

export const useMultipleCities = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [maxLimitReached, setMaxLimitReached] = useState(false); //new state

    const addCity = async (cityName) => {
        // check if city exists
        if (cities.some(c => c.name.toLowerCase() === cityName.toLowerCase())) {
            throw new Error('City already added');
        }

        // Check limit and set flag
        if (cities.length >= 3) {
            setMaxLimitReached(true); //set flag when limit hit
            throw new Error('Maximum 3 cities allowed');
        }

        setLoading(true);
        setError(null);
        setMaxLimitReached(false); // clear flag on successful attempt

        try {
            const data = await getWeatherAndForecast(cityName);

            setCities(prev => [...prev, {
                id: Date.now(),
                name: cityName,
                current: data.current,
                forecast: data.forecast,
                addedAt: new Date()
            }]);

            return data;
        } catch (err) {
            const errorMessage = err.message || 'Something went wrong';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const removeCity = (cityId) => {
        setCities(prev => prev.filter(c => c.id !== cityId));
        setError(null); // clear any errors when removing
    };

    const clearError = () => setError(null);

    const clearAllCities = () => {
        setCities([]);
        setError(null);
        setMaxLimitReached(false); // clear flag when clearing all
    };

    return {
        cities,
        loading,
        error,
        addCity,
        removeCity,
        clearError,
        clearAllCities,
        maxLimitReached // expose new state
    };
};