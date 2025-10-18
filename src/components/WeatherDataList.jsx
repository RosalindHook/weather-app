import React from 'react';
import { Box } from '@mui/material';

const WeatherDataList = ({ items }) => {
    return (
        <Box
            component="d1"
            sx={{
                margin: 0,
                '& dt': {
                    fontWeight: 'bold',
                    marginTop: 1,
                    fontSize: '0.875rem',
                    color: 'text.secondary'
                },
                '& dd': {
                    margin: 0,
                    marginBottom: 1,
                    fontSize: '1rem',
                    fontWeight: 500
                }
            }}
        >
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <Box component="dt">{item.term}:</Box>
                    <Box
                        component="dd"
                        sx={{
                            color: item.color || 'text.primary',
                            textTransform: item.term === 'Condition' ? 'capitalize' : 'none'
                        }}
                    >
                        {item.value}
                    </Box>
                </React.Fragment>
            ))}
        </Box>
    );
};

export default WeatherDataList;