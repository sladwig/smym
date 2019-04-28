import {
    analyze,
    isName,
    isNumber,
    asNumber,
    isPaid,
    isDescription,
    isMinusNumber,
    checkSplits,
    replaceComma,
} from './nlp';

describe('helpers', () => {
    test('isName', () => {
        expect(isName('@stefanl')).toBe(true);
        expect(isName('stefanl')).toBe(false);
    });

    test('replaceComma', () => {
        expect(replaceComma('2')).toEqual('2');
        expect(replaceComma('3.99')).toEqual('3.99');
        expect(replaceComma('3,99')).toEqual('3.99');
        expect(replaceComma('-5.99')).toEqual('-5.99');
        expect(replaceComma('-3,50')).toEqual('-3.50');
        expect(replaceComma('stefanl')).toEqual('stefanl');
    });

    test('isNumber', () => {
        expect(isNumber('2')).toBe(true);
        expect(isNumber('3.99')).toBe(true);
        expect(isNumber('3,99')).toBe(true);
        expect(isNumber('-5.99')).toBe(true);
        expect(isNumber('-3,50')).toBe(true);
        expect(isNumber('stefanl')).toBe(false);
    });

    test('isMinusNumber', () => {
        expect(isMinusNumber('2')).toBe(false);
        expect(isMinusNumber('3.99')).toBe(false);
        expect(isMinusNumber('3,99')).toBe(false);
        expect(isMinusNumber('-5.99')).toBe(true);
        expect(isMinusNumber('-3,50')).toBe(true);
        expect(isMinusNumber('stefanl')).toBe(false);
    });

    test('asNumber', () => {
        expect(asNumber('2')).toBe(2);
        expect(asNumber('3.99')).toBe(3.99);
        expect(asNumber('3,99')).toBe(3.99);
        expect(asNumber('-5.99')).toBe(-5.99);
        expect(asNumber('stefanl')).toBe(NaN); //check!
    });

    test('isPaid', () => {
        expect(isPaid('paid')).toBe(true);
        expect(isPaid('paidl')).toBe(false);
        expect(isPaid('3,99')).toBe(false);
    });

    test('isDescription', () => {
        expect(isDescription('paid')).toBe(false);
        expect(isDescription('paidl')).toBe(true);
        expect(isDescription('3,99')).toBe(false);
        expect(isDescription('-3,99')).toBe(false);
        expect(isDescription('@abc')).toBe(false);
    });
});

describe('checkSplits', () => {
    test('@stefanl marw 3.99', () => {
        const splits = '@stefanl marw 3.99'.split(' ');
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: false,
            hasValue: true,
            hasMinusValue: false,
            hasDescription: true,
        });
    });

    test('marw @stefanl 3,99 deluxe', () => {
        const splits = 'marw @stefanl 3,99 deluxe'.split(' ');
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: false,
            hasValue: true,
            hasMinusValue: false,
            hasDescription: true,
        });
    });

    test('@stefanl paid', () => {
        const splits = '@stefanl paid'.split(' ');
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: true,
            hasValue: false,
            hasMinusValue: false,
            hasDescription: false,
        });
    });

    test('paid @stefanl', () => {
        const splits = 'paid @stefanl'.split(' ');
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: true,
            hasValue: false,
            hasMinusValue: false,
            hasDescription: false,
        });
    });

    test('paid @stefanl 7', () => {
        const splits = 'paid @stefanl 7'.split(' ');
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: true,
            hasValue: true,
            hasMinusValue: false,
            hasDescription: false,
        });
    });

    test('@stefanl -3.50', () => {
        const splits = '@stefanl -3.50'.split(' ');
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: false,
            hasValue: true,
            hasMinusValue: true,
            hasDescription: false,
        });
    });

    test('@stefanl -3.50 other reason', () => {
        const splits = '@stefanl -3.50 other reason'.split(' ');
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: false,
            hasValue: true,
            hasMinusValue: true,
            hasDescription: true,
        });
    });
});

describe('valid', () => {
    test('@stefanl marw 3.99', () => {
        const result = analyze('@stefanl marw 3.99');
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'marw',
            value: 3.99,
        });
        expect(result.isComplete).toBe(true);
    });
    test('marw @stefanl 3,99 deluxe', () => {
        const result = analyze('marw @stefanl 3,99 deluxe');
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'marw deluxe',
            value: 3.99,
        });
        expect(result.isComplete).toBe(true);
    });
    test('marw 3 @stefanl', () => {
        const result = analyze('marw 3 @stefanl');
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'marw',
            value: 3,
        });
        expect(result.isComplete).toBe(true);
    });
    test('@stefanl paid', () => {
        const result = analyze('@stefanl paid');
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid',
            value: 'reset',
        });
        expect(result.isComplete).toBe(true);
    });
    test('paid @stefanl', () => {
        const result = analyze('paid @stefanl');
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid',
            value: 'reset',
        });
        expect(result.isComplete).toBe(true);
    });

    test('paid @stefanl 7', () => {
        const result = analyze('paid @stefanl 7');
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid',
            value: -7,
        });
        expect(result.isComplete).toBe(true);
    });
    test('@stefanl -3.50', () => {
        const result = analyze('@stefanl -3.50');
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid',
            value: -3.5,
        });
        expect(result.isComplete).toBe(true);
    });
    test('@stefanl -3.50 other reason', () => {
        const result = analyze('@stefanl -3.50 other reason');
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'other reason',
            value: -3.5,
        });
        expect(result.isComplete).toBe(true);
    });
});

describe('partial invalid', () => {
    test('@stefanl', () => {
        const result = analyze('@stefanl');
        expect(result.value).toEqual({
            name: 'stefanl',
            description: undefined,
            value: undefined,
        });
        expect(result.isComplete).toBe(false);
    });

    test('3.99', () => {
        const result = analyze('3.99');
        expect(result.value).toEqual({
            name: undefined,
            description: undefined,
            value: 3.99,
        });
        expect(result.isComplete).toBe(false);
    });

    test('some reason', () => {
        const result = analyze('some reason');
        expect(result.value).toEqual({
            name: undefined,
            description: 'some reason',
            value: undefined,
        });
        expect(result.isComplete).toBe(false);
    });

    test('-3.50 other reason', () => {
        const result = analyze('-3.50 other reason');
        expect(result.value).toEqual({
            name: undefined,
            description: 'other reason',
            value: -3.5,
        });
        expect(result.isComplete).toBe(false);
    });
    test('@stefanl other reason', () => {
        const result = analyze('@stefanl other reason');
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'other reason',
            value: undefined,
        });
        expect(result.isComplete).toBe(false);
    });
});
