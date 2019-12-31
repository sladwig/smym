import { wordAt, minMaxValue, replaceWordAt } from './word';

describe('replaceWordAtEnd', () => {
    test.each`
        aString                  | position | expected
        ${'here have a string!'} | ${8}     | ${['here yay a string!', 8]}
        ${'0123456789'}          | ${3}     | ${['yay ', 4]}
        ${'01234 56789'}         | ${88}    | ${['01234 yay ', 10]}
        ${'01234 56789 '}        | ${88}    | ${['01234 56789 yay ', 16]}
        ${'01234 56789'}         | ${-88}   | ${['yay 56789', 3]}
        ${' 01234 56789'}        | ${-88}   | ${['yay 01234 56789', 3]}
        ${'      '}              | ${3}     | ${['   yay   ', 6]}
    `('can handle `$aString` @ $position', ({ aString, position, expected }) => {
        expect(replaceWordAt(aString, position, 'yay')).toEqual(expected);
    });
});

describe('wordAt', () => {
    test.each`
        aString                  | position | expected
        ${'here have a string!'} | ${8}     | ${[5, 9, 4]}
        ${'0123456789'}          | ${3}     | ${[0, 10, 10]}
        ${'01234 56789'}         | ${88}    | ${[6, 11, 5]}
        ${'01234 56789 '}        | ${88}    | ${[12, 12, 0]}
        ${'01234 56789'}         | ${-88}   | ${[0, 5, 5]}
        ${' 01234 56789'}        | ${-88}   | ${[0, 0, 0]}
        ${'      '}              | ${3}     | ${[3, 3, 0]}
    `('can handle `$aString` @ $position', ({ aString, position, expected }) => {
        expect(wordAt(aString, position)).toEqual(expected);
    });
});

describe('minMaxValue', () => {
    test.each`
        min  | max  | value | expected
        ${0} | ${5} | ${3}  | ${3}
        ${2} | ${5} | ${-3} | ${2}
        ${0} | ${5} | ${42} | ${5}
    `('works with $min $max $value', ({ min, max, value, expected }) => {
        expect(minMaxValue(min, max, value)).toBe(expected);
    });
});
