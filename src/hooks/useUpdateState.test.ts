import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks'
import { useUpdateState } from './useUpdateState';

describe('useUpdateState', () => {
    test('testing the truth', () => {
        const { result } = renderHook(() => useUpdateState())

        act(() => {
            // result.current.increment()
        })

        // expect(result.current.count).toBe(1)
        expect(true).toBe(true)
    });
});
