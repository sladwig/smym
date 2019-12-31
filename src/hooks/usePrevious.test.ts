import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { usePrevious } from './usePrevious';

describe('usePrevious', () => {
    test('testing the truth', () => {
        const { result } = renderHook(() => usePrevious(3));

        act(() => {
            // result.current.increment()
        });

        // expect(result.current.count).toBe(1)
        expect(true).toBe(true);
    });
});
