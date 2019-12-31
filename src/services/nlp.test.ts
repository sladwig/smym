import {
    analyze,
    isName,
    isNumber,
    asNumber,
    isPaid,
    isDescription,
    isMinusNumber,
    replaceComma,
    AnalyzeResult,
} from './nlp';
import { Name, Desc, Value, Paid, Minus } from './tokens';

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
        expect(result.tokens).toEqual([Name('stefanl'), Desc('marw'), Value(3.99)]);
    });
    analyzeTest('marw @stefanl 3,99 deluxe', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'marw deluxe',
            value: 3.99,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Desc('marw'), Name('stefanl'), Value(3.99), Desc('deluxe')]);
    });
    analyzeTest('marw 3 @stefanl', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'marw',
            value: 3,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Desc('marw'), Value(3), Name('stefanl')]);
    });
    analyzeTest('@stefanl paid', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid',
            value: 'reset',
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Name('stefanl'), Paid()]);
    });
    analyzeTest('paid @stefanl', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid',
            value: 'reset',
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Paid(), Name('stefanl')]);
    });

    analyzeTest('paid @stefanl 7', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid',
            value: -7,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Paid(), Name('stefanl'), Value(7)]);
    });

    analyzeTest('paid @stefanl for it', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid for it',
            value: 'reset',
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Paid(), Name('stefanl'), Desc('for'), Desc('it')]);
    });

    analyzeTest('paid 3.99 @stefanl for it', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid for it',
            value: -3.99,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([
            Paid(),
            Value(3.99),
            Name('stefanl'),
            Desc('for'),
            Desc('it'),
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
            Name('stefanl'),
            Paid(),
            Minus(-3.99),
            Desc('for'),
            Desc('it'),
        ]);
    });

    analyzeTest('@stefanl -3.50', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid',
            value: -3.5,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Name('stefanl'), Minus(-3.5)]);
    });
    analyzeTest('@stefanl -3.50 other reason', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'other reason',
            value: -3.5,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([
            Name('stefanl'),
            Minus(-3.5),
            Desc('other'),
            Desc('reason'),
        ]);
    });

    analyzeTest('@stefanl paid 30 jiji', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid jiji',
            value: -30,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Name('stefanl'), Paid(), Value(30), Desc('jiji')]);
    });

    // double minus should still be minus
    analyzeTest('@stefanl paid -30 jiji', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'paid jiji',
            value: -30,
        });
        expect(result.isComplete).toBe(true);
        expect(result.tokens).toEqual([Name('stefanl'), Paid(), Minus(-30), Desc('jiji')]);
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
        expect(result.tokens).toEqual([Name('stefanl')]);
    });

    analyzeTest('3.99', result => {
        expect(result.value).toEqual({
            name: '',
            description: '',
            value: 3.99,
        });
        expect(result.isComplete).toBe(false);
        expect(result.tokens).toEqual([Value(3.99)]);
    });

    analyzeTest('some reason', result => {
        expect(result.value).toEqual({
            name: '',
            description: 'some reason',
            value: 0,
        });
        expect(result.isComplete).toBe(false);
        expect(result.tokens).toEqual([Desc('some'), Desc('reason')]);
    });

    analyzeTest('-3.50 other reason', result => {
        expect(result.value).toEqual({
            name: '',
            description: 'other reason',
            value: -3.5,
        });
        expect(result.isComplete).toBe(false);
        expect(result.tokens).toEqual([Minus(-3.5), Desc('other'), Desc('reason')]);
    });
    analyzeTest('@stefanl other reason', result => {
        expect(result.value).toEqual({
            name: 'stefanl',
            description: 'other reason',
            value: 0,
        });
        expect(result.isComplete).toBe(false);
        expect(result.tokens).toEqual([Name('stefanl'), Desc('other'), Desc('reason')]);
    });
});
