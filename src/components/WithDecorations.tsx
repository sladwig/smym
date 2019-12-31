import React from 'react';
import './WithDecorations.css';
import { tokenize } from '../services/parser';
import { WordPresenter } from './WordPresenter';
import { useInputStore } from '../zustand/InputStore';
import { addCaretAt } from '../utils/caret';

export const WithDecorations = () => {
    const [value, position] = useInputStore(state => [state.value, state.position]);

    const characters = addCaretAt(asChars(value), position);
    // const isEmpty = !value.length;

    const words = asWords(characters);

    const result = words.map((word: any) => {
        return <WordPresenter word={word} key={`word-${word.position}`} />;
    });
    return result;
};

export const asChars = (aString: string) => {
    return aString
        .split('')
        .map((value, position) => ({ type: value === ' ' ? 'white' : 'char', value, position }));
};

export const asWords = (chars: any[]) => {
    let wordCount = 0;
    return chars.reduce(
        (result, char) => {
            const currentWord = result[result.length - 1];
            switch (char.type) {
                case 'char':
                    currentWord.value += char.value;
                    currentWord.type = 'word';
                    currentWord.characters.push(char);
                    currentWord.tokenized = tokenize(currentWord.value);
                    break;
                case 'caret':
                    currentWord.characters.push(char);
                    break;
                case 'white':
                    result.push(char);
                    result.push({
                        type: 'emptyword',
                        value: '',
                        characters: [],
                        position: wordCount++,
                    });
                    break;
            }
            return result;
        },
        [{ type: 'emptyword', value: '', characters: [], position: wordCount++ }],
    );
};
