import {
    Minus,
    Value,
    Desc,
    Name,
    Paid,
    Token,
    TokenType,
    valueToken,
    minusToken,
    nameToken,
    descriptionToken,
} from './tokens';
import {
    asNumber,
    isName,
    isMinusNumber,
    isNumber,
    isPaid,
    asName,
    AnalyzeResult,
    ValueObject,
} from './nlp';

// split and join
export const split = (_: string) => _.split(' ');
export const join = (_: string[]) => _.join(' ');

// tokenize and detokenize
export const tokenize = (split: string): Token => {
    if (isName(split)) return Name(asName(split));
    if (isMinusNumber(split)) return Minus(asNumber(split));
    if (isNumber(split)) return Value(asNumber(split));
    if (isPaid(split)) return Paid();
    return Desc(split);
};

export const detokenize = (token: Token): string => {
    if (token.type === TokenType.desc) return (token as descriptionToken).description;
    if (token.type === TokenType.paid) return 'paid';
    if (token.type === TokenType.value) return `${(token as valueToken).numValue}`;
    if (token.type === TokenType.minus) return `${(token as minusToken).numValue}`;
    if (token.type === TokenType.name) return `@${(token as nameToken).name}`;
    return '';
};

const by = (type: TokenType) => (_: any) => _.type === type;

const analyseName = (tokens: Token[]): string => {
    const possibleName: any = tokens.find(by(TokenType.name));
    return possibleName ? possibleName.name : '';
};
const analyseDesc = (tokens: Token[]): string => {
    const possibleDescription = tokens
        .filter((_: any) => _.description)
        .map((_: any) => _.description)
        .join(' ');
    const optionalDescription = tokens.find(by(TokenType.minus)) ? 'paid' : '';
    return possibleDescription || optionalDescription;
};
const analyseValue = (tokens: Token[]): number | 'reset' => {
    let numericValue = tokens
        .filter((_: any) => _.numValue)
        .reduce((sum: number, each: any) => sum + each.numValue, 0);
    const impiedValue = tokens.find((_: any) => _.impliedValue) ? 'reset' : 0;
    numericValue = impiedValue ? -Math.abs(numericValue) : numericValue;
    return numericValue || impiedValue;
};
// reduce and deduce
export const reduce = (tokens: Token[]): AnalyzeResult => {
    const value = {
        name: analyseName(tokens),
        description: analyseDesc(tokens),
        value: analyseValue(tokens),
    };
    return {
        value,
        isComplete: !!value.name && !!value.value,
        tokens,
    };
};

export const findOrAdd = (tokens: Token[], token: Token): Token[] => {
    const isAt = tokens.findIndex(by(token.type));
    const hasToken = -1 < isAt;
    const tokensCopy = tokens.slice(0);
    console.log(
        'isAt',
        hasToken,
        isAt,
        tokens.slice(0),
        '---',
        tokens.slice(0).splice(isAt, 1, token),
    );
    if (hasToken) {
        tokensCopy[isAt] = token;
    } else {
        tokensCopy.push(token);
    }
    return tokensCopy;
    // return hasToken ? tokensCopy : tokensCopy.push(token);
    // return [...tokens.slice(0, isAt - 1), token, ...tokens.slice(isAt + 1)];
};

const zipUp = (tokens: Token[], newTokens: Token[]): Token[] => {
    const filtered: any[] = [];
    tokens.forEach((token: any, index) => {
        if (token.description) filtered.push([token, index]);
    });
    console.log('filtered', filtered);
    const result = tokens.slice(0);
    newTokens.forEach((token, index) => {
        const tokenIndexPair = filtered[index];
        console.log('token index', token, index);
        if (!token) return;
        if (tokenIndexPair) {
            result[tokenIndexPair[1]] = token;
        } else {
            result.push(token);
        }
    });
    return result;
};

const popFrom = (token: Token): string => {
    if (token.type === TokenType.name) return 'name';
    if (token.type === TokenType.desc) return 'description';
    return 'value';
};

export const deduce = (values: ValueObject, tokens: Token[]) => {
    const stack: { [_: string]: Token[] } = {
        name: [tokenize(`@${values.name}`)],
        value: [tokenize(`${values.value}`)],
        description: split(values.description).map(tokenize),
    };
    const newTokens: Token[] = [];
    tokens.reduce((result, token) => {
        const newToken = stack[popFrom(token)].shift();
        if (newToken) {
            result.push(newToken);
        }
        return result;
    }, newTokens);

    ['name', 'description', 'value'].forEach(stackName => {
        newTokens.push(...stack[stackName]);
    });

    // let newTokens = findOrAdd(tokens, Name(values.name));
    // newTokens = split(values.description).reduce(
    //     (newTokens: Token[], split: string) => findOrAdd(newTokens, Desc(split)),
    //     newTokens,
    // );
    // newTokens = zipUp(newTokens, tokens.filter((_: any) => _.description));
    // newTokens = findOrAdd(newTokens, tokenize(`${values.value}`));
    return newTokens;
};
