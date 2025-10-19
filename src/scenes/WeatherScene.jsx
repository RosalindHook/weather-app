import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useFormValidation } from '../hooks/useFormValidation';
import { useMultipleCities } from '../hooks/useMultipleCities';
import CitySearchForm from '../components/CitySearchForm';
import StatusMessages from '../components/StatusMessages';
import CityGrid from '../components/CityGrid';
import EmptyState from '../components/EmptyState';

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

    const handleInputChangeWithClearError = (e) => {
        handleInputChange(e, clearError);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Weather Dashboard
                </Typography>

                <CitySearchForm
                    city={city}
                    validationWarning={validationWarning}
                    loading={loading}
                    citiesCount={cities.length}
                    onInputChange={handleInputChangeWithClearError}
                    onSubmit={handleSubmit}
                />

                <StatusMessages
                    error={error}
                    maxLimitReached={maxLimitReached}
                    citiesCount={cities.length}
                />

                {cities.length > 0 ? (
                    <CityGrid cities={cities} onRemoveCity={removeCity} />
                ) : (
                    <EmptyState />
                )}
            </Box>
        </Container>
    );
};
export default WeatherScene;