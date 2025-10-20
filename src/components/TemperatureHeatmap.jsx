import React from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { Box } from '@mui/material';
import { getWeatherColour } from '../utils/weatherHelpers';

const TemperatureHeatmap = ({ dailyData }) => {
    if (!dailyData || dailyData.length === 0) {
        return null;
    }

    // Transform data for Nivo heatmap - single row of days
    const heatmapData = [{
        id: 'forecast',
        data: dailyData.map((day, index) => {
            const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
            const temp = Math.round(day.avg);
            return {
                x: dayName,
                y: temp,
            };
        })
    }];

    return (
        <Box sx={{ height: '80px', width: '100%', mt: 2 }}>
            <ResponsiveHeatMap
                data={heatmapData}
                margin={{ top: 1, right: 10, bottom: 30, left: 10 }}
                valueFormat={(value) => `${value}°C`}

                // Use colour palette
                colors={(cell) => {
                    return getWeatherColour(cell.value);
                }}
                emptyColor="#f0f0f0"
                cellOpacity={1}
                cellBorderColor="#ffffff"
                cellBorderWidth={2}
                enableLabels={false} // No labels on squares
                enableGridX={false}
                enableGridY={false}
                axisTop={null} // Remove top axis
                axisRight={null} // Remove right axis 
                axisLeft={null} // Remove left axis
                axisBottom={{ // Just day names at bottom
                    tickSize: 0,
                    tickPadding: 8,
                    tickRotation: 0,
                }}

                animate={true}
                motionConfig="gentle"
                tooltip={({ cell }) => (
                    <div
                        style={{
                            background: 'white',
                            padding: '6px 10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#333'
                        }}
                    >
                        {cell.formattedValue}
                    </div>
                )}
            />
        </Box>
    );
};

export default TemperatureHeatmap;