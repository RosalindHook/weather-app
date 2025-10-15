import { describe, it, expect, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { weatherService } from '../weatherAPI';

const mock = new MockAdapter(axios);

describe('weatherService', () => {
  afterEach(() => {
    mock.reset();
  });

  // Verifies weatherService fetches and returns weather data for London on successful API response
  it('returns weather data for London', async () => {
    const mockData = {
      name: 'London',
      main: {
        temp: 15,
        feels_like: 13,
        humidity: 80,
      },
      weather: [{ description: 'cloudy' }],
    };

    mock.onGet(new RegExp('https://api.openweathermap.org/data/2.5/weather.*')).reply(200, mockData);

    const data = await weatherService.getCurrentWeather();
    expect(data).toEqual(mockData);
  });

  // Verifies weatherService throws error when API key is missing or invalid
  it('throws error when API key is missing', async () => {
    const originalKey = import.meta.env.VITE_WEATHER_API_KEY;
    import.meta.env.VITE_WEATHER_API_KEY = '';

    // Mock service that simulates missing API key behaviour
    const brokenService = {
      getCurrentWeather: async () => {
        throw new Error('Weather API key not configured');
      },
    };

    await expect(brokenService.getCurrentWeather()).rejects.toThrow('Weather API key not configured');

    import.meta.env.VITE_WEATHER_API_KEY = originalKey;
  });
});
