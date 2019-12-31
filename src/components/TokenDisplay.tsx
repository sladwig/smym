import React from 'react';
import { WithDecorations } from './WithDecorations';
import classnames from 'classnames';
import { inputStore } from '../zustand/InputStore';

export const TokenDisplay = () => {
    return (
        <div onClick={tokenInputFocus} className={classnames('token-input')}>
            <WithDecorations />
        </div>
    );
};

export const tokenInputFocus = () => inputStore.setState({ hasFocus: true });
export const tokenInputBlur = () => inputStore.setState({ hasFocus: false });
