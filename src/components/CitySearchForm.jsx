import React from 'react';
import { Box, Typography } from '@mui/material';

const CitySearchForm = ({
    city,
    validationWarning,
    loading,
    citiesCount,
    onInputChange,
    onSubmit

}) => {
    return (

        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={onSubmit} data-testid="weather-form">
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Box>
                        <input
                            type="text"
                            value={city}
                            onChange={onInputChange}
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
                        disabled={loading || !city.trim() || citiesCount >= 3}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: loading || citiesCount >= 3 ? '#ccc' : '#1976d2',
                            color: 'white',
                            fontSize: '16px',
                            cursor: loading || citiesCount >= 3 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Loading...' : 'Add City'}
                    </button>
                </Box>
            </form>
        </Box>
    );
};

export default CitySearchForm