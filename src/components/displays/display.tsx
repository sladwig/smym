import React from 'react';
import {
    displayable,
    EmptyWordT,
    WordT,
    WhiteCharacterT,
    CaretCharacterT,
    CharCharacterT,
    isWord,
} from './types';
import {
    TokenType,
    descriptionToken,
    minusToken,
    nameToken,
    paidToken,
    valueToken,
} from '../../services/tokens';
import { WordDisplay } from './WordDisplay';
import { Caret } from '../Caret';
import { CharDisplay } from './CharDisplay';
import { PaidTokenDisplay } from './PaidTokenDisplay';
import { DescTokenDisplay } from './DescTokenDisplay';
import { ValueTokenDisplay } from './ValueTokenDisplay';
import { WhiteDisplay, NullDisplay } from './Other';
import { NameTokenDisplay } from './NameTokenDisplay';

export const display = (toDisplay: { type: displayable }) => {
    const map = {
        emptyword: (word: EmptyWordT) => (
            <WordDisplay word={word} key={`emptyword-${word.position}`} />
        ),
        word: (word: WordT) => <WordDisplay word={word} key={`word-${word.position}`} />,
        white: (char: WhiteCharacterT) => <WhiteDisplay key={`white-${char.position}`} />,
        caret: (char: CaretCharacterT) => <Caret key={`caret`} />,
        char: (char: CharCharacterT) => (
            <CharDisplay char={char} key={`${char.type}-${char.position}`} />
        ),
        [TokenType.desc]: (word: WordT<descriptionToken>) => {
            if ('paid'.startsWith(word.value)) {
                return <PaidTokenDisplay word={word as any} key={`paid-${word.position}`} />;
            }
            return <DescTokenDisplay key={`desc-${word.position}`} word={word} />;
        },
        [TokenType.minus]: (word: WordT<minusToken>) => (
            <ValueTokenDisplay
                key={`value-${word.position}`}
                word={word}
                style={{ color: 'red' }}
            />
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
        null: (a: any) => <NullDisplay />,
    };
    const mapper = isWord(toDisplay)
        ? toDisplay.tokenized.type
        : toDisplay
        ? toDisplay.type
        : 'null';
    const component = map[mapper];
    return component(toDisplay as any);
};
