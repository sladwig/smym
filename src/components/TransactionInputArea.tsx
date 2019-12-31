import React, { useState, useEffect, useCallback } from 'react';
import './TransactionInputArea.css';
import { Callback } from 'keyboardjs';
import { useHasInLocalStorage } from '../hooks/useLocalStorage';
import { tokenInputFocus } from './TokenDisplay';
import { inputStore, TokenInput } from './TokenInput';
import { useSuggestionStore, SuggestionBox } from './SuggestionBox';
import { MovingEye } from './MovingEye';
import classnames from 'classnames';
import { SearchIcon, SearchSvg } from './Icon';
import { SubmitCancelButton } from './Button';

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
                        <SearchSvg style={{ marginRight: 29 }} />
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
