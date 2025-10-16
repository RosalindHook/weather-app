import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherScene from '../WeatherScene';
import { getCurrentWeather } from '../../services/weatherAPI';

// Mock the getCurrentWeather function
vi.mock('../../services/weatherAPI', () => ({
    getCurrentWeather: vi.fn()
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
        getCurrentWeather.mockRejectedValueOnce(new Error('API failure'));

        render(<WeatherScene />);
        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: 'Atlantis' }
        });
        fireEvent.click(screen.getByRole('button', { name: 'Search' }));

        await waitFor(() => {
            expect(screen.getByText('API failure')).toBeInTheDocument();
        });
    });

    it('shows not found error message for invalid city input that fails API', async () => {
        // Mock getCurrentWeather to throw the user-friendly 404 error
        getCurrentWeather.mockRejectedValueOnce(
            new Error('"123df" not found. Check spelling and try again.')
        );

        render(<WeatherScene />);

        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: '123df' }
        });
        fireEvent.click(screen.getByRole('button', { name: 'Search' }));

        // Check if the custom error message appears on screen
        const expectedErrorMsg = `"123df" not found. Check spelling and try again.`;
        expect(await screen.findByText(expectedErrorMsg)).toBeInTheDocument();
    });
});

