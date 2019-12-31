import React, { useRef, useCallback, useEffect, useMemo } from 'react';
import './TokenInput.css';
import { TokenDisplay, tokenInputFocus } from './TokenDisplay';
import create from 'zustand';
import classnames from 'classnames';
import shallow from 'zustand/shallow';

const initialValue = { value: '', position: 0, hasFocus: false, external: false };
const [useInputStore, inputStore] = create(set => ({
    ...initialValue,
    reset: () => set(initialValue),
}));

const { setState } = inputStore;
export { useInputStore, inputStore, setState };

const external = false;
export const TokenInput = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [value, position, hasFocus, externalUpdate] = useInputStore(
        s => [s.value, s.position, s.hasFocus, s.external],
        shallow,
    );

    // position update
    const initalizeCaretFromStore = useCallback((pos: number) => {
        inputRef.current!.setSelectionRange(pos, pos);
    }, []);

    useEffect(() => {
        const updatePosition = () => {
            const position = inputRef.current!.selectionStart;
            if (position !== undefined) setState({ position, external });
        };
        document.addEventListener('keydown', updatePosition);
        document.addEventListener('keyup', updatePosition);
        return () => {
            document.removeEventListener('keydown', updatePosition);
            document.removeEventListener('keyup', updatePosition);
        };
    }, []);

    useEffect(() => {
        if (hasFocus) {
            inputRef.current!.focus();
        }
    }, [hasFocus]);

    useEffect(() => {
        if (hasFocus && externalUpdate) {
            initalizeCaretFromStore(position);
        }
    }, [hasFocus, externalUpdate, position, initalizeCaretFromStore]);

    const isDev = useMemo(() => window.localStorage.getItem('isDev'), []);
    return (
        <>
            <TokenDisplay />
            <input
                type="text"
                value={value}
                key={`input-field`}
                ref={inputRef}
                autoFocus={true}
                className={classnames('input-field', { isDev })}
                onFocus={tokenInputFocus}
                onBlur={() => setState({ hasFocus: false })}
                onChange={event => {
                    const position = inputRef.current!.selectionStart;
                    setState({ value: event.target.value, position, external });
                }}
            />
        </>
    );
};
