import { useState, useEffect } from 'react';

export function useStateInLocalStorage(key: string, defaultValue: any) {
    const [value, setValue] = useState(window.localStorage.getItem(key) || defaultValue);
    useEffect(() => {
        window.localStorage.setItem(key, value);
    }, [value, key]);
    return [value, setValue];
}
