import React, { ReactNode, ReactElement, useCallback } from 'react';
import './WordPresenter.css';
import {
    Token,
    TokenType,
    descriptionToken,
    minusToken,
    nameToken,
    paidToken,
    valueToken,
} from '../services/tokens';
import { Caret } from './WithDecorations';
import { PositionEmitter } from './ClickPositionEmitter';
import { store } from '../store/Store';
import { Avatar } from './User';
import classnames from 'classnames';
import { usePrevious } from '../hooks/usePrevious';
import { IUser } from '../store/User';

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
export type WhiteCharacterT = { type: 'white'; value: ' '; position: number };
export type CaretCharacterT = { type: 'caret' };
export type AnyCharacterT = CharCharacterT | WhiteCharacterT | CaretCharacterT;

interface IWordProps {
    word: AnyWordT;
}

type displayable =
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

/// types above
// functions

export const WordPresenter = ({ word }: IWordProps) => {
    return display(word);
};
const isWord = (to: { type: displayable }): to is WordT => to.type === 'word';

const display = (toDisplay: { type: displayable }) => {
    const map = {
        emptyword: (word: EmptyWordT) => (
            <EmptyWordDisplay word={word} key={`emptyword-${word.position}`} />
        ),
        word: (word: WordT) => <WordDisplay word={word} key={`word-${word.position}`} />,
        white: (char: WhiteCharacterT) => <WhiteDisplay key={`white-${char.position}`} />,
        caret: (char: CaretCharacterT) => <Caret key={`caret`} />,
        char: (char: CharCharacterT) => (
            <CharDisplay char={char} key={`${char.type}-${char.position}`} />
        ),
        [TokenType.desc]: (word: WordT<descriptionToken>) => (
            <DescTokenDisplay key={`desc-${word.position}`} word={word} />
        ),
        [TokenType.minus]: (word: WordT<minusToken>) => (
            <MinusTokenDisplay key={`minus-${word.position}`} word={word} />
        ),
        [TokenType.name]: (word: WordT<nameToken>) => (
            <NameTokenDisplay key={`name-${word.position}`} word={word} />
        ),
        [TokenType.paid]: (word: WordT<paidToken>) => (
            <PaidTokenDisplay key={`paid-${word.position}`} word={word} />
        ),
        [TokenType.value]: (word: WordT<valueToken>) => (
            <ValueTokenDisplay key={`value-${word.position}`} word={word} />
        ),
    };
    const mapper = isWord(toDisplay) ? toDisplay.tokenized.type : toDisplay.type;
    const component = map[mapper] || ((a: any) => <NullDisplay />);
    return component(toDisplay as any);
};

const EmptyWordDisplay = ({ word }: { word: EmptyWordT }) => {
    return <>{word.characters.map(display)}</>;
};

const WordDisplay = ({ word }: { word: WordT }) => {
    return <>{word.characters.map(display)}</>;
};

const CharDisplay = ({ char }: { char: CharCharacterT }) => {
    return <PositionEmitter position={char.position}>{char.value}</PositionEmitter>;
};

const WhiteDisplay = () => <span>&nbsp;</span>;
const NullDisplay = () => null;

interface TD<T = Token> {
    word: WordT<T>;
}

const DescTokenDisplay = ({ word }: TD<descriptionToken>) => {
    return (
        <div className="action-decorator" style={{ color: 'green' }}>
            <>{word.characters.map(display)}</>
        </div>
    );
};
const MinusTokenDisplay = ({ word }: TD<minusToken>) => {
    return (
        <div style={{ color: 'red' }}>
            <>{word.characters.map(display)}</>
        </div>
    );
};
const NameTokenDisplay = ({ word }: TD<nameToken>) => {
    const token = word.tokenized;
    const userName = token.name;
    const user = store.usersByName[userName];
    const prev = usePrevious(!!user);

    return (
        <>
            {word.characters.map(char => {
                if (char.type === 'char' && char.value === '@')
                    return <AtChar key="char-@" {...{ user, prev }} />;

                return display(char);
            })}
        </>
    );
};

const AtChar = ({ user, prev }: { user: IUser; prev: boolean }) => {
    return (
        <>
            {!user && <span className={classnames({ 'scale-in-center': prev !== !!user })}>@</span>}
            {user && (
                <span className={classnames({ 'scale-in-center': prev !== !!user })}>
                    <Avatar src={user.avatar} smaller={true} />
                </span>
            )}
        </>
    );
};
const PaidTokenDisplay = ({ word }: TD<paidToken>) => {
    return (
        <div style={{ color: 'gold' }}>
            <>{word.characters.map(display)}</>
        </div>
    );
};
const ValueTokenDisplay = ({ word }: TD<valueToken>) => {
    return (
        <div style={{ color: 'yellow' }}>
            <>{word.characters.map(display)}</>
        </div>
    );
};
