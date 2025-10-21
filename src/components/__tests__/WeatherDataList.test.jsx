import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherDataList from '../WeatherDataList';

describe('WeatherDataList', () => {
    const mockItems = [
        { term: 'Temperature', value: '20°C', color: '#ff6b35' },
        { term: 'Humidity', value: '65%' },
        { term: 'Condition', value: 'clear sky' }
    ];

    it('renders semantic HTML structure correctly', () => {
        const { container } = render(<WeatherDataList items={mockItems} />);

        // Test that dl element exists (using container query)
        const definitionList = container.querySelector('dl');
        expect(definitionList).toBeInTheDocument();

        // Test dt (definition term) elements
        expect(screen.getByText('Temperature:')).toBeInTheDocument();
        expect(screen.getByText('Humidity:')).toBeInTheDocument();
        expect(screen.getByText('Condition:')).toBeInTheDocument();

        // Test dd (definition description) elements
        expect(screen.getByText('20°C')).toBeInTheDocument();
        expect(screen.getByText('65%')).toBeInTheDocument();
        expect(screen.getByText('clear sky')).toBeInTheDocument();
    });

    it('renders correct HTML structure with dt/dd pairs', () => {
        const { container } = render(<WeatherDataList items={mockItems} />);
        // Check that we have the right number of dt and dd elements
        const dtElements = container.querySelectorAll('dt');
        const ddElements = container.querySelectorAll('dd');
        expect(dtElements).toHaveLength(3);
        expect(ddElements).toHaveLength(3);
    });

    it('applies colors when provided', () => {
        render(<WeatherDataList items={mockItems} />);
        const temperatureValue = screen.getByText('20°C');
        expect(temperatureValue).toHaveStyle({ color: '#ff6b35' });
    });

    it('handles empty items array', () => {
        const { container } = render(<WeatherDataList items={[]} />);
        const definitionList = container.querySelector('dl');
        expect(definitionList).toBeInTheDocument();

        // Should have no dt or dd elements
        const dtElements = container.querySelectorAll('dt');
        const ddElements = container.querySelectorAll('dd');
        expect(dtElements).toHaveLength(0);
        expect(ddElements).toHaveLength(0);
    });

    it('renders items without colors using default styling', () => {
        const itemsWithoutColor = [
            { term: 'Humidity', value: '65%' }
        ];
        render(<WeatherDataList items={itemsWithoutColor} />);
        expect(screen.getByText('Humidity:')).toBeInTheDocument();
        expect(screen.getByText('65%')).toBeInTheDocument();

        // Should use default text color (not have specific color style)
        const humidityValue = screen.getByText('65%');
        expect(humidityValue).not.toHaveStyle({ color: '#ff6b35' });
    });

    it('applies text transform for condition items', () => {
        const conditionItems = [
            { term: 'Condition', value: 'clear sky' }
        ];
        render(<WeatherDataList items={conditionItems} />);
        const conditionValue = screen.getByText('clear sky');
        expect(conditionValue).toHaveStyle({ textTransform: 'capitalize' });
    });
});

