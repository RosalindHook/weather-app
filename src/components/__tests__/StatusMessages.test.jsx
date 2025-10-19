import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusMessages from '../StatusMessages';

describe('StatusMessages', () => {
    it('shows error message when provided', () => {
        render(<StatusMessages error="API Error" maxLimitReached={false} citiesCount={0} />);
        expect(screen.getByText('API Error')).toBeInTheDocument();
    });

    it('shows max limit message when limit reached', () => {
        render(<StatusMessages error="" maxLimitReached={true} citiesCount={3} />);
        expect(screen.getByText('Maximum 3 cities reached. Remove a city to add another.')).toBeInTheDocument();
    });

    it('shows helper message for partial cities', () => {
        render(<StatusMessages error="" maxLimitReached={false} citiesCount={1} />);
        expect(screen.getByText('Would you like to add another city? (up to 3 total)')).toBeInTheDocument();
    });
});

 