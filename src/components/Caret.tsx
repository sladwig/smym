import React, { useState, useCallback } from 'react';
import './Caret.css';
import classnames from 'classnames';
import { useInputStore } from './TokenInput';
import { useInterval } from '../hooks/useInterval';

export const Caret = () => {
    const hasFocus = useInputStore(s => s.hasFocus);
    const [hidden, setHidden] = useState(false);

    const blink = useCallback(() => {
        setHidden(hid => !hid);
    }, [hidden]);
    useInterval(blink, hasFocus ? 500 : null);

    if (!hasFocus && !hidden) setHidden(true);
    return (
        <span className="caret-holder">
            <span className={classnames('caret', { hidden })} />
        </span>
    );
};
