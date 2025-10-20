import React from 'react';
import { Box, IconButton } from '@mui/material';
import RotateRightIcon from '@mui/icons-material/RotateRight';

const FlipButton = ({ onFlip }) => {
    const handleFlip = (e) => {
        e.stopPropagation();    // prevent double flip
        onFlip();
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 8,
                left: 8,        // balance on left as remove button on right
                zIndex: 1
            }}
        >
            <IconButton
                size="small"
                onClick={handleFlip}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover':{
                        backgroundColor: 'rgba(255, 255, 255, 0.9',
                        color: 'primary.main'
                    }
                }}
            >
                <RotateRightIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};

export default FlipButton;