import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getCurrentWeather } from '../weatherAPI';

const mock = new MockAdapter(axios);

describe('getCurrentWeather', () => {
    let originalKey;

    beforeEach(() => {
        originalKey = import.meta.env.VITE_WEATHER_API_KEY;
        import.meta.env.VITE_WEATHER_API_KEY = 'test-api-key'; // ✅ Add this
    });

    afterEach(() => {
        mock.reset();
        import.meta.env.VITE_WEATHER_API_KEY = originalKey;
    });

    it('returns weather data for London by default', async () => {
        const mockData = {
            name: 'London',
            sys: { country: 'GB' },
            main: {
                temp: 15,
                feels_like: 13,
                humidity: 80,
            },
            weather: [{ description: 'cloudy' }],
        };

        mock.onGet(/weather.*/).reply(200, mockData);

        const data = await getCurrentWeather();
        expect(data).toEqual(mockData);
    });

    it('throws an error when API key is missing', async () => {
        import.meta.env.VITE_WEATHER_API_KEY = ''; // simulate missing key

        await expect(getCurrentWeather('London')).rejects.toThrow('Weather API key not configured');
    });

    it('throws an error when city is empty', async () => {
        await expect(getCurrentWeather('')).rejects.toThrow('City name is required');
    });

    it('throws an error when city is not found (404)', async () => {
        mock.onGet(/weather.*/).reply(404, {});

        await expect(getCurrentWeather('Nocity')).rejects.toThrow('"Nocity" not found. Check spelling and try again.');
    });

    it('throws a generic error on API failure (500)', async () => {
        mock.onGet(/weather.*/).reply(500, {});

        await expect(getCurrentWeather('London')).rejects.toThrow('Unable to get weather data. Please try again.');
    });
});
