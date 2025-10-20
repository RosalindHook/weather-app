import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Box } from '@mui/material';

const TemperatureChart = ({ dailyData }) => {

    // Transform data for Nivo format
    const chartData = [

        {
            id: 'min',
            color: '#74b9ff',
            data: dailyData.map(day => ({
                x: new Date(day.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                }),
                y: Math.round(day.min)
            }))
        },

        {
            id: 'avg',
            color: '#00b894',
            data: dailyData.map(day => ({
                x: new Date(day.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                }),
                y: Math.round(day.avg)
            }))
        },

        {
            id: 'feels like',
            color: '#e84393',
            data: dailyData.map(day => ({
                x: new Date(day.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                }),
                y: Math.round(day.feels_avg)
            }))
        },

        {
            id: 'max',
            color: '#d63031',
            data: dailyData.map(day => ({
                x: new Date(day.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                }),
                y: Math.round(day.max)
            }))
        }
    ];

    return (
        <Box sx={{ height: '250px', width: '100%' }}>
            <ResponsiveLine
                data={chartData}
                margin={{ top: 20, right: 80, bottom: 40, left: 40 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto' }}

                axisBottom={{
                    legend: 'Date',
                    legendOffset: 32,
                    legendPosition: 'middle'
                }}

                axisLeft={{
                    legend: '°C',
                    legendOffset: -32,
                    legendPosition: 'middle'
                }}

                pointSize={6}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'seriesColor' }}
                enableTouchCrosshair={true}
                useMesh={true}
                enableGridX={false}
                enableGridY={true}

                legends={[
                    {
                        anchor: 'top-right',
                        direction: 'column',
                        translateX: 70,
                        translateY: 0,
                        itemWidth: 60,
                        itemHeight: 18,
                        itemTextColor: '#333',
                        symbolSize: 12,
                        symbolShape: 'circle'
                    }
                ]}

                theme={{
                    fontSize: 11,
                    textColor: '#333'
                }}
            />
        </Box>
    );
};

export default TemperatureChart;