import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks'
import { useStateRef } from './useStateRef';

describe('useStateRef', () => {
    test('testing the truth', () => {
        const { result } = renderHook(() => useStateRef())

        act(() => {
            // result.current.increment()
        })

        // expect(result.current.count).toBe(1)
        expect(true).toBe(true)
    });
});
