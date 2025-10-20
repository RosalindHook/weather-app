import { describe, it, expect } from 'vitest';
import { getUnicodeFlagIcon, getWeatherColour, getDailySummaries } from '../weatherHelpers';

describe('weatherHelpers', () => {

    describe('getUnicodeFlagIcon', () => {

        it('converts country codes to flag emojis', () => {
            expect(getUnicodeFlagIcon('FR')).toBe('🇫🇷');
            expect(getUnicodeFlagIcon('GB')).toBe('🇬🇧');
            expect(getUnicodeFlagIcon('US')).toBe('🇺🇸');
        });

        it('handles lowercase country codes', () => {
            expect(getUnicodeFlagIcon('fr')).toBe('🇫🇷');
        });
    });

    describe('getWeatherColour', () => {

        it('returns correct colors for temperature ranges', () => {

            expect(getWeatherColour(-5)).toBe('#74b9ff'); // Below 0
            expect(getWeatherColour(10)).toBe('#00b894');  // 0-15
            expect(getWeatherColour(20)).toBe('#e84393');  // 15-25
            expect(getWeatherColour(30)).toBe('#d63031');  // Above 25
        });
    });

    describe('getDailySummaries', () => {

        const mockForecastData = {
            list: [
                {
                    dt: 1760788800, // Unix time stamp for Oct 18, 2025, 12pm UTC
                    main: { temp: 20, feels_like: 18, temp_min: 16, temp_max: 24 },
                    weather: [{ description: 'clear sky'}]
                },
                {
                    dt: 1760792400, // Oct 18, 2025, 1pm UTC
                    main: { temp: 22, feels_like: 20, temp_min: 18, temp_max: 26 },
                    weather: [{ description: 'few clouds'}]
                },
                {
                    dt: 1760875200, // Oct 19, 2025, 12pm UTC
                    main: { temp: 15, feels_like: 13, temp_min: 12, temp_max: 18 },
                    weather: [{ description: 'light rain'}]
                }
            ]
        };

        it('groups forecast data by date', () => {
            const result = getDailySummaries(mockForecastData);
            expect(result).toHaveLength(2); // 2 different dates
            expect(result[0].date).toBe('2025-10-18');
            expect(result[1].date).toBe('2025-10-19');
        });

        it('calculates correct averages for same day', () => {
            const result = getDailySummaries(mockForecastData);
            const firstDay = result[0];
            expect(firstDay.avg).toBe(21); // (20 + 22) / 2
            expect(firstDay.feels_avg).toBe(19); // (18 + 20) / 2
        });

        it('calculates correct min/max for same day', () => {
            const result = getDailySummaries(mockForecastData);
            const firstDay = result[0];
            expect(firstDay.min).toBe(16); // Min of temp_min values
            expect(firstDay.max).toBe(26); // Max of temp_max values
        });

        it('handles empty or invalid data', () => {
            expect(getDailySummaries(null)).toEqual([]);
            expect(getDailySummaries({})).toEqual([]);
            expect(getDailySummaries({ list: [] })).toEqual([]);
        });

        it('returns data in correct format for Nivo', () => {
            const result = getDailySummaries(mockForecastData);
            const day = result[0];
            expect(day).toHaveProperty('date');
            expect(day).toHaveProperty('avg');
            expect(day).toHaveProperty('feels_avg');
            expect(day).toHaveProperty('min');
            expect(day).toHaveProperty('max');
            expect(day).toHaveProperty('condition');
        });

        // test for weather condition functionality
        it('determines most common weather condition for each day', () => {
            const result = getDailySummaries(mockForecastData);
            const firstDay = result[0];
            const secondDay = result[1];

            // First day should have clear sky and few clouds, should pick first alphabetically or morst common
            expect(firstDay.condition).toBeDefined();
            expect(typeof firstDay.condition).toBe('string');

            // second day should be 'light rain'
            expect(secondDay.condition).toBe('light rain');
        });

        // Test for weather condition with multiple same conditions
        it('picks most common weather condition when multiple exist', () => {
            const testData = {
                list: [
                    {
                        dt: 1760788800,
                        main: { temp: 20, feels_like: 18, temp_min: 16, temp_max: 24 },
                        weather: [{ description: 'clear sky' }]
                    },
                    {
                        dt: 1760792400, // Same day
                        main: { temp: 22, feels_like: 20, temp_min: 18, temp_max: 26 },
                        weather: [{ description: 'clear sky' }]
                    },
                    {
                        dt: 1760796000, // Same day
                        main: { temp: 18, feels_like: 16, temp_min: 15, temp_max: 22 },
                        weather: [{ description: 'few clouds' }]
                    }
                ]
            };

            const result = getDailySummaries(testData);
            expect(result[0].condition).toBe('clear sky'); // Most common (2 vs 1)         
        });
    });
});