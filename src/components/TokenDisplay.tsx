import React from 'react';
import './TokenDisplay.css';
import { WithDecorations } from './WithDecorations';
import classnames from 'classnames';
import { tokenInputFocus } from '../actions';

interface IProps {}
export const TokenDisplay = ({}: IProps) => {
    return (
        <div onClick={tokenInputFocus} className={classnames('token-input')}>
            <WithDecorations />
        </div>
    );
};
