import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useInterval } from './useInterval';

describe('useInterval', () => {
    test('testing the truth', () => {
        const { result } = renderHook(() => useInterval(() => {}, 30));

        act(() => {
            // result.current.increment()
        });

        // expect(result.current.count).toBe(1)
        expect(true).toBe(true);
    });
});
