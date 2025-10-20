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
                min: Math.round(day.min),
                max: Math.round(day.max),
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

                // enable labels with temp numbers
                enableLabels={true} 
                labelTextColor="white"
                labelFormat={(value) => `${value}°`}    //just 18° not 18°C

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
                
                // custom tooltip showing max/min
                tooltip={({ cell }) => (
                    <div
                        style={{
                            background: 'white',
                            padding: '6px 10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: '#333',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                        }}
                    >
                        <div>Max: {cell.data.max}°C</div>
                        <div>Min: {cell.data.min}°C</div>
                    </div>
                )}
            />
        </Box>
    );
};

export default TemperatureHeatmap;