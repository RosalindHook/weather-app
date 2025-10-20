import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useFormValidation } from '../hooks/useFormValidation';
import { useMultipleCities } from '../hooks/useMultipleCities';
import CitySearchForm from '../components/CitySearchForm';
import StatusMessages from '../components/StatusMessages';
import CityGrid from '../components/CityGrid';
import EmptyState from '../components/EmptyState';
import WeatherAvatar from '../components/WeatherAvatar';

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
                {/* Header and storm */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 4
                    }}
                >
                 {/* Weather avatar component with storm pic*/}
                <WeatherAvatar condition="storm" />
                
                 {/* Name of app */}
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center',
                        mb: 1,
                        letterSpacing: '0.5px',
                        mt: 1 // Small gap after avatar
                        }}
                    >
                        Tempest
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: 'text.secondary',
                            textAlign: 'center',
                            fontStyle: 'italic',
                            mb: 3
                        }}
                    >
                        Your Weather Command Centre ⛈️
                    </Typography>
                </Box>

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