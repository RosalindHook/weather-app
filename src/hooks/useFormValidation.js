import { useState } from 'react';

export const useFormValidation = () => {
    const [city, setCity] = useState('');
    const [validationWarning, setValidationWarning] = useState(null);
    const [touched, setTouched] = useState(false);

    // Client-side input validation
    const validateInput = (input, { fullCheck = false } = {}) => {
        const trimmed = input.trim();

        if (!trimmed) {     // guard clause - checks if input empty after trimming white space
            return 'Please enter a city name';
        }

        // Only enforce 3+ chars during submit
        if (fullCheck && trimmed.length < 3) {
            return 'City name must be at least 3 characters long';
        }

        // Regex to allow only letters and spaces (including accented letters)
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(trimmed)) {
            return 'City name must contain only letters and spaces';
        }

        return null;
    };

    const handleInputChange = (e, onErrorClear) => {
        const value = e.target.value;
        setCity(value); // Update input value state

        const hasTyped = value.trim() !== '';         // Has the user typed anything (ignores whitespace)?
        const willBeTouched = touched || hasTyped;    // Predict if the field is (or will be) considered 'touched'

        // If the field isn't touched yet but the user has typed something, mark it as touched
        if (hasTyped && !touched) {
            setTouched(true);
        }

        // Run validation in partial mode (i.e. only format checks, not length)
        const warning = validateInput(value, { fullCheck: false });

        // Show validation warning only if:
        // - the user has interacted with the field (touched or will be)
        // - AND the input isn’t blank (to avoid warnings while retrying)
        if (willBeTouched && hasTyped) {
            setValidationWarning(warning);  // Set warning if input is invalid
        } else {
            setValidationWarning(null);     // Clear warning otherwise
        }
        // Clear any existing API error (from a previous failed submission)
        if (onErrorClear) onErrorClear();
    };

    const validateForSubmit = () => {
        const warning = validateInput(city, { fullCheck: true });
        setValidationWarning(warning);
        return !warning; // return true if valid
    };

    const resetForm = () => {
        setCity('');
        setTouched(false);
        setValidationWarning(null);
    };

    return {
        city,
        validationWarning,
        touched,
        handleInputChange,
        validateForSubmit,
        resetForm
    };
};