import React from 'react';
import './TokenDisplay.css';
import { WithDecorations } from './WithDecorations';
import classnames from 'classnames';
import { setState } from './TokenInput';

export const TokenDisplay = () => {
    return (
        <div onClick={tokenInputFocus} className={classnames('token-input')}>
            <WithDecorations />
        </div>
    );
};

export const tokenInputFocus = () => setState({ hasFocus: true });
export const tokenInputBlur = () => setState({ hasFocus: false });
