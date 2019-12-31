import React, { useRef, useCallback, useState, useEffect, useMemo } from 'react';
import './TokenInput.css';
import { TokenDisplay, tokenInputFocus } from './TokenDisplay';
import create from 'zustand';
import classnames from 'classnames';
import { SearchIcon, CancelIcon, CheckIcon } from './TransactionInput';
import { ReactComponent as SearchIconSvg } from '../images/search-icon.svg';
import { SuggestionBox, useSuggestionStore } from './SuggestionBox';
import { MovingEye } from './MovingEye';
import shallow from 'zustand/shallow';
import { useHasInLocalStorage } from '../hooks/useLocalStorage';
import { useResultStore } from '../App';
import { Callback } from 'keyboardjs';

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

interface InputAreaProps {
    create: Callback;
}
export const TransactionInputArea = ({ create }: InputAreaProps) => {
    const hasApiToken = useHasInLocalStorage('apiToken');
    const [active, setActive] = useState(false);
    useEffect(() => {
        if (active) tokenInputFocus();
    }, [active]);

    const activate = useCallback(() => {
        if (hasApiToken) setActive(true);
    }, [setActive, hasApiToken]);
    const deactivate = useCallback(() => setActive(false), [setActive]);
    const activateOrDeactivate = useCallback(
        (e: KeyboardEvent) => {
            activate();
            if (e.key.toLowerCase() !== 'escape') return;
            deactivate();
            inputStore.getState().reset();
        },
        [activate, deactivate],
    );

    useEffect(() => {
        document.addEventListener('keydown', activateOrDeactivate);
        return () => {
            document.removeEventListener('keydown', activateOrDeactivate);
        };
    }, [activateOrDeactivate]);

    const mode = useSuggestionStore(state => state.mode);
    const length = useSuggestionStore(state => state.length);
    const suggestion = mode !== 'none' && 0 < length;

    const height = suggestion ? 104 + 90 * (length ? length + 1 : 0) : 104;
    return (
        <div
            className={classnames('top-wrapper', { active, 'has-suggestion': suggestion })}
            style={{ height }}
        >
            <div className={classnames('transaction-input-area', 'heading-1')} onClick={activate}>
                {!active && (
                    <>
                        <MovingEye />
                        <div className="show-container">
                            <div className="show-me-your-money"></div>
                        </div>
                        {hasApiToken && <SearchIcon onClick={activate} />}
                    </>
                )}
                {active && (
                    <>
                        <SearchIconSvg style={{ marginRight: 29 }} />
                        <TokenInput />
                        <SubmitCancelButton
                            onSubmit={e => {
                                create();
                                deactivate();
                                inputStore.getState().reset();
                                e.stopPropagation();
                            }}
                            onCancel={e => {
                                deactivate();
                                inputStore.getState().reset();
                                e.stopPropagation();
                            }}
                        />
                    </>
                )}
            </div>
            <SuggestionBox />
        </div>
    );
};

interface SubmitCancelProps {
    onSubmit: (e: React.MouseEvent) => void;
    onCancel: (e: React.MouseEvent) => void;
}
const SubmitCancelButton = ({ onSubmit, onCancel }: SubmitCancelProps) => {
    const complete = useResultStore(state => state.isComplete);
    return complete ? (
        <CheckIcon onClick={onSubmit} style={{ marginLeft: 29 }} />
    ) : (
        <CancelIcon onClick={onCancel} style={{ marginLeft: 29 }} />
    );
};
