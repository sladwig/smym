import { emit } from './hooks/useEvents';
import { eventNames } from 'cluster';

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
export const tokenInputFocus = tokenInputHasFocus(true);
export const tokenInputBlur = tokenInputHasFocus(false);

export const valueUpdate = e(Do.valueUpdate);
export const positionUpdate = e(Do.positionUpdate);
