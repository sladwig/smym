import React, { useState } from 'react';
import './WithDecorations.css';
import { ClickPositionEmitter } from './ClickPositionEmitter';
import { useInterval } from '../hooks/useInterval';
import classnames from 'classnames';
import { ActionDecorator } from './ActionDecorator';

interface IProps {
    value: string;
    caretPosition?: number;
    onPositionUpdate?: (position: number) => any;
    hasFocus: boolean;
}

export const WithDecorations = ({
    value,
    caretPosition,
    onPositionUpdate = () => null,
    hasFocus,
}: IProps) => {
    let characters = addCaretAtPosition(asChars(value), caretPosition);
    const isEmpty = !value.length;

    let words = asWords(characters);

    const result = words.map((word: any) => {
        return (
            <span>
                <ActionDecorator>
                    {word.characters.map((char: any) => {
                        if (char.type === 'char') {
                            return (
                                <ClickPositionEmitter
                                    value={char.value}
                                    startPosition={char.position}
                                    onClick={position => onPositionUpdate(position)}
                                />
                            );
                        }
                        if (char.type === 'caret' && hasFocus) {
                            return <Caret />;
                        }
                        if (char.type === 'white') {
                            return <span>&nbsp;</span>;
                        }
                        return null;
                    })}
                </ActionDecorator>
            </span>
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
            const lastWord = result[result.length - 1];
            if (char.type === 'char') {
                lastWord.value += char.value;
            }
            lastWord.characters.push(char);
            if (char.type === 'white') {
                result.push({ type: 'word', value: '', characters: [], position: result.length });
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
