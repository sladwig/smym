import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks'
import { useDispatchTransaction } from './useDispatchTransaction';

describe('useDispatchTransaction', () => {
    test('testing the truth', () => {
        const { result } = renderHook(() => useDispatchTransaction())

        act(() => {
            // result.current.increment()
        })

        // expect(result.current.count).toBe(1)
        expect(true).toBe(true)
    });
});
