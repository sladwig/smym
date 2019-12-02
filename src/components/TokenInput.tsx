import React, { useRef, useState, CSSProperties, useEffect, useMemo } from 'react';
import './TokenInput.css';
import classnames from 'classnames';
import { text } from '../services/texter';
import { observer } from 'mobx-react-lite';
import { WithDecorations } from './WithDecorations';
import { useEmit, useOn } from '../hooks/useEvents';
import { withCurrent } from '../helper';
import { TokenDisplay } from './TokenDisplay';

type Transformer<T> = (_: T) => any;

interface IProps {
    value?: string;
    placeholder?: string;
    style?: CSSProperties;
    className?: string;
    autofocus?: boolean;
    transformer?: Transformer<any>[];
}
export const TokenInput = observer(
    ({ value, placeholder, style = {}, className, autofocus, transformer = [] }: IProps) => {
        const mainRef = useRef<HTMLDivElement>(null);

        const cm = useMemo(() => text(value), [value]);
        const { splited, focus, caret, value: valueString, position } = cm;

        const emit = useEmit();
        useOn('foo', bar => console.log('foo', bar));

        console.log('render', splited, focus, caret, position, valueString);
        const focusedRef = useRef<HTMLInputElement>(null);
        const focusInput = withCurrent(focusedRef, current => current.focus());

        const [hasFocus, setHasFocus] = useState(false);
        const focusing = () => setHasFocus(true);
        const blurring = () => setHasFocus(false);

        useEffect(() => {
            if (hasFocus) {
                focusedRef.current!.setSelectionRange(position, position);
            }
        }, [hasFocus]);

        return (
            <>
                <TokenDisplay />
                <div
                    {...{
                        onClick: focusInput,
                        style,
                        ref: mainRef,
                        className: classnames('token-input', className),
                    }}
                >
                    <WithDecorations
                        value={valueString}
                        caretPosition={position}
                        onPositionUpdate={position => {
                            cm.moveTo(position);
                            focusInput();
                        }}
                        hasFocus={hasFocus}
                    />
                </div>
                <input
                    type="text"
                    value={value}
                    key={`input-field`}
                    ref={focusedRef}
                    className="input-field"
                    onFocus={focusing}
                    onBlur={blurring}
                    onKeyPress={event => {
                        const pos = focusedRef.current!.selectionStart;
                        const posEnd = focusedRef.current!.selectionEnd;
                        console.log('onkeypress current pos', pos, posEnd);

                        cm.set({ value: focusedRef.current!.value, position: pos });
                        // if (pos !== undefined && pos !== null) cm.moveTo(pos);
                    }}
                    onChange={event => {
                        const pos = focusedRef.current!.selectionStart;
                        const posEnd = focusedRef.current!.selectionEnd;
                        console.log('onchange current pos', pos, posEnd);
                        cm.set({ value: event.target.value, position: pos });
                        // if (pos !== undefined && pos !== null) cm.moveTo(pos);
                    }}
                />
            </>
        );
    },
);
