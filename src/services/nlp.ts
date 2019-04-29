interface ValueObject {
    name: string | undefined;
    value: number | 'reset' | undefined;
    description: string | undefined;
}
interface SplitAnalysis {
    hasValue: boolean;
    hasMinusValue: boolean;
    hasDescription: boolean;
    hasName: boolean;
    hasPaid: boolean;
}
interface AnalyzeResult {
    isComplete: boolean;
    value: ValueObject;
}
interface SplitChecker {
    check: (sa: SplitAnalysis) => boolean;
    resulting: (splits: string[]) => AnalyzeResult;
}
export const analyze = (str: string): AnalyzeResult => {
    const splits = str.trim().split(' ');
    const checkedSplits = checkSplits(splits);

    const testCases: SplitChecker[] = [
        normalTransaction,
        paidMinusTransaction,
        paidWithDescriptionTransaction,
        paidTransaction,
        paidSomeValueTransaction,
        unComplete,
    ];

    const theCase = testCases.find(checker => {
        return checker.check(checkedSplits);
    });

    return (theCase as SplitChecker).resulting(splits);
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

export const checkSplits = (splits: string[]): SplitAnalysis => {
    return {
        hasName: splits.some(isName),
        hasPaid: splits.some(isPaid),
        hasValue: splits.some(isNumber),
        hasMinusValue: splits.some(isMinusNumber),
        hasDescription: splits.some(isDescription),
    };
};

const normalTransaction: SplitChecker = {
    check: (sa: SplitAnalysis) => {
        return sa.hasName && !sa.hasPaid && sa.hasValue && sa.hasDescription;
    },
    resulting: (splits: string[]) => ({
        isComplete: true,
        value: {
            name: extractName(splits),
            value: extractValue(splits),
            description: extractDescription(splits),
        },
    }),
};
const paidTransaction: SplitChecker = {
    check: (sa: SplitAnalysis) => {
        return sa.hasName && sa.hasPaid && !sa.hasValue && !sa.hasDescription;
    },
    resulting: (splits: string[]) => ({
        isComplete: true,
        value: {
            name: extractName(splits),
            value: 'reset',
            description: 'paid',
        },
    }),
};

const paidWithDescriptionTransaction: SplitChecker = {
    check: (sa: SplitAnalysis) => {
        return sa.hasName && sa.hasPaid && !sa.hasValue && sa.hasDescription;
    },
    resulting: (splits: string[]) => ({
        isComplete: true,
        value: {
            name: extractName(splits),
            value: 'reset',
            description: extractDescription(splits),
        },
    }),
};

const paidSomeValueTransaction: SplitChecker = {
    check: (sa: SplitAnalysis) => {
        return sa.hasName && sa.hasPaid && sa.hasValue && !sa.hasDescription;
    },
    resulting: (splits: string[]) => ({
        isComplete: true,
        value: {
            name: extractName(splits),
            value: (extractValue(splits) || 0) * -1,
            description: 'paid',
        },
    }),
};

const paidMinusTransaction: SplitChecker = {
    check: (sa: SplitAnalysis) => {
        return sa.hasName && sa.hasValue && sa.hasMinusValue && !sa.hasDescription;
    },
    resulting: (splits: string[]) => ({
        isComplete: true,
        value: {
            name: extractName(splits),
            value: extractValue(splits),
            description: 'paid',
        },
    }),
};

const unComplete: SplitChecker = {
    check: (sa: SplitAnalysis) => {
        return true;
    },
    resulting: (splits: string[]) => ({
        isComplete: false,
        value: {
            name: extractName(splits),
            value: extractValue(splits),
            description: extractDescription(splits),
        },
    }),
};

const extractName = (splits: string[]) => {
    const possibleName = splits.find(isName);

    return possibleName ? possibleName.slice(1) : undefined;
};

const extractValue = (splits: string[]) => {
    let possibleNumber = splits.find(isNumber);

    return possibleNumber ? asNumber(possibleNumber) : undefined;
};

const extractDescription = (splits: string[]) => {
    const possibleDecription = splits
        .filter(split => !isName(split) && !isNumber(split))
        .filter(str => str !== '');

    return possibleDecription.length > 0 ? possibleDecription.join(' ') : undefined;
};
