export enum TokenType {
    'value' = 'value',
    'minus' = 'minus',
    'paid' = 'paid',
    'desc' = 'desc',
    'name' = 'name',
}
export interface Token {
    type: TokenType;
}
export interface valueToken extends Token {
    numValue: number;
    type: TokenType.value;
}
export interface minusToken extends Token {
    numValue: number;
    optionalDescription: 'paid';
    type: TokenType.minus;
}
export interface paidToken extends Token {
    impliedValue: 'reset';
    description: 'paid';
    type: TokenType.paid;
}
export interface descriptionToken extends Token {
    description: string;
    type: TokenType.desc;
}
export interface nameToken extends Token {
    name: string;
    type: TokenType.name;
}

export const Value = (numValue: number): valueToken => ({
    numValue,
    type: TokenType.value,
});
export const Minus = (numValue: number): minusToken => ({
    numValue,
    optionalDescription: 'paid',
    type: TokenType.minus,
});
export const Paid = (): paidToken => ({
    impliedValue: 'reset',
    description: 'paid',
    type: TokenType.paid,
});
export const Desc = (description: string): descriptionToken => ({
    description,
    type: TokenType.desc,
});

export const Name = (name: string): nameToken => ({
    name,
    type: TokenType.name,
});
