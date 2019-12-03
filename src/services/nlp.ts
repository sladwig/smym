import { tokenize, split, reduce } from './parser';
import { Token } from './tokens';

export interface ValueObject {
    name: string;
    value: number | 'reset';
    description: string;
}
export interface AnalyzeResult {
    isComplete: boolean;
    value: ValueObject;
    tokens: Token[];
}

export const analyze = (str: string): AnalyzeResult => {
    const tokens = split(str.trim()).map(tokenize);
    return reduce(tokens);
};

export const isName = (str: string) => str.startsWith('@');
export const isNumber = (str: string) => !isNaN(parseFloat(replaceComma(str)));

export const isMinusNumber = (str: string) => {
    const possibleNumber = parseFloat(replaceComma(str));
    return isNumber(str) && possibleNumber < 0;
};

export const isPaid = (str: string) => str === 'paid';
export const replaceComma = (str: string) => str.replace(',', '.');
export const isDescription = (str: string) => !isName(str) && !isNumber(str) && !isPaid(str);
export const asNumber = (str: string) => parseFloat(replaceComma(str));
export const asName = (_: string) => _.slice(1);
