import React, { useState } from 'react';
import './WithDecorations.css';
import { ClickPositionEmitter } from './ClickPositionEmitter';
import { useInterval } from '../hooks/useInterval';
import classnames from 'classnames';
import { ActionDecorator } from './ActionDecorator';
import { useTokenInputHasFocus, usePosition, useValue } from '../listeners';

interface IProps {}

export const WithDecorations = ({}: IProps) => {
    const hasFocus = useTokenInputHasFocus();
    const value = useValue();
    const position = usePosition();

    const characters = addCaretAtPosition(asChars(value), position);
    const isEmpty = !value.length;

    const words = asWords(characters);

    const result = words.map((word: any) => {
        return (
            <ActionDecorator>
                {word.characters
                    .map((char: any) => {
                        if (char.type === 'char') {
                            return (
                                <ClickPositionEmitter
                                    value={char.value}
                                    startPosition={char.position}
                                    onClick={position => console.log(position)}
                                />
                            );
                        }
                        if (char.type === 'caret' && hasFocus) {
                            return <Caret />;
                        }
                        return null;
                    })
                    .join(<span>&nbsp;</span>)}
            </ActionDecorator>
        );
    });
    return result;
};

export const asChars = (aString: string) => {
    return aString
        .split('')
        .map((value, position) => ({ type: value === ' ' ? 'white' : 'char', value, position }));
};

export const asWords = (chars: any[]) => {
    return chars.reduce(
        (result, char, index) => {
            switch (char.type) {
                case 'char':
                    const currentWord = result[result.length - 1];
                    currentWord.value += char.value;
                    currentWord.characters.push(char);
                    break;
                case 'white':
                    result.push({
                        type: 'word',
                        value: '',
                        characters: [],
                        position: result.length,
                    });
                    break;
            }
            return result;
        },
        [{ type: 'word', value: '', characters: [], position: 0 }],
    );
};

export const addCaretAtPosition = (anArray: any[], position: number = anArray.length) => {
    const clone = anArray.slice();
    clone.splice(position, 0, { type: 'caret' });
    return clone;
};

const Caret = () => {
    const [hidden, setHidden] = useState(false);
    // const caretRef = useRef<HTMLSpanElement>(null);
    useInterval(() => setHidden(() => !hidden), 500);

    return <span className={classnames('caret', { hidden })}> </span>;
};
