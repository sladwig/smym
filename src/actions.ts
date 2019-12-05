import { emit } from './hooks/useEvents';
import { eventNames } from 'cluster';
import { setState } from './components/TokenInput';

export enum Do {
    'tokenInputFocusUpdate' = 'token-input-focus/update',
    'valueUpdate' = 'value/update',
    'positionUpdate' = 'position/update',
}

export type EP = {
    [Do.tokenInputFocusUpdate]: boolean;
    [Do.valueUpdate]: string;
    [Do.positionUpdate]: number;
};

// Emitter
const e = <T extends keyof EP>(eventName: T) => {
    return (value: EP[T]) => emit(eventName, value);
};
// Lazy Emitter
const le = <T extends keyof EP>(eventName: T) => {
    return (value: EP[T]) => () => emit(eventName, value);
};

export const tokenInputHasFocus = le(Do.tokenInputFocusUpdate);
export const tokenInputFocus = () => setState({ hasFocus: true });
// export const tokenInputBlur = () => setState({ hasFocus: true });

export const valueUpdate = le(Do.valueUpdate);
export const positionUpdate = le(Do.positionUpdate);
