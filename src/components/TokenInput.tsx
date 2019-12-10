import React, { useRef, useCallback, useState, useEffect } from 'react';
import './TokenInput.css';
import { observer } from 'mobx-react-lite';
import { TokenDisplay, tokenInputFocus } from './TokenDisplay';
import create from 'zustand';
import classnames from 'classnames';
import { Logo, SearchIcon, CancelIcon } from './TransactionInput';
import { ReactComponent as SearchIconSvg } from '../images/search-icon.svg';
import { SuggestionBox } from './SuggestionBox';

const initialValue = { value: '', position: 0, hasFocus: false, external: false };
const [useInputStore, inputStore] = create(set => ({
    ...initialValue,
    reset: () => set(initialValue),
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
    }, [hasFocus, externalUpdate, position]);

    return (
        <>
            <TokenDisplay />
            <input
                type="text"
                value={value}
                key={`input-field`}
                ref={inputRef}
                autoFocus={true}
                className="input-field"
                onFocus={tokenInputFocus}
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

export const TransactionInputArea = () => {
    const [active, setActive] = useState(false);
    const value = useInputStore(s => s.value);
    useEffect(() => {
        if (active) tokenInputFocus();
    }, [active]);
    const height = value ? 194 : 104;
    return (
        <div
            className={classnames('top-wrapper', { active, suggestion: !!value })}
            style={{ height }}
        >
            <div
                className={classnames('transaction-input-area', 'heading-1')}
                onClick={() => setActive(true)}
            >
                {!active && (
                    <>
                        <Logo />
                        <SearchIcon onClick={() => setActive(true)} />
                    </>
                )}
                {active && (
                    <>
                        <SearchIconSvg style={{ marginRight: 29 }} />
                        <TokenInput />
                        <CancelIcon
                            onClick={e => {
                                console.log('ola');
                                setActive(false);
                                inputStore.getState().reset();
                                e.stopPropagation();
                            }}
                            style={{ marginLeft: 29 }}
                        />
                    </>
                )}
            </div>
            {active && value && <SuggestionBox />}
        </div>
    );
};
