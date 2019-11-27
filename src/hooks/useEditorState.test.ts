import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks'
import { useEditorState } from './useEditorState';

describe('useEditorState', () => {
    test('testing the truth', () => {
        const { result } = renderHook(() => useEditorState())

        act(() => {
            // result.current.increment()
        })

        // expect(result.current.count).toBe(1)
        expect(true).toBe(true)
    });
});
