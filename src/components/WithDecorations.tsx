import React, { useState, useCallback } from 'react';
import './WithDecorations.css';
import { useInterval } from '../hooks/useInterval';
import classnames from 'classnames';
import { tokenize } from '../services/parser';
import { WordPresenter } from './WordPresenter';
import { useInputStore } from './TokenInput';

interface IProps {
    // value: string;
    // position: number;
}

export const WithDecorations = () => {
    const [value, position] = useInputStore(state => [state.value, state.position]);

    const characters = addCaretAtPosition(asChars(value), position);
    console.log('character', characters);
    const isEmpty = !value.length;

    const words = asWords(characters);

    const result = words.map((word: any) => {
        console.log('the word', word);
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
        (result, char, index) => {
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

export const addCaretAtPosition = (anArray: any[], position: number = anArray.length) => {
    const clone = anArray.slice();
    clone.splice(position, 0, { type: 'caret' });
    return clone;
};

export const Caret = () => {
    const hasFocus = useInputStore(s => s.hasFocus);
    const [hidden, setHidden] = useState(false);

    const blink = useCallback(() => {
        console.log('called');
        setHidden(hid => !hid);
    }, []);
    useInterval(blink, hasFocus ? 500 : null);

    if (!hasFocus) {
        if (hidden) setHidden(false);
        return null;
    }
    return (
        <span className="caret-holder">
            <span className={classnames('caret', { hidden })}></span>
        </span>
    );
};
