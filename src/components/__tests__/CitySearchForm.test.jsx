import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import CitySearchForm from '../forms/CitySearchForm';

describe('CitySearchForm', () => {
    const defaultProps = {
        city: '',
        validationWarning: '',
        loading: false,
        citiesCount: 0,
        onInputChange: vi.fn(),
        onSubmit: vi.fn()
    };

    it('renders form elements correctly', () => {
        render(<CitySearchForm {...defaultProps} />);
        expect(screen.getByPlaceholderText('Enter City')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Add City' })).toBeInTheDocument();
    });

    it('disables button when loading', () => {
        render(<CitySearchForm {...defaultProps} loading={true} />);
        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('disables button when max cities reached', () => {
        render(<CitySearchForm {...defaultProps} citiesCount={3} />);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('shows validation warning when provided', () => {
        render(<CitySearchForm {...defaultProps} validationWarning="Invalid city" />);
        expect(screen.getByText('Invalid city')).toBeInTheDocument();
    });

    it('calls onInputChange when typing', () => {
        const mockOnInputChange = vi.fn();
        render(<CitySearchForm {...defaultProps} onInputChange={mockOnInputChange} />);
        fireEvent.change(screen.getByPlaceholderText('Enter City'), {
            target: { value: 'Paris' }
        });
        expect(mockOnInputChange).toHaveBeenCalled();
    });
});