import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
const CitySearchForm = ({
    city,
    validationWarning,
    loading,
    citiesCount,
    onInputChange,
    onSubmit
}) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', px: 2 }}>
            <form onSubmit={onSubmit} data-testid="weather-form">
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' }, // stakc on mobile
                    gap: 2,
                    alignIterms: { xs: 'stretch', sm: 'flex-start' }, // stretch on mobile
                    width: '100%',
                    maxWidth: '400px'   // prevent getting too wide
                }}>
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            type="text"
                            value={city}
                            onChange={onInputChange}
                            placeholder="Enter City"
                            disabled={loading}
                            variant="outlined"
                            size="medium"
                            fullWidth // make responsive
                            sx={{
                                width: '240px',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    backgroundColor: 'background.default',
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                        borderWidth: '2px',
                                    }
                                }
                            }}
                        />
                        {validationWarning && (
                            <Typography variant="caption" color="warning.main" display="block" sx={{ mt: 0.5 }}>
                                {validationWarning}
                            </Typography>
                        )}
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !city.trim() || citiesCount >= 3}
                        sx={{
                            borderRadius: '12px',
                            px: 3,
                            py: 1.5,
                            fontWeight: 'bold',
                            textTransform: 'none',
                            fontSize: '1rem',
                            minWidth: '120px',
                            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                            '&:hover': {
                                boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)',
                                transform: 'translateY(-1px)'
                            },
                            '&:disabled': {
                                backgroundColor: 'action.disabled',
                                color: 'action.disabled',
                                boxShadow: 'none'
                            }
                        }}
                    >
                        {loading ? 'Loading...' : 'Add City'}
                    </Button>
                </Box>
            </form>
        </Box>
    );
};
export default CitySearchForm;