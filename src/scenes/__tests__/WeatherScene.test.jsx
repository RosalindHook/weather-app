import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherScene from '../WeatherScene';
import { getWeatherAndForecast } from '../../services/weatherAPI';

// Mock the getWeatherAndForecast function
vi.mock('../../services/weatherAPI', () => ({
    getWeatherAndForecast: vi.fn()
}));

describe('WeatherScene', () => {
    const mockWeatherData = {

        current: {
            name: 'Paris',
            main: { temp: 20, feels_like: 18, humidity: 65 },
            weather: [{ description: 'clear sky' }],
            sys: { country: 'FR' }
        },
        forecast: {
            list: [
                {
                    dt: 1634567890,
                    main: { temp: 16, feels_like: 15, temp_min: 14, temp_max: 18, humidity: 75 },
                    weather: [{ description: 'sunny' }]
                }
            ]
        }
    };
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders initial form state correctly', () => {
        render(<WeatherScene />);
        expect(screen.getByPlaceholderText('Enter City')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Add City' })).toBeInTheDocument(); 
        expect(screen.getByText('Search for a city to get started! 🌤️')).toBeInTheDocument();
    });

    it('displays error message when API call fails', async () => {
        getWeatherAndForecast.mockRejectedValueOnce(new Error('API failure'));

        render(<WeatherScene />);
        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: 'Atlantis' }
        });
        fireEvent.click(screen.getByRole('button', { name: 'Add City' })); 
        await waitFor(() => {
            expect(screen.getByText('API failure')).toBeInTheDocument();
        });
    });

    it('shows not found error message for city not found by API', async () => {
        getWeatherAndForecast.mockRejectedValueOnce(
            new Error('"Atlantisss" not found. Check spelling and try again.')
        );

        render(<WeatherScene />);
        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: 'Atlantisss' }
        });
        fireEvent.click(screen.getByRole('button', { name: 'Add City' })); // Changed from 'Search'

        expect(await screen.findByText('"Atlantisss" not found. Check spelling and try again.')).toBeInTheDocument();
    });

    it('shows validation warning for numeric-only input', async () => {
        render(<WeatherScene />);

        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: '12345' }
        });

        expect(screen.getByText('City name must contain only letters and spaces')).toBeInTheDocument();
    });

    it('shows validation warning for mixed letters and numbers', async () => {
        render(<WeatherScene />);

        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: 'Paris12' }
        });

        expect(screen.getByText('City name must contain only letters and spaces')).toBeInTheDocument();
    });

    it('adds city and displays weather card', async () => { // Updated test
        getWeatherAndForecast.mockResolvedValueOnce(mockWeatherData);
        render(<WeatherScene />);

        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: '   Paris  ' }
        });

        fireEvent.click(screen.getByRole('button', { name: 'Add City' })); // Changed from 'Search'
        // Wait for the city to be added and card to appear
        expect(await screen.findByText(/Paris, 🇫🇷/)).toBeInTheDocument();
        expect(screen.getByText('Temperature: 20°C')).toBeInTheDocument();
        // Check that the form is cleared
        expect(screen.getByPlaceholderText('Enter City')).toHaveValue('');
        // Check helper message appears
        expect(screen.getByText('Would you like to add another city? (up to 3 total)')).toBeInTheDocument();
    });

    it('shows length validation warning only on submit', async () => {
        render(<WeatherScene />);

        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: 'Lo' }
        });

        // No warning yet while typing
        expect(screen.queryByText(/at least 3 characters/i)).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Add City' })); 
        expect(await screen.findByText('City name must be at least 3 characters long')).toBeInTheDocument();
    });


    it('clears validation warning when input is cleared', () => {
        render(<WeatherScene />);

        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: '123$%' }
        });

        expect(screen.getByText('City name must contain only letters and spaces')).toBeInTheDocument();

        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: '' }
        });

        expect(screen.queryByText(/must contain only letters/)).not.toBeInTheDocument();
    });
    // New tests- multiple cities functionality
    it('allows adding multiple cities up to limit', async () => {
        getWeatherAndForecast
            .mockResolvedValueOnce({
                current: { name: 'London', main: { temp: 15 }, weather: [{ description: 'cloudy' }], sys: { country: 'GB' } },
                forecast: { list: [] }
            })
            .mockResolvedValueOnce({
                current: { name: 'Paris', main: { temp: 20 }, weather: [{ description: 'sunny' }], sys: { country: 'FR' } },
                forecast: { list: [] }
            });

        render(<WeatherScene />);
        // Add first city
        fireEvent.change(screen.getByPlaceholderText('Enter City'), { target: { value: 'London' } });
        fireEvent.click(screen.getByRole('button', { name: 'Add City' }));
        await waitFor(() => {
            expect(screen.getByText(/London, 🇬🇧/)).toBeInTheDocument();
        });
        // Add second city
        fireEvent.change(screen.getByPlaceholderText('Enter City'), { target: { value: 'Paris' } });
        fireEvent.click(screen.getByRole('button', { name: 'Add City' }));
        await waitFor(() => {
            expect(screen.getByText(/Paris, 🇫🇷/)).toBeInTheDocument();
        });
        // Both cities should be visible
        expect(screen.getByText(/London, 🇬🇧/)).toBeInTheDocument();
        expect(screen.getByText(/Paris, 🇫🇷/)).toBeInTheDocument();
    });
});