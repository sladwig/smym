import { Value, Minus, Desc, Paid, Name, TokenType } from './tokens';

describe('valueToken', () => {
    test('value(3.99)', () => {
        expect(Value(3.99)).toEqual({ numValue: 3.99, type: TokenType.value });
    });
});

describe('minusToken', () => {
    test('minus(-3.99)', () => {
        expect(Minus(-3.99)).toEqual({
            numValue: -3.99,
            optionalDescription: 'paid',
            type: TokenType.minus,
        });
    });
});

describe('descriptionToken', () => {
    test('desc("abc")', () => {
        expect(Desc('abc')).toEqual({ description: 'abc', type: TokenType.desc });
    });
});

describe('paidToken', () => {
    test('paid(-3.99)', () => {
        expect(Paid()).toEqual({
            impliedValue: 'reset',
            description: 'paid',
            type: TokenType.paid,
        });
    });
});

describe('nameToken', () => {
    test('userName("@abc")', () => {
        expect(Name('abc')).toEqual({ name: 'abc', type: TokenType.name });
    });
});
