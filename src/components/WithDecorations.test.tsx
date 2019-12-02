import { render } from '@testing-library/react';
import React from 'react';
import { WithDecorations, asChars, asWords, addCaretAtPosition } from './WithDecorations';

describe('WithDecorations', () => {
    test('renders', () => {
        const { container } = render(<WithDecorations value="abc" />);
        expect(container).toMatchSnapshot();
    });
});

describe('asChars', () => {
    test('works', () => {
        expect(asChars('ab g')).toEqual([
            { type: 'char', value: 'a', position: 0 },
            { type: 'char', value: 'b', position: 1 },
            { type: 'white', value: ' ', position: 2 },
            { type: 'char', value: 'g', position: 3 },
        ]);
    });
});

describe('asWords', () => {
    test('works', () => {
        expect(asWords(asChars('ab g'))).toEqual([
            {
                type: 'word',
                value: 'ab',
                characters: [
                    { type: 'char', value: 'a', position: 0 },
                    { type: 'char', value: 'b', position: 1 },
                    { type: 'white', value: ' ', position: 2 },
                ],
                position: 0,
            },
            {
                type: 'word',
                value: 'g',
                characters: [{ type: 'char', value: 'g', position: 3 }],
                position: 1,
            },
        ]);
    });
});

describe('addCaretAtPosition', () => {
    test('works', () => {
        expect(
            addCaretAtPosition(
                [
                    { type: 'char', value: 'a', position: 0 },
                    { type: 'char', value: 'b', position: 1 },
                    { type: 'white', value: ' ', position: 2 },
                ],
                1,
            ),
        ).toEqual([
            { type: 'char', value: 'a', position: 0 },
            { type: 'caret' },
            { type: 'char', value: 'b', position: 1 },
            { type: 'white', value: ' ', position: 2 },
        ]);
    });
});
