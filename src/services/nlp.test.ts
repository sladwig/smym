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
    Split,
    AnalyzeResult,
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
const splitTest = (toBeAnalysed: string, testFunction: (splits: string[]) => any) =>
    test(toBeAnalysed, () => testFunction(toBeAnalysed.split(' ')));

describe('checkSplits', () => {
    splitTest('@stefanl marw 3.99', splits => {
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: false,
            hasValue: true,
            hasMinusValue: false,
            hasDescription: true,
        });
    });

    splitTest('marw @stefanl 3,99 deluxe', splits => {
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: false,
            hasValue: true,
            hasMinusValue: false,
            hasDescription: true,
        });
    });

    splitTest('@stefanl paid', splits => {
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: true,
            hasValue: false,
            hasMinusValue: false,
            hasDescription: false,
        });
    });

    splitTest('paid @stefanl', splits => {
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: true,
            hasValue: false,
            hasMinusValue: false,
            hasDescription: false,
        });
    });

    splitTest('paid @stefanl 7', splits => {
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: true,
            hasValue: true,
            hasMinusValue: false,
            hasDescription: false,
        });
    });

    splitTest('@stefanl -3.50', splits => {
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: false,
            hasValue: true,
            hasMinusValue: true,
            hasDescription: false,
        });
    });

    splitTest('@stefanl -3.50 other reason', splits => {
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: false,
            hasValue: true,
            hasMinusValue: true,
            hasDescription: true,
        });
    });

    splitTest('@stefanl paid 30 jiji', splits => {
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: true,
            hasValue: true,
            hasMinusValue: false,
            hasDescription: true,
        });
    });

    splitTest('@stefanl paid -30 jiji', splits => {
        const result = checkSplits(splits);
        expect(result).toEqual({
            hasName: true,
            hasPaid: true,
            hasValue: true,
            hasMinusValue: true,
            hasDescription: true,
        });
    });
});

const analyzeTest = (toBeAnalysed: string, testFunction: (splits: AnalyzeResult) => any) =>
    test(toBeAnalysed, () => testFunction(analyze(toBeAnalysed)));

describe('valid', () => {
    analyzeTest('@stefanl marw 3.99', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'marw',
            value: 3.99,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Split.name, Split.description, Split.value]);
    });
    analyzeTest('marw @stefanl 3,99 deluxe', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'marw deluxe',
            value: 3.99,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([
            Split.description,
            Split.name,
            Split.value,
            Split.description,
        ]);
    });
    analyzeTest('marw 3 @stefanl', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'marw',
            value: 3,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Split.description, Split.value, Split.name]);
    });
    analyzeTest('@stefanl paid', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid',
            value: 'reset',
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Split.name, Split.paid]);
    });
    analyzeTest('paid @stefanl', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid',
            value: 'reset',
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Split.paid, Split.name]);
    });

    analyzeTest('paid @stefanl 7', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid',
            value: -7,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Split.paid, Split.name, Split.value]);
    });

    analyzeTest('paid @stefanl for it', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid for it',
            value: 'reset',
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([
            Split.paid,
            Split.name,
            Split.description,
            Split.description,
        ]);
    });

    analyzeTest('paid 3.99 @stefanl for it', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid for it',
            value: -3.99,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([
            Split.paid,
            Split.value,
            Split.name,
            Split.description,
            Split.description,
        ]);
    });

    analyzeTest('@stefanl paid -3.99 for it', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid for it',
            value: -3.99,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([
            Split.name,
            Split.paid,
            Split.minusValue,
            Split.description,
            Split.description,
        ]);
    });

    analyzeTest('@stefanl -3.50', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid',
            value: -3.5,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Split.name, Split.minusValue]);
    });
    analyzeTest('@stefanl -3.50 other reason', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'other reason',
            value: -3.5,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([
            Split.name,
            Split.minusValue,
            Split.description,
            Split.description,
        ]);
    });

    analyzeTest('@stefanl paid 30 jiji', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid jiji',
            value: -30,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Split.name, Split.paid, Split.value, Split.description]);
    });

    // double minus should still be minus
    analyzeTest('@stefanl paid -30 jiji', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid jiji',
            value: -30,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([
            Split.name,
            Split.paid,
            Split.minusValue,
            Split.description,
        ]);
    });
});

describe('partial invalid', () => {
    analyzeTest('@stefanl', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: '',
            value: 0,
        });
        expect(result.isComplete).toBe(false);
        expect(result.tokens).toEqual([Split.name]);
    });

    analyzeTest('3.99', result => {
        expect(result.value).toEqual({
            name: '',
            description: '',
            value: 3.99,
        });
        expect(result.isComplete).toBe(false);
        expect(result.tokens).toEqual([Split.value]);
    });

    analyzeTest('some reason', result => {
        expect(result.value).toEqual({
            name: '',
            description: 'some reason',
            value: 0,
        });
        expect(result.isComplete).toBe(false);
        expect(result.tokens).toEqual([Split.description, Split.description]);
    });

    analyzeTest('-3.50 other reason', result => {
        expect(result.value).toEqual({
            name: '',
            description: 'other reason',
            value: -3.5,
        });
        expect(result.isComplete).toBe(false);
        expect(result.tokens).toEqual([Split.minusValue, Split.description, Split.description]);
    });
    analyzeTest('@stefanl other reason', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'other reason',
            value: 0,
        });
        expect(result.isComplete).toBe(false);
        expect(result.tokens).toEqual([Split.name, Split.description, Split.description]);
    });
});
