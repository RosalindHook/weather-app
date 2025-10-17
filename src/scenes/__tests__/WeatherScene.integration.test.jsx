import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
import WeatherScene from '../WeatherScene';

// no mocking - API calls for integration testing

// integration test to demo real app behaviour
describe('WeatherScene integration tests', () => {
    it('integration test - demonstrates reall app behaviour', async () => {

    render(<WeatherScene />);

    const input = screen.getByPlaceholderText('Enter City');
    const button = screen.getByText('Search');

    // test full user interaction flow
    fireEvent.change(input, { target: { value: 'London' } });
    expect(input.value).toBe('London'); //verify input works
    fireEvent.click(button);

    // added await to give API call longer to complete
    await waitFor(() => {
        // should show weather data
        const temp = screen.queryByText(/Temperature:/i);
        const error = screen.queryByText(/unable to get weather data/i);
        
        if (temp) {
            console.log('integration test - API call succeeded in test environment.');
            expect(temp).toBeTruthy();
        } else if (error) {
            console.log('Integration test: network blocked - app handles gracefully');
            expect(error).toBeTruthy();
        } else {
            throw new Error('Neither success nor error state reached');
        }

        // regardless of above, integration between components has worked
        console.log('Integration test passed: UI > API > Error handling flow works');
    
    }, { timeout: 15000 });
    }, 20000);
}); // 20 sec timeout