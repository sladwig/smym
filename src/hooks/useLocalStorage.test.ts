import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
    test('testing the truth', () => {
        const { result } = renderHook(() => useLocalStorage('abc', ''));

        act(() => {
            // result.current.increment()
        });

        // expect(result.current.count).toBe(1)
        expect(true).toBe(true);
    });
});
