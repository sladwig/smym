import { addCaretAt, getCaretOf, withCaretOfOn, hasCaret } from './caret';
import { AnyCharacterT } from '../components/displays/types';

describe('addCaretAtPosition', () => {
    test('works', () => {
        expect(
            addCaretAt(
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

    test('can handle -1 position', () => {
        expect(
            addCaretAt(
                [
                    { type: 'char', value: 'a', position: 0 },
                    { type: 'char', value: 'b', position: 1 },
                    { type: 'white', value: ' ', position: 2 },
                ],
                -1,
            ),
        ).toEqual([
            { type: 'caret' },
            { type: 'char', value: 'a', position: 0 },
            { type: 'char', value: 'b', position: 1 },
            { type: 'white', value: ' ', position: 2 },
        ]);
    });
});

describe('getCaretOf', () => {
    test('works', () => {
        const original = [
            { type: 'char', value: '2', position: 0 },
            { type: 'char', value: '4', position: 1 },
            { type: 'caret' },
            { type: 'char', value: ',', position: 5 },
            { type: 'char', value: '2', position: 2 },
            { type: 'char', value: '4', position: 6 },
        ];
        expect(getCaretOf(original)).toEqual(2);
    });
    test('returns -1 if none', () => {
        const original = [
            { type: 'char', value: '2', position: 0 },
            { type: 'char', value: '4', position: 1 },
            { type: 'char', value: ',', position: 5 },
            { type: 'char', value: '2', position: 2 },
            { type: 'char', value: '4', position: 6 },
        ];
        expect(getCaretOf(original)).toEqual(-1);
    });
});

describe('hasCaret', () => {
    test('works', () => {
        const original = [
            { type: 'char', value: '2', position: 0 },
            { type: 'char', value: '4', position: 1 },
            { type: 'caret' },
            { type: 'char', value: ',', position: 5 },
            { type: 'char', value: '2', position: 2 },
            { type: 'char', value: '4', position: 6 },
        ];
        expect(hasCaret(original)).toBeTrue();
    });
    test('returns -1 if none', () => {
        const original = [
            { type: 'char', value: '2', position: 0 },
            { type: 'char', value: '4', position: 1 },
            { type: 'char', value: ',', position: 5 },
            { type: 'char', value: '2', position: 2 },
            { type: 'char', value: '4', position: 6 },
        ];
        expect(hasCaret(original)).toBeFalse();
    });
});

describe('withCaretOfOn', () => {
    test('works', () => {
        const original: AnyCharacterT[] = [
            { type: 'char', value: '2', position: 0 },
            { type: 'char', value: '4', position: 1 },
            { type: 'caret' },
            { type: 'char', value: ',', position: 5 },
            { type: 'char', value: '2', position: 2 },
            { type: 'char', value: '4', position: 6 },
        ];
        const somethingElse: AnyCharacterT[] = [
            { type: 'char', value: '4', position: 0 },
            { type: 'char', value: '2', position: 1 },
            { type: 'char', value: ',', position: 5 },
            { type: 'char', value: '4', position: 2 },
            { type: 'char', value: '2', position: 6 },
        ];

        expect(withCaretOfOn(original, somethingElse)).toEqual([
            { type: 'char', value: '4', position: 0 },
            { type: 'char', value: '2', position: 1 },
            { type: 'caret' },
            { type: 'char', value: ',', position: 5 },
            { type: 'char', value: '4', position: 2 },
            {
                type: 'char',
                value: '2',
                position: 6,
            },
        ]);
    });
});
