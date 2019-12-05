import React from 'react';
import './TokenDisplay.css';
import { WithDecorations } from './WithDecorations';
import classnames from 'classnames';
import { setState } from './TokenInput';

interface IProps {}
export const TokenDisplay = ({}: IProps) => {
    return (
        <div onClick={tokenInputFocus} className={classnames('token-input')}>
            <WithDecorations />
        </div>
    );
};

export const tokenInputFocus = () => setState({ hasFocus: true });
export const tokenInputBlur = () => setState({ hasFocus: false });
