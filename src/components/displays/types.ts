import { Token, TokenType } from '../../services/tokens';

export type EmptyWordT = {
    type: 'emptyword';
    value: string;
    characters: AnyCharacterT[];
    position: number;
};
export type WordT<T = Token> = {
    type: 'word';
    value: string;
    characters: AnyCharacterT[];
    tokenized: T;
    position: number;
};
export type AnyWordT = EmptyWordT | WordT;

export type CharCharacterT = { type: 'char'; value: string; position: number };
export const isChar = (char: { type: string }): char is CharCharacterT => char.type === 'char';
export type WhiteCharacterT = { type: 'white'; value: ' '; position: number };
export type CaretCharacterT = { type: 'caret' };
export const isCaret = (char: { type: string }): char is CaretCharacterT => char.type === 'caret';

export type AnyCharacterT = CharCharacterT | WhiteCharacterT | CaretCharacterT;

export type displayable =
    | 'emptyword'
    | 'word'
    | 'white'
    | 'caret'
    | 'char'
    | TokenType.desc
    | TokenType.minus
    | TokenType.name
    | TokenType.paid
    | TokenType.value;

export interface TD<T = Token> {
    word: WordT<T>;
}

export const isWord = (to: { type: displayable }): to is WordT => to.type === 'word';
