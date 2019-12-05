import React, { ReactNode, ReactElement } from 'react';
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

export type EmptyWordT = {
    type: 'emptyword';
    value: string;
    characters: AnyCharacterT[];
    position: number;
};
export type WordT = {
    type: 'word';
    value: string;
    characters: AnyCharacterT[];
    tokenized: Token;
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

type displayable = 'emptyword' | 'word' | 'white' | 'caret' | 'char';

/// types above
// functions

export const WordPresenter = ({ word }: IWordProps) => {
    return display(word);
};

const display = (toDisplay: { type: displayable }) => {
    const map = {
        emptyword: (word: EmptyWordT) => (
            <EmptyWordDisplay word={word} key={`${word.type}-${word.position}`} />
        ),
        word: (word: WordT) => <WordDisplay word={word} key={`${word.type}-${word.position}`} />,
        white: (char: WhiteCharacterT) => <WhiteDisplay key={`${char.type}-${char.position}`} />,
        caret: (char: CaretCharacterT) => <CaretDisplay key={`caret`} />,
        char: (char: CharCharacterT) => (
            <CharDisplay char={char} key={`${char.type}-${char.position}`} />
        ),
    };
    const component = map[toDisplay.type] || ((a: any) => <NullDisplay />);
    return component(toDisplay as any);
};

const EmptyWordDisplay = ({ word }: { word: EmptyWordT }) => {
    return <>{word.characters.map(display)}</>;
};

const WordDisplay = ({ word }: { word: WordT }) => {
    const TokenDisplay = tokenDisplay(word);
    return <TokenDisplay word={word} />;
};

const CharDisplay = ({ char }: { char: CharCharacterT }) => {
    return <PositionEmitter position={char.position}>{char.value}</PositionEmitter>;
};

const CaretDisplay = () => <Caret />;
const WhiteDisplay = () => <span>&nbsp;</span>;
const NullDisplay = () => null;

const tokenDisplay = (word: WordT) => {
    const map = {
        [TokenType.desc]: DescTokenDisplay,
        [TokenType.minus]: MinusTokenDisplay,
        [TokenType.name]: NameTokenDisplay,
        [TokenType.paid]: PaidTokenDisplay,
        [TokenType.value]: ValueTokenDisplay,
    };
    const TokenDisplay = map[word.tokenized.type] || NullTokenDisplay;
    return TokenDisplay;
};

interface TD {
    word: WordT;
    // children: ReactElement;
}

const DescTokenDisplay = ({ word }: TD) => {
    return (
        <div style={{ color: 'green' }}>
            <>{word.characters.map(display)}</>
        </div>
    );
};
const MinusTokenDisplay = ({ word }: TD) => {
    return (
        <div style={{ color: 'red' }}>
            <>{word.characters.map(display)}</>
        </div>
    );
};
const isNameToken = (token: Token): token is nameToken => {
    return token.type === 'name';
};
const NameTokenDisplay = ({ word }: TD) => {
    const token = word.tokenized;
    if (!isNameToken(token)) return null;
    return <WithNameToken {...{ token, word }} />;
};
const WithNameToken = ({ word, token }: { word: WordT; token: nameToken }) => {
    const userName = token.name;
    const user = store.usersByName[userName];
    const prev = usePrevious(!!user);
    return (
        <div className="row-flex">
            {!user && <span className={classnames({ 'scale-in-center': prev !== !!user })}>@</span>}
            {user && (
                <span className="scale-in-center">
                    <Avatar src={user.avatar} smaller={true} />
                </span>
            )}
            {word.characters.slice(1).map(display)}
        </div>
    );
};
const PaidTokenDisplay = ({ word }: TD) => {
    return (
        <div style={{ color: 'gold' }}>
            <>{word.characters.map(display)}</>
        </div>
    );
};
const ValueTokenDisplay = ({ word }: TD) => {
    return (
        <div style={{ color: 'yellow' }}>
            <>{word.characters.map(display)}</>
        </div>
    );
};

const NullTokenDisplay = ({ word }: TD) => {
    return;
};
