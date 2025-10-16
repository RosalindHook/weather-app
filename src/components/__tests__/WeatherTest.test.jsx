import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherTest from '../WeatherTest';
import { weatherService } from '../../services/weatherAPI';

// Mock entire weatherService module
vi.mock('../../services/weatherAPI');

describe('WeatherTest Component', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks();
    });

    // Test 1: Component renders correctly on initial load
    it('renders initial state correctly', () => {
        render(<WeatherTest />);
        // Check if main elements are present
        expect(screen.getByText('Weather API Test for London')).toBeInTheDocument();
        expect(screen.getByText('Get Weather')).toBeInTheDocument();
        // Weather data should NOT be visible initially
        expect(screen.queryByText(/Temperature:/)).not.toBeInTheDocument();
    });

    // Test 2: Button shows loading state when clicked
    it('shows loading state when button is clicked', async () => {
        // Mock delayed API response
        weatherService.getCurrentWeather = vi.fn().mockImplementation(
            () => new Promise(resolve => setTimeout(() => resolve({
                name: 'London',
                main: { temp: 15, feels_like: 13, humidity: 80 },
                weather: [{ description: 'cloudy' }]
            }), 100))
        );
        render(<WeatherTest />);

        const button = screen.getByRole('button');


        // Initially shows "Get Weather"
        expect(button).toHaveTextContent('Get Weather');
        expect(button).not.toBeDisabled();

        // Click the button
        fireEvent.click(button);
        // Should immediately show loading state
        expect(button).toHaveTextContent('Loading...');
        expect(button).toBeDisabled();
    });

    // Test 3: Displays weather data when API call succeeds
    it('displays weather data when API call succeeds', async () => {
        const mockWeatherData = {
            name: 'London',
            main: { temp: 15.5, feels_like: 13.2, humidity: 80 },
            weather: [{ description: 'cloudy' }]
        };

        // Mock successful API response
        weatherService.getCurrentWeather = vi.fn().mockResolvedValue(mockWeatherData);
        render(<WeatherTest />);
        // Click the button
        fireEvent.click(screen.getByText('Get Weather'));

        // Wait for weather data to appear
        await waitFor(() => {
            expect(screen.getByText('London')).toBeInTheDocument();
            expect(screen.getByText('Temperature: 15.5 C')).toBeInTheDocument();
            expect(screen.getByText('Feels like: 13.2 C')).toBeInTheDocument();
            expect(screen.getByText('Description: cloudy')).toBeInTheDocument();
            expect(screen.getByText('Humidity: 80%')).toBeInTheDocument();
        });

        // Button should be back to normal state
        expect(screen.getByText('Get Weather')).toBeInTheDocument();
        expect(screen.getByRole('button')).not.toBeDisabled();

        // Verify the service was called
        expect(weatherService.getCurrentWeather).toHaveBeenCalledTimes(1);
    });

    // Test 4: Handles API errors gracefully
    it('handles API errors without crashing', async () => {
        // Mock console.error to avoid noise in test output
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        // Mock API error
        weatherService.getCurrentWeather = vi.fn().mockRejectedValue(new Error('Network error'));
        render(<WeatherTest />);
        // Click the button
        fireEvent.click(screen.getByText('Get Weather'));
        // Wait for loading to finish
        await waitFor(() => {
            expect(screen.getByText('Get Weather')).toBeInTheDocument();
            expect(screen.getByRole('button')).not.toBeDisabled();
        });
        // Weather data should NOT be displayed
        expect(screen.queryByText(/Temperature:/)).not.toBeInTheDocument();
        // Error should have been logged
        expect(consoleSpy).toHaveBeenCalledWith('Failed to featch weather:', expect.any(Error));
        // Clean up
        consoleSpy.mockRestore();
    });

    // Test 5: Multiple button clicks work correctly
    it('handles multiple API calls correctly', async () => {
        const mockData1 = {
            name: 'London',
            main: { temp: 15, feels_like: 13, humidity: 80 },
            weather: [{ description: 'cloudy' }]
        };

        const mockData2 = {
            name: 'London',
            main: { temp: 20, feels_like: 18, humidity: 60 },
            weather: [{ description: 'sunny' }]
        };

        weatherService.getCurrentWeather = vi.fn()
            .mockResolvedValueOnce(mockData1)
            .mockResolvedValueOnce(mockData2);
        render(<WeatherTest />);

        // First API call
        fireEvent.click(screen.getByText('Get Weather'));
        await waitFor(() => {
            expect(screen.getByText('Temperature: 15 C')).toBeInTheDocument();
            expect(screen.getByText('Description: cloudy')).toBeInTheDocument();
        });

        // Second API call
        fireEvent.click(screen.getByText('Get Weather'));
        await waitFor(() => {
            expect(screen.getByText('Temperature: 20 C')).toBeInTheDocument();
            expect(screen.getByText('Description: sunny')).toBeInTheDocument();
        });

        expect(weatherService.getCurrentWeather).toHaveBeenCalledTimes(2);
    });
});