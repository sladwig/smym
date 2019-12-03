import NanoEvents from 'nanoevents';
import { useEffect, useMemo } from 'react';
import { EP } from '../actions';

export const emitter = new NanoEvents<EP>();
export const on = emitter.on.bind(emitter);
export const emit = emitter.emit.bind(emitter);

export const useEventEmitter = (): {
    on: typeof emitter.on;
    emit: typeof emitter.emit;
    emitter: typeof emitter;
} => {
    return useMemo(
        () => ({
            on: emitter.on.bind(emitter),
            emit: emitter.emit.bind(emitter),
            emitter,
        }),
        [],
    );
};

export function useOn<EventName extends keyof EP>(
    eventName: EventName,
    cb: (args: EP[EventName]) => any,
) {
    const { on } = useEventEmitter();
    useEffect(() => on(eventName, cb), [eventName, cb, on]);
}

export const useEmit = () => useEventEmitter().emit;
