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
        <Box>
            {/* Full-Width Sky Background Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
                    width: '100vw', // Full viewport width
                    position: 'relative',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                    borderRadius: '0 0 24px 24px',
                    py: 4,
                   mb: 4,
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        pointerEvents: 'none'
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {/* Content Container - constrained width inside full-width background */}
                <Container maxWidth="lg">
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        py: 2
                    }}>
                        {/* Storm Avatar */}
                        <WeatherAvatar condition="storm" />

                        {/* Enhanced Title */}
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: 'bold',
                                background: 'linear-gradient(45deg, #1565c0 30%, #0d47a1 90%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textAlign: 'center',
                                mb: 1,
                                letterSpacing: '0.5px',
                                mt: 1,
                                textShadow: '0 2px 4px rgba(255,255,255,0.3)'
                            }}
                        >
                            Tempest
                        </Typography>

                        {/* Subtitle */}
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: '#1565c0',
                                textAlign: 'center',
                                fontStyle: 'italic',
                                fontWeight: 500,
                                mb: 3
                            }}
                        >
                            Your Weather Command Centre ⛈️
                        </Typography>

                        {/* Search Form */}
                        <CitySearchForm
                            city={city}
                            validationWarning={validationWarning}
                            loading={loading}
                            citiesCount={cities.length}
                            onInputChange={handleInputChangeWithClearError}
                            onSubmit={handleSubmit}
                        />
                    </Box>
                </Container>
            </Box>

            {/* Main Content - normal container width */}
            <Container maxWidth="lg">
                <Box sx={{ py: 2 }}>
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
        </Box>
    );
};

export default WeatherScene;