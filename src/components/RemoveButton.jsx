import React from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const RemoveButton = ({ onRemove }) => {
    const handleRemove = (e) => {
        e.stopPropagation();    // Prevent flip when clicking remove
        onRemove();
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 1
            }}
        >
            <IconButton
                size="small"
                onClick={handleRemove}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: 'error.main'
                    }
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};

export default RemoveButton;