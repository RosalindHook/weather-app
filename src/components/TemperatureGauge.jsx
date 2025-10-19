import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Box } from '@mui/material';
import { getWeatherColour } from '../utils/weatherHelpers';

const TemperatureGauge = ({ temperature }) => {
    const temp = Math.round(temperature);

    // Uses a practical temperature scale (to cover most cities) for comparison
    const minTemp = -5; // min on scale
    const maxTemp = 30; // max on scale
    const tempRange = maxTemp - minTemp; // 35 degree range but edge cases handled below

    // calculate percentage within practical range
    const calculateGaugePercentage = (temp) => {
        if (temp <= minTemp) return 5; // small sliver for extreme cold
        if (temp >= maxTemp) return 95; // almost full arc for extreme heat

        // normal range - map everything else to 5-95% of arc
        const normalisedTemp = temp - minTemp;  // i.e. 0-35
        const percentage =(normalisedTemp / tempRange) * 90 + 5;    // 5% to 95%

        return Math.round(percentage);
    }
    const gaugePercentage = calculateGaugePercentage(temp);

    const gaugeData = () => [
        {
            id: 'temperature',
            value: gaugePercentage,
            color: getWeatherColour(temp)
        },
        {
            id: 'empty',
            value: 100 - gaugePercentage,
            color: '#f0f0f0'
        }
    ];

    return (
        <Box
            position="relative"
            width="140px"
            height="100px"
            mx="auto"
            mb={1}
        >
            <ResponsivePie
                data={gaugeData()}
                colors={{ datum: 'data.color' }}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                startAngle={-90}
                endAngle={90}
                innerRadius={0.7}
                padAngle={2}
                cornerRadius={3}
                borderWidth={0}
                enableArcLabels={false}
                enableArcLinkLabels={false}
                isInteractive={false}
            />

            {/* Center Temperature Text */}
            <Box
                position="absolute"
                top="75%"
                left="50%"
                sx={{
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                }}
            >
                <Box
                    fontSize="1.5rem"
                    fontWeight="bold"
                    color={getWeatherColour(temp)}
                >
                    {temp}°C
                </Box>
            </Box>
        </Box>
    );
};

export default TemperatureGauge;