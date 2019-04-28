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
interface Checker {
    check: (sa: SplitAnalysis) => boolean;
    resulting: (splits: string[]) => AnalyzeResult;
}
export const analyze = (str: string): AnalyzeResult => {
    const splits = str.split(' ');
    const checkedSplits = checkSplits(splits);

    const testCases: Checker[] = [
        normalTransaction,
        paidMinusTransaction,
        paidTransaction,
        paidSomeValueTransaction,
        unComplete,
    ];

    const theCase = testCases.find(checker => {
        return checker.check(checkedSplits);
    });

    return (theCase as Checker).resulting(splits);
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

const normalTransaction: Checker = {
    check: (sa: SplitAnalysis) => {
        return sa.hasName && !sa.hasPaid && sa.hasValue && sa.hasDescription;
    },
    resulting: (splits: string[]) => ({
        isComplete: true,
        value: {
            name: checkForName(splits).result(),
            value: checkForValue(splits).result(),
            description: checkForDescription(splits).result(),
        },
    }),
};
const paidTransaction: Checker = {
    check: (sa: SplitAnalysis) => {
        return sa.hasName && sa.hasPaid && !sa.hasValue && !sa.hasDescription;
    },
    resulting: (splits: string[]) => ({
        isComplete: true,
        value: {
            name: checkForName(splits).result(),
            value: 'reset',
            description: 'paid',
        },
    }),
};

const paidSomeValueTransaction: Checker = {
    check: (sa: SplitAnalysis) => {
        return sa.hasName && sa.hasPaid && sa.hasValue && !sa.hasDescription;
    },
    resulting: (splits: string[]) => ({
        isComplete: true,
        value: {
            name: checkForName(splits).result(),
            value: (checkForValue(splits).result() || 0) * -1,
            description: 'paid',
        },
    }),
};

const paidMinusTransaction: Checker = {
    check: (sa: SplitAnalysis) => {
        return sa.hasName && sa.hasValue && sa.hasMinusValue && !sa.hasDescription;
    },
    resulting: (splits: string[]) => ({
        isComplete: true,
        value: {
            name: checkForName(splits).result(),
            value: checkForValue(splits).result(),
            description: 'paid',
        },
    }),
};

const unComplete: Checker = {
    check: (sa: SplitAnalysis) => {
        return true;
    },
    resulting: (splits: string[]) => ({
        isComplete: false,
        value: {
            name: checkForName(splits).result(),
            value: checkForValue(splits).result(),
            description: checkForDescription(splits).result(),
        },
    }),
};

const checkForName = (splits: string[]) => {
    const possibleName = splits.find(isName);

    return {
        result: () => {
            return possibleName ? possibleName.slice(1) : undefined;
        },
    };
};

const checkForValue = (splits: string[]) => {
    let possibleNumber = splits.find(isNumber);

    return {
        result: () => {
            return possibleNumber ? asNumber(possibleNumber) : undefined;
        },
    };
};

const checkForDescription = (splits: string[]) => {
    const possibleDecription = splits.filter(split => !isName(split) && !isNumber(split));
    return {
        result: () => {
            return possibleDecription.length > 0 ? possibleDecription.join(' ') : undefined;
        },
    };
};
