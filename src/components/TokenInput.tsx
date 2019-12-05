import React, { useRef, CSSProperties, useMemo, useCallback, useState, useEffect } from 'react';
import './TokenInput.css';
import { observer } from 'mobx-react-lite';
import { TokenDisplay } from './TokenDisplay';
import create from 'zustand';

const [useInputStore, inputStore] = create(set => ({
    value: '',
    position: 0,
    hasFocus: false,
    external: false,
}));

const { setState } = inputStore;
export { useInputStore, inputStore, setState };

interface IProps {
    placeholder?: string;
}
const external = false;
export const TokenInput = observer(({ placeholder }: IProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [value, position, hasFocus, externalUpdate] = useInputStore(s => [
        s.value,
        s.position,
        s.hasFocus,
        s.external,
    ]);

    // position update
    const initalizeCaretFromStore = useCallback((pos: number) => {
        inputRef.current!.setSelectionRange(pos, pos);
    }, []);

    useEffect(() => {
        const updatePosition = () => {
            const position = inputRef.current!.selectionStart;
            // console.log('keypresseeeeee', position);
            if (position) setState({ position, external });
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
    }, [hasFocus, externalUpdate, position]);

    return (
        <>
            <TokenDisplay />
            <input
                type="text"
                value={value}
                key={`input-field`}
                ref={inputRef}
                className="input-field"
                onFocus={() => setState({ hasFocus: true })}
                onBlur={() => setState({ hasFocus: false })}
                onChange={event => {
                    const position = inputRef.current!.selectionStart;
                    console.log('onchange current pos', event.target.value);
                    setState({ value: event.target.value, position, external });
                }}
            />
        </>
    );
});
