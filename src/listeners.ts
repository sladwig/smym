import { useState } from 'react';
import { useOn } from './hooks/useEvents';
import { EP, Do } from './actions';

const listen = <T extends keyof EP>(eventName: T, defaultValue: EP[T]): (() => EP[T]) => {
    return () => {
        const [value, set] = useState(defaultValue);
        useOn(eventName, set);
        return value;
    };
};

export const useTokenInputHasFocus = listen(Do.tokenInputFocusUpdate, false);
export const useValue = listen(Do.valueUpdate, '');
export const usePosition = listen(Do.positionUpdate, 0);
