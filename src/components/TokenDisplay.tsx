import React from 'react';
import './TokenDisplay.css';
import { WithDecorations } from './WithDecorations';
import { useEmit } from '../hooks/useEvents';

interface IProps {}

export const TokenDisplay = ({}: IProps) => {
    const emit = useEmit();

    return (
        <div
            {
                ...{
                    // onClick: focusInput,
                    // style,
                    // ref: mainRef,
                    // className: classnames('token-input', className),
                }
            }
        ></div>
    );
};

//<WithDecorations
// value={valueString}
// caretPosition={position}
//  onPositionUpdate={position => {
// cm.moveTo(position);
// focusInput();
// }}
// hasFocus={hasFocus}
///>
