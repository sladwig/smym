import { split, join, tokenize, detokenize, reduce, deduce, findOrAdd } from './parser';
import { Desc, Name, Value, Minus, Paid } from './tokens';

// first parsing step
describe('split', () => {
    test('abc def', () => {
        const splits = split('abc def');
        expect(splits).toEqual(['abc', 'def']);
    });
});

describe('join', () => {
    test('abc def', () => {
        const joined = join(['abc', 'def']);
        expect(joined).toEqual('abc def');
    });
});

// second parsing step
test('tokenize', () => {
    expect(tokenize('abc')).toEqual(Desc('abc'));
    expect(tokenize('@name')).toEqual(Name('name'));

    expect(tokenize('3.99')).toEqual(Value(3.99));
    expect(tokenize('3,99')).toEqual(Value(3.99));
    expect(tokenize('-3.99')).toEqual(Minus(-3.99));
    expect(tokenize('-3,99')).toEqual(Minus(-3.99));

    expect(tokenize('paid')).toEqual(Paid());
});

test('detokenize', () => {
    expect(detokenize(Desc('abc'))).toEqual('abc');
    expect(detokenize(Name('name'))).toEqual('@name');

    expect(detokenize(Value(3.99))).toEqual('3.99');
    expect(detokenize(Minus(-3.99))).toEqual('-3.99');

    expect(detokenize(Paid())).toEqual('paid');
});

// third step
test('reduce', () => {
    expect(reduce([Name('stefan'), Value(3)])).toEqual({
        isComplete: true,
        tokens: [Name('stefan'), Value(3)],
        value: {
            name: 'stefan',
            value: 3,
            description: '',
        },
    });
});

test('findOrAdd', () => {
    expect(findOrAdd([Name('Stefan')], Name('Stefanos'))).toEqual([Name('Stefanos')]);
    expect(findOrAdd([Value(22), Name('Stefanos')], Name('Stefan'))).toEqual([
        Value(22),
        Name('Stefan'),
    ]);
});

describe('deduce', () => {
    test('empty tokens', () => {
        expect(
            deduce(
                {
                    name: 'stefan',
                    value: 3,
                    description: 'has',
                },
                [],
            ),
        ).toEqual([Name('stefan'), Desc('has'), Value(3)]);
    });

    test('keep token order', () => {
        expect(
            deduce(
                {
                    name: 'stefan',
                    value: 3,
                    description: 'has',
                },
                [Value(3), Desc('has')],
            ),
        ).toEqual([Value(3), Desc('has'), Name('stefan')]);
    });

    test('fill in multiple descriptions', () => {
        expect(
            deduce(
                {
                    name: 'stefan',
                    value: 3,
                    description: 'has many names',
                },
                [Desc('has'), Value(3), Desc('many'), Name('stefan'), Desc('names')],
            ),
        ).toEqual([Desc('has'), Value(3), Desc('many'), Name('stefan'), Desc('names')]);
    });

    test.only('updates and removes desc', () => {
        expect(
            deduce(
                {
                    name: 'stefanos',
                    value: 9,
                    description: 'i manyyy names',
                },
                [Desc('has'), Value(3), Desc('many'), Name('stefan')],
            ),
        ).toEqual([Desc('i'), Value(9), Desc('manyyy'), Name('stefanos'), Desc('names')]);
    });
});
