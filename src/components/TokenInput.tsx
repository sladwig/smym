import React, { useRef, useState, CSSProperties, useEffect, useMemo, useCallback } from 'react';
import './TokenInput.css';
import classnames from 'classnames';
import { text } from '../services/texter';
import { observer } from 'mobx-react-lite';
import { WithDecorations } from './WithDecorations';
import { withCurrent } from '../helper';
import { TokenDisplay } from './TokenDisplay';
import { valueUpdate, tokenInputFocus, tokenInputBlur, Do } from '../actions';
import { useOn } from '../hooks/useEvents';
import { usePosition, useValue } from '../listeners';

type Transformer<T> = (_: T) => any;

interface IProps {
    placeholder?: string;
    style?: CSSProperties;
    className?: string;
    autofocus?: boolean;
    transformer?: Transformer<any>[];
}
export const TokenInput = observer(
    ({ placeholder, style = {}, className, autofocus, transformer = [] }: IProps) => {
        const inputRef = useRef<HTMLInputElement>(null);

        // position update
        const initalizeCaretFromStore = useCallback((pos: number) => {
            inputRef.current!.setSelectionRange(position, position);
        }, []);

        useOn(Do.positionUpdate, initalizeCaretFromStore);
        const position = usePosition();
        const value = useValue();

        // probably will move away
        const cm = useMemo(() => text(value), [value]);
        const { splited, focus, caret } = cm;

        console.log('render', splited, focus, caret, position, value);

        return (
            <>
                <TokenDisplay />
                <br></br>
                <br></br>
                <input
                    type="text"
                    value={value}
                    key={`input-field`}
                    ref={inputRef}
                    className="input-field"
                    onFocus={tokenInputFocus}
                    onBlur={tokenInputBlur}
                    onKeyPress={event => {
                        const pos = inputRef.current!.selectionStart;
                        const posEnd = inputRef.current!.selectionEnd;
                        console.log('onkeypress current pos', pos, posEnd);

                        cm.set({ value: inputRef.current!.value, position: pos });
                        // if (pos !== undefined && pos !== null) cm.moveTo(pos);
                    }}
                    onChange={event => {
                        const pos = inputRef.current!.selectionStart;
                        const posEnd = inputRef.current!.selectionEnd;
                        console.log('onchange current pos', pos, posEnd);
                        cm.set({ value: event.target.value, position: pos });
                        valueUpdate(event.target.value);
                        // if (pos !== undefined && pos !== null) cm.moveTo(pos);
                    }}
                />
            </>
        );
    },
);
