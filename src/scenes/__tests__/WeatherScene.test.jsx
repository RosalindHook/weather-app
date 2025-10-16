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
});
