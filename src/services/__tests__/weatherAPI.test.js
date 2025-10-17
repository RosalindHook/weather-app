import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getWeatherAndForecast } from '../weatherAPI';

const mock = new MockAdapter(axios);
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

describe('getWeatherAndForecast', () => {
    let originalKey;

    beforeEach(() => {
        originalKey = import.meta.env.VITE_WEATHER_API_KEY;
        import.meta.env.VITE_WEATHER_API_KEY = 'test-api-key';
    });

    afterEach(() => {
        mock.reset();
        import.meta.env.VITE_WEATHER_API_KEY = originalKey;
    });

    it('returns current and forecast data for a city', async () => {
        const mockCurrent = {
            name: 'London',
            sys: { country: 'GB' },
            main: {
                temp: 15,
                feels_like: 13,
                humidity: 80,
            },
            weather: [{ description: 'cloudy' }],
        };
    
        const mockForecast = {
            list: [
              {
                dt: 1760713200,
                main: {
                  temp: 14.9,
                  feels_like: 14.12,
                  temp_min: 14.9,
                  temp_max: 15,
                },
                weather: [
                  { description: 'overcast clouds' }
                ],
              },
              {
                dt: 1760745600,
                main: {
                  temp: 10.7,
                  feels_like: 9.63,
                  temp_min: 10.7,
                  temp_max: 10.7,
                },
                weather: [
                  { description: 'clear sky' }
                ],
              },
            ]
        };
    
        mock.onGet(new RegExp(`${BASE_URL}weather.*`)).reply(200, mockCurrent);
        mock.onGet(new RegExp(`${BASE_URL}forecast.*`)).reply(200, mockForecast);
    
        const result = await getWeatherAndForecast('London');
        expect(result).toEqual({
            current: mockCurrent,
            forecast: mockForecast
        });
    });     

    it('throws an error when API key is missing', async () => {
        import.meta.env.VITE_WEATHER_API_KEY = '';

        await expect(getWeatherAndForecast('London')).rejects.toThrow('Weather API key not configured');
    });

    it('throws an error when city is empty', async () => {
        await expect(getWeatherAndForecast('')).rejects.toThrow('City name is required');
    });

    it('throws an error when city is not found (404)', async () => {
        mock.onGet(/weather/).reply(404);

        await expect(getWeatherAndForecast('Nocity')).rejects.toThrow('"Nocity" not found. Check spelling and try again.');
    });

    it('throws a generic error on API failure (500)', async () => {
        mock.onGet(/weather/).reply(500);

        await expect(getWeatherAndForecast('London')).rejects.toThrow('Unable to get weather data. Please try again.');
    });
});
