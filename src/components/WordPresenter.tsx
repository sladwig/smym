import React, { ReactNode } from 'react';
import './WordPresenter.css';
import { Token } from '../services/tokens';
import { Caret } from './WithDecorations';
import { PositionEmitter } from './ClickPositionEmitter';

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
            <WordDisplay word={word} key={`${word.type}-${word.position}`} />
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

const WordDisplay = ({ word }: IWordProps) => {
    return <>{word.characters.map(display)}</>;
};

const CharDisplay = ({ char }: { char: CharCharacterT }) => {
    return <PositionEmitter position={char.position}>{char.value}</PositionEmitter>;
};

const CaretDisplay = () => <Caret />;
const WhiteDisplay = () => <span>&nbsp;</span>;
const NullDisplay = () => null;
