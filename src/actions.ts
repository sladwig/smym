import { emitter } from './hooks/useEvents';

const { emit } = emitter;

export const emitFocusInput = () => emit('focus/input', null);
