import React from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import { useFormValidation } from '../hooks/useFormValidation';
import { useMultipleCities } from '../hooks/useMultipleCities';
import WeatherCard from '../components/WeatherCard';
const WeatherScene = () => {
    const {
        city,
        validationWarning,
        handleInputChange,
        validateForSubmit,
        resetForm
    } = useFormValidation();

    const {
        cities,
        loading,
        error,
        maxLimitReached, // Get the new state
        addCity,
        removeCity,
        clearError
    } = useMultipleCities();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForSubmit()) return;
        try {
            await addCity(city.trim());
            resetForm();
        } catch {
            // Error is already handled in the hook
        }
    };
    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Weather Dashboard
                </Typography>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                    <form onSubmit={handleSubmit} data-testid="weather-form">
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                            <Box>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => handleInputChange(e, clearError)}
                                    placeholder="Enter City"
                                    disabled={loading}
                                    style={{
                                        padding: '12px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                        fontSize: '16px',
                                        width: '200px'
                                    }}
                                />
                                {validationWarning && (
                                    <Typography variant="caption" color="warning.main" display="block">
                                        {validationWarning}
                                    </Typography>
                                )}
                            </Box>
                            <button
                                type="submit"
                                disabled={loading || !city.trim() || cities.length >= 3}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    backgroundColor: loading || cities.length >= 3 ? '#ccc' : '#1976d2',
                                    color: 'white',
                                    fontSize: '16px',
                                    cursor: loading || cities.length >= 3 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {loading ? 'Loading...' : 'Add City'}
                            </button>
                        </Box>
                    </form>
                </Box>
                {/* Error message */}
                {error && (
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                        <Typography color="error">{error}</Typography>
                    </Box>
                )}
                {/* Conditional helper messages */}
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', minHeight: '24px' }}>
                    {maxLimitReached ? (
                        <Typography variant="body2" color="warning.main">
                            Maximum 3 cities reached. Remove a city to add another.
                        </Typography>
                    ) : cities.length > 0 && cities.length < 3 ? (
                        <Typography variant="body2" color="text.secondary">
                            Would you like to add another city? (up to 3 total)
                        </Typography>
                    ) : null}
                </Box>
                <Grid container spacing={3} justifyContent="center">

                    {cities.map(cityData => (
                        <WeatherCard
                            key={cityData.id}
                            weatherData={cityData.current}
                            forecastData={cityData.forecast}
                            cityName={cityData.name}
                            onRemove={() => removeCity(cityData.id)}
                        />
                    ))}
                </Grid>
                {cities.length === 0 && (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            Search for a city to get started! 🌤️
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
};
export default WeatherScene;