import { useState } from 'react';

// Custom hook to store and retrieve data in localStorage
const useLocalStorage = (key, initialValue) => {
    // Retrieve stored value from localStorage, or use initialValue if not found
    const storedValue = localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : initialValue;

    // Create state to store the value
    const [value, setValue] = useState(storedValue);

    // Update localStorage and state when value changes
    const updateValue = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, updateValue];
};

export default useLocalStorage;
