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
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders initial form state correctly', () => {
        render(<WeatherScene />);
        expect(screen.getByPlaceholderText('Enter City')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });

    it('displays error message when API call fails', async () => {
        getWeatherAndForecast.mockRejectedValueOnce(new Error('API failure'));

        render(<WeatherScene />);
        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: 'Atlantis' }
        });
        fireEvent.click(screen.getByRole('button', { name: 'Search' }));

        await waitFor(() => {
            expect(screen.getByText('API failure')).toBeInTheDocument();
        });
    });

    // for cities not found by API
    it('shows not found error message for city not found by API', async () => {
        getWeatherAndForecast.mockRejectedValueOnce(
            new Error('"Atlantisss" not found. Check spelling and try again.')
        );

        render(<WeatherScene />);
        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: 'Atlantisss' }
        });
        fireEvent.click(screen.getByRole('button', { name: 'Search' }));

        expect(await screen.findByText('"Atlantisss" not found. Check spelling and try again.')).toBeInTheDocument();
    });

    // blocks numeric input before hitting 'submit' button
    it('shows validation warning for numeric-only input', async () => {
        render(<WeatherScene />);

        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: '12345' }
        });

        expect(screen.getByText('City name must contain only letters and spaces')).toBeInTheDocument();
    });

    // blocks mixed input like Paris23
    it('shows validation warning for mixed letters and numbers', async () => {
        render(<WeatherScene />);

        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: 'Paris12' }
        });

        expect(screen.getByText('City name must contain only letters and spaces')).toBeInTheDocument();
    });

    // trims whitespace still works
    it('trims whitespace and submits valid city name', async () => {
        getWeatherAndForecast.mockResolvedValueOnce({
            current: {
                name: 'Paris',
                main: { temp: 20, feels_like: 18, humidity: 65 },
                weather: [{ description: 'clear sky' }],
                sys: { country: 'FR' }
            },
            forecast: {
                list: []  // mock forecast data as needed here
            }
        });
        render(<WeatherScene />);

        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: '   Paris  ' }
        });

        fireEvent.click(screen.getByRole('button', { name: 'Search' }));

        expect(await screen.findByText(/Paris/)).toBeInTheDocument();
    });

    // shows length error on submit
    it('shows length validation warning only on submit', async () => {
        render(<WeatherScene />);

        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: 'Lo' }
        });

        // No warning yet while typing
        expect(screen.queryByText(/at least 3 characters/i)).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Search' }));

        expect(await screen.findByText('City name must be at least 3 characters long')).toBeInTheDocument();
    });


    // clears validation warning when input cleared
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
});
